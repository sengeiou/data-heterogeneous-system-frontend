<template>
  <div class="login-container">
    <div class="register-form">
      <h1>企业数据异构系统</h1>
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules"  auto-complete="on" label-position="left">

        <div class="title-container">
          <h3 class="title" >欢迎注册企业账号</h3>
        </div>

        <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
          <el-input
            ref="username"
            v-model="registerForm.username"
            placeholder="请输入公司名"
            type="text"
            tabindex="1"
            auto-complete="off"
            name="username"
          />
        </el-form-item>

        <el-form-item prop="password">
      <span class="svg-container">
        <svg-icon icon-class="password" />
      </span>
          <el-input
            v-model="registerForm.password"
            placeholder="请输入公司密码"
            type="text"
            tabindex="1"
            auto-complete="off"
            name="password"
          />
        </el-form-item>

        <div>
          <el-button id="main" :loading="loading" type="primary" style="width: 100%;background: #505458;border: none" @click.native.prevent="handleSignIn">注册</el-button>
        </div>
        <div style="margin-top: 20px;">
          <el-button id="second" type="primary" style="width: 100%;background: #505458;border: none" @click.native.prevent="gotoLogin">去登陆</el-button>
        </div>
      </el-form>
    </div>
    <v-tour name="myTour" :steps="steps"  :options="myOptions"></v-tour>

  </div>
</template>

<script>

import * as company from "@/api/user";

export default {
  name: 'registerCompany',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value || value.length === 0) {
        callback(new Error('公司名不能为空！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value || value.length === 0) {
        callback(new Error('密码不能为空！'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      registerForm:{
        username:'',
        password: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      steps: [
        {
          target: '#main',
          content: '每个企业注册账号之后，需要公司员工使用企业密码去注册自己的账号再登录',
          params: {
            placement: 'left',
            highlight: true   //不显示
          }
        },
        {
          target: '#second',
          content: '试用可以直接点击此处',
          params: {
            placement: 'right',
            highlight: true   //不显示
          }
        }

      ],
      myOptions: {
        // useKeyboardNavigation: false,
        startTimeout: 100,
        // highlight: true,
        labels: {
          buttonSkip: '跳过',
          buttonPrevious: '上一步',
          buttonNext: '下一步',
          buttonStop: '关闭'
        },
      },
    }
  },
  mounted: function () {
    this.$tours['myTour'].start()
  },
  methods: {
    showPwd() {
    },
    handleSignIn() {
      this.loading = true
      const buf = {
        name:this.registerForm.username,
        password:this.registerForm.password
      }
      this.$refs.registerForm.validate(valid => {
        if (valid){
          console.log(111)
          company.companySignIn(buf).then(resp => {
            this.loading = false
            if(resp.code == 200){
              this.$message({
                type: 'success',
                message: '注册成功!'
              });
              this.$router.push({path:'/login'})
            }else{
              this.$message({
                type: 'error',
                message: '注册失败'
              });
            }
          })
        }else {
          console.log(222)
        }
      })
      this.loading = false
    },
    gotoLogin(){
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */


$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}


@font-face {
  font-family: mengxiangFont;
  src: url(../../font/RuiZiRuiXianMengXiangHeiJianV1-0-1.ttf);
}

h1 {
  /*height: 0.6rem;*/
  /*<!--top: 20%;-->*/
  /*<!--left: 50%;-->*/
  /*<!--transform: translate(-50%, -50%);-->*/
  /*margin-top: 20px;*/
  font-family: "mengxiangFont";
  color: #000;
  line-height: 20px;
  text-align: center;
  font-size: 35px;
  font-weight: 400;
  /*position: absolute;*/
  a {
    color: #fff;
    text-decoration: none;
    margin: 0 0.125rem;
  }
}

/*body{*/
/*  margin: 0px;*/
/*}*/

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    padding-left: 5px;
    padding-right: 5px;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000000;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  /*.el-form-item {*/
  /*  border: 1px solid rgba(255, 255, 255, 0.1);*/
  /*  background: rgba(0, 0, 0, 0.1);*/
  /*  border-radius: 5px;*/
  /*  color: #454545;*/
  /*}*/
}





.login-container {
  background:linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(http://res.deltaqin.com/20201012174750.jpg) no-repeat center center;
  width:100%;
  background-size:cover;
  height: 100vh;


  .register-form {

    border-radius: 15px;
    background-clip: padding-box;
    width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
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

    /* .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    } */
    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
      font-weight:bold;
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

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
