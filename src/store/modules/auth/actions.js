import router from '@/router';
export default {
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBFqZ9jT-_44q8sLps8OPIAlbMbuf58SRk';
    if (mode === 'register') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBFqZ9jT-_44q8sLps8OPIAlbMbuf58SRk';
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      let errorDescription;
      if (
        responseData.error.message === 'EMAIL_NOT_FOUND' ||
        responseData.error.message === 'INVALID_PASSWORD'
      ) {
        errorDescription = 'Incorrect username or password.';
      } else if (responseData.error.message === 'EMAIL_EXISTS') {
        errorDescription = 'Email is already registered.';
      } else {
        errorDescription = 'Failed to authenticate.';
      }
      const error = new Error(
        errorDescription
      );
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    const logoutTimerId = setTimeout(() => {
      context.dispatch('logout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
    context.commit('setLogoutTimerId', logoutTimerId);
  },
  async login(context, userData) {
    return context.dispatch('auth', {
      ...userData,
      mode: 'login',
    });
  },
  async register(context, userData) {
    return context.dispatch('auth', {
      ...userData,
      mode: 'register',
    });
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(context.getters.getLogoutTimerId);
    router.replace('/mentors');

    context.commit('setUser', {
      token: null,
      userId: null,
    });
    context.commit('setLogoutTimerId', null);
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime;
    if (expiresIn < 0) {
      return;
    }

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
      });
    }
  },
};
