var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({    
  extended: true
}));
app.use(express.static('dist'));
app.all("*", function(req, res, next) { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method == 'OPTIONS') { res.sendStatus(200); } else { next(); } 
});

var jsonData = require('./table.data.json');
var list = JSON.parse(JSON.stringify(jsonData));
var deleteRowIds = [];

app.get('/list', function(req,res,next) {
    var queryKeys = Object.keys(req.query)
    var listKeys = Object.keys(list[0])
    if (queryKeys.length) {
        queryKeys.forEach(function(key) {
            if (['page', 'limit'].indexOf(key) === -1
                && listKeys.indexOf(key) !== -1
            ) {
                list = list.filter(function(item) {
                    return item[key].match(req.query[key])
                })
            }
        })
    }
    if (deleteRowIds.length) {
        list = list.filter(function(item) {
            return deleteRowIds.indexOf(''+item.id) === -1
        })
    }
    // console.log(list)
    setTimeout(function() {
        res.json({
            code: 0,
            info: "ok",
            data: {
                listTotal: list.length,
                listInfo: (+req.query.limit ? list.slice((+req.query.page-1) * +req.query.limit).slice(0, +req.query.limit) : list)
            }
        });
    }, 50)
})
app.get('/find', function(req,res,next) {
    var _id = req.query.id;
    console.log(_id);
    var obj = {};
    for (var i = 0; i < list.length; i++) {
        if(list[i].id == _id){
            console.log(list[i]);
            obj = list[i];
            break;
        }
    }
    // console.log(list)
    setTimeout(function() {
        res.json({
            code: 0,
            info: "ok",
            data: {
                listInfo: obj
            }
        });
    }, 50)
})
app.post('/list/delete', function(req, res, next) {
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
    console.log('++++++++++++++++++');
    console.log(item);
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


