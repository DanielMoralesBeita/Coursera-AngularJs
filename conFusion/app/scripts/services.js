'use strict';

angular.module('confusionApp')
	.constant("baseURL", "http://localhost:3000/")
	//.factory('menuFactory', ['$http', 'baseURL', function ($http, baseURL) {
	.factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
		var menufac = {};

		// implement a function named getPromotion
		// that returns a selected promotion.
		//menufac.getPromotion = function (index) {
		//	return promotions[index];
		//};
		menufac.getPromotion = function () {
			return $resource(baseURL + "promotions/:id", null, {'update': {method: 'PUT'}});
		};

		menufac.getDishes = function () {
			return $resource(baseURL + "dishes/:id", null, {'update': {method: 'PUT'}});
		};

		//menufac.getDishes = function () {
		//	return $http.get(baseURL + 'dishes');
		//};
		//menufac.getDish = function (index) {
		//	return $http.get(baseURL + 'dishes/' + index);
		//};

		return menufac;
	}])
	.factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

		var corpfac = {};

		// Implement two functions, one named getLeaders,
		corpfac.getLeaders = function () {
			return $resource(baseURL + "leadership/:id", null, {'update': {method: 'PUT'}});
		};

		//corpfac.getLeaders = function () {
		//	return leadership;
		//};

		// the other named getLeader(index)
		//corpfac.getLeader = function (index) {
		//	return leadership[index];
		//};

		// Remember this is a factory not a service
		return corpfac;

	}])

	.factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
		var feedfac = {};

		feedfac.sendFeedback = function () {
			return $resource(baseURL + "feedback/:id", null, {'update': {method: 'POST'}});
		};

		return feedfac;
	}]);
