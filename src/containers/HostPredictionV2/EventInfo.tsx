import {
  Box,
  Button,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import clsx from 'clsx';
import CommonInput from 'components/common/CommonInput';
import LeftArrow from 'components/Event/LeftArrow';
import RightArrow from 'components/Event/RightArrow';
import EventDetail from 'components/HostPredictionV2/EventDetail';
import EventInfoItem from 'components/HostPredictionV2/EventInfoItem';
import ArrowLeftIcon from 'icon/ArrowLeftIcon';
import SearchIcon from 'icon/SearchIcon';
import BasketballIcon from 'icon/sidebar/BasketballIcon';
import ChartIcon from 'icon/sidebar/ChartIcon';
import CloseIcon from 'icon/CloseIcon';
import DiagramIcon from 'icon/sidebar/DiagramIcon';
import DotaIcon from 'icon/sidebar/DotaIcon';
import FootballIcon from 'icon/sidebar/FoorballIcon';
import FormulaIcon from 'icon/sidebar/FormulaIcon';
import MMAIcon from 'icon/sidebar/MMAIcon';
import TennisBallIcon from 'icon/sidebar/TennisBallIcon';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getAllFixturesAction } from 'store/actions/fixtureActions';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getAllLeaguesAction } from 'store/actions/leagueActions';
import {
  getAllCategories,
  getCoinState,
  getEventType,
  getFixturePaginationState,
  getFixtureState,
  getLeagueState,
  getSelectEventState,
} from 'store/selectors';
import { IFixture } from 'types/fixture';
import { WhoTakeWith } from 'types/hostPrediction';
import { EDataSource, EKindOfEvent } from 'types/proEvent';
import { useStyles } from './styles';
import { getAllCoinsAction } from 'store/actions/coinActions';
import { ICoin } from 'types/coin';
import { convertThousandSeperator } from 'helpers';

const EventInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fixtures = useSelector(getFixtureState);
  const fixturePagination = useSelector(getFixturePaginationState);
  const selectEventState = useSelector(getSelectEventState, shallowEqual);
  const categoriesDB = useSelector(getAllCategories);
  const competitions = useSelector(getLeagueState);
  const eventType = useSelector(getEventType);
  const coins = useSelector(getCoinState);
  const [hotEvents, setHotEvents] = useState<IFixture[]>([]);
  const [width, setWidth] = useState<string | number>(0);
  const [page, setPage] = useState(fixturePagination.pageNumber || 1);
  const [isSearch, setIsSearch] = useState(!!selectEventState.search);
  const shouldGetCoin = useRef(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const isUvP = useMemo(() => {
    return eventType != WhoTakeWith.USER_USER;
  }, [eventType]);

  const isAffiliate = useMemo(() => {
    return eventType == WhoTakeWith.AFFILIATE;
  }, [eventType]);
  const isP2P = useMemo(() => {
    return eventType == WhoTakeWith.USER_USER;
  }, [eventType]);

  const handleChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      dispatch(
        updateHostPredictionStateAction({
          search: newValue,
        }),
      );
    },
    [dispatch],
  );

  const updateCategory = useCallback(
    (name: string, hasSubcategory: boolean) => {
      const category = categoriesDB.find((c) => c.name == name);
      dispatch(
        updateHostPredictionStateAction({
          categoryName: name,
          showOtherEvent: hasSubcategory ? 'subcategory' : 'detail',
          category: category?.id,
          preShowOtherEvent: selectEventState.showOtherEvent,
          subcategoryName: undefined,
          subcategory: undefined,
        }),
      );
    },
    [dispatch, categoriesDB, selectEventState.showOtherEvent],
  );

  const onSelectCompetition = useCallback(
    (id: string) => {
      dispatch(
        getAllFixturesAction({
          pageNumber: 1,
          pageSize: 21,
          leagueId: `${id}`,
          notFinised: true,
          nullOddMeta: isUvP ? false : undefined,
        }),
      );
      dispatch(
        updateHostPredictionStateAction({
          showOtherEvent: 'event',
          fixtureId: undefined,
          preShowOtherEvent: selectEventState.showOtherEvent,
          leagueSelected: `${id}`,
          coinSelected: undefined,
        }),
      );
    },
    [dispatch, isUvP, selectEventState.showOtherEvent],
  );

  const onSelectCoin = useCallback(
    (coin: ICoin) => {
      const category = categoriesDB.find((c) => c.name == 'Market Prediction');
      const subCategory = categoriesDB.find((c) => c.name == 'Coin Price');
      dispatch(
        updateHostPredictionStateAction({
          showOtherEvent: 'detail',
          categoryName: 'Market Prediction',
          subcategoryName: 'Coin Price',
          subcategory: subCategory?.id,
          category: category?.id,
          preShowOtherEvent: selectEventState.showOtherEvent,
          coinSelected: coin,
          eventName: `${coin.name} Prediction`,
          description: `The current ${
            coin.name
          } price is $${convertThousandSeperator(
            coin.rate,
          )} and volume is $${convertThousandSeperator(coin.volume)}`,
          fixture: undefined,
          deadline: null,
        }),
      );
    },
    [dispatch, selectEventState, categoriesDB],
  );

  const onSelectSubCategory = useCallback(
    (name: string) => {
      const subCategory = categoriesDB.find((c) => c.name == name);
      if (!subCategory) return;
      dispatch(
        updateHostPredictionStateAction({
          category: subCategory.fatherId,
          subcategory: subCategory.id,
          subcategoryName: name,
          league: undefined,
          preShowOtherEvent: selectEventState.showOtherEvent,
          showOtherEvent:
            selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER
              ? 'league'
              : 'detail',
        }),
      );
    },
    [
      categoriesDB,
      selectEventState.dataSource,
      dispatch,
      selectEventState.showOtherEvent,
    ],
  );

  const selectedFixture = useMemo(() => {
    if (selectEventState.selectedType == 'hot') {
      return hotEvents.find((h) => h.id == selectEventState.fixtureId);
    }
    if (selectEventState.selectedType == 'other') {
      return fixtures.find((h) => h.id == selectEventState.fixtureId);
    }
  }, [
    selectEventState.fixtureId,
    selectEventState.selectedType,
    fixtures,
    hotEvents,
  ]);

  const renderText = useMemo(() => {
    if (selectEventState.showOtherEvent == 'subcategory') {
      return selectEventState.categoryName;
    }
    if (selectEventState.showOtherEvent == 'league') {
      return selectEventState.subcategoryName;
    }
    if (selectEventState.showOtherEvent == 'event') {
      const league = competitions.find(
        (c) => c.id == Number(selectEventState.leagueSelected || '0'),
      );
      return league?.name;
    }
    if (selectEventState.showOtherEvent == 'detail') {
      if (selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER) {
        if (!selectedFixture) {
          const coin = selectEventState.coinSelected;
          return coin?.name;
        }
        const teamsMeta = JSON.parse(selectedFixture.teamsMeta);
        return `${teamsMeta.home.name} & ${teamsMeta.away.name}`;
      } else {
        if (selectEventState.subcategoryName) {
          return categories
            .flatMap((c) => c.subcategories)
            .find((c) => c?.name == selectEventState.subcategoryName)?.name;
        } else {
          return categories.find((c) => c.name == selectEventState.categoryName)
            ?.name;
        }
      }
    }
  }, [selectEventState, selectedFixture, competitions, categories]);

  const listCategory = useMemo(() => {
    const isPro =
      selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER;
    const newListCategory = isPro
      ? categories.filter(
          (c) => !['GameFi', 'Politics', 'Others'].includes(c.name),
        )
      : categories;
    return newListCategory.map((c) => (
      <Box key={c.name} className={classes.parentCategory}>
        <Button
          className={clsx(classes.wrapperSubcategoryItem, {
            [classes.selected]: c.name == selectEventState.categoryName,
            [classes.wrapperSubcategoryItemUvP]: isPro,
          })}
          disabled={
            (isPro && c.name != 'Sport' && c.name != 'Market Prediction') ||
            (c.name == 'Market Prediction' &&
              selectEventState.kindOfEvent == EKindOfEvent.AFFILIATE)
          }
          onClick={() => updateCategory(c.name, !!c.subcategories)}
          classes={{ disabled: classes.disabled }}
        >
          {c.name}
        </Button>
      </Box>
    ));
  }, [categories, selectEventState, updateCategory]);

  const listSubcategories = useMemo(() => {
    return categories
      .find((c) => c.name == selectEventState.categoryName)
      ?.subcategories?.map((s) => (
        <Box key={s.name} className={classes.parentCategory}>
          <Button
            className={clsx(classes.wrapperSubcategoryItem, {
              [classes.selected]: s.name == selectEventState.subcategoryName,
              [classes.wrapperSubcategoryItemUvP]:
                selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER,
            })}
            disabled={
              selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER &&
              !['Football', 'Coin Price'].includes(s.name)
            }
            onClick={() => onSelectSubCategory(s.name)}
            classes={{ disabled: classes.disabled }}
          >
            <s.icon
              className={s.type == 'image' ? classes.imageIcon : ''}
              color="#BDBDBD"
            />
            {s.name}
          </Button>
        </Box>
      ));
  }, [categories, selectEventState, onSelectSubCategory]);

  const renderCoin = useMemo(() => {
    return coins.map((s) => (
      <Box key={s.name} className={classes.parentLeague}>
        <Button
          className={clsx(classes.wrapperSubcategoryItem, {
            [classes.wrapperLeagueItemUvP]:
              selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER,
            [classes.selected]:
              s.id == Number(selectEventState.coinSelected || '0'),
          })}
          onClick={() => onSelectCoin(s)}
          classes={{ disabled: classes.disabled }}
        >
          <CardMedia
            image={s.originalLogo}
            className={classes.competitionLogo}
          />
          {s.name}
        </Button>
      </Box>
    ));
  }, [
    coins,
    selectEventState.coinSelected,
    selectEventState.dataSource,
    onSelectCoin,
  ]);

  const renderLeague = useMemo(() => {
    if (selectEventState.categoryName == 'Market Prediction') {
      return renderCoin;
    }
    return competitions.map((s) => (
      <Box key={s.name} className={classes.parentLeague}>
        <Button
          className={clsx(classes.wrapperSubcategoryItem, {
            [classes.selected]:
              s.id == Number(selectEventState.leagueSelected || '0'),
            [classes.wrapperLeagueItemUvP]:
              selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER,
          })}
          onClick={() => onSelectCompetition(`${s.id}`)}
          classes={{ disabled: classes.disabled }}
        >
          <CardMedia image={s.logo} className={classes.competitionLogo} />
          {s.name}
        </Button>
      </Box>
    ));
  }, [competitions, selectEventState, renderCoin, onSelectCompetition]);

  const renderCategory = useMemo(() => {
    if (selectEventState.dataSource == EDataSource.MYSELF) {
      if (selectEventState.showOtherEvent == 'category') {
        return listCategory;
      }
      if (selectEventState.showOtherEvent == 'subcategory') {
        return listSubcategories;
      }
      if (selectEventState.showOtherEvent == 'league') {
        return renderLeague;
      }
      if (selectEventState.showOtherEvent == 'detail') {
        return <EventDetail />;
      }
    } else {
      if (selectEventState.showOtherEvent != 'detail') {
        return (
          <Box width="100%">
            <Box className={classes.wrapperCategoryPro}>{listCategory}</Box>
            <Box className={classes.wrapperCategoryPro}>
              {listSubcategories}
            </Box>
            {isDesktop ? (
              <ScrollMenu
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
                scrollContainerClassName={classes.wrapperLeagues}
                wrapperClassName={classes.wrapper}
              >
                {renderLeague}
              </ScrollMenu>
            ) : (
              <Box className={classes.wrapperLeagues}>{renderLeague}</Box>
            )}
          </Box>
        );
      }
      if (selectEventState.showOtherEvent == 'detail') {
        return <EventDetail />;
      }
    }
  }, [
    selectEventState.showOtherEvent,
    selectEventState.dataSource,
    renderLeague,
    listCategory,
    listSubcategories,
  ]);

  const handleReturn = useCallback(() => {
    if (selectEventState.showOtherEvent == 'subcategory') {
      dispatch(
        updateHostPredictionStateAction({
          showOtherEvent: 'category',
          subcategory: undefined,
          subcategoryName: undefined,
          preShowOtherEvent: selectEventState.showOtherEvent,
        }),
      );
    } else if (selectEventState.showOtherEvent == 'league') {
      dispatch(
        updateHostPredictionStateAction({
          showOtherEvent: 'subcategory',
          leagueSelected: undefined,
          preShowOtherEvent: selectEventState.showOtherEvent,
        }),
      );
    } else if (selectEventState.showOtherEvent == 'event') {
      dispatch(
        updateHostPredictionStateAction({
          showOtherEvent: 'league',
          preShowOtherEvent: selectEventState.showOtherEvent,
        }),
      );
    } else if (selectEventState.showOtherEvent == 'detail') {
      let showOtherEvent: any = '';
      if (selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER) {
        showOtherEvent = selectEventState.preShowOtherEvent as any;
      } else {
        showOtherEvent = selectEventState.subcategoryName
          ? 'subcategory'
          : 'category';
      }
      dispatch(
        updateHostPredictionStateAction({
          showOtherEvent,
          selectedType: undefined,
          preShowOtherEvent: selectEventState.showOtherEvent,
          eventName: '',
        }),
      );
    }
  }, [dispatch, selectEventState.showOtherEvent]);

  const generateDescriptions = useCallback((fixture: IFixture) => {
    const leagueMeta = JSON.parse(fixture.leagueMeta);
    return `${leagueMeta.name}, ${leagueMeta.round}, ${fixture.venueName}`;
  }, []);

  const onHostEvent = useCallback(
    (fixtureId: number, isHot: boolean) => {
      const fixture = !isHot
        ? fixtures.find((f) => f.id == fixtureId)
        : hotEvents.find((f) => f.id == fixtureId);
      if (!fixture) return;
      const subCategory = categoriesDB.find((c) => c.name == 'Football');
      if (!subCategory) return;
      const teamsMeta = JSON.parse(fixture.teamsMeta);
      const name = `${teamsMeta.home.name} - ${teamsMeta.away.name}`;
      const deadline = new Date(fixture.date);

      const reset =
        fixtureId == selectEventState.fixtureId
          ? {}
          : {
              eventBanner: null,
              thumbnailUrl: null,
              shouldInitProMarket: true,
            };
      const data: any = {
        fixtureId,
        selectedType: isHot ? 'hot' : 'other',
        eventName: name,
        deadline,
        subcategory: subCategory.id,
        category: subCategory.fatherId,
        subcategoryName: 'Football',
        categoryName: 'Sport',
        league: `${fixture.leagueId}`,
        fixture,
        endTime: new Date(deadline.getTime() + 2.5 * 60 * 60 * 1000),
        preShowOtherEvent: selectEventState.showOtherEvent,
        description: generateDescriptions(fixture),
        ...reset,
      };
      if (
        selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER &&
        isUvP
      ) {
        dispatch(
          updateHostPredictionStateAction({
            step:
              selectEventState.kindOfEvent != EKindOfEvent.AFFILIATE ? 3 : 2,
            ...data,
          }),
        );
        return;
      }
      dispatch(
        updateHostPredictionStateAction({
          showOtherEvent: 'detail',
          ...data,
        }),
      );
    },
    [
      dispatch,
      fixtures,
      selectEventState.fixtureId,
      selectEventState.selectedType,
      hotEvents,
      selectEventState.showOtherEvent,
      selectEventState.dataSource,
      isUvP,
      generateDescriptions,
    ],
  );

  const handleSearch = useCallback(() => {
    setPage(1);
    const searchText = selectEventState.search?.trim();
    setIsSearch(!!searchText);
    dispatch(
      getAllFixturesAction({
        pageNumber: 1,
        pageSize: 21,
        notFinised: true,
        search: searchText,
        nullOddMeta: isUvP ? false : undefined,
        leagueId: selectEventState.leagueSelected,
      }),
    );
    dispatch(
      updateHostPredictionStateAction({
        isBrowseOtherEvent: selectEventState.search ? true : false,
        showOtherEvent: selectEventState.search
          ? 'event'
          : selectEventState.preShowOtherEvent,
        preShowOtherEvent: selectEventState.showOtherEvent,
      }),
    );
    dispatch(
      getAllCoinsAction({
        search: searchText,
      }),
    );
  }, [
    selectEventState.search,
    isUvP,
    selectEventState.showOtherEvent,
    selectEventState.leagueSelected,
  ]);

  const onClearSearch = useCallback(() => {
    setPage(1);
    setIsSearch(false);
    dispatch(
      updateHostPredictionStateAction({
        search: '',
        isBrowseOtherEvent: false,
        showOtherEvent: selectEventState.preShowOtherEvent,
        preShowOtherEvent: selectEventState.showOtherEvent,
      }),
    );
    dispatch(
      getAllFixturesAction({
        pageNumber: 1,
        pageSize: 21,
        notFinised: true,
        search: undefined,
        nullOddMeta: isUvP ? false : undefined,
        leagueId: selectEventState.leagueSelected,
      }),
    );
    dispatch(getAllCoinsAction({}));
  }, [
    selectEventState.leagueSelected,
    isUvP,
    selectEventState.showOtherEvent,
    selectEventState.preShowOtherEvent,
  ]);

  const onChangePage = useCallback(
    (event: any, page: number) => {
      const container = document.getElementById(OTHER_EVENT_ID);
      if (container) {
        window.scroll({
          top: container.offsetTop,
          left: 0,
          behavior: 'smooth',
        });
      }
      dispatch(
        getAllFixturesAction({
          pageNumber: page,
          pageSize: 21,
          notFinised: true,
          search: selectEventState.search?.trim(),
          leagueId: selectEventState.leagueSelected,
          nullOddMeta: isUvP ? false : undefined,
        }),
      );
      setPage(page);
    },
    [dispatch, selectEventState.search, selectEventState.leagueSelected, isUvP],
  );

  const renderHotEvents = () => {
    if (!isMobile)
      return (
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          scrollContainerClassName={classes.wrapperEventScroll}
          wrapperClassName={classes.wrapper}
        >
          {hotEvents.map((o, i) => {
            return (
              <EventInfoItem
                key={o.id}
                itemId={o.id}
                fixture={o}
                width={width}
                onClick={() => onHostEvent(o.id, true)}
                isAffiliate={isAffiliate}
                isP2P={isP2P}
              />
            );
          })}
        </ScrollMenu>
      );

    return (
      <Box className={classes.mobileHotEvent}>
        {hotEvents.map((o, i) => {
          return (
            <EventInfoItem
              key={i}
              itemId={o.id}
              fixture={o}
              width={width}
              onClick={() => onHostEvent(o.id, true)}
              isAffiliate={isAffiliate}
              isP2P={isP2P}
            />
          );
        })}
      </Box>
    );
  };

  useEffect(() => {
    if (
      selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER &&
      categoriesDB.length > 0
    ) {
      if (
        !selectEventState.categoryName ||
        selectEventState.categoryName == 'Sport'
      ) {
        const category = categoriesDB.find((c) => c.name == 'Sport');
        const subCategory = categoriesDB.find((c) => c.name == 'Football');
        dispatch(
          updateHostPredictionStateAction({
            categoryName: 'Sport',
            subcategoryName: 'Football',
            subcategory: subCategory?.id,
            category: category?.id,
          }),
        );
      } else if (selectEventState.categoryName == 'Market Prediction') {
        const subCategory = categoriesDB.find((c) => c.name == 'Coin Price');
        dispatch(
          updateHostPredictionStateAction({
            subcategoryName: 'Coin Price',
            subcategory: subCategory?.id,
          }),
        );
      }
    }
  }, [
    selectEventState.dataSource,
    categoriesDB,
    selectEventState.categoryName,
  ]);

  useEffect(() => {
    if (selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER) {
      dispatch(
        getAllLeaguesAction({
          subcategory: selectEventState.subcategory,
          name: selectEventState.subcategoryName,
          notFinised: true,
          nullOddMeta: isUvP ? false : undefined,
        }),
      );
    }
    if (
      selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER &&
      shouldGetCoin.current &&
      coins.length == 0
    ) {
      const searchText = selectEventState.search?.trim();
      shouldGetCoin.current = false;
      dispatch(
        getAllCoinsAction({
          search: searchText,
        }),
      );
    }
  }, [
    selectEventState.subcategory,
    selectEventState.subcategoryName,
    selectEventState.dataSource,
    coins.length,
    isUvP,
    competitions.length,
  ]);

  useEffect(() => {
    const isCoinPriceDataPro =
      selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER &&
      selectEventState.subcategoryName == 'Coin Price';
    let clonePredictState = JSON.parse(
      JSON.stringify({
        eventName: selectEventState.eventName,
        deadline: selectEventState.deadline,
        description: selectEventState.description,
        ...(selectEventState.dataSource == EDataSource.MYSELF && {
          thumbnailUrl: selectEventState.thumbnailUrl,
        }),
        ...(!isCoinPriceDataPro && {
          endTime: selectEventState.endTime,
        }),
      }),
    );
    let deadline = new Date(clonePredictState.deadline).getTime();
    let isDeadlineValid = true;
    let endtime = new Date(clonePredictState.endTime).getTime();
    let isEndtimeValid = true;
    if (
      !deadline ||
      (deadline - new Date().getTime() < 1 * 3600 * 1000 - 60 * 1000 &&
        deadline != 0)
    ) {
      isDeadlineValid = false;
    } else {
      isDeadlineValid = true;
    }
    if (endtime - deadline < 2.5 * 60 * 60 * 1000 && endtime != 0) {
      isEndtimeValid = false;
    } else {
      isEndtimeValid = true;
    }
    const test = Object.keys(clonePredictState).filter(
      (p) => !(selectEventState as any)[p],
    );

    const error = test.length > 0 || !isDeadlineValid || !isEndtimeValid;
    dispatch(
      updateHostPredictionStateAction({
        error,
        errorPool: false,
      }),
    );
  }, [selectEventState]);

  useEffect(() => {
    if (isMobile) {
      setWidth('100%');
      return;
    }
    const container = document.getElementById(HOT_EVENT_CONTAINER);
    setWidth((container?.clientWidth || 0) / 3 - 40);
  }, [isMobile]);

  useEffect(() => {
    const url = isUvP
      ? `${process.env.REACT_APP_BE_URL}/fixtures?pageNumber=1&pageSize=10&notFinised=true&isHot=true`
      : `${process.env.REACT_APP_BE_URL}/fixtures?pageNumber=1&pageSize=10&notFinised=true&isHot=true`;
    axios.get(url).then((r) => {
      setHotEvents(r.data.data);
    });
  }, [isUvP]);

  const handleKeyDown = (e: any) => {
    e.key === 'Enter' && handleSearch();
  };

  return (
    <Box className={classes.eventInfoContainer} id={HOT_EVENT_CONTAINER}>
      <Box ml={isMobile ? 0 : 3} id={OTHER_EVENT_ID}>
        {selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER &&
          selectEventState.showOtherEvent != 'detail' && (
            <>
              <Typography className={classes.browseEvent}>
                Browse events
              </Typography>
              <Box className={classes.wrapper3}>
                <Box position="relative">
                  <CommonInput
                    value={selectEventState.search}
                    onChange={handleChangeValue}
                    className={classes.input}
                    onKeyDown={handleKeyDown}
                  />
                  {selectEventState.search && (
                    <Button
                      className={classes.clearBtn}
                      disableRipple
                      onClick={onClearSearch}
                    >
                      <CloseIcon color="#111111" />
                    </Button>
                  )}
                </Box>
                <Button className={classes.btnSearch} onClick={handleSearch}>
                  <SearchIcon />
                  Search
                </Button>
              </Box>
            </>
          )}
        {((selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER &&
          selectEventState.showOtherEvent == 'detail') ||
          (selectEventState.dataSource == EDataSource.MYSELF &&
            selectEventState.showOtherEvent != 'category')) && (
          <Button className={classes.return} onClick={handleReturn}>
            <ArrowLeftIcon />
            {renderText}
          </Button>
        )}
        {
          <Box
            display="flex"
            flexWrap="wrap"
            mt={2}
            justifyContent={isMobile ? 'space-between' : 'center'}
          >
            {(!isSearch || selectEventState.showOtherEvent == 'detail') &&
              renderCategory}
          </Box>
        }
        {selectEventState.showOtherEvent == 'event' && isSearch && (
          <>
            {isSearch && renderCoin.length > 0 && (
              <Typography className={classes.hostAHotEvent}>
                Coin Price
              </Typography>
            )}
            <Box display="flex" flexWrap="wrap">
              {renderCoin}
            </Box>
          </>
        )}
        {selectEventState.showOtherEvent == 'event' &&
          (selectEventState.subcategoryName == 'Football' || isSearch) && (
            <>
              {isSearch && (
                <Typography className={classes.hostAHotEvent}>
                  Football
                </Typography>
              )}
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  display="grid"
                  width="100%"
                  mt={2}
                  gridTemplateColumns={`repeat(${
                    isMobile ? 1 : 3
                  }, minmax(0, 1fr))`}
                  style={{ gap: isMobile ? 0 : 20 }}
                >
                  {fixtures.length > 0 ? (
                    fixtures.map((o, i) => (
                      <EventInfoItem
                        key={i}
                        itemId={o.id}
                        fixture={o}
                        width={width}
                        onClick={() => onHostEvent(o.id, false)}
                        isP2P={isP2P}
                        isAffiliate={isAffiliate}
                      />
                    ))
                  ) : (
                    <Typography>No result found</Typography>
                  )}
                </Box>
                <Pagination
                  page={page}
                  count={Math.ceil(
                    fixturePagination.total / fixturePagination.pageSize,
                  )}
                  variant="outlined"
                  shape="rounded"
                  className={classes.pagination}
                  onChange={onChangePage}
                />
              </Box>
            </>
          )}
        {selectEventState.dataSource == EDataSource.SPORT_DATA_PROVIDER &&
          selectEventState.subcategoryName == 'Football' &&
          selectEventState.showOtherEvent != 'detail' &&
          !isSearch && (
            <Box>
              <Typography className={classes.hostAHotEvent}>
                Host a hot event
              </Typography>
              {renderHotEvents()}
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default EventInfo;

const HOT_EVENT_CONTAINER = 'HOT_EVENT_CONTAINER';
const OTHER_EVENT_ID = 'OTHER_EVENT_ID';

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
      {
        name: 'Stock Price',
        icon: ChartIcon,
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
