import request from '@/utils/request'

// 查询API

// 执行SQL查询获取数据
export function getDataBySql(params) {
  return request({
    url: '/sys-influx/influx/search',
    method: 'get',
    params: params
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

//保存设计好的显示面板
export function deletePanal(params) {
  return request({
    url: '/sys-influx/influx/delete/panal/info',
    method: 'delete',
    params: params
  })
}

//保存设计好的显示面板
export function updatePanal(data) {
  return request({
    url: '/sys-influx/influx/update/panal/info',
    method: 'put',
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

