<template>
  <div id="poster">
    <body >
  <!--  <el-container>-->
      <el-form :model="registerForm" :rules="rules" ref="registerForm"
               class="register-container" label-position="left"
               label-width="0px">
        <h3 class="register_title">用户注册</h3>
        <el-form-item prop="email">
          <el-input type="phone" v-model="registerForm.email"
                    auto-complete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input type="phone" v-model="registerForm.phone"
                    auto-complete="on" placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input type="text" v-model="registerForm.code"  placeholder="请输入验证码" style="width: 70%"/>
          <el-button id="codeButton" type="warning" @click="getCode" style="width: 30%"> 获取验证码</el-button>
        </el-form-item>

        <el-form-item
          :rules="{required: true, message: '公司不能为空', trigger: 'blur'}"
        >
          <!--        <span class="svg-container">-->
          <!--            <svg-icon icon-class="tree" />-->
          <!--          </span>-->
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
        <el-form-item prop="ccode">
          <el-input  v-model="registerForm.ccode"
                    auto-complete="off" placeholder="请输入公司秘钥"></el-input>
        </el-form-item>

        <el-form-item prop="username">
          <el-input type="username" v-model="registerForm.username"
                    auto-complete="off" placeholder="请设置用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="registerForm.password" show-password
                    auto-complete="off" placeholder="请设置密码"></el-input>
        </el-form-item>
        <el-form-item prop="nickName">
          <el-input type="nickName" v-model="registerForm.nickName"
                    auto-complete="off" placeholder="请设置昵称"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="gotoTest('registerForm')">全部重置</el-button>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button :loading="loading" type="primary" style="width: 100%;background: #505458;border: none" @click="register('registerForm')">立即注册</el-button>
        </el-form-item>
      </el-form>
  <!--  </el-container>-->


    </body>
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
  </div>
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
.spanStyle1{
  position: fixed;
  left:240px;
  font-size: 30px;
}
.spanStyle2{
  position: fixed;
  left:480px;
  font-size: 20px;
}
.auth_input{
  width:140px;
  height:38px;
  margin-bottom:20px;
  border:1px solid #DCDFE6;
  /* color:red; */
  padding-left:10px;
  border-radius: 8%;
  font-size: 16px;
}
/*#codeButton{*/
/*  width: 200px;*/
/*  height: 30px;*/
/*  background: #505458;*/
/*  border: none;*/
/*  color: #ffffff;*/
/*  font-size: 14px;*/
/*}*/
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
import { validEmail } from '@/utils/validate'
import { validPhone } from "@/utils/validate";
import {get, post} from '@/utils/request'
export default {
  name: 'Register',
  data(){
    const validatePass = (rule, value, callback) => {
      if(value == ''){
        callback(new Error('请设置密码！'))
      } else if(value.length < 6){
        callback(new Error('密码长度不小于6位！'))
      } else{
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
    const validatePhone = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('手机号不能为空！'))
      } else if(!validPhone(value)){
        callback(new Error('请输入正确的手机号码！'))
      } else {
        this.sendAuthCode = true
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('邮箱不能为空！'))
      } else if(!validEmail(value)){
        callback(new Error('请输入正确的邮箱！'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('验证码不能为空！'))
      } else {
        callback()
      }
    }
    const validateNickname = (rule, value, callback) => {
      if(value == ''){
        callback(new Error('请输入至少一个字符！'))
      } else{
        callback()
      }
    }

    return{
      company: "",
      pageNum:1,
      pageSize:10,
      total: 10,
      formLabelWidth: '120px',
      gridData: [],
      dialogFormVisible: false,
      className:2222,
      resultNum:0,
      responseResult: [],
      loading: false,
      resendCode:false,
      auth_time:0,
      isAble:true,
      verification:'',
      registerForm: {
        username:'',
        icon: '',
        code: '',
        email: '',
        phone: '',
        password: '',
        nickName: '',
        note: '',
        cid: 0,
        ccode: ''
      },
      rules: {
        email: [
          { required: true, trigger: 'blur', validator: validateEmail },
        ],
        nickName:[
          { required: true, trigger: 'blur', validator: validateNickname},
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        phone:[
          { required: true, trigger: 'blur', validator: validatePhone },
        ],
        username:[
          { required: true, trigger: 'blur', validator: validateUsername },
        ],
        code:[
          { required: true, trigger: 'blur', validator: validateCode },
        ]
      },
    }
  },
  methods:{
    choose(index) {
      this.dialogFormVisible = false
      console.log('fuck',this.gridData[index].name)
      this.registerForm.cid = this.gridData[index].id
      this.company = this.gridData[index].name
      console.log('com1',this.company)
    },
    fetchData(){
      console.log(this.company)
      const t = this
      this.listLoading = true
      get('/sys-user/company/'+this.company,{pageNum:this.pageNum, pageSize: this.pageSize})
        .then(resp =>{
          console.log(resp)
          this.gridData = resp.list;
        })
    },
    test(){
      const data = this.$service.response.data
      alert(data.code)
    },
    gotoTest(){
      this.$router.push('/test')
    },
    getCode() {
      const t = this
      // this.$store.dispatch('user/code', this.registerForm.phone)
      if (validPhone((t.registerForm.phone))) {
          post('/sys-user/admin/code?phone='+t.registerForm.phone)
          .then(resp => {
           console.log("获取验证码成功", resp)
            t.$message({
              message: '验证码已发送，请注意查收',
              type: 'success'
            });
            this.resendCode = true;
            //设置倒计时秒
            this.auth_time = 60;
            var auth_timetimer = setInterval(() => {
              t.auth_time--;
              var btn = document.getElementById('codeButton')
              btn.innerText = t.auth_time + '秒后可重发验证码'
              if (this.auth_time <= 0) {
                this.resendCode = false;
                clearInterval(auth_timetimer);
                btn.innerText = '获取验证码'
                btn.disabled = false
              } else {
                btn.disabled = true
              }
            }, 1000);
          })
          .catch(err => console.log(err))
        } else if(t.registerForm.phone != ''){
          t.$message({
            showClose: true,
            message: '请输入正确的手机号码！',
            type: 'error'
          });
        } else{
          t.$message({
            showClose: true,
            message: '请先填写手机号码！',
            type: 'error'
          });
        }
    },
    register(formName){
      const t = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
            post('/sys-user/admin/register?code='+t.registerForm.code+'&ccode='+t.registerForm.ccode,{
              email: t.registerForm.email,
              icon: t.registerForm.icon,
              nickName: t.registerForm.nickName,
              note: t.registerForm.note,
              password: t.registerForm.password,
              phone: t.registerForm.phone,
              username: t.registerForm.username,
              cid: t.registerForm.cid,

            })
            .then(resp => {
           //   if(resp.code == 200)
                t.$message({
                  message: '注册成功！',
                  type: 'success'
                });
                t.$router.push('/login')
            /*    t.$message({
                  message: '验证码无效，请重新输入',
                  type: 'error'
                });
                t.registerForm.code = ''*/
            })
            .catch(err => console.log(err))
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
