angular.module('toDoList', []).controller('toDoListController', function() {
    //те объекты которые нужны на вьюхе должны класть в $scope
    //this в JS это черная магия, его юзать надо только там где хорошо понимаешь зачем он:)
	this.list = [];

	this.getRemainingCount = function() {
	var left = 0;
	angular.forEach(this.list,function(line) {
		left += line.done ? 0 : 1;
	});
    return left;//за неправильную табуляцию программисты в аду горят
	};

	this.addNewTodo = function() {
		if (this.newLine) {
		  this.list.push({text:this.newLine, done:false});
		  this.newLine='';
		}
	};
});