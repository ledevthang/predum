import React, { useMemo } from 'react';
import {
  Box,
  Button,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { IFixture } from 'types/fixture';
import { useStyles } from './EventInfoItemStyle';
import FootballIcon from 'icon/sidebar/FoorballIcon';
import dayjs from 'dayjs';
import TooltipTypography from 'components/common/TooltipTypography';
import { getTimeZone } from 'helpers';
import CommonTooltip from 'components/common/CommonTooltip';
import CommonTooltipMobile from 'components/common/CommonTooltipMobile';
import InfoIcon from 'icon/InfoIcon';

interface IProps {
  fixture: IFixture;
  itemId: number;
  width?: number | string;
  onClick: () => void;
  isP2P?: boolean;
  isAffiliate?: boolean;
}

const EventInfoItem = ({
  fixture,
  width,
  onClick,
  isAffiliate,
  isP2P,
}: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const competitionMeta = useMemo(() => {
    return JSON.parse(fixture.leagueMeta);
  }, [fixture.leagueMeta]);

  const fixtureHasOdd = useMemo(() => {
    if (!fixture.oddMeta) return false;
    return JSON.parse(fixture.oddMeta).results > 0;
  }, [fixture.oddMeta]);

  const teamsMeta = useMemo(() => {
    return JSON.parse(fixture.teamsMeta);
  }, [fixture.teamsMeta]);

  const width1 = width ? { width } : {};

  const disabled = useMemo(() => {
    if (new Date(fixture.date).getTime() <= Date.now() + 1000 * 60 * 60)
      return true;
    return false;
  }, [fixture.date]);

  return (
    <Box className={classes.container} {...width1}>
      <Box className={classes.header}>
        <Box display="flex" alignItems="center">
          <CardMedia
            image={competitionMeta.logo}
            className={classes.competitionLogo}
          />
          <Typography className={classes.competitionName}>
            {competitionMeta.name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <FootballIcon width={16} height={16} />
          <Typography className={classes.competitionName}>Football</Typography>
        </Box>
      </Box>
      <Box className={classes.main}>
        <Box className="center-root">
          <CardMedia image={teamsMeta.home.logo} className={classes.teamLogo} />
          <Typography className={classes.vs}>VS</Typography>
          <CardMedia image={teamsMeta.away.logo} className={classes.teamLogo} />
        </Box>
        <TooltipTypography
          className={classes.teams}
          text={`${teamsMeta.home.name} - ${teamsMeta.away.name}`}
        />
        <Box className={classes.wrapperDateTime}>
          <Typography>
            {dayjs(fixture.date).format('DD MMMM YYYY - ')}
          </Typography>
          <Typography>{dayjs(fixture.date).format('HH:mm')}</Typography>
          <Typography>{`${getTimeZone()}`}</Typography>
        </Box>
      </Box>
      {isAffiliate && (
        <Box className={classes.wrapperCommission}>
          <Box className={classes.commission}>
            <Typography>Commission:</Typography>
            <Typography>0.5%</Typography>
          </Box>
          {isDesktop ? (
            <CommonTooltip
              title={
                'When there is a new prediction, you will receive 0.5% of the prediction amount'
              }
            >
              <InfoIcon />
            </CommonTooltip>
          ) : (
            <CommonTooltipMobile
              title={
                'When there is a new prediction, you will receive 0.5% of the prediction amount'
              }
            >
              <InfoIcon />
            </CommonTooltipMobile>
          )}
        </Box>
      )}
      <Box width="100%" display="flex" justifyContent="center">
        {fixtureHasOdd || isP2P ? (
          <Button
            className={classes.host}
            onClick={onClick}
            disabled={disabled}
          >
            SELECT TO HOST
          </Button>
        ) : (
          <Typography
            style={{
              marginBottom: 10,
              fontWeight: 500,
            }}
          >
            Odds are not ready. Please try again later
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default EventInfoItem;
