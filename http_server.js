var http = require('http')
var util = require('util')
var net = require('net')

// i do not know how to establish a connection between 
// two servers
var server = http.createServer()
var tcp_server = net.createServer().listen(4001)
var buffer = Buffer.from('Oh hi Mark')

server.on('request', (req, res) => {
    /*
    res.writeHead(200, {
        'Content-Type': 'text/plain'
        , 'Cache-Control': 'max-age=3600'
    })
    */
    // cannot use setHeader and writeHead together
    res.setHeader('Cache-Control', 'max-age=4600')
    res.write('Hello World\n')
    res.write(`${req.method} \n`)
    res.write(`${req.url}\n`)
    res.write(buffer)
    res.end(`${util.inspect(req.headers)} \n`)
})

tcp_server.on('connection', socket => {
    socket.write('Data transfer')
})

server.on('connection', socket => {
    // this does not effect req.headers' connection property
    socket.setKeepAlive(false)
})

server.listen(4000)

// this is shorthand form
/*
require('http').createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello World!')
}).listen(4000)

*/