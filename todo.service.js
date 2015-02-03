var app = angular.module('toDoList').factory('ToDoService', function ($http, $q) {

    var todoCollectionUrl = "https://api.mongolab.com/api/1/databases/tododb/collections/todolist?apiKey=CRZEn0TYiLT1CZpV1_1Jr5LfUvEp4O3n";

    queryToDoList = function () {

        var deferred = $q.defer();

        //$http.xxx и так возвращает промис.
        //вряд ли есть смысл делать свой собственный промис
        $http.get(todoCollectionUrl)
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(data);
            });

        return deferred.promise;
    };

    saveToDo = function (todo) {

        var deferred = $q.defer();

        $http.post(todoCollectionUrl, todo)
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(data);
            });

        return deferred.promise;
    };

    return { queryToDoList: queryToDoList, saveToDo: saveToDo };
});
