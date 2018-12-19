/*链接MySQL数据库*/
var mysql = require('mysql')

/*iou数据库*/
var connection_iou = mysql.createConnection({
    host     : '192.168.1.216',
    user     : 'iou',
    password : 'test@iou',
    database : 'iou',
    multipleStatements: true //允许执行多条语句
})
connection_iou.connect();


/*info数据库*/
var connection_info = mysql.createConnection({
    host     : '192.168.1.216',
    user     : 'iouInfo',
    password : 'iouInfo@hm',
    database : 'iouInfo',
    multipleStatements: true //允许执行多条语句
})
connection_info.connect();


/*activity数据库*/
var connection_ac = mysql.createConnection({
    host     : '192.168.1.216',
    user     : 'iouac',
    password : 'ac@hm',
    database : 'activity',
    multipleStatements: true //允许执行多条语句
})
connection_ac.connect();




/**
 * 封装sql       iou数据库
 * @param sql
 * @param callback              回调方法
 */
function sqlGet_iou(sql, callback){
    connection_iou.query(sql, function (error, results, fields) {
        if(error){
            throw error
        }else {
            callback(results);
        }
    })
}


/**
 * 封装sql       iouInfo数据库
 * @param sql
 * @param callback              回调方法
 */
function sqlGet_info(sql, callback){
    connection_info.query(sql, function (error, results, fields) {
        if(error){
            throw error
        }else {
            callback(results);
        }
    })
}


/**
 * 封装sql       activity数据库
 * @param sql
 * @param callback              回调方法
 */
function sqlGet_ac(sql, callback){
    connection_ac.query(sql, function (error, results, fields) {
        if(error){
            throw error
        }else {
            callback(results);
        }
    })
}


module.exports = {
    sqlGet_iou,
    sqlGet_info,
    sqlGet_ac
}