<template>
  <div>
    <div class="tab-nav">
      <div class="wrapper">
        <ul class="fl sui-nav nav-tabs navbar-dark">
          <router-link tag="li" active-class="active" to="/qa/" exact>
            <a>首页</a>
          </router-link>
          <router-link
            tag="li"
            active-class="active"
            :to="'/qa/label/'+label.id"
            v-for="(label,index) in labelList"
            :key="index"
          >
            <a>{{label.labelname}}</a>
          </router-link>
        </ul>
        <span class="fr more">
          <router-link tag="a" to="/label/allLabel"  target="_blank" exact>
            <a>更多</a>
          </router-link>
        </span>
        <div class="clearfix"></div>
      </div>
    </div>
    <nuxt-child />
  </div>
</template>
<script>
import labelApi from "@/api/label";
export default {
  asyncData() {
    return labelApi.toplist().then(res => {
      return { labelList: res.data.data };
    });
  }
};
</script>
