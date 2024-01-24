import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import WalletConnectDialog from 'components/WalletConnect';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { useStyles } from './styles';
import bannerService from 'services/public';
import { IBanner } from 'types/public';
import 'react-slideshow-image/dist/styles.css';
//@ts-ignore
import { Slide } from 'react-slideshow-image';
import clsx from 'clsx';

export const NewBanner = () => {
  const classes = useStyles();
  const { active } = useWeb3React();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [banners, setBanners] = useState<IBanner[]>([]);

  useEffect(() => {
    (async () => {
      const data = await bannerService.GetAllBanners();
      setBanners([data[0]]);
    })();
  }, []);

  const onRedirectHostPrediction = useCallback(
    (e: any) => {
      if (!active) {
        dispatch(
          updateDialogStateAction({
            open: true,
            component: <WalletConnectDialog />,
          }),
        );
      }
      if (active && history.location.pathname != '/host-prediction') {
        e.stopPropagation();
        history.push('/host-prediction');
      }
    },
    [history, dispatch, active],
  );

  const onRedirectToPage = useCallback((link: string) => {
    if (link.startsWith('/') && history.location.pathname != link) {
      history.push(link);
      return;
    }
    if (window.location.href != link) window.open(link, '_blank');
  }, []);

  return (
    <Box className={classes.container}>
      <Slide
        infinite
        arrows={false}
        indicators={(index: number) => (
          <Box className={classes.indicator}></Box>
        )}
        duration={15000}
        transitionDuration={500}
      >
        {banners.map((v, i) => (
          <Box
            key={i}
            className={clsx(classes.banner)}
            style={{ backgroundImage: `url(${isMobile ? v.logoSm : v.logo})` }}
            onClick={() => onRedirectToPage(v.link)}
          >
            {v.link.startsWith('/') && (
              // <Box className={classes.sologanWapper}>
              <Box className={'center-root'} flexDirection="column">
                <Typography className={classes.sologan}>
                  Host your event now
                </Typography>
                <Typography className={classes.descSologan}>
                  Host your own prediction with EFUN
                </Typography>
                <Button
                  className={classes.buttonBanner}
                  onClick={onRedirectHostPrediction}
                >
                  Host Prediction
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </Slide>
    </Box>
  );
};
