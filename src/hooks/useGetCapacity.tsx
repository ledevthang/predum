import { useWeb3React } from '@web3-react/core';
import Decimal from 'decimal.js';
import { useEffect, useState } from 'react';
import { elpTokenABI } from 'services/contract';
import Web3 from 'web3';

export const useGetCapacity = () => {
  const { library } = useWeb3React();
  const [capacity, setCapacity] = useState(0);

  useEffect(() => {
    (async () => {
      if (!library?.provider && !window.ethereum) return;
      const web3 = new Web3(library?.provider || window.ethereum);
      const contract = new web3.eth.Contract(
        elpTokenABI as any,
        process.env.REACT_APP_ELP,
      );
      const cur = await contract.methods.capacity().call();
      setCapacity(new Decimal(cur).div(10 ** 18).toNumber());
    })();
  }, [library?.provider]);

  return capacity;
};
