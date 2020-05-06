import fetch from '@/config/fetch'

export const login = data => fetch('/admin/login', data, 'POST')
export const getAdminInfo = () => fetch('/admin/info')
