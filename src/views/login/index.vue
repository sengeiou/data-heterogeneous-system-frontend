<template>
  <div class="login-container">
    <div  class="login-form">
      <h1>企业数据异构系统</h1>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">欢迎登陆</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"

          />
<!--          @keyup.enter.native="handleLogin"-->
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

      </el-tooltip>

      <el-form-item
        :rules="{required: true, message: '公司不能为空', trigger: 'blur'}"
      >
        <el-input
          ref="cid"
          placeholder="请选择公司"
          v-model="company"
          name="cid"
          type="text"
          :disabled="true"
          style="width: 70%; "

        />
        <el-button type="warning" @click="dialogFormVisible = true" style="width: 30%">选择公司</el-button>
      </el-form-item>

      <div style="margin-bottom: 20px">
        * 推荐测试账号（有样本数据）：<br>
        用户名：deltaqin
        密码：deltaqin
        公司名：deltaqin<br>
      </div>

      <div>
        <el-button id="main" :loading="loading" type="primary" style="width: 100%;background: #505458;border: none" @click.native.prevent="handleLogin">立即登陆</el-button>
      </div>
      <br>
      <div>
        <el-button id="second" :loading=false type="primary" style="width: 100%;background: #505458;border: none" @click="gotoRegister">还没有账号？立即注册 >></el-button>
      </div>

    </el-form>
    </div>
    <el-dialog title="选择公司" :visible.sync="dialogFormVisible">
        <el-input v-model="company" placeholder="公司名字" style="width: 200px;" class="filter-item" />
        <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">
          搜索
        </el-button>
      <el-table :data="gridData">
        <el-table-column property="id" label="公司id"></el-table-column>
        <el-table-column property="name" label="公司名"></el-table-column>
        <el-table-column label="选择">
          <template slot-scope="scope">
            <el-button
              size="primary"
              @click="choose(scope.$index,scope.row)">选 择
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        class="showPage"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="pageNum"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-size="pageSize"
        :page-sizes="[1, 10, 20, 50]"
        :total='total'>
      </el-pagination>
    </el-dialog>
    <v-tour name="myTour" :steps="steps"  :options="myOptions"></v-tour>

  </div>
</template>

<script>

import {get} from "@/utils/request";

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value || value.length === 0) {
        callback(new Error('用户名不能为空！'))
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
    const validateCompany = (rule, value, callback) => {
      if (!value || value.length === 0) {
        callback(new Error('公司不能为空！'))
      } else {
        callback()
      }
    }
    return {
      steps: [
        {
          target: '#main',
          content: '请使用个人账号而不是企业账号登录，没有个人账号请在下方创建',
          params: {
            placement: 'left',
            // highlight: true   //不显示
          }
        },
        {
          target: '#second',
          content: '使用公司信息注册个人账号',
          params: {
            placement: 'right',
            // highlight: true   //不显示
          }
        }

      ],
      myOptions: {
        // useKeyboardNavigation: false,
        startTimeout: 100,
        highlight: true,
        labels: {
          buttonSkip: '跳过',
          buttonPrevious: '上一步',
          buttonNext: '下一步',
          buttonStop: '关闭'
        },
      },
      company: "",
      pageNum:1,
      pageSize:10,
      total: 0,
      formLabelWidth: '120px',
      gridData: [],
      dialogFormVisible: false,
      loginForm: {
        username: '',
        password: '',
        cid: 0
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        company: [{ required: true, trigger: 'blur', validator: validateCompany }]
      },
      capsTooltip: false,
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  mounted: function () {
    this.$tours['myTour'].start()
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.fetchData()
    },
    choose(index) {
      this.dialogFormVisible = false
      console.log('fuck',this.gridData[index].id)
      this.loginForm.cid = this.gridData[index].id
      this.company = this.gridData[index].name
    },
    fetchData(){
      console.log(this.company)
      const t = this
      this.listLoading = true
      get('/sys-user/company/'+this.company,{pageNum:this.pageNum, pageSize: this.pageSize})
        .then(resp =>{
          console.log(resp)
          this.gridData = resp.list;
          t.total = parseInt(resp.total)
        })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    gotoRegister(){
      this.$router.replace('/register')
    },
    handleLogin() {
      console.log(this.loginForm)
      if (this.company == ''){
        this.$message({
          message: '请输入公司！',
          type: 'warning'
        });
        return
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          console.log(this.loginForm)

          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
            this.$message({
              message: '登陆成功！',
              type: 'success'
            });
            this.$store.dispatch('user/addCompany', { company: this.company })
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          })
            .catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
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
  text-align: center;
  line-height: 20px;
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

}





.login-container {
  background:linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(http://res.deltaqin.com/20201012174750.jpg) no-repeat center center;
  width:100%;
  background-size:cover;
  height: 100vh;


  .login-form {

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
