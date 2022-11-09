<template>
  <ul class="songs-list">
    <li
        v-for="(item, index) in songs"
        :key="index"
        class="item"
        @click="selectMusic(index)"
    >
      <img v-lazy="item.picUrl" alt=""/>
      <div>
        <h3>{{ item.name }}</h3>
        <p>{{ item.singer }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: {
    songs: {
      type: Array,
      default: () => [],
    },
  },
  name: "SongListItem",
  methods: {
    ...mapActions(["setFullScreen", "setSongsDetail"]),
    selectMusic(index) {
      this.setFullScreen(true);
      let id = this.songs.map(function (item) {
        return item.id;
      })
      this.setSongsDetail({ids: id, index: index});
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";

.songs-list {
  width: 100%;
  overflow: hidden;

  .item {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    img {
      width: 150px;
      height: 150px;
      border-radius: 20px;
      margin-right: 20px;
    }

    div {
      width: 530px;

      h3 {
        font-size: 36px;
        color: black;
        @include clamp(1)
      }

      p {
        font-size: 30px;
        color: black;
        padding-top: 20px;
        @include clamp(1)
      }
    }
  }
}
</style>
