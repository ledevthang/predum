const overrides = {
  MuiButton: {
    root: {
      minWidth: 0,
      padding: '0px !important',
      textTransform: 'none' as any,
      '&:hover': {
        backgroundColor: 'none',
      },
    },
  },
};

export default overrides;
