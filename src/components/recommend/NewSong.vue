<template>
  <div class="newsong">
    <div class="h3">
      <h3>{{ title }}</h3>
    </div>
    <div class="song-ul">
      <div class="song-li" v-for="(v, i) in list" :key="i" @click="selectMusic(i)">
        <img v-lazy='v.picUrl' alt="">
        <div class="intro">
          <p>{{ v.name }}</p>
          <p>{{ v.song.artists[0].name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'NewSong',
  components: '',
  props: ['title', 'list'],
  data() {
    return {};
  },
  created() {

  },
  mounted() {

  },
  methods: {
    ...mapActions(['setIsPlaying', 'setFullScreen', 'setSongsDetail']),
    selectMusic(index) {
      //diapatch给action提交
      this.setIsPlaying(true);
      this.setFullScreen(true);
      let id = this.list.map(function (item) {
        return item.id;
      })
      this.setSongsDetail({ids: id, index: index});
    }
  }
};
</script>

<style scoped lang="scss">


.newsong {

  .h3 {
    width: 100%;
    height: 60px;
    margin-left: 15px;
    padding-left: 15px;
    color: #6d5c63;
    font-size: 33px;
    font-weight: bold;
    border-left: 5px solid #000;
  }

  .song-ul {
    margin: 0 auto;
    width: 91%;

    .song-li {
      padding: 20px 0;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      border-bottom: 1px solid gray;


      img {
        width: 190px;
        height: 190px;
        border-radius: 20px;
      }

      .intro {

        p {
          margin-top: 40px;
          padding-left: 20px;
          display: block;
          width: 100%;
          font-family: '楷体', serif;
          text-align: left;
          font-size: 26px;
        }
      }
    }
  }

}
</style>