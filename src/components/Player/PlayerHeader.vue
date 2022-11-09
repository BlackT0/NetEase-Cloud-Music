<template>
  <div class="player-header">
    <div class="player-header-left" @click="back"></div>
    <div class="player-header-title">
      <h3>{{ currentSong.name }}</h3>
      <p>{{ currentSong.singer }}</p>
    </div>
    <div class="player-header-right"></div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'PlayerHeader',
  components: {},
  data() {
    return {};
  },
  created() {

  },
  mounted() {

  },
  methods: {
    ...mapActions(['setFullScreen', 'setMiniPlayer']),
    back() {
      this.setFullScreen(false);
      this.setMiniPlayer(true);

    }
  },
  computed: {
    ...mapGetters(['currentSong'])
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';
@import '../../assets/css/variable';

.player-header {
  position: relative;
  top: 0;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  align-items: center;
  font-size: 35px;
  color: white;

  .player-header-left, .player-header-right {
    width: 84px;
    height: 84px;
  }

  .player-header-left {
    margin-left: 10px;
    @include bg_img('@/assets/images/down')
  }

  .player-header-right {
    margin-right: 10px;
    @include bg_img('@/assets/images/more')
  }

  .player-header-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h3 {
      margin: 0 auto;
      width: 400px;
      @include clamp(1);
    }

    p {
      margin: 0 auto;
      width: 400px;
      font-size: 32px;
      @include clamp(1);
    }
  }
}
</style>