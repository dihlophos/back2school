var app = angular.module('toDoList', []);
app.constant("DBConfig", { url: "https://api.mongolab.com/api/1/databases/tododb/collections/todolist?apiKey=CRZEn0TYiLT1CZpV1_1Jr5LfUvEp4O3n" });
app.controller('toDoListController', function($scope, myDBService, DBConfig) {
    
	myDBService.getItems(DBConfig.url)
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
			myDBService.upsertItem(DBConfig.url, todo)
				.then(function (data) {
					$scope.message = data;
				}, function (data) {
					console.log("Huh, that's bad...");
				});
	        $scope.newLine = '';
		}
	};
});

app.factory('myDBService', myDBService);