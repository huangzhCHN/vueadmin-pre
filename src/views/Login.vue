<template>
	<el-row type="flex" class="row-bg" justify="center">
    <!-- 左边 -->
    <el-col :xl="6" :lg="7">
      <div class="login-form">
          <h2>欢迎来到VueAdmin管理系统</h2>
          <el-image :src="require('@/assets/MarkerHub.jpg')" style="height: 180px; width: 180px;"></el-image>
          <p>公众号 MarkerHub</p>
          <p>扫码二维码，回复【 VueAdmin 】获取登录密码</p>
      </div>
    </el-col>
    <!-- 中间 -->
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <!-- 右边 -->
    <el-col :xl="6" :lg="7" >
      <el-form label-position="right" :rules="rules" :model="loginForm" label-width="80px" ref="loginForm">
        <el-form-item label="用户名" style="width: 380px;" prop="username">
            <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" style="width: 380px;" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" style="width: 380px;" prop="code">
          <el-input v-model="loginForm.code" style="width: 172px; float: left;" maxlength="5"></el-input>
          <el-image class="captchaImg" :src="captchaImg" @click="getCaptcha"></el-image>
        </el-form-item>
        <el-form-item>
              <el-button type="primary" @click="sumbitForm('loginForm')">登录</el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>

    
    </el-col>
  </el-row>





</template>

<script>
import qs from 'qs'
export default {
  name:'Login',
  data(){
   return {
       loginForm: {
           username: 'admin',
           password: 'makerhub',
           code: '11111',
           token: '',
       },
       rules: {
           username:[
               {required: true, message: '请输入用户名', trigger: 'blur'}
           ],
           password:[
                {required: true, message: '请输入密码', trigger: 'blur'}
           ],
           code:[
               {required: true, message: '请输入验证码', trigger: 'blur'},
               {min: 5, max: 5,message: '长度为 5 个字符',trigger: 'blur'}
           ]
       },
       captchaImg: ''
   }
  },
  methods: {
      sumbitForm(formName) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                 this.$axios.post('/login?'+ qs.stringify(this.loginForm)).then(res => {
                  //const jwt = res.headers['authorization']
                  this.$store.commit('SET_TOKEN', '111')
                  this.$router.push("/index")
                 })
              } else {
                  return false
              }
          });
      },
      resetForm(formName) {
          this.$refs[formName].resetFields();
      },
      getCaptcha() {
          this.$axios.get('/captcha').then(res => {
               this.loginForm.token = res.data.data.token
               this.captchaImg = res.data.data.captchaImg
               this.loginForm.code = ''
            })
      }
  },
  created() {
      this.getCaptcha()
  }
}
</script>

<style scoped>
  .el-row {
    background-color: #fafafa;
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .el-divider {
		height: 200px;
	}

  .captchaImg {
      float: left;
      margin-left: 8px;
      border-radius: 4px;
	}
</style>
