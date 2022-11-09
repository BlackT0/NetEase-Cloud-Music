import Network from "./network";

export const getPersonalized = () => Network.get("personalized?limit=6");
//最新专辑
export const getNewAlbum = () => Network.get("album/newest");
//最新音乐
export const getNewSong = () => Network.get("personalized/newsong?limit=30");
//轮播图
export const getBanner = () => Network.get("banner?type=2");
//详情页数据
export const getPlayList = (data) => Network.get('playlist/detail', data);
//专辑详情页
export const getAlbum = (data) => Network.get('/album', data);
//歌曲详情
export const getSongDetail = (data) => Network.get('song/detail', data);
//获取音乐链接
export const getSongUrl = (data) => Network.get('song/url', data);
//获取歌词
export const getSongLyric = (data) => Network.get('lyric', data);
// 搜索歌曲
export const getSearchList = (data) => Network.get('search?type=1', data);
//热搜列表
export const getSearchHot = () => Network.get('search/hot');
//歌手点击列表
export const getArtistsSongs = (data) => Network.get("artists", data);

//热门歌手
export const getHotArtists = () => {
    return new Promise(function (resolve, reject) {
        Network.get('top/artists?offset=0&area=7&limit=8').then(function (result) {
            resolve(result.data.artists);
        }).catch(function (err) {
            reject(err);
        })
    })

}

export const getLetterArtists = (letter) => {
    return new Promise((resolve, reject) => {
        let letterArtists = [];
        Network
            .all([Network.get(`/artist/list?offset=0&area=7&limit=8&initial=${letter}`)])
            .then(result => {
                result.forEach(function (item) {
                    letterArtists.push(...item.data.artists)
                })
                resolve(letterArtists);
            })
            .catch(function (err) {
                reject(err);
            })
    })
}

export const getAllArtists = () => {
    return new Promise(function (resolve, reject) {
        let keys = ['热'];
        //每个字母对应的接口
        let list = [getHotArtists()];
        for (let i = 65; i < 91; i++) {
            let char = String.fromCharCode(i);
            keys.push(char);
            list.push(getLetterArtists(char));
        }
        Network
            .all(list)
            .then(result => {
                let obj = {}
                obj.keys = keys;
                obj.list = result;
                resolve(obj);
            })
            .catch(function (err) {
                reject(err);
            })
    })
}

export const getTopListDetail = () => {
    let category = {
        officialList: [
            {name: "飙升榜", id: 3},
            {name: "新歌榜", id: 0},
            {name: "原创榜", id: 2},
            {name: "热歌榜", id: 1},
        ],
        recList: [
            {name: "云音乐说唱榜", id: 23},
            {name: "云音乐电音榜", id: 25},
            {name: "云音乐欧美新歌榜", id: 32},
            {name: "UK排行榜周榜", id: 26},
            {name: "云音乐ACG VOCALOID榜", id: 22},
            {name: "云音乐民谣榜", id: 24},
        ],
        globalList: [
            {name: "美国Billboard榜", id: 60198},
            {name: "潜力爆款榜", id: 5},
            {name: "Beatport全球电子舞曲榜", id: 21},
            {name: "日本Oricon榜", id: 10},
            {name: "网络热歌榜", id: 8},
            {name: "云音乐日语榜", id: 29},
        ],
        otherList: [
            {name: "KTV唛榜", id: 7},
            {name: "法国 NRJ Vos Hits 周榜", id: 19},
            {name: "云音乐古风榜", id: 27},
            {name: "云音乐韩语榜", id: 28},
            {name: "云音乐摇滚榜", id: 30},
            {name: "云音乐欧美热歌榜", id: 31},
        ],
        titles: {
            officialList: "官方榜",
            recList: "推荐榜",
            globalList: "全球榜",
            otherList: "更多榜单",
        },
    }
    return new Promise(function (resolve, reject) {
        Network.get('/toplist/detail').then(function (data) {
            +
                data.data.list.forEach(function (obj) {
                    let flag = false;
                    for (let key in category) {
                        for (let i = 0; i < category[key].length; i++) {
                            if (category[key][i].name === obj.name) {
                                category[key][i].rank = obj;
                                flag = true;
                                break;
                            }
                        }
                        if (flag) break;
                    }
                })
            resolve(category);
        }).catch(function (err) {
            console.log(err);
        })
    })
}
//   榜单详情页
export const getTopList = (data) => Network.get("/playlist/detail", data);



























