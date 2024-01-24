import {
  Box,
  Button,
  CardMedia,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import { DEBOUNCE_UPDATE_VALIDATION } from 'common';
import CommonInput from 'components/common/CommonInput';
import ShowMoreReportDialog from 'components/dialog/ShowMoreReportDialog';
import dayjs from 'dayjs';
import { hasMoreFn } from 'helpers';
import { debounce } from 'lodash';
import React, { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { getAllEventAction } from 'store/actions/eventActions';
import { getPaginationEvent, getEvents } from 'store/selectors';
import { SortState } from 'types/event';
import Action from './Action';
import { useStyles } from './styles';

const EventReport = () => {
  const classes = useStyles();
  const events = useSelector(getEvents);
  const eventPagination = useSelector(getPaginationEvent);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState<string>('');

  const hasMore = useMemo(() => {
    return hasMoreFn(eventPagination);
  }, [eventPagination]);

  const dispatch = useDispatch();

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);
    },
    [setPage],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
    },
    [setPage, setRowsPerPage],
  );

  const labelDisplayedRows = useCallback(() => {
    const { pageNumber, pageSize, total } = eventPagination;
    const to = pageNumber * pageSize > total ? total : pageNumber * pageSize;
    return `${(pageNumber - 1) * pageSize + 1}–${to} of ${total}`;
  }, [eventPagination]);

  const debouncedOnGetUserByName = debounce((search: string) => {
    setPage(1);
    dispatch(
      getAllEventAction({
        search,
        pageNumber: 1,
        pageSize: rowsPerPage,
        haveReport: true,
        orderBy: SortState.LATEST,
      }),
    );
  }, DEBOUNCE_UPDATE_VALIDATION);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      debouncedOnGetUserByName(event.target.value);
    },
    [setSearch, debouncedOnGetUserByName],
  );

  useEffect(() => {
    dispatch(
      getAllEventAction({
        search,
        pageNumber: page,
        pageSize: rowsPerPage,
        haveReport: true,
        orderBy: SortState.LATEST,
      }),
    );
  }, [dispatch, page, rowsPerPage]);

  const onOpenImg = useCallback((link: string) => {
    window.open(link, '_blank');
  }, []);

  const renderStatus = useCallback((time: string, isBlock: boolean) => {
    if (!time) return '';
    const date = dayjs(time);
    const dateToMilliSecond = date.valueOf();
    if (Date.now() <= dateToMilliSecond) {
      return 'On-going dispute';
    } else if (isBlock) {
      return 'Cashback';
    } else {
      return 'Agree';
    }
  }, []);

  const onShowViewMore = useCallback(
    (newArray: any[], reportType: string[]) => {
      dispatch(
        updateDialogStateAction({
          open: true,
          component: (
            <ShowMoreReportDialog reports={newArray} reportType={reportType} />
          ),
        }),
      );
    },
    [dispatch],
  );

  return (
    <Box className={classes.container}>
      <Typography className={classes.headline}>Event Report</Typography>
      <Box mt={1}>
        <Typography className={classes.searchLabel}>Search</Typography>
        <CommonInput
          value={search}
          onChange={handleChange}
          placeholder="Search Event"
          className={classes.input}
        />
      </Box>
      <Paper className={classes.main}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Event</TableCell>
                <TableCell align="left">Evidence of host</TableCell>
                <TableCell align="center">Evidence of user</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((row) => (
                <TableRow key={row.id} classes={{ root: classes.root }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left" style={{ width: 150 }}>
                    {row.resultProofUrl &&
                      (row.typeUpload == 'file' ? (
                        <CardMedia
                          image={row.resultProofUrl}
                          onClick={() => onOpenImg(row.resultProofUrl || '')}
                          className={classes.evidenceImg}
                        />
                      ) : (
                        <a
                          className={classes.linkReport}
                          href={row.resultProofUrl}
                        >
                          {row.resultProofUrl}
                        </a>
                      ))}
                  </TableCell>
                  <TableCell align="center">
                    <Box className={classes.evidenceOfUser}>
                      {row.reportContents[0] &&
                        (row.reportTypeUploads[0] == 'file' ? (
                          <CardMedia
                            onClick={() => onOpenImg(row.reportContents[0])}
                            image={row.reportContents[0]}
                            className={classes.evidenceImg}
                          />
                        ) : (
                          <a
                            className={classes.linkReport}
                            href={row.reportContents[0]}
                          >
                            {row.reportContents[0]}
                          </a>
                        ))}
                      {row.reportContents.length > 1 && (
                        <Button
                          disableRipple
                          className={classes.viewMore}
                          onClick={() => {
                            const newArray = row.reportContents.slice(1);
                            const newReportType =
                              row.reportTypeUploads.slice(1);
                            onShowViewMore(newArray, newReportType);
                          }}
                        >
                          View more
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {renderStatus(row.claimTime || '', row.isBlock)}
                  </TableCell>
                  <TableCell align="center" className={classes.action}>
                    <Action
                      row={row}
                      status={renderStatus(row.claimTime || '', row.isBlock)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={eventPagination.total}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            disabled: eventPagination.pageNumber == 1,
          }}
          nextIconButtonProps={{
            disabled: !hasMore,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          SelectProps={{
            MenuProps: { classes: { paper: classes.selectDropdown } },
          }}
          labelDisplayedRows={labelDisplayedRows}
        />
      </Paper>
    </Box>
  );
};

export default EventReport;
