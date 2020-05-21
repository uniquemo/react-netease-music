const fs = require('fs')
const shell = require('shelljs')
const packageFile = require('../package.json')

const { name, version } = packageFile
// 生成docker image
shell.exec(`docker image build -t ${name}:${version} .`)

// 获取原来的8080端口的进程pid，如果存在，kill掉该进程
const child = shell.exec('lsof -i:8080 -t', { silent: true })
const pid = Number(child.stdout.split('\n')[0])
if (pid) {
  shell.exec(`kill -9 ${pid}`)
}

// 运行docker container
shell.exec(`docker container run -d -p 8080:80 ${name}:${version}`)
