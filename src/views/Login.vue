<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_container" v-show="showLogin">
        <div class="manage_tip">
          <p>后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"><span>ds</span></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>

</template>

<script>
import { login, getAdminInfo } from '@/api/getData'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            require: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            require: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      showLogin: false
    }
  },
  mounted () {
    this.showLogin = true
    if (!this.adminInfo.id) {
      this.getAdminData()
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    ...mapActions(['getAdminData']),
    async submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await login({ username: this.loginForm.username, password: this.loginForm.password })
          console.info(res)
          if (res.status == 1) {
            this.$message({
              type: 'success',
              message: '登陆成功'
            })
            this.$router.push('manage')
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入正确的用户名或密码',
            offset: 100
          })
          return false
        }
      }
      )
    }
  },
  watch: {
    adminInfo: function (newValue) {
      if (newValue.id) {
        this.$message({
          type: 'success',
          message: '检测到您之前登陆过，将自动登录'
        })
        this.$router.push('manage')
      }
    }
  }
}
</script>

<style scoped>

</style>
