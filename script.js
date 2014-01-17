function mainCtrl($scope) {
	$scope.xturn={val:false};
	$scope.cell = '';
	$scope.board = new Array(3);
	for (var i=0;i<$scope.board.length;i++) {
		$scope.board[i] = new Array(3);
		for (var j=0;j<$scope.board.length;j++) {
			$scope.board[i][j] = '';
		}
	}
	$scope.winner = "";
	$scope.moves = 0;
	$scope.players = [
		{chip:'X',gamesWon:0},
		{chip:'O',gamesWon:0}
	];

	$scope.computerMove = function() {
		++$scope.moves;

		if ($scope.checkWin($scope.players[0].chip)) {$scope.winner = "player 1 wins"};
		if ($scope.checkWin($scope.players[1].chip)) {$scope.winner = "player 2 wins"};

		console.log($scope.moves);
		$scope.winner = "computerMove";
		setTimeout(function(){
			console.log('inside');
			if ($scope.moves == 1) {
				console.log("moves is 1")
				if ($scope.board[1][1] == '') {
					console.log('center spot is blank');
					$scope.board[1][1] = 'O';
					$scope.cell = 'O';
					console.log('entered value');
					console.log($scope.board[1][1]);
				}
				else {
					$scope.board[0][1] = 'O';

					console.log('entered value');
					console.log($scope.board[0][1]);
				}
		}
		else {
			
		}
		$scope.winner = "";

		},500);


		
	}


	$scope.checkWin = function(player) {
		  for (var i=0; i<$scope.board.length; i++) {
		  	var r=0; c=0; d1=0; d2=0;
		  	for (var j=0; j<$scope.board[i].length;j++) {
				if ($scope.board[i][j] == player) {r++};
				if ($scope.board[j][i] == player) {c++};
				if ($scope.board[j][j] == player) {d1++};
				if ($scope.board[j][2-j] == player) {d2++};
		 	}
			if (r == 3 || c == 3 || d1 == 3 || d2 ==3){return true;};
			if ($scope.moves == 9) {$scope.winner="cat's game"}
			
		 }
	};
}
