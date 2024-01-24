import {
  Box,
  Button,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import React, { useCallback, useEffect, useState } from 'react';

// import CommonInput from 'components/common/CommonInput';
import CommonTextarea from 'components/common/CommonTextarea';
import { renderShortAddress, sendFileToIPFS } from 'helpers';
import ImageIcon from 'icon/ImageIcon';
import postSvc from 'services/community';
import { IPost } from 'types/community';
import { HostData } from 'types/hostState';

import PostItem from './PostItem';

const Community = ({ hostState }: { hostState: HostData }) => {
  const classes = useStyles();
  const [posts, setPosts] = useState<IPost[]>();
  const [content, setContent] = useState('');
  const { account } = useWeb3React();
  const [file, setFile] = useState<File>();
  const getAllPosts = async () => {
    const data = await postSvc.GetAllPosts({
      pageNumber: 1,
      pageSize: 20,
      userId: hostState.id,
    });
    setPosts(data.data);
  };
  useEffect(() => {
    getAllPosts();
  }, [hostState.id]);
  const handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setContent(value);
  };
  const onChangeBanner = useCallback((e: React.ChangeEvent<any>) => {
    let fileName = e.target.files[0].name;
    setFile(e.target.files[0]);
    let idxDot = fileName.lastIndexOf('.') + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

    if (e.target.files[0].size > 5 * 1024 * 1024) {
      setFile(undefined);
      alert('Only accept images smaller than 5MB!');
      return;
    }
    if (
      extFile == 'jpg' ||
      extFile == 'jpeg' ||
      extFile == 'png' ||
      extFile == 'svg'
    ) {
      e.target.value = null;
    } else {
      setFile(undefined);
      alert('Only jpg/jpeg/svg and png files are allowed!');
    }
  }, []);
  const createNewPost = async () => {
    if (!content) return;
    let fileUrl = '';
    if (file) {
      fileUrl = await sendFileToIPFS(file);
    }
    let params: any = {};
    if (fileUrl) params.coverUrl = fileUrl;
    params.content = content.replace(/\n/g, ' <br/> ');
    await postSvc.CreateNewPost(params);
    setPosts([]);
    getAllPosts();
    setContent('');
    setFile(undefined);
  };
  return (
    <Box className={classes.container}>
      {account == hostState.address && (
        <Box className={classes.post}>
          <Box mr={2}>
            <CardMedia
              image={
                hostState.avatarUrl
                  ? hostState.avatarUrl
                  : '/images/default-avatar.png'
              }
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            />
          </Box>
          <Box width="100%">
            <Box display="flex" alignItems="center">
              <Typography className={classes.boldText}>
                {hostState.nickname
                  ? hostState.nickname
                  : renderShortAddress(hostState.address, 4, 4)}
              </Typography>
            </Box>
            {/* <CommonInput
              placeholder="What in your mind?"
              value={content}
              onChange={handleChangeContent}
              className={classes.input}
            /> */}
            <Box minHeight={32}>
              <CommonTextarea
                placeholder="What in your mind?"
                value={content}
                onChange={handleChangeContent}
                className={classes.input}
              />
            </Box>
            <Box mt={1} display="flex" justifyContent="space-between">
              <Button
                className={classes.buttonFile}
                startIcon={<ImageIcon />}
                component="label"
              >
                {file ? file.name : 'Image'}
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={onChangeBanner}
                />
              </Button>
              <Button className={classes.button} onClick={createNewPost}>
                Publish
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      {posts && posts?.length > 0 && (
        <Box>
          {posts.map((p: IPost, i: number) => {
            return (
              <Box key={i}>
                <PostItem post={p} />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
export default Community;

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 850,
    margin: 'auto',
  },
  post: {
    background: '#1c1c1e',
    display: 'flex',
    padding: 16,
    '& p': {
      color: '#BDBDBD',
    },
    marginBottom: 16,
  },
  buttonFile: {
    '&>span': {
      color: '#ABABAB',
      fontSize: '14px',
      lineHeight: '17px',
    },
    '&>svg': {
      height: 12,
      width: 16,
    },
  },
  boldText: {
    fontSize: 16,
    fontWeight: 600,
    marginRight: 8,
  },
  input: {
    // padding: '14px 0px 14px 4px',
    '&>div:first-child': {
      width: 'calc(100% - 75px)',
    },
    marginTop: 12,
  },
  button: {
    padding: '5px 12px !important',
    background: 'white',
    '& span': {
      color: 'black',
    },
  },
}));
