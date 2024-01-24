import { Box, CardMedia, Typography } from '@material-ui/core';
import clsx from 'clsx';
import RenderIConByCategory from 'components/common/RenderIConByCategory';
import ComponentWithTooltip from 'components/HostPredictionV2/ComponentWithTooltip';
import { convertTime } from 'helpers';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  getCoinSelected,
  getFixtureSelected,
  getMarketInfo,
} from 'store/selectors';
import { useStyles } from './EventDetailReviewStyle';

const EventDetailReview = () => {
  const marketInfo = useSelector(getMarketInfo);
  const classes = useStyles();
  const fixture = useSelector(getFixtureSelected);
  const coin = useSelector(getCoinSelected);

  const renderThumbnail = () => {
    if (!marketInfo.thumbnailUrl) {
      if (coin) {
        return <CardMedia image={coin.logo} className={classes.img} />;
      }
      if (!fixture) return;
      const teamsMeta = JSON.parse(fixture.teamsMeta);
      return (
        <Box className={clsx(classes.img, 'center-root')} bgcolor="#111111">
          <CardMedia image={teamsMeta.home.logo} className={classes.teamLogo} />
          <Typography className={classes.vs}>VS</Typography>
          <CardMedia image={teamsMeta.away.logo} className={classes.teamLogo} />
        </Box>
      );
    } else {
      return (
        <Box className={classes.img}>
          <CardMedia
            image={URL.createObjectURL(marketInfo.thumbnailUrl)}
            className={classes.img}
          />
        </Box>
      );
    }
  };

  return (
    <ComponentWithTooltip isAnnotate={false} title="Event Detail">
      <Box className={classes.container}>
        {renderThumbnail()}
        <Box className={classes.main}>
          {marketInfo.subcategoryName && (
            <Box className={classes.category}>
              <RenderIConByCategory
                category={marketInfo.subcategoryName}
                color="#BDBDBD"
              />
              <Typography>{marketInfo.subcategoryName}</Typography>
            </Box>
          )}
          <Typography className={classes.name}>
            {marketInfo.eventName}
          </Typography>
          <Box display="flex" mt={1} className={classes.wrapperTime}>
            <Box className={classes.time}>
              <Typography>Deadline</Typography>
              <Typography>{convertTime(marketInfo.deadline)}</Typography>
            </Box>
            <Box className={classes.time}>
              <Typography>End time</Typography>
              <Typography>
                {marketInfo.endTime
                  ? convertTime(marketInfo.endTime)
                  : 'Pending end time'}
              </Typography>
            </Box>
          </Box>
          <Typography className={classes.description}>
            {marketInfo.description}
          </Typography>
        </Box>
      </Box>
    </ComponentWithTooltip>
  );
};

export default EventDetailReview;
