import { makeStyles } from '@material-ui/core';
import ArrowRightIcon from 'icon/ArrowRightIcon';
import React from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import Arrow from './Arrow';

const RightArrow = () => {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
    React.useContext(VisibilityContext);

  const classes = useStyles();

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length,
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow
      disabled={disabled}
      onClick={() => scrollNext()}
      className={classes.container}
    >
      <ArrowRightIcon />
    </Arrow>
  );
};

export default RightArrow;

const useStyles = makeStyles((theme) => ({
  container: {
    right: -20,
  },
}));
