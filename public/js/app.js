angular.module('snowPro', [
	'ngRoute'
])

// route configurations
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/resorts/:resortId', {
			templateUrl: 'views/resort.html',
			controller: 'ResortController'
		})

		.when('/user/:userId', {
			templateUrl: 'views/user.html',
			controller: 'UserController'	
		})

		.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode(true);

}])

.controller('ResortController', ['$scope', '$routeParams', 'Resort', function ($scope, $routeParams, Resort) {

	// populate the resorts array with resorts from the database
	Resort.get($routeParams.resortId).success(function (data) {
		$scope.resort = data;
		$scope.trails = data.trails;
		$scope.lifts = data.lifts;
	});

	$scope.liftFilter = null;
	$scope.count = 0;
	$scope.predicate = "name";

	// set the table filter
	$scope.setFilter = function(lift, $event) {
		$scope.count++;

		if (lift.liftName === "all lifts") {
			$scope.liftFilter = null;
		} else { 
			$scope.liftFilter = lift.liftName;
		}

		$scope.selected = lift;
	};

	// check if list item is selected
	$scope.isSelected = function(lift) {
		// initial page load
		if ($scope.count === 0 && lift.liftName === "all lifts") {
			return true;
		}
		return $scope.selected === lift;
	};

}])

.controller('HomeController', ['$scope', 'Resort', function ($scope, Resort) {

	Resort.get('').success(function (data) {
		$scope.resorts = data;
	});

	$scope.create = function (resort) {
		Resort.create({
			name: resort.name,
			city: resort.city,
			id: resort.id
		}).success(function (data) {
			$scope.resorts.push(data);
		});
	};

	$scope.redirect = function(resort) {
		window.location.href = "/resorts/" + resort.id;
	};

}])

.factory('Resort', ['$http', function($http) {

	return {
		get : function(id) {
			return $http.get('/api/resorts/' + id);
		},

		create : function(resortData) {
			return $http.post('/api/resorts', resortData);
		},

		delete : function(id) {
			return $http.delete('/api/resorts/' + id);
		}
	}

}]);
