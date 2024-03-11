import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Typography,
  InputAdornment,
  Link,
  Alert,
} from '@mui/material';
import { classes } from './styles';
import { Field } from 'formik';
import { ReactComponent as GoogleLogo } from '../../assets/google-logo.svg';
import { ReactComponent as GithubLogo } from '../../assets/github-logo.svg';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import { EmailValidation, LoginValidation } from './ValidationSchemas';
import { FormikStepper, FormikStep } from '../FormikStepper/FormikStepper';
import InputOutlinedField from '../InputField/InputOutlinedField';
import AuthService from '../../services/AuthService';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authStatus, setAuthStatus] = useState({
    success: false,
    error: false,
    message: '',
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async ({ email, password }) => {
    try {
      const res = await AuthService.login(email, password);
      setAuthStatus((prev) => {
        return { ...prev, success: true, message: res.data.detail };
      });
    } catch (error) {
      setAuthStatus((prev) => {
        return { ...prev, error: true, message: error };
      });
    }
  };
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Typography sx={classes.title} variant="h1" align={'center'}>
        Log in to your account
      </Typography>

      {authStatus.success && (
        <Alert severity="success">{authStatus.message}</Alert>
      )}

      {!authStatus.success && (
        <>
          <Box sx={classes.authButtons}>
            <Button color="gray" fullWidth variant="outlined">
              <GoogleLogo />
              Google
            </Button>
            <Button color="gray" fullWidth variant="outlined">
              <GithubLogo />
              Github
            </Button>
          </Box>
          <Divider sx={classes.divider}>OR</Divider>
          <FormikStepper initialValues={initialValues} onSubmit={handleSubmit}>
            <FormikStep validationSchema={EmailValidation}>
              <Field
                as={InputOutlinedField}
                sx={classes.inputField}
                placeholder="Email"
                type="email"
                name="email"
              />

              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Log in to Qencode
              </Button>
            </FormikStep>

            <FormikStep validationSchema={LoginValidation}>
              <Field
                as={InputOutlinedField}
                sx={classes.inputField}
                fullWidth
                placeholder="Email"
                type="email"
                name="email"
              />

              <Field
                as={InputOutlinedField}
                sx={classes.inputField}
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
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

              {authStatus.error && (
                <Alert sx={{ marginBottom: '10px' }} severity="error">
                  {authStatus.message}
                </Alert>
              )}

              <Box sx={classes.forgotLink}>
                <Link href={'/forgot-password'}>Forgot password?</Link>
              </Box>

              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Log in to Qencode
              </Button>
            </FormikStep>
          </FormikStepper>

          <Typography sx={classes.isNewText}>
            Is your company new to Qencode? <Link href={'/'}>Sign up</Link>
          </Typography>
        </>
      )}
    </>
  );
};

export default LoginForm;
