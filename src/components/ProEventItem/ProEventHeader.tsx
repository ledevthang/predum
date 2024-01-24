import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import RenderIConByCategory from 'components/common/RenderIConByCategory';
import React, { useMemo } from 'react';
import { IEvent } from 'types/event';
import { useStyles } from './styles';

const ProEventHeader = ({ event }: { event: IEvent }) => {
  const classes = useStyles();
  const renderCategory = useMemo(() => {
    return (
      event.subCategory && (
        <Box className={clsx('center-root', classes.category)}>
          <RenderIConByCategory category={event.subCategory} color="#BDBDBD" />
          <Typography>{event.subCategory}</Typography>
        </Box>
      )
    );
  }, [event.subCategory]);
  return (
    <Box className={clsx(classes.wapperHeader)}>
      <Typography>{event.category}</Typography>
      {event.subCategory && renderCategory}
    </Box>
  );
};

export default ProEventHeader;
