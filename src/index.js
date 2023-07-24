import { Game } from './modules/game.js';

const playerBoard = document.querySelector('#player-board');
const computerBoard = document.querySelector('#computer-board');
const playerSquares = document.querySelectorAll('#player-board > .square');
const computerSquares = document.querySelectorAll('#computer-board > .square');
const endScreen = document.querySelector('#end-screen');

function setup() {
    let turn = 'player';
    let gameOver = false;

    endScreen.style.display = 'none';
    fillBoard(playerBoard);
    fillBoard(computerBoard);  
    playerBoard.style.opacity = 0.6; 
    computerBoard.style.opacity = 1;
    const game = Game();

    const playerSquares = document.querySelectorAll('#player-board > .square');
    showPlayerShips(playerSquares, game);

    const computerSquares = document.querySelectorAll('#computer-board > .square');
    computerSquares.forEach(square => {
        square.addEventListener('click', () => {
            if (turn === 'player' && !gameOver && (game.computer.gameboard.board[square.dataset.y][square.dataset.x] === 0 || 
                game.computer.gameboard.board[square.dataset.y][square.dataset.x][0] === 0)) {
                game.player.takePlayerTurn(square.dataset.x, square.dataset.y, game.computer.gameboard);
                renderComputerSquares(computerSquares, game);
                playerBoard.style.opacity = 1; 
                computerBoard.style.opacity = 0.6; 
                turn = 'computer';
                
                if (game.computer.gameboard.allShipsSunk()) {
                    gameOver = true;
                    endScreen.style.display = 'flex';    
                    endScreen.textContent = 'You Win!';
                    const resetBtn = document.createElement('button');
                    resetBtn.setAttribute('id', 'reset');
                    resetBtn.textContent = 'Play Again';
                    resetBtn.addEventListener('click', setup);
                    endScreen.appendChild(resetBtn);
                    document.querySelector('#player-board').style.opacity = 0.3;
                    document.querySelector('#computer-board').style.opacity = 0.3;
                }

                setTimeout(() => {
                    if (!gameOver) {
                        game.computer.takeComputerTurn(game.player.gameboard);
                        renderPlayerSquares(playerSquares, game);
                        computerBoard.style.opacity = 1; 
                        playerBoard.style.opacity = 0.6; 
                        turn = 'player';   
                        
                        if (game.player.gameboard.allShipsSunk()) {
                            gameOver = true;
                            endScreen.style.display = 'flex';    
                            endScreen.textContent = 'You Lose!';
                            const resetBtn = document.createElement('button');
                            resetBtn.setAttribute('id', 'reset');
                            resetBtn.textContent = 'Play Again';
                            resetBtn.addEventListener('click', setup);
                            endScreen.appendChild(resetBtn);
                            document.querySelector('#player-board').style.opacity = 0.3;
                            document.querySelector('#computer-board').style.opacity = 0.3;
                        }
                    }
                }, '750');    
            }
        });
    });
}

function fillBoard(board) {
    board.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.x = j;
            square.dataset.y = i;
            board.appendChild(square);    
        }
    }    
}

function showPlayerShips(squares, game) {
    squares.forEach(square => {
        if (game.player.gameboard.board[square.dataset.y][square.dataset.x] instanceof Array) {
            square.classList.add('ship');
        }
    });
}

function renderPlayerSquares(squares, game) {
    squares.forEach(square => {
        if (game.player.gameboard.board[square.dataset.y][square.dataset.x] === 1) {
            square.classList.add('miss');
            square.textContent = 'x';
        } else if (game.player.gameboard.board[square.dataset.y][square.dataset.x][0] === 1) {
            square.classList.add('hit');
            square.textContent = '·';
        }
    });
}

function renderComputerSquares(squares, game) {
    squares.forEach(square => {
        if (game.computer.gameboard.board[square.dataset.y][square.dataset.x] === 1) {
            square.classList.add('miss');
            square.textContent = 'x';
        } else if (game.computer.gameboard.board[square.dataset.y][square.dataset.x][0] === 1) {
            square.classList.add('ship');
            square.classList.add('hit');
            square.textContent = '·';
        }
    });
}

setup();