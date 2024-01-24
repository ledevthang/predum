import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import ListHostHistory from 'components/PredictHistory/ListHostHistory';
import ListPrediction from 'components/PredictHistory/ListPrediction';
import ListProHostHistory from 'components/PredictHistory/ListProHostHistory';
import PredictHistoryFilter from 'components/PredictHistory/PredictHistoryFilter';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EPredictHistoryFilter } from 'types/prediction';
import { useStyles } from './styles';

const PredictHistory = () => {
  const [filter, setFilter] = useState(
    EPredictHistoryFilter.PREDICTION_HISTORY,
  );
  const classes = useStyles();

  const history = useHistory();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [choosedOption, setChoosedOption] = useState('As Sponsor');
  const onRedirectToHome = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <Box>
      {isDesktop && (
        <Box className={classes.wrapperHeader}>
          <Button onClick={onRedirectToHome}>Home</Button>
          <Typography>/</Typography>
          <Button>{filter}</Button>
        </Box>
      )}
      <PredictHistoryFilter filter={filter} setFilter={setFilter} />
      {filter === EPredictHistoryFilter.PREDICTION_HISTORY ? (
        <ListPrediction />
      ) : (
        <>
          {/* <SortHistory
            sortHistory={sortHistory}
            choosedOption={choosedOption}
            setChoosedOption={setChoosedOption}
          /> */}
          {choosedOption == 'As Sponsor' && <ListHostHistory />}
          {choosedOption == 'As Influencer' && <ListProHostHistory />}
        </>
      )}
    </Box>
  );
};

export default PredictHistory;
