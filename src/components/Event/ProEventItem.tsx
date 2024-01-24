import {
  Box,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useStyles } from './ProEventItemStyles';
import clsx from 'clsx';
import ProEventBody from './ProEventBody';
import { IEvent } from 'types/event';
import TooltipTypography from 'components/common/TooltipTypography';

interface IProps {
  type: string;
  isSameListing?: boolean;
  event?: IEvent;
}

const ProEventItem = ({ type, isSameListing, event }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [fixture, setFixture] = useState<any>();
  const [isHasScore, setIsHasScore] = useState(false);
  const shouldShowScore = useMemo(() => {
    return !isSameListing;
  }, [isSameListing]);
  useEffect(() => {
    let goalsMeta = JSON.parse(event?.goalsMeta || '');
    if (goalsMeta.home != null) {
      setIsHasScore(true);
    }
  }, []);

  useEffect(() => {
    let metadata = JSON.parse(event?.metadata || '');
    let fixtureMeta = JSON.parse(metadata.fixtureMeta || '');
    setFixture(fixtureMeta);
  }, [event]);

  const renderLabel = useMemo(() => {
    switch (type) {
      case 'Home/Draw/Away':
        return (
          <Box className={classes.wrapperHeader2}>
            {isHasScore && <Typography>Score</Typography>}
            <Box>
              <TooltipTypography text={JSON.parse(event?.options || '')[0]} />
              <Typography>Draw</Typography>
              <TooltipTypography text={JSON.parse(event?.options || '')[2]} />
            </Box>
          </Box>
        );
      case 'Handicap':
        return (
          <Box className={classes.wrapperHeader2}>
            {isHasScore && <Typography>Score</Typography>}
            <Box>
              <TooltipTypography text={JSON.parse(event?.options || '')[0]} />
              <Typography>Handicap</Typography>
              <TooltipTypography text={JSON.parse(event?.options || '')[4]} />
            </Box>
          </Box>
        );
      case 'Over/Under':
        return (
          <Box
            className={clsx(
              classes.wrapperHeader2,
              classes.wrapperHeaderOverUnder,
            )}
          >
            {isHasScore && <Typography>Score</Typography>}
            <Box>
              <Typography> Over/Under</Typography>
            </Box>
          </Box>
        );
    }
  }, [isMobile, type, isHasScore, event?.options]);

  return (
    <Box className={classes.container1}>
      <Box className={classes.container}>
        <Box className={classes.header}>
          <Box className={classes.wrapperHeader}>
            <CardMedia
              image={fixture?.league.logo || ''}
              className={classes.competitionLogo}
            />
            <Typography className={classes.competitionName}>
              {fixture?.league.name || ''}
            </Typography>
          </Box>
          {!isMobile && renderLabel}
        </Box>
        <Box className={classes.wrapperBody}>
          {fixture &&
            [1].map((e) => (
              <ProEventBody
                key={e}
                type={type}
                renderLabel={renderLabel}
                event={event}
                fixture={fixture}
                isHasScore={isHasScore}
                isSameListing={isSameListing}
              />
            ))}
        </Box>
      </Box>
      {/* <Box width="100%" display="flex" justifyContent="flex-end">
        <Button className={classes.otherBtn}>
          {isSameListing ? 'Show more' : 'View odds from other hosts'}
          <ArrowRightIcon />
        </Button>
      </Box> */}
    </Box>
  );
};

export default ProEventItem;
