<template>
  <!--两列布局-->
  <div class="wrapper tag-item">
    <div class="fl left-list">
      <div class="tab-content">
        <div id="index" class="tab-pane active">
          <div class="tag-intro">
            <h3 class="title">
              <!-- <img src="./img/widget-h5.png" alt=""> HTML5 -->
              <a href="JavaScript:;" class="sui-btn btn-default guanzhu">关注</a>
            </h3>
            <p class="words">
              HTML5 是 HTML 下一个的主要修订版本，现在仍处于发展阶段。广义论及 HTML5 时，实际指的是包括 HTML、CSS 和 JavaScript 在内的一套技术组合。
              <a
                href="javascript:;"
                id="goto"
              >[百科]</a>
            </p>
          </div>
          <div class="tabtags-bottom-line">
            <ul class="sui-nav nav-tabs" id="tab-line">
              <li :class="type=='qa'?'active':''">
                <a @click="type='qa'">
                  <i class="fa fa-question-circle" aria-hidden="true"></i>问答
                </a>
              </li>
              <li :class="type=='baike'?'active':''">
                <a @click="type='baike'">
                  <i class="fa fa-wikipedia-w" aria-hidden="true"></i>百科
                </a>
              </li>
            </ul>
            <div class="qa-list">
              <div class="tab-content" id="jump">
                <!-- 问答 -->
                <div id="qa" :class="'tab-pane '+(type=='qa'?'active':'')">
                  <div class="show-type">
                    <!-- 排序规则 -->
                    <span class="fl order">排序：</span>
                    <div class="sui-btn-group">
                      <button
                        :class="'sui-btn '+(qaSort=='createtime'?'active':'')"
                        @click="sortByOrderword('createtime')"
                      >时间</button>
                      <button
                        :class="'sui-btn '+(qaSort=='thumbup'?'active':'')"
                        @click="sortByOrderword('thumbup')"
                      >得票数</button>
                    </div>
                  </div>

                  <ul class="detail-list">
                    <li class="qa-item" v-for="(item,index) in qaList.rows" :key="index">
                      <div class="fl record">
                        <div class="number">
                          <div class="border useful">
                            <p class="usenum">{{item.visits}}</p>
                            <p>浏览</p>
                          </div>
                          <div class="border answer">
                            <p class="ansnum">{{item.thumbup}}</p>
                            <p>有用</p>
                          </div>
                        </div>
                      </div>
                      <div class="fl info">
                        <div class="question">
                          <p class="author">
                            <span class="name">luckness</span>
                            <span>3</span>分钟前回答
                          </p>
                          <p class="title">{{item.title}}</p>
                          <ul class="sui-tag">
                            <li>Php</li>
                            <li>Javascript</li>
                          </ul>
                        </div>
                      </div>
                      <div class="clearfix"></div>
                    </li>
                  </ul>
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="qaList.total"
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                  ></el-pagination>
                  <!--                   <div class="sui-pagination">
                    <ul>
                      <li class="prev">
                        <a href="#">上一页</a>
                      </li>
                      <li class="active">
                        <a href="#">1</a>
                      </li>
                       <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a href="#">4</a>
                      </li>
                      <li>
                        <a href="#">5</a>
                      </li>
                      <li class="dotted">
                        <span>...</span>
                      </li>
                      <li class="next">
                        <a href="#">下一页</a>
                      </li>
                    </ul>
                  </div>-->
                </div>
                <!-- 百科 -->
                <div id="baike" :class="'tab-pane '+(type=='baike'?'active':'')">
                  <div class="baike">
                    <p>HTML5 是 HTML 下一个的主要修订版本，现在仍处于发展阶段。广义论及 HTML5 时，实际指的是包括 HTML、CSS 和 JavaScript 在内的一套技术组合。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "~/assets/css/page-sj-qa-tagDetail.css";
import problemApi from "@/api/problem";
import axios from "axios";
export default {
  asyncData({ params }) {
    return axios
      .all([
        problemApi.orderSearch(1, 10,params.id, { orderword: "createtime" })
      ])
      .then(
        axios.spread(function(qaList) {
          return {
            qaList: qaList.data.data,
            label: params.id
          };
        })
      );
  },
  data() {
    return {
      type: "qa", // 默认的列表选择，默认选择问答界面
      qaSort: "createtime",
      page_qa_size: 1,
      page_new: 1,
      page_hot: 1,
      page_wait: 1,
      pageSize: 10
    };
  },
  methods: {
    fechData(type){
      this.type = type;
      
    },
    sortByOrderword(orderword) {
      if (orderword !== undefined && orderword !== null) {
        this.qaSort = orderword;
        problemApi.orderSearch(1, this.pageSize,this.label, { orderword: this.qaSort }).then(res => {
          this.qaList = res.data.data;
        });
      }
    },
    handleCurrentChange(cur) {
      problemApi
        .orderSearch(cur, this.pageSize,this.label, { orderword: this.qaSort })
        .then(res => {
          this.qaList = res.data.data;
        });
    }
  }
};
</script>

