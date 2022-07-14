var server = require('http').createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    var left = 10
    var interval = setInterval(() => {
        // normally when I set i's upper limit 1, the for loop
        // waits for 10 seconds than prints the writings all together.
        // But when upper limit is 10, it prints in two chunks.
        // When upper limit is 100 it prints in 10 chunks
        for (var i = 0; i < 100; i++) {
        res.write(`${Date.now()} `)
        }
        if (--left === 0) {
            clearInterval(interval)
            res.end()
            server.close()
        }
    }, 1000)
}).listen(4000)