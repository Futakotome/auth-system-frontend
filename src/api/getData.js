import fetch from '@/config/fetch'

const authUrl = process.env.VUE_APP_AUTH_URL

export const login = data => fetch(authUrl + '/login', data, 'POST')
export const getAdminInfo = () => fetch('/admin/info')
