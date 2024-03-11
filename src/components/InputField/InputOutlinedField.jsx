import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const InputOutlinedField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      fullWidth
      label={label}
      variant={'outlined'}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

InputOutlinedField.propTypes = {
  label: PropTypes.string,
};

export default InputOutlinedField;
