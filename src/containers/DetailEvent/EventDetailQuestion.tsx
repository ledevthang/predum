import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import ArrowDownIcon from 'icon/ArrowDownIcon';
import ArrowUpIcon from 'icon/ArrowUpIcon';

const EventDetailQuestion = ({ questionList }: any) => {
  const classes = useStyles();
  const [activeQuestion, setActiveQuestion] = useState<any>([]);
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography>Frequently asked questions</Typography>
      </Box>
      <Box className={classes.des}>
        {questionList.map((o: any, i: number) => {
          return (
            <Box
              key={i}
              style={{
                width: '100%',
                background: '#1C1C1E',
                borderBottom:
                  i == questionList.length - 1 ? 'unset' : '1px solid gray',
                padding: '24px 0px',
                cursor: 'pointer',
              }}
              onClick={() => {
                let temp = [...activeQuestion];
                let index = temp.indexOf(i);
                if (index > -1) {
                  temp.splice(index, 1);
                } else {
                  temp.push(i);
                }
                setActiveQuestion(temp);
              }}
            >
              <Box className={classes.wrapper}>
                <Typography className={classes.question}>
                  {questionList[i].question}
                </Typography>
                {activeQuestion.indexOf(i) != -1 ? (
                  <ArrowUpIcon />
                ) : (
                  <ArrowDownIcon />
                )}
              </Box>
              {activeQuestion.includes(i) && (
                <Box
                  className={classes.content}
                  dangerouslySetInnerHTML={{ __html: questionList[i].content }}
                ></Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default EventDetailQuestion;
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
  des: {
    width: '100%',
    background: '#1C1C1E',
    padding: '0px 16px',
  },
  question: {
    fontWeight: 600,
  },
  content: {
    color: '#BDBDBD',
    paddingTop: 8,
    '& p': {
      color: '#BDBDBD',
      marginBottom: 4,
    },
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& svg': {
      width: 16,
      height: 16,
    },
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(180deg, #0B0B0E 0%, #1C1C1E 100%)',
    padding: '21px 0px',
    '&>p': {
      fontSize: '28px',
      lineHeight: '34px',
      fontWeight: 600,
    },
  },
}));
