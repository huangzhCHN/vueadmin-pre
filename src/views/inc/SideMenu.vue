<template>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <router-link to="/index">
            <el-menu-item index="Index" @click="selectMenu({name: 'Index', title: '首页'})">
                <template slot="title">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </template>
            </el-menu-item>
      </router-link>
      <el-submenu :index="item.id+''" :key="item.id" v-for="item in menuList">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <router-link :to="menu.path" :key="menu.id" v-for="menu in item.children">
            <el-menu-item :index="menu.id+''" @click="selectMenu(menu)">
                <template slot="title">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{menu.title}}</span>
                </template>
            </el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
  name:'SideMenu',
  data(){
   return {
       menuList: this.$store.state.menus.menuList
   }
  },
  methods: {
      selectMenu(menu) {
        let obj = {
          title: menu.title,
          name: menu.name
        }
        this.$store.commit('addTabs',obj)
      }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo {
    height: 100%;
  }
  a {
    text-decoration: none;
  }
</style>
