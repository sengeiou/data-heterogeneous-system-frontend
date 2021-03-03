import request from '@/utils/request'

// 查询API
export function getPredicts() {
  return request({
    url: '/sys-influx/remoteStatus/getAllPredict',
    method: 'get'
  })
}

export function deletePredict(params) {
  return request({
    url: '/sys-influx/remoteStatus/deletePredict',
    method: 'delete',
    params: params
  })
}

export function addPredict(data) {
  return request({
    url: '/sys-influx/remoteStatus/addPredict',
    method: 'post',
    data
  })
}

export function updatePredict(data) {
  return request({
    url: '/sys-influx/remoteStatus/updatePredict',
    method: 'put',
    data
  })
}
