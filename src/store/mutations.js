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
// 使用es2015风格的计算属命名功能，用一个常量作为一个函数名
export default {
    [SET_FULL_SCREEN](state, flag) {
        state.isFullScreen = flag;
    },
    [SET_MINI_PLAYER](state, flag) {
        state.isShowMiniPlayer = flag;
    },
    [SET_MINI_LIST](state, flag) {
        state.isShowMiniPlayerList = flag;
    },
    [SET_IS_PLAYING](state, flag) {
        state.isPlaying = flag;
    },
    [SET_MODE_TYPE](state, flag) {
        state.modeType = flag;
    },
    [SET_SONGS_DETAIL](state, playoad) {
        state.songs = playoad.list;
        state.currentIndex = playoad.index;
    },
    [SET_SONG_LYRIC](state, lyric) {
        state.currentLyric = lyric;
    },
    [SET_CURRENT_INDEX](state, index) {
        if (index < 0) {
            index = state.songs.length - 1;
        } else if (index > state.songs.length - 1) {
            index = 0;
        }
        state.currentIndex = index;
    },
    [SET_CUR_TIME](state, time) {
        state.curTime = time;
    },
    [SET_FAV_LIST](state, song) {
        let result = state.favList.find(function (item) {
            return item.id === song.id;
        })
        if (result === undefined) {
            state.favList.push(song);
        }
    },
    [SET_FAV_LOCAL_LIST](state, list) {
        state.favList = list;
    },
    [SET_HISTORY_SONG](state, song) {
        let result = state.historyList.find(function (item) {
            return item.id === song.id;
        })
        if (result === undefined) {
            if (state.historyList.length > 30) {
                state.historyList.shift();
            }
            state.historyList.push(song);
        }
    },
    [SET_HISTORY_LIST](state, list) {
        state.historyList = list;
    },
}