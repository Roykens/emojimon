controllers

.controller('GameCtrl', function($scope, $timeout, $compile, Game, $state) {

	var container = document.getElementById('game-container');

	$scope.game = Game;



	$scope.endGame = function() {
		$scope.game.lose();
		$state.transitionTo('start',$scope, {reload: true})
		angular.element(document.querySelectorAll('emoji')).remove();
	}
	$scope.handleClick = function(type) {
		switch(type) {
			case 'smile':
				$scope.endGame();
				break;
			case 'rage':
				break;
			default:
		}

		$timeout(function() {
			$scope.$apply();
		}, 0);
	}

	$scope.handleFallen = function(type) {
		switch(type) {
			case 'rage':
				$scope.endGame();
				break;
			case 'smile':
				$scope.game.addToScore(1);
		}
	}

	function getRandomIntegerBetween(start, end) {
		return Math.floor(Math.random() * end) + start;
	};


	function createEmoji() {
		if(!$scope.game.isPlaying) {
			return;
		}
		var emoji = {
			type: $scope.game.nextEmoji()
		};

		angular.element(document.getElementById('game-container')).append($compile("<emoji type=" + emoji.type +" handle-click='handleClick(\"" + emoji.type+ "\")' handle-fallen='handleFallen(\"" + emoji.type+ "\")'></emoji>")($scope));

		$timeout(createEmoji, getRandomIntegerBetween(0, $scope.game.pace));
	}

	function newGame(){
		console.log('scope.game', $scope.game);
		$scope.game.start();
		createEmoji()
	}

	newGame();
});