import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import CommonInput from 'components/common/CommonInput';
import CommonSelectInput from 'components/common/CommonSelectInput';
import CommonUploadFileInput from 'components/common/CommonUploadFileInput';
import LoadingButton from 'components/common/LoadingButton';
import { renderShortAddress } from 'helpers';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { getEventDetailAction } from 'store/actions/eventActions';
import { updatePredictionAfterReport } from 'store/actions/predictionActions';
import {
  createNewReport,
  createNewReportWithLink,
} from 'store/actions/reportActions';
import { getUserState } from 'store/selectors';

interface IProps {
  predictionId: number;
  eventId?: string;
}

const ReportDialog = ({ predictionId, eventId }: IProps) => {
  const classes = useStyles();

  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [uploadType, setUploadType] = useState('link');
  const [linkResult, setLinkResult] = useState<string>();

  const user = useSelector(getUserState);

  const clearFileResult = useCallback((e: React.ChangeEvent<any>) => {
    setFile(undefined);
    setFileName('');
  }, []);

  const handleChangeFileInput = useCallback((e: React.ChangeEvent<any>) => {
    let fileName = e.target.files[0].name;
    let idxDot = fileName.lastIndexOf('.') + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') {
      setFile(e.target.files[0]);
      setFileName(renderShortAddress(fileName, 10, 10));
    } else {
      alert('Only jpg/jpeg and png files are allowed!');
    }
  }, []);
  const typeUpload = useMemo(() => {
    return [
      { value: 'File', id: 'file' },
      { value: 'Link', id: 'link' },
    ];
  }, []);
  const handleChangeType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setUploadType(newValue);
      setFile(undefined);
      setLinkResult(undefined);
    },
    [],
  );
  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    setLinkResult(newValue);
  };

  const onCreateReport = useCallback(() => {
    if (!file && !linkResult) return;
    setIsLoading(true);
    const callback = () => {
      setIsLoading(false);
      dispatch(updatePredictionAfterReport(predictionId));
      dispatch(
        updateDialogStateAction({
          open: false,
          component: undefined,
        }),
      );
      eventId &&
        dispatch(
          getEventDetailAction(eventId, user.id ? `${user.id}` : undefined),
        );
    };
    if (file && uploadType == 'file') {
      dispatch(createNewReport(predictionId, file, 'file', callback));
    }
    if (linkResult && uploadType == 'link') {
      dispatch(
        createNewReportWithLink(predictionId, linkResult, 'link', callback),
      );
    }
  }, [dispatch, file, predictionId, user.id, uploadType, linkResult]);

  return (
    <Box className={classes.container}>
      <Box className={classes.normalText}>
        <Typography>Please provide the proof of the new result.</Typography>
        <Typography>
          We will investigate and if no decision is reached, we will refund the
          predict amount to all user
        </Typography>
      </Box>
      <Typography className={classes.boldText}>Proof of new result</Typography>
      <Box display="flex" marginBottom={4}>
        <Box className={classes.wapperChooseResult}>
          {uploadType == 'file' && (
            <CommonUploadFileInput
              name={fileName}
              required
              clearFileData={clearFileResult}
              onChange={handleChangeFileInput}
              className={classes.commonInput}
              isHasData={!!file}
            />
          )}
          {uploadType == 'link' && (
            <Box className={classes.wapperLink}>
              <CommonInput
                value={linkResult}
                onChange={handleChangeInputValue}
                className={classes.input}
              />
              {/* <Button className={classes.button}>Save</Button> */}
            </Box>
          )}
        </Box>
        <CommonSelectInput
          values={typeUpload}
          currentValue={uploadType}
          onChange={handleChangeType}
          className={classes.select}
        />
      </Box>

      <LoadingButton
        isLoading={isLoading}
        className={classes.btn}
        disabled={(!file && !linkResult) || isLoading}
        onClick={onCreateReport}
      >
        Submit
      </LoadingButton>
    </Box>
  );
};

export default ReportDialog;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '32px 64px',
    backgroundColor: '#5A5A5E',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '16px 32px',
    },
  },
  normalText: {
    '&>p': {
      fontSize: 14,
      textAlign: 'center',
    },
  },
  select: {
    '&>div:first-child': {
      background: '#616161',
    },
    marginLeft: 16,
    height: 44,
    width: 100,
  },
  wapperChooseResult: {
    display: 'flex',
    '&>div:first-child': {
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      [theme.breakpoints.down('md')]: {
        width: '340px',
      },
    },
  },
  wapperLink: {
    position: 'relative',
  },
  input: {
    width: 300,
    height: 44,
    backgroundColor: '#4B4B4B',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  boldText: {
    fontSize: 22,
    fontWeight: 600,
    marginTop: 24,
    marginBottom: 16,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 12,
      marginTop: 12,
      fontSize: 18,
    },
  },
  commonInput: {
    width: 360,
    height: 44,
    marginBottom: 24,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: 12,
    },
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: '#3FADD5',
    borderRadius: 8,
    color: '#0B0B0E',
    fontSize: 16,
    '&:hover': {
      backgroundColor: '#3FADD5',
    },
  },
}));
