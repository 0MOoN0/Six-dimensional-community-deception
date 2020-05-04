<template>
  <div class="wrapper release-tc">
    <div class="release-box">
      <h3>发布问答</h3>
      <div>
        <el-input placeholder="一句话说清问题，用问号结尾" v-model="input_title" clearable>
          <template slot="prepend">标题</template>
        </el-input>
      </div>
      <div>
        <el-select
          v-model="input_label"
          multiple
          filterable
          default-first-option
          clearable
          placeholder="请选择问题标签"
          style="width:100%"
        >
          <el-option
            v-for="label in labels"
            :key="label.id"
            :label="label.labelname"
            :value="label.id"
          ></el-option>
        </el-select>
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
          <button class="sui-btn btn-danger btn-release" @click="save">发布问答</button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>
<script>
import "~/assets/css/page-sj-qa-submit.css";
import "~/assets/css/page-sj-spit-submit.css";
import replyApi from "@/api/qa/reply";
import labelApi from "@/api/label";
import problemApi from "@/api/problem";
import { getUser } from "@/utils/auth";
import { quillRedefine } from "vue-quill-editor-upload";
export default {
  data() {
    return {
      content: "",
      editorOption: {},
      input_title: "",
      input_label: [],
      labels: []
    };
  },
  created() {
    this.editorOption = quillRedefine({
      uploadConfig: {
        action: "http://localhost:3000/upload",
        res: response => {
          return response.info;
        },
        name: "img" //图片上传参数
      }
    });
    labelApi.getList().then(labelRes => {
      this.labels = labelRes.data.data;
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
          message: "必须登陆才可以发布问题哦~",
          type: "warning"
        });
        return;
      }      
      let problem = {};
      problem.title = this.input_title;
      problem.content = this.content;
      problem.nickname = getUser().name;
      problem = { ...problem, labels: this.input_label };
      console.log(problem)
      problemApi.save(problem).then(res => {
        this.$message({
          message: res.data.message,
          type: res.data.flag ? "success" : "error"
        });
        if (res.data.flag) {
          this.$router.push('/qa/'+res.data.data);
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
</style>