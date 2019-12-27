import axios from 'axios';
import User from '@/entities/User';

const getUser = context => axios.get(
  `${process.env.VUE_APP_LCB_API_URL}/users/me`,
  {
    headers: {
      'X-AUTH-TOKEN': sessionStorage.getItem('authenticationToken'),
    },
  },
)
  .then((response) => {
    const userData = response.data;
    sessionStorage.setItem('authenticationToken', userData.authenticationToken.value);

    const user = new User(
      userData.id,
      userData.name,
      userData.authenticationToken.value,
    );

    context.commit('USER_UPDATED', user);
  })
  .catch((error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    context.commit('USER_UPDATED', {});

    throw error;
  });

const signUp = (context, formData) => axios
  .post(`${process.env.VUE_APP_LCB_API_URL}/users`, formData)
  .then((response) => {
    const userData = response.data;
    sessionStorage.setItem('authenticationToken', userData.authenticationToken.value);

    const user = new User(
      userData.id,
      userData.name,
      userData.authenticationToken.value,
    );

    context.commit('USER_UPDATED', user);
  })
  .catch((error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    context.commit('USER_UPDATED', {});

    throw error;
  });

const signIn = (context, payload) => axios
  .get(`${process.env.VUE_APP_LCB_API_URL}/users/authenticate`, {
    auth: {
      username: payload.name,
      password: payload.password,
    },
  })
  .then((response) => {
    const userData = response.data;
    sessionStorage.setItem('authenticationToken', userData.authenticationToken.value);

    const user = new User(
      userData.id,
      userData.name,
      userData.authenticationToken.value,
    );

    context.commit('USER_UPDATED', user);
  })
  .catch((error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    context.commit('USER_UPDATED', {});

    throw error;
  });

const logout = (context) => {
  sessionStorage.setItem('authenticationToken', null);
  return context.commit('USER_UPDATED', {});
};

export default {
  getUser,
  signUp,
  signIn,
  logout,
};
