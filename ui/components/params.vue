<template>
  <div>
    <div v-if="value.length!==0">
      <table>
        <tr>
          <th style="width: 50px"></th>
          <th>参数名</th>
          <th>值</th>
        </tr>
        <tr v-for="param of value"
            :key="param.name"
            style="height: 40px">
          <td style="text-align: center">
            <el-checkbox
              v-model="param.isSelected">
            </el-checkbox>
          </td>
          <td style="text-align: center;font-weight: bolder">{{param.name}}</td>
          <td>
            <el-input v-model="param.value"></el-input>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="value.length===0"
         style="margin-top: 20px;display: flex;justify-content: center">
      <div class="error-info">
        <i style="font-size: 40px" class="el-icon-warning"></i>
        <p>
          <small>该方法无需参数</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "params",
    props: ['value']
  }
</script>

<style scoped lang="scss">
  @import "../vars";

  .error-info {
    text-align: center;
    color: $color-primary;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  td, th {
    word-wrap: break-word;
    font-size: 1em;
    border: 1px solid #ebeef5;
    padding: 3px 7px 2px 7px;
  }

  th {
    font-size: 13px;
    word-wrap: break-word;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 4px;
    background-color: #c8c8c8;
    color: #ffffff;
  }
</style>
