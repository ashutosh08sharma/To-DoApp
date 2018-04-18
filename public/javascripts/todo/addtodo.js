/**
 * Created by Ashutosh on 3/15/2017.
 */
var app = angular.module('todoApp',[])
    .controller("addCtrl", function($scope,$http){

        $scope.getTodo = function() {
            $http({
                method: 'GET',
                url: '/api/todos',
            }).then(function (data) {
                $scope.todos = data.data;
            }, function (err) {
                console.log("err" + err);
            });
        }

        $scope.addTodo = function(){
            $http({
                method:'POST',
                data:{
                    "text" : $scope.add ,
                    "isCompleted": false
                },
                url: '/api/todo',
            }).then(function(data){
                $scope.todos.push(data.data);
            },function(err){
                console.log("err"+err);
            });
        }

        $scope.delete = function(todo) {
                var res = JSON.stringify(todo)
            if (todo.isComplelted === true) {
                $http({
                    method: 'Delete',
                    url: '/api/todo/'+todo._id
                }).then(function (data) {
                    $scope.todos =data.data;
                    console.log("Delete", data);
                }, function (err) {
                    console.log("Error" + err);
                });
            }
        }

});