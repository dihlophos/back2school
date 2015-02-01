angular.module('toDoList', []).controller('toDoListController', function($scope) {
	$scope.list = [];

	//в этой строке есть bad-practice, который может привести к очень печальным последствиям.
	//чтобы понять что это за ошибка, и исправить, прочитай Angular dev guide от Introduction до Scopes включительно.
	// https://docs.angularjs.org/guide/introduction
	$scope.newLine = '';

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