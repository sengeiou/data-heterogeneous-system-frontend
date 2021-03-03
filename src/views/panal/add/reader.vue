<template>
  <div >
    <div >
      <el-select v-model="choosedTypeID" placeholder="请选择数据源类型">
        <el-option
          v-for="item in types"
          :key="item.id"
          :label="item.type"
          :value="item.id">
        </el-option>
      </el-select>
    </div>

    <div>
      <el-table :data="dataSources"
                :header-cell-style="setSellStyle"
                :row-class-name="tableRowClassName"
                style="border-radius: 8px;border: 0px; margin-top: 10px;" stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="databases[scope.$index]" stripe>
              <el-table-column align="center" label="选择" width="200px">
                <template slot-scope="small">
                  <el-radio v-model="database" :label="(scope.$index+1)+'-'+(small.$index+1)"/>
                </template>
              </el-table-column>
              <el-table-column label="数据库" prop="Schema"/>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column label="ID" prop="id"/>
        <el-table-column label="描述信息" prop="dbDescription"/>
        <el-table-column label="URL" prop="dbUrl"/>
        <el-table-column label="User" prop="dbUser"/>
      </el-table>
    </div>
  </div>
</template>

<script>
import { get } from '../../../utils/request'

export default {
  name: 'Reader',
  components: {},
  watch: {
    choosedTypeID: {
      immediate:true,
      deep: true,
      handler(newName) {
        if(newName!=null&&newName!=''){
          for(let index in this.types){
            if(newName == this.types[index].id){
              this.choosedType =  this.types[index].type
            }
          }
          console.log(newName)
          this.fetchDatasource()
        }
      }
    }
  },
  data() {
    return {
      types: [],
      choosedTypeID: null,
      choosedType: null,
      dataSources: [],

      databases:[],
      database:'',
      row: -1,
    }
  },
  created() {
    //获取types
    let that = this
    get('/sys-remotedata/remoteDatasourceType/getInfo')
      .then(resp => {
        console.log(resp)
        that.types = resp.data.rows.reverse()
        this.choosedTypeID = this.types[this.types.length-1].id
        this.choosedType = this.types[this.types.length-1].type
        // console.log('qin',this.types)
      })
  },
  methods: {
    setSellStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color:#409EFF;color:#fff;font-wight:200;font-size:15px;"
    },
    tableRowClassName({row, rowIndex}) {
      // if (rowIndex === 1) {
      //   return 'warning-row';
      // } else if (rowIndex === 3) {
      //   return 'success-row';
      // }
      return 'warning-row';
      // return '';
    },
    getData() {
      var info = this.database.split("-")
      var f = info[0]-1
      var r = info[1]-1
      return {
        id:this.dataSources[f].id,
        source: this.choosedType + this.dataSources[f].id,
        schema: this.databases[f][r].Schema
      }
    },
    fetchDatasource() {
      let that = this
      this.dataSources=[]
      this.databases=[]
      this.database = ''
      get('/sys-remotedata' + '/remoteDatasource/getInfoByType', { type_id: that.choosedTypeID })
        .then(resp => {
          console.log(resp)
          that.dataSources = resp.data.rows
          for(var i=0,len=that.dataSources.length; i<len; i++){
            that.databases.push([])
            that.fetchDatabase(i)
          }
        })
    },
    fetchDatabase(row){
      let id = this.dataSources[row].id
      let that = this
      get('/sys-remotedata' + '/remoteDatasource/getAllSchemas', { id: id })
        .then(resp => {
          console.log(resp)
          //
          that.databases[row]=resp.data.rows
        })
    },
    // expandChange(row,index){
    //   this.$refs.refTable.toggleRowExpansion(row)
    // },
    // choose(data) {
    //   this.row = data
    //   this.dataSource = this.dataSources[data]
    // }
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }
</style>
