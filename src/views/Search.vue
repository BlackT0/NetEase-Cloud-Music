<template>
  <div class="search" @click="back">
    <div class="search-box">
      <i class="iconfont">&#xe62f;</i>
      <input class="inp"
             type="text"
             v-model="keywords"
             placeholder="搜索歌曲、歌手..."
             v-throttle="search">
    </div>
    <!--如果没有关键字，不显示搜索建议提示-->
    <div class="search-suggest" v-show="keywords !== ''">
      <ScrollView>
        <ul class="yuce">
          <li v-for="(v, i) in songs" :key="i" @click="selectMusic(i)">
            <i class="iconfont">&#xe60e;</i>
            <p>{{ v.name }}--{{ v.artists[0].name }}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
    <!--热门搜索-->
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="(v, i) in hots" :key="i" @click.stop="selectHot(v.first)">
          {{ v.first }}
        </li>
      </ul>
    </div>
    <!--  搜索历史  -->
    <div class="search-history">
      <ScrollView>
        <ul>
          <li v-for="(v, i) in searchHistory" :key="i" @click="sHistory(v)">
            <div class="history-left">
              <i class="iconfont">&#xe74f;</i>
              <p>{{ v }}</p>
            </div>
            <i class="iconfont" @click.stop="delHistory(v)">&#xe74b;</i>
          </li>
        </ul>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from "@/components/ScrollView";
import {getSearchHot, getSearchList} from "@/api";
import {mapActions} from "vuex";

export default {
  name: 'Search',
  components: {ScrollView},
  data() {
    return {
      keywords: '',
      songs: [],
      hots: [],
      searchHistory: []
    };
  },
  created() {
    getSearchHot().then(res => {
      this.hots = res.data.result.hots;
    })
    // 初始化搜索历史数据
    let searchList = JSON.parse(window.localStorage.getItem('searchHistory'));
    if (searchList === undefined || searchList === null) {
      return;
    }
    this.searchHistory = searchList;
  },
  mounted() {

  }
  ,
  methods: {
    ...mapActions(['setIsPlaying', 'setFullScreen', 'setSongsDetail']),
    back() {
      this.keywords = '';
    },
    search() {
      //发送请求代码
      getSearchList({'keywords': this.keywords}).then(res => {
        this.songs = res.data.result.songs;
        // console.log(res)
      }).catch(err => {
        console.log();
      })
    },
    selectMusic(index) {
      //diapatch给action提交
      this.setIsPlaying(true);
      this.setFullScreen(true);
      let id = this.songs.map(function (item) {
        return item.id;
      })
      this.setSongsDetail({ids: id, index: index});

      // 点击过的音乐，加入搜索历史，搜索历史数组有变化，需要存入到localStorage
      this.searchHistory.push(this.keywords);
      if (this.searchHistory.includes(this.keywords)) {
        this.delHistory(this.keywords);
        this.searchHistory.push(this.keywords);
      }
      window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
      // 返回界面后清空关键字
      this.keywords = '';
    },
    selectHot(value) {
      this.keywords = value;
      this.search();
    },
    delHistory(name) {
      this.searchHistory = this.searchHistory.filter(function (item) {
        return item !== name;
      })
      window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
    },
    sHistory(value) {
      this.keywords = value;
    }
  },
  directives: {
    throttle: {
      //el指的是被绑定指令的元素
      inserted: function (el, obj) {
        //定时器id
        let timerId = null;
        let flag = true;
        el.addEventListener('input', function () {
          if (!flag) return;
          flag = false
          timerId && clearTimeout(timerId);
          timerId = setTimeout(function () {
            flag = true;
            obj.value();
          }, 1000)
        })
      }
    }
  }
}
;
</script>

<style scoped lang="scss">
@import '../assets/css/mixin';
@import "src/assets/css/variable";

.search {
  position: fixed;
  top: 168.3px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f5f5f5;

  .search-box {
    position: relative;
    top: 30px;

    .iconfont {
      position: absolute;
      left: 60px;
      line-height: 74px;
      font-size: 40px;
      z-index: 2;
    }

    .inp {
      position: absolute;
      padding-left: 60px;
      left: 50%;
      z-index: 1;
      transform: translateX(-50%);
      width: 80%;
      height: 70px;
      border: 0;
      border-bottom: 2px solid gray;
      border-radius: 35px;
      font-size: 35px;
      background-color: #ebecec;
      outline: none;
    }
  }

  .search-suggest {
    position: fixed;
    z-index: 1;
    top: 270px;
    bottom: 500px;
    left: 50px;
    right: 50px;
    overflow: hidden;
    border: 1px solid gray;
    border-radius: 20px;
    background-color: #f5f5f5;

    .yuce {

      li {
        width: 100%;
        height: 80px;
        line-height: 80px;
        border-bottom: 2px solid #c2c2c2;
        display: flex;
        font-size: 32px;
        font-weight: 500;
        color: #756f90;

        .iconfont {
          margin: 0 15px;
          font-size: 25px;
          color: deepskyblue;
        }

        p {
          @include clamp(1);
        }
      }
    }
  }

  .search-hot {
    margin-top: 120px;

    h3 {
      font-size: 50px;
      font-weight: bold;
      margin: 20px;
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        height: 60px;
        font-size: 30px;
        margin: 10px 20px;
        padding: 10px 20px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        @include border_color;
        border-radius: 30px;

      }
    }
  }

  .search-history {
    position: fixed;
    z-index: 0;
    top: 700px;
    bottom: 0;
    left: 50px;
    right: 50px;
    overflow: hidden;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px;
      border-bottom: 1px solid #ccc;
      @include border_color;

      .history-left {
        display: flex;
        align-items: center;

        i {
          font-size: 40px;
        }

        p {
          margin-left: 20px;
          font-size: 40px;
        }
      }

      i {
        font-size: 40px;
      }

    }
  }
}
</style>