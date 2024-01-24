/* eslint-disable unused-imports/no-unused-imports */
import { Box, Button, Typography, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import { ReactElement, useEffect, useState } from 'react';
import React, { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CommonMenuChildren from 'components/common/CommonMenuChildren';
import LineIcon from 'icon/LineIcon';
import BottomArrowIcon from 'icon/sidebar/BottomArrowIcon';
import GameFiIcon from 'icon/sidebar/GameFiIcon';
import OtherIcon from 'icon/sidebar/OtherIcon';
import PoliticsIcon from 'icon/sidebar/PoliticsIcon';
import theme from 'material';
import { updateActivedCategoryAction } from 'store/actions/categoryActions';
import { updateFilterAction } from 'store/actions/filterActions';
import {
  getActivedCategory,
  getAllCategories,
  getFilterState,
} from 'store/selectors';
import { ICategory } from 'types/category';
import { SortState } from 'types/event';

import { useStyles } from './categoryItemStyle';
import { ChildCategoryItem } from './childCategoryItem';

export type categoryItem = {
  icon: ReactElement;
  label: string;
  id: number;
};

interface CategoryItemProps {
  setIsActive: (value: string) => void;
  isActive: string;
  label: string;
  id: number;
  isOpen: string;
  setIsOpen: (value: string) => void;
  isExpandMenu: boolean;
}
export const CategoryItem = ({
  label,
  id,
  isActive,
  setIsActive,
  isOpen,
  setIsOpen,
  isExpandMenu,
}: CategoryItemProps) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const categories = useSelector(getAllCategories);
  const categoryState = useSelector(getActivedCategory);
  const dispatch = useDispatch();
  const [childCategory, setChildCategory] = useState<ICategory[]>();
  const history = useHistory();
  const [anchorEl, setAnchor] = useState<any>();
  const [isOpenChild, setIsOpenChild] = useState(false);
  const filter = useSelector(getFilterState);
  useEffect(() => {
    const getChildCategory = () => {
      let childCategory = categories.filter((item) => item.fatherId == id);
      setChildCategory(childCategory);
    };
    getChildCategory();
  }, [categories, id]);
  useEffect(() => {
    if (!categoryState.activedCategory) return;
    setIsOpen(categoryState.activedCategory);
    setIsOpenChild(true);
  }, [categoryState]);

  const classes = useStyles();
  const handleClickCategoryItem = () => {
    console.log('run');
    dispatch(updateActivedCategoryAction(label, ''));
    let filterReset = {
      sort: SortState.UPCOMING,
      isHot: false,
      categoryId: 0,
      outOfTime: undefined,
      subCategoryId: undefined,
      useId: undefined,
      // competitionId: undefined,
      homeList: true,
      homeListTime: true,
      // outOfEndTime7day: true,
      outOfEndTime30day: true,
    };
    if (label == isOpen) {
      dispatch(
        updateFilterAction({
          ...filterReset,
        }),
      );
      setIsOpen('');
      setIsOpenChild(false);
      setIsActive('');
    } else {
      setIsActive(label);
      setIsOpenChild(true);
    }
    if (
      history.location.pathname != '/' &&
      !history.location.pathname.includes('host-info')
    ) {
      history.push('/');
    }
  };

  const openDropDown = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpenChild(true);
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Box className={classes.wapper}>
      {isExpandMenu && (
        <Box
          className={clsx(classes.wapperCategoryItem, {
            [classes.isActive]: isActive == label || isOpen == label,
          })}
        >
          <Button
            disableRipple
            className={classes.buttonWrapperCategory}
            onClick={handleClickCategoryItem}
          >
            <Typography className={classes.label}>{label}</Typography>
          </Button>
          {!isDesktop && !!childCategory?.length && (
            <Button onClick={openDropDown} className={classes.dropDownBtn}>
              <BottomArrowIcon color={'#FFFFFF'} />
            </Button>
          )}
        </Box>
      )}
      {!isExpandMenu &&
        isDesktop &&
        childCategory &&
        childCategory?.length > 0 && (
          <Box className={classes.line}>
            <LineIcon />
          </Box>
        )}
      {!isExpandMenu && isDesktop && childCategory?.length == 0 && (
        <Box
          className={classes.line}
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          style={{
            cursor: 'pointer',
          }}
          onClick={handleClickCategoryItem}
        >
          <LineIcon />
          {label == 'Others' && (
            <OtherIcon
              color={
                categoryState.activedCategory == label ? '#fbc02d' : 'white'
              }
            />
          )}
          {label == 'GameFi' && (
            <GameFiIcon
              color={
                categoryState.activedCategory == label ? '#fbc02d' : 'white'
              }
            />
          )}
          {label == 'Politics' && (
            <PoliticsIcon
              color={
                categoryState.activedCategory == label ? '#fbc02d' : 'white'
              }
            />
          )}
        </Box>
      )}
      {isDesktop &&
        !isExpandMenu &&
        childCategory &&
        childCategory.map((item) => {
          return (
            <ChildCategoryItem
              label={item.name}
              isActive={isActive}
              setIsActive={setIsActive}
              parent={label}
              isExplandMenu={isExpandMenu}
              isOpen={isOpen}
              key={item.id}
              id={item.id}
            />
          );
        })}
      {isDesktop &&
        isExpandMenu &&
        childCategory &&
        childCategory.map((item) => {
          return (
            <Box key={item.id} ml={2}>
              <ChildCategoryItem
                label={item.name}
                isActive={isActive}
                parent={label}
                setIsActive={setIsActive}
                isExplandMenu={isExpandMenu}
                isOpen={isOpen}
                id={item.id}
              />
            </Box>
          );
        })}
      {!isDesktop && isOpenChild && (
        <CommonMenuChildren anchorEl={anchorEl} handleClose={handleClose}>
          <Box className={classes.wrapperSubcategory}>
            {childCategory &&
              childCategory.map((item) => {
                return (
                  <ChildCategoryItem
                    isActive={isActive}
                    setIsActive={setIsActive}
                    setIsOpen={setIsOpen}
                    parent={label}
                    isExplandMenu={isExpandMenu}
                    label={item.name}
                    key={item.id}
                    isOpen={isOpen}
                    id={item.id}
                    setIsOpenChild={setIsOpenChild}
                  />
                );
              })}
          </Box>
        </CommonMenuChildren>
      )}
    </Box>
  );
};
