var app = angular.module('toDoList', []);
app.constant("DBConfig", { url: "https://api.mongolab.com/api/1/databases/tododb/collections/todolist?apiKey=CRZEn0TYiLT1CZpV1_1Jr5LfUvEp4O3n" });
app.controller('toDoListController', function($scope, myDBService, DBConfig) {
    
	ToDoService.getItems(DBConfig.url)
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
		console.log("!!")
		updateDBDocument(line);
	}
	
	updateDBDocument = function (doc) {
		ToDoService.upsertItem(DBConfig.url, doc)
			.then(function (data) {
				console.log("Updated: id=" + doc._id);
			}, function (data) {
				console.log("Huh, that's bad...");
			});	
	}
	
});

//фактори лучше цеплять к модулю в месте ее определения, то есть в файле с фактори
app.factory('ToDoService', ToDoService);
