import React from 'react';
import { Box, CardMedia, Typography } from '@material-ui/core';
import BasketballIcon from 'icon/sidebar/BasketballIcon';
import DiagramIcon from 'icon/sidebar/DiagramIcon';
import DotaIcon from 'icon/sidebar/DotaIcon';
import FootballIcon from 'icon/sidebar/FoorballIcon';
import FormulaIcon from 'icon/sidebar/FormulaIcon';
import MMAIcon from 'icon/sidebar/MMAIcon';
import TennisBallIcon from 'icon/sidebar/TennisBallIcon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getCategoryState } from 'store/selectors';
import CategoryItem from './CategoryItem';
import { useStyles } from './SelectCategoryStyles';

const SelectCategory = () => {
  const classes = useStyles();
  const categorySelected = useSelector(getCategoryState);
  const [select, setSelect] = useState(categorySelected.categoryName || '');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      updateHostPredictionStateAction({
        error: !select,
      }),
    );
  }, [select]);

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>
        Please select the prediction category that you want to host
      </Typography>
      {categories.map((c, i) => (
        <CategoryItem
          category={c}
          key={i}
          select={select}
          setSelect={setSelect}
        />
      ))}
    </Box>
  );
};

export default SelectCategory;

const categories = [
  {
    name: 'Sport',
    subcategories: [
      {
        name: 'Football',
        icon: FootballIcon,
      },
      {
        name: 'Basketball',
        icon: BasketballIcon,
      },
      {
        name: 'Tennis',
        icon: TennisBallIcon,
      },
      {
        name: 'Formula 1',
        icon: FormulaIcon,
      },
      {
        name: 'MMA',
        icon: MMAIcon,
      },
    ],
  },
  {
    name: 'eSport',
    subcategories: [
      {
        name: 'LoL',
        icon: ({ className }: { className: string }) => (
          <CardMedia image="/images/LOL.png" className={className} />
        ),
        type: 'image',
      },
      {
        name: 'Dota 2',
        icon: DotaIcon,
      },
      {
        name: 'CS:GO',
        icon: ({ className }: { className: string }) => (
          <CardMedia image="/images/CSGO.png" className={className} />
        ),
        type: 'image',
      },
    ],
  },
  {
    name: 'Market Prediction',
    subcategories: [
      {
        name: 'Coin Price',
        icon: DiagramIcon,
      },
    ],
  },
  {
    name: 'GameFi',
  },
  {
    name: 'Politics',
  },
  {
    name: 'Others',
  },
];
