export default {
  method: 'post',
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data: {},
  timeout: 10000,
  withCredentials: false,
  responseType: 'json'
}
