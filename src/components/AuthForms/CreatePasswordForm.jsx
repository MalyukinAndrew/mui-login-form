import React, { useState } from 'react';
import {
  Alert,
  Button,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material';
import { classes } from './styles';
import { Field, Form, Formik } from 'formik';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import InputOutlinedField from '../InputField/InputOutlinedField';
import { NewPasswordValidation } from './ValidationSchemas';
import AuthService from '../../services/AuthService';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CreatePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [createPasswordStatus, setCreatePasswordStatus] = useState({
    success: false,
    error: false,
    message: '',
  });
  const [query] = useSearchParams();
  const navigate = useNavigate();

  const initialValues = {
    password: '',
    password_confirm: '',
  };

  const navigateByResponse = () => {
    if (createPasswordStatus.fail) {
      navigate('/forgot-password');
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async ({ password, password_confirm }) => {
    try {
      const res = await AuthService.setNewPassword(
        password,
        password_confirm,
        query.get('token'),
        query.get('secret'),
      );
      setCreatePasswordStatus((prev) => {
        return { ...prev, success: true, message: res.data.detail };
      });
    } catch (error) {
      setCreatePasswordStatus((prev) => {
        return {
          ...prev,
          error: true,
          message: error,
        };
      });
    }
  };
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Typography sx={classes.title} variant="h1" align={'center'}>
        Create new Password?
      </Typography>

      {(createPasswordStatus.error || createPasswordStatus.success) && (
        <Alert
          sx={classes.alert}
          severity={createPasswordStatus.error ? 'error' : 'success'}
          action={
            createPasswordStatus.error ? (
              <Button onClick={navigateByResponse} color="inherit" size="small">
                Try again
              </Button>
            ) : (
              <Button onClick={navigateByResponse} color="inherit" size="small">
                Log in
              </Button>
            )
          }
        >
          {createPasswordStatus.message}
        </Alert>
      )}

      {!createPasswordStatus.success && !createPasswordStatus.fail && (
        <Formik
          initialValues={initialValues}
          validationSchema={NewPasswordValidation}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputLabel shrink={false} htmlFor={'password'}>
              <Typography>Password</Typography>
            </InputLabel>
            <Field
              as={InputOutlinedField}
              sx={classes.inputField}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    onClick={handleToggleShowPassword}
                    position="end"
                  >
                    {showPassword ? (
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </InputAdornment>
                ),
              }}
            />

            <InputLabel shrink={false} htmlFor={'confirmPassword'}>
              <Typography>Confirm password</Typography>
            </InputLabel>
            <Field
              as={InputOutlinedField}
              sx={classes.inputField}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              name="password_confirm"
              id="password_confirm"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    onClick={handleToggleShowPassword}
                    position="end"
                  >
                    {showPassword ? (
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </InputAdornment>
                ),
              }}
            />

            <Button variant="contained" type="submit" color="primary" fullWidth>
              Reset Password
            </Button>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default CreatePasswordForm;
