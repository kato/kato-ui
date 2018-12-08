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
              <list v-show="activeName==='list'" :filter="filter" @selected="handleSelected"></list>
              <history v-show="activeName==='history'"></history>
            </vue-scroll>
          </div>
        </div>
      </el-aside>
      <el-main class="main">
        <div v-if="tabs.length===0" style="margin-top: 200px;display: flex;justify-content: center">
          <div class="error-info">
            <i style="font-size: 40px" class="el-icon-warning"></i>
            <p>
              <small>点击左侧列表项发起请求</small>
            </p>
          </div>
        </div>
        <el-tabs
          v-if="tabs.length>0"
          type="card"
          v-model="activeTab"
          @tab-remove="handleRemove"
          :closable="true">
          <el-tab-pane v-for="tab of tabs"
                       :key="`${tab.type}-${tab.module.name}.${tab.method.name}`"
                       :name="`${tab.type}-${tab.module.name}.${tab.method.name}`">
            <span v-if="tab.type==='method'" slot="label">
              <i class="el-icon-tickets"></i>
              {{tab.module.name}}.{{tab.method.name}}
            </span>
            <span v-if="tab.type==='history'" slot="label">
              <i class="el-icon-time"></i>
              {{tab.module.name}}.{{tab.method.name}}
            </span>
            <invoker :stub="tab"></invoker>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <el-footer class="footer" height="30px">
      <i class="el-icon-success"> 准备就绪</i>
    </el-footer>
  </el-container>
</template>

<script>
  import list from '../components/list'
  import history from "../components/history";
  import invoker from '../components/invoker'

  export default {
    name: "Home",
    components: {
      history,
      list,
      invoker
    },
    data() {
      return {
        activeName: 'list',
        filter: '',
        activeTab: '',
        tabs: []
      }
    },
    methods: {
      handleSelected(moduleAndMethodName) {
        if (this.tabs.filter(it => {
          return it.type === 'method' && `${it.module.name}.${it.method.name}` === moduleAndMethodName
        }).length <= 0) {
          const [moduleName, methodName] = moduleAndMethodName.split('.');
          const module = this.$api.stub.modules.filter(it => it.name === moduleName)[0];
          if (module) {
            const method = module.methods.filter(it => it.name === methodName)[0];
            if (method) {
              this.tabs.push({
                type: 'method',
                module,
                method,
                baseUrl: this.$api.baseUrl
              })
            }
          }
        }

        this.activeTab = `method-${moduleAndMethodName}`
      },
      handleRemove(tabName) {
        const tabs = this.tabs;
        if (this.activeTab === tabName) {
          tabs.forEach((tab, index) => {
            if (`${tab.type}-${tab.module.name}.${tab.method.name}` === tabName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab)
                this.activeTab = `${nextTab.type}-${nextTab.module.name}.${nextTab.method.name}`;
            }
          });
        }

        this.tabs = tabs.filter(tab => `${tab.type}-${tab.module.name}.${tab.method.name}` !== tabName);
      }
    }
  }
</script>

<style lang="scss">
  .main {
    .el-tabs__nav-scroll {
      margin-left: 10px;
      margin-right: 10px;
    }

    .el-tabs__item {
      border-bottom: none !important;
    }

    .is-active {
      background-color: #fafafa;
    }

    .el-tabs__header {
      margin: 0
    }
  }
</style>

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
    padding: 5px 0 0;
  }

  .error-info {
    text-align: center;
    color: $color-primary;
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
