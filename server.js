var http = require('http')
var echarts = require('echarts');
const {createCanvas} = require('canvas');
var url = require('url')

function processConfig(request, response, callback) {
    var queryData = ''
    if (typeof callback !== 'function') {
        return null
    }
    if (request.method === 'GET') {
        var arg = url.parse(request.url, true).query
        if (!arg.config) {
            response.end('request parameter "config" invalid')
            return
        }
        request.config = arg.config
        callback()
    } else {
        request.on('data', function (data) {
            queryData += data
            if (queryData.length > 1e6) {
                response.end('request body too large')
            }
        })
        request.on('end', function () {
            request.config = queryData
            callback()
        })
    }
}

var server = http.createServer(function (request, response) {
    processConfig(request, response, function () {
        var config
        try {
            config = JSON.parse(request.config)
        } catch (e) {
            response.end('request parameter "config" format invalid, is not JSON')
            return
        }
        if (!config || !config.option) {
            response.end('request parameter "config" format invalid')
            return
        }

        if (!config.renderer || config.renderer === 'canvas') {
            const canvas = createCanvas(config.width || 600, config.height || 400);
            const chart = echarts.init(canvas);
            chart.setOption(config.option);

            // ECharts can use the Canvas instance created by node-canvas as a container directly


            response.setHeader('Content-Type', 'image/png');
            response.write(canvas.toBuffer('image/png'));
            response.end();
        } else if (config.renderer === 'svg') {
            const svg = echarts.init(null, null, {
                renderer: 'svg',
                ssr: true, // enable Server Side Render
                width: config.width || 600,
                height: config.height || 400
            });
            svg.setOption(config.option);
            response.writeHead(200, {
              'Content-Type': 'application/xml'
            });
            response.write(svg.renderToSVGString());
            response.end();
        }

    })
})

var hostName = '0.0.0.0'
var port = 8081
server.listen(port, hostName, function () {
    console.log(`server started at port ${port}`)
})
