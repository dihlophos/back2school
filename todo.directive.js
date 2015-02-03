angular.module('toDoList').directive('todoList', function (ToDoService) {
	
	function link(scope, element, attrs) {
		
		scope.$on("todoListUpdated", function()
		{
			ToDoService.queryToDoList()
				.then(function (answer) {
					scope.list = answer.data;
				}, function (answer) {
					console.log("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
				});		
		})
		
		ToDoService.queryToDoList()
        .then(function (answer) {
            scope.list = answer.data;
        }, function (answer) {
            console.log("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
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
				scope.list.push(todo);
				updateDBDocument(todo);
				scope.newLine = '';
				scope.$parent.$broadcast("todoListUpdated");
			}
		};

		scope.updateTodo = function (line) {
			updateDBDocument(line);
			scope.$parent.$broadcast("todoListUpdated");
		}

		updateDBDocument = function (doc) {
			ToDoService.saveToDo(doc)
				.then(function (answer) {
					console.log("Updated: id=" + doc._id);
				}, function (answer) {
					console.log("Error. Status: " + answer.status + "; StatusText: " + answer.statusText);
				});
		}
		
	}
	
    return {
		restrict:"E",
		templateUrl: "todo.list-template.html",
		scope:{
			disabled:"="
		},
		link:link
    };
});
