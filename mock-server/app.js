var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('dist'));
app.all("*", function(req, res, next) { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method == 'OPTIONS') { res.send(200); } else { next(); } 
});

var list = require('./table.data.json')

app.get('/list', function(req,res,next) {
    console.log(req.query)
    var result = JSON.parse(JSON.stringify(list))
    if (req.query.name) {
        result = result.filter(function(item) {
            return item.name.match(req.query.name)
        })
    }
    if (req.query.type) {
        result = result.filter(function(item) {
            return item.type.match(req.query.type)
        })
    }
    if (req.query.borrowtype) {
        result = result.filter(function(item) {
            return item.borrowtype.match(req.query.borrowtype)
        })
    }
    if (req.query.enterprise) {
        result = result.filter(function(item) {
            return item.enterprise.match(req.query.enterprise)
        })
    }
    console.log(result)
    res.json({
        code:0,
        info:"ok",
        data: {
            listTotal: result.length,
            list: result.slice((+req.query.page-1) * +req.query.size).slice(0, +req.query.size)
        }
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


