// import * as path from 'path';
// import * as fs from 'fs';
// import * as xlsx from 'node-xlsx';

// // 获取 xlsx 中的词条总数：去重+去除空
// const getXlsxTitles = async () => {
//   const titleFile = await fs.readFileSync(
//     path.join(process.cwd() + '/', `../../public/students.xlsx`),
//   );
//   const sheets = xlsx.parse(titleFile);

//   console.log('sheets', sheets);
//   const data = sheets[0].data;
//   console.log('data', data);
//   const keys = data.shift();
//   console.log('keys', keys);
//   return titleSheet;
//   // const titles = titleSheet[0].data.slice(1);
//   // return titles;
// };

// async function main() {
//   console.log('开始');
//   const fileTitles = await getXlsxTitles();
//   console.log('fileTitles', fileTitles);

//   console.log('结束');
//   process.exit();
// }

// main();
