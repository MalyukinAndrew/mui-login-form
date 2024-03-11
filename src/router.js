import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';
import App from './App';
import LoginForm from './components/AuthForms/LoginForm';
import CreatePasswordForm from './components/AuthForms/CreatePasswordForm';
import ForgotPasswordForm from './components/AuthForms/ForgotPasswordForm';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <App>
          <Outlet />
        </App>
      }
    >
      <Route path="/" element={<LoginForm />} />
      <Route path="reset-password" element={<CreatePasswordForm />} />
      <Route path="forgot-password" element={<ForgotPasswordForm />} />
    </Route>,
  ),
);
