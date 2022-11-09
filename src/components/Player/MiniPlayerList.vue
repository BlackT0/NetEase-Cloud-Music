<template>
  <div class="miniplayerlist" @click="back">
    <div class="miniplayerlist1">
      <div class="title" @click="back">
        <div class="title-left">当前播放</div>
        <div class="title-right">({{ this.songs.length }})</div>
      </div>
      <div class="middle">
        <div>
          <div></div>
          <span>云随机</span>
        </div>
        <i class="iconfont" @click.stop="delAll">&#xe74b;</i>
      </div>
      <div class="bottom">
        <ScrollView ref="rd">
          <ul>
            <li v-for="(v, i) in songs" :key="v.id" :class="{'active':v.id === currentSong.id}" @click="bo(i)">
              <div class="song-left">
                <div class="songname">{{ v.name }}</div>
                <span>-</span>
                <div class="songer">{{ v.singer }}</div>
              </div>
              <i class="iconfont" @click.stop="del(i)">&#xe601;</i>
            </li>
          </ul>
        </ScrollView>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ScrollView from "@/components/ScrollView";

export default {
  name: 'MiniPlayerList',
  components: {ScrollView},
  data() {
    return {};
  },
  created() {

  },
  mounted() {
  },
  methods: {
    ...mapActions(['setMiniList', 'setMiniPlayer', 'setcurrentIndex', 'setIsPlaying']),
    back() {
      this.setMiniList(false);
      this.setMiniPlayer(true);
    },
    bo(value) {
      this.setcurrentIndex(value);
    },
    delAll() {
      this.songs.splice(0, this.songs.length);
      this.setIsPlaying(false);
    },
    del(index) {
      if (index < this.currentIndex) this.setcurrentIndex(this.currentIndex - 1)
      this.songs.splice(index, 1);
    }
  },
  computed: {
    ...mapGetters(['songs', 'currentSong', 'currentIndex', 'isShowMiniPlayerList'])
  },
  watch: {
    isShowMiniPlayerList(newV) {
      if (newV) {
        // console.log(this.$refs.rd)
        this.$refs.rd.refresh();
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';

.miniplayerlist {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .6);

  .miniplayerlist1 {
    position: absolute;
    top: 400px;
    bottom: 30px;
    left: 15px;
    right: 15px;
    overflow: hidden;
    border: 1px transparent solid;
    border-radius: 40px;
    background-color: #fff;

    .title {
      display: flex;
      justify-content: left;
      align-items: baseline;
      margin: 30px;

      .title-left {
        font-size: 40px;
        font-weight: bold;
      }

      .title-right {
        font-size: 24px;
        color: gray;
      }
    }

    .middle {
      margin: 0 30px 0 30px;
      padding-bottom: 30px;
      border-bottom: 1px gray solid;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 28px;
      font-weight: bold;
      color: #5b5b5b;

      .iconfont {
        font-size: 42px;
      }
    }

    .bottom {
      position: fixed;
      top: 585px;
      bottom: 30px;
      left: 0;
      right: 0;
      overflow: hidden;

      ul {
        margin: 0 auto;
        width: 95%;

        li {
          display: flex;
          justify-content: space-between;
          align-content: center;
          margin: 30px 30px;
          height: 60px;

          .song-left {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            font-size: 30px;
            line-height: 60px;

            .songname {
              @include clamp(1)
            }

            span {
              margin: 0 10px;
              color: #5b5b5b;
            }

            .songer {
              color: #5b5b5b;
              font-size: 24px;
              @include clamp(1)
            }
          }

          .iconfont {
            font-size: 34px;
            color: #5b5b5b;
          }

          &.active {
            color: red;

            .songer {
              color: red;
            }

            span {
              color: red;
            }
          }

          &:last-child {
            padding-bottom: 30px;
          }
        }
      }
    }
  }
}
</style>