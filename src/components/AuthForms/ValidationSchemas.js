import * as yup from 'yup';

const PasswordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
export const LoginValidation = yup.object().shape({
  email: yup
    .string()
    .email('Enter a Valid Email')
    .required('Email is Required'),

  password: yup.string().required('Enter Your Password'),
});

export const EmailValidation = yup.object().shape({
  email: yup
    .string()
    .email('Enter a Valid Email')
    .required('Email is Required'),
});

export const NewPasswordValidation = yup.object().shape({
  password: yup
    .string()
    .required('Enter Your Password')
    .matches(
      PasswordRegEx,
      'Password is not strong. Should be at least 8 characters long, contain at least one numeric, one uppercase letter and one lowercase letter',
    )
    .min(8, 'Password Should be minimum 8 character')
    .max(50, 'Too long'),

  password_confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Password does not matched')
    .required('Confirm Password is Required'),
});
