<template>
  <div style="padding: 0 10px 0">
    <el-table
      v-loading="sourcesLoading"
      :data="dataSources"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :header-cell-style="setSellStyle"
      style="border-radius: 8px;border: 0px; margin-bottom: 20px"
    >
      <el-table-column align="center" prop="id" label="ID" width="180px"></el-table-column>
      <el-table-column align="center" prop="cid" label="公司ID" width="100px"></el-table-column>
      <el-table-column align="center" prop="type" label="数据源类型" width="120px"></el-table-column>
      <el-table-column align="center" prop="dbDescription" label="数据源描述"></el-table-column>
      <el-table-column align="center" prop="dbUrl" label="URL" width="400px"></el-table-column>
      <el-table-column align="center" prop="dbUser" label="用户名" width="120px"></el-table-column>
      <el-table-column align="left" prop="dbPassword" label="密码" width="150px"></el-table-column>

      <el-table-column align="center" width="200px">
        <template slot="header">
          <el-button
            @click="addDatasource()">添加数据源
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="editDataSource(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="deleDataSource(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row>
      <el-col :span="22">
        <el-pagination
          class="showPage"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="listQuery.pageNum"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :page-size="listQuery.pageSize"
          :page-sizes="[1, 10, 20, 50]"
          :total='total'>
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="增加数据源" :visible.sync="adding" width="30%" :before-close="close">
      <el-form label-width="100px">
        <el-form-item label="类型">
          <el-select v-model="chooseTypeId" placeholder="类型">
            <el-option
              v-for="item in sourceTypes"
              :key="item.id"
              :label="item.type"
              :value="item.id"
              @change="chooseTypeChange()">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述信息">
          <el-input type="char" v-model="datasourceAdd.dbDescription"></el-input>
        </el-form-item>

        <el-form-item label="用户名" v-show="couldSee">
          <el-input type="char" v-model="datasourceAdd.dbUser"></el-input>
        </el-form-item>
        <el-form-item label="密码" v-show="couldSee">
          <el-input type="char" v-model="datasourceAdd.dbPassword"></el-input>
        </el-form-item>

        <el-form-item label="URL">
          <el-input type="char" v-model="datasourceAdd.dbUrl"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button @click="dataSourceTest()">测 试</el-button>
            <el-button type="primary" @click="save()">保 存</el-button>
          </span>
    </el-dialog>

    <el-dialog title="修改数据源信息" :visible.sync="editing" width="30%" :before-close="close">
      <el-form label-width="100px">
        <el-form-item label="ID">
          <el-input disabled type="char" v-model="datasourceEdit.id"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="chooseTypeId" placeholder="类型">
            <el-option
              v-for="item in sourceTypes"
              :key="item.id"
              :label="item.type"
              :value="item.id"
              @change="chooseTypeChange()">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述信息">
          <el-input type="char" v-model="datasourceEdit.dbDescription"></el-input>
        </el-form-item>

        <el-form-item label="用户名)" v-show="couldSee">
          <el-input type="char" v-model="datasourceEdit.dbUser"></el-input>
        </el-form-item>
        <el-form-item label="密码" v-show="couldSee">
          <el-input type="char" v-model="datasourceEdit.dbPassword"></el-input>
        </el-form-item>

        <el-form-item label="URL">
          <el-input type="char" v-model="datasourceEdit.dbUrl"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button @click="dataSourceTest()">测试</el-button>
            <el-button type="primary" @click="save()">保 存</el-button>
          </span>
    </el-dialog>
  </div>
</template>


<script>
import * as datasourceApi from '@/api/datasourceApi'
import waves from '@/directive/waves'

export default {
  directives: { waves },
  name: 'index',
  computed:{
    couldSee(){
      return this.judge()
    }
  },
  data() {
    return {
      editing: false,//修改框是否显示
      adding: false,//添加是否显示

      sourcesLoading: false,
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      dataSources: [],
      sourceTypes: [],

      //新增表单数据
      chooseTypeId: null,
      datasourceAdd: {
        dbDescription: '',
        dbUser: '',
        dbPassword: '',
        dbUrl: ''
      },
      //修改表单数据
      datasourceEdit: {
        id: null,
        dbDescription: '',
        dbUser: '',
        dbPassword: '',
        dbUrl: ''
      },
      // // 密码是否可见
      // visible: true,

      jdbc: true,
      hbase: false,
      mongodb: false
    }
  },
  created() {
    this.getDataTypes()
  },
  methods: {
    setSellStyle({ row, column, rowIndex, columnIndex }) {
      return 'background-color:#409EFF;color:#fff;font-wight:200;font-size:15px;'
    },
    getDataSources() {
      this.dataSources = []
      this.sourcesLoading = true
      datasourceApi.getDataSourceList(this.listQuery).then(response => {
        // const { records } = response
        // const { total } = response
        console.log('DataSourceList', response)
        this.total = response.data.totalPage
        const buf = Object.assign([], response.data.list)
        for (let item in buf) {
          buf[item].type = this.getTypeByID(buf[item].typeId)
        }
        console.log('buf', buf)
        this.dataSources = buf
        this.sourcesLoading = false
      })
    },

    getDataTypes() {
      datasourceApi.remoteDatasourceType().then(response => {
        console.log('DatasourceType', response.data.rows)
        this.sourceTypes = response.data.rows
        this.getDataSources()
      })
    },

    getTypeByID(typeid) {
      for (let item in this.sourceTypes) {
        if (this.sourceTypes[item].id == typeid) {
          return this.sourceTypes[item].type
        }
      }
      return null
    },

    editDataSource(row) {
      //赋值
      console.log('进入修改表单', row)
      this.chooseTypeId = row.typeId
      this.datasourceEdit.id = row.id
      this.datasourceEdit.dbDescription = row.dbDescription
      this.datasourceEdit.dbUser = row.dbUser
      this.datasourceEdit.dbPassword = row.dbPassword
      this.datasourceEdit.dbUrl = row.dbUrl

      this.editing = true
    },
    addDatasource() {
      console.log('进入增加表单')
      this.datasourceAdd.dbDescription = ''
      this.datasourceAdd.dbPassword = ''
      this.datasourceAdd.dbUrl = ''
      this.datasourceAdd.dbUser = ''
      this.chooseTypeId = null

      this.adding = true
    },
    judge(){
      if(this.adding == true){
        switch (this.getTypeByID(this.chooseTypeId)){
          case 'mysql':
            this.datasourceAdd.dbUrl = '{host}:{port}'
            break
          case 'postgresql':
            this.datasourceAdd.dbUrl = '{host}:{port}/{database}'
            break
          case 'sqlserver':
            this.datasourceAdd.dbUrl = '{host}:{port}'
            break
          case 'mongodb':
            this.datasourceAdd.dbUrl = '{host}:{port},...,{host}:{port}'
            break
          default:
            this.datasourceAdd.dbUrl = ''
            break
        }
      }
      switch (this.getTypeByID(this.chooseTypeId)){
        case 'mysql':
        case 'postgresql':
        case 'sqlserver':
          return true;
        case 'mongodb':
          return false;
        default:
          return true;
      }
    },
    deleDataSource(row) {
      this.$confirm('此操作将永久删除该数据源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //此处进行删除
        datasourceApi.deleted({ id: row.id }).then(resp => {
          if (resp.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.deleteByID(row.id)
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    deleteByID(id){
      for(let item in this.dataSources){
        if(this.dataSources[item].id == id){
          this.dataSources.remove(item)
          break;
        }
      }
    },
    save() {
      if (this.editing == true) {
        console.log('修改界面')
        //修改
        const buf = Object.assign({}, this.datasourceEdit)
        buf.typeId = this.chooseTypeId
        datasourceApi.updated(buf).then(resp => {
          if (resp.code == 200) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.close()
            this.getDataSources()
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        })
      } else {
        const buf = Object.assign({}, this.datasourceAdd)
        buf.typeId = this.chooseTypeId
        datasourceApi.created(buf).then(resp => {
          if (resp.code == 200) {
            this.$message({
              type: 'success',
              message: '增加成功!'
            })
            this.close()
            this.getDataSources()
          } else {
            this.$message({
              type: 'error',
              message: '增加失败'
            })
          }
        })
      }
      this.close()
    },
    dataSourceTest(){
      let tempData = null
      if (this.editing == true) {
        tempData = {
          typeId: this.chooseTypeId,
          dbDescription: this.datasourceEdit.dbDescription,
          dbUser: this.datasourceEdit.dbUser,
          dbPassword: this.datasourceEdit.dbPassword,
          dbUrl: this.datasourceEdit.dbUrl,
        }
      } else {
        tempData = {
          typeId: this.chooseTypeId,
          dbDescription: this.datasourceAdd.dbDescription,
          dbUser: this.datasourceAdd.dbUser,
          dbPassword: this.datasourceAdd.dbPassword,
          dbUrl: this.datasourceAdd.dbUrl,
        }
      }

      datasourceApi.test(tempData).then(response => {
        if (response.code == 500) {
          this.$message({
            type: 'error',
            message: '测试失败'
          });
        } else {
          this.$message({
            type: 'success',
            message: '测试成功'
          });
        }
      })
    },
    close() {
      this.adding = false
      this.editing = false
    },
    handleSizeChange(val) {
// this.pageSize = val;
      this.listQuery.pageSize = val
      this.getDataSources()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getDataSources()
    }
  }
}
</script>
<style scoped>
</style>

