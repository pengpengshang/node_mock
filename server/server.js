var http = require("http");
var express = require('express');
var path = require('path'); //系统路径模块
var fs = require('fs'); //文件模块
var bodyParser = require('body-parser'); //对post请求的请求体进行解析模块
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
var mysql = require("./mysql");



//设置允许跨域请求
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
    res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
    res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

/**
 * get 请求
 */
app.get('/process_get', function (req, res) {
    // 输出 JSON 格式
    var response = {
        "first_name": req.query.first_name,
        "last_name": req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})



/**
 * 读取json文件并回传数据 GET请求
 */
app.get('/mock/getJosn', function (req, res) {
    var file = path.join(__dirname, '../json/test.json');
    fs.readFile(file, 'utf-8', function (err, data) {
        if(err){
            res.send('文件读取失败');
        }else {
            var obj = JSON.parse(data);
            res.send(obj.data2);
        }
    })
})

































/**
 * 读取json文件中数据并回传  POST请求
 */
app.post('/mock/post', function (req, res) {
    req.on('data', function (data) {
        var file = path.join(__dirname, '../json/test.json');
        fs.readFile(file, 'utf-8', function (err, data) {
            if (err) {
                res.send('文件读取失败');
            } else {
                var obj = JSON.parse(data);
                res.send(obj.data1);
            }
        })

    })
})


/**
 * get请求，从数据库中读取数据              iou数据库数据
 */
app.get('/mock/sql_iou', function (req, res) {
    mysql.sqlGet_iou('SELECT * FROM T_Customer WHERE UserId = 1279', function (data) {
        console.log(data);
        res.send(data);
    });
})



/**
 * get请求，从数据库中读取数据              info数据库数据
 */
app.get('/mock/sql_info', function (req, res) {
    mysql.sqlGet_info('SELECT * FROM T_ContentCollect WHERE AutoId = 111', function (data) {
        console.log(data);
        res.send(data);
    });
})



/**
 * get请求，从数据库中读取数据              activity数据库数据
 */
app.get('/mock/sql_ac', function (req, res) {
    mysql.sqlGet_ac('SELECT * FROM T_Lotto_Customer WHERE AutoId = 13', function (data) {
        console.log(data);
        res.send(data);
    });
})


var server = app.listen(8881, function () {
    var host = server.address().addressLine
    var port = server.address().port
    console.log('服务启动在：192.168.1.111:8881')
})