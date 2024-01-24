import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { CHAINS } from 'common';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterAdminAction } from 'store/actions/filterAdminActions';
import { EUnit } from 'types/hostPrediction';
import { getFilerAdminState } from 'store/selectors';
import CommonDatePicker from 'components/common/CommonDatePicker';
import dayjs from 'dayjs';
import CommonSelectInput from 'components/common/CommonSelectInput';

interface IProps {
  shouldShowAllTokens?: boolean;
}

const FilterAdmin = ({ shouldShowAllTokens }: IProps) => {
  const classes = useStyles();
  const filterAdmin = useSelector(getFilerAdminState);
  const dispatch = useDispatch();

  const renderChains = useMemo(() => {
    return CHAINS.map((c) => ({
      id: c.id,
      value: c.value,
      Icon: <CardMedia image={c.icon} className={classes.coin} />,
    }));
  }, []);

  const handleChangeUnit = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateFilterAdminAction({
          token: event.target.value as EUnit,
        }),
      );
    },
    [dispatch],
  );

  const handleChangeFrom = useCallback(
    (date: Date | null) => {
      dispatch(
        updateFilterAdminAction({
          from: dayjs(date).startOf('day').toDate(),
        }),
      );
    },
    [dispatch],
  );

  const handleChangeTo = useCallback(
    (date: Date | null) => {
      dispatch(
        updateFilterAdminAction({
          to: dayjs(date).endOf('day').toDate(),
        }),
      );
    },
    [dispatch],
  );

  const onSetBeginning = useCallback(() => {
    dispatch(
      updateFilterAdminAction({
        from: dayjs(new Date(2022, 7, 1)).startOf('day').toDate(),
      }),
    );
  }, []);

  useEffect(() => {
    !shouldShowAllTokens &&
      dispatch(
        updateFilterAdminAction({
          token: process.env.REACT_APP_EFUN_TOKEN,
        }),
      );
  }, [shouldShowAllTokens]);

  return (
    <Box className={classes.container}>
      <CommonSelectInput
        values={renderChains}
        onChange={handleChangeUnit}
        currentValue={filterAdmin.token}
        className={classes.selectCoin}
        {...(shouldShowAllTokens && { label: 'All tokens' })}
      />
      <Box className={classes.wrapperDate} position="relative">
        <Typography>From</Typography>
        <CommonDatePicker
          value={filterAdmin.from || null}
          onChange={handleChangeFrom}
          className={classes.dateTime}
          maxDate={filterAdmin.to || new Date()}
          minDate={new Date(2022, 7, 1)}
        />
        <Button className={classes.fromBeginning} onClick={onSetBeginning}>
          From beginning
        </Button>
      </Box>
      <Box className={classes.wrapperDate}>
        <Typography>To</Typography>
        <CommonDatePicker
          value={filterAdmin.to || null}
          onChange={handleChangeTo}
          className={classes.dateTime}
          maxDate={new Date()}
          minDate={filterAdmin.from}
        />
      </Box>
    </Box>
  );
};

export default FilterAdmin;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 24,
    alignItems: 'end',
  },
  selectCoin: {
    backgroundColor: '#616161',
    width: 100,
    height: 44,
    '& p': {
      color: '#3FADD5',
      fontWeight: 600,
      marginRight: 4,
      fontSize: 14,
      lineHeight: 17,
    },
    '& svg': {
      height: 12,
      width: 12,
    },
  },
  coin: {
    height: 16,
    width: 16,
    marginRight: 4,
  },
  dateTime: {
    height: 44,
    backgroundColor: '#4B4B4B',
  },
  wrapperDate: {
    marginLeft: 12,
    '&>p': {
      fontSize: 14,
      marginBottom: 4,
      fontWeight: 500,
    },
  },
  fromBeginning: {
    position: 'absolute',
    top: 80,
    left: 0,
    borderRadius: 2,
    background: '#3FADD5',
    color: '#111111',
    padding: '4px 8px !important',
  },
}));
