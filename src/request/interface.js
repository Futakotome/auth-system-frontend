import axios from './api'

export const query = params => {
  return axios({
    url: '/query',
    method: 'get',
    params
  })
}
export const mock = params => {
  return axios({
    url: '/mock',
    method: 'get',
    params
  })
}
export const upload = data => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}
export default {
  query,
  mock,
  upload
}
