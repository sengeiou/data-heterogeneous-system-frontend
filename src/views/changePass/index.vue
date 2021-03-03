<template>
  <body id="poster">
  <el-container>
    <el-form :model="changeForm" :rules="rules" ref="changeForm"
             class="register-container" label-position="left"
             label-width="0px">
      <h3 class="register_title">修改密码</h3>
      <el-form-item prop="username">
        <el-input type="username" v-model="changeForm.username"
                  auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="oldPassword">
        <el-input type="password" v-model="changeForm.oldPassword" show-password
                  auto-complete="off" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input type="nickName" v-model="changeForm.newPassword" show-password
                  auto-complete="off" placeholder="请设置新密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="commitPass('changeForm')">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-container>
  </body>
</template>


<style>
  #poster {
    background:linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(http://res.deltaqin.com/20201012174750.jpg) no-repeat center center;
    width:100%;
    background-attachment: fixed;
    /*height:100vh;*/
    background-size:cover;
    /* background-image:  radial-gradient(#006aff, #000a39 60%); */
    /*50 = navbar  */
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    /* background-size:100% 100%; */
  }

body{
  margin: 0px;
}
.register-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 500px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.register_title {
  font-size: 26px;
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.el-header {
  position: fixed;
  top:0px;
  left:0;
  right: 0;
  background-color: #FFCC00;
  color: #333;
  text-align: center;
  line-height: 60px;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>

<script>
import { post } from '@/utils/request'
export default {
  name: 'changePass',
  data(){
    const validateOldPass = (rule, value, callback) => {
      if(value == ''){
        callback(new Error('请输入旧密码！'))
      } else if(value.length < 6){
        callback(new Error('密码长度不小于6位！'))
      } else{
        callback()
      }
    }
    const validateNewPass = (rule, value, callback) => {
      if(value == ''){
        callback(new Error('请设置新密码！'))
      } else if(value.length < 6){
        callback(new Error('密码长度不小于6位！'))
      } else if(value == this.changeForm.oldPassword){
        callback(new Error('新密码不能与旧密码一致！'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if(value == ''){
        callback(new Error('用户名不能为空！'))
      } else{
        callback()
      }
    }

    return{
      responseResult: [],
      loading: false,
      changeForm: {
        username:'',
        oldPassword: '',
        newPassword:'',
      },
      rules: {
        oldPassword: [
          { required: true, trigger: 'blur', validator: validateOldPass }
        ],
        newPassword: [
          { required: true, trigger: 'blur', validator: validateNewPass }
        ],
        username:[
          { required: true, trigger: 'blur', validator: validateUsername },
        ],
      },
    }
  },
  methods:{
    test(){
      alert('test')
    },
    commitPass (formName){
      const t = this

      this.$refs[formName].validate((valid) => {
        console.log('valid', valid)
        if (valid) {
          post('/sys-user/admin/updatePassword',{
            newPassword: t.changeForm.newPassword,
            oldPassword: t.changeForm.oldPassword,
            username: t.changeForm.username
          })
            .then(resp => {
              t.$message({
                message: '修改成功！',
                type: 'success'
              });
              t.$router.push('/')
            })
            .catch(err => console.log(err))
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>
<style scoped>
</style>
