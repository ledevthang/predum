import LoadingButton from 'components/common/LoadingButton';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { blockEvent, unlockEvent } from 'store/actions/eventActions';
import { IEvent } from 'types/event';
import { useStyles } from './styles';

interface IProps {
  row: IEvent;
  status: string;
}
const Action = ({ row, status }: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoading2, setIsLoading2] = React.useState(false);

  const callback = useCallback(() => {
    setIsLoading(false);
    setIsLoading2(false);
  }, []);

  const unLockEvent = useCallback(
    (id: number) => {
      setIsLoading(true);
      dispatch(unlockEvent(id, callback));
    },
    [dispatch],
  );

  const blockEventFn = useCallback(
    (id: number) => {
      setIsLoading2(true);
      dispatch(blockEvent(id, callback));
    },
    [dispatch],
  );

  return (
    <>
      <LoadingButton
        isLoading={isLoading}
        className={classes.unblockBtn}
        onClick={() => unLockEvent(row.id)}
        disabled={isLoading || status != 'On-going dispute'}
      >
        Agree
      </LoadingButton>
      <LoadingButton
        isLoading={isLoading2}
        className={classes.block}
        onClick={() => blockEventFn(row.id)}
        disabled={isLoading2 || status != 'On-going dispute'}
      >
        Cashback
      </LoadingButton>
    </>
  );
};

export default Action;
