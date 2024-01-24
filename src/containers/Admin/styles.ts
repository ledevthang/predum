import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: 64,
    },
    headline: {
      fontWeight: 600,
      fontSize: 24,
      width: '100%',
      textAlign: 'center',
      marginBottom: 24,
    },
    main: {
      backgroundColor: '#FFFFFF',
      '& div': {
        borderRadius: 0,
        color: '#111111',
      },
    },
    table: {
      minWidth: 650,
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
      '& th': {
        border: '1px solid rgba(224, 224, 224, 1)',
        padding: '8px 16px',
        color: '#111111',
      },
      '& td': {
        border: '1px solid rgba(224, 224, 224, 1)',
        padding: '8px 16px',
        color: '#111111',
      },
      '& thead th': {
        padding: 16,
      },
    },
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
    },
    selectDropdown: {
      backgroundColor: '#FFFFFF',
      '& li': {
        color: '#111111',
      },
    },
    evidenceImg: {
      width: '45%',
      aspectRatio: '1',
    },
    evidenceOfUser: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      alignItems: 'center',
    },
    unblockItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&>button': {
        marginLeft: 8,
      },
    },
    unblockBtn: {
      color: '#111111',
      backgroundColor: '#3FADD5',
      padding: '4px 8px !important',
    },
    block: {
      color: '#111111',
      backgroundColor: '#E53935',
      padding: '4px 8px !important',
    },
    input: {
      width: '100%',
      marginTop: 8,
      height: 44,
      backgroundColor: '#4B4B4B',
      marginBottom: 16,
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
    searchLabel: {
      fontSize: 16,
      fontWeight: 500,
    },
    action: {
      '&>button:nth-child(2)': {
        marginLeft: 8,
      },
    },
    statistics: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 64,
    },
    viewMore: {
      color: '#111111',
    },
    linkReport: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'block',
      color: '#111111',
      width: 150,
    },
    wrapperChart: {
      marginTop: 32,
      display: 'flex',
      justifyContent: 'space-between',
    },
    category: {
      width: '100%',
      borderTop: '1px solid rgba(224, 224, 224, 1)',
      borderRadius: 2,
    },
    classNameItem: {
      height: 64,
      width: '360px !important',
      fontSize: '24px !important',
      border: '1px solid rgba(224, 224, 224, 1)',
      borderTop: 'none',
      borderRadius: 2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export const useStyles = makeStyles(styles);
