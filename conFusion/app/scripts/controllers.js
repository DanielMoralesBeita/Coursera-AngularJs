'use strict';

angular.module('confusionApp')

	.controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

		$scope.tab = 1;
		$scope.filtText = '';
		$scope.showDetails = false;

		//$scope.dishes = menuFactory.getDishes();

		$scope.dishes = {};
		$scope.showMenu = false;
		$scope.message = "Loading ...";

		menuFactory.getDishes().query(
			function (response) {
				$scope.dishes = response;
				$scope.showMenu = true;
			},
			function (response) {
				$scope.message = "Error: " + response.status + " " + response.statusText;
			});

		//menuFactory.getDishes()
		//	.then(
		//		function (response) {
		//			$scope.dishes = response.data;
		//			$scope.showMenu = true;
		//		},
		//		function (response) {
		//			$scope.message = "Error: " + response.status + " " + response.statusText;
		//		}
		//	);


		$scope.select = function (setTab) {
			$scope.tab = setTab;

			if (setTab === 2) {
				$scope.filtText = "appetizer";
			}
			else if (setTab === 3) {
				$scope.filtText = "mains";
			}
			else if (setTab === 4) {
				$scope.filtText = "dessert";
			}
			else {
				$scope.filtText = "";
			}
		};

		$scope.isSelected = function (checkTab) {
			return ($scope.tab === checkTab);
		};

		$scope.toggleDetails = function () {
			$scope.showDetails = !$scope.showDetails;
		};
	}])

	.controller('ContactController', ['$scope', function ($scope) {

		$scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};

		var channels = [
			{value: "tel", label: "Tel."},
			{value: "Email", label: "Email"}
		];

		$scope.channels = channels;
		$scope.invalidChannelSelection = false;

	}])

	.controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

		$scope.sendFeedback = function () {
			if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
				$scope.invalidChannelSelection = true;
			}
			else {
				feedbackFactory.sendFeedback().save($scope.feedback).$promise.then(
					function (response) {
						console.log('saveOK response');
					},
					function (response) {
						console.log("Error: " + response.status + " " + response.statusText);
					}
				);
				$scope.invalidChannelSelection = false;
				$scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};
				$scope.feedback.mychannel = "";
				$scope.feedbackForm.$setPristine();
			}
		};
	}])

	//.controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory', function ($scope, $routeParams, menuFactory) {
	//
	//	var dish = menuFactory.getDish(parseInt($routeParams.id, 10));
	//
	//	$scope.dish = dish;
	//
	//}])
	.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {

		//var dish = menuFactory.getDish(parseInt($stateParams.id, 10));
		$scope.dish = {};
		$scope.showDish = false;
		$scope.message = "Loading ...";
		$scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)})
			.$promise.then(
				function (response) {
					$scope.dish = response;
					$scope.showDish = true;
				},
				function (response) {
					$scope.message = "Error: " + response.status + " " + response.statusText;
				}
			);
		//menuFactory.getDish(parseInt($stateParams.id, 10))
		//	.then(
		//		function (response) {
		//			$scope.dish = response.data;
		//			$scope.showDish = true;
		//		},
		//		function (response) {
		//			$scope.message = "Error: " + response.status + " " + response.statusText;
		//		}
		//	);

	}])

	.controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
		$scope.defaultRadioChosen = 5;
		var score = [
			{value: "1", label: "1"},
			{value: "2", label: "2"},
			{value: "3", label: "3"},
			{value: "4", label: "4"},
			{value: "5", label: "5"}
		];
		$scope.scores = score;
		//Step 1: Create a JavaScript object to hold the comment from the form
		$scope.commentFormData = {rating: 5, author: '', comment: '', date: ''};

		$scope.submitComment = function () {
			//Step 2: This is how you record the date
			$scope.commentFormData.date = new Date().toISOString();

			// Step 3: Push your comment into the dish's comment array
			$scope.dish.comments.push($scope.commentFormData);

			menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);

			//Step 4: reset your form to pristine
			$scope.commentForm.$setPristine();

			//Step 5: reset your JavaScript object that holds your comment
			$scope.commentFormData = {name: '', rating: 5, author: ''};
		}
	}])

	// implement the IndexController and About Controller here
	.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {

		//$scope.featured = menuFactory.getDish(2);
		$scope.featured = {};
		$scope.showDish = false;
		$scope.message = "Loading ...";
		$scope.featured = menuFactory.getDishes().get({id: 0})
			.$promise.then(
				function (response) {
					$scope.featured = response;
					$scope.showDish = true;
				},
				function (response) {
					$scope.message = "Error: " + response.status + " " + response.statusText;
				}
			);
		//menuFactory.getDish(0)
		//	.then(
		//		function (response) {
		//			console.log(response);
		//			$scope.featured = response.data;
		//			$scope.showDish = true;
		//		},
		//		function (response) {
		//			$scope.message = "Error: " + response.status + " " + response.statusText;
		//		}
		//	);

		//$scope.promotion = menuFactory.getPromotion(0);
		$scope.showPromotion = false;
		$scope.promotion = menuFactory.getPromotion().get({id: 0})
			.$promise.then(
				function (response) {
					$scope.promotion = response;
					$scope.showPromotion = true;
				},
				function (response) {
					$scope.message = "Error: " + response.status + " " + response.statusText;
				}
			);

		//$scope.chef = corporateFactory.getLeader(3);
		$scope.showLeader = false;
		$scope.chef = corporateFactory.getLeaders().get({id: 3})
			.$promise.then(
				function (response) {
					$scope.chef = response;
					$scope.showLeader = true;
				},
				function (response) {
					$scope.message = "Error: " + response.status + " " + response.statusText;
				}
			);
	}])

	.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
		//$scope.corpPeople = corporateFactory.getLeaders();
		$scope.showCorp = false;
		corporateFactory.getLeaders().query(
			function (response) {
				$scope.corpPeople = response;
				$scope.showCorp = true;
			},
			function (response) {
				$scope.message = "Error: " + response.status + " " + response.statusText;
			});

	}]);