<template>
  <div class="recommend">
    <ScrollView>
      <div>
        <Banner :banners="banners"></Banner>
        <personalized :list="personalized" :personalizedname="'推荐歌单'" :type="'p'" @re="getId"></personalized>
        <personalized :list="newalbum" :personalizedname="'最新专辑'" :type="'a'" @re="getId"></personalized>
        <new-song :list="newsong" :title="'最新音乐'"></new-song>
      </div>
    </ScrollView>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
//导入组件
import Banner from '@/components/recommend/Banner'
import Personalized from '@/components/recommend/Personalized'
import NewSong from '@/components/recommend/NewSong'
import ScrollView from "@/components/ScrollView";
// 导入请求数据，解构方式
import {getPersonalized, getNewAlbum, getNewSong, getBanner} from '@/api/index'


export default {
  name: 'recommend',
  //注册组件
  components: {Personalized, Banner, ScrollView, NewSong},
  data() {
    return {
      personalized: [],
      newalbum: [],
      newsong: [],
      banners: [],
    };
  },
  async created() {
    // 推荐歌单数据
    const resP = await getPersonalized();
    this.personalized = resP.data.result;
    // console.log(resP.data.result)
    // 最新专辑数据
    const resN = await getNewAlbum();
    this.newalbum = resN.data.albums.splice(0, 6);
    // 最新音乐数据
    const resS = await getNewSong();
    this.newsong = resS.data.result;
    // console.log(this.newsong)
    // 轮播图数据
    const resB = await getBanner();
    this.banners = resB.data.banners;
  },
  mounted() {
  },
  methods: {
    // 获取歌单和音乐的id，通过type来辨别id是哪个分类的
    getId(id, type) {
      this.$router.push({path: `/recommend/detail/${id}/${type}`})
    }
  }
};
</script>

<style scoped lang="scss">
.recommend {
  position: fixed;
  top: 168.3px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}

.v-enter {
  transform: translate(100%);
}

.v-enter-to {
  transform: translate(0%);
}

.v-enter-active {
  transition: all 0.5s;
}

.v-leave {
  transform: translate(0%);
}

.v-leave-to {
  transform: translate(100%);
}

.v-leave-active {
  transition: all 0.5s;
}
</style>