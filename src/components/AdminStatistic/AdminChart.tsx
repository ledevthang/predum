import { Box, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useStyles } from './AdminChartStyles';
import { sum } from 'lodash';
import Decimal from 'decimal.js';
import { FiberManualRecord } from '@material-ui/icons';
import CommonChart from './CommonChart';
import { CHART_BACKGROUNDS } from 'common';
import { convertThousandSeperator } from 'helpers';

interface IProps {
  data: number[];
  label: string;
  labelLeft: string;
  shouldShowPercentage?: boolean;
  labelDetails: string[];
}

const AdminChart = ({
  data,
  label,
  shouldShowPercentage,
  labelDetails,
  labelLeft,
}: IProps) => {
  const classes = useStyles();

  const total = useMemo(() => {
    return sum(data);
  }, [data]);

  return (
    <Box className={classes.container}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box className={classes.chart}>
          {total ? (
            <CommonChart data={data} labels={labelDetails} />
          ) : (
            <Box className="center-root" width="250px" height="250px">
              Result not found
            </Box>
          )}
          <Typography className={classes.label}>{label}</Typography>
        </Box>
        <Box>
          <Box className={classes.wrapperTotal}>
            <Typography>{`${labelLeft}:`}</Typography>
            <Typography>{convertThousandSeperator(total)}</Typography>
          </Box>
          <Box className={classes.wrapperDetail}>
            {labelDetails.map((l, i) => (
              <Box display="flex" alignItems="center" key={i} mt={1}>
                <FiberManualRecord className={classes.dot} />
                <Box
                  bgcolor={CHART_BACKGROUNDS[i]}
                  width="30px"
                  height="16px"
                  borderRadius={3}
                  mr={1}
                />
                <Typography className={classes.detail}>
                  {`${l} ${
                    shouldShowPercentage
                      ? `(${new Decimal(data[i])
                          .div(total || 1)
                          .mul(100)
                          .toFixed(2)}%)`
                      : ''
                  }: ${convertThousandSeperator(data[i])}`}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminChart;
