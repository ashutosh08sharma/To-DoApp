var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db= mongojs('mongodb://admin:admin@ds053370.mlab.com:53370/todoapp1',['todos']);

/* GET users listing. */
router.get('/todos', function(req, res, next) {
   db.todos.find(function(err,todos){
     if(err){
         res.status(200);
       res.send(err);
     }
     else{
       res.json(todos);
     }
   })
});
// get single todo
router.get('/todo/:id', function(req, res, next) {
    db.todos.findOne({_id: mongojs.ObjectId(req.params.id)},function(err,todos){
        if(err){
            res.status(200);
            res.send(err);
        }
        else{
            res.json(todos);
        }

    });
});
// post a todo
router.post('/todo', function(req,res,next){
    var todo = req.body;
     if(!todo.text || (todo.isCompleted)){
         res.status(400);
         res.send("Error");
     }
      else{
         db.todos.save(todo, function(err,result){
             if(err){
                 res.send(err);
             }else{
                 res.send(result);
             }
         });
     }
});

    router.put('/todo/:id', function(req,res,next){
        var todo = req.body;
        var updateTodo = {};

        if(todo.isCompleted){
            updateTodo.isCompleted = todo.isCompleted;
        }
        if(todo.text){
            updateTodo.text = todo.text;
        }

        if(!updateTodo){
            res.status(400);
            res.json({
                "Error" : "Invalid Data"
            });
        }
        else{
            db.todos.update({
                _id:mongojs.ObjectId(req.params.id)
            },updateTodo,{}, function(err,result){
                if(err){
                    res.status(400);
                    res.json({
                        "Error" : "Problem in inserting"
                    });
                }
                else{
                    res.send(result);
                }
            })
        }

    });

router.delete('/todo/:id', function(req,res,next) {
    db.todos.remove({_id: mongojs.ObjectId(req.params.id)},
        function (err, result) {
            if (err) {
                res.status(400);
                res.json({
                    "Error": "Problem in Deleting"
                });
            }
            else {
                db.todos.find(function(err,todos){
                    if(err){
                        res.status(200);
                        res.send(err);
                    }
                    else{
                        res.json(todos);
                    }
                });
            }
        });

});
module.exports = router;
