import { makeStyles } from '@material-ui/core';
import ArrowLeftIcon from 'icon/ArrowLeftIcon';
import React from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import Arrow from './Arrow';

const LeftArrow = () => {
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleItemsWithoutSeparators,
    initComplete,
  } = React.useContext(VisibilityContext);

  const classes = useStyles();

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible),
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow
      disabled={disabled}
      onClick={() => scrollPrev()}
      className={classes.container}
    >
      <ArrowLeftIcon />
    </Arrow>
  );
};

export default LeftArrow;

const useStyles = makeStyles((theme) => ({
  container: {
    top: 10,
  },
}));
