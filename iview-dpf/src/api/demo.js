import request from '@/plugins/request';
import setting from '@/setting'
const baseUrl = setting.bmsaApiBaseURL
let Api = {}

// 列表
Api.getList = function(data) {
    return request({
        url: baseUrl + '/api/getDropData',
        method: 'get',
        params: data
    });
}

// 列表
Api.getListData = function(data) {
    return request({
        url: baseUrl + '/api/getListData',
        method: 'get',
        params: data
    });
}

export default Api
