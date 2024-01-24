import { Box, CardMedia, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BasketballIcon from 'icon/sidebar/BasketballIcon';
import ChartIcon from 'icon/sidebar/ChartIcon';
import CourthouseIcon from 'icon/sidebar/CourthouseIcon';
import DiagramIcon from 'icon/sidebar/DiagramIcon';
import DotaIcon from 'icon/sidebar/DotaIcon';
import FootballIcon from 'icon/sidebar/FoorballIcon';
import FormulaIcon from 'icon/sidebar/FormulaIcon';
import MMAIcon from 'icon/sidebar/MMAIcon';
import TennisBallIcon from 'icon/sidebar/TennisBallIcon';
import { updateActivedCategoryAction } from 'store/actions/categoryActions';
import { getActivedCategory } from 'store/selectors';

import { useStyles } from './childCategoryItemStyle';

interface CategoryItemProps {
  setIsActive: (value: string) => void;
  isActive: string;
  isOpen: string;
  label: string;
  id: number;
  parent?: string;
  isExplandMenu?: boolean;
  setIsOpen?: (value: string) => void;
  setIsOpenChild?: (value: boolean) => void;
}
export const ChildCategoryItem = ({
  label,
  isExplandMenu,
  isOpen,
  isActive,
  parent,
  setIsActive,
  setIsOpen,
  setIsOpenChild,
}: CategoryItemProps) => {
  const classes = useStyles();
  const categoryState = useSelector(getActivedCategory);
  const dispatch = useDispatch();
  const renderIcon = useMemo(() => {
    switch (label) {
      case 'Football':
        return <FootballIcon />;
      case 'Basketball':
        return <BasketballIcon />;
      case 'Tennis':
        return <TennisBallIcon />;
      case 'Formula 1':
        return <FormulaIcon />;
      case 'MMA':
        return <MMAIcon />;
      case 'Coin Price':
        return <DiagramIcon />;
      case 'Stock Price':
        return <ChartIcon />;
      case 'Politics':
        return <CourthouseIcon />;
      case 'Dota 2':
        return <DotaIcon />;
      case 'LoL':
        return (
          <CardMedia image="/images/LOL.png" className={classes.imageIcon} />
        );
      case 'CS:GO':
        return (
          <CardMedia image="/images/CSGO.png" className={classes.imageIcon} />
        );
      default:
        return <Box></Box>;
    }
  }, [label]);
  useEffect(() => {
    if (!categoryState.activedType) return;
    if (!categoryState.activedCategory) return;
    setIsActive(categoryState.activedType);
    setIsOpen?.(categoryState.activedCategory);
    setIsOpenChild?.(false);
  }, [categoryState]);
  return (
    <Box className={classes.childWapper}>
      <Box
        className={clsx(classes.child, {
          [classes.isActive]: isActive == label,
          [classes.closeMenu]: isExplandMenu,
        })}
        onClick={() => {
          let current = isOpen == '' ? parent : isOpen;
          dispatch(updateActivedCategoryAction(current || '', label));
        }}
      >
        {renderIcon}
        {isExplandMenu && <Typography>{label}</Typography>}
      </Box>
    </Box>
  );
};
