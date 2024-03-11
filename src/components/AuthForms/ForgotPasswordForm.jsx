import React, { useState } from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';
import { classes } from './styles';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import InputOutlinedField from '../InputField/InputOutlinedField';
import { EmailValidation } from './ValidationSchemas';
import AuthService from '../../services/AuthService';

const ForgotPasswordForm = () => {
  const [responseStatus, setResponseStatus] = useState({
    success: false,
    error: false,
    message: '',
  });
  const navigate = useNavigate();

  const initialValues = {
    email: '',
  };

  const handleSubmit = async ({ email }) => {
    try {
      const res = await AuthService.forgotPassword(email);
      setResponseStatus((prev) => {
        return { ...prev, success: true, message: res.data.detail };
      });
    } catch (error) {
      setResponseStatus((prev) => {
        return {
          ...prev,
          error: true,
          message: error,
        };
      });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <Typography sx={classes.title} variant="h1" align={'center'}>
        Forgot Password?
      </Typography>

      {responseStatus.success && (
        <Alert severity={'success'}>{responseStatus.message}</Alert>
      )}

      {!responseStatus.success && (
        <Formik
          initialValues={initialValues}
          validationSchema={EmailValidation}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              as={InputOutlinedField}
              sx={classes.inputField}
              placeholder="Email"
              type="email"
              name="email"
            />

            {responseStatus.error && (
              <Alert sx={{ marginBottom: '16px' }} severity="error">
                {responseStatus.message}
              </Alert>
            )}

            <Box sx={classes.forgotButtons}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Send
              </Button>
              <Button
                variant="outlined"
                type="link"
                onClick={handleCancel}
                color="gray"
                fullWidth
              >
                Cancel
              </Button>
            </Box>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default ForgotPasswordForm;
