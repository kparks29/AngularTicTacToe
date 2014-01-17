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
	$scope.win = false;
	$scope.moves = 0;
	$scope.players = [
		{chip:'X',gamesWon:0},
		{chip:'O',gamesWon:0,nextMove: [{row:false, num:0},{col:false,num:0},{dia1:false},{dia2:false}]}
	];


	$scope.checkWin = function(player) {
		  for (var i=0; i<$scope.board.length; i++) {
		  	var r=0; c=0; d1=0; d2=0; //reset checking variables
		  	for (var j=0; j<$scope.board[i].length;j++) {
				if ($scope.board[i][j] == player) {r++}; //check rows
				if ($scope.board[j][i] == player) {c++}; //check columns
				if ($scope.board[j][j] == player) {d1++}; //check backward diagonal
				if ($scope.board[j][2-j] == player) {d2++}; //check forward diagonal
				//check to see if there are two moves in a column for the computer to make it's next move
				if (c==2){$scope.players[1].nextMove[1].col = true;$scope.players[1].nextMove[1].num = i;}
		 	}
		 	//check to see if the player won
			if (r == 3 || c == 3 || d1 == 3 || d2 ==3){$scope.win = true; return true;}
			else if ($scope.moves == 9) {$scope.winner="cat's game"}
			  else {
			  	//if they didnt win check for 2 moves in a row for row, backward diagonal, and forward diagonal
			 		if (r==2){$scope.players[1].nextMove[0].row = true; $scope.players[1].nextMove[0].num = i;}
			 		else if (d1==2){$scope.players[1].nextMove[2].dia1 = true;}
			 		else if (d2==2){$scope.players[1].nextMove[3].dia2 = true;}
				}
			//check for cat's game
			
			
		 }
	};


	$scope.resetNextMove = function() {
		$scope.players[1].nextMove[0].num = 0;
		$scope.players[1].nextMove[1].num = 0;
		$scope.players[1].nextMove[0].row = false;
		$scope.players[1].nextMove[1].col = false;
		$scope.players[1].nextMove[2].dia1 = false;
		$scope.players[1].nextMove[3].dia2 = false;
	}

	$scope.nextMove = function() {
		if ($scope.players[1].nextMove[0].row == true && $scope.moves%2 == 1) {
				for(var i=0;i<$scope.board.length;i++){
					if ($scope.board[$scope.players[1].nextMove[0].num][i] == '') {
						$scope.board[$scope.players[1].nextMove[0].num][i] = "O";
						$scope.moves++;
					} 
				}
			}
			if ($scope.players[1].nextMove[1].col == true && $scope.moves%2 == 1) {
				
				for(var i=0;i<$scope.board.length;i++){
					if ($scope.board[i][$scope.players[1].nextMove[1].num] == '') {
						$scope.board[i][$scope.players[1].nextMove[1].num] = "O";
						$scope.moves++;
					} 
				}
			}
			if ($scope.players[1].nextMove[2].dia1 == true  && $scope.moves%2 == 1) {
				for (var i=0;i<$scope.board.length;i++){
					if($scope.board[i][i] == '') {
						$scope.board[i][i] = 'O';
						$scope.moves++;
					}
				} 
			}
			if ($scope.players[1].nextMove[3].dia2 == true && $scope.moves%2 == 1) {
				for (var i=0;i<$scope.board.length;i++) {
					if ($scope.board[i][2-i] == ''){
						$scope.board[i][2-i] = 'O';
						$scope.moves++;
					}
				}
			}
	};


	$scope.computerMove = function() {


		
		//setTimeout(function(){
		//first move
		if ($scope.moves == 1) {
			if ($scope.board[1][1] == '') {
				$scope.board[1][1] = 'O';
				$scope.moves++;
			}
			else {
				$scope.board[0][0] = 'O';	
				$scope.moves++;

			}
		}
		else if ($scope.moves == 3 && $scope.board[2][2] == $scope.players[0].chip && $scope.board[1][1] == $scope.players[0].chip) {
			$scope.board[2][0] = $scope.players[1].chip;
			$scope.moves++;
		}
		else if ($scope.moves%2 == 1){
			//check for win
			//first reload nextMoves
			$scope.resetNextMove();
			$scope.checkWin($scope.players[1].chip);
			$scope.nextMove();
			//reload nextMoves
			if ($scope.moves%2 == 1) {
				$scope.resetNextMove();
				$scope.checkWin($scope.players[0].chip);
				//check for block
				$scope.nextMove();
				//random
				if ($scope.moves%2 == 1) {
					for (var i=0;i<$scope.board.length;i++) {
						for (var j=0;j<$scope.board.length;j++) {
							if ($scope.board[i][j] == '' && $scope.moves%2 == 1) {
								$scope.board[i][j] = 'O';
								$scope.moves++;
							}
						}
					}
				}
			}

		}
		//clear the winner screen

		//},500);

		//check to see if the computer won

		if ($scope.checkWin($scope.players[1].chip)) {$scope.winner = "player 2 wins"};
		$scope.resetNextMove();



	}


	

	$scope.clicked = function(i,j) {
		//check to see if its the user's move and the cell is blank
		if ($scope.moves%2 == 0 && $scope.board[i][j] == '') {
			//increase number of moves
			$scope.moves++;
			//place your move
			$scope.board[i][j] = ($scope.board[i][j] == '' ? 'X' : $scope.board[i][j]);
			//check to see if player 1 wins
			if ($scope.checkWin($scope.players[0].chip)) {$scope.winner = "player 1 wins"};
			//computer's turn
			if (!$scope.win) {
				$scope.computerMove();
			}
		}
		console.log("board = " + $scope.board);
	}
}
