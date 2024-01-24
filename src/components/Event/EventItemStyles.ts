import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: 20,
      display: 'flex',
      width: '100%',
      backgroundColor: '#1C1C1E',
      [theme.breakpoints.down('sm')]: {
        padding: 16,
      },
    },
    containerHome: {
      position: 'relative',
      marginBottom: 20,
      // height: 280,
      // [theme.breakpoints.down('sm')]: {
      //   height: 278,
      // },
    },
    img: {
      height: 240,
      width: 240,
      // marginRight: 30,
      cursor: 'pointer',
      [theme.breakpoints.down('md')]: {
        marginRight: 20,
      },
      [theme.breakpoints.down('sm')]: {
        width: 104,
        height: 104,
        marginRight: 0,
      },
    },
    wrapper: {
      flexGrow: 1,
      marginLeft: 30,
      width: 'calc(100% - 260px)',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        width: '100%',
      },
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      '&>p': {
        lineHeight: '16px',
        color: '#BDBDBD',
        fontSize: 14,
        '& svg': {
          marginLeft: -2,
          marginRight: 6,
        },
      },
      '&>p:first-child': {
        cursor: 'pointer',
      },
      [theme.breakpoints.down('sm')]: {
        '&>p': {
          color: '#BDBDBD',
          fontSize: 13,
          marginBottom: 6,
          lineHeight: '16px',
          '& svg': {
            marginLeft: -2,
            marginRight: '2px !important',
            width: 16,
            height: 16,
          },
        },
      },
    },
    headerHome: {
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    category: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 4,
      '& svg': {
        marginRight: 6,
        width: 14,
        height: 14,
      },
      '& p': {
        fontSize: 14,
        color: '#BDBDBD',
        [theme.breakpoints.down('sm')]: {
          fontSize: 13,
        },
      },
    },
    wrapperButton: {
      '& button:first-child': {
        borderRadius: 14,
        width: 76,
        height: 26,
        backgroundColor: '#C6EBFC',
        fontSize: 14,
        color: '#1976D2',
        marginRight: 12,
        textTransform: 'none',
      },
      '& button:last-child': {
        borderRadius: 14,
        width: 76,
        height: 26,
        backgroundColor: '#FEF3D9',
        fontSize: 14,
        color: '#212121',
        textTransform: 'none',
      },
    },
    description: {
      cursor: 'pointer',
      marginTop: 16,
      '&>p:first-child': {
        fontSize: 16,
        fontWeight: 600,
      },
      '&>p:last-child': {
        fontSize: 14,
        color: '#BDBDBD',
      },
      [theme.breakpoints.down('md')]: {
        marginTop: 12,
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 8,
        '&>p:first-child': {
          fontSize: 14,
          fontWeight: 600,
          lineHeight: '18px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: 220,
        },
        '&>p:last-child': {
          marginTop: 4,
          fontSize: 13,
          color: '#BDBDBD',
          lineHeight: '16px',
        },
      },
    },
    multipleChoices: {
      marginTop: 16,
      width: '100%',
      position: 'relative',
      '&>p': {
        fontSize: 14,
        color: '#BDBDBD',
        lineHeight: '16px',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
          fontSize: 13,
        },
      },
      [theme.breakpoints.down('md')]: {
        marginTop: 12,
      },
    },
    wrapperChoice: {
      display: 'flex',
      width: '100%',
      '&>div:not(:last-child)': {
        marginRight: 10,
      },
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    wrapperChoiceHome: {
      overflowX: 'auto',
    },
    wrapperChoiceDetail: {
      flexWrap: 'wrap',
    },
    choice: {
      marginTop: 12,
      backgroundColor: theme.colors.black2,
      width: 96,
      boxSizing: 'content-box',
      height: 54,
      cursor: 'pointer',
      flexDirection: 'column',
      padding: '0px 16px',
      '& p': {
        width: 'inherit',
        fontSize: 14,
        textAlign: 'center',
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 8,
      },
    },
    choiceOverUnderUvU: {
      marginTop: 12,
      backgroundColor: theme.colors.black2,
      width: 115,
      height: 54,
      cursor: 'pointer',
      '& p': {
        fontSize: 14,
        marginLeft: 8,
        textAlign: 'center',
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 8,
      },
    },
    deadline: {
      marginTop: 20,
      display: 'flex',
      flexFlow: 'row wrap',
      [theme.breakpoints.down('md')]: {
        marginTop: 12,
      },
    },
    deadlineItem: {
      display: 'flex',
      marginBottom: 8,
      marginRight: 24,
      '& p': {
        fontSize: 14,
        lineHeight: '17px',
        [theme.breakpoints.down('sm')]: {
          fontSize: 13,
        },
      },
      '&>p:first-child': {
        color: '#BDBDBD',
        marginRight: 2,
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: 12,
      },
    },
    totalPool: {
      display: 'flex',
      marginBottom: 8,
      marginRight: 24,
      '& p': {
        fontSize: 14,
        lineHeight: '17px',
        [theme.breakpoints.down('sm')]: {
          fontSize: 13,
        },
      },
      '&>p:first-child': {
        color: '#BDBDBD',
        marginRight: 2,
      },
    },
    priceText: {
      fontWeight: 600,
      color: `${theme.colors.yellow1} !important`,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    wrapperMobile: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
      },
    },
    wrapper2: {
      [theme.breakpoints.down('sm')]: {
        marginLeft: 12,
      },
    },
    wrapper2NotHome: {
      width: '100%',
    },
    handicap: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: '10px !important',
      '&>p': {
        whiteSpace: 'nowrap',
        fontSize: 18,
        fontWeight: '600',
        minWidth: 48,
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
          fontSize: 16,
        },
      },
    },
    overUnderName: {
      flexGrow: 1,
      marginLeft: 16,
    },
    chainLink: {
      fontSize: '14px !important',
      display: 'flex',
      alignItems: 'center',
      marginTop: 4,
      height: 20,
      '& svg': {
        width: 16,
        height: 16,
        marginRight: 4,
      },
    },
    overUnderValue: {
      cursor: 'pointer',
      width: '5%',
      margin: '0px 4%',
      display: 'flex',
      justifyContent: 'center',
    },
    wrapperOverUnder: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: 12,
      '&>div': {
        height: 44,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        '&>p:not(:first-child)': {
          fontSize: 14,
          color: '#BDBDBD',
        },
      },
      '&>div:first-child': {
        backgroundColor: '#4B4B4B',
      },
      '&>div:not(:first-child)': {
        '&>p:not(:first-child)': {
          fontSize: 14,
          fontWeight: 600,
          color: 'white',
        },
      },
    },
    headerEvent: {
      backgroundColor: '#2C2C2F',
      width: '100%',
      display: 'flex',
      height: 40,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0px 20px',
      '&>p': {
        fontSize: 16,
        color: '#BDBDBD',
        [theme.breakpoints.down('sm')]: {
          fontSize: 14,
        },
      },
    },
    wrapperDateTime: {
      display: 'flex',
      marginTop: 12,
    },
    resetCursor: {
      cursor: 'default !important',
    },
    statusPro: {
      marginTop: 8,
      marginLeft: 'unset !important',
    },
    wrapperLiquidityMobile: {
      marginLeft: 4,
      '&>p': {
        color: '#3FADD5',
        fontWeight: 600,
        fontSize: 13,
      },
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
    wrapperChoiceScroll: {
      '&> .react-horizontal-scrolling-menu--item:not(:last-child)': {
        marginRight: 10,
      },
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    actived: {
      color: '#3FADD5 !important',
      border: '1px solid #3FADD5',
      '& p': {
        color: '#3FADD5 !important',
      },
      '& svg': {
        color: '#3FADD5 !important',
      },
    },
    activedOverUnder: {
      color: '#3FADD5 !important',
    },
    disableOption: {
      cursor: 'default !important',
      '&>p': {
        color: '#666666',
      },
      '&>div>p': {
        color: '#666666',
      },
      '&>div>div': {
        '&>svg': {
          color: '#666666',
        },
        '&>p': {
          color: '#666666',
        },
      },
    },
    disableOptionImage: {
      backgroundBlendMode: 'luminosity',
    },
    disableOptionOverUnder: {
      cursor: 'unset',
      color: '#666666',
    },
    wrapperMultipleChoice: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      '&>div:not(:last-child)': {
        marginRight: 16,
      },
      [theme.breakpoints.down('sm')]: {
        width: `${window.innerWidth - 32}px`,
      },
    },
    choiceV2: {
      width: 128,
      height: 100,
      borderRadius: 2,
      padding: 8,
      display: 'flex',
      flexDirection: 'column',
      marginTop: 12,
      position: 'relative',
      cursor: 'pointer',
    },
    optionOddV2: {
      width: 24,
      height: 24,
      background: '#1C1C1E',
      borderRadius: 2,
      fontSize: 14,
      fontWeight: 600,
      marginRight: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionPercentage: {
      display: 'flex',
      padding: 4,
      height: 24,
      alignItems: 'center',
      borderRadius: 2,
      backgroundColor: '#1976D2',
      '& svg': {
        marginRight: 3,
        marginTop: 2,
        width: 14,
        height: 14,
      },
      '& p': {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: '17px',
      },
    },
    wrapperOddAndPercentage: {
      position: 'absolute',
      display: 'flex',
      top: 8,
      left: 8,
    },
    tooltip: {
      maxWidth: '100%',
    },
    participant: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 24,
      '& svg': {
        width: 24,
        height: 24,
        marginRight: 6,
      },
      color: '#BDBDBD',
      fontSize: 14,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 12,
      },
    },
    wrapperParticipantAndStatus: {
      display: 'flex',
    },
    predicted: {
      borderRadius: 20,
      marginLeft: 24,
      fontSize: 14,
      fontWeight: 600,
      width: 80,
      height: 22,
      background: '#183755',
      color: '#1976D2 !important',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        width: 86,
        height: 24,
        marginLeft: 12,
      },
    },
    finished: {
      marginLeft: 24,
      borderRadius: 20,
      fontSize: 14,
      fontWeight: 600,
      width: 80,
      height: 22,
      background: '#4B4B4B',
      color: '#BDBDBD !important',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        width: 80,
        height: 24,
        marginLeft: 12,
      },
    },
    pending: {
      marginLeft: 24,
      width: 80,
      height: '22px',
      background: '#94762C',
      borderRadius: '20px',
      '& p': {
        textAlign: 'center',
        paddingTop: 4,
        textTransform: 'uppercase',
        color: '#FBC02D',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '13px',
        lineHeight: '16px',
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: 20,
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: 6,
        fontSize: '12px',
        width: 82,
      },
    },
    invalid: {
      marginLeft: 24,
      borderRadius: 20,
      fontSize: 14,
      fontWeight: 600,
      width: 80,
      height: 22,
      background: '#5A2423',
      color: '#E53935 !important',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        width: 94,
        height: 24,
        marginLeft: 12,
      },
    },
    wrapperAddressAndStatus: {
      display: 'flex',
      '&>p:first-child': {
        // cursor: 'pointer',
        marginRight: 4,
      },
    },
    wrapper3: {
      [theme.breakpoints.down('sm')]: {
        marginBottom: 12,
      },
    },
    underline: {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    optionOnlyText: {
      width: 128,
      height: 54,
      padding: 8,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#111111',
      marginTop: 12,
      cursor: 'pointer',
      '& p': {
        fontWeight: 600,
        lineHeight: '17px',
      },
      [theme.breakpoints.down('md')]: {
        width: 116,
      },
      [theme.breakpoints.down('sm')]: {
        width: 97,
      },
    },
    optionOnlyTextLight: {
      width: 128,
      height: 54,
      padding: 8,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      marginTop: 12,
      cursor: 'pointer',
      border: '1px solid #1C1C1E',
      '& p': {
        fontWeight: 600,
        lineHeight: '17px',
        color: '#1C1C1E',
      },
      [theme.breakpoints.down('md')]: {
        width: 116,
      },
      [theme.breakpoints.down('sm')]: {
        width: 97,
      },
    },
    statusDetail: {
      padding: 16,
    },
    wrapOnlyText2: {
      display: 'flex',
      height: 17,
      alignItems: 'center',
      marginTop: 3,
      '& svg': {
        width: 14,
        height: 14,
        marginRight: 3,
        marginTop: 2,
      },
      '& p': {
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: 'pre',
        margin: 0,
      },
      '&>div': {
        '&>p': {
          color: '#BDBDBD',
        },
      },
    },
    wrapOnlyText2Light: {
      display: 'flex',
      height: 17,
      alignItems: 'center',
      marginTop: 3,
      '& svg': {
        width: 14,
        height: 14,
        marginRight: 3,
        marginTop: 2,
        color: '#1c1c1e',
      },
      '& p': {
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: 'pre',
        margin: 0,
      },
      '&>div': {
        '&>p': {
          color: '#1c1c1e',
        },
      },
    },
    wapperCountDown: {
      position: 'relative',
    },
    countDown: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: 240,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      background: 'rgba(0, 0, 0, 0.6)',
      '&>p': {
        color: '#FFFFFF',
        fontSize: '14px',
        lineHeight: '17px',
      },
      '&>p:first-child': {
        color: '#FFFFFF',
        fontSize: '32px',
        lineHeight: '38px',
        fontWeight: 600,
        marginBottom: 4,
      },
      [theme.breakpoints.down('sm')]: {
        width: 104,
        height: 104,
        top: 76,
        '&>p:first-child': {
          fontSize: '28px',
          lineHeight: '30px',
        },
      },
    },
    countDownPro: {
      [theme.breakpoints.down('sm')]: {
        top: 52,
      },
    },
    views: {
      display: 'flex',
      alignItems: 'center',
      color: '#BDBDBD',
      marginLeft: 24,
      '& svg': {
        marginRight: 6,
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: 12,
      },
    },
    description2: {
      height: 21,
    },
    wrapperOptionName: {
      width: 'calc(100% + 16px)',
      marginLeft: -8,
      paddingLeft: 8,
      background: 'rgba(0, 0, 0, 0.6)',
      marginBottom: -8,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      '& p': {
        fontSize: 14,
        height: 'fit-content',
      },
    },
  });

export const useStyles = makeStyles(styles);
