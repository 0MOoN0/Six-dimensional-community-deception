<template>
  <div>
    <div class="wrapper tag-item">
      <div class="fl left-list">
        <div class="tc-data-list">
          <div
            class="tc-list"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="20"
            style="overflow:auto"
          >
            <!-- Exception:会自动触发loadMore直到所有数据加载完 -->
            <ul class="detail-list">
              <li class="qa-item infinite-list-item" v-for="(item,index) in spits" :key="index">
                <div class="fl record">
                  <div class="number">
                    <div class="border useful">
                      <p class="usenum" @click="thumbup(index)">
                        <a class="zan">
                          <i :class="'fa fa-thumbs-up '+item.zan" aria-hidden="true"></i>
                        </a>
                      </p>
                      <p class="zannum">{{item.thumbup}}</p>
                    </div>
                    <div class="border answer">
                      <a href="#" class="star">
                        <i class="fa fa-star-o" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="info">
                  <p class="text">
                    <router-link :to="'/spit/'+item.cid" v-html="item.content"></router-link>
                  </p>
                  <div class="other">
                    <div class="fl date">
                      <span>{{item.publishtime}}</span>
                    </div>
                    <div class="fr remark">
                      <a href="#" data-toggle="modal" data-target="#shareModal" class="share">
                        <i class="fa fa-share-alt" aria-hidden="true"></i> 分享
                      </a>
                      <a @click="dialogVisible=true;content=''" class="comment">
                        <i class="fa fa-commenting" aria-hidden="true"></i>
                        <sapn>{{item.comment}}回复</sapn>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="clearfix"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="fl right-tag">
        <div class="block-btn">
          <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p>
          <router-link class="sui-btn btn-block btn-share" to="/spit/submit">发吐槽</router-link>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div>
      <el-dialog title="评论" :visible.sync="dialogVisible" width="40%">
        <div
          class="quill-editor"
          :content="content"
          @change="onEditorChange($event)"
          v-quill:myQuillEditor="editorOption"
        ></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">提交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import "~/assets/css/page-sj-spit-index.css";
import spitApi from "@/api/spit";
import { getUser } from "@/utils/auth";
export default {
  asyncData() {},
  created() {
    spitApi.search(1, 10, { state: "1", parentid: "-1" }).then(res => {
      res.data.data.rows.map(item => {
        spitApi.isThumbuped(item.cid).then(isThumbupRes => {
          let newSpit = item;
          if (isThumbupRes.data.data == 1) {
            newSpit = {
              ...item,
              zan: "color"
            };
          } else {
            newSpit = {
              ...item,
              zan: ""
            };
          }
          this.spits = this.spits.concat(newSpit);
        });
      });
    });
  },
  data() {
    return {
      pageNo: 1,
      spits: [],
      busy: false,
      dialogVisible: false,
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            [{ size: ["small", false, "large"] }],
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
          ]
        }
      }
    };
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        // console.log("loadmore");
        this.pageNo++;
        spitApi
          .search(this.pageNo, 10, { state: "1", parentid: "-1" })
          .then(res => {
            let tmp = res.data.data.rows.map(item => {
              spitApi.isThumbuped(item.cid).then(isThumbupRes => {
                let newSpit = item;
                if (isThumbupRes.data.data == 1) {
                  newSpit = {
                    ...item,
                    zan: "color"
                  };
                } else {
                  newSpit = {
                    ...item,
                    zan: ""
                  };
                }
                this.spits = this.spits.concat(newSpit);
              });
            });
          });
        this.busy = false;
      }, 2000);
    },
    thumbup(index) {
      //判断用户是否登陆
      if (getUser().name === undefined) {
        this.$message({
          message: "必须登陆才可以点赞哦~",
          type: "warning"
        });
        return;
      }
      if (this.spits[index].zan === "color") {
        this.$message({
          message: "不可以重复点赞哦~",
          type: "warning"
        })
        return
      }
      this.spits[index].zan = "color";
      spitApi.thumbup(this.spits[index].cid).then(res => {
        if (res.data.flag) {
          if (res.data.code === 20000) {
            this.spits[index].thumbup++;
          } else if (res.data.code === 20005) {
            this.$message({
              message: "不可以重复点赞哦~",
              type: "warning"
            })
          }
        }
      });
    }
  }
};
</script>
