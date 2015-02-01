angular.module('toDoList', []).controller('toDoListController', function($scope) {
	$scope.list = [];

	$scope.getRemainingCount = function() {
	var left = 0;
	angular.forEach($scope.list,function(line) {
		left += line.done ? 0 : 1;
	});
    return left;
	};

	$scope.addNewTodo = function() {
		if ($scope.newLine) {
		  $scope.list.push({text:$scope.newLine, done:false});
		  $scope.newLine = '';
		}
	};
});