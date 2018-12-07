<template>
  <el-menu
    ref="menu"
    :collapse-transition="false"
    :default-openeds="isOpened"
    text-color="#000"
    active-text-color="#000"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
  >
    <el-submenu v-for="module of filteredModules"
                :key="module.name"
                :index="module.name">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span><strong>{{module.name}}</strong> 模块</span>
      </template>

      <el-menu-item v-for="method of module.methods"
                    :key="`${module.name}.${method.name}`"
                    :index="`${module.name}.${method.name}`">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>{{method.name}}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: "list",
    props: {
      filter: String
    },
    data() {
      return {
        modules: this.$api.stub.modules.map(it => ({
          isOpened: false,
          ...it
        }))
      }
    },
    methods: {
      handleOpen(moduleName) {
        this.modules.filter(it => it.name === moduleName).forEach(it => it.isOpened = true);
      },
      handleClose(moduleName) {
        this.modules.filter(it => it.name === moduleName).forEach(it => it.isOpened = false);
      },
      handleSelect(methodName) {
        this.$emit('selected', methodName);
      }
    },
    computed: {
      filteredModules() {
        return this.modules
          .map(module => ({
            isOpened: module.isOpened,
            name: module.name,
            methods: module.methods
              .filter(it => (it.name.toLowerCase().includes(this.filter.trim().toLowerCase())))
              .map(method => ({
                name: method.name
              }))
          }))
          .filter(module => module.methods.length > 0)
      },
      isOpened() {
        if (this.filter !== '') {
          return this.filteredModules.map(it => it.name)
        } else {
          return this.filteredModules.filter(it => it.isOpened).map(it => it.name)
        }
      }
    }
  }
</script>

<style scoped>

</style>
