import {
  Box,
  Checkbox,
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BNB_TOKEN } from 'common';
import CommonSelectInput from 'components/common/CommonSelectInput';
import { updateFilterAction } from 'store/actions/filterActions';
import { getFilterState } from 'store/selectors';
import { SortState } from 'types/event';

// import FilterToken from './FilterToken';
import SearchProEvent from './SearchProEvent';
import FilterToken from './FilterToken';

const FilterProEvent = ({
  className,
  shouldRemoveEventType,
  shouldRemoveStatus,
  shouldRemoveUpcomingSort,
}: {
  className?: string;
  shouldRemoveEventType?: boolean;
  shouldRemoveStatus?: boolean;
  shouldRemoveUpcomingSort?: boolean;
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [listSortValue, setListSortValue] = useState(sortByConst);
  const [isSortFollowing, setIsSortFollowing] = useState(false);
  const { active } = useWeb3React();
  const [sortBy, setSortBy] = useState<SortState>(
    shouldRemoveUpcomingSort ? SortState.BIGGEST_POOL : SortState.UPCOMING,
  );
  const [filterBy, setFilterBy] = useState('');
  const open = Boolean(anchorEl);
  const isHome = location.pathname == '/';
  const [isShowSort, setIsShowSort] = useState(false);
  const isHostClub = location.pathname.includes('host-info');
  const filter = useSelector(getFilterState);
  const id = open ? 'simple-popper' : undefined;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [eventType, setEventType] = useState({
    affiliate: true,
    PvP: true,
    UvP: true,
  });
  const [status, setStatus] = useState({
    going: true,
    afterDeadline: true,
    pending: true,
    ended: true,
    noStatus: true,
    all: false,
  });
  const { affiliate, PvP, UvP } = eventType;
  const { sort: sortState } = useSelector(getFilterState);
  const { going, afterDeadline, pending, ended, noStatus, all } = status;
  const dispatch = useDispatch();

  useEffect(() => {
    // if (active) {
    //   setListSortValue(sortByConst);
    //   return;
    // }
    let temp = sortByConst.filter((a, i) => a.type != SortState.FOLLOWING);
    setListSortValue(temp);
  }, [active]);
  useEffect(() => {
    // filter
    if (filter.sort == 'Biggest EFUN Pool' || shouldRemoveUpcomingSort) {
      setSortBy(SortState.BIGGEST_POOL);
      updateSortState(SortState.BIGGEST_POOL);
    } else if (filter.sort == 'Upcoming') {
      setSortBy(SortState.UPCOMING);
    } else {
      setSortBy(SortState.FOLLOWING);
    }
    if (
      filter.tokenIds &&
      filter.tokenIds[0] == process.env.REACT_APP_EFUN_TOKEN
    ) {
      setFilterBy('EFUN');
    } else if (
      filter.tokenIds &&
      filter.tokenIds[0] == process.env.REACT_APP_LINK_TOKEN
    ) {
      setFilterBy('LINK');
    } else if (
      filter.tokenIds &&
      filter.tokenIds[0] == process.env.REACT_APP_XMETA_TOKEN
    ) {
      setFilterBy('XMETA');
    } else if (filter.tokenIds && filter.tokenIds[0] == BNB_TOKEN) {
      setFilterBy('BNB');
    }
    if (filter.eventTypes && !filter.eventTypes.includes('user vs user'))
      setEventType({ ...eventType, PvP: false });
    if (filter.eventTypes && !filter.eventTypes.includes('user vs pool'))
      setEventType({ ...eventType, UvP: false });
    if (
      filter.listingStatuses &&
      !filter.listingStatuses.includes('Predicted') &&
      !filter.listingStatuses.includes('No status')
    ) {
      setStatus({ ...status, going: false });
    }
    if (filter.listingStatuses && !filter.listingStatuses.includes('Locked'))
      setStatus({ ...status, afterDeadline: false });
    if (filter.listingStatuses && !filter.listingStatuses.includes('Ended'))
      setStatus({ ...status, ended: false });
    if (
      filter.listingStatuses &&
      !filter.listingStatuses.includes('Pending result')
    )
      setStatus({ ...status, pending: false });
    // if (filter.listingStatuses && !filter.listingStatuses.includes('No status'))
    //   setStatus({ ...status, noStatus: false });
  }, []);
  useEffect(() => {
    let eventTypeParams = [];
    if (eventType.PvP) eventTypeParams.push('user vs user');
    if (eventType.UvP) eventTypeParams.push('user vs pool');
    if (eventType.affiliate) eventTypeParams.push('affiliate');
    dispatch(
      updateFilterAction({
        eventTypes: eventTypeParams,
      }),
    );
  }, [eventType]);
  useEffect(() => {
    let listingStatusesParams = [];
    if (status.going) listingStatusesParams.push('Predicted');
    if (status.going) listingStatusesParams.push('No status');
    if (status.afterDeadline) listingStatusesParams.push('Locked');
    if (status.ended) listingStatusesParams.push('Ended');
    if (status.pending) listingStatusesParams.push('Pending result');
    if (status.all) listingStatusesParams.push('All');
    dispatch(
      updateFilterAction({
        listingStatuses: listingStatusesParams,
      }),
    );
  }, [status]);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsShowSort(false);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClickAway = () => {
    setAnchorEl(null);
  };
  const handelChangeSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    if (newValue == 'Biggest Pool') {
      updateSortState(SortState.BIGGEST_POOL);
      setSortBy(SortState.BIGGEST_POOL);
    } else if (newValue == 'Upcoming') {
      updateSortState(SortState.UPCOMING);
      setSortBy(SortState.UPCOMING);
    } else {
      updateSortState(SortState.FOLLOWING);
      setSortBy(SortState.FOLLOWING);
    }
  };

  const sort = useMemo(() => {
    return [
      ...(shouldRemoveUpcomingSort
        ? []
        : [
            {
              value: SortState.UPCOMING,
              id: SortState.UPCOMING,
            },
          ]),
      {
        value: 'Biggest Pool',
        id: SortState.BIGGEST_POOL,
      },
      {
        value: SortState.FOLLOWING,
        id: SortState.FOLLOWING,
      },
    ];
  }, [shouldRemoveUpcomingSort]);
  const handleChangeIsFollowing = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsSortFollowing(event.target.checked);
      if (event.target.checked) updateSortState(SortState.FOLLOWING);
      else updateSortState(SortState.UPCOMING);
    },
    [isSortFollowing],
  );
  const handelChangeFilterToken = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let newValue = event.target.value;
    if (newValue == 'BNB') {
      updateTokenSortState([BNB_TOKEN]);
    } else if (newValue == 'EFUN') {
      updateTokenSortState([process.env.REACT_APP_EFUN_TOKEN || '']);
    } else if (newValue == 'LINK') {
      updateTokenSortState([process.env.REACT_APP_LINK_TOKEN || '']);
    } else if (newValue == 'XMETA') {
      updateTokenSortState([process.env.REACT_APP_XMETA_TOKEN || '']);
    } else updateTokenSortState([]);
    setFilterBy(newValue);
  };
  const handleChangeFilterEventType = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEventType({ ...eventType, [event.target.name]: event.target.checked });
  };
  const handleChangeFilterStatus = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStatus({ ...status, [event.target.name]: event.target.checked });
  };
  const updateTokenSortState = useCallback(
    (value: string[]) => {
      dispatch(
        updateFilterAction({
          tokenIds: value,
        }),
      );
    },
    [dispatch],
  );
  const updateSortState = useCallback(
    (value: SortState) => {
      if (value == sortState) return;
      dispatch(
        updateFilterAction({
          sort: value,
        }),
      );
    },
    [dispatch, sortState],
  );

  const EventTypeCheckBox = () => {
    return (
      <Box>
        <FormControl
          component="fieldset"
          className={classes.formControlEventType}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={affiliate}
                  onChange={handleChangeFilterEventType}
                  name="affiliate"
                />
              }
              label="Affiliate"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={PvP}
                  color="default"
                  onChange={handleChangeFilterEventType}
                  name="PvP"
                />
              }
              label="P2P & Prize"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={UvP}
                  color="default"
                  onChange={handleChangeFilterEventType}
                  name="UvP"
                />
              }
              label="User vs. Pool"
            />
          </FormGroup>
        </FormControl>
      </Box>
    );
  };
  const StatusCheckBox = () => {
    return (
      <Box>
        <FormControl component="fieldset" className={classes.formControlStatus}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={going}
                  onChange={handleChangeFilterStatus}
                  color="default"
                  name="going"
                />
              }
              label="On-going"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={afterDeadline}
                  color="default"
                  onChange={handleChangeFilterStatus}
                  name="afterDeadline"
                />
              }
              label="Locked after deadline"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={pending}
                  color="default"
                  onChange={handleChangeFilterStatus}
                  name="pending"
                />
              }
              label="Pending result"
            />
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={noStatus}
                  color="default"
                  onChange={handleChangeFilterStatus}
                  name="noStatus"
                />
              }
              label="No status"
            /> */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={ended}
                  color="default"
                  onChange={handleChangeFilterStatus}
                  name="ended"
                />
              }
              label="Recently ended"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={all}
                  color="default"
                  onChange={handleChangeFilterStatus}
                  name="all"
                />
              }
              label="All ended event"
            />
          </FormGroup>
        </FormControl>
      </Box>
    );
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseUp">
      <Box className={clsx(classes.wapper, className)}>
        {/* {!isMobile && isHome && <FilterToken />} */}
        {!isMobile && <SearchProEvent />}
        {!isMobile && isHome && <FilterToken />}
        {/* {isMobile && (
          <Button aria-describedby={id} type="button" onClick={handleClick}>
            <FilterIcon color="#BDBDBD" />
          </Button>
        )} */}
        {isMobile && !isHostClub && (
          <>
            {/* <Typography
              style={{
                margin: '0px 16px',
                fontSize: 20,
              }}
            >
              |
            </Typography> */}
            {/* <Box display="inline">
              <Box
                style={{
                  fontSize: 18,
                  cursor: 'pointer',
                  position: 'relative',
                  marginLeft: '12px',
                }}
                onClick={() => {
                  setIsShowSort(!isShowSort);
                  setAnchorEl(null);
                }}
              >
                Sort by
                <Box className={classes.wapperIcon}>
                  <BottomArrowIcon color={'#fff'} viewBox="0 0 16 16" />
                </Box>
                {isShowSort && (
                  <Box className={classes.wapperSort}>
                    {listSortValue.map((item) => {
                      return (
                        <Box
                          key={item.type}
                          onClick={() => updateSortState(item.type)}
                          style={{
                            marginBottom: 8,
                          }}
                        >
                          <Typography
                            className={clsx({
                              [classes.active]: sortState == item.type,
                            })}
                          >
                            {item.name}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            </Box> */}
          </>
        )}
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          style={{
            zIndex: 10,
          }}
          modifiers={{
            flip: {
              enabled: false,
            },
          }}
        >
          <Box className={classes.filter}>
            {!isHome && (
              <>
                <Typography>Sort By</Typography>
                <CommonSelectInput
                  values={sort}
                  currentValue={sortBy}
                  onChange={handelChangeSort}
                  className={classes.select}
                />
              </>
            )}
            {/* {(!isHome || (isMobile && isHome)) && (
              <>
                <Typography>Filter By</Typography>
                <CommonSelectInput
                  values={token}
                  currentValue={filterBy}
                  onChange={handelChangeFilterToken}
                  className={classes.select}
                  label="All Tokens"
                />
              </>
            )} */}
            {isHome && !isMobile && <Typography>Filter By</Typography>}

            {/* {!shouldRemoveEventType && <EventTypeCheckBox />} */}
            {active && (
              <Box>
                <FormControl
                  component="fieldset"
                  className={classes.formControlEventType}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isSortFollowing}
                          onChange={handleChangeIsFollowing}
                          name="following"
                        />
                      }
                      label="Following"
                    />
                  </FormGroup>
                </FormControl>
              </Box>
            )}
            {/* {!shouldRemoveStatus && (
              <>
                <Typography>Status</Typography>
                <StatusCheckBox />
              </>
            )} */}
          </Box>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

const sortByConst = [
  {
    name: 'Upcoming',
    type: SortState.UPCOMING,
  },
  {
    name: 'Biggest Pool',
    type: SortState.BIGGEST_POOL,
  },
  {
    name: 'Following',
    type: SortState.FOLLOWING,
  },
];
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filter: {
      marginRight: 20,
      background: '#616161',
      width: 240,
      padding: 20,
      zIndex: 10,
      '&>p': {
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '19px',
        marginBottom: 12,
        marginTop: 16,
      },
      '&>p:first-child': {
        marginTop: 0,
      },
    },
    wapperSort: {
      width: 'max-content',
      border: '1px solid gray',
      position: 'absolute',
      top: 40,
      right: 10,
      zIndex: 10,
      background: '#616161',
      padding: '12px 20px',
    },
    wapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      '&>div:nth-child(2)': {
        width: 100,
      },
      [theme.breakpoints.down('sm')]: {
        '&>div:nth-child(2)': {
          width: 'unset',
        },
      },
    },
    wapperIcon: {
      display: 'inline',
      marginLeft: 8,
      '&>svg': {
        marginTop: 12,
      },
    },
    active: {
      color: '#3FADD5',
    },
    select: {
      '&>div:first-child': {
        background: 'transparent',
        border: '1px solid #BDBDBD',
        borderRadius: '2px',
      },
    },
    formControlEventType: {
      '&>div': {
        flexDirection: 'row',
      },
      '& span': {
        color: '#BDBDBD',
      },
    },
    formControlStatus: {
      '& span': {
        color: '#BDBDBD',
      },
    },
  }),
);

export default FilterProEvent;
