<template>
  <div>
    <div class="header">
      <div class="header-wrapper">
        <div style="width:100%;margin-right: 10px;">
          <el-input
            :placeholder="`${this.baseUrl}${stub.module.name}/${stub.method.name}.ac`"
            disabled>
            <template slot="prepend">方法请求地址</template>
            <template slot="append">POST请求</template>
          </el-input>
        </div>
        <div>
          <el-button v-if="!isLoading"
                     type="primary"
                     icon="el-icon-sort"
                     @click="handleClick">
            发起请求
          </el-button>
          <el-button v-if="isLoading"
                     type="warning"
                     icon="el-icon-loading"
                     disabled>
            正在请求
          </el-button>
        </div>
      </div>
    </div>
    <div class="body">
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
        <params></params>
        <result></result>
      </vue-scroll>
    </div>

  </div>
</template>

<script>
  import params from './params'
  import result from './result'

  export default {
    name: "invoker",
    props: ['stub'],
    components: {
      params,
      result
    },
    data() {
      const location = window.location;
      const baseUrl = `${location.protocol}//${location.host}${this.stub.baseUrl}`;
      return {
        isLoading: false,
        baseUrl
      }
    },
    methods: {
      handleClick() {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 5000)
      }
    }
  }
</script>

<style scoped>
  .header {
    width: 100%;
    box-shadow: 0 1px 5px 0 rgba(48, 48, 48, 0.3);
    background-color: #fafafa;
  }

  .header-wrapper {
    min-width: 600px;
    height: 60px;
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .body {
    width: 100%;
    height: calc(100vh - 186px);
  }
</style>
