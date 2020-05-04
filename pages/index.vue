<template>
  <div class="wrapper">
    <div class="sj-content">
      <!-- 频道管理 -->
      <div class="left-nav">
        <div class="float-nav" id="float-nav">
          <ul class="sui-nav nav-tabs nav-xlarge tab-navbar tab-vertical">
            <li :class="this.selectedChannel=='0'?'active':''" @click="changeChannel('0')">
              <a>热门</a>
            </li>
            <li
              @click="changeChannel(channel.id)"
              :class="selectedChannel==channel.id?'active':''"
              v-for="(channel, cindex) in channels"
              :key="cindex"
            >
              <a>{{channel.name}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="right-content">
        <!-- 中间管理 -->
        <div class="fl middle">
          <!-- 轮播图 -->
          <el-carousel class="carousel">
            <div id="myCarousel" data-ride="carousel" data-interval="4000">
              <div>
                <el-carousel-item v-for="(article, aindex) in topArticle" :key="aindex">
                  <div>
                    <nuxt-link :to="`/article/`+article.id" target="_blank">
                      <img :src="article.images" />
                    </nuxt-link>
                  </div>
                </el-carousel-item>
              </div>
            </div>
          </el-carousel>
          <!-- 文章列表 -->
          <div class="data-list">
            <ul class="headline fixed" id="headline">
              <!-- 文章 -->
              <li class="headline-item" v-for="(article, aindex) in articles" :key="aindex">
                <div class="fl indexImg">
                  <img :src="article.images" />
                </div>
                <div class="words">
                  <nuxt-link :to="`/article/`+article.id" target="_blank">
                    <h3>
                      {{article.title}}
                      <!-- 是否为VIP -->
                      <span v-if="article.type==='1'">
                        <img src="~/assets/img/widget-vip.png" class="vip" />
                      </span>
                    </h3>
                  </nuxt-link>
                  <h5 class="author">
                    <div class="fl">
                      <span class="authorName">
                        <img src="~/assets/img/widget-photo.png" alt />
                        {{article.nickname}}
                      </span>
                      <span>{{article.createtime | formatCreatedTime}}</span>
                    </div>
                    <div class="fr attention">
                      <span class="attentionText">关注</span>
                      <span class="beforeclose">
                        <i class="fa fa-times delete" aria-hidden="true"></i>
                        <i class="nolike">不感兴趣</i>
                      </span>
                    </div>
                    <div class="clearfix"></div>
                  </h5>
                </div>
                <p class="content" v-html="ellipsis(article.content)"></p>
              </li>
            </ul>
          </div>
          <!-- <script src="~/assets/data-list.js" type="text/javascript"></script> -->
        </div>
        <!-- 右边内容 -->
        <div class="fl right">
          <!-- 活动 -->
          <div class="activity">
            <div class="acti">
              <img src="~/assets/img/widget-activity01.png" alt="活动一" />
            </div>
            <div class="acti">
              <img src="~/assets/img/widget-activity02.png" alt="活动一" />
            </div>
          </div>
          <!-- 文章发布入口 -->
          <div class="block-btn">
            <p>今天，有什么好东西要和大家分享么?</p>
            <nuxt-link
              target="_blank"
              tag="a"
              to="/article/submit"
              class="sui-btn btn-block btn-share"
            >发布文章</nuxt-link>
          </div>
          <!-- 热门问答 -->
          <div class="question-list">
            <h3 class="title">热门回答</h3>
            <div class="lists">
              <ul>
                <li class="list-item" v-for="(problem, pindex) in problems" :key="pindex">
                  <nuxt-link :to="`/qa/`+problem.id" class="list-title" target="_blank">
                    <p>{{problem.title}}</p>
                  </nuxt-link>
                  <p class="authorInfo">
                    <span class="authorName">
                      <img src="~/assets/img/widget-photo.png" alt />
                      {{problem.nickname}}
                    </span>
                    <span>6月22日 12:01</span>
                  </p>
                </li>
              </ul>
              <nuxt-link to="/qa" target="_blank">
                <a class="sui-btn btn-block btn-bordered btn-more">查看更多</a>
              </nuxt-link>
            </div>
          </div>
          <!-- 交友 -->
          <!-- <div class="card-list">
            <div class="head">
              <h3 class="title">遇见TA</h3>
            </div>
            <div class="list">
              <ul>
                <li class="card-item">
                  <div class="attention">
                    <span>
                      关注匹配度：
                      <i class="degree">83%</i>
                    </span>
                    <span class="fr">
                      <i class="fa fa-heart-o" aria-hidden="true"></i>
                      <i class="fa fa-times close" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div class="img">
                    <img src="~/assets/img/widget-t01be3f1015cf52e1f3.png" alt />
                  </div>
                  <div class="info">
                    <div class="fl photo">
                      <img src="~/assets/img/widget-photo.png" alt />
                    </div>
                    <div class="fl intro">
                      <p>【馨儿】发布了雕刻时光约会邀请</p>
                      <p class="name">
                        玻璃通
                        <span class="date">6月22日 12:01</span>
                      </p>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </li>
                <li class="card-item">
                  <div class="attention">
                    <span>
                      关注匹配度：
                      <i class="degree">86%</i>
                    </span>
                    <span class="fr">
                      <i class="fa fa-heart-o" aria-hidden="true"></i>
                      <i class="fa fa-times close" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div class="img">
                    <img src="~/assets/img/widget-MOG88A60E7ZI.png" alt />
                  </div>
                  <div class="info">
                    <div class="fl photo">
                      <img src="~/assets/img/widget-photo.png" alt />
                    </div>
                    <div class="fl intro">
                      <p>【馨儿】发布了雕刻时光约会邀请</p>
                      <p class="name">
                        玻璃通
                        <span class="date">6月22日 12:01</span>
                      </p>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </li>
                <li class="card-item">
                  <div class="attention">
                    <span>
                      关注匹配度：
                      <i class="degree">78%</i>
                    </span>
                    <span class="fr">
                      <i class="fa fa-heart-o" aria-hidden="true"></i>
                      <i class="fa fa-times close" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div class="img">
                    <img src="~/assets/img/widget-t019e2d84e53580b099.png" alt />
                  </div>
                  <div class="info">
                    <div class="fl photo">
                      <img src="~/assets/img/widget-photo.png" alt />
                    </div>
                    <div class="fl intro">
                      <p>【馨儿】发布了雕刻时光约会邀请</p>
                      <p class="name">
                        玻璃通
                        <span class="date">6月22日 12:01</span>
                      </p>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </li>
              </ul>
              <a class="sui-btn btn-block btn-bordered btn-more">查看更多</a>
            </div>
          </div>-->
          <!-- 参与的活动 -->
          <div class="activity-list">
            <h3 class="title">活动日历</h3>
            <div class="list">
              <ul>
                <li class="list-item">
                  <p class="list-time">2017/06/30 北京</p>
                  <div class="list-content clearfix">
                    <div class="fl img">
                      <img src="~/assets/img/widget-simple.png" alt />
                    </div>
                    <div>
                      <p>在线峰会 | 前端开发重难点技术剖析与创新实践</p>
                    </div>
                  </div>
                </li>
                <li class="list-item">
                  <p class="list-time">2017/06/30 北京</p>
                  <div class="list-content clearfix">
                    <div class="fl img">
                      <img src="~/assets/img/widget-simple.png" alt />
                    </div>
                    <div>
                      <p>在线峰会 | 前端开发重难点技术剖析与创新实践</p>
                    </div>
                  </div>
                </li>
                <li class="list-item">
                  <p class="list-time">2017/06/30 北京</p>
                  <div class="list-content clearfix">
                    <div class="fl img">
                      <img src="~/assets/img/widget-simple.png" alt />
                    </div>
                    <div>
                      <p>在线峰会 | 前端开发重难点技术剖析与创新实践</p>
                    </div>
                  </div>
                </li>
                <li class="list-item">
                  <p class="list-time">2017/06/30 北京</p>
                  <div class="list-content clearfix">
                    <div class="fl img">
                      <img src="~/assets/img/widget-simple.png" alt />
                    </div>
                    <div>
                      <p>在线峰会 | 前端开发重难点技术剖析与创新实践</p>
                    </div>
                  </div>
                </li>
              </ul>
              <a class="sui-btn btn-block btn-bordered btn-more">查看更多</a>
            </div>
          </div>
          <!-- 广告 -->
          <div class="ad-carousel">
            <div class="carousel">
              <div
                id="myCarousel"
                data-ride="carousel"
                data-interval="4000"
                class="sui-carousel slide"
              >
                <ol class="carousel-indicators">
                  <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                  <div class="active item">
                    <img src="~/assets/img/widget-ad01.png" />
                  </div>
                  <div class="item">
                    <img src="~/assets/img/widget-ad01.png" />
                  </div>
                  <div class="item">
                    <img src="~/assets/img/widget-ad01.png" />
                  </div>
                </div>
                <span class="adname">广告</span>
              </div>
            </div>
          </div>
          <!-- <link rel="import" href=".~/assets/.~/assets/modules/ui-modules/footer/footer.html?__inline"> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "~/assets/css/page-headline-logined.css";
import articleApi from "@/api/article/article";
import channelApi from "@/api/article/channel";
import problemApi from "@/api/problem";
import webutils from "@/utils/webutils";
import axios from "axios";
export default {
  asyncData() {
    return axios
      .all([
        articleApi.findTopArticle(),
        channelApi.findSearch({ state: "1" }),
        articleApi.search(1, 10, { istop: "0" }),
        problemApi.list("newlist", 1, 5)
      ])
      .then(
        axios.spread(function(
          topArticleRes,
          channelRes,
          articleRes,
          problemRes
        ) {
          return {
            topArticle: topArticleRes.data.data,
            channels: channelRes.data.data,
            articles: articleRes.data.data.rows,
            problems: problemRes.data.data.rows
          };
        })
      );
  },
  data() {
    return {
      selectedChannel: "0",
      pojo:{}
    };
  },
  methods: {
    // 切换频道
    changeChannel(channelid) {
      this.selectedChannel = channelid;
      this.pojo = {}
      if(channelid !== '0'){
        this.pojo.channelid = channelid
      }
      this.pojo.state = '1'
      this.pojo.istop = '0'
      // 获取数据
      articleApi.search(1, 10, this.pojo).then(res => {
        this.articles = res.data.data.rows;
      });
    },
    // 当内容超过一定字符数时截断并返回一个新的字符串
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 200) {
        return value.slice(0, 200) + "...";
      }
      return value;
    }
  },
  filters: {
    //时间戳显示格式为几天前、几分钟前、几秒前
    getTimeFormat(valueTime) {
      return webutils.getTimeFormat(valueTime);
    },
    // 以年月日的方式显示时间戳
    formatCreatedTime(milliseconds) {
      return webutils.formatCreatedTime(milliseconds);
    }
  }
};
</script>

