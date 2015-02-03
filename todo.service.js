angular.module('toDoList').factory('ToDoService', function ($http) {

    var todoCollectionUrl = "https://api.mongolab.com/api/1/databases/tododb/collections/todolist?apiKey=CRZEn0TYiLT1CZpV1_1Jr5LfUvEp4O3n";

    //никогда, никогда не делай определения перемнных без var.
    //вот почему: http://stackoverflow.com/questions/2485423/javascript-is-using-var-to-declare-variables-optional
    //тут лучше написать function query() {...}
    queryToDoList = function () {
        return $http.get(todoCollectionUrl);
    };

    saveToDo = function (todo) {
        return $http.post(todoCollectionUrl, todo);
    };

    return { queryToDoList: queryToDoList, saveToDo: saveToDo };
});
