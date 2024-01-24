import { Box, Button, CardMedia, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommonInput from 'components/common/CommonInput';
import WalletConnectDialog from 'components/WalletConnect';
import { renderShortAddress, timeSince } from 'helpers';
import commentSvc from 'services/comments';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { getCurrentUserState, getEventDetail } from 'store/selectors';
import { IComment } from 'types/comment';

import { useStyles } from './styles';

const Comments = () => {
  const classes = useStyles();
  const event = useSelector(getEventDetail);
  const [comments, setComments] = useState<IComment[]>([]);
  const [cmtContent, setCmtContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { active, account } = useWeb3React();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserState);
  const getComment = async (page: number) => {
    if (!event) return;
    let data = await commentSvc.GetAllReport({
      pageNumber: page,
      pageSize: 4,
      eventId: event?.id,
    });
    setTotalPage(data.total);
    setComments(data.data);
  };
  const createNewComment = async () => {
    if (!active) {
      dispatch(
        updateDialogStateAction({
          open: true,
          component: <WalletConnectDialog />,
        }),
      );
      return;
    }
    if (!event || cmtContent == '') return;
    await commentSvc.CreateNewComment({
      content: cmtContent,
      userId: currentUser.id,
      eventId: event?.id,
    });
    setCmtContent('');
    getComment(1);
  };
  const onChangePage = (event: any, page: number) => {
    console.log('page', page);
    setCurrentPage(page);
    getComment(page);
  };
  useEffect(() => {
    getComment(1);
  }, [event]);
  const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setCmtContent(newValue);
  };
  return (
    <Box className={classes.wrapperComment}>
      <Box className={classes.commentHeader}>
        <Typography>Comments</Typography>
      </Box>
      <Box className={classes.commentZone}>
        <Box position="relative">
          <CommonInput
            placeholder="Write a comment"
            value={cmtContent}
            onChange={handleChangeComment}
            onKeyDown={(e: any) => {
              e.key === 'Enter' && createNewComment();
            }}
            className={classes.input}
          />
          <Button onClick={createNewComment} className={classes.buttonPublish}>
            Publish
          </Button>
        </Box>
        {comments.length == 0 && (
          <Box className="center-root" flexDirection="column">
            <Typography style={{ fontWeight: 600, marginTop: 6 }}>
              No comment yet
            </Typography>
            <Typography>Be the first comment!</Typography>
          </Box>
        )}
        {comments.length > 0 && (
          <Box className={classes.wrapperHistory}>
            {comments.map((o: IComment, i: number) => {
              return (
                <Box
                  key={o.id}
                  className={classes.historyItem}
                  style={{
                    borderBottom:
                      i != comments.length - 1 ? '1px solid #616161' : 'unset',
                  }}
                >
                  <CardMedia
                    image={
                      o.user.avatarUrl
                        ? o.user.avatarUrl
                        : '/images/default-avatar.png'
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 30,
                    }}
                  />
                  <Box ml={1} width="calc(100% - 48px)">
                    <Box display="flex" justifyContent="space-between">
                      <Typography className={classes.boldText}>
                        {o.user.nickname
                          ? o.user.nickname
                          : renderShortAddress(o.user.address, 4, 4)}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: 14,
                          color: '#616161',
                        }}
                      >
                        {timeSince(new Date(o.createdAt))} ago
                      </Typography>
                    </Box>
                    <Typography className={classes.infoText}>
                      {o.content}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            <Box className="center-root">
              <Pagination
                page={currentPage}
                count={Math.ceil(totalPage / 4)}
                variant="outlined"
                shape="rounded"
                siblingCount={0}
                className={classes.pagination}
                onChange={onChangePage}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default Comments;
