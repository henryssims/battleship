/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/game.js":
/*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Game: () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/modules/player.js");


const Game = () => {
    const player = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.Player)();
    const computer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.Player)();

    player.gameboard.randomizeShip(2);
    player.gameboard.randomizeShip(3);
    player.gameboard.randomizeShip(3);
    player.gameboard.randomizeShip(4);
    player.gameboard.randomizeShip(5);

    computer.gameboard.randomizeShip(2);
    computer.gameboard.randomizeShip(3);
    computer.gameboard.randomizeShip(3);
    computer.gameboard.randomizeShip(4);
    computer.gameboard.randomizeShip(5);

    return { player, computer };
}



/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/modules/ship.js");


const Gameboard = () => {

    let board = Array(10).fill().map(() => {
        return Array(10).fill(0);
    });

    let ships = [];

    const placeShip = (length, orientation, x, y) => {
        const ship = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship)(length, 0, false, orientation);
        if (orientation === 'horizontal') {
            if (x >= 0 && x <= 9 && x + length - 1 <= 9 && y >= 0 && y <= 9) {
                for (let i = x; i < x + length; i++) {
                    board[y][i] = [0, ship];
                }     
                ships.push(ship);
            } else {
                console.log("Ship can't be placed there!");
            }
        } else if (orientation === 'vertical') {
            if (x >= 0 && x <= 9 && y + length - 1 <= 9 && y >= 0 && y <= 9) {
                for (let i = y; i < y + length; i++) {
                    board[i][x] = [0, ship];
                } 
                ships.push(ship);
            } else {
                console.log("Ship can't be placed there!");
            }
        }
    }

    const randomizeShip = (length) => {
        let orientationNum = Math.floor(Math.random() * 2);
        let orientation;
        if (orientationNum === 0) orientation = 'horizontal';
        if (orientationNum === 1) orientation = 'vertical';

        let x = Math.floor(Math.random() * (11 - length));
        let y = Math.floor(Math.random() * (11 - length));

        if (orientation === 'horizontal') {
            let count = 0;
            for (let i = 0; i < length; i++) {
                if (board[y][x + i] === 0) {
                    count++;
                }
            }
            if (count === length) {
                placeShip(length, orientation, x, y);    
            } else {
                randomizeShip(length);
            }
        }
        
        if (orientation === 'vertical') {
            let count = 0;
            for (let i = 0; i < length; i++) {
                if (board[y + i][x] === 0) {
                    count++;
                }
            }
            if (count === length) {
                placeShip(length, orientation, x, y);    
            } else {
                randomizeShip(length);
            }
        }
    }

    const receiveAttack = (x, y) => {
        if (board[y][x] === 0) {
            board[y][x] = 1;
        } else if (board[y][x][0] === 0) {
            board[y][x][0] = 1
            board[y][x][1].hits++;
            if (board[y][x][1].hits === board[y][x][1].length) {
                board[y][x][1].sunk = true;    
            }
        }
    }

    const allShipsSunk = () => {
        return ships.every(ship => ship.sunk);
    }

    return { board, placeShip, receiveAttack, allShipsSunk, randomizeShip };
}



/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/modules/gameboard.js");


const Player = () => {
    const gameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();

    const takePlayerTurn = (x, y, otherGameboard) => {
        otherGameboard.receiveAttack(x, y);
    }

    const takeComputerTurn = (otherGameboard) => {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        if (otherGameboard.board[y][x] === 0 || otherGameboard.board[y][x][0] === 0) {
            otherGameboard.receiveAttack(x, y);
        } else {
            takeComputerTurn(otherGameboard);
        }
        if (otherGameboard.allShipsSunk()) {
            const endScreen = document.querySelector('#end-screen');
            endScreen.style.display = 'flex';    
            endScreen.textContent = 'You Lose!';
            const resetBtn = document.createElement('button');
            resetBtn.setAttribute('id', 'reset');
            resetBtn.textContent = 'Play Again';
            endScreen.appendChild(resetBtn);
            document.querySelector('#player-board').style.opacity = 0.3;
            document.querySelector('#computer-board').style.opacity = 0.3;
        }
    }

    return { gameboard, takePlayerTurn, takeComputerTurn };
}



/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
const Ship = (length, hits, sunk, orientation) => {

    return { length, hits, sunk, orientation };
    
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/game.js */ "./src/modules/game.js");


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
    const game = (0,_modules_game_js__WEBPACK_IMPORTED_MODULE_0__.Game)();

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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLFEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXIuanMnO1xuXG5jb25zdCBHYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllciA9IFBsYXllcigpO1xuICAgIGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKCk7XG5cbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLnJhbmRvbWl6ZVNoaXAoMik7XG4gICAgcGxheWVyLmdhbWVib2FyZC5yYW5kb21pemVTaGlwKDMpO1xuICAgIHBsYXllci5nYW1lYm9hcmQucmFuZG9taXplU2hpcCgzKTtcbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLnJhbmRvbWl6ZVNoaXAoNCk7XG4gICAgcGxheWVyLmdhbWVib2FyZC5yYW5kb21pemVTaGlwKDUpO1xuXG4gICAgY29tcHV0ZXIuZ2FtZWJvYXJkLnJhbmRvbWl6ZVNoaXAoMik7XG4gICAgY29tcHV0ZXIuZ2FtZWJvYXJkLnJhbmRvbWl6ZVNoaXAoMyk7XG4gICAgY29tcHV0ZXIuZ2FtZWJvYXJkLnJhbmRvbWl6ZVNoaXAoMyk7XG4gICAgY29tcHV0ZXIuZ2FtZWJvYXJkLnJhbmRvbWl6ZVNoaXAoNCk7XG4gICAgY29tcHV0ZXIuZ2FtZWJvYXJkLnJhbmRvbWl6ZVNoaXAoNSk7XG5cbiAgICByZXR1cm4geyBwbGF5ZXIsIGNvbXB1dGVyIH07XG59XG5cbmV4cG9ydCB7IEdhbWUgfTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwLmpzJztcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXG4gICAgbGV0IGJvYXJkID0gQXJyYXkoMTApLmZpbGwoKS5tYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gQXJyYXkoMTApLmZpbGwoMCk7XG4gICAgfSk7XG5cbiAgICBsZXQgc2hpcHMgPSBbXTtcblxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChsZW5ndGgsIG9yaWVudGF0aW9uLCB4LCB5KSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXAgPSBTaGlwKGxlbmd0aCwgMCwgZmFsc2UsIG9yaWVudGF0aW9uKTtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGlmICh4ID49IDAgJiYgeCA8PSA5ICYmIHggKyBsZW5ndGggLSAxIDw9IDkgJiYgeSA+PSAwICYmIHkgPD0gOSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB4OyBpIDwgeCArIGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkW3ldW2ldID0gWzAsIHNoaXBdO1xuICAgICAgICAgICAgICAgIH0gICAgIFxuICAgICAgICAgICAgICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2hpcCBjYW4ndCBiZSBwbGFjZWQgdGhlcmUhXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICBpZiAoeCA+PSAwICYmIHggPD0gOSAmJiB5ICsgbGVuZ3RoIC0gMSA8PSA5ICYmIHkgPj0gMCAmJiB5IDw9IDkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0geTsgaSA8IHkgKyBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBib2FyZFtpXVt4XSA9IFswLCBzaGlwXTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2hpcCBjYW4ndCBiZSBwbGFjZWQgdGhlcmUhXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmFuZG9taXplU2hpcCA9IChsZW5ndGgpID0+IHtcbiAgICAgICAgbGV0IG9yaWVudGF0aW9uTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgIGxldCBvcmllbnRhdGlvbjtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uTnVtID09PSAwKSBvcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uTnVtID09PSAxKSBvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG5cbiAgICAgICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTEgLSBsZW5ndGgpKTtcbiAgICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTEgLSBsZW5ndGgpKTtcblxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbeV1beCArIGldID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNoaXAobGVuZ3RoLCBvcmllbnRhdGlvbiwgeCwgeSk7ICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByYW5kb21pemVTaGlwKGxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbeSArIGldW3hdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNoaXAobGVuZ3RoLCBvcmllbnRhdGlvbiwgeCwgeSk7ICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByYW5kb21pemVTaGlwKGxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICAgICAgaWYgKGJvYXJkW3ldW3hdID09PSAwKSB7XG4gICAgICAgICAgICBib2FyZFt5XVt4XSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbeV1beF1bMF0gPT09IDApIHtcbiAgICAgICAgICAgIGJvYXJkW3ldW3hdWzBdID0gMVxuICAgICAgICAgICAgYm9hcmRbeV1beF1bMV0uaGl0cysrO1xuICAgICAgICAgICAgaWYgKGJvYXJkW3ldW3hdWzFdLmhpdHMgPT09IGJvYXJkW3ldW3hdWzFdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGJvYXJkW3ldW3hdWzFdLnN1bmsgPSB0cnVlOyAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5zdW5rKTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBib2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBhbGxTaGlwc1N1bmssIHJhbmRvbWl6ZVNoaXAgfTtcbn1cblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07IiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQuanMnO1xuXG5jb25zdCBQbGF5ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZ2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG5cbiAgICBjb25zdCB0YWtlUGxheWVyVHVybiA9ICh4LCB5LCBvdGhlckdhbWVib2FyZCkgPT4ge1xuICAgICAgICBvdGhlckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH1cblxuICAgIGNvbnN0IHRha2VDb21wdXRlclR1cm4gPSAob3RoZXJHYW1lYm9hcmQpID0+IHtcbiAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgaWYgKG90aGVyR2FtZWJvYXJkLmJvYXJkW3ldW3hdID09PSAwIHx8IG90aGVyR2FtZWJvYXJkLmJvYXJkW3ldW3hdWzBdID09PSAwKSB7XG4gICAgICAgICAgICBvdGhlckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFrZUNvbXB1dGVyVHVybihvdGhlckdhbWVib2FyZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyR2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgICAgICBjb25zdCBlbmRTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5kLXNjcmVlbicpO1xuICAgICAgICAgICAgZW5kU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7ICAgIFxuICAgICAgICAgICAgZW5kU2NyZWVuLnRleHRDb250ZW50ID0gJ1lvdSBMb3NlISc7XG4gICAgICAgICAgICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgcmVzZXRCdG4uc2V0QXR0cmlidXRlKCdpZCcsICdyZXNldCcpO1xuICAgICAgICAgICAgcmVzZXRCdG4udGV4dENvbnRlbnQgPSAnUGxheSBBZ2Fpbic7XG4gICAgICAgICAgICBlbmRTY3JlZW4uYXBwZW5kQ2hpbGQocmVzZXRCdG4pO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1ib2FyZCcpLnN0eWxlLm9wYWNpdHkgPSAwLjM7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tcHV0ZXItYm9hcmQnKS5zdHlsZS5vcGFjaXR5ID0gMC4zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgZ2FtZWJvYXJkLCB0YWtlUGxheWVyVHVybiwgdGFrZUNvbXB1dGVyVHVybiB9O1xufVxuXG5leHBvcnQgeyBQbGF5ZXIgfTsiLCJjb25zdCBTaGlwID0gKGxlbmd0aCwgaGl0cywgc3Vuaywgb3JpZW50YXRpb24pID0+IHtcblxuICAgIHJldHVybiB7IGxlbmd0aCwgaGl0cywgc3Vuaywgb3JpZW50YXRpb24gfTtcbiAgICBcbn1cblxuZXhwb3J0IHsgU2hpcCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vbW9kdWxlcy9nYW1lLmpzJztcblxuY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWJvYXJkJyk7XG5jb25zdCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbXB1dGVyLWJvYXJkJyk7XG5jb25zdCBwbGF5ZXJTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3BsYXllci1ib2FyZCA+IC5zcXVhcmUnKTtcbmNvbnN0IGNvbXB1dGVyU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb21wdXRlci1ib2FyZCA+IC5zcXVhcmUnKTtcbmNvbnN0IGVuZFNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmQtc2NyZWVuJyk7XG5cbmZ1bmN0aW9uIHNldHVwKCkge1xuICAgIGxldCB0dXJuID0gJ3BsYXllcic7XG4gICAgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG5cbiAgICBlbmRTY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBmaWxsQm9hcmQocGxheWVyQm9hcmQpO1xuICAgIGZpbGxCb2FyZChjb21wdXRlckJvYXJkKTsgIFxuICAgIHBsYXllckJvYXJkLnN0eWxlLm9wYWNpdHkgPSAwLjY7IFxuICAgIGNvbXB1dGVyQm9hcmQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgY29uc3QgZ2FtZSA9IEdhbWUoKTtcblxuICAgIGNvbnN0IHBsYXllclNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcGxheWVyLWJvYXJkID4gLnNxdWFyZScpO1xuICAgIHNob3dQbGF5ZXJTaGlwcyhwbGF5ZXJTcXVhcmVzLCBnYW1lKTtcblxuICAgIGNvbnN0IGNvbXB1dGVyU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjb21wdXRlci1ib2FyZCA+IC5zcXVhcmUnKTtcbiAgICBjb21wdXRlclNxdWFyZXMuZm9yRWFjaChzcXVhcmUgPT4ge1xuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodHVybiA9PT0gJ3BsYXllcicgJiYgIWdhbWVPdmVyICYmIChnYW1lLmNvbXB1dGVyLmdhbWVib2FyZC5ib2FyZFtzcXVhcmUuZGF0YXNldC55XVtzcXVhcmUuZGF0YXNldC54XSA9PT0gMCB8fCBcbiAgICAgICAgICAgICAgICBnYW1lLmNvbXB1dGVyLmdhbWVib2FyZC5ib2FyZFtzcXVhcmUuZGF0YXNldC55XVtzcXVhcmUuZGF0YXNldC54XVswXSA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICBnYW1lLnBsYXllci50YWtlUGxheWVyVHVybihzcXVhcmUuZGF0YXNldC54LCBzcXVhcmUuZGF0YXNldC55LCBnYW1lLmNvbXB1dGVyLmdhbWVib2FyZCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyQ29tcHV0ZXJTcXVhcmVzKGNvbXB1dGVyU3F1YXJlcywgZ2FtZSk7XG4gICAgICAgICAgICAgICAgcGxheWVyQm9hcmQuc3R5bGUub3BhY2l0eSA9IDE7IFxuICAgICAgICAgICAgICAgIGNvbXB1dGVyQm9hcmQuc3R5bGUub3BhY2l0eSA9IDAuNjsgXG4gICAgICAgICAgICAgICAgdHVybiA9ICdjb21wdXRlcic7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUuY29tcHV0ZXIuZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZW5kU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7ICAgIFxuICAgICAgICAgICAgICAgICAgICBlbmRTY3JlZW4udGV4dENvbnRlbnQgPSAnWW91IFdpbiEnO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgICAgICByZXNldEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Jlc2V0Jyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0QnRuLnRleHRDb250ZW50ID0gJ1BsYXkgQWdhaW4nO1xuICAgICAgICAgICAgICAgICAgICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNldHVwKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kU2NyZWVuLmFwcGVuZENoaWxkKHJlc2V0QnRuKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1ib2FyZCcpLnN0eWxlLm9wYWNpdHkgPSAwLjM7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wdXRlci1ib2FyZCcpLnN0eWxlLm9wYWNpdHkgPSAwLjM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZ2FtZU92ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUuY29tcHV0ZXIudGFrZUNvbXB1dGVyVHVybihnYW1lLnBsYXllci5nYW1lYm9hcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyUGxheWVyU3F1YXJlcyhwbGF5ZXJTcXVhcmVzLCBnYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXB1dGVyQm9hcmQuc3R5bGUub3BhY2l0eSA9IDE7IFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyQm9hcmQuc3R5bGUub3BhY2l0eSA9IDAuNjsgXG4gICAgICAgICAgICAgICAgICAgICAgICB0dXJuID0gJ3BsYXllcic7ICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLnBsYXllci5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZFNjcmVlbi50ZXh0Q29udGVudCA9ICdZb3UgTG9zZSEnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRCdG4uc2V0QXR0cmlidXRlKCdpZCcsICdyZXNldCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0QnRuLnRleHRDb250ZW50ID0gJ1BsYXkgQWdhaW4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2V0dXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZFNjcmVlbi5hcHBlbmRDaGlsZChyZXNldEJ0bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1ib2FyZCcpLnN0eWxlLm9wYWNpdHkgPSAwLjM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbXB1dGVyLWJvYXJkJykuc3R5bGUub3BhY2l0eSA9IDAuMztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sICc3NTAnKTsgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBmaWxsQm9hcmQoYm9hcmQpIHtcbiAgICBib2FyZC5pbm5lckhUTUwgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdzcXVhcmUnKTtcbiAgICAgICAgICAgIHNxdWFyZS5kYXRhc2V0LnggPSBqO1xuICAgICAgICAgICAgc3F1YXJlLmRhdGFzZXQueSA9IGk7XG4gICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpOyAgICBcbiAgICAgICAgfVxuICAgIH0gICAgXG59XG5cbmZ1bmN0aW9uIHNob3dQbGF5ZXJTaGlwcyhzcXVhcmVzLCBnYW1lKSB7XG4gICAgc3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgIGlmIChnYW1lLnBsYXllci5nYW1lYm9hcmQuYm9hcmRbc3F1YXJlLmRhdGFzZXQueV1bc3F1YXJlLmRhdGFzZXQueF0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJQbGF5ZXJTcXVhcmVzKHNxdWFyZXMsIGdhbWUpIHtcbiAgICBzcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgaWYgKGdhbWUucGxheWVyLmdhbWVib2FyZC5ib2FyZFtzcXVhcmUuZGF0YXNldC55XVtzcXVhcmUuZGF0YXNldC54XSA9PT0gMSkge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9ICd4JztcbiAgICAgICAgfSBlbHNlIGlmIChnYW1lLnBsYXllci5nYW1lYm9hcmQuYm9hcmRbc3F1YXJlLmRhdGFzZXQueV1bc3F1YXJlLmRhdGFzZXQueF1bMF0gPT09IDEpIHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9ICfCtyc7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29tcHV0ZXJTcXVhcmVzKHNxdWFyZXMsIGdhbWUpIHtcbiAgICBzcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgaWYgKGdhbWUuY29tcHV0ZXIuZ2FtZWJvYXJkLmJvYXJkW3NxdWFyZS5kYXRhc2V0LnldW3NxdWFyZS5kYXRhc2V0LnhdID09PSAxKSB7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gJ3gnO1xuICAgICAgICB9IGVsc2UgaWYgKGdhbWUuY29tcHV0ZXIuZ2FtZWJvYXJkLmJvYXJkW3NxdWFyZS5kYXRhc2V0LnldW3NxdWFyZS5kYXRhc2V0LnhdWzBdID09PSAxKSB7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gJ8K3JztcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5zZXR1cCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==