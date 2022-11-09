<template>
  <div class="userBottom">
    <div class="bottom-play" @click.stop="selectAllMusic">
      <span></span>
      <span>播放全部</span>
    </div>

    <div class="bottom-warpper">
      <scroll-view>
        <SongListItem :songs="switchNum === 0 ? favList:historyList"></SongListItem>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import ScrollView from "@/components/ScrollView";
import SongListItem from "@/components/SongListItem";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'UserBottom',
  components: {SongListItem, ScrollView},
  props: {
    switchNum: {
      type: Number,
      default: 0
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
    ...mapGetters(['favList', 'historyList']),
  },
  methods: {
    ...mapActions(['setFullScreen', 'setSongsDetail', 'setIsPlaying']),
    selectAllMusic() {

      let ids;
      if (this.switchNum === 0) {
        ids = this.favList.map(function (item) {
          return item.id;
        });
      } else {
        ids = this.historyList.map(function (item) {
          return item.id;
        });
      }
      this.setSongsDetail({ids: ids, index: 0});
      this.setFullScreen(true);
      this.setIsPlaying(true);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';

.userBottom {

  .bottom-play {
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 249px;
    height: 70px;
    border-radius: 35px;
    border: 1px red solid;

    span {
      font-size: 35px;
    }

    span:first-child {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      @include bg_img("../../assets/images/small_play")
    }

  }


  .bottom-warpper {
    position: fixed;
    top: 170px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}

</style>