//CRUD методы можно назвать традиционным для ангуляра способом: query, save

ToDoService = function ($http, $q) {

    getItems = function (url) {
		
        var deferred = $q.defer();

        //$http.xxx и так возвращает промис.
        //вряд ли есть смысл делать свой собственный промис
        $http.get(url)
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(data);
            });
		
        return deferred.promise;
    };

    upsertItem = function(url,item) {

        var deferred = $q.defer();

        $http.post(url, item)
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.reject(data);
            });

        return deferred.promise;
    };

    return { getItems: getItems, upsertItem: upsertItem };
};

