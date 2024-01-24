import AdminChart from './AdminChart';
import React from 'react';

interface IProps {
  data: number[];
}

const TotalPrediction = ({ data }: IProps) => {
  return (
    <AdminChart
      labelLeft="Total predictions"
      data={data}
      labelDetails={['P2P & Prize', 'UvP', 'Affiliate']}
      label="Total predictions"
      shouldShowPercentage
    />
  );
};

export default TotalPrediction;
