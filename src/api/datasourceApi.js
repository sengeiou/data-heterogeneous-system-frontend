import request from '@/utils/request'

// 数据源 API

// 查看支持的所有数据源类型
export function remoteDatasourceType() {
  return request({
    url: '/sys-remotedata/remoteDatasourceType/getInfo',
    method: 'get',
  })
}

//部门操作
export function fetchDepartment() {
  return request({
    url: '/sys-remotedata/department/getAll',
    method: 'get'
  })
}

export function saveDepartment(params) {
  return request({
    url: '/sys-remotedata/department/singin',
    method: 'post',
    params: params
  })
}

export function updatedDepartment(data) {
  return request({
    url: '/sys-remotedata/department/update',
    method: 'put',
    data
  })
}

export function deleteDepartment(params) {
  return request({
    url: '/sys-remotedata/department/delete',
    method: 'delete',
    params: params
  })
}

// 查询所有
export function getDataSourceList(params) {
  return request({
    url: '/sys-remotedata/remoteDatasource/getInfo',
    method: 'get',
    params: params
  })
}




export function created(data) {
  return request({
    url: '/sys-remotedata/remoteDatasource/singIn',
    method: 'post',
    data
  })
}



export function updated(data) {
  return request({
    url: '/sys-remotedata/remoteDatasource/updateInfo',
    method: 'put',
    data
  })
}

export function deleted(data) {
  return request({
    url: '/sys-remotedata/remoteDatasource/deleteInfo',
    method: 'delete',
    params: data
  })
}

export function test(data) {
  return request({
    url: '/sys-remotedata/test',
    method: 'post',
    data
  })
}

// // 根据数据源名字查询
// export function list(params) {
//   return request({
//     url: '/api/jobJdbcDatasource',
//     method: 'get',
//
//   })
// }

// export function fetched(params) {
//   return request({
//     url: '/api/jobJdbcDatasource/' + params,
//     method: 'get'
//   })
// }

