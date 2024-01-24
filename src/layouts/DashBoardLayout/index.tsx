import { Box, makeStyles, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import { ElementType, useCallback, useEffect } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route,
  RouteComponentProps,
  RouteProps,
  useLocation,
} from 'react-router-dom';

import { PUBLIC_SOURCES } from 'common';
import { Category } from 'components/Category';
import CommonDialog from 'components/common/CommonDialog';
import CommonMenu from 'components/common/CommonMenu';
import FilterProEvent from 'components/Event/FilterProEvent';
import SearchProEvent from 'components/Event/SearchProEvent';
import Sort from 'components/Event/Sort';
import Footer from 'components/Footer';
import { MainBanner } from 'components/MainBanner';
import TopBar from 'components/TopBar';
// import EfunContractMobile from 'containers/DecentralizedPool/EfunContractMobile';
import RightBarDetailEvent from 'containers/DetailEvent/RightBar';
import StepHomePage from 'containers/NewHome/StepHomePage';
import { LocalStorageEnum } from 'enums/auth';
import theme from 'material';
import { logoutUserAction } from 'store/actions/userActions';
import { getFilterState } from 'store/selectors';
import LocalStorage from 'utils/LocalStorage';

export interface DashboardLayoutProps extends RouteProps {
  RenderComponent: ElementType;
}

interface LayoutProps {
  routeProps: RouteComponentProps;
  RenderComponent: ElementType;
  path?: string | string[];
}

const Layout = (props: LayoutProps) => {
  const { routeProps, RenderComponent } = props;
  const classes = useStyles();
  const location = useLocation();
  const isHome = location.pathname == '/';
  const isDetail = location.pathname.includes('detail-event');
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const filter = useSelector(getFilterState);
  useEffect(() => {
    const accessToken = LocalStorage.getItem(LocalStorageEnum.ACCESS_TOKEN);
    if (!accessToken) {
      const index = PUBLIC_SOURCES.findIndex((p) => {
        if (p.exact) {
          return p.pathname == location.pathname;
        } else {
          return location.pathname.includes(p.pathname);
        }
      });
      if (index < 0) {
        window.location.href = '/';
      }
    }
  }, [location.pathname]);
  useEffect(() => {
    let navbar = document.getElementById('wrapper-filter');
    window.onscroll = () => {
      if (!navbar) return;
      let sticky = navbar.offsetTop;
      if (isDesktop) {
        if (window.pageYOffset > sticky - 76) {
          navbar.classList.add('sticky', 'desktopNav');
        }
        if (window.pageYOffset < 60) {
          navbar.classList.remove('sticky', 'desktopNav');
        }
      } else {
        if (window.pageYOffset > sticky - 76) {
          navbar.classList.add('sticky', 'mobileNav');
        }
        if (window.pageYOffset < 230) {
          navbar.classList.remove('sticky', 'mobileNav');
        }
      }
    };
  }, [isDesktop]);

  return (
    <>
      <div
        className={clsx(classes.common, {
          [classes.containerHome]: isHome,
          [classes.normal]: !isHome && !isDetail,
          [classes.containerDetail]: isDetail,
        })}
      >
        <TopBar />
        <Box className={classes.wrapper}>
          {/* {!isDesktop && <EfunContractMobile />} */}
          {isHome && (
            <Box
              style={{
                position: 'relative',
              }}
            >
              <StepHomePage />
              <MainBanner />
            </Box>
          )}
          {/* {isHome && <ProEventItem event={data} />} */}
          <Category />
          {/* <CategoryProEvent /> */}
          {isHome && (
            <div id="wrapper-filter">
              {isMobile && (
                <Box className={classes.searchHome}>
                  <SearchProEvent />
                </Box>
              )}
              <Box className={classes.searchFilter}>
                <Sort />
                <FilterProEvent />
              </Box>
            </div>
          )}
          {/* {isHome && (filter.search ? <SortProEvent /> : <Sort />)} */}
        </Box>
        {/* {isDesktop && <BetSlip />} */}
        {isDetail && isDesktop && <RightBarDetailEvent />}
        <RenderComponent {...routeProps} />
        <CommonDialog />
        <CommonMenu />
      </div>
      <Footer />
    </>
  );
};
const DashBoardLayout = ({
  RenderComponent,
  ...rest
}: DashboardLayoutProps) => {
  const dispatch = useDispatch();

  const render = useCallback(
    (routeProps: RouteComponentProps) => {
      const isAdmin = localStorage.getItem(LocalStorageEnum.IS_ADMIN);
      if (isAdmin) {
        dispatch(logoutUserAction());
      }
      return (
        <Layout
          routeProps={routeProps}
          RenderComponent={RenderComponent}
          path={rest.path as any}
        />
      );
    },
    [RenderComponent, rest.path],
  );

  return <Route {...rest} render={render} />;
};

export default DashBoardLayout;

const useStyles = makeStyles((theme) => ({
  common: {
    [theme.breakpoints.up('lg')]: {
      minHeight: 'calc(100vh - 197px)',
    },
  },
  containerHome: {
    '&>div:last-child': {
      padding: '0px 35px 0px 225px',
      '&>div': {
        position: 'relative',
        width: '100% !important',
        overflow: 'hidden',
      },
      [theme.breakpoints.down('md')]: {
        padding: '0px 20px 0px 20px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 0px 0px 0px',
      },
    },
  },
  searchHome: {
    margin: '4px 0px',
    '&>div>div': {
      width: '343px !important',
      marginRight: 0,
    },
  },
  searchFilter: {
    marginBottom: 24,
    marginTop: 24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      marginBottom: 12,
      // marginLeft: 16,
      padding: '0px 12px !important',
      // marginRight: 16,
    },
    [theme.breakpoints.down('md')]: {
      padding: '0px 20px',
    },
  },
  normal: {
    '&>div:last-child': {
      padding: '0px 35px 0px 225px',
      [theme.breakpoints.down('md')]: {
        padding: '0px 20px 0px 20px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 0px 0px 0px',
      },
    },
  },
  containerDetail: {
    '&>div:last-child': {
      padding: '0px 340px 0px 250px',
      [theme.breakpoints.down('md')]: {
        padding: '0px 20px 0px 20px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 0px 0px 0px',
      },
    },
  },
  wrapper: {
    marginTop: 80,
    padding: '0px 35px 0px 225px',
    width: '100%',
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      position: 'static',
      width: '100%',
      padding: 0,
    },
  },
}));
