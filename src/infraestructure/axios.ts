import axios from 'axios'
import toast from 'react-hot-toast';

const instance = axios.create();

instance.interceptors.response.use(response => response, (error) => {
  const response = error.response

  if (response?.status === 400 || response?.status === 401) {
    toast.error(error.response.data.title, { duration: 5000 });
  }

  return Promise.reject(error)
})

export default instance