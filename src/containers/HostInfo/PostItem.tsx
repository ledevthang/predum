import {
  Box,
  Button,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import CommonInput from 'components/common/CommonInput';
import { renderShortAddress, timeSince, validURL } from 'helpers';
import DownIcon from 'icon/DownIcon';
import MessageIcon from 'icon/MessageIcon';
import postSvc from 'services/community';
import { IPost, IPostComment } from 'types/community';

const PostItem = ({ post }: { post: IPost }) => {
  const classes = useStyles();
  const [isOpenComment, setIsOpenComment] = useState(true);
  const [postClone, setPostClone] = useState<IPost>(post);
  const [isHasShowMore, setIsHasShowMore] = useState(true);
  const [postComments, setPostComments] = useState<IPostComment[]>([]);
  const [content, setContent] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const temp = post.content ? post.content?.length > 695 : false;
    setIsHasShowMore(temp);
  }, [post]);
  const handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setContent(value);
  };
  const createNewPostComment = async () => {
    await postSvc.CreateNewPostComment({
      postId: post.id,
      content: content,
    });
    setContent('');
    await refreshPostAfterComment();
    const data = await postSvc.GetAllPostComment({
      pageNumber: 1,
      pageSize: 3,
      postId: post.id,
    });
    setPostComments(data.data);
  };
  const refreshPostAfterComment = async () => {
    const data = await postSvc.GetPostDetail(post.id);
    setPostClone(data as any);
  };
  const getAllPostComments = async (type: string) => {
    const data = await postSvc.GetAllPostComment({
      pageNumber: page,
      pageSize: 3,
      postId: post.id,
    });
    let temp = [];
    temp = [...data.data];
    const uniqueArr: React.SetStateAction<IPostComment[]> = [];
    const uniqueIds: number[] = [];
    temp.forEach((item) => {
      if (!uniqueIds.includes(item.id)) {
        uniqueIds.push(item.id);
        uniqueArr.push(item);
      }
    });
    setPostComments(uniqueArr);
  };
  useEffect(() => {
    if (!isOpenComment) return;
    getAllPostComments('show');
  }, [isOpenComment]);
  useEffect(() => {
    setPostClone(post);
    getAllPostComments('show');
  }, [post]);
  const getContentHasLink = (content: string) => {
    let result = '<p style="font-size: 16px; word-break: break-all">';
    let temp = content.split(' ');
    temp.forEach((text, i) => {
      if (validURL(text)) {
        result += ` <a href="${text}" target='_blank'>${text}</a>`;
      } else {
        result += ` ${text}`;
      }
    });
    result += '</p>';
    return result;
  };
  return (
    <Box className={classes.postItem}>
      <Box mr={2}>
        <CardMedia
          image={
            post.userAvatarUrl
              ? post.userAvatarUrl
              : '/images/default-avatar.png'
          }
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        />
      </Box>
      <Box width="calc(100% - 55px)">
        <Box display="flex" alignItems="center">
          <Typography className={classes.boldText}>
            {post.userNickname
              ? post.userNickname
              : renderShortAddress(post.userAddress, 4, 4)}
          </Typography>
          <Typography
            style={{
              fontSize: 14,
              color: '#616161',
            }}
          >
            {timeSince(new Date(post.createdAt))} ago
          </Typography>
        </Box>
        <Box className={!isHasShowMore ? classes.desFull : classes.desNoFull}>
          <Box
            dangerouslySetInnerHTML={{
              __html: getContentHasLink(post.content),
            }}
          />
        </Box>
        {isHasShowMore && (
          <Box
            className={classes.showMore}
            onClick={() => setIsHasShowMore(false)}
          >
            <Typography>Show more</Typography>
            <DownIcon />
          </Box>
        )}
        {post.coverUrl && (
          <img
            src={post.coverUrl}
            alt={post.content}
            style={{
              marginTop: 8,
              maxWidth: '100%',
              maxHeight: '500px',
            }}
          />
        )}
        <Box
          className={classes.footer}
          onClick={() => {
            setIsOpenComment(!isOpenComment);
          }}
        >
          <MessageIcon />
          <Typography>{postClone.countCommentPost}</Typography>
        </Box>

        {isOpenComment && (
          <Box className={classes.wrapperPostComment}>
            <Box position="relative" width="100%">
              <CommonInput
                placeholder="Write a comment"
                value={content}
                onChange={handleChangeContent}
                onKeyDown={(e: any) => {
                  e.key === 'Enter' && createNewPostComment();
                }}
                className={classes.input}
              />
              <Button
                onClick={createNewPostComment}
                className={classes.buttonPublish}
              >
                Publish
              </Button>
            </Box>
            {postComments && postComments?.length > 0 && (
              <Box className={classes.commentWrapper}>
                {postComments.map((p, i) => {
                  return (
                    <Box
                      key={i}
                      style={{
                        borderBottom:
                          i != postComments.length - 1
                            ? '1px solid #616161'
                            : 'unset',
                        padding: '12px 0px',
                        display: 'flex',
                      }}
                    >
                      <Box mr={2}>
                        <CardMedia
                          image={
                            p.user.avatarUrl
                              ? p.user.avatarUrl
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
                            {p.user.nickname
                              ? p.user.nickname
                              : renderShortAddress(p.user.address, 4, 4)}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: 14,
                              color: '#616161',
                            }}
                          >
                            {timeSince(new Date(p.createdAt))} ago
                          </Typography>
                        </Box>
                        <Box
                          dangerouslySetInnerHTML={{
                            __html: getContentHasLink(p.content),
                          }}
                        />
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            )}
            {page * 3 < postClone.countCommentPost && (
              <Box
                className={classes.showMore}
                onClick={async () => {
                  setPage(page + 1);
                  const data = await postSvc.GetAllPostComment({
                    pageNumber: page + 1,
                    pageSize: 3,
                    postId: post.id,
                  });
                  let temp = [];
                  temp = [...postComments, ...data.data];
                  setPostComments(temp);
                }}
              >
                <Typography>Show more</Typography>
                <DownIcon />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default PostItem;

const useStyles = makeStyles((theme) => ({
  container: {},
  commentWrapper: {},
  postItem: {
    background: '#1c1c1e',
    display: 'flex',
    padding: 16,
    '& p': {
      color: '#BDBDBD',
    },
    marginBottom: 16,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 600,
    marginRight: 8,
  },
  desNoFull: {
    width: '100%',
    height: 120,
    overflow: 'hidden',
  },
  desFull: {
    width: '100%',
  },
  showMore: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1C1C1E',
    cursor: 'pointer',
    '& p': {
      fontSize: 16,
      color: '#029ADE',
    },
    '& svg': {
      color: '#029ADE',
      height: 16,
      width: 16,
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: 8,
    '& svg': {
      width: 16,
      height: 16,
      marginRight: 4,
    },
  },
  wrapperPostComment: {
    marginTop: 12,
  },
  buttonPublish: {
    background: 'white',
    borderRadius: 2,
    position: 'absolute',
    right: 8,
    top: 8,
    color: 'black',
    '& span': {
      padding: '4px 8px',
    },
  },
  input: {
    border: '1px solid #616161',
    padding: '14px 0px 14px 4px',
    '&>div:first-child': {
      width: 'calc(100% - 75px)',
    },
  },
}));
