import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {},
    wapper: {
      '&>div>svg': {
        paddingBottom: 8,
        paddingLeft: 4,
      },
    },
    label: {
      fontSize: 14,
      color: theme.colors.grey1,
      lineHeight: '17px',
      marginBottom: 12,

      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
  });

export const useStyles = makeStyles(styles);
