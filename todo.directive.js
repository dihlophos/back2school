angular.module('toDoList').directive('todoList', function (ToDoService) {
	
	function link(scope, element, attrs) {
		
		getDBDocuments();
		
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
