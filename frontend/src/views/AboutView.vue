<template lang="pug">
.home
    //- 导出按钮
    el-form
      el-form-item
        el-button(@click='exportToXlsx') 导出
    el-table(:data="record" :row-class-name="tableRowClassName" :default-sort = "{prop: 'stuNo', order: 'descending'}")
      el-table-column(prop="stuNo" label="学号" width="120")
      el-table-column(prop="team" label="小组" min-width="100")
      el-table-column(prop="name" label="姓名" min-width="100")
      el-table-column(prop="score1" label="成绩1" min-width="100" sortable)
        //- 通过score1的值判断是否通过XXX
        template(#default="scope")
          span(v-if="scope.row.score1 === true") 是
          span(v-else) 否
      el-table-column(prop="score2" label="成绩2" min-width="100" sortable)
        template(#default="scope")
          span(v-if="scope.row.score2 === true") 是
          span(v-else) 否
      el-table-column(prop="score3" label="成绩3" min-width="100" sortable)
        template(#default="scope")
          span(v-if="scope.row.score3 === true") 是
          span(v-else) 否
      el-table-column(prop="score" label="总成绩" min-width="100" sortable)
        template(#default="scope")
          //- 显示score1,score2,score3的总和
          span {{ Number(scope.row.score1) + Number(scope.row.score2) + Number(scope.row.score3) || 0 }}
      //- 编辑按钮
      el-table-column(label="操作" width="120")
        template(#default="scope")
          el-button(type="primary"  @click="handleEditForm(scope.row)") 编辑
editFormData(ref="editForm")

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getRecord } from '@/apis'
import { ElMessage } from 'element-plus'
import { GenerateXLSX } from '@/plugins/export2Excel'
// 引入编辑弹框
import editFormData from '@/views/scoreDialog.vue'

const editForm = ref()

const record = ref([])

// 定义editform方法,并刷新列表
const handleEditForm = (data: any) => {
  editForm.value.openDialog(data)
  getRecord()
    .then(res => {
      record.value = res.data
    })
}

onMounted(() => {
  getRecord()
    .then(res => {
      record.value = res.data
      // record.value.score = Number(item.score1) + Number(item.score2) + Number(item.score3)
    })
})
// 定时器，每5秒刷新一次
setInterval(() => {
  getRecord()
    .then(res => {
      record.value = res.data
    })
}, 5000)

// 定义exportToXlsx方法，调用getRecord接口，将表格的数据导出成excel，并将score1,score2,score3的总和显示在excel中
const exportToXlsx = () => {
  getRecord()
    .then(res => {
      const data = res.data.map((item: any) => {
        return {
          ...item
        }
      })
      const tHeader = [
        {
          name: '学号',
          key: 'stuNo'
        },
        {
          name: '小组',
          key: 'team'
        },
        {
          name: '姓名',
          key: 'name'
        },
        {
          name: '成绩1',
          key: 'score1'
        },
        {
          name: '成绩2',
          key: 'score2'
        },
        {
          name: '成绩3',
          key: 'score3'
        },
        {
          name: '总成绩',
          key: 'score'
        }
      ]
      GenerateXLSX(data, tHeader, '成绩.xlsx')
    })
}

// 定义tableRowClassName，当team的值为1时，背景色为#f0f9eb
const tableRowClassName = ({ row }: any) => {
  if (row.team === '1') {
    return 'team1'
  }
  if (row.team === '2') {
    return 'team2'
  }
  if (row.team === '3') {
    return 'team3'
  }
  if (row.team === '4') {
    return 'team4'
  }
}

</script>
<style>

.team1 {
  background: rgb(229, 187, 110) !important;
}
.team2 {
  background: rgb(235, 143, 204) !important;
}
.team3 {
  background: rgb(156, 243, 119) !important;
}
.team4 {
  background: rgb(180, 170, 240) !important;
}

</style>
