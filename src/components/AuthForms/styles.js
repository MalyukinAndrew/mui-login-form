export const classes = {
  title: {
    fontSize: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '40px',
  },

  divider: {
    margin: '30px 0',
    fontSize: '12px',
  },

  inputField: {
    marginBottom: '15px',
    svg: {
      cursor: 'pointer',
    },
    '&:not(:last-of-type)': {
      marginBottom: '25px',
    },
  },

  authButtons: {
    display: 'flex',
    gap: '16px',
  },

  forgotButtons: {
    button: {
      '&:first-child': {
        marginBottom: '20px',
      },
    },
  },

  forgotLink: {
    textAlign: 'right',
    marginBottom: '30px',
    fontSize: '14px',
    '& .MuiLink-root': {
      textDecoration: 'none',
    },
  },

  isNewText: {
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '20px',
    '& .MuiLink-root': {
      textDecoration: 'none',
    },
  },

  alert: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiButtonBase-root': {
      padding: '4px 5px',
      minWidth: '70px',
    },
  },
};
