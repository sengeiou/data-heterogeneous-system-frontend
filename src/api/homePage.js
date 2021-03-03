import request from '@/utils/request'

// 查询API

// 获取该公司全部首页面板信息
export function getAllPanalOnHomePage() {
  return request({
    url: '/sys-remotedata/remoteDsPanal/getAllPanalOnHomePage',
    method: 'get'
  })
}

export function getAllPanal() {
  return request({
    url: '/sys-remotedata/remoteDsPanal/getAllPanal',
    method: 'get'
  })
}

export function deletePanal(params) {
  return request({
    url: '/sys-remotedata/remoteDsPanal/deletePanal',
    method: 'delete',
    params: params
  })
}


export function changeState(params) {
  return request({
    url: '/sys-remotedata/remoteDsPanal/changeState',
    method: 'put',
    params: params
  })
}


export function getSourceNum() {
  return request({
    url: '/sys-remotedata/getSourceNum',
    method: 'get'
  })
}

export function getUserNum() {
  return request({
    url: '/sys-remotedata/getUserNum',
    method: 'get'
  })
}

export function getLoginAtToday() {
  return request({
    url: '/sys-remotedata/getLoginAtToday',
    method: 'get'
  })
}

export function getSourceMap() {
  return request({
    url: '/sys-remotedata/getSourceMap',
    method: 'get'
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

//保存设计好的显示面板
export function created(data) {
  return request({
    url: '/sys-influx/influx/save/panal',
    method: 'post',
    data
  })
}


// 查询已经保存的某数据库的所有面板信息）根据数据库ID
export function fetched(params) {
  return request({
    url: '/sys-influx/influx/search/all/preserved',
    method: 'get',
    params: params
  })
}

export function fetchedAllDBByCid(params) {
  return request({
    url: '/sys-influx/influx/all/info',
    method: 'get',
    params: params
  })
}


// 根据数据源名字查询
// export function list(params) {
//   return request({
//     url: '/api/jobJdbcDatasource',
//     method: 'get',
//
//   })
// }



