import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      paddingBottom: '108px !important',
      [theme.breakpoints.down('md')]: {
        paddingBottom: '65px !important',
      },
      [theme.breakpoints.down('sm')]: {
        paddingBottom: '0px !important',
      },
    },
    kindOfEventContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    koeMain: {
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      '&>div:nth-child(3)': {
        [theme.breakpoints.up('md')]: {
          marginLeft: 20,
          marginRight: 20,
        },
        [theme.breakpoints.down('sm')]: {
          marginTop: 20,
          marginBottom: 20,
        },
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    title: {
      fontSize: 32,
      fontWeight: 600,
      marginTop: 32,
      marginBottom: 42,
      width: 'fit-content',
      [theme.breakpoints.down('md')]: {
        fontSize: 24,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 24,
      },
    },
    shouldFillBackground: {
      backgroundColor: '#1C1C1E',
    },
    confirm: {
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
      padding: '12px 26px !important',
      borderRadius: 30,
      color: '#0B0B0E',
      fontSize: 16,
      fontWeight: 600,
      marginTop: 36,
      textTransform: 'uppercase',
      width: 'fit-content',
      [theme.breakpoints.down('sm')]: {
        padding: '8px 24px !important',
        fontSize: 14,
      },
    },
    back: {
      fontSize: 16,
      marginTop: 24,
      color: '#BDBDBD',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    container1: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 80,
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        padding: '0px 16px 16px 16px',
      },
    },
    step: {
      width: 430,
      paddingTop: 0,
      [theme.breakpoints.down('md')]: {
        width: 324,
      },
      [theme.breakpoints.down('sm')]: {
        width: 204,
      },
    },
    stepAffiliate: {
      width: 176,
      paddingTop: 0,
      [theme.breakpoints.down('md')]: {
        width: 132,
      },
      [theme.breakpoints.down('sm')]: {
        width: 84,
      },
    },
    hostAHotEvent: {
      fontSize: 20,
      fontWeight: 500,
      marginBottom: 12,
      marginTop: 12,
    },
    eventInfoContainer: {
      width: '100%',
      padding: 20,
    },
    commonInput: {
      height: '44px',
      width: '100%',
      marginBottom: '24px',
      backgroundColor: '#4B4B4B',
      '& .Mui-disabled': {
        color: '#FFFFFF',
        opacity: 0.7,
      },
    },
    inputWapper: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 24,
      '&>div': {
        width: '50%',
      },
    },
    wrapper: {
      position: 'relative',
      '&>button': {
        width: 'fit-content',
        '& svg': {
          width: 36,
          height: 36,
        },
      },
      '&>button:first-child': {
        left: -40,
      },
      '&>button:last-child': {
        right: -40,
      },
    },
    wrapperEventScroll: {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    input: {
      height: 44,
      marginRight: 12,
      width: 360,
      '& input': {
        color: 'white',
        backgroundColor: '#4B4B4B',
      },
      [theme.breakpoints.down('md')]: {},
      [theme.breakpoints.down('sm')]: {
        height: 36,
        width: '100%',
      },
    },
    browseEvent: {
      fontSize: 20,
      fontWeight: 500,
      marginBottom: 12,
      marginTop: 36,
    },
    btnSearch: {
      width: 92,
      height: 44,
      backgroundColor: '#FFFFFF',
      textTransform: 'none',
      fontSize: 14,
      color: '#212121',
      borderRadius: 2,
      '& svg': {
        width: 16,
        height: 16,
        marginRight: 8,
      },
      [theme.breakpoints.down('sm')]: {
        height: 36,
      },
    },
    parentLeague: {
      width: 140,
      borderRadius: 2,
      marginRight: 12,
    },
    wrapperLeagues: {
      overflowX: 'scroll',
      overflowY: 'hidden',
      width: '100%',
      display: 'flex',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    wrapperSubcategoryItem: {
      width: 100,
      height: 95,
      borderRadius: 2,
      marginRight: 12,
      '&>span': {
        display: 'flex',
        flexDirection: 'column',
        '&>svg': {
          height: 36,
          width: 36,
        },
        '&>p': {
          marginTop: 4,
        },
      },
      border: '1px solid #5A5A5E',
      marginBottom: 12,
      [theme.breakpoints.down('sm')]: {
        height: 120,
        marginRight: 0,
      },
    },
    wrapperSubcategoryItemUvP: {
      height: '52px !important',
      '&>span': {
        display: 'flex',
        flexDirection: 'row',
        '&>svg': {
          height: 20,
          width: 20,
          marginRight: 6,
        },
        '&>p': {
          marginTop: 4,
        },
      },
    },
    wrapperLeagueItemUvP: {
      height: '64px !important',
      width: '140px !important',
      '&>span': {
        display: 'flex',
        flexDirection: 'row',
        '&>svg': {
          height: 24,
          width: 24,
        },
        '&>p': {
          marginTop: 4,
        },
      },
    },
    imageIcon: {
      height: 36,
      width: 36,
    },
    selected: {
      border: '1px #3FADD5 solid !important',
    },
    disabled: {
      color: 'white !important',
      opacity: 0.4,
    },
    return: {
      marginTop: 24,
      alignItems: 'center',
    },
    competitionLogo: {
      height: 36,
      width: 36,
      backgroundSize: 'contain',
      marginRight: 4,
    },
    pagination: {
      marginTop: 48,
      '& .MuiPaginationItem-outlined': {
        border: '1px solid #616161',
      },
      '& .MuiPaginationItem-page.Mui-selected': {
        border: '1px solid #3FADD5',
      },
    },
    mobileHotEvent: {
      height: 1000,
      overflowY: 'scroll',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    bannerEvent: {
      width: '100%',
      height: 240,
      marginTop: 48,
      marginBottom: 36,
      objectFit: 'cover',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    clearBtn: {
      position: 'absolute',
      right: 20,
      top: 16,
      [theme.breakpoints.down('sm')]: {
        right: 12,
        top: 16,
      },
      '& svg': {
        width: 14,
        height: 14,
        [theme.breakpoints.down('sm')]: {
          height: 12,
          width: 12,
        },
      },
    },
    wrapper3: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-between',
        '&>div:first-child': {
          width: 'calc(100% - 104px)',
        },
      },
    },
    wrapperCategoryPro: {
      display: 'flex',
      flexWrap: 'nowrap',
      width: '100%',
      overflowX: 'scroll',
      overflowY: 'hidden',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    parentCategory: {
      width: 100,
      marginRight: 12,
    },
  });

export const useStyles = makeStyles(styles);
