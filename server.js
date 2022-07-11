const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const nodexlsx = require("node-xlsx").default;
const port = 3000;

app.use(express.static("public"));

const jpg = path.resolve(
  __dirname,
  "./public/assets/泰国攀牙湾安达曼海的红树林4k风景壁纸_彼岸图网.jpg"
);
const text = path.resolve(__dirname, "./public/assets/note.text");
const xlsx = path.resolve(__dirname, "./public/assets/变更申请表.xlsx");
const docx = path.resolve(
  __dirname,
  "./public/assets/“美丽深圳”微信公众号变更方案_20211222.docx"
);

const list = [
  [1, 2, 3],
  [true, false, null, "sheetjs"],
  ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
  ["baz", null, "qux"],
];
//由于各列数据长度不同，可以设置一下列宽
const options = {
  sheetOptions: {
    "!cols": [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 }],
  },
};
//生成表格
var buffer = nodexlsx.build([{ name: "sheet1", data: list }], options);

//设置跨域访问
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.get("/jpg", (req, res) => {
  fs.readFile(jpg, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    res.writeHead(200, {
      "Content-disposition": "attachment;filename=server.jpg",
    });

    res.write(data);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 问题
// 1. 不确定文件类型，不指定content-type可行吗？
// 可行

// 2. setHeader和writeHead之间的差异是什么？
// 功能是一样，不过writeHead的优先级高些

// 结论
// 1. 如果没有正确的指定content-type文件就无法正常的打开
// 2. a.download的文件命名优先级低于content-disposition的filename
