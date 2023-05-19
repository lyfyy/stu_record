<template lang="pug">
.form
  .back
    .box
      el-form(ref="formRef" label-width="120px" label-position="right" :model="formData")
        el-form-item(prop="stuNo" label="学号：")
          span() {{ formData.stuNo }}
        el-form-item(prop="name" label="姓名：")
          el-select(v-model="formData.name" filterable remote reserve-keyword placeholder="请输入你的姓名" :remote-method="remoteMethod"
            :loading="loading" @change="handleNameChange")
            el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value" )
        el-form-item(prop="score1" label="是否通过XXX")
          el-radio(v-model="formData.score1" label="false") 否
          el-radio(v-model="formData.score1" label="true") 是
        el-form-item(prop="score2" label="成绩2")
          el-radio(v-model="formData.score2" label="false") 否
          el-radio(v-model="formData.score2" label="true") 是
        el-form-item(prop="score3" label="成绩3")
          el-radio(v-model="formData.score3" label="false") 否
          el-radio(v-model="formData.score3" label="true") 是
        el-button(type="primary"  @click="submit") 提交
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { saveRecord, searchStu } from '@/apis'
import { ElMessage } from 'element-plus'

const formRef = ref()
const getInitForm = () => {
  return {
    score1: '',
    score2: '',
    score3: '',
    name: '',
    stuNo: ''
  }
}
const formData = reactive<any>(getInitForm())

const submit = () => {
  saveRecord(formData)
    .then(res => {
      if (res.err) {
        ElMessage.error(res.err)
        return
      }
      // formData的值清空
      Object.assign(formData, getInitForm())
      ElMessage.success(res.message)
    })
}

const loading = ref(false)
const options = ref([])

// 定义一个方法，当姓名确定时，学号取options中的label
const handleNameChange = (value: string) => {
  const item: any = options.value.find((item: any) => item.value === value)
  if (item) {
    // 将item赋值给formData
    formData.name = item.label
    formData.stuNo = item.value
    formData.score1 = item.score1
    formData.score2 = item.score2
    formData.score3 = item.score3
  }
}

// 定义remoteMethod方法，请求后端接口
const remoteMethod = (query: string) => {
  if (query !== '') {
    loading.value = true
    searchStu({ name: query })
      .then(res => {
        if (res.err) {
          ElMessage.error(res.err)
          return
        }
        loading.value = false
        options.value = res.data.map((item: any) => {
          return {
            value: item.stuNo,
            label: item.name,
            score1: item.score1.toString(),
            score2: item.score2.toString(),
            score3: item.score3.toString()
          }
        })
        // ElMessage.success(res.message)
      })
  } else {
    options.value = []
  }
}

</script>
<style scoped>
.back{
  height: 1000px;
  width: auto;
  background-image: url('../../public/football.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

}
.form .box{
  background-color:honeydew;
  width: 35%;
  /* margin-top: 50px;
  margin-left: 50px; */
  padding:30px;
  border: 2px solid #ccc;
  /**
  写一个样式，让box居中
   */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/**
  让按钮居中
 */
.el-button{
  margin-top:25px;
  margin-left: 40%;
}
</style>
