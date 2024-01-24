import { Box, CardMedia, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './OtherEventStyles';

interface IProps {
  id: number;
  thumbnailUrl: string;
  name: string;
}

const OtherEventItem = ({ id, thumbnailUrl, name }: IProps) => {
  const classes = useStyles();
  const history = useHistory();
  const onChangeEvent = useCallback(() => {
    history.push(`/detail-event/${id}`);
  }, [id, history]);

  return (
    <Box className={classes.main} onClick={onChangeEvent}>
      <CardMedia image={thumbnailUrl} className={classes.img} />
      <Box className={classes.name}>
        <Typography>{name}</Typography>
      </Box>
    </Box>
  );
};

export default OtherEventItem;
