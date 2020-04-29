<template>
  <div>
    <div class="wrapper qa-content">
      <!-- 问题标题信息 -->
      <div class="qa-title">
        <div class="fl title">
          <h2>{{problem.title}}</h2>
          <p>
            <span class="tag" v-for="(pLabel, pIndex) in pLabels" :key="pIndex">{{pLabel.labelname}}</span>
            <!-- <span class="tag">PHPPP</span> -->
            <span class="author">{{problem.nickname}}</span>
            <span>{{problem.createtime | getTimeFormat}}提问 · {{problem.replytime | getTimeFormat}}更新</span>
          </p>
        </div>
        <!-- 分享 -->
        <div class="fr share">
          <h4>分享到：</h4>
          <ul class="share-go">
            <li>
              <img src="~/assets/img/widget-weibo.png" alt />
            </li>
            <li>
              <img src="~/assets/img/widget-weixin.png" alt />
            </li>
          </ul>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="fl left-list">
        <div class="problem-detail">
          <div class="title-intro">
            <div class="sidebar">
              <button
                type="button"
                class="like"
                data-placement="right"
                data-toggle="tooltip"
                title="问题对人有帮助，内容完整，我也想知道答案"
                @click="thumbup(problem.id, 1)"
              >
                <i class="fa fa-caret-up" aria-hidden="true"></i>
              </button>
              <span class="count">{{problem.thumbup}}</span>
              <button
                type="button"
                class="hate"
                data-placement="right"
                data-toggle="tooltip"
                title="问题没有实际价值，缺少关键内容，没有改进余地"
                @click="thumbup(problem.id, -1)"
              >
                <i class="fa fa-caret-down" aria-hidden="true"></i>
              </button>
            </div>
            <!-- 问题详情 -->
            <div class="title">
              <div class="detail">
                <p v-html="problem.content"></p>
              </div>
              <div class="clearfix"></div>
              <!-- 问题操作 -->
              <div class="operate">
                <span class="time">{{problem.createtime | getTimeFormat}}提问</span>
                <span class="comment" @click="isShowProblemCommentBox(0, $event)">评论</span>
                <span class="edit">编辑</span>
                <span class="jubao">举报</span>
              </div>
              <!-- 评论框 -->
              <div class="comment-box" :class="{display: this.pIndex[0]}">
                <form class="comment-form">
                  <textarea row="1" placeholder="使用评论询问更多信息或提出修改意见，请不要在评论里回答问题"></textarea>
                  <button type="submit" class="sui-btn submit-comment">提交评论</button>
                </form>
                <div class="tips">
                  <p>评论支持部分 Markdown 语法：**bold**_italic_[link](http://example.com)> 引用`code`- 列表。 同时，被你 @ 的用户也会收到通知</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 回答详情 -->
          <div>
            <h4 class="answer-num">{{problem.reply}}个回答</h4>
            <div class="answer-intro" v-for="(reply, rIndex) in replys" :key="rIndex">
              <div class="sidebar">
                <button
                  type="button"
                  class="like"
                  data-placement="right"
                  data-toggle="tooltip"
                  title="问题对人有帮助，内容完整，我也想知道答案"
                >
                  <i class="fa fa-caret-up" aria-hidden="true"></i>
                </button>
                <span class="count">{{reply.thumbup}}</span>
                <button
                  type="button"
                  class="hate"
                  data-placement="right"
                  data-toggle="tooltip"
                  title="问题没有实际价值，缺少关键内容，没有改进余地"
                >
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                </button>
              </div>
              <div class="title">
                <p v-html="reply.content"></p>
                <div class="operate">
                  <div class="tool pull-left">
                    <span class="time">{{reply.createtime | getTimeFormat}}回复</span>
                    <span class="comment" @click="isShowReplyCommentBox(rIndex+1, $event)">评论</span>
                    <span class="edit">编辑</span>
                    <span class="jubao">举报</span>
                  </div>
                  <div class="myanswer pull-right">
                    <img src="~/assets/img/widget-photo.jpg" alt />
                    <a href="#">{{reply.nickname}}</a>
                  </div>
                  <div class="clearfix"></div>
                </div>
                <div class="comment-box">
                  <form class="comment-form">
                    <textarea row="1" placeholder="使用评论询问更多信息或提出修改意见，请不要在评论里回答问题"></textarea>
                    <button type="submit" class="sui-btn submit-comment">提交评论</button>
                  </form>
                  <div class="tips">
                    <p>评论支持部分 Markdown 语法：**bold**_italic_[link](http://example.com)> 引用`code`- 列表。 同时，被你 @ 的用户也会收到通知</p>
                  </div>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
          <!-- 回复 -->
          <div class="edit-answer">
            <h4>撰写答案</h4>
            <div class="edit-tip">
              <h4>你正在撰写答案</h4>
              <p>如果你是要对问题或其他回答进行点评或询问，请使用“评论”功能。</p>
            </div>
            <div class="editor">
              <div
                class="quill-editor"
                :content="content"
                @change="onEditorChange($event)"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                v-quill:myQuillEditor="editorOption"
              ></div>
              <div class="btns">
                <button class="sui-btn btn-danger btn-release" @click="save">发布</button>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="fl right-tag">
        <div class="similar-problem">
          <h3 class="title">相似问题</h3>
          <ul class="problem-list">
            <li class="list-item">
              <p class="list-title">求一份浏览器中html css javascript jquery ajax的渲染顺序与原理！！</p>
              <p class="list-info">
                <a href>1 回答</a> | 已解决
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
import "~/assets/css/page-sj-qa-detail.css";
import problemApi from "@/api/problem";
import replyApi from "@/api/qa/reply";
import webutils from "@/utils/webutils";
import axios from "axios";
import { getUser } from "@/utils/auth";
export default {
  asyncData({ params }) {
    return axios
      .all([
        problemApi.findProblemById(params.id),
        problemApi.getLabelsByProblemId(params.id),
        replyApi.findReplysByProblemId({ problemid: params.id }, 1, 10)
      ])
      .then(
        axios.spread(function(problemRes, labelsRes, replyRes) {
          return {
            problem: problemRes.data.data,
            pLabels: labelsRes.data.data,
            replys: replyRes.data.data.rows,
            pIndex: new Array(replyRes.data.data.total + 1).fill("none"),
            pid: params.id
          };
        })
      );
  },
  data() {
    return {
      content: "",
      editorOption: {},
      isEditing: false,
      pojo: {}
    };
  },
  methods: {
    onEditorBlur(editor) {
      // console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      // console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      // console.log("editor ready!", editor);
    },
    onEditorChange({ editor, html, text }) {
      // console.log("editor change!", editor, html, text);
      this.content = html;
    },
    isShowProblemCommentBox(index, event) {
      let commentBox = event.srcElement.parentNode.nextSibling;
      this.pIndex[index] = this.pIndex[index] === "none" ? "block" : "none";
      commentBox.style.display = this.pIndex[index];
    },
    isShowReplyCommentBox(index, event) {
      let commentBox = event.srcElement.parentNode.parentNode.nextSibling;
      this.pIndex[index] = this.pIndex[index] === "none" ? "block" : "none";
      commentBox.style.display = this.pIndex[index];
    },
    thumbup(problemid, thumbup) {
      if (getUser().name === undefined) {
        this.$message({
          message: "必须登陆才可以点赞哦~",
          type: "warning"
        });
        return;
      }
      problemApi.thumbup(problemid, thumbup).then(res => {
        if (res.data.flag) {
          if (res.data.code === 20000) {
            if (thumbup > 0) {
              this.$message({
                message: "点赞成功",
                type: "success"
              });
              this.problem.thumbup++;
            } else {
              this.$message({
                message: "点踩成功",
                type: "success"
              });
              this.problem.thumbup--;
            }
          } else if (res.data.code === 20005) {
            this.$message({
              message: "不可以重复操作哦~",
              type: "warning"
            });
          }
        }
      });
    },
    save() {
      // 判断用户是否登陆
      if (getUser().name === undefined) {
        this.$message({
          message: "必须登陆才可以评论哦~",
          type: "warning"
        });
        return;
      }
      // 封装POJO
      this.pojo.problemid = this.pid;
      this.pojo.content = this.content;
      this.pojo.nickname = getUser().name;
      replyApi.save(this.pojo).then(res => {
        if (res.data.flag) {
          if (res.data.code === 20000) {
            this.$message({
              message: "回答成功",
              type: res.data.flag ? "success" : "error"
            });
            this.$router.go(0);
          } else {
            this.$message({
              message: res.data.message,
              type: res.data.flag ? "success" : "error"
            })
          }
        }
      });
    }
  },
  filters: {
    //时间戳显示格式为几天前、几分钟前、几秒前
    getTimeFormat(valueTime) {
      return webutils.getTimeFormat(valueTime);
    },
    // 格式化创建日期
    formatCreatedTime(milliseconds) {
      return webutils.formatCreatedTime(milliseconds);
    }
  }
};
</script>
<style>
.quill-editor {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
</style>