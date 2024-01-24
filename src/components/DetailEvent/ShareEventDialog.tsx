import { Box, Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';

import CopyIcon from 'icon/CopyIcon';
import EmbedIcon from 'icon/EmbedIcon';
import FacebookIcon2 from 'icon/FacebookIcon';
import MessengerIcon2 from 'icon/MessengerIcon';
import TelegramIcon2 from 'icon/TelegramIcon';
import TwitterIcon2 from 'icon/TwitterIcon';
import VerifyIcon from 'icon/VerifyIcon';
import { updateDialogStateAction } from 'store/actions/dialogActions';

import EmbedPreview from './EmbedPreview';
import { useStyles } from './ShareEventDialogStyles';

const ShareEventDialog = ({ link }: { link?: string }) => {
  const classes = useStyles();
  const [isCopy, setCopy] = useState(false);
  const dispatch = useDispatch();
  const copyEventLink = useCallback(() => {
    navigator.clipboard.writeText(link ? link : window.location.href);
    setCopy(true);
  }, []);
  const handleClickEmbed = () => {
    console.log('rin');
    dispatch(
      updateDialogStateAction({
        open: true,
        component: <EmbedPreview url={link ? link : window.location.href} />,
      }),
    );
  };
  return (
    <Box className={clsx(classes.container, 'center-root')}>
      <Typography className={classes.shareMatch}>Share match</Typography>
      <Typography className={classes.description}>
        Invite your friend join the game by copy and send the URL to them
      </Typography>
      <Box className={classes.shareBox}>
        <Typography>{link ? link : window.location.href}</Typography>
        <Button onClick={copyEventLink}>
          {isCopy ? <VerifyIcon /> : <CopyIcon color="#FFFFFF" />}
        </Button>
      </Box>
      {isCopy && (
        <Typography className={classes.italic}>URL has been copied</Typography>
      )}
      <Box
        width="200px"
        display="flex"
        mt={1}
        justifyContent="space-between"
        className={classes.wapperIcon}
      >
        <FacebookShareButton
          title={'Win tokens now by joining a prediction games'}
          url={link ? link : window.location.href}
        >
          <FacebookIcon2 />
        </FacebookShareButton>
        <FacebookMessengerShareButton
          appId="421039428061656"
          title={'Win tokens now by joining a prediction games'}
          url={link ? link : window.location.href}
        >
          <MessengerIcon2 />
        </FacebookMessengerShareButton>
        <TwitterShareButton
          title={'Win tokens now by joining a prediction games'}
          url={link ? link : window.location.href}
        >
          <TwitterIcon2 />
        </TwitterShareButton>
        <TelegramShareButton
          title={'Win tokens now by joining a prediction games'}
          url={link ? link : window.location.href}
        >
          <TelegramIcon2 />
        </TelegramShareButton>
        <Box
          style={{
            cursor: 'pointer',
          }}
          onClick={() => handleClickEmbed()}
        >
          <EmbedIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default ShareEventDialog;
