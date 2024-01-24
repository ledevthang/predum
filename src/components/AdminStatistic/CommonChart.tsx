import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CHART_BACKGROUNDS } from 'common';
import Datalabels from 'chartjs-plugin-datalabels';
import Decimal from 'decimal.js';

ChartJS.register(ArcElement, Tooltip, Legend, Datalabels);

interface IProps {
  data: number[];
  labels: string[];
}

const CommonChart = ({ data, labels }: IProps) => {
  const chart = useMemo(() => {
    return {
      ...config,
      labels,
      datasets: [
        {
          ...config.datasets[0],
          label: '',
          data,
        },
      ],
    };
  }, [data, labels]);

  return <Pie data={chart} options={options} />;
};

export default CommonChart;

const config = {
  datasets: [
    {
      data: [0, 0, 0],
      backgroundColor: CHART_BACKGROUNDS,
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      formatter: (value: number, ctx: any) => {
        const datasets = ctx.chart.data.datasets;
        if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
          const sum = datasets[0].data.reduce(
            (a: number, b: number) => a + b,
            0,
          );
          const percentage = new Decimal(value)
            .div(sum || 1)
            .mul(100)
            .toFixed(2);
          return percentage != '0.00' ? `${percentage}%` : '';
        } else {
          return '';
        }
      },
      color: 'white',
    },
  },
  pieceLabel: {
    render: 'value', //show values
  },
};
