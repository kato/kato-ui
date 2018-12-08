<template>
  <el-container class="wrapper">
    <el-header class="header" height="50px">
      <h1 class="title">KatoUI</h1>
    </el-header>
    <el-container class="body">
      <el-aside width="300px" class="aside">
        <div class="filter">
          <el-input
            debounce="200"
            v-model="filter"
            size="medium"
            :clearable="true"
            placeholder="搜索方法/历史"
            prefix-icon="el-icon-search">
          </el-input>
        </div>
        <div style="height: calc(100vh - 130px)">
          <el-tabs v-model="activeName" style="height: 40px" :stretch="true">
            <el-tab-pane name="list"><span slot="label"><i class="el-icon-document"></i> 方法列表</span></el-tab-pane>
            <el-tab-pane name="history"><span slot="label"><i class="el-icon-time"></i> 请求历史</span></el-tab-pane>
          </el-tabs>
          <div style="height: calc(100vh - 170px);">
            <vue-scroll :ops="{bar:{background:'#ff6c37',opacity:0.75,showDelay:700}}">
              <list :filter="filter" @selected="handleSelected" v-show="activeName==='list'"></list>
              <div v-show="activeName==='history'" style="background-color: black;height: 500px">history</div>
            </vue-scroll>
          </div>
        </div>
      </el-aside>
      <el-main class="main">
        <vue-scroll :ops="{
          bar:{
            background:'#ff6c37',
            opacity:0.75,
            showDelay:700
          },
          scrollPanel: {
            scrollingX: false,
          }
        }">
          <div style="background-color: black;height: 500px">
            <div style="width: 1000px"></div>
          </div>
        </vue-scroll>
      </el-main>
    </el-container>
    <el-footer class="footer" height="30px">
      <i class="el-icon-success"> 准备就绪</i>
    </el-footer>
  </el-container>
</template>

<script>
  import list from '../components/list'

  export default {
    name: "Home",
    components: {
      list
    },
    data() {
      return {
        activeName: 'list',
        filter: ''
      }
    },
    methods: {
      handleSelected() {
        console.log(arguments)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../vars";

  .wrapper {
    height: 100%;
    width: 100%;
  }

  .header {
    box-shadow: 0 1px 5px 0 rgba(48, 48, 48, 0.5);
    background-color: #303030;
    display: flex;
    align-items: center;
  }

  .body {
    height: calc(100vh - 80px);
  }

  .aside {
    width: 300px;
    overflow: hidden;
    box-shadow: 1px 0 5px 0 rgba(48, 48, 48, 0.5);
  }

  .filter {
    padding: 0 10px;
    height: 49px;
    display: flex;
    align-items: center;
    background-color: #fafafa;
    border-bottom-width: 1px;
    border-bottom-style: inset;
    border-bottom-color: #c3c3c3;
  }

  .main {
    padding: 0;
  }

  .footer {
    display: flex;
    color: $color-primary;
    align-items: center;
    font-size: small;
    border-top-width: 1px;
    border-top-color: #c7c7c7;
    border-top-style: solid;
    background-color: #fafafa;
  }

  .title {
    color: white;
    margin-left: 20px;
  }

  .title:hover {
    text-shadow: 0 0 10px #656565;
  }
</style>
