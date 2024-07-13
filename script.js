// Function to clear input fields
function clearInputFields() {
    document.getElementById("player1Name").value = "";
    document.getElementById("player2Name").value = "";
}

// Function to start the game
function startGame() {
    const form = document.getElementById("playerForm");
    const player1Input = document.getElementById("player1Name");
    const player2Input = document.getElementById("player2Name");
    const player1Error = document.getElementById("player1Error");
    const player2Error = document.getElementById("player2Error");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let hasError = false;

        // Validate player 1 input
        if (player1Input.value.trim() === "") {
            player1Error.style.display = "inline";
            hasError = true;
        } else {
            player1Error.style.display = "none";
        }

        // Validate player 2 input
        if (player2Input.value.trim() === "") {
            player2Error.style.display = "inline";
            hasError = true;
        } else {
            player2Error.style.display = "none";
        }

        // If no errors, display player info and hide form
        if (!hasError) {
            displayPlayerInfo();
            form.style.display = "none";
        }
    });

    // Event listener for player 1 input change
    player1Input.addEventListener("input", () => {
        if (player1Input.value.trim() !== "") {
            player1Error.style.display = "none";
        }
    });

    // Event listener for player 2 input change
    player2Input.addEventListener("input", () => {
        if (player2Input.value.trim() !== "") {
            player2Error.style.display = "none";
        }
    });
}

// Function to create the initial game board
function createGameBoard() {
    return [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
}

// Initialize game board
let board = createGameBoard();

// Function to handle player moves
function makeMove(row, col) {
    const error = document.getElementById("moveError");
    if (board[row][col] === 0) {
        board[row][col] = player ? 'X' : 'O';
        const result = checkGame();
        if (result === 0 || result === 1) {
            completeGame(result);
        }
        player = !player;
    } else {
        showErrorModal('Invalid move, cell already taken.');
        error.style.display = "inline";
        setTimeout(() => {
            error.style.display = "none";
        }, 1000);
    }
    displayGameBoard();
}

// Function to check if the game is over
function checkGame() {
    // Check for a winner
    if ((board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][0] != 0) || // first row
        (board[1][0] == board[1][1] && board[1][1] == board[1][2] && board[1][0] != 0) || // second row
        (board[2][0] == board[2][1] && board[2][1] == board[2][2] && board[2][0] != 0) || // third row
        (board[0][0] == board[1][0] && board[1][0] == board[2][0] && board[0][0] != 0) || // first col
        (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[0][1] != 0) || // second col
        (board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[0][2] != 0) || // third col
        (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != 0) || // main diagonal
        (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != 0)    // second diagonal
    ) {
        return 0; // Winner found
    }

    // Check if the board is full (tie)
    let gameCompleted = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
                gameCompleted = false;
                break;
            }
        }
        if (!gameCompleted) break;
    }

    if (gameCompleted) {
        return 1; // Tie
    }

    return -1; // Game continues
}

// Function to display player information
function displayPlayerInfo() {
    const player1Name = document.getElementById("player1Name").value.trim();
    const player2Name = document.getElementById("player2Name").value.trim();
    const playerInfo = document.getElementById("playerInfo");
    playerInfo.innerHTML = `
        <h1 class="player-name">Player 1 (X): ${player1Name}</h1>
        <h1 class="player-name">Player 2 (O): ${player2Name}</h1>
    `;
}

// Function to display the game board
function displayGameBoard() {
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = `
        <button onClick="makeMove(0, 0)" id="button1" class="grid-item" data-index="1">${board[0][0] == 0 ? "" : board[0][0]}</button>
        <button onClick="makeMove(0, 1)" id="button2" class="grid-item" data-index="2">${board[0][1] == 0 ? "" : board[0][1]}</button>
        <button onClick="makeMove(0, 2)" id="button3" class="grid-item" data-index="3">${board[0][2] == 0 ? "" : board[0][2]}</button>
        <button onClick="makeMove(1, 0)" id="button4" class="grid-item" data-index="4">${board[1][0] == 0 ? "" : board[1][0]}</button>
        <button onClick="makeMove(1, 1)" id="button5" class="grid-item" data-index="5">${board[1][1] == 0 ? "" : board[1][1]}</button>
        <button onClick="makeMove(1, 2)" id="button6" class="grid-item" data-index="6">${board[1][2] == 0 ? "" : board[1][2]}</button>
        <button onClick="makeMove(2, 0)" id="button7" class="grid-item" data-index="7">${board[2][0] == 0 ? "" : board[2][0]}</button>
        <button onClick="makeMove(2, 1)" id="button8" class="grid-item" data-index="8">${board[2][1] == 0 ? "" : board[2][1]}</button>
        <button onClick="makeMove(2, 2)" id="button9" class="grid-item" data-index="9">${board[2][2] == 0 ? "" : board[2][2]}</button>
    `;
}

// Function to show error modal
function showErrorModal(msg) {
    alert(msg);
}

// Function to reset the game
function resetGame() {
    board = createGameBoard();
    player = true;
    displayGameBoard();
    hideResult();
    enableGameBoard();
}

// Function to start a new game
function newGame() {
    const form = document.getElementById("playerForm");
    const player1Input = document.getElementById("player1Name");
    const player2Input = document.getElementById("player2Name");
    const player1Error = document.getElementById("player1Error");
    const player2Error = document.getElementById("player2Error");

    form.style.display = "flex";
    clearInputFields();

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let hasError = false;

        // Validate player 1 input
        if (player1Input.value.trim() === "") {
            player1Error.style.display = "inline";
            hasError = true;
        } else {
            player1Error.style.display = "none";
        }

        // Validate player 2 input
        if (player2Input.value.trim() === "") {
            player2Error.style.display = "inline";
            hasError = true;
        } else {
            player2Error.style.display = "none";
        }

        // If no errors, display player info and hide form
        if (!hasError) {
            displayPlayerInfo();
            form.style.display = "none";
            resetGame();
        }
    });

    // Event listener for player 1 input change
    player1Input.addEventListener("input", () => {
        if (player1Input.value.trim() !== "") {
            player1Error.style.display = "none";
        }
    });

    // Event listener for player 2 input change
    player2Input.addEventListener("input", () => {
        if (player2Input.value.trim() !== "") {
            player2Error.style.display = "none";
        }
    });
}

// Function to show game result
function showResult(gameResult, playerName) {
    const result = document.getElementById("result");
    result.innerHTML = `
        <h1 class="player-name">${gameResult === 0 ? `${playerName} ${player ? "(X)" : "(O)"} won` : "It's a tie"}</h1>
        <button onclick="resetGame()" class="reset-button">reset</button>
        <button onclick="newGame()" class="reset-button">new game</button>
    `;
    disableGameBoard();
}

// Function to hide game result
function hideResult() {
    const result = document.getElementById("result");
    result.innerHTML = "";
}

// Function to disable game board
function disableGameBoard() {
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.classList.add("disabled");
}

// Function to enable game board
function enableGameBoard() {
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.classList.remove("disabled");
}

// Function to complete the game
function completeGame(result) {
    displayGameBoard();
    if (result === 0) {
        showResult(0, player ? document.getElementById("player1Name").value.trim() : document.getElementById("player2Name").value.trim());
    } else if (result === 1) {
        showResult(1, "");
    }
}

// Initialize player turn
let player = true; // true represents player 1

// Initialize game on page load
document.addEventListener("DOMContentLoaded", () => {
    clearInputFields();
    startGame();
    displayGameBoard();
});
