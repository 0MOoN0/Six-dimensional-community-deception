<template>
  <div>
    <div class="wrapper headline-content">
      <div class="fl left-list">
        <div class="problem-detail">
          <!-- 文章内容 -->
          <div class="title-intro">
            <h2>{{article.title}}</h2>
            <div class="operate">
              <span class="fl author">
                发布者发布
                <span class="time">{{article.createtime | formatCreatedTime}}</span>
              </span>
              <span class="fr">收藏</span>
            </div>
            <div class="clearfix"></div>
            <div class="content" v-html="article.content"></div>
          </div>
          <!-- 评论内容 -->
          <div class="answer-intro">
            <h4 class="answer-num">{{article.comment}}条评论</h4>
            <div class="comment-box">
              <form class="comment-form sui-form form-inline">
                <img src="~/assets/img/widget-photo.jpg" alt />
                <div class="input-prepend input-append input-box">
                  <input
                    id="appendedPrependedInput"
                    type="text"
                    class="span2 input-fat real-box"
                    placeholder="写下你的评论"
                  />
                  <span class="add-on">提交</span>
                </div>
              </form>
            </div>
            <div class="remark-list">
              <ul class="lists">
                <li class="item">
                  <div class="fl img">
                    <img src="~/assets/img/widget-photo.jpg" alt />
                  </div>
                  <div class="fl text">
                    <p class="author">
                      <span class="name">luckness</span> 发布
                    </p>
                    <p
                      class="word"
                    >内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？</p>
                    <p class="tool">
                      <a class="callback">回复</a>&nbsp;
                      <span class="remark-num">26条回复</span>
                    </p>
                  </div>
                  <div style="clear:both"></div>
                  <div class="edit-box">
                    <form class="comment-form">
                      <textarea row="1" placeholder="使用评论询问更多信息或提出修改意见，请不要在评论里回答问题"></textarea>
                      <button type="submit" class="sui-btn submit-comment">提交评论</button>
                    </form>
                  </div>
                  <ul class="inner-list">
                    <li class="item">
                      <div class="fl img">
                        <img src="~/assets/img/widget-photo.jpg" alt />
                      </div>
                      <div class="fl text">
                        <p class="author">
                          <span class="name">luckness</span> 发布
                        </p>
                        <p class="word">内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？</p>
                        <p class="tool">
                          <a class="callback">回复</a>&nbsp;
                          <span class="remark-num">26条回复</span>
                        </p>
                      </div>
                      <div style="clear:both"></div>
                      <div class="edit-box">
                        <form class="comment-form">
                          <textarea row="1" placeholder="使用评论询问更多信息或提出修改意见，请不要在评论里回答问题"></textarea>
                          <button type="submit" class="sui-btn submit-comment">提交评论</button>
                        </form>
                      </div>
                    </li>
                  </ul>
                </li>
                <li class="item">
                  <div class="fl img">
                    <img src="~/assets/img/widget-photo.jpg" alt />
                  </div>
                  <div class="fl text">
                    <p class="author">
                      <span class="name">luckness</span> 发布
                    </p>
                    <p
                      class="word"
                    >内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？内推我吧，条件一样，还要人么？</p>
                    <p class="tool">
                      <a class="callback">回复</a>&nbsp;
                      <span class="remark-num">26条回复</span>
                    </p>
                  </div>
                  <div style="clear:both"></div>
                  <div class="edit-box">
                    <form class="comment-form">
                      <textarea row="1" placeholder="使用评论询问更多信息或提出修改意见，请不要在评论里回答问题"></textarea>
                      <button type="submit" class="sui-btn submit-comment">提交评论</button>
                    </form>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 右边标签栏 -->
      <div class="fl right-tag">
        <div class="focus similar-problem">
          <!-- 发布者信息 -->
          <div class="img-title">
            <div class="fl img">
              <img src="~/assets/img/widget-photo.jpg" alt />
            </div>
            <div class="fl btn-focus">
              <h4>{{article.nickname}}</h4>
              <button class="sui-btn btn-info btn-attention">关注</button>
            </div>
            <div class="clearfix"></div>
          </div>
          <ul class="problem-list">
            <li class="list-item">
              <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
            </li>
          </ul>
        </div>
        <!-- 热门推荐 -->
        <div class="similar-problem">
          <h3 class="title">热门推荐</h3>
          <ul class="problem-list">
            <li class="list-item" v-for="(rarticle,raindex) in recommendArticle" :key="raindex">
              <nuxt-link :to="`/article/`+rarticle.id" target="_blank">
                <p class="list-title">{{rarticle.title}}</p>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <!-- 热门吐槽 -->
        <div class="similar-problem">
          <h3 class="title">热门吐槽</h3>
          <ul class="problem-list">
            <li class="list-item">
              <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
import "~/assets/css/page-sj-headline-detail.css";
import articleApi from "@/api/article/article";
import axios from "axios";
import webutils from "@/utils/webutils";
export default {
  asyncData({ params }) {
    return axios
      .all([
        articleApi.findById(params.id),
        // 选择非置顶、审核通过、文章公开的文章推荐
        articleApi.search(1, 5, { istop: "0", state: "1", ispublic: "1" })
      ])
      .then(
        axios.spread(function(articleRes, recommendArticleRes) {
          return {
            article: articleRes.data.data,
            recommendArticle: recommendArticleRes.data.data.rows
          };
        })
      );
    return {
      id: params.id
    };
  },
  data() {
    return {
      pojo: {}
    };
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