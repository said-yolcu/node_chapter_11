var path = require('path')
    , fs = require('fs')

require('http').createServer((req, res) => {
    var file = path.normalize('.' + req.url)
    console.log(`Trying to serve ${file}`)

    function reportError(err) {
        console.log(err)
        res.writeHead(500)
        res.end('Internal Server Error')
    }

    fs.access(file, err => {
        if (!err) {
            fs.stat(file, (err, stat) => {
                var rs

                //res.write(`Stat is ${stat.toString()} END.\n`)

                if (err) {
                    return reportError(err)
                }

                if (stat.isDirectory()) {
                    res.writeHead(403)
                    res.end('Forbidden')
                } else {
                    rs = fs.createReadStream(file)

                    rs.on('error', reportError)

                    res.writeHead(200)

                    rs.pipe(res)
                }
            })
        } else {
            res.writeHead(404)
            res.end('Not found\n')
        }
    })
}).listen(4000)