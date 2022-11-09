<template>
  <div class="singer">
    <ScrollView ref="scrollView">
      <ul class="list-wrapper">
        <li v-for="(v, i) in list" :key="i" ref="group">
          <h2 class="group-title">{{ keys[i] }}</h2>
          <ul class="list-group">
            <li v-for="item in list[i]" class="group-item" @click="selectSinger(item.id)">
              <img v-lazy="item.img1v1Url" alt="">
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </li>
        <li></li>
      </ul>
    </ScrollView>
    <ul class="list-keys">
      <li v-for="(v ,i) in keys"
          :key="i"
          @click="clickKey(i)"
          :class="{active: curIndex === i}"
      >
        {{ v }}
      </li>
    </ul>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {getAllArtists} from "@/api";
import ScrollView from "@/components/ScrollView";

export default {
  name: 'Singer',
  components: {ScrollView},
  data() {
    return {
      keys: [],
      list: [],
      curIndex: 0,
      groupTop: []
    };
  },
  created() {
    getAllArtists().then(res => {
      this.keys = res.keys;
      this.list = res.list;
    })
  },
  mounted() {
    this.$refs.scrollView.scrolling((y) => {
          this.scrollY = y;
          //向下拖动
          if (y > 0) {
            this.curIndex = 0;
            return;
          }
          for (let i = 0; i < this.groupTop.length + 1; i++) {
            let preTop = this.groupTop[i];
            let nextTop = this.groupTop[i + 1];
            if (-y >= this.groupTop[this.groupTop.length - 1]) {
              this.curIndex = this.groupTop.length - 1;
            }
            if (-y >= preTop && -y <= nextTop) {
              // console.log(i)
              this.curIndex = i;
              // console.log(nextTop)
              return;
            }
          }
        }
    )
  },
  methods: {
    clickKey(index) {
      this.curIndex = index;
      let offsetY = this.groupTop[index];
      this.$refs.scrollView.scrollTo(0, -offsetY)
    }
    ,
    selectSinger(id) {
      this.$router.push({
        path: `/singer/detail/${id}/singer`
      });
    }
  }
  ,
  updated() {
  }
  ,
  computed: {
    fixTitle() {
      return this.keys[this.curIndex];
    }
  }
  ,
  watch: {
    list() {
      //nextTick会将回调函数放在瞎咋此DOM更新之后执行
      this.$nextTick(() => {
        this.$refs.group.forEach(group => {
          this.groupTop.push(group.offsetTop);
        })
      })
    }
  }
}
;
</script>

<style scoped lang="scss">
@import '../assets/css/variable';
@import '../assets/css/mixin';

.singer {
  position: fixed;
  top: 168.3px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #f5f5f5;

  .list-wrapper {
    width: 100%;

    li {
      .group-title {
        padding-left: 30px;
        margin: 15px auto;
        width: 91%;
        height: 60px;
        line-height: 60px;
        border-radius: 40px;
        @include bg_color;
        color: #fff;
        font-size: 50px;
        box-shadow: 0 0 80px 15px rgba(0, 0, 0, .1) inset;
      }

      .list-group {

        .group-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 10px 25px;
          border-bottom: 3px #fff solid;

          img {
            margin-right: 25px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
          }

          p {
            font-size: 33px;
            color: #5b5b5b;
          }
        }
      }
    }

    li:last-child {
      height: 110px;
    }
  }

  .list-keys {
    position: fixed;
    top: 168.3px;
    right: 6px;

    li {
      @include font_active_color();
      width: 35px;
      height: 35px;
      font-size: 30px;;
      margin-top: 7px;
      text-align: center;

      &.active {
        border: 1px solid;
        border-radius: 50%;
        background: #333333;
        color: white;
      }
    }
  }
}
</style>