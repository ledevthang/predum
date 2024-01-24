import {
  Box,
  Button,
  Checkbox,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import Decimal from 'decimal.js';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Web3 from 'web3';

import CommonCardNFT from 'components/common/CommonCardNFT';
import LoadingButton from 'components/common/LoadingButton';
import ClaimAmountFailed from 'components/dialog/ClaimAmountFailed';
import FailedDialog from 'components/dialog/FailedDialog';
import SuccessDialog from 'components/dialog/SuccessDialog';
import WalletConnectDialog from 'components/WalletConnect';
import { checkApproveTx, convertThousandSeperator } from 'helpers';
import { useGetCurrentNav } from 'hooks/useGetCurrentNav';
import AddIcon from 'icon/AddIcon';
import MinusIcon from 'icon/MinusIcon';
import { elpTokenABI } from 'services/contract';
import { isProd } from 'services/wallet';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { getUserState } from 'store/selectors';

const NFTCollectionItem = ({
  data,
  index,
  setActivedIndex,
  setIsMinted,
  isMinted,
  activedIndex,
}: {
  data: any;
  activedIndex: any;
  setActivedIndex: any;
  index: any;
  setIsMinted: any;
  isMinted: boolean;
}) => {
  const classes = useStyles();
  const [count, setCount] = useState(1);
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { library, account, active, chainId } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);
  const [mint, setMint] = useState(0);
  const [insufficient, setInsufficient] = useState(false);
  const [limit, setLimit] = useState(1);
  const [elpAmtClass, setElpAmtClass] = useState(0);
  const userState = useSelector(getUserState);
  const currentNav = useGetCurrentNav();
  const [callSCError, setCallSCError] = useState(false);
  const [errorCheck, setErrorCheck] = useState(false);
  useEffect(() => {
    (async () => {
      if (isLoading) return;
      setIsLoadingInfo(true);
      if (!library?.provider && !window.ethereum) return;
      const web3 = new Web3(library?.provider || window.ethereum);
      try {
        const contract = new web3.eth.Contract(
          elpTokenABI as any,
          process.env.REACT_APP_ELP,
        );
        const countMint = await contract.methods.counts(index).call();
        const limitMint = await contract.methods.limits(index).call();
        const elpAmtClassMint = await contract.methods
          .elpAmtOfClass(index)
          .call();
        setCallSCError(false);
        setMint(countMint);
        setLimit(limitMint);
        setElpAmtClass(new Decimal(elpAmtClassMint).div(10 ** 18).toNumber());
        setIsLoadingInfo(false);
      } catch (error) {
        setCallSCError(true);
      }
    })();
  }, [library?.provider, index, isLoading, account]);
  useEffect(() => {
    if (+userState.efunBalance < elpAmtClass * currentNav * count) {
      setInsufficient(true);
    } else {
      setInsufficient(false);
    }
  }, [count, activedIndex, account, userState.efunBalance]);
  const handleClickMint = async () => {
    if (!active) {
      dispatch(
        updateDialogStateAction({
          open: true,
          component: <WalletConnectDialog />,
        }),
      );
      return;
    }
    const status = await switchNetwork();
    if (status) {
      setActivedIndex(index);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const callbackError = useCallback(
    (errMes: string) => {
      dispatch(
        updateDialogStateAction({
          component: <ClaimAmountFailed reason={errMes} />,
          open: true,
        }),
      );
    },
    [dispatch],
  );
  const switchNetwork = async () => {
    let currentChain = await window.ethereum.request({ method: 'eth_chainId' });
    if (isProd) {
      if (currentChain == '0x38') return true;
      callbackError('Please switch to Arbitrum One to mint nft');
      return false;
    } else {
      if (currentChain == '0x61') return true;
      callbackError('Please switch to Arbitrum Goerli Testnet to mint nft');
      return false;
    }
  };
  const handleChangeCount = (type: string) => {
    if (type == 'add') {
      if (count == limit - mint) return;
      else setCount(count + 1);
    }
    if (type == 'minus') {
      if (count == 1) return;
      else setCount(count - 1);
    }
  };
  const AddCircleIcon = () => {
    return (
      <Box
        className={clsx('center-root', classes.addIcon)}
        onClick={() => handleChangeCount('add')}
      >
        <AddIcon color="#BDBDBD" />
      </Box>
    );
  };
  const MinusCircleIcon = () => {
    return (
      <Box
        className={clsx('center-root', classes.minusIcon, classes.addIcon)}
        onClick={() => handleChangeCount('minus')}
      >
        <MinusIcon color="#BDBDBD" />
      </Box>
    );
  };
  const callbackSuccess = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        component: (
          <SuccessDialog
            info={'Mint NFT successful'}
            text="View my investment"
            callback={() => {
              history.push('/my-investment');
            }}
          />
        ),
        open: true,
      }),
    );
  }, [dispatch]);
  const callbackFail = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        component: <FailedDialog reason="Fail to mint NFT" />,
        open: true,
      }),
    );
  }, [dispatch]);
  useEffect(() => {
    if (checked) {
      setErrorCheck(false);
    }
  }, [checked]);
  const handleMint = async () => {
    if (!checked) {
      setErrorCheck(true);
      return;
    } else {
      setErrorCheck(false);
      if (!library?.provider && !window.ethereum) return;
      const web3 = new Web3(library?.provider || window.ethereum);
      const contract = new web3.eth.Contract(
        elpTokenABI as any,
        process.env.REACT_APP_ELP,
      );
      const efunToken = process.env.REACT_APP_EFUN_TOKEN;
      try {
        setIsLoading(true);
        await checkApproveTx(
          web3,
          account || '',
          `${count * elpAmtClass * currentNav || 0}`,
          efunToken,
          true,
        );
        const res = await contract.methods.buyNFT(index, count).send({
          from: account,
          // gasPrice: web3.utils.toWei('0.1', 'gwei'),
        });
        if (res.status == true) {
          setIsLoading(false);
          setCount(1);
          setChecked(false);
          setIsMinted(!isMinted);
          callbackSuccess();
        }
      } catch (error) {
        setIsLoading(false);
        setChecked(false);
        setCount(1);
        callbackFail();
        console.log('error', error);
      }
    }
  };
  return (
    <Box className={classes.container}>
      <Box>
        <Box className={classes.card}>
          <CommonCardNFT index={index} />
          {activedIndex != index && (
            <Box className={classes.cardInfo}>
              {!callSCError && (
                <Typography className={classes.total}>
                  {convertThousandSeperator(elpAmtClass * currentNav)} EFUN
                </Typography>
              )}
              {mint != limit && !isLoadingInfo && (
                <Typography className={classes.status}>
                  {mint} of {limit} minted
                </Typography>
              )}
              {mint == limit && !callSCError && !isLoadingInfo && (
                <Typography className={classes.soldOut}>Sold out</Typography>
              )}
            </Box>
          )}
        </Box>
        <Box className={classes.benefits}>
          <Typography>Benefits</Typography>
          <Box component="ul">
            {data.benefits.map((item: any, index: any) => {
              return (
                <Typography
                  component="li"
                  key={index}
                  className={classes.benefitsItem}
                >
                  {item}
                </Typography>
              );
            })}
          </Box>
          {((activedIndex != index && mint != limit) || callSCError) && (
            <Button className={classes.selectButton} onClick={handleClickMint}>
              Select to mint
            </Button>
          )}
        </Box>
      </Box>
      {activedIndex == index && (
        <Box className={classes.mint}>
          <Box display="flex" className={classes.wapperPrice}>
            <Typography>Mint price</Typography>
            <Typography>
              {convertThousandSeperator(elpAmtClass * currentNav)} EFUN
            </Typography>
          </Box>
          {mint != limit && (
            <Typography className={classes.minted}>
              {mint} of {limit} minted
            </Typography>
          )}

          <Box display="flex" className={classes.wapperCount}>
            <Box display="flex">
              <MinusCircleIcon />
              <Typography className={classes.count}>{count}</Typography>
              <AddCircleIcon />
            </Box>
            <Typography>
              {convertThousandSeperator(elpAmtClass * currentNav * count)} EFUN
            </Typography>
          </Box>
          <Box>
            <Box className={classes.wapperTerm}>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                defaultChecked
                className={classes.checkbox}
              />
              <Typography>
                By clicking this box, I confirm that I have read and agree to
                the
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://docs.efun.tech/decentralized-pool/infts/inft-terms-and-conditions"
                >
                  Term of Sales
                </Link>
              </Typography>
            </Box>
            <Typography className={classes.minted}>
              EFUN is not responsible for the gas fee that you may incur
            </Typography>
            {errorCheck && (
              <Typography className={classes.error}>
                Please read and agree to the Term of Sale by checking the box
              </Typography>
            )}
            {insufficient && (
              <Box display="flex">
                <Typography className={classes.error}>
                  Insufficient amount
                </Typography>
                <Button
                  onClick={() => {
                    window
                      .open(
                        'https://pancakeswap.finance/swap?outputCurrency=0x6746e37a756da9e34f0bbf1c0495784ba33b79b4',
                        '_blank',
                      )
                      ?.focus();
                  }}
                  className={classes.buyBtn}
                >
                  Buy PRT
                </Button>
              </Box>
            )}
          </Box>
          {mint != limit && (
            <LoadingButton
              className={classes.mintButton}
              isLoading={isLoading}
              disabled={errorCheck || insufficient}
              onClick={handleMint}
            >
              MINT NFT NOW
            </LoadingButton>
          )}
        </Box>
      )}
    </Box>
  );
};
export default NFTCollectionItem;
const useStyles = makeStyles((theme) => ({
  container: {
    padding: '32px 20px',
    marginBottom: 24,
    background: '#1C1C1E',
    borderRadius: '2px',
    width: '100%',
    '&>div:first-child': {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
  },
  addIcon: {
    width: 24,
    height: 24,
    border: '1px solid #BDBDBD',
    borderRadius: '12px',
    cursor: 'pointer',
  },
  wapperPrice: {
    alignItems: 'center',
    marginBottom: 4,
    '&>p': {
      fontSize: 22,
      lineHeight: '26px',
      marginLeft: 0,
    },
    '&>p:last-child': {
      marginLeft: 8,
      fontSize: 28,
      fontWeight: 600,
      lineHeight: '36px',
      color: '#3FADD5',
    },
  },
  buyBtn: {
    fontSize: 14,
    color: '#3FADD5',
    marginLeft: 8,
  },
  error: {
    color: '#E53935',
    fontSize: 14,
    marginTop: 1,
  },
  soldOut: {
    color: '#E53935',
    fontSize: 17,
    textTransform: 'uppercase',
  },
  checkbox: {
    '&.Mui-checked': {
      color: '#3FADD5 !important',
    },
  },
  wapperTerm: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiCheckbox-root': {
      paddingLeft: 0,
      color: '#BDBDBD',
    },
    '& a': {
      color: '#3FADD5',
      marginLeft: '3px',
      cursor: 'pointer',
    },
  },
  minted: {
    color: '#BDBDBD',
  },
  count: {
    minWidth: 24,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: '20px',
    margin: '0px 18px',
  },
  mintButton: {
    width: 171,
    height: 44,
    marginTop: 40,
    border: '1px solid #3FADD5',
    borderRadius: '22px',
    color: '#1C1C1E',
    background:
      'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
    '& span': {
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: 16,
    },
  },
  wapperCount: {
    margin: '20px 0px',
    '&>p': {
      fontSize: 18,
      lineHeight: '20px',
      marginLeft: 24,
    },
  },
  minusIcon: {
    '&>svg': {
      width: 14,
    },
  },
  mint: {
    borderTop: '1px solid gray',
    marginTop: 20,
    paddingTop: 20,
  },
  card: {
    marginRight: 24,
  },
  total: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '20px',
  },
  status: {
    fontSize: 14,
    lineHeight: '17px',
    textTransform: 'uppercase',
    color: '#BDBDBD',
  },
  benefitsItem: {
    fontSize: 16,
    lineHeight: '20px',
    color: '#BDBDBD',
  },
  cardInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 6,
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
  },
  selectButton: {
    width: 171,
    height: 44,
    border: '1px solid #3FADD5',
    borderRadius: '22px',
    marginTop: 8,
    // color: '#3FADD5',
    background: 'linear-gradient(to right, #3FADD5 0%, #3FADD5 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '& span': {
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: 16,
    },
  },
  image: {
    height: 180,
    width: 300,
  },
  benefits: {
    '&>p:first-child': {
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 16,
    },
  },
}));
