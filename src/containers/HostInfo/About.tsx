import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';

import CommonInput from 'components/common/CommonInput';
import CommonTextarea from 'components/common/CommonTextarea';
import { convertTime, validURL } from 'helpers';
import DeleteIcon from 'icon/sidebar/DeleteIcon';
import hostSer from 'services/host';
import usersService from 'services/users';
import { updateUserDescriptionAction } from 'store/actions/hostActions';
import { HostData } from 'types/hostState';

const About = ({ hostState }: { hostState: HostData }) => {
  const [numBlock, setNumBlock] = useState(0);
  const [isOpenTextArea, setIsOpenTextArea] = useState(false);
  const [isOpenTextAreaLink, setIsOpenTextAreaLink] = useState(false);
  const { account } = useWeb3React();
  const [description, setDescription] = useState('');
  const [newLink, setNewLink] = useState('');
  const [listLinks, setListLinks] = useState(hostState.userLinks);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (!hostState.address) return;
      const data = await usersService.getNumBlockByAddress(hostState.address);
      setNumBlock(+data.numblock);
    })();
  }, [hostState.address]);
  useEffect(() => {
    if (!hostState.description && hostState.description != '') return;
    setDescription(hostState.description);
  }, [hostState.description]);
  useEffect(() => {
    if (!hostState.userLinks || hostState.userLinks.length == 0) return;
    setListLinks(hostState.userLinks);
  }, [hostState.userLinks]);
  useEffect;
  const CustomHostInfo = ({ label, text }: { label: string; text: string }) => {
    return (
      <Box className={classes.info}>
        <Typography>{label}:</Typography>
        <Typography>{text}</Typography>
      </Box>
    );
  };
  const classes = useStyles();
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };
  const deleteLink = (index: number) => {
    if (!listLinks) return;
    let temp = [...listLinks].filter((l, i) => i != index);
    setListLinks(temp);
  };
  const addNewLink = () => {
    if (newLink == '') return;
    let temp = [];
    if (!listLinks) temp = [newLink];
    else temp = [...listLinks, newLink];
    setListLinks(temp);
    setNewLink('');
  };
  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>
        <Box className={classes.description}>
          <Box>
            <Typography>Description</Typography>
            {account == hostState.address && (
              <Button
                onClick={() => {
                  setIsOpenTextArea(!isOpenTextArea);
                  isOpenTextArea &&
                    dispatch(
                      updateUserDescriptionAction({
                        description: description,
                      }),
                    );
                }}
              >
                {!isOpenTextArea ? 'Edit' : 'Save'}
              </Button>
            )}
          </Box>
          {!isOpenTextArea && (
            <div
              dangerouslySetInnerHTML={{ __html: `<p>${description}</p>` }}
            />
          )}
          {account == hostState.address && isOpenTextArea && (
            <CommonTextarea
              value={description || ''}
              minRows={5}
              onChange={handleChangeDescription}
              className={classes.textArea}
            />
          )}
        </Box>
        <Box className={classes.description} style={{ marginTop: 24 }}>
          <Box>
            <Typography>Links</Typography>
            {account == hostState.address && (
              <Button
                onClick={() => {
                  setIsOpenTextAreaLink(!isOpenTextAreaLink);
                  if (isOpenTextAreaLink) {
                    hostSer.UpdateUserLinks({
                      userLinks: listLinks,
                    });
                  }
                }}
              >
                {!isOpenTextAreaLink ? 'Edit' : 'Save'}
              </Button>
            )}
          </Box>
          <Box display="flex" flexDirection="column">
            {listLinks &&
              listLinks?.length > 0 &&
              listLinks.map((l, i) => {
                return (
                  <Box
                    key={i}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                    }}
                    onClick={() => {
                      window.open(l, '_blank');
                    }}
                  >
                    <Typography
                      style={{
                        color: '#029ADE',
                        fontSize: 14,
                      }}
                    >
                      {l}
                    </Typography>
                    {isOpenTextAreaLink && (
                      <Box
                        className={classes.delete}
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteLink(i);
                        }}
                      >
                        <DeleteIcon />
                      </Box>
                    )}
                  </Box>
                );
              })}
          </Box>
          {account == hostState.address && isOpenTextAreaLink && (
            <Box
              display="flex"
              alignItems="center"
              margin={isMobile ? '20px 0px' : '20px 0px 32px 0px'}
            >
              <CommonInput
                value={newLink}
                placeholder={'Enter new link'}
                className={classes.input}
                error={newLink != '' && !validURL(newLink)}
                helperText={
                  newLink != '' && !validURL(newLink)
                    ? 'Please enter the valid link'
                    : ''
                }
                onKeyDown={(e: any) => {
                  e.key === 'Enter' && addNewLink();
                }}
                onChange={(e) => {
                  setNewLink(e.target.value);
                }}
              />
              <Button
                className={classes.add}
                onClick={() => addNewLink()}
                disabled={!validURL(newLink)}
              >
                Add
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Box className={classes.stats}>
        <Typography className={classes.highlightText}>Stats</Typography>
        <CustomHostInfo
          label="Join date"
          text={convertTime(hostState.createdAt, 'DD/MM/YYYY', true)}
        />
        <CustomHostInfo
          label="Followers"
          text={(hostState.followersId && hostState.followersId.length) || '0'}
        />
        <CustomHostInfo
          label="Follows"
          text={(hostState.followsId && hostState.followsId.length) || '0'}
        />
        <CustomHostInfo
          label="Report rate"
          text={`${
            +hostState.numEvents
              ? ((100 * +hostState.numReports) / +hostState.numEvents).toFixed(
                  2,
                )
              : '0'
          }%`}
        />
        <CustomHostInfo
          label="Game cancel rate"
          text={`${
            +hostState.numEvents
              ? ((100 * numBlock) / +hostState.numEvents).toFixed(2)
              : '0'
          }%`}
        />
      </Box>
    </Box>
  );
};
export default About;
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 16,
    maxWidth: 1200,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginLeft: 16,
      marginRight: 16,
    },
  },
  delete: {
    marginLeft: 12,
    '& svg': {
      width: 16,
    },
  },
  input: {
    backgroundColor: '#616161',
    width: '200px',
    position: 'relative',
    borderRight: '1px solid #BDBDBD',
    height: 28,
  },
  add: {
    background: '#FFFFFF',
    width: 40,
    height: 24,
    marginLeft: 12,
    '& span': {
      color: 'black',
    },
  },
  textArea: {
    backgroundColor: '#4B4B4B',
    height: '108px !important',
    marginBottom: 8,

    '&>textarea': {
      height: '108px !important',
      overflow: 'auto !important',
    },
  },
  info: {
    display: 'flex',
    marginBottom: 8,
    '&>p': {
      color: '#BDBDBD',
      fontSize: '14px',
      lineHeight: '17px',
    },
    '&>p:last-child': {
      color: '#FFFFFF',
      marginLeft: 4,
    },
  },
  stats: {
    width: 300,
    [theme.breakpoints.down('md')]: {
      width: 200,
    },
  },
  wrapper: {
    width: 'calc(100% - 550px)',
    [theme.breakpoints.down('md')]: {
      width: 'calc(100% - 250px)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  description: {
    '&>p:last-child': {
      padding: '0px 0px 4px 0px',
    },
    '&>div:last-child': {
      '& p': {
        color: '#BDBDBD',
      },
    },
    '&>div:first-child': {
      display: 'flex',
      alighItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
      '&>p:first-child': {
        color: '#FFFFFF',
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '19px',
      },
      '&>button': {
        background: '#FFFFFF',
        width: 40,
        height: 20,
        '&>span': {
          color: 'black',
        },
      },
    },
  },
  highlightText: {
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
  },
  normalText: {
    fontSize: 14,
    color: '#bdbdbd',
  },
}));
