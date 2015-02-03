angular.module('toDoList').factory('ToDoService', function ($http) {

    var todoCollectionUrl = "https://api.mongolab.com/api/1/databases/tododb/collections/todolist?apiKey=CRZEn0TYiLT1CZpV1_1Jr5LfUvEp4O3n";

    queryToDoList = function () {
        return $http.get(todoCollectionUrl);
    };

    saveToDo = function (todo) {

        return $http.post(todoCollectionUrl, todo);
    };

    return { queryToDoList: queryToDoList, saveToDo: saveToDo };
});
