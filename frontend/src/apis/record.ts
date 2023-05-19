import { ajax } from './commuCore'

export const getRecord = (): Promise<any> => ajax(null, '/stu/', 'get')

export const saveRecord = (data: any): Promise<any> => ajax(data, '/stu/updateRecord', 'put')

export const searchStu = (data: any): Promise<any> => ajax(data, '/stu/search', 'get')
