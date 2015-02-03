angular.module('toDoList', []).factory('ToDoService', function ($http) {

    var todoCollectionUrl = "https://api.mongolab.com/api/1/databases/tododb/collections/todolist?apiKey=CRZEn0TYiLT1CZpV1_1Jr5LfUvEp4O3n";

    function query()  {
        return $http.get(todoCollectionUrl);
    };

    function save(todo) {
        return $http.post(todoCollectionUrl, todo);
    };

    return { query: query, save: save };
});
