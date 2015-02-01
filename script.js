angular.module('toDoList', []).controller('toDoListController', function() {
	this.list = [];
	
	this.getRemainingCount = function() {
	var left = 0;
	angular.forEach(this.list,function(line) {
		left += line.done ? 0 : 1;
	});
    return left;
	};

	this.addNewTodo = function() {
		if (this.newLine) {
		  this.list.push({text:this.newLine, done:false});
		  this.newLine='';
		}
	};
});