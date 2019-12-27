import axios from 'axios';

const sendMessage = (context, data) => axios
  .post(`${process.env.VUE_APP_LCB_API_URL}/chat/messages`, data,
    {
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('authenticationToken'),
      },
    })
  .then(() => {
  })
  .catch((error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }

    throw error;
  });

export default {
  sendMessage,
};
