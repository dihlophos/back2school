function ToDoListController($scope){
	$scope.list = [];
	$scope.newLine = '';
	
	$scope.left = function() {
	var left = 0
	angular.forEach($scope.list,function(line) {
		left += line.done ? 0 : 1;
	});
    return left;
	}
	
	$scope.submit = function() {
		if ($scope.newLine) {
		  $scope.list.push({text:$scope.newLine,done:false});
		  $scope.newLine = '';
		}
	}
}