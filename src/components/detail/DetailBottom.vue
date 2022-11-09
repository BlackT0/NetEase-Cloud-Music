<template>
  <div class="detail-bottom">
    <div class="bottom-top">
      <div class="bottom-icon" @click="selectAllMusic"></div>
      <div class="bottom-title">播放全部</div>
    </div>
    <div class="bottom-bottom" v-for="(v,i) in playlist" :key="i" @click="selectMusic(i)">
      <h3>{{ v.name }}</h3>
      <p>{{ v.ar[0].name }}</p>
    </div>
    <div class="load">已经加载到底部...</div>
  </div>
</template>

<script>
import ScrollView from "@/components/ScrollView";
import {mapActions, mapGetters} from "vuex"

export default {
  name: 'DetailBottom',
  components: {ScrollView},
  props: {
    playlist: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {};
  },
  created() {

  },
  mounted() {

  },
  computed: {
    ...mapGetters(['isPlaying'])
  },
  methods: {
    ...mapActions([
      'setFullScreen', 'setSongsDetail', 'setIsPlaying', 'setMiniPlayer'
    ]),
    selectAllMusic() {
      this.setIsPlaying(true);
      this.setMiniPlayer(false);
      let ids = this.playlist.map(function (item) {
        return item.id;
      })
      //diapatch给action提交
      this.setFullScreen(true);
      this.setSongsDetail({ids: ids, index: 0});
    },
    selectMusic(index) {
      //diapatch给action提交
      this.setIsPlaying(true);
      this.setMiniPlayer(false);
      this.setFullScreen(true);
      let id = this.playlist.map(function (item) {
        return item.id;
      })
      this.setSongsDetail({ids: id, index: index});
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/css/variable';
@import '../../assets/css/mixin';

.detail-bottom {
  width: 100%;
  background-color: #fff;
  border-radius: 30px 30px 0 0;

  .bottom-top {
    display: flex;
    align-items: center;
    width: 100%;
    height: 120px;
    border-radius: 30px 30px 0 0;

    .bottom-icon {
      margin-left: 20px;
      width: 60px;
      height: 60px;
      @include bg_img('../../assets/images/small_play');
    }

    .bottom-title {
      margin-left: 20px;
      color: rgba(0, 0, 0, .6);
      font-size: 36px;
      font-weight: bold;
    }
  }

  .bottom-bottom {
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, .8);

    h3,
    p {
      margin: 20px auto;
      width: 95%;
      color: rgba(0, 0, 0, .6);
      font-size: 32px;
    }
  }

  .load {
    width: 100%;
    line-height: 100px;
    font-size: 35px;
    text-align: center;
  }
}
</style>