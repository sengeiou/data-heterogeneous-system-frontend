<template>
  <div class="app-container">
    <div class="build-container">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1" description="选择数据源">1</el-step>
        <el-step title="步骤 2" description="构建面板">2</el-step>
        <el-step title="步骤 3" description="保存构建">3</el-step>
<!--        <el-step title="步骤 4" description="保存构建">4</el-step>-->
      </el-steps>

      <div v-show="active===1" class="step1">
        <Reader ref="reader" />
      </div>
      <div v-show="active===2" class="step2">
        <Writer ref="writer" />
      </div>
<!--      <div v-show="active===3" class="step3">-->
<!--        <Mapper ref="mapper" />-->
<!--      </div>-->
      <div v-show="active===3" class="step3">
        <department ref="department"/>
      </div>

      <el-button :disabled="active===1" style="margin-top: 12px;" @click="last">上一步</el-button>
      <el-button type="primary" style="margin-top: 12px;margin-bottom: 12px;" @click="next" v-show="active != 3">下一步</el-button>
      <el-button type="primary" v-show="active === 3" @click="next">保存构建</el-button>
<!--      <el-button type="primary" @click="panalList" v-show="active === 4">进入面板列表</el-button>-->
    </div>
  </div>
</template>

<script>
import Reader from './add/reader'
import Writer from './add/writer'
import department from "@/views/panal/add/department";
import * as panal from '@/api/panal'


export default {
  name: 'JsonBuild',
  components: { Reader, Writer,department },
  data() {
    return {
      active: 1,
      formData: {
        dbId: 0,
        departmentId: 0,
        description: "",
        panalTypeId: 0,
        sqlWords: "",
        state: 0,
        x: ""
      },
      mapperData:{},
    }
  },
  created() {
    // this.getJdbcDs()
  },
  methods: {
    next() {
      var that = this
      switch (this.active){
        case 1:
          var res = this.$refs.reader.getData()
          this.$refs.writer.init()
          this.$refs.writer.setData(res.id,res.source,res.schema)
          this.formData.dbId = res.id
          this.active++
          break;
        case 2:
          this.mapperData = this.$refs.writer.getData()
          const newObj = Object.assign({}, this.mapperData);
          console.log(this.formData)
          // this.formData.dbId

          this.formData.description = newObj.description
          this.formData.panalTypeId = newObj.panalTypeId
          //
          this.formData.x =  newObj.x
          this.formData.state = 0
          this.$refs.department.getDepartment()


          this.formData.sqlWords = newObj.sql

          this.active++
          break;
        case 3:
          this.formData.departmentId = this.$refs.department.getData()
          this.savePanal()
          break;
      }
    },
    last() {
      if (this.active > 1) {
        this.active--
      }
    },
    panalList() {
      this.$router.push({path: '/panal/list'})
    },
    savePanal() {
      console.log(this.formData)
      panal.saveDBPanal(this.formData).then(() => {
        this.$message({
          type: 'success',
          message: '保存成功'
        });
        this.$router.push({ path: '/panal/list' })
      })
    }
  }
}
</script>

<style lang="scss">
  .build-container .el-form-item__label {
    color: white;
  }


</style>
