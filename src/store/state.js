import modeType from './modeType'

export default {
    //播放页面是否展示
    isFullScreen: false,
    //显示mini播放器
    isShowMiniPlayer: false,
    //显示mini列表
    isShowMiniPlayerList: false,
    //播放或者暂停状态
    isPlaying: true,
    // 播放状态（3）
    modeType: modeType.loop,
    //歌曲详情
    songs: [],
    //当前播放歌曲的下标， 默认第一首
    currentIndex: 0,
    //当前播放歌曲信息
    currentSong: {},
    //当前歌词
    currentLyric: {},
    //歌曲当前时间
    curTime: 0,
    //收藏歌单
    favList: [],
    //历史播放
    historyList: []

}