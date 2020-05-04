<template>
  <div class="wrapper release-tc">
    <div class="release-box">
      <h3>发布文章：</h3>
      <el-row :gutter="20">
        <el-col :span="16">
          <h4>文章信息:</h4>
          <div style="margin-top: 5px">
            <el-switch
              style="display: block"
              v-model="ispublic"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="公开"
              inactive-text="不公开"
            ></el-switch>
          </div>
          <div style="margin-top: 5px">
            <el-input placeholder="一句话说清问题" v-model="input_title" clearable>
              <template slot="prepend">标题</template>
            </el-input>
          </div>
          <div style="margin-top: 5px">
            <el-select
              v-model="input_channel"
              multiple-limit="1"
              filterable
              default-first-option
              clearable
              placeholder="请选择频道"
              style="width:100%"
            >
              <el-option
                v-for="channel in channels"
                :key="channel.id"
                :label="channel.name"
                :value="channel.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <h4>上传封面:</h4>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>

      <div class="editor" style="margin-top: 5px">
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
          <button class="sui-btn btn-danger btn-release" @click="save">发布文章</button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>
<script>
import "~/assets/css/page-sj-headline-submit.css";
import channelApi from "@/api/article/channel";
import articleApi from "@/api/article/article";
import { getUser } from "@/utils/auth";
import { quillRedefine } from "vue-quill-editor-upload";
export default {
  data() {
    return {
      content: '',
      editorOption: {},
      input_title: '',
      input_channel: '',
      channels: [],
      ispublic: true
    };
  },
  created() {
    this.editorOption = quillRedefine({
      uploadConfig: {
        // 上传路径
        action: "http://localhost:3000/upload",
        res: response => {
          return response.info;
        },
        name: "img" //图片上传参数
      }
    });
    channelApi.findSearch({ state: "1" }).then(channelRes => {
      this.channels = channelRes.data.data;
    });
  },
  mounted() {
    // console.log("app init, my quill insrance object is:", this.myQuillEditor);
  },
  methods: {
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
    onEditorChange({ editor, html, text }) {
      console.log("editor change!", editor, html, text);
      this.content = html;
    },
    save() {
      //判断用户是否登陆
      if (getUser().name === undefined) {
        this.$message({
          message: "必须登陆才可以发布文章哦~",
          type: "warning"
        });
        return;
      }
      let article = {};
      article.title = this.input_title;
      article.content = this.content;
      article.nickname = getUser().name;
      article.channelid = this.input_channel;
      article.ispublic = this.ispublic ? "1" : "0";
      console.log(article);
      articleApi.save(article).then(res => {
        this.$message({
          message: res.data.message,
          type: res.data.flag ? "success" : "error"
        });
        if (res.data.flag) {
          this.$router.push("/article/" + res.data.data);
        }
      });
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 78px;
  display: block;
}
</style>