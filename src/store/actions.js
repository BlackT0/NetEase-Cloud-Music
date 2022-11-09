import {
    SET_FULL_SCREEN,
    SET_MINI_PLAYER,
    SET_IS_PLAYING,
    SET_MODE_TYPE,
    SET_SONGS_DETAIL,
    SET_SONG_LYRIC,
    SET_CURRENT_INDEX,
    SET_CUR_TIME,
    SET_FAV_LIST,
    SET_FAV_LOCAL_LIST,
    SET_HISTORY_LIST,
    SET_HISTORY_SONG, SET_MINI_LIST
} from './mutations-type'
import {getSongDetail, getSongLyric, getSongUrl} from "@/api";

export default {
    setFullScreen({commit}, flag) {
        commit(SET_FULL_SCREEN, flag)
    },
    setMiniPlayer({commit}, flag) {
        commit(SET_MINI_PLAYER, flag)
    },
    setMiniList({commit}, flag) {
        commit(SET_MINI_LIST, flag)
    },
    setIsPlaying({commit}, flag) {
        commit(SET_IS_PLAYING, flag)
    },
    setModeType({commit}, flag) {
        commit(SET_MODE_TYPE, flag);
    },
    async setSongsDetail({commit}, playload) {
        let result = await getSongDetail({ids: playload.ids.join(',')})

        let urls = await getSongUrl({id: playload.ids.join(',')})

        let list = []
        result.data.songs.forEach((value, index, array) => {
            let obj = {}
            // 1 ---歌曲名
            obj.name = value.name
            let singer = ''
            value['ar'].forEach((item, index) => {
                // 多个作者名字拼接
                if (index === 0) {
                    singer = item.name
                } else {
                    singer += '/' + item.name
                }
            })
            // 2---歌曲作者
            obj.singer = singer
            // 3-----歌曲封面
            obj.picUrl = value['al'].picUrl
            // 4 ----id
            obj.id = value.id

            for (let i = 0; i < urls.data.data.length; i++) {
                let item = urls.data.data[i]
                // 循环遍历，当id相等的时候，将url取出来，赋给obj
                if (value.id === item.id) {
                    // 5 ----歌曲链接
                    obj.url = item.url
                    break
                }
            }
            list.push(obj)
        })

        // console.log('{ list: list, index: index }', { list: list, index: index })

        commit(SET_SONGS_DETAIL, {list: list, index: playload.index})
    },
    async setSongLyric({commit}, id) {
        let res = await getSongLyric({id: id});
        let obj = parseLyric(res.data.lrc.lyric);
        commit(SET_SONG_LYRIC, obj);
    },
    setcurrentIndex({commit}, index) {
        commit(SET_CURRENT_INDEX, index);
    },
    setcurTime({commit}, time) {
        commit(SET_CUR_TIME, time)
    },
    setFavSong({commit}, song) {
        commit(SET_FAV_LIST, song)
    },
    setFsvLocalList({commit}, list) {
        commit(SET_FAV_LOCAL_LIST, list)
    },
    setHistorySong({commit}, song) {
        commit(SET_HISTORY_SONG, song)
    },
    setHistoryList({commit}, list) {
        commit(SET_HISTORY_LIST, list)
    }

}

// 格式化歌词方法
function parseLyric(lrc) {
    let lyrics = lrc.split('\n')
    // [00:00.000] 作曲 : 林俊杰
    // 1.定义正则表达式提取[00:00.000]
    let reg1 = /\[\d*:\d*\.\d*\]/g
    // 2.定义正则表达式提取 [00
    let reg2 = /\[\d*/i
    // 3.定义正则表达式提取 :00
    let reg3 = /\:\d*/i
    // 4.定义对象保存处理好的歌词
    let lyricObj = {}
    lyrics.forEach(function (lyric) {
        // 1.提取时间
        let timeStr = lyric.match(reg1)
        if (!timeStr) {
            return
        }
        timeStr = timeStr[0]
        // 2.提取分钟
        let minStr = timeStr.match(reg2)[0].substr(1)
        // 3.提取秒钟
        let secondStr = timeStr.match(reg3)[0].substr(1)
        // 4.合并时间, 将分钟和秒钟都合并为秒钟
        let time = parseInt(minStr) * 60 + parseInt(secondStr)
        // 5.处理歌词
        let text = lyric.replace(reg1, '').trim()
        // 6.保存数据
        lyricObj[time] = text
    })
    return lyricObj
}






















