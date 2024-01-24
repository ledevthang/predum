import React, { memo, useCallback } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { useStyles } from './SelectCategoryStyles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getEventIdentity } from 'store/selectors';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { EProEventIdentity } from 'types/proEvent';

interface IProps {
  category: {
    name: string;
    subcategories?: {
      name: string;
      icon: (props: any) => any;
      type?: string;
    }[];
  };
  select: string;
  setSelect: (value: string) => void;
}

const CategoryItem = ({ category, select, setSelect }: IProps) => {
  const classes = useStyles();
  const identity = useSelector(getEventIdentity);
  const categories = useSelector(getAllCategories);

  const dispatch = useDispatch();
  const onSelectSubCategory = useCallback(
    (name: string) => {
      const subCategory = categories.find((c) => c.name == name);
      if (!subCategory) return;
      setSelect(name);
      dispatch(
        updateHostPredictionStateAction({
          category: subCategory.fatherId,
          subcategory: subCategory.id,
          categoryName: name,
          competition: undefined,
        }),
      );
    },
    [categories],
  );

  const disabled = useCallback(
    (sub: string) => {
      if (identity != EProEventIdentity.INFLUENCER) return false;
      if (sub != 'Football') return true;
      return false;
    },
    [identity],
  );

  return (
    <Box className={classes.category}>
      <Box className={clsx(classes.categoryName, 'center-root')}>
        {category.name}
      </Box>
      <Box className={classes.wrapperSubcategory}>
        {category.subcategories?.map((s) => (
          <Button
            disabled={disabled(s.name)}
            key={s.name}
            onClick={() => onSelectSubCategory(s.name)}
            className={clsx(classes.wrapperSubcategoryItem, 'center-root', {
              [classes.selected]: select == s.name,
              [classes.disabled]: disabled(s.name),
            })}
          >
            <s.icon
              className={s.type == 'image' && classes.imageIcon}
              color="#BDBDBD"
            />
            <Typography className={classes.subName}>{s.name}</Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default memo(CategoryItem);
