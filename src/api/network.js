import axios from 'axios'

//进行一些全局设置
axios.defaults.baseURL = 'http://192.168.124.8:3000/'
axios.defaults.timeout = 3000

//封装自己的get/post方法
export default {
    get: function (path = '', data = {}) {

        return new Promise(function (resolve, reject) {
            axios.get(path, {params: data})
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    post: function (path = '', data = {}) {
        return new Promise(function (resolve, reject) {
            axios.post(path, data).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //发送多个请求
    all: function (list) {
        return new Promise(function (resolve, reject) {
            axios
                .all(list)
                .then(
                    axios.spread(function (...result) {
                        resolve(result);
                    })
                )
                .catch(function (err) {
                    reject(err);
                });
        });
    }
}