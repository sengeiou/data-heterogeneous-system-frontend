<template>
  <div class="app-container">

    <el-row>
      <el-col :span="2">
        <div style="color: white; margin: 10px 0 10px">选择面板所属部门</div>
      </el-col>
      <el-col :span="22">
        <el-table
          :data=tableData
          :header-cell-style="setSellStyle"
          style="border-radius: 8px;border: 0px;width: 100%; margin: 10px 0 10px">
          <el-table-column align="center" label="选择" width="200px">
            <template slot-scope="small">
              <el-radio v-model="depart" :label="(small.$index+1)"/>
            </template>
          </el-table-column>
          <el-table-column
            label="id"
            prop="id">
          </el-table-column>
          <el-table-column
            label="部门名字"
            prop="name">
          </el-table-column>
          <el-table-column align="right">
            <template slot="header">
              <el-button
                @click="addNew">添加部门</el-button>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>

<!--    <el-drawer-->
<!--      :title="drawerTitle"-->
<!--      :visible.sync="dialog"-->
<!--      direction="ttb"-->
<!--      custom-class="demo-drawer"-->
<!--      ref="drawer"-->
<!--      size="50%"-->
<!--    >-->
<!--      <div class="demo-drawer__content" >-->
<!--        <el-form>-->
<!--          <el-form-item label="部门名字" :label-width="formLabelWidth">-->
<!--            <el-input v-model="name" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
<!--      <div class="demo-drawer__footer">-->
<!--        <el-button @click="cancelForm">取 消</el-button>-->
<!--        <el-button type="primary" @click="handleClose" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>-->
<!--      </div>-->
<!--    </el-drawer>-->
  </div>
</template>

<script>

import * as getPanal from "@/api/datasourceApi";

export default{

  data(){
    return {
      tableData: [],
      depart : 0,
      dialog: false,
      formLabelWidth: '80px',
      drawerTitle: '添加部门',
      loading: false,
      name: '',
      form:{id:'',name:''},
    }
  },
  methods: {
    getData(){
      return this.tableData[this.depart-1].id
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$prompt('请输入新的部门名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: row.name
      }).then(({ value }) => {
        //此处进行修改
        let departmentInfo = {id: row.id,name: value}
        getPanal.updatedDepartment(departmentInfo).then(resp =>{
          if(resp.code == 200){
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.getDepartment()
          }else{
            this.$message({
              type: 'error',
              message: '修改失败'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
      });
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //此处进行删除
        getPanal.deleteDepartment({id: row.id}).then(resp =>{
          if(resp.code == 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getDepartment()
          }else{
            this.$message({
              type: 'error',
              message: '删除失败'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });
    },
    addNew() {
      // this.drawerTitle = "添加部门"
      // this.dialog = true
      this.$prompt('请输入新的部门名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // let that = this
        //此处进行新增
        getPanal.saveDepartment({name: value}).then(resp =>{
          if(resp.code == 200){
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.getDepartment()
          }else{
            this.$message({
              type: 'error',
              message: '新增失败'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消新增'
        });
      });
    },
    setSellStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color:#409EFF;color:#fff;font-wight:200;font-size:15px;"
    },
    getDepartment() {
      getPanal.fetchDepartment().then(resp => {
        this.tableData = resp.data
      })
    },

  },

}
</script>

<style lang="scss" scoped>

</style>
