<template>
  <div class="detail">
    <detail-top :title="playlist.name" @back="back"></detail-top>
    <detail-mittle :image='playlist.coverImgUrl' ref="image"></detail-mittle>
    <div class="detail-li">
      <scroll-view ref="scroll">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </scroll-view>
    </div>

    <router-view></router-view>

  </div>
</template>

<script>
import DetailTop from '@/components/detail/DetailTop';
import DetailMittle from '@/components/detail/DetailMiddle';
import DetailBottom from '@/components/detail/DetailBottom';
import {getPlayList, getAlbum, getArtistsSongs, getTopList} from "@/api/index";
import ScrollView from "@/components/ScrollView";

export default {

  name: 'Detail',
  components: {ScrollView, DetailTop, DetailMittle, DetailBottom},
  data() {
    return {
      playlist: {},
    };
  },
  async created() {
    if (this.$route.params.type === 'p') {
      getPlayList({id: this.$route.params.id}).then(res => {
        this.playlist = res.data.playlist;
      }).catch(err => {
        console.log(err);
      })
    } else if (this.$route.params.type === 'a') {
      getAlbum({id: this.$route.params.id}).then(res => {
        this.playlist = {
          name: res.data.album.name,
          coverImgUrl: res.data.album.picUrl,
          tracks: res.data.songs,
        };
      }).catch(err => {
        console.log(err);
      })
    } else if (this.$route.params.type === 'singer') {
      getArtistsSongs({id: this.$route.params.id}).then(res => {
        // console.log(res);
        this.playlist = {
          name: res.data.artist.name,
          coverImgUrl: res.data.artist.picUrl,
          tracks: res.data.hotSongs,
        };
      }).catch(err => {
        console.log(err);
      })
    } else if (this.$route.params.type === 'rank') {
      getTopList({id: this.$route.params.id}).then(res => {
        this.playlist = {
          name: res.data.playlist.name,
          coverImgUrl: res.data.playlist.creator.backgroundUrl,
          tracks: res.data.playlist.tracks
        };
      })
    }

  },
  mounted() {
    let a = this.$refs.image.$el.offsetHeight;

    this.$refs.scroll.scrolling(offsetY => {
          // console.log(offsetY);
          if (offsetY > 0) {
            let b = 1 + Math.abs(offsetY) / a;
            this.$refs.image.$el.style.transform = `scale(${b})`;
            this.$refs.image.$el.style.filter = `blur(${scale * 7}px)`;
            if (offsetY < 0.05) {
              this.$refs.image.$el.style.filter = `blur(0)`;
            }
          }
        }
    )
  }
  ,
  methods: {
    back() {
      window.history.back();
    }
  }
}
;
</script>

<style scoped lang="scss">
.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  overflow: hidden;

  .detail-li {
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
    //overflow: hidden;
  }
}

</style>