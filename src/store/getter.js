import state from './state'

export default {
    isFullScreen(state) {
        return state.isFullScreen;
    },
    isShowMiniPlayer(state) {
        return state.isShowMiniPlayer;
    },
    isShowMiniPlayerList(state) {
        return state.isShowMiniPlayerList;
    },
    isPlaying(state) {
        return state.isPlaying;
    },
    modeType(state) {
        return state.modeType;
    },
    songs(state) {
        return state.songs;
    },
    currentSong(state) {
        let obj = {
            name: '',
            singer: '',
            picUrl: '',
            id: 0,
        }
        if (state.songs.length !== 0) {
            return state.songs[state.currentIndex];
        }
        return obj;
    },
    currentLyric(state) {
        return state.currentLyric;
    },
    currentIndex(state) {
        return state.currentIndex;
    },
    curTime(state) {
        return state.curTime;
    },
    favList(state) {
        return state.favList;
    },
    historyList(state) {
        return state.historyList;
    }
}