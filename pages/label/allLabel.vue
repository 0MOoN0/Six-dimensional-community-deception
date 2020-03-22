<template>
  <div class="wrapper all-tags">
    <div class="tags-head">
      <h2 class="tag-title">标签</h2>
      <p class="tag-second">标签是最有效的内容组织形式，正确的使用标签能更快的发现和解决你的问题。</p>
    </div>
    <div class="alltags-card">
      <ul class="yui3-g tags-list" style="display:block;">
        <li class="tag-item yui3-u-1-4" v-for="(item, index) in labelList" :key="index">
          <div class="inner">
            <h5 class="title">
              <router-link tag="a" target="_blank" :to="'/qa/label/'+item.id">
                <a>{{item.labelname}}</a>
              </router-link>
              <!-- <a href="/qa/label/0" target="_blank">{{item.labelname}}</a> -->
            </h5>
            <div class="guanzhu">
              <a class="sui-btn btn-guanzhu color">加关注</a>
              <span class="guannum">
                <i class="num">{{item.fans}}</i>人关注
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import "~/assets/css/page-sj-qa-allTag.css";
import labelApi from "@/api/label";
export default {
  asyncData() {
    return labelApi.getList().then(res => {
      return { labelList: res.data.data };
    });
  }
};
</script>
