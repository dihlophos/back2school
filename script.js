var app = angular.module('toDoList', []);
app.controller('toDoListController', function ($scope, ToDoService) {

    ToDoService.queryToDoList()
        .then(function (data) {
            $scope.list = data;
        }, function (data) {
            console.log("Huh, that's bad...");
        });
	
	$scope.getRemainingCount = function() {
	    var left = 0;
	    angular.forEach($scope.list, function (line) {
		    left += line.done ? 0 : 1;
	    });
        return left;
	};

    $scope.addNewTodo = function () {
	    if ($scope.newLine) {
			var todo = { _id: $scope.list.length, text: $scope.newLine, done: false }
	        $scope.list.push(todo);
			updateDBDocument(todo);
	        $scope.newLine = '';
		}
	};
	
	$scope.updateTodo = function(line)	{
		updateDBDocument(line);
	}
	
	updateDBDocument = function (doc) {
	    ToDoService.saveToDo(doc)
			.then(function (data) {
				console.log("Updated: id=" + doc._id);
			}, function (data) {
				console.log("Huh, that's bad...");
			});	
	}
	
});
