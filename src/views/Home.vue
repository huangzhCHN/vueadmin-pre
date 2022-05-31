<template>
    <el-container>
        <el-aside width="200px">
            <SideMenu></SideMenu>
        </el-aside>
        <el-container>
            <el-header style="height: 55px;">
                <Strong>ManHub后台管理系统</Strong>
                <div class="header-avatar">
                    <el-avatar :size="medium" :src="userInfo.avatar"></el-avatar>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <router-link :to="{name: 'UserCenter'}">个人中心</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-link href="https://markerhub.com" target="_blank">网站</el-link>
                    <el-link href="https://space.bilibili.com/13491144" target="_blank">B站</el-link>
                </div>
            </el-header>
            <el-main>
                <div style="margin: 0 15px;">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import SideMenu from './inc/SideMenu.vue'
export default {
  name:'Home',
  data(){
   return {
       userInfo: {
           id: '-1',
           username: 'admin',
           avatar: 'https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg'
        }
   }
  },
  methods: {
      getUserInfo() {
          this.$axios.get('/sys/userInfo').then(res => {
              this.userInfo = res.data.data;
          })
      },
      logout() {
        this.$axios.post('/logout').then(() => {
            localStorage.clear()
            sessionStorage.clear()
            this.$store.commit("resetState")
            this.$router.push("/login")
        })
      }
  },
  created() {
      this.getUserInfo()
  },
  components: {
      SideMenu
  }
}
</script>

<style scoped>
  .el-container {
    padding: 0;
    margin: 0;
    height: 100%;
  }
  .el-header {
    background-color: #17B3A3;
    text-align: center;
    line-height: 60px;
  }
  .header-avatar {
    float: right;
    width: 225px;
    height: 100%;
    display:flex;
    align-items: center;
  }
  .header-avatar > *{
    padding-left: 3px;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }
</style>
