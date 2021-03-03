<template>
  <div style="padding: 0 10px 0">
    <el-table :data="tableData" border fit highlight-current-row :header-cell-style="setSellStyle"
              style="border-radius: 8px;">
      <el-table-column align="center" prop="predict.id" label="预警ID" ></el-table-column>
      <el-table-column align="center" prop="panal.id" label="面板ID" ></el-table-column>
      <el-table-column align="center" prop="panal.panalName" label="面板名字" ></el-table-column>
      <el-table-column align="center" prop="predict.threshold" label="阈值" ></el-table-column>
      <el-table-column align="center" prop="predict.method" label="预警算法" ></el-table-column>
      <el-table-column align="center" prop="predict.phone" label="联系人电话"></el-table-column>
      <el-table-column align="left" prop="panal.sqlStatement" label="sql语句" ></el-table-column>

      <el-table-column align="center" width="246px">
        <template slot="header">
          <el-button
            @click="addPredict()">添加预警
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="editPredict(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="delePredict(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增预警-每10分钟进行一次预测" :visible.sync="adding" width="30%" :before-close="close">
      <el-form label-width="100px">
        <el-form-item label="influxID">
          <el-select v-model="influxID" clearable placeholder="请选择">
            <el-option
              v-for="item in influxDBs"
              :key="item.id"
              :label="item.sourceName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="面板名">
          <el-select :disabled="influxID == null || influxID=='' " v-model="panalRow" clearable placeholder="请选择">
            <el-option
              v-for="item in panals"
              :key="item.id"
              :label="item.panalName"
              :value="panals.indexOf(item)">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="sqlStatement">
          <el-input disabled type="char"
                    v-model="(panalRow === null||panalRow === '')?'':panals[panalRow].sqlStatement"></el-input>
        </el-form-item>

        <el-form-item label="阈值">
          <el-input type="number" v-model="predictAdd.threshold"></el-input>
        </el-form-item>
        <el-form-item label="预测算法">
          <el-select v-model="predictAdd.method" placeholder="请选择">
            <el-option
              v-for="item in methods"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通知人电话(功能已实现，请填写真实电话)">
          <el-input id="main" type="char" v-model="predictAdd.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改预警" :visible.sync="editing" width="30%" :before-close="close">
      <el-form label-width="100px">
        <el-form-item label="预警ID">
          <el-input disabled type="char" v-model="predictEdit.id"></el-input>
        </el-form-item>
        <el-form-item label="面板ID">
          <el-input disabled type="char" v-model="predictEdit.panalId"></el-input>
        </el-form-item>
        <el-form-item label="面板名">
          <el-input disabled type="char" v-model="predictEdit.panalName"></el-input>
        </el-form-item>
        <el-form-item label="sqlStatement">
          <el-input disabled type="char" v-model="predictEdit.sqlStatement"></el-input>
        </el-form-item>
        <el-form-item label="预测算法)">
          <el-input disabled type="char" v-model="predictEdit.method"></el-input>
        </el-form-item>
        <el-form-item label="阈值">
          <el-input type="number" v-model="predictEdit.threshold"></el-input>
        </el-form-item>
        <el-form-item label="通知人电话">
          <el-input type="char" v-model="predictEdit.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </el-dialog>
    <v-tour name="myTour1" :steps="steps"  :options="myOptions"></v-tour>
  </div>
</template>


<script>
import * as predict from '@/api/predict'
import * as influx from '@/api/homePage'

export default {
  name: 'index',
  data() {
    return {
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
      steps: [
        {
          target: '#main',
          content: '测试显示：神经网络采用过往数据作为预训练模型，使用当前数据实时训练加预测，由于服务器资源有限，所以可能设置之后无法收到短信，但是本地测试CPU资源充足的时候可以收到',
          params: {
            placement: 'center',
            highlight: true   //不显示
          }
        },
      ],
      methods: [
        {
          value: 'RNN',
          label:'RNN'
        },
        {
          value: 'ARIMA',
          label:'ARIMA'
        },
        {
          value: 'LSTM',
          label:'LSTM'
        },
        {
          value: 'GRU',
          label:'GRU'
        },
      ],
      editing: false,//修改框是否显示
      adding: false,//添加是否显示

      tableData: [],
      //新增表单数据
      influxDBs: [],
      panals: [],
      influxID: null,
      panalRow: null,
      predictAdd: {
        method: null,
        phone: '',
        threshold: null
      },
      //修改表单数据
      predictEdit: {
        id: null,
        panalId: null,
        panalName: null,
        sqlStatement: null,
        method: '',
        phone: '',
        threshold: null
      }
    }
  },
  watch: {
    influxID: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.panalRow = null
        this.panals = []
        if (newValue != null && newValue != '') {
          influx.fetched({ DBIndex: newValue }).then(resp => {
            console.log('panals', resp.data)
            this.panals = resp.data
          })
        }
      }
    }
  },
  created() {
    //获取tableData
    this.getPredicts()
  },
  mounted: function () {
    this.$tours['myTour1'].start()
  },
  methods: {
    setSellStyle({ row, column, rowIndex, columnIndex }) {
      return 'background-color:#409EFF;color:#fff;font-wight:200;font-size:15px;'
    },
    getPredicts() {
      predict.getPredicts().then((resp) => {
        console.log('predicts', resp.data.rows)
        this.tableData = resp.data.rows
      })
    },
    getInfluxs() {
      influx.fetchedAllDBByCid().then((resp) => {
        console.log('influxs', resp)
        this.influxDBs = resp.data
      })
    },
    editPredict(row) {
      //赋值
      console.log('进入修改表单', row.predict,row.panal)
      this.predictEdit.id = row.predict.id
      this.predictEdit.panalId = row.predict.panalId
      this.predictEdit.panalName = row.panal.panalName
      this.predictEdit.sqlStatement = row.panal.sqlStatement
      this.predictEdit.phone = row.predict.phone
      this.predictEdit.method = row.predict.method
      this.predictEdit.threshold = row.predict.threshold
      this.editing = true
    },
    addPredict() {
      //获取时序数据库
      this.predictAdd.influxDBs = this.getInfluxs()
      this.influxID = ''
      this.predictAdd.panals = []
      this.panalRow = null
      this.predictAdd.phone = ''
      this.predictAdd.threshold = null
      this.predictAdd.method = null
      this.adding = true
    },
    delePredict(row) {
      this.$confirm('此操作将永久删除该预警, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //此处进行删除
        predict.deletePredict({ id: row.predict.id }).then(resp => {
          if (resp.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getPredicts()
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
    save() {
      if (this.editing == true) {
        console.log('修改界面')
        if (this.predictEdit.threshold <= 0) {
          this.$message({
            type: 'error',
            message: '信息错误!'
          })
          return
        }
        //修改
        let buf = {
          id: this.predictEdit.id,
          panalId: this.predictEdit.panalId,
          method: this.predictEdit.method,
          threshold: this.predictEdit.threshold,
          phone: this.predictEdit.phone
        }
        predict.updatePredict(buf).then(resp => {
          if (resp.code == 200) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.getPredicts()
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        })
      } else {
        if (this.panalRow === null || this.panalRow === '' || this.predictAdd.threshold <= 0) {
          this.$message({
            type: 'error',
            message: '信息错误!'
          })
          return
        }
        let buf = {
          panalId: this.panals[this.panalRow].id,
          method: this.predictAdd.method,
          threshold: this.predictAdd.threshold,
          phone: this.predictAdd.phone
        }
        predict.addPredict(buf).then(resp => {
          if (resp.code == 200) {
            this.$message({
              type: 'success',
              message: '增加成功!'
            })
            this.getPredicts()
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
    close() {
      this.adding = false
      this.editing = false
    }
  }
}
</script>

<style scoped>

</style>
