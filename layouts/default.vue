<template>
  <el-container class="layout-wrap">
    <el-aside width="auto" class="layout-nav-wrap">
      <i
        :class="[
          'layout-collapse-btn',
          isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'
        ]"
        @click="handleToggleOpen"
      />
      <el-menu
        class="layout-nav"
        :router="true"
        :collapse-transition="false"
        :collapse="isCollapse"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home" />
          <span slot="title">Home</span>
        </el-menu-item>
        <el-menu-item index="/translate">
          <i class="el-icon-document" />
          <span slot="title">Translate</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="layout-main"><nuxt /></el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
class Home extends Vue {
  isCollapse: boolean = true;

  handleToggleOpen() {
    this.isCollapse = !this.isCollapse;
  }
}
export default Home;
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
ul {
  list-style: none;
  padding: 0;
}
.layout-wrap {
  min-height: 100vh;
}
.layout-nav-wrap {
  display: flex;
  flex-direction: column;
}
.layout-nav {
  flex: 1;
}
.layout-collapse-btn {
  text-align: center;
  display: block;
  cursor: pointer;
  border-right: solid 1px #e6e6e6;
  border-bottom: solid 1px #e6e6e6;
  line-height: 48px;
}
.layout-main {
  padding: 0;
}
</style>
