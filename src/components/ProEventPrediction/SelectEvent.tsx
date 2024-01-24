import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  getCategoryState,
  getEventType,
  getLeagueState,
  getSelectEventState,
} from 'store/selectors';
import ListEventDesktop from './ListEventDesktop';
import ListEventMobile from './ListEventMobile';
import { useStyles } from './SelectEventStyles';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getAllLeaguesAction } from 'store/actions/leagueActions';
import { WhoTakeWith } from 'types/hostPrediction';

const SelectEvent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const competitions = useSelector(getLeagueState);
  const selectEventState = useSelector(getSelectEventState, shallowEqual);
  const categorySelected = useSelector(getCategoryState, shallowEqual);
  const eventType = useSelector(getEventType);

  const dispatch = useDispatch();

  const isUvP = useMemo(() => {
    return eventType != WhoTakeWith.USER_USER;
  }, [eventType]);

  const onSelectCompetition = useCallback(
    (id: number) => {
      dispatch(
        updateHostPredictionStateAction({
          leagueSelected: `${id}`,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(
      getAllLeaguesAction({
        subcategory: categorySelected.subcategory,
        name: categorySelected.categoryName,
        notFinised: true,
      }),
    );
  }, [categorySelected, isUvP]);

  // useEffect(() => {
  //   if (competitions.length == 0 || selectEventState.leagueSelected) return;
  //   dispatch(
  //     updateHostPredictionStateAction({
  //       leagueSelected: `${competitions[0].id}`,
  //     }),
  //   );
  // }, [competitions]);

  useEffect(() => {
    if (!selectEventState.leagueSelected || !selectEventState.fixtureId) {
      dispatch(
        updateHostPredictionStateAction({
          error: true,
        }),
      );
    } else {
      dispatch(
        updateHostPredictionStateAction({
          error: false,
        }),
      );
    }
  }, [selectEventState]);

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapperCompetitionList}>
        {competitions.map((s) => (
          <Button
            key={s.name}
            className={clsx(classes.wrapperCompetition, 'center-root', {
              [classes.competitionSelected]:
                selectEventState.leagueSelected == `${s.id}`,
            })}
            onClick={() => onSelectCompetition(s.id)}
          >
            <CardMedia image={s.logo} className={classes.competitionLogo} />
            <Typography className={classes.competitionName}>
              {s.name}
            </Typography>
          </Button>
        ))}
      </Box>
      {isMobile ? <ListEventMobile /> : <ListEventDesktop />}
    </Box>
  );
};

export default SelectEvent;
