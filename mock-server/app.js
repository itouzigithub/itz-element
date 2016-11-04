var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('dist'));
app.all("*", function(req, res, next) { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method == 'OPTIONS') { res.sendStatus(200); } else { next(); } 
});

var list = require('./table.data.json')
var deleteRowIds = []

app.get('/list', function(req,res,next) {
    console.log(req.query, ' And has been deleted rows are:', deleteRowIds)
    var result = JSON.parse(JSON.stringify(list))
    var queryKeys = Object.keys(req.query)
    var listKeys = Object.keys(result[0])
    if (queryKeys.length) {
        queryKeys.forEach(function(key) {
            if (['page', 'limit'].indexOf(key) === -1
                && listKeys.indexOf(key) !== -1
            ) {
                result = result.filter(function(item) {
                    return item[key].match(req.query[key])
                })
            }
        })
    }
    if (deleteRowIds.length) {
        result = result.filter(function(item) {
            return deleteRowIds.indexOf(''+item.id) === -1
        })
    }
    // console.log(result)
    setTimeout(function() {
        res.json({
            code: 0,
            info: "ok",
            data: {
                listTotal: result.length,
                listInfo: (+req.query.limit ? result.slice((+req.query.page-1) * +req.query.limit).slice(0, +req.query.limit) : result)
            }
        });
    }, 1000)
})
app.post('/list/delete', function(req, res, next) {
    var queryData = '';
    req.on('data', function(data) {
        queryData += data;
        if(queryData.length > 1e6) {
            queryData = "";
            res.writeHead(413, {'Content-Type': 'text/plain'});
            res.end();
            req.connection.destroy();
        }
    });
    req.on('end', function() {
        var post = {};
        queryData.split('&').forEach(function(item) {
            var field = item.split('=').map(function(i) {
                return decodeURIComponent(i)
            })
            if (field[0].indexOf('[]') !== -1) {
                field[0] = field[0].replace('[]', '')
            }
            if (post[field[0]]) {
                if (post[field[0]] instanceof Array) {
                    post[field[0]].push(field[1])
                } else {
                    post[field[0]] = [ post[field[0]], field[1] ]
                }
            } else {
                post[field[0]] = field[1]
            }
        })
        req.body = post;
        console.log(req.body, ' And has been deleted rows are:', deleteRowIds)
        if (!(req.body.id instanceof Array) && isNaN(req.body.id)) {
            res.json({
                code: 1,
                info: "缺少项目 id",
                data: {}
            });
        }
        deleteRowIds = deleteRowIds.concat(req.body.id).filter(function(val, index, self) {
            return self.indexOf(val) === index
        })
        setTimeout(function() {
            res.json({
                code: 0,
                info: "ok",
                data: {}
            });
        }, 200)
    });
})
app.post('/save', function(req,res,next) {
    var item = req.body;
    if (item.id && item.id != -1) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == item.id) {
                list[i] = item;
                break;
            }
        }
    } else {
        item.id = list.length+1;
        list.push(item);
    }
    res.send({code:0,info:"ok",data:item});
});
app.delete('/delete/:id',function(req,res,next) {
    // var item = req.body;
    // console.log(item);
    var _id = req.params.id;
    console.log(_id);
    if (_id) {
        for (var i = 0; i < list.length; i++) {
            if (_id == list[i].id) {
                list.splice(i,1);
            }
        }
        res.send({code:0,info:"ok"});
    }else{
        res.status(500).end();
    }
});

app.listen(8888, function () { console.log('server is running...'); });


