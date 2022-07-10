const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.static("public"));

const filename = path.resolve(
  __dirname,
  "./public/泰国攀牙湾安达曼海的红树林4k风景壁纸_彼岸图网.jpg"
);

const note = path.resolve(__dirname, "./public/note.text");

// 直接发送文件
// res.sendFile(filename);

app.get("/export", (req, res) => {
  fs.readFile(note, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    // res.writeHead(200, {
    //   "Content-Type": "text/plain; charset=utf-8",
    // });

    res.writeHead(200, {
      // "Content-Type": "image/jpg",
      // "Content-disposition": "attachment;filename=note.text",
    });
    res.write(data);
    res.end();
  });
});

app.post("/export", (req, res) => {
  fs.readFile(filename, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    // res.setHeader("Content-Type", "image/jpg");
    // res.writeHead(200, {
    //   "Content-Type": "ima12ge/21",
    // });

    res.writeHead(200, {
      "Content-disposition": "attachment;filename=123.jpg",
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

// 2. setHeader和writeHead之间的差异是什么？

// 结论
// 1. 如果没有正确的指定content-type文件就无法正常的打开
// 2. a.download的文件命名优先级低于content-disposition的filename
