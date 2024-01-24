import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import EfunContract from 'containers/DecentralizedPool/EfunContract';
import MenuCloseIcon from 'icon/MenuCloseIcon';
import MenuOpenIcon from 'icon/MenuOpenIcon';
import { getAllCategoryAction } from 'store/actions/categoryActions';
import { getAllCompetitionsAction } from 'store/actions/competitionActions';
import { updateFilterAction } from 'store/actions/filterActions';
import {
  getAllCategories,
  getCompetitionsState,
  getFilterState,
  getHostState,
} from 'store/selectors';
import { ICategory } from 'types/category';
import { SortState } from 'types/event';

import { CategoryItem } from './categoryItem';
import { useStyles } from './styles';

export const Category = () => {
  const classes = useStyles();
  const [isActive, setIsActive] = useState('');
  const [isExpandMenu, setIsExpandMenu] = useState(true);
  const [isOpen, setIsOpen] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const history = useHistory();
  const hostState = useSelector(getHostState);
  const competition = useSelector(getCompetitionsState);
  const [fatherCategory, setFatherCategory] = useState<ICategory[]>();
  const theme = useTheme();
  const isHome = location.pathname == '/';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const filter = useSelector(getFilterState);

  useEffect(() => {
    if (hostState.id && window.location.pathname.includes('host-info')) {
      dispatch(getAllCategoryAction(hostState.id));
    } else dispatch(getAllCategoryAction());
    dispatch(getAllCompetitionsAction(-1));
  }, [isHome, location.pathname]);

  useEffect(() => {
    const filter = () => {
      let categoryFather = categories
        .filter((item) => item.fatherId == null)
        .sort((a, b) => (a.index > b.index ? 1 : -1));
      setFatherCategory(categoryFather);
    };
    filter();
  }, [categories]);
  useEffect(() => {
    const index = categories.findIndex((c) => c.name == isActive);
    const filter: any = {};
    if (isActive == 'Hot Event') {
      filter.isHot = false;
      filter.outOfTime = true;
      // filter.outOfEndTime7day = true;
      filter.outOfEndTime30day = true;
      filter.isHotInfo = true;
      filter.homeListTime = true;
      filter.categoryId = 0;
      filter.subCategoryId = undefined;
    } else if (index >= 0) {
      if (categories[index].fatherId == null) {
        filter.categoryId = categories[index].id;
        filter.subCategoryId = undefined;
      } else {
        filter.subCategoryId = categories[index].id;
        filter.categoryId = 0;
      }
      filter.isHot = undefined;
      filter.isHotInfo = undefined;
    } else {
      filter.isHot = undefined;
      filter.isHotInfo = undefined;
    }
    dispatch(
      updateFilterAction({
        ...filter,
      }),
    );
  }, [isActive]);
  const handleClickHotEvent = () => {
    if (isActive != 'Hot Event') {
      setIsActive('Hot Event');
      setIsOpen('');
    } else {
      let filterReset = {
        sort: SortState.UPCOMING,
        isHot: false,
        categoryId: 0,
        outOfTime: false,
        subCategoryId: undefined,
        competitionId: undefined,
        userId: 0,
        tokenIds: [],
        eventTypes: [],
        listingStatuses: [],
      };
      dispatch(
        updateFilterAction({
          ...filterReset,
        }),
      );
      setIsActive('');
    }
    if (
      history.location.pathname != '/' &&
      !history.location.pathname.includes('host-info')
    ) {
      history.push('/');
    }
  };

  useEffect(() => {
    if (
      !filter.categoryId &&
      !filter.subCategoryId &&
      filter.isHot == undefined
    ) {
      setIsActive('');
      setIsOpen('');
    }
  }, [filter]);

  return (
    <Box className={classes.wapperCategory}>
      {/* <Box
        className={clsx(classes.wapperCategoryItem, {
          [classes.isActive]: isActive == 'Hot Event',
        })}
        onClick={handleClickHotEvent}
      >
        <MagicStarIcon />
        <Typography>Hot Event</Typography>
      </Box> */}
      {/* <Box
        className={clsx(classes.wapperCategoryItem, {
          [classes.isActive]: isActive == 'Hot Event',
        })}
        onClick={() => {
          history.push('/world-cup');
        }}
      >
        <CardMedia
          image="/images/wc2022.png"
          style={{
            height: 35,
            width: 35,
          }}
        />
        <Typography
          style={{
            width: 'max-content',
            marginRight: 15,
          }}
        >
          World Cup 2022
        </Typography>
        <Typography
          style={{
            color: '#FCB02D',
            lineHeight: 'unset',
            textTransform: 'unset',
            fontSize: 14,
            position: 'relative',
            top: '-6px',
            right: '8px',
            textShadow:
              '0 0 7px #77776c, 0 0 13px #6d6c52, 0 0 19px #707238, 0 0 25px #94872d',
          }}
          className="blink_me"
        >
          Hot
        </Typography>
      </Box> */}
      {isExpandMenu && isDesktop && (
        <Box
          className={clsx(classes.wrapperMenuIcon, 'center-root')}
          onClick={() => setIsExpandMenu(false)}
        >
          <MenuCloseIcon />
        </Box>
      )}
      {!isExpandMenu && isDesktop && (
        <Box
          className={classes.wrapperCloseMenu}
          onClick={() => setIsExpandMenu(true)}
        >
          <MenuOpenIcon />
        </Box>
      )}
      {fatherCategory &&
        fatherCategory.map((item, index) => {
          return (
            <CategoryItem
              setIsActive={setIsActive}
              isActive={isActive}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isExpandMenu={isExpandMenu}
              key={index}
              id={item.id}
              label={item.name}
            ></CategoryItem>
          );
        })}
      {isExpandMenu && isDesktop && (
        <Box
          style={{
            border: '1px solid white',
            width: 160,
            height: 100,
            visibility: 'hidden',
          }}
        ></Box>
      )}
      {/* {isDesktop && <EfunContract />} */}
    </Box>
  );
};
