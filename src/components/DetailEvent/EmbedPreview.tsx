import {
  Box,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CommonSelectInput from 'components/common/CommonSelectInput';
import CopyIcon from 'icon/CopyIcon';
import VerifyIcon from 'icon/VerifyIcon';

const EmbedPreview = ({ url }: { url: string }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [themeWidget, setThemeWidget] = useState('dark');
  const [isCopy, setIsCopy] = useState(false);
  const copyEmbedLink = useCallback(() => {
    navigator.clipboard.writeText(`<iframe
    title="Predum game of prediction"
    src=${url.replace('detail-event', 'widget').concat('/', themeWidget)}
    width="100%"
    height="410"
  ></iframe>`);
    setIsCopy(true);
  }, [themeWidget]);
  useEffect(() => {
    setIsCopy(false);
  }, [themeWidget]);
  const typeTheme = useMemo(() => {
    return [
      { value: 'Dark theme', id: 'dark' },
      { value: 'Light theme', id: 'light' },
    ];
  }, []);
  return (
    <Box
      display="flex"
      flexDirection={isDesktop ? 'row' : 'column'}
      style={{
        overflow: 'hidden',
      }}
    >
      <Box className={classes.wrapperIframe}>
        <iframe
          title="Predum game of prediction"
          src={`${url.replace('detail-event', 'widget')}/${themeWidget}`}
          width="100%"
          height="400"
        ></iframe>
      </Box>
      <Box className={classes.wrapper}>
        <Typography>Embed this prediction game to your website</Typography>
        <Box className={classes.wrapperCode}>
          <Typography>
            {`<iframe
          title="Predum game of prediction"
          src=${url.replace('detail-event', 'widget').concat('/', themeWidget)}
          width="100%"
          height="410"
        ></iframe>`}
          </Typography>
          <Box className={classes.copy} onClick={copyEmbedLink}>
            <Typography>Copy</Typography>
            {isCopy ? (
              <VerifyIcon color="#1c1c1e" />
            ) : (
              <CopyIcon color="#FFFFFF" />
            )}
          </Box>
        </Box>
        <Box mt={2}>
          <Typography>Theme</Typography>
          <CommonSelectInput
            className={classes.select}
            values={typeTheme}
            currentValue={themeWidget}
            onChange={(e: any) => {
              setThemeWidget(e.target.value);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default EmbedPreview;
const useStyles = makeStyles((theme) => ({
  wrapperIframe: {
    width: 775,
    height: 410,
    marginRight: 20,
    [theme.breakpoints.down('md')]: {
      marginRight: 0,
      marginBottom: 12,
    },
    [theme.breakpoints.down('sm')]: {
      width: 'unset',
      height: 'unset',
    },
  },
  select: {
    marginTop: 8,
  },
  wrapper: {
    height: 410,
    width: 300,
    background: '#1C1C1E',
    padding: 16,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 'fit-content',
      overflowY: 'auto',
    },
  },
  wrapperCode: {
    marginTop: 12,
    background: '#2C2C2F',
    padding: 12,
  },
  copy: {
    marginTop: 12,
    borderTop: '1px solid #BDBDBD',
    padding: '10px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& svg': {
      width: 16,
      height: 16,
      marginLeft: 4,
    },
  },
}));
