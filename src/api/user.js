import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys-user/admin/login',
    method: 'post',
    // params: { ...data }
    data
  })
}
export function getInfo() {
  return request({
    url: '/sys-user/admin/info',
    method: 'get',
   // params: { token }
  })
}
export function logout() {
  return request({
    url: '/sys-user/admin/logout',
    method: 'post'
  })
}
export function register(data) {
  return request({
    url: '/sys-user/admin/register',
    method: 'post',
    data
  })
}
export function code() {
  return request({
    url: '/sys-user/admin/code',
    method: 'post',
    // params: { ...data }
  })
}

export function companySignIn(data) {
  return request({
    url: '/sys-user/company/register',
    method: 'post',
    data
  })
}














