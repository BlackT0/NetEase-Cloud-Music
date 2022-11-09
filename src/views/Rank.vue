<template>
  <div class="rank">
    <div class="rank-wrapper">
      <ScrollView>
        <ul>
          <li v-for="(value, index) in category.titles"
              :key="index">
            <h3 class="group-title">{{ value }}</h3>
            <ul v-if="value === '官方榜'" class="normal-group">
              <li v-for="(obj, index) in category[index]" :key="index" @click.stop="selectItem(obj.rank.id)">
                <div class="rank-left">
                  <img :src="obj.rank.coverImgUrl" alt="">
                  <p>{{ obj.rank.updateFrequency }}</p>
                </div>
                <div class="rank-right">
                  <p v-for="(song, index) in obj.rank.tracks" :key="index">
                    {{ index + 1 }}.{{ song.first }}--{{ song.second }}
                  </p>
                </div>
              </li>
            </ul>
            <ul v-else class="other-group">
              <li v-for="obj in category[index]" :key="obj.rank.id">
                <div class="rank-top">
                  <img :src="obj.rank.coverImgUrl" alt="">
                  <p>{{ obj.rank.updateFrequency }}</p>
                </div>
                <div class="rank-bottom">
                  <p>{{ obj.rank.name }}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import {getTopListDetail} from '@/api/index'
import ScrollView from "@/components/ScrollView";

export default {
  name: 'Rank',
  components: {ScrollView},
  data() {
    return {
      category: {}
    };
  },
  created() {
    getTopListDetail().then(res => {
      // console.log(res)
      this.category = res;
    })
  },
  mounted() {

  },
  methods: {
    selectItem(id) {
      this.$router.push({path: `/rank/detail/${id}/rank`});
    }
  }
};
</script>

<style scoped lang="scss">
@import '../assets/css/mixin';

.rank {
  width: 100%;
  height: 100%;

  .rank-wrapper {
    position: fixed;
    top: 168.3px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background-color: #f5f5f5;

    .group-title {
      margin: 21px 21px;
      font-size: 40px;
      font-weight: bold;
    }

    .normal-group {
      border-bottom: 2px solid #fff;

      li {
        margin: 21px 0 20px 28px;
        display: flex;
        align-items: center;

        .rank-left {
          position: relative;

          img {
            width: 184px;
            height: 184px;
            border: 3px solid transparent;
            border-radius: 36px;
            box-shadow: 0 0 30px 15px rgba(0, 0, 0, .3);
          }

          p {
            position: absolute;
            left: 12px;
            bottom: 12px;
            @include clamp(1);
            @include font_active_color();
            font-size: 26px;
          }
        }

        .rank-right {
          margin-left: 20px;

          p {
            font-size: 24px;
            padding: 10px 0;
          }
        }
      }
    }

    .other-group {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      align-content: center;
      border-bottom: 2px solid #fff;

      li {
        margin: 15px 0 15px 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .rank-top {
          position: relative;

          img {
            width: 184px;
            height: 184px;
            border: 3px solid transparent;
            border-radius: 36px;
            box-shadow: 0 0 30px 10px rgba(0, 0, 0, .3);
          }

          p {
            position: absolute;
            left: 12px;
            bottom: 12px;
            @include font_active_color();
            font-size: 24px;
          }
        }

        .rank-bottom {
          margin-top: 5px;
          width: 200px;
          @include clamp(1);

          p {
            font-size: 30px;
            text-align: center;
            @include font_active_color();
          }
        }
      }
    }
  }
}
</style>