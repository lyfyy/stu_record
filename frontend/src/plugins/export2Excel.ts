import * as XLSX from 'xlsx'

type TableData = {
  [key: string]: unknown
}

type TableHeader = {
  name: string
  key: string
}

/**
 *  导出xlsx文件
 */
export const GenerateXLSX = (
  rows: Array<TableData>,
  headers: Array<TableHeader>,
  fileName = 'default.xlsx'
): void => {
  const headerKey = headers.map(item => item.key)

  rows = (rows || []).map((item: any) => {
    const obj: any = {}
    headerKey.forEach((key: string) => (obj[key] = item[key]))
    Object.assign(obj, format(item))
    return obj
  })

  const wb = { SheetNames: ['Sheet1'], Sheets: { Sheet1: {} }, Props: {} }

  // 生成表头
  const _header: TableData = {}

  headers.forEach(item => (_header[item.key] = item.name))

  rows.unshift(_header)

  wb.Sheets.Sheet1 = XLSX.utils.json_to_sheet(rows, { header: headerKey, skipHeader: true })

  const out = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' })
  const blob = new Blob([s2ab(out)], { type: 'application/octet-stream' })
  // 导出
  const url = window.URL.createObjectURL(blob)
  const downloadLink = document.createElement('a')
  downloadLink.href = url
  // 导出文件的文件名
  downloadLink.download = fileName || 'default.xlsx'
  downloadLink.click()
  window.URL.revokeObjectURL(url)
}

/**
 * 字符串转字符流
 * @param s
 * @returns
 */
function s2ab (s: string) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}

const format = (data:any) => {
  return {
    stuNo: data.stuNo,
    team: data.team,
    name: data.name,
    score1: data.score1 === true ? '是' : '否',
    score2: data.score2 === true ? '是' : '否',
    score3: data.score3 === true ? '是' : '否',
    score: data.score
  }
}
