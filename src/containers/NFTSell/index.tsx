import {
  Box,
  Button,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import CommonInput from 'components/common/CommonInput';
import QuestionDecentralized from 'containers/DecentralizedPool/QuestionDecentralized';
import { isStringNumber } from 'helpers';
import React, { useState } from 'react';
const NFTSell = ({ data }: { data: any }) => {
  const classes = useStyles();
  const [sellPrice, setSellPrice] = useState<number>();
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    if (!isStringNumber(newValue)) return;
    setSellPrice(+newValue);
  };
  return (
    <Box className={classes.container}>
      <Box className={classes.sellZone}>
        <Typography>Sell NFT</Typography>
        <Box display="flex" alignItems="center">
          <CardMedia image="/images/Test.png" className={classes.image} />
          <Box className={classes.wapper}>
            <CommonInput
              value={sellPrice}
              placeholder="Enter your selling price"
              onChange={handleChangeInput}
              className={classes.inputField}
              error={isError}
              helperText={helperText}
            />
            <Box display="flex" className={classes.wapperAsset}>
              <Typography>Current asset value:</Typography>
              <Typography>11.100.000 EFUN</Typography>
            </Box>
            <Button className={classes.confirm}>Confirm now</Button>
          </Box>
        </Box>
      </Box>
      <QuestionDecentralized questionList={questionList} />
    </Box>
  );
};
export default NFTSell;
const questionList = [
  {
    id: 1,
    question: 'FEE',
    content: `
      <p>Fee will apply when cashing out. </p>
      <ul>
      <li>Diamond 0.5%</li>
      <li>Platinum 0.9%</li>
      <li>Titan 1.3%</li>
      <li>Gold 1.7%</li>
      <li>Silver 2%</li>
      </ul>
      `,
  },
  {
    id: 2,
    question: 'FAQ when cashing out NFT',
    content: `<i>Where will my iNFT go when cashing out?</i>
    <p>The NFT will be burned and cannot be recovered. Therefore, consider carefully before cashing out, or you can trade your iNFT with others instead.</p>
    <i>How many time I can cash out each day?</i>
    <p>There’s a limit of how much you can cash out each day. Usually, you can cash out 1% of total pool cap each day. If the limit of the day is reached, you can try again the next day. </p>
    `,
  },
];
const useStyles = makeStyles((theme) => ({
  container: {},
  sellZone: {
    padding: 20,
    backgroundColor: '#1C1C1E',
    '&>p:first-child': {
      fontSize: 28,
      lineHeight: '36px',
      fontWeight: 600,
      marginBottom: 20,
    },
    marginBottom: 24,
  },
  wapperAsset: {
    '&>p:first-child': {
      color: '#BDBDBD',
      fontSize: 14,
      lineHeight: '17px',
    },
    '&>p:last-child': {
      color: '#3FADD5',
      fontSize: 14,
      lineHeight: '17px',
      marginLeft: 4,
    },
  },
  image: {
    height: 180,
    width: 300,
  },
  wapper: {
    marginLeft: 24,
  },
  inputField: {
    background: '#4B4B4B',
    width: 290,
    height: 44,
    marginBottom: 8,
  },
  confirm: {
    background:
      'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
    padding: '12px 46px !important',
    borderRadius: 30,
    height: 44,
    color: '#0B0B0E',
    fontSize: 16,
    fontWeight: 600,
    marginTop: 24,
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      padding: '8px 24px !important',
      fontSize: 14,
    },
  },
}));
