import { Decimal } from 'decimal.js';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { predictionABI } from 'services/contract';
import Web3 from 'web3';

export const usePlatformFee = () => {
  const { library } = useWeb3React();
  const [fee, setFee] = useState<{
    uvuPlatformFee: number;
    uvpPlatformFee: number;
  }>({
    uvuPlatformFee: 0,
    uvpPlatformFee: 0,
  });

  useEffect(() => {
    (async () => {
      if (!library?.provider && !window.ethereum) return;
      const web3 = new Web3(library?.provider || window.ethereum);
      const contract = new web3.eth.Contract(
        predictionABI as any,
        process.env.REACT_APP_PREDICTION,
      );
      const uvpPlatformFee = await contract.methods
        .platFormfeeBefore(process.env.REACT_APP_MULTIPLE_CHOICES)
        .call();
      const uvuPlatformFee = await contract.methods
        .platformFee(process.env.REACT_APP_GROUP_PREDICT)
        .call();
      setFee({
        uvpPlatformFee: new Decimal(uvpPlatformFee).div(10000).toNumber(),
        uvuPlatformFee: new Decimal(uvuPlatformFee).div(10000).toNumber(),
      });
    })();
  }, [library?.provider]);

  return fee;
};
