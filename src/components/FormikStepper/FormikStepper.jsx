import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';

export const FormikStep = ({ children }) => {
  return <>{children}</>;
};

export const FormikStepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((prev) => prev + 1);
        }
      }}
    >
      <Form>{currentChild}</Form>
    </Formik>
  );
};

FormikStepper.propTypes = {
  children: PropTypes.array,
  onSubmit: PropTypes.func,
};
FormikStep.propTypes = {
  children: PropTypes.array,
};
