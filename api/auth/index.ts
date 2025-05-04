import HTTP from '../http';

export interface TelegramAuthParams {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

const login = (user: TelegramAuthParams): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(user);
      // HTTP.post('/api/auth/telegram', user).then(response => {
      //   resolve(response);
      // }).catch(error => {
      //   reject(error);
      // });
    } catch (error) {
      reject(error);
    }
  })
}

const auth = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const token = sessionStorage.getItem('auth_token');
      resolve(token ? JSON.parse(token) : null);
      // HTTP.get('/api/auth/check').then(response => {
      //   resolve(response);
      // }).catch(error => {
      //   reject(error);
      // });
    } catch (error) {
      reject(error);
    }
  })
}

const signOut = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      sessionStorage.removeItem('auth_token');
      resolve(true)
      // HTTP.get('/api/auth/logout').then(response => {
      //   resolve(response);
      // }).catch(error => {
      //   reject(error);
      // });
    } catch (error) {
      reject(error);
    }
  })
}

export {
  login,
  auth,
  signOut
}
