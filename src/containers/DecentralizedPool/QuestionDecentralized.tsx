import { Box, CardMedia, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import AddIcon from 'icon/AddIcon';
import MinusIcon from 'icon/MinusIcon';
import React, { Fragment, useState } from 'react';
const QuestionDecentralized = ({ questionList }: { questionList: any }) => {
  const classes = useStyles();
  const [activeList, setActiveList] = useState<number | undefined>();
  const AddCircleIcon = ({ id }: { id: number }) => {
    return (
      <Box
        className={clsx('center-root', classes.addIcon)}
        onClick={() => handleClickItem('add', id)}
      >
        <AddIcon color="#BDBDBD" />
      </Box>
    );
  };
  const MinusCircleIcon = ({ id }: { id: number }) => {
    return (
      <Box
        className={clsx('center-root', classes.minusIcon, classes.addIcon)}
        onClick={() => handleClickItem('minus', id)}
      >
        <MinusIcon color="#BDBDBD" />
      </Box>
    );
  };
  const handleClickItem = (type: string, index: number) => {
    if (type == 'minus') {
      setActiveList(undefined);
    } else {
      setActiveList(index);
    }
  };
  return (
    <Box className={classes.container}>
      {questionList.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            <Box
              className={clsx(classes.wapperItem, {
                [classes.open]: activeList == item.id,
              })}
            >
              <Typography>{item.question}</Typography>
              {activeList == item.id ? (
                <MinusCircleIcon id={item.id} />
              ) : (
                <AddCircleIcon id={item.id} />
              )}
            </Box>
            <Box>
              {activeList == item.id && (
                <Box
                  className={clsx(classes.wapperContent, {
                    [classes.wapperContentHasNoBanner]: !item.banner,
                  })}
                >
                  <Typography
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></Typography>
                  {item.banner && (
                    <CardMedia image={item.banner} className={classes.banner} />
                  )}
                </Box>
              )}
            </Box>
          </Fragment>
        );
      })}
    </Box>
  );
};
export default QuestionDecentralized;
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    marginBottom: 32,
  },
  addIcon: {
    width: 24,
    height: 24,
    border: '1px solid #BDBDBD',
    borderRadius: '12px',
    cursor: 'pointer',
  },
  minusIcon: {
    '&>svg': {
      width: 14,
    },
  },
  banner: {
    width: 357,
    height: 200,
  },
  wapperContent: {
    background: '#1C1C1E',
    marginBottom: 16,
    padding: '24px 16px 32px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&>p': {
      maxWidth: 'calc(100% - 400px)',
      [theme.breakpoints.down('sm')]: {
        // padding: '0px 16px',
        maxWidth: '100%',
        marginBottom: 6,
      },
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  wapperContentHasNoBanner: {
    '&>p': {
      maxWidth: '100%',
    },
  },
  wapperItem: {
    width: '100%',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 16,
    background: '#1C1C1E',
    '&>p': {
      color: 'white',
      fontWeight: 600,
      fontSize: 20,
      lineHeight: '20px',
    },
  },
  open: {
    marginBottom: 'unset',
  },
}));
