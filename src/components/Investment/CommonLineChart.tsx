import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  Title,
  LinearScale,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CHART_BACKGROUNDS } from 'common';
import dayjs from 'dayjs';
import { convertThousandSeperator } from 'helpers';

ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip,
  Title,
  Legend,
  CategoryScale,
  LineElement,
);

interface IProps {
  data: number[];
  labels: string[];
  title?: string;
  yText: string;
  typeY?: string;
  textX?: string;
  type?: 'day' | 'month';
}

const CommonLineChart = ({ data, labels, title, yText, type }: IProps) => {
  const getOrCreateTooltip = (chart: any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';

      const table = document.createElement('table');
      table.style.margin = '0px';

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  const externalTooltipHandler = (context: any) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b: any) => b.lines);

      const tableHead = document.createElement('thead');

      titleLines.forEach((title: any) => {
        title = dayjs(title).format('DD/MM/YYYY 00:00 UTC');
        if (
          title.toString().slice(0, 2) ==
          dayjs(new Date()).get('date').toString()
        ) {
          title = dayjs(new Date())
            .subtract(7, 'h')
            .format('DD/MM/YYYY HH:mm UTC');
        }
        const tr = document.createElement('tr');
        tr.style.borderWidth = '0px';

        const th = document.createElement('th');
        th.style.borderWidth = '0px';
        const text = document.createTextNode(title);

        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement('tbody');
      bodyLines.forEach((body: any, i: any) => {
        const tr = document.createElement('tr');
        tr.style.backgroundColor = 'inherit';
        tr.style.borderWidth = '0px';

        const td = document.createElement('td');
        td.style.borderWidth = '0px';

        const text = document.createTextNode(`${yText}: ${body}`);

        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector('table');

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }
      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }
    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
    tooltipEl.style.top = `${positionY + tooltip.caretY}px`;
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = `${tooltip.options.padding}px ${tooltip.options.padding}px}`;
  };
  const options = {
    responsive: true,
    tension: 0.4,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
      title: {
        display: true,
        text: title ? title : 'My investment',
        padding: {
          bottom: 20,
        },
        color: 'white',
        font: {
          weight: '600',
          size: 32,
          lineHeight: '38px',
          family: 'Barlow Condensed',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'TIME',
          align: 'end' as any,
          color: 'white',
          font: {
            size: 14,
            family: 'Barlow Condensed',
          },
        },
        ticks: {
          fontSize: 14,
          color: 'white',
          callback: function (val: any, index: number): string {
            const dayJS = dayjs(labels[index]);
            const month = dayJS.format('MMM');
            const day = dayJS.date();

            const dayEnd = dayJS.endOf('month').date();
            // if (index != labels.length - 1 && type == 'month') {
            //   if (day == dayEnd) return dayJS.format('MMMM');
            //   return '';
            // }
            return `${day}(${month})`;
          },
        },
      },
      y: {
        title: {
          display: true,
          text: yText,
          align: 'end' as any,
          color: 'white',
          font: {
            size: 14,
            family: 'Barlow Condensed',
          },
        },
        ticks: {
          fontSize: 14,
          color: 'white',
          precision: 0,
          callback: function (label: any, index: number) {
            return convertThousandSeperator(
              label,
              false,
              +label > 1000000,
            ) as any;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };
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

  return <Line data={chart} options={options} />;
};

export default CommonLineChart;

const config = {
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0],
      backgroundColor: CHART_BACKGROUNDS,
      borderColor: ['#3FADD5'],
      pointRadius: 2,
      borderWidth: 2,
    },
  ],
};
