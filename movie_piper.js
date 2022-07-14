var fs= require('fs')

require('http').createServer((req,res) => {
    res.writeHead(200, {'Content-Type': 'video/mp4'})
    var rs= fs.createReadStream('sintel-short.mp4')
    rs.pipe(res)
}).listen(4000)