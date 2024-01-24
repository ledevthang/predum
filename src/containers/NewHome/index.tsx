import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import NewEvent from 'components/Event/index2';
import { getAllCategoryAction } from 'store/actions/categoryActions';
import { resetFilterAction } from 'store/actions/filterActions';
import { resetUserByAddressAction } from 'store/actions/hostActions';

declare global {
  interface Window {
    web3: any;
    ethereum: any;
    isLoadedMore: boolean;
  }
}
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategoryAction());
    dispatch(resetFilterAction());
    dispatch(resetUserByAddressAction());
  }, []);
  return <NewEvent />;
};
export default memo(Home);
