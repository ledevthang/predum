import {
  Box,
  // Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import CommonTooltip from 'components/common/CommonTooltip';
import CommonTooltipMobile from 'components/common/CommonTooltipMobile';
import HandHoldingAGear from 'icon/HandHoldingAGear';
import InfoIcon from 'icon/InfoIcon';
import UserIcon from 'icon/UserIcon';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isProd } from 'services/wallet';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import {
  getEventDataSource,
  getEventIdentity,
  getHostPrediction,
} from 'store/selectors';
import { EDataSource, EKindOfEvent } from 'types/proEvent';
import { useStyles } from './DataSourceStyles';

const DataSource = () => {
  const classes = useStyles();
  const dataSource = useSelector(getEventDataSource);
  const identity = useSelector(getEventIdentity);
  const { kindOfEvent } = useSelector(getHostPrediction);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const onChangeDataSource = useCallback(
    (source: EDataSource) => {
      dispatch(
        updateHostPredictionStateAction({
          dataSource: source,
        }),
      );
    },
    [dispatch, dataSource],
  );
  const isSportDataProvider = useMemo(() => {
    return dataSource == EDataSource.SPORT_DATA_PROVIDER;
  }, [dataSource]);

  useEffect(() => {
    dispatch(
      updateHostPredictionStateAction({
        error: false,
        errorPool: false,
        ...(isProd &&
          kindOfEvent == EKindOfEvent.USER_VS_POOL && {
            dataSource: EDataSource.MYSELF,
          }),
      }),
    );
  }, [kindOfEvent]);

  return (
    <Box className={classes.wrapperType}>
      <Box
        className={clsx(
          classes.type,
          {
            [classes.selected]: isSportDataProvider,
            // [classes.disabled]: isProd,
          },
          classes.marginRight,
        )}
        onClick={() => onChangeDataSource(EDataSource.SPORT_DATA_PROVIDER)}
      >
        <Box
          className={clsx(classes.wrapperIcon, {
            [classes.wrapperIconSelected]: isSportDataProvider,
          })}
        >
          <HandHoldingAGear />
          <Typography
            className={clsx(classes.users, {
              [classes.selectedText]: isSportDataProvider,
            })}
          >
            From
          </Typography>
          <Box className={classes.wrapperNameAndIcon}>
            <Typography
              className={clsx(classes.dataSource, {
                [classes.selectedText]: isSportDataProvider,
              })}
            >
              Pro data provider
            </Typography>
            {isDesktop ? (
              <CommonTooltip title="Data and result of the event will be provided by a trusted data provider.">
                <InfoIcon />
              </CommonTooltip>
            ) : (
              <CommonTooltipMobile title="Data and result of the event will be provided by a trusted data provider.">
                <InfoIcon />
              </CommonTooltipMobile>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        className={clsx(classes.type, {
          [classes.selected]: dataSource == EDataSource.MYSELF,
        })}
        onClick={() => onChangeDataSource(EDataSource.MYSELF)}
      >
        <Box
          className={clsx(classes.wrapperIcon, {
            [classes.wrapperIconSelected]: !isSportDataProvider,
          })}
        >
          <UserIcon />
          <Typography
            className={clsx(classes.users, {
              [classes.selectedText]: !isSportDataProvider,
            })}
          >
            From
          </Typography>
          <Box className={classes.wrapperNameAndIcon}>
            <Typography
              className={clsx(classes.dataSource, {
                [classes.selectedText]: !isSportDataProvider,
              })}
            >
              Myself
            </Typography>
            {isDesktop ? (
              <CommonTooltip title="Data and result of the event will be provided by you (the host)">
                <InfoIcon />
              </CommonTooltip>
            ) : (
              <CommonTooltipMobile title="Data and result of the event will be provided by you (the host)">
                <InfoIcon />
              </CommonTooltipMobile>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DataSource;
