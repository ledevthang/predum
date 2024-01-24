import AdminChart from './AdminChart';
import React from 'react';

interface IProps {
  data: number[];
}
const TotalEvent = ({ data }: IProps) => {
  return (
    <AdminChart
      labelLeft="Total events created"
      data={data}
      label="Total events created"
      labelDetails={['P2P & Prize', 'UvP', 'Affiliate']}
      shouldShowPercentage
    />
  );
};

export default TotalEvent;
