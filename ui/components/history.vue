<template>
  <div>
    <div style="margin-top: 200px;display: flex;justify-content: center">
      <div class="error-info">
        <i style="font-size: 40px" class="el-icon-warning"></i>
        <p>
          <small>暂无历史请求</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "history"
  }
</script>

<style scoped lang="scss">
  @import "../vars";

  .error-info {
    text-align: center;
    color: $color-primary;
  }
</style>
