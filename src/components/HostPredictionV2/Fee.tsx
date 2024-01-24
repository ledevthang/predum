import { Box, List, ListItem, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CommonSelectInput from 'components/common/CommonSelectInput';
import FeeIcon from 'icon/FeeIcon';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getFeeForHost, getKindOfEvent } from 'store/selectors';
import { EKindOfEvent } from 'types/proEvent';
import ComponentWithTooltip from './ComponentWithTooltip';
import { useStyles } from './FeeStyle';

const Fee = () => {
  const classes = useStyles();
  const fee = useSelector(getFeeForHost);
  const kindOfEvent = useSelector(getKindOfEvent);
  const dispatch = useDispatch();

  const handleChangeFeeOpt = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      dispatch(
        updateHostPredictionStateAction({
          feeForHost: +newValue,
        }),
      );
    },
    [dispatch],
  );

  const FEE_FOR_HOST_OPTS = useMemo(() => {
    return Array.from(Array(10).keys()).map((c) => ({
      id: c + 1,
      value: `${c + 1}% of winner's profit`,
    }));
  }, []);
  const titleFeeAnnotateP2P = () => {
    return (
      <Box className={classes.list}>
        <Typography>For P2P & Prize:</Typography>
        <List component="ul">
          {/* <ListItem disableGutters={true}>
            20 PRT will be deducted from your wallet when creating event. So
            please make sure that you have enough PRT.
          </ListItem> */}
          <ListItem disableGutters={true}>
            You can get up to 10% of all winner&apos;s profit as hosting fee.
            However, remember that higher fee may discourage users to join your
            event.
          </ListItem>
          <ListItem disableGutters={true}>
            The platform will get 1% of all winner&apos;s profit as platform
            fee.
          </ListItem>
        </List>
      </Box>
    );
  };
  const titleFeeAnnotateUvP = () => {
    return (
      <Box className={classes.list}>
        <Typography>For User vs. Pool:</Typography>
        <List component="ul">
          {/* <ListItem disableGutters={true}>
            20 PRT will be deducted from your wallet when creating event. So
            please make sure that you have enough PRT.
          </ListItem> */}
          <ListItem disableGutters={true}>
            The platform will get 0.5% of total predicted amount as fee.
          </ListItem>
        </List>
      </Box>
    );
  };
  return (
    <ComponentWithTooltip
      title="Fee"
      titleAnnotate={
        kindOfEvent === EKindOfEvent.P2P_PRIZE_POOL
          ? titleFeeAnnotateP2P()
          : titleFeeAnnotateUvP()
      }
      isAnnotate={true}
      className={classes.marginTop}
    >
      <Box className={classes.container}>
        <Box className={clsx(classes.svg, 'center-root')}>
          <FeeIcon width={64} height={64} />
        </Box>
        <Box className={classes.main}>
          {/* <Box
              display="flex"
              alignItems="end"
              borderBottom="1px solid #616161"
              pb={2}
              width="100%"
              justifyContent="space-between"
              mt={1}
            >
              <Box className={classes.wrapperText}>
                <Typography>Event creation fee</Typography>
                <Typography>
                  Taken from your wallet when event is created
                </Typography>
              </Box>
              <Typography className={classes.creationFee}>2,000 PRT</Typography>
            </Box> */}
          {kindOfEvent === EKindOfEvent.P2P_PRIZE_POOL && (
            <Box
              display="flex"
              alignItems="end"
              borderBottom="1px solid #616161"
              pb={2}
              width="100%"
              justifyContent="space-between"
              mt={1}
            >
              <Box className={classes.wrapperText}>
                <Typography>Fee for host</Typography>
                <Typography>Host can claim after the event ends</Typography>
              </Box>
              <CommonSelectInput
                values={FEE_FOR_HOST_OPTS}
                onChange={handleChangeFeeOpt}
                currentValue={fee}
                className={classes.selectFeeForHost}
              />
            </Box>
          )}

          <Box
            display="flex"
            alignItems="end"
            pb={2}
            width="100%"
            justifyContent="space-between"
            mt={1}
          >
            <Box className={classes.wrapperText}>
              <Typography>Fee for platform</Typography>
              <Typography>Platform will receive after event ends</Typography>
            </Box>
            <Typography className={classes.feePlatform}>
              {kindOfEvent === EKindOfEvent.P2P_PRIZE_POOL
                ? `1% of winner's profit`
                : `0.5% of total predicted amount`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </ComponentWithTooltip>
  );
};

export default Fee;
