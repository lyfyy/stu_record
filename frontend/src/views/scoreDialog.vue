<template lang="pug">
.box
el-dialog(title="成绩" v-model="dialogVisible" width="30%" )
  el-form(ref="formRef" label-width="120px" label-position="right" :model="formData")
    el-form-item(prop="stuNo" label="学号：")
      span() {{ formData.stuNo }}
    el-form-item(prop="name" label="姓名：")
      span() {{ formData.name }}
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
import { ref, reactive, defineExpose } from 'vue'
import { saveRecord } from '@/apis'
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
const dialogVisible = ref(false)

// 打开弹框，并接收数据显示在弹框中
const openDialog = (data: any) => {
  dialogVisible.value = true
  formData.name = data.name
  formData.stuNo = data.stuNo
  formData.score1 = data.score1.toString()
  formData.score2 = data.score2.toString()
  formData.score3 = data.score3.toString()
}

// handleClose方法，关闭弹框
const handleClose = () => {
  dialogVisible.value = false
}

defineExpose({
  openDialog
})

const submit = () => {
  saveRecord(formData)
    .then(res => {
      if (res.err) {
        ElMessage.error(res.err)
        return
      }
      // formData的值清空
      Object.assign(formData, getInitForm())
      dialogVisible.value = false
      ElMessage.success(res.message)
    })
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
