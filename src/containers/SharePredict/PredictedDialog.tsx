import {
  Box,
  Button,
  CardMedia,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import html2canvas from 'html2canvas';
import clsx from 'clsx';
import {
  convertThousandSeperator,
  renderShortAddress,
  sendFileToIPFS,
} from 'helpers';
import {
  renderAmount,
  renderOption,
  renderReward,
  renderUnit,
} from 'helpers/predictFunc';
import { usePlatformFee } from 'hooks/usePlatformFee';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { IPrediction } from 'types/prediction';
import predictionService from 'services/predictions';
import TelegramIcon2 from 'icon/TelegramIcon';
import TwitterIcon2 from 'icon/TwitterIcon';
import FacebookIcon2 from 'icon/FacebookIcon';
import MessengerIcon2 from 'icon/MessengerIcon';

interface IProps {
  eventId: number;
  predictDetail: IPrediction;
  isPredict?: boolean;
}

const PredictedDialog = ({ eventId, predictDetail, isPredict }: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { uvpPlatformFee: UVP_PLATFORM_FEE, uvuPlatformFee: P2P_PLATFORM_FEE } =
    usePlatformFee();
  const dispatch = useDispatch();
  const refElement = useRef<HTMLDivElement>();

  const closeDialog = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: false,
        component: undefined,
        callback: undefined,
      }),
    );
  }, [dispatch, eventId]);
  const convertComponentToImage = async () => {
    if (!refElement) return;
    const element = refElement.current as HTMLElement;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/jpg');
    fetch(data)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'image', { type: 'image/png' });
        sendFileToIPFS(file).then((res) => {
          predictionService.UpdatePreviewPredictUrl(predictDetail.id, res);
        });
      });
  };
  useEffect(() => {
    if (!predictDetail) return;
    if (UVP_PLATFORM_FEE == 0 || P2P_PLATFORM_FEE == 0) return;
    if (isPredict && predictDetail.previewPredictUrl) return;
    convertComponentToImage();
  }, [predictDetail, UVP_PLATFORM_FEE, P2P_PLATFORM_FEE]);
  const renderInfoPredict = (
    text: string,
    value: string,
    isTrans?: boolean,
  ) => {
    return (
      <Box width="100%" mb={1} display="flex" justifyContent="space-between">
        <Typography className={classes.status}>{text}</Typography>
        <Box
          onClick={() => {
            if (!isTrans) return;
            let url =
              process.env.REACT_APP_NODE_ENV == 'production'
                ? `https://arbiscan.io/tx/${predictDetail.transactionNumber}`
                : `https://testnet.bscscan.com/tx/${predictDetail.transactionNumber}`;
            window.open(url, '_blank');
          }}
        >
          <Typography
            className={classes.status}
            style={{
              fontWeight: 600,
              color: isTrans ? '#3FADD5' : 'white',
              cursor: isTrans ? 'pointer' : 'unset',
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    );
  };
  const renderInfo = () => {
    return (
      <Box
        {...({ ref: refElement } as any)}
        width="100%"
        className="center-root"
        flexDirection="column"
        style={{
          backgroundColor: '#333333',
          padding: '10px 20px',
        }}
      >
        <Typography className={classes.notice}>
          {isPredict ? 'Prediction Successful!' : 'Congratulations!'}
        </Typography>
        <Box mt={2} mb={2} width="100%" className="center-root">
          <CardMedia
            image={
              isPredict ? '/images/tick-circle.png' : '/images/iconWon.svg'
            }
            style={{
              height: 36,
              width: 36,
            }}
          />
        </Box>
        <Typography className={classes.status}>
          {isPredict ? 'Your potential winning' : 'You won'}
        </Typography>
        <Box mt={2} width="100%" className="center-root">
          <Typography className={classes.reward}>
            {`${renderReward(
              predictDetail,
              UVP_PLATFORM_FEE,
              P2P_PLATFORM_FEE,
            )}`}
          </Typography>
        </Box>
        <Box mt={2} width="100%">
          {renderInfoPredict(
            'Event name',
            predictDetail.name.length > 50
              ? renderShortAddress(predictDetail.name, 20, 20)
              : predictDetail.name,
          )}
          {renderInfoPredict('Option selected', renderOption(predictDetail))}
          {renderInfoPredict(
            'Predict amount',
            `${convertThousandSeperator(
              renderAmount(predictDetail, UVP_PLATFORM_FEE),
            )} ${renderUnit(predictDetail)}`,
          )}
          {renderInfoPredict(
            'Transaction',
            predictDetail.blockNumber.toString(),
            true,
          )}
        </Box>
      </Box>
    );
  };
  const getUrl = () => {
    return isPredict
      ? `https://predum.io/detail-event/${eventId}`
      : `https://predum.io/detail-event/${eventId}/claim/${predictDetail.id}?ts`;
  };
  const shareInMobile = () => {
    let shareData = {
      title: 'EFUN',
      text: isPredict
        ? 'Join the prediction game now'
        : 'Ka-ching! Win tokens now by joining a prediction games',
      url: getUrl(),
    };
    navigator.share(shareData);
  };
  return (
    <Box className={clsx(classes.container, 'center-root')}>
      {renderInfo()}
      {isDesktop ? (
        <Box
          className={clsx(classes.shareZone, 'center-root')}
          flexDirection="column"
        >
          <Typography
            style={{
              fontSize: 18,
              lineHeight: '22px',
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            {isPredict ? 'Share prediction' : 'Share winning'}
          </Typography>
          <Box
            width="200px"
            display="flex"
            mt={1}
            justifyContent="space-between"
            className={classes.wapperIcon}
          >
            <FacebookShareButton
              title={
                isPredict
                  ? 'Join the prediction game now'
                  : 'Ka-ching! Win tokens now by joining a prediction games'
              }
              url={getUrl()}
            >
              <FacebookIcon2 />
            </FacebookShareButton>
            <FacebookMessengerShareButton
              appId="421039428061656"
              title={
                isPredict
                  ? 'Join the prediction game now'
                  : 'Ka-ching! Win tokens now by joining a prediction games'
              }
              url={getUrl()}
            >
              <MessengerIcon2 />
            </FacebookMessengerShareButton>
            <TwitterShareButton
              title={
                isPredict
                  ? 'Join the prediction game now'
                  : 'Ka-ching! Win tokens now by joining a prediction games'
              }
              url={getUrl()}
            >
              <TwitterIcon2 />
            </TwitterShareButton>
            <TelegramShareButton
              title={
                isPredict
                  ? 'Join the prediction game now'
                  : 'Ka-ching! Win tokens now by joining a prediction games'
              }
              url={getUrl()}
            >
              <TelegramIcon2 />
            </TelegramShareButton>
          </Box>
        </Box>
      ) : (
        <Box
          className={clsx(classes.shareZone, 'center-root')}
          flexDirection="column"
        >
          <Typography
            style={{
              fontSize: 18,
              lineHeight: '22px',
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            {isPredict ? 'Share prediction' : 'Share winning'}
          </Typography>
          <Box
            width="200px"
            display="flex"
            justifyContent="space-between"
            className={classes.wapperIcon}
          >
            {/* <Button onClick={() => shareInMobile()}>
              <FacebookIcon2 />
            </Button>
            <Button onClick={() => shareInMobile()}>
              <MessengerIcon2 />
            </Button>
            <Button onClick={() => shareInMobile()}>
              <TwitterIcon2 />
            </Button>
            <Button onClick={() => shareInMobile()}>
              <TelegramIcon2 />
            </Button> */}
          </Box>
        </Box>
      )}
      <Button
        className={classes.closeBtn}
        onClick={isDesktop ? closeDialog : shareInMobile}
      >
        {isDesktop ? 'Close' : 'Share now'}
      </Button>
      {isPredict && (
        <Link
          to="/prediction-history"
          className={classes.link}
          onClick={closeDialog}
        >
          View my prediction in History
        </Link>
      )}
    </Box>
  );
};

export default PredictedDialog;
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#333333',
    width: 480,
    padding: '16px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'fit-content',
      minWidth: '320px',
      padding: '16px 20px',
    },
  },
  shareZone: {
    paddingTop: '16px',
    borderTop: '1px solid gray',
    width: '100%',
  },
  status: {
    fontSize: 14,
    lineHeight: '17px',
  },
  wapperIcon: {
    '& svg': {
      height: 36,
      width: 36,
    },
  },
  notice: {
    fontSize: 18,
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  reward: {
    fontSize: 28,
    lineHeight: '34px',
    fontWeight: 600,
  },
  description: {
    fontSize: 14,
    marginTop: 24,
    [theme.breakpoints.down('sm')]: {
      marginTop: 16,
      fontSize: 13,
    },
  },
  closeBtn: {
    borderRadius: 22,
    backgroundColor: '#BDBDBD',
    color: '#0B0B0E',
    fontSize: 14,
    fontWeight: 600,
    padding: '8px 56px !important',
    marginTop: 24,
    '&:hover': {
      background: '#BDBDBD !important',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '8px 38px !important',
      marginTop: 4,
      fontSize: 13,
    },
  },
  link: {
    textTransform: 'uppercase',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 16,
    color: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      marginTop: 8,
      fontSize: 14,
    },
  },
}));
