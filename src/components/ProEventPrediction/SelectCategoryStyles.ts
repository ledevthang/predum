import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      width: 460,
      [theme.breakpoints.down('sm')]: {
        width: 343,
      },
    },
    title: {
      fontSize: 16,
      color: '#BDBDBD',
      marginTop: 48,
      marginBottom: 12,
      [theme.breakpoints.down('md')]: {
        marginTop: 36,
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 24,
      },
    },
    category: {
      marginBottom: 24,
    },
    categoryName: {
      fontSize: 14,
      fontWeight: 500,
      backgroundColor: '#4B4B4B',
      height: 40,
    },
    imageIcon: {
      height: 36,
      width: 36,
    },
    wrapperSubcategory: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      gap: '24px 20px',
      marginTop: 16,
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '16px 20px',
      },
    },
    wrapperSubcategoryItem: {
      width: 100,
      height: 95,
      borderRadius: 2,
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
    },
    subName: {
      fontSize: 16,
      color: '#BDBDBD',
    },
    selected: {
      border: '1px #3FADD5 solid',
    },
    disabled: {
      opacity: 0.4,
    },
  });

export const useStyles = makeStyles(styles);
