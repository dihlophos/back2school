angular.module('toDoList').directive('todoList', function (ToDoService) {

	//функция link (как и подразумевает ее название) нужна для работы с DOM
	//логика директивы (которая уже не взаимодействует с DOM напрямую) должна находиться в функции controller
	function link(scope, element, attrs) {
		
		getDBDocuments();

		//можно записать короче: scope.$on("todoListUpdated", getDBDocuments)
		scope.$on("todoListUpdated", function()
		{
			getDBDocuments();	
		});

		scope.getRemainingCount = function () {
			var left = 0;
			angular.forEach(scope.list, function (line) {
				left += line.done ? 0 : 1;
			});
			return left;
		};

		scope.addNewTodo = function () {
			if (scope.newLine) {
				var todo = { _id: scope.list.length, text: scope.newLine, done: false }
				updateDBDocument(todo);
				scope.newLine = '';
			}
		};

		scope.updateTodo = function (line) {
			updateDBDocument(line);
		};
		
		function getDBDocuments() {
			ToDoService.queryToDoList()
				.then(function (answer) {
					scope.list=answer.data;
				}, function (answer) {
					console.log("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
					return [];
				});
		};
		
		function updateDBDocument(doc) {
			ToDoService.saveToDo(doc)
				.then(function (answer) {
					//ты делаешь рассылку событий с уровня родителя текущего скоупа.
					//в этом случае, если разные тудулисты будут находиться в родителе родителя текущего скоупа, или в любом из его дочерних скоупов - они не получат сообщения.
					//в данном случае событие нужно кидать с уровня $rootScope
					scope.$parent.$broadcast("todoListUpdated");
					console.log("Updated: id=" + doc._id);
				}, function (answer) {
					console.log("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
				});
		};
		
	}
	
    return {
		restrict:"E",
		templateUrl: "todo.list-template.html",
		scope:{
			disabled:"="
		},
		link:link,
    };
});
