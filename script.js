angular.module('toDoList', []).controller('toDoListController', function($scope) {
	$scope.list = [];

	//в этой строке есть bad-practice, который может привести к очень печальным последствиям.
	//чтобы понять что это за ошибка, и исправить, прочитай Angular dev guide от Introduction до Scopes включительно.
	// https://docs.angularjs.org/guide/introduction
	$scope.newLine = '';

	// хорошим стилем является именование методов начиная с глагола. Методы выполняют действие.
	// лучше назвать getRemainingCount
	$scope.getRemainingCount = function() {
	var left = 0 //точки с запятой. Их отсутствие может стать проблемой при минификации кода. Юзай IDE с синтаксическим контролем.
	angular.forEach($scope.list,function(line) {
		left += line.done ? 0 : 1;
	});
    return left;
	};

	//название метода тоже ни о чем не говорит. Сабмит чего? Пусть будет addNewTodo
	$scope.submit = function() {
		if ($scope.newLine) {
		  $scope.list.push({text:$scope.newLine,done:false}); //юзай пробелы :)
		  $scope.newLine = '';
		}
	};
});