<template>
  <!--两列布局-->
  <div class="wrapper qa-content">
    <div class="fl left-list">
      <div class="tab-content">
        <div id="index" class="tab-pane active">
          <div class="tab-bottom-line">
            <!-- 问答首页 -->
            <ul class="sui-nav nav-tabs">
              <li :class="type=='new'?'active':''">
                <a @click="switchType('new')">最新回答</a>
              </li>
              <li :class="type=='hot'?'active':''">
                <a @click="switchType('hot')">热门回答</a>
              </li>
              <li :class="type=='wait'?'active':''">
                <a @click="switchType('wait')">等待回答</a>
              </li>
            </ul>
            <!--  v-infinite-scroll="loadMore" -->
            <div class="qa-list">
              <div class="tab-content">
                <!-- 最新回答 -->
                <div id="new" :class="'tab-pane '+(type=='new'?'active':'')">
                  <ul class="detail-list">
                    <li class="qa-item" v-for="(item,index) in newlist" :key="index">
                      <div class="fl record">
                        <div class="number">
                          <div class="border useful">
                            <p class="usenum">{{item.thumbup}}</p>
                            <p>有用</p>
                          </div>
                          <div class="border answer">
                            <p class="ansnum">{{item.reply}}</p>
                            <p>回答</p>
                          </div>
                        </div>
                      </div>
                      <div class="fl info">
                        <!-- 问题相关信息 -->
                        <div class="question">
                          <p class="author" v-if="item.reply > 0">
                            <span class="name">{{item.replyname}}</span>
                            <span>{{item.replytime | getTimeFormat}}</span>回答
                          </p>
                          <p class="title">
                            <nuxt-link :to="`/qa/`+item.id" target="_blank">{{item.title}}</nuxt-link>
                          </p>
                        </div>
                        <div class="other">
                          <!-- 问题相关标签 -->
                          <!-- <div>{{qaLabel.newlist[0]}}</div> -->
                          <ul class="fl sui-tag">
                            <li
                              v-for="(label, labelsIndex) in item.label"
                              :key="labelsIndex"
                            >{{label.labelname}}</li>
                            <!-- {{item.id}} -->
                          </ul>
                          <div class="fr brower">
                            <p>
                              浏览量 {{item.visits}} | {{item.createtime | formatCreatedTime}} 来自
                              <a
                                href="#"
                              >{{item.nickname}}</a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <!-- <div>{{item}}</div> -->
                      <div class="clearfix"></div>
                    </li>
                  </ul>
                </div>
                <!-- 热门列表 -->
                <div id="hot" :class="'tab-pane '+(type=='hot'?'active':'')">
                  <ul class="detail-list">
                    <li class="qa-item" v-for="(item,index) in hotlist" :key="index">
                      <div class="fl record">
                        <div class="number">
                          <div class="border useful">
                            <p class="usenum">{{item.thumbup}}</p>
                            <p>有用</p>
                          </div>
                          <div class="border answer">
                            <p class="ansnum">{{item.reply}}</p>
                            <p>回答</p>
                          </div>
                        </div>
                      </div>
                      <div class="fl info">
                        <div class="question">
                          <p class="author"  v-if="item.reply > 0">
                            <span class="name">{{item.replyname}}</span>
                            <span>{{item.replytime | getTimeFormat}}</span>回答
                          </p>
                          <p class="title">
                            <nuxt-link :to="`/qa/`+item.id" target="_blank">{{item.title}}</nuxt-link>
                            <!-- <a href="./qa-detail.html" target="_blank">{{item.title}}</a> -->
                          </p>
                        </div>
                        <div class="other">
                          <ul class="fl sui-tag">
                            <li
                              v-for="(label, labelsIndex) in item.label"
                              :key="labelsIndex"
                            >{{label.labelname}}</li>
                          </ul>
                          <div class="fr brower">
                            <p>
                              浏览量 {{item.visits}} | {{item.createtime | formatCreatedTime}} 来自
                              <a
                                href="#"
                              >{{item.nickname}}</a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="clearfix"></div>
                    </li>
                  </ul>
                </div>
                <!-- 等待回答 -->
                <div id="wait" :class="'tab-pane '+(type=='wait'?'active':'')">
                  <ul class="detail-list">
                    <li class="qa-item" v-for="(item,index) in waitlist" :key="index">
                      <div class="fl record">
                        <div class="number">
                          <div class="border useful">
                            <p class="usenum">{{item.thumbup}}</p>
                            <p>有用</p>
                          </div>
                          <div class="border answer">
                            <p class="ansnum">{{item.reply}}</p>
                            <p>回答</p>
                          </div>
                        </div>
                      </div>
                      <div class="fl info">
                        <div class="question">
                          <p class="author"  v-if="item.reply > 0">
                            <span class="name">{{item.replyname}}</span>
                            <span>{{item.replytime | getTimeFormat}}</span>回答
                          </p>
                          <p class="title">
                            <!-- <a href="./qa-detail.html" target="_blank">{{item.title}}</a> -->
                            <nuxt-link :to="`/qa/`+item.id" target="_blank">{{item.title}}</nuxt-link>
                          </p>
                        </div>
                        <div class="other">
                          <ul class="fl sui-tag">
                            <li
                              v-for="(label, labelsIndex) in item.label"
                              :key="labelsIndex"
                            >{{label.labelname}}</li>
                            <!-- {{item.id}} -->
                          </ul>
                          <div class="fr brower">
                            <p>
                              浏览量 {{item.visits}} | {{item.createtime | formatCreatedTime}} 来自
                              <a
                                href="#"
                              >{{item.nickname}}</a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="clearfix"></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fl right-tag">
      <div class="block-btn">
        <p>今天，要提个问题吗?</p>
        <a class="sui-btn btn-block btn-share" href="/qa/submit" target="_blank">发布问题</a>
      </div>
      <div class="hot-tags">
        <div class="head">
          <h3 class="title">热门标签</h3>
        </div>
        <div class="tags">
          <ul class="sui-tag">
            <li v-for="(label, index) in hotLabels" :key="index">{{label.labelname}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>
<script>
import "~/assets/css/page-sj-qa-logined.css";
import problemApi from "@/api/problem";
import axios from "axios";
import webutils from "@/utils/webutils";
import labelApi from "@/api/label";
export default {
  asyncData({ params }) {},
  created() {
    labelApi.toplist().then(res => {
      this.hotLabels = res.data.data;
    }),
      // 第一次加载newlist
      problemApi.list("newlist", 1, 10).then(res => {
        res.data.data.rows.forEach(item => {
          this.newlist = [];
          return problemApi.getLabelsByProblemId(item.id).then(lab => {
            let newItem = {
              ...item,
              label: lab.data.data
            }
            this.newlist = this.newlist.concat(newItem);
          })
        })
      })
  },
  data() {
    return {
      type: "new", // 默认的列表选择，如果是'hot'就为热门列表
      page_new: 1,
      page_hot: 1,
      page_wait: 1,
      hotLabels: {},
      waitlist: [],
      hotlist: [],
      newlist: []
    };
  },
  methods: {
    loadMoreHotList(){
      console.log("loadMore")
    },
    switchType(listType) {
      if (listType === "new") {
        this.type = "new";
      } else if (listType === "wait") {
        this.type = "wait";
        if (this.waitlist.length == 0) {
          this.fetchWaitList();
        }
      } else if (listType === "hot") {
        this.type = "hot";
        if (this.hotlist.length == 0) {
          this.fetchHotList();
        }
      }
    },
    fetchWaitList() {
      problemApi.list("waitlist", 1, 10).then(res => {
        res.data.data.rows.forEach(item => {
          problemApi.getLabelsByProblemId(item.id).then(lab => {
            let newItem = {
              ...item,
              label: lab.data.data
            };
            this.waitlist = this.waitlist.concat(newItem);
          });
        });
      });
    },
    fetchHotList() {
      problemApi.list("hotlist", 1, 10).then(res => {
        res.data.data.rows.forEach(item => {
          problemApi.getLabelsByProblemId(item.id).then(lab => {
            let newItem = {
              ...item,
              label: lab.data.data
            };
            this.hotlist = this.hotlist.concat(newItem);
          });
        });
      });
    }
  },
  filters: {
    //时间戳显示格式为几天前、几分钟前、几秒前
    getTimeFormat(valueTime) {
      return webutils.getTimeFormat(valueTime);
    },
    formatCreatedTime(milliseconds) {
      return webutils.formatCreatedTime(milliseconds);
    }
  }
};
</script>

