<template>
  <div>
    <!--正常结果的显示-->
    <vue-json-pretty
      v-if="result!==undefined && !isError"
      :deep="1"
      :showLength="true"
      :data="result">
    </vue-json-pretty>
    <!--异常的显示-->
    <div v-if="result!==undefined && isError">
      <strong>
        <small>调用结果异常,异常信息如下:</small>
      </strong>
      <vue-json-pretty
        style="margin-top: 10px"
        :data="{code:result.code,message:result.message}">
      </vue-json-pretty>
      <div v-if="result.remoteStack" class="stack">
        <el-collapse>
          <el-collapse-item>
            <template slot="title">
              <div class="title">
                <i class="header-icon el-icon-info"> 远程服务堆栈信息</i>
              </div>
            </template>
            <pre style="color: crimson">{{result.remoteStack}}</pre>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div v-if="result===undefined"
         style="margin-top: 20px;display: flex;justify-content: center">
      <div class="error-info">
        <i style="font-size: 40px" class="el-icon-warning"></i>
        <p>
          <small>没有返回值</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import VueJsonPretty from 'vue-json-pretty'

  export default {
    name: "result",
    props: ['result'],
    components: {
      VueJsonPretty
    },
    computed: {
      isError() {
        return this.result instanceof Error;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../vars";

  .error-info {
    text-align: center;
    color: $color-primary;
  }

  .stack {
    margin-top: 20px;
    border-width: 1px;
    border-style: solid;
    border-color: #ebeef5;

    .title {
      padding-left: 10px;
    }

    pre {
      margin: 10px;
    }
  }
</style>
