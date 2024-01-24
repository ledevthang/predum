import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import CommonTextarea from 'components/common/CommonTextarea';
import { convertTime } from 'helpers';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDescriptionAction } from 'store/actions/hostActions';
import { getHostState } from 'store/selectors';

const Info = () => {
  const classes = useStyles();
  const hostState = useSelector(getHostState);
  const { account } = useWeb3React();
  const [isOpenTextArea, setIsOpenTextArea] = useState(false);
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');

  const CustomHostInfo = ({ label, text }: { label: string; text: string }) => {
    return (
      <Box className={classes.info}>
        <Typography>{label}:</Typography>
        <Typography>{text}</Typography>
      </Box>
    );
  };
  useEffect(() => {
    if (!hostState.description && hostState.description != '') return;
    setDescription(hostState.description);
  }, [hostState.description]);

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };
  const convertNewLine = (des: string) => {
    return des.replace(/\n/g, '<br/>');
  };
  return (
    <Box className={classes.container}>
      <Box className={clsx(classes.wapper, classes.firstWapper, 'center-root')}>
        <Box>
          <Typography>
            Report rate:{' '}
            {+hostState.numEvents
              ? ((100 * +hostState.numReports) / +99).toFixed(2)
              : '0'}
            %
          </Typography>
          <Typography>
            Canceled event rate:{' '}
            {+hostState.numEvents
              ? ((100 * +hostState.numBlock) / +hostState.numEvents).toFixed(2)
              : '0'}
            %
          </Typography>
        </Box>
      </Box>
      <Box className={classes.wapper}>
        <CustomHostInfo
          label="Join Date"
          text={convertTime(hostState.createdAt)}
        />
        <CustomHostInfo label="Event" text={hostState.numEvents || '0'} />
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
              dangerouslySetInnerHTML={{ __html: convertNewLine(description) }}
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
        {/* <CustomHostInfo label="Followers" text="2.5K" /> */}
      </Box>
    </Box>
  );
};

export default memo(Info);
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    background: '#1C1C1E',
    padding: 24,
    display: 'flex',
    marginBottom: 100,
    [theme.breakpoints.down('sm')]: {
      padding: 16,
      flexDirection: 'column',
    },
  },
  wapper: {
    width: '50%',
    paddingLeft: 20,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingLeft: 0,
      paddingTop: 16,
    },
  },
  textArea: {
    backgroundColor: '#4B4B4B',
    height: '80px !important',
    marginBottom: 8,

    '&>textarea': {
      height: '80px !important',
    },
  },
  firstWapper: {
    borderRight: '2px solid gray',
    paddingLeft: 0,
    flexDirection: 'column',
    '&>div>p': {
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '29px',
      color: '#FFFFFF',
    },
    [theme.breakpoints.down('sm')]: {
      borderRight: 'unset',
      borderBottom: '2px solid gray',
      paddingBottom: 36,
    },
  },
  info: {
    display: 'flex',
    marginBottom: 8,
    '&>p': {
      color: '#BDBDBD',
      fontSize: '16px',
      lineHeight: '19px',
    },
    '&>p:first-child': {
      fontWeight: 600,
      color: '#FFFFFF',
      marginRight: 4,
    },
  },
  description: {
    display: 'unset',
    '&>p:last-child': {
      padding: '0px 0px 4px 0px',
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
}));
