var spawn = require('child_process').spawn

var server = require('http').createServer((req, res) => {
    var child = spawn('tail', ['f', '/var/log/syslog'])
    child.stdout.pipe(res)

    res.on('end', () => {
        child.kill()
    })
}).listen(4000)

server.close()
server.listen(4000)