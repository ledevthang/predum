import { Box } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import Comments from './Comments';
import EventInfo from './EventInfo';
import PoolInfo from './PoolInfo';
import { useStyles } from './styles';

const RightBarDetailEvent = () => {
  const classes = useStyles();
  const [isEndedScroll, setIsEndedScroll] = useState(false);
  useEffect(() => {
    let elm = document.getElementById('right-bar');
    if (elm) {
      elm.addEventListener('scroll', (e: any) => {
        const scrollHeight = e.srcElement.scrollHeight;
        const scrollTop = e.srcElement.scrollTop;
        if (scrollHeight - scrollTop < 860) {
          setIsEndedScroll(true);
        } else {
          setIsEndedScroll(false);
        }
      });
    }
  }, []);
  return (
    <Box
      className={clsx(classes.container, { [classes.test]: isEndedScroll })}
      id="right-bar"
    >
      <EventInfo />
      <PoolInfo />
      <Comments />
    </Box>
  );
};
export default RightBarDetailEvent;
