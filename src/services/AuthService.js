import api from '../api/axios';

export default class AuthService {
  static async login(email, password) {
    return api.post('/login', { email, password });
  }

  static async forgotPassword(email, redirect_url) {
    return api.post('/password-reset', {
      email,
      redirect_url,
    });
  }

  static async setNewPassword(password, password_confirm, secret, token) {
    return api.post('/password-set', {
      password,
      password_confirm,
      secret,
      token,
    });
  }
}
