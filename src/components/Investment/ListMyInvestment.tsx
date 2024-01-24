import { Box, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useWeb3React } from '@web3-react/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNFTsAction } from 'store/actions/nftActions';
import { getNFTData, getNFTPagination, getUserState } from 'store/selectors';
import { MyInvestmentFilter } from 'types/investment';
import InvestmentItem from './InvestmentItem';

interface IProps {
  filterValue: MyInvestmentFilter;
}
const ListMyInvestment = ({ filterValue }: IProps) => {
  const classes = useStyles();

  const nfts = useSelector(getNFTData);
  const nftPagination = useSelector(getNFTPagination);
  const [page, setPage] = useState(nftPagination.pageNumber || 1);
  const userState = useSelector(getUserState);

  const { account } = useWeb3React();
  const dispatch = useDispatch();

  const onChangePage = useCallback(
    (event: any, page: number) => {
      if (!account || !userState.id) return;
      dispatch(
        getAllNFTsAction({
          pageNumber: page,
          pageSize: 6,
          orderBy: filterValue,
          userId: `${userState.id}`,
        }),
      );
      setPage(page);
    },
    [dispatch, filterValue, userState.id, account],
  );

  useEffect(() => {
    if (!account || !userState.id) return;
    dispatch(
      getAllNFTsAction({
        pageNumber: 1,
        pageSize: 6,
        orderBy: filterValue,
        userId: `${userState.id}`,
      }),
    );
  }, [filterValue, userState.id, account]);

  return (
    <>
      {nfts.length > 0 && (
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box className={classes.container}>
            {nfts.map((k) => (
              <InvestmentItem key={k.id} data={k} />
            ))}
          </Box>
          <Pagination
            page={page}
            count={Math.ceil(nftPagination.total / nftPagination.pageSize)}
            variant="outlined"
            shape="rounded"
            className={classes.pagination}
            onChange={onChangePage}
          />
        </Box>
      )}
      {nfts.length == 0 && (
        <Box
          style={{
            fontSize: 18,
            width: '100%',
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          You have no iNFT at the moment
        </Box>
      )}
    </>
  );
};

export default ListMyInvestment;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '24px 20px',
    marginTop: 16,
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      gap: '16px 20px',
    },
  },
  pagination: {
    marginTop: 48,
    '& .MuiPaginationItem-outlined': {
      border: '1px solid #616161',
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      border: '1px solid #3FADD5',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 24,
    },
  },
}));
