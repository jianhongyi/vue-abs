/*
 * @Author: xuemingli
 * @Date: 2019-04-26 10:30:07
 * @Last Modified by: xuemingli
 * @Last Modified time: 2019-04-28 20:46:21
 */
<!-- 登录页 -->
<template>
  <div class="wrapper">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" class-name="svg"/>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          :key="passwordType"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>

    <!-- Video -->
    <video autoplay loop muted>
      <source src="@/assets/video/bk.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length > 6 || value.length < 4) {
        callback(new Error('密码长度4到6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '11111'
      },
      loginRules: {
        username: [{
          required: true, trigger: 'blur', validator: validateUsername
        }],
        password: [{
          required: true, trigger: 'blur', validator: validatePassword
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  computed: {},

  mounted() {},

  methods: {
    showPwd() {
      if (this.passwordType) {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(value => {
        if (value) {
          this.loading = true
          this.$store.dispatch('loginByUsername', this.loginForm).then((res) => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$notify({
            title: '失败',
            message: '输入内容有误',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .wrapper {
    width: 100vw;
    height: 100vh;
    overflow:hidden;
    display: flex;
    flex-direction: column;
    video {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 100%;
      z-index: -100;
      transform: translateX(-50%) translateY(-50%);
      transition: 1s opacity;
    }
  }
</style>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .wrapper .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.wrapper {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.wrapper {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
