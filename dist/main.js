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

    const receiveAttack = (x, y, player) => {
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

    return { board, ships, placeShip, receiveAttack, allShipsSunk, randomizeShip };
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
        let checkedOne = false;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (otherGameboard.board[i][j][0] === 1 && !checkedOne) {
                    const x = j;
                    const y = i;
                    if (x - 1 >= 0 && x + 1 <= 9 && otherGameboard.board[y][x - 1][0] === 1 && (otherGameboard.board[y][x + 1][0] === 0 || otherGameboard.board[y][x + 1] === 0)) {
                        otherGameboard.receiveAttack(x + 1, y);
                        checkedOne = true;
                    } else if (x - 1 >= 0 && x + 1 <= 9 && otherGameboard.board[y][x + 1][0] === 1 && (otherGameboard.board[y][x - 1][0] === 0 || otherGameboard.board[y][x - 1] === 0)) {
                        otherGameboard.receiveAttack(x - 1, y);
                        checkedOne = true;
                    } else if (y - 1 >= 0 && y + 1 <= 9 && otherGameboard.board[y - 1][x][0] === 1 && (otherGameboard.board[y + 1][x][0] === 0 || otherGameboard.board[y + 1][x] === 0)) {
                        otherGameboard.receiveAttack(x, y + 1);
                        checkedOne = true;
                    } else if (y - 1 >= 0 && y + 1 <= 9 && otherGameboard.board[y + 1][x][0] === 1 && (otherGameboard.board[y - 1][x][0] === 0 || otherGameboard.board[y - 1][x] === 0)) {
                        otherGameboard.receiveAttack(x, y - 1);
                        checkedOne = true;
                    } else if (!(x - 1 >= 0 && x + 1 <= 9 && otherGameboard.board[y][x - 1][0] === 1 && otherGameboard.board[y][x + 1][0] === 1) &&
                    !(y - 1 >= 0 && y + 1 <= 9 && otherGameboard.board[y - 1][x][0] === 1 && otherGameboard.board[y + 1][x][0] === 1) &&
                    !((x + 1 > 9 || otherGameboard.board[y][x + 1] === 1) && (!(x - 1 < 0) && otherGameboard.board[y][x - 1][0] === 1)) &&
                    !((x - 1 < 0 || otherGameboard.board[y][x - 1] === 1) && (!(x + 1 > 9) && otherGameboard.board[y][x + 1][0] === 1)) &&
                    !((y + 1 > 9 || otherGameboard.board[y][x + 1] === 1) && (!(y - 1 < 0) && otherGameboard.board[y - 1][x][0] === 1)) &&
                    !((y - 1 < 0 || otherGameboard.board[y - 1][x] === 1) && (!(y + 1 > 9) && otherGameboard.board[y + 1][x][0] === 1))) {
                        if (x + 1 <= 9 && (otherGameboard.board[y][x + 1][0] === 0 || otherGameboard.board[y][x + 1] === 0)) {
                            otherGameboard.receiveAttack(x + 1, y);
                            checkedOne = true;
                        } else if (x - 1 >= 0 && (otherGameboard.board[y][x - 1][0] === 0 || otherGameboard.board[y][x - 1] === 0)) {
                            otherGameboard.receiveAttack(x - 1, y);
                            checkedOne = true;
                        } else if (y + 1 <= 9 && (otherGameboard.board[y + 1][x][0] === 0 || otherGameboard.board[y + 1][x] === 0)) {
                            otherGameboard.receiveAttack(x, y + 1);
                            checkedOne = true;
                        } else if (y - 1 >= 0 && (otherGameboard.board[y - 1][x][0] === 0 || otherGameboard.board[y - 1][x] === 0)) {
                            otherGameboard.receiveAttack(x, y - 1);
                            checkedOne = true;
                        }
                    }
                }
            }
        }        

        if (!checkedOne) {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            if (otherGameboard.board[y][x] === 0 || otherGameboard.board[y][x][0] === 0) {
                otherGameboard.receiveAttack(x, y);
            } else {
                takeComputerTurn(otherGameboard);
            }      
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
const endScreen = document.querySelector('#end-screen');

function setup() {
    let turn = 'player';
    let gameOver = false;

    endScreen.style.display = 'none';
    fillBoard(playerBoard);
    fillBoard(computerBoard);  
    playerBoard.style.opacity = 0.6; 
    computerBoard.style.opacity = 1;
    const ships = document.querySelectorAll('.ship-icon');
    ships.forEach(ship => {
        ship.style.backgroundColor = '#53a8b6';
    });
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

                for (let i = 0; i < 5; i++) {
                    if (game.computer.gameboard.ships[i].sunk) {
                        let ships = document.querySelectorAll(`#ships-right :nth-child(${i + 1}) > .ship-icon`);
                        ships.forEach(ship => {
                            ship.style.backgroundColor = 'lightgray';
                        });
                    }
                }
                
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
                        
                        for (let i = 0; i < 5; i++) {
                            if (game.player.gameboard.ships[i].sunk) {
                                let ships = document.querySelectorAll(`#ships-left :nth-child(${i + 1}) > .ship-icon`);
                                ships.forEach(ship => {
                                    ship.style.backgroundColor = 'lightgray';
                                });
                            }
                        }
                        
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7O0FBRXJDO0FBQ0EsbUJBQW1CLGtEQUFNO0FBQ3pCLHFCQUFxQixrREFBTTs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQmlDOztBQUVqQzs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBLHFCQUFxQiw4Q0FBSTtBQUN6QjtBQUNBO0FBQ0EsZ0NBQWdDLGdCQUFnQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLGdDQUFnQyxnQkFBZ0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLFlBQVk7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixZQUFZO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RjJDOztBQUUzQztBQUNBLHNCQUFzQix3REFBUzs7QUFFL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQyw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7Ozs7Ozs7O1VDSkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055Qzs7QUFFekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGlCQUFpQixzREFBSTs7QUFFckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBLHlGQUF5RixNQUFNO0FBQy9GO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsT0FBTztBQUMvQztBQUNBLGdHQUFnRyxNQUFNO0FBQ3RHO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1Qix3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQSxRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyLmpzJztcblxuY29uc3QgR2FtZSA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcbiAgICBjb25zdCBjb21wdXRlciA9IFBsYXllcigpO1xuXG4gICAgcGxheWVyLmdhbWVib2FyZC5yYW5kb21pemVTaGlwKDIpO1xuICAgIHBsYXllci5nYW1lYm9hcmQucmFuZG9taXplU2hpcCgzKTtcbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLnJhbmRvbWl6ZVNoaXAoMyk7XG4gICAgcGxheWVyLmdhbWVib2FyZC5yYW5kb21pemVTaGlwKDQpO1xuICAgIHBsYXllci5nYW1lYm9hcmQucmFuZG9taXplU2hpcCg1KTtcblxuICAgIGNvbXB1dGVyLmdhbWVib2FyZC5yYW5kb21pemVTaGlwKDIpO1xuICAgIGNvbXB1dGVyLmdhbWVib2FyZC5yYW5kb21pemVTaGlwKDMpO1xuICAgIGNvbXB1dGVyLmdhbWVib2FyZC5yYW5kb21pemVTaGlwKDMpO1xuICAgIGNvbXB1dGVyLmdhbWVib2FyZC5yYW5kb21pemVTaGlwKDQpO1xuICAgIGNvbXB1dGVyLmdhbWVib2FyZC5yYW5kb21pemVTaGlwKDUpO1xuXG4gICAgcmV0dXJuIHsgcGxheWVyLCBjb21wdXRlciB9O1xufVxuXG5leHBvcnQgeyBHYW1lIH07IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcC5qcyc7XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcblxuICAgIGxldCBib2FyZCA9IEFycmF5KDEwKS5maWxsKCkubWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIEFycmF5KDEwKS5maWxsKDApO1xuICAgIH0pO1xuXG4gICAgbGV0IHNoaXBzID0gW107XG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSAobGVuZ3RoLCBvcmllbnRhdGlvbiwgeCwgeSkgPT4ge1xuICAgICAgICBjb25zdCBzaGlwID0gU2hpcChsZW5ndGgsIDAsIGZhbHNlLCBvcmllbnRhdGlvbik7XG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBpZiAoeCA+PSAwICYmIHggPD0gOSAmJiB4ICsgbGVuZ3RoIC0gMSA8PSA5ICYmIHkgPj0gMCAmJiB5IDw9IDkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0geDsgaSA8IHggKyBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBib2FyZFt5XVtpXSA9IFswLCBzaGlwXTtcbiAgICAgICAgICAgICAgICB9ICAgICBcbiAgICAgICAgICAgICAgICBzaGlwcy5wdXNoKHNoaXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNoaXAgY2FuJ3QgYmUgcGxhY2VkIHRoZXJlIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgaWYgKHggPj0gMCAmJiB4IDw9IDkgJiYgeSArIGxlbmd0aCAtIDEgPD0gOSAmJiB5ID49IDAgJiYgeSA8PSA5KSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHk7IGkgPCB5ICsgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmRbaV1beF0gPSBbMCwgc2hpcF07XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICBzaGlwcy5wdXNoKHNoaXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNoaXAgY2FuJ3QgYmUgcGxhY2VkIHRoZXJlIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJhbmRvbWl6ZVNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gICAgICAgIGxldCBvcmllbnRhdGlvbk51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICBsZXQgb3JpZW50YXRpb247XG4gICAgICAgIGlmIChvcmllbnRhdGlvbk51bSA9PT0gMCkgb3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgICAgIGlmIChvcmllbnRhdGlvbk51bSA9PT0gMSkgb3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuXG4gICAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDExIC0gbGVuZ3RoKSk7XG4gICAgICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDExIC0gbGVuZ3RoKSk7XG5cbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW3ldW3ggKyBpXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VTaGlwKGxlbmd0aCwgb3JpZW50YXRpb24sIHgsIHkpOyAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmFuZG9taXplU2hpcChsZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW3kgKyBpXVt4XSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VTaGlwKGxlbmd0aCwgb3JpZW50YXRpb24sIHgsIHkpOyAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmFuZG9taXplU2hpcChsZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5LCBwbGF5ZXIpID0+IHtcbiAgICAgICAgaWYgKGJvYXJkW3ldW3hdID09PSAwKSB7XG4gICAgICAgICAgICBib2FyZFt5XVt4XSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbeV1beF1bMF0gPT09IDApIHtcbiAgICAgICAgICAgIGJvYXJkW3ldW3hdWzBdID0gMVxuICAgICAgICAgICAgYm9hcmRbeV1beF1bMV0uaGl0cysrO1xuICAgICAgICAgICAgaWYgKGJvYXJkW3ldW3hdWzFdLmhpdHMgPT09IGJvYXJkW3ldW3hdWzFdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGJvYXJkW3ldW3hdWzFdLnN1bmsgPSB0cnVlOyAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5zdW5rKTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBib2FyZCwgc2hpcHMsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgYWxsU2hpcHNTdW5rLCByYW5kb21pemVTaGlwIH07XG59XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9OyIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkLmpzJztcblxuY29uc3QgUGxheWVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuXG4gICAgY29uc3QgdGFrZVBsYXllclR1cm4gPSAoeCwgeSwgb3RoZXJHYW1lYm9hcmQpID0+IHtcbiAgICAgICAgb3RoZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9XG5cbiAgICBjb25zdCB0YWtlQ29tcHV0ZXJUdXJuID0gKG90aGVyR2FtZWJvYXJkKSA9PiB7XG4gICAgICAgIGxldCBjaGVja2VkT25lID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyR2FtZWJvYXJkLmJvYXJkW2ldW2pdWzBdID09PSAxICYmICFjaGVja2VkT25lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHggPSBqO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHggLSAxID49IDAgJiYgeCArIDEgPD0gOSAmJiBvdGhlckdhbWVib2FyZC5ib2FyZFt5XVt4IC0gMV1bMF0gPT09IDEgJiYgKG90aGVyR2FtZWJvYXJkLmJvYXJkW3ldW3ggKyAxXVswXSA9PT0gMCB8fCBvdGhlckdhbWVib2FyZC5ib2FyZFt5XVt4ICsgMV0gPT09IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHggKyAxLCB5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWRPbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHggLSAxID49IDAgJiYgeCArIDEgPD0gOSAmJiBvdGhlckdhbWVib2FyZC5ib2FyZFt5XVt4ICsgMV1bMF0gPT09IDEgJiYgKG90aGVyR2FtZWJvYXJkLmJvYXJkW3ldW3ggLSAxXVswXSA9PT0gMCB8fCBvdGhlckdhbWVib2FyZC5ib2FyZFt5XVt4IC0gMV0gPT09IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHggLSAxLCB5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWRPbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHkgLSAxID49IDAgJiYgeSArIDEgPD0gOSAmJiBvdGhlckdhbWVib2FyZC5ib2FyZFt5IC0gMV1beF1bMF0gPT09IDEgJiYgKG90aGVyR2FtZWJvYXJkLmJvYXJkW3kgKyAxXVt4XVswXSA9PT0gMCB8fCBvdGhlckdhbWVib2FyZC5ib2FyZFt5ICsgMV1beF0gPT09IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWRPbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHkgLSAxID49IDAgJiYgeSArIDEgPD0gOSAmJiBvdGhlckdhbWVib2FyZC5ib2FyZFt5ICsgMV1beF1bMF0gPT09IDEgJiYgKG90aGVyR2FtZWJvYXJkLmJvYXJkW3kgLSAxXVt4XVswXSA9PT0gMCB8fCBvdGhlckdhbWVib2FyZC5ib2FyZFt5IC0gMV1beF0gPT09IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWRPbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCEoeCAtIDEgPj0gMCAmJiB4ICsgMSA8PSA5ICYmIG90aGVyR2FtZWJvYXJkLmJvYXJkW3ldW3ggLSAxXVswXSA9PT0gMSAmJiBvdGhlckdhbWVib2FyZC5ib2FyZFt5XVt4ICsgMV1bMF0gPT09IDEpICYmXG4gICAgICAgICAgICAgICAgICAgICEoeSAtIDEgPj0gMCAmJiB5ICsgMSA8PSA5ICYmIG90aGVyR2FtZWJvYXJkLmJvYXJkW3kgLSAxXVt4XVswXSA9PT0gMSAmJiBvdGhlckdhbWVib2FyZC5ib2FyZFt5ICsgMV1beF1bMF0gPT09IDEpICYmXG4gICAgICAgICAgICAgICAgICAgICEoKHggKyAxID4gOSB8fCBvdGhlckdhbWVib2FyZC5ib2FyZFt5XVt4ICsgMV0gPT09IDEpICYmICghKHggLSAxIDwgMCkgJiYgb3RoZXJHYW1lYm9hcmQuYm9hcmRbeV1beCAtIDFdWzBdID09PSAxKSkgJiZcbiAgICAgICAgICAgICAgICAgICAgISgoeCAtIDEgPCAwIHx8IG90aGVyR2FtZWJvYXJkLmJvYXJkW3ldW3ggLSAxXSA9PT0gMSkgJiYgKCEoeCArIDEgPiA5KSAmJiBvdGhlckdhbWVib2FyZC5ib2FyZFt5XVt4ICsgMV1bMF0gPT09IDEpKSAmJlxuICAgICAgICAgICAgICAgICAgICAhKCh5ICsgMSA+IDkgfHwgb3RoZXJHYW1lYm9hcmQuYm9hcmRbeV1beCArIDFdID09PSAxKSAmJiAoISh5IC0gMSA8IDApICYmIG90aGVyR2FtZWJvYXJkLmJvYXJkW3kgLSAxXVt4XVswXSA9PT0gMSkpICYmXG4gICAgICAgICAgICAgICAgICAgICEoKHkgLSAxIDwgMCB8fCBvdGhlckdhbWVib2FyZC5ib2FyZFt5IC0gMV1beF0gPT09IDEpICYmICghKHkgKyAxID4gOSkgJiYgb3RoZXJHYW1lYm9hcmQuYm9hcmRbeSArIDFdW3hdWzBdID09PSAxKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4ICsgMSA8PSA5ICYmIChvdGhlckdhbWVib2FyZC5ib2FyZFt5XVt4ICsgMV1bMF0gPT09IDAgfHwgb3RoZXJHYW1lYm9hcmQuYm9hcmRbeV1beCArIDFdID09PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCArIDEsIHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWRPbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh4IC0gMSA+PSAwICYmIChvdGhlckdhbWVib2FyZC5ib2FyZFt5XVt4IC0gMV1bMF0gPT09IDAgfHwgb3RoZXJHYW1lYm9hcmQuYm9hcmRbeV1beCAtIDFdID09PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCAtIDEsIHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWRPbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh5ICsgMSA8PSA5ICYmIChvdGhlckdhbWVib2FyZC5ib2FyZFt5ICsgMV1beF1bMF0gPT09IDAgfHwgb3RoZXJHYW1lYm9hcmQuYm9hcmRbeSArIDFdW3hdID09PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWRPbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh5IC0gMSA+PSAwICYmIChvdGhlckdhbWVib2FyZC5ib2FyZFt5IC0gMV1beF1bMF0gPT09IDAgfHwgb3RoZXJHYW1lYm9hcmQuYm9hcmRbeSAtIDFdW3hdID09PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWRPbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9ICAgICAgICBcblxuICAgICAgICBpZiAoIWNoZWNrZWRPbmUpIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgaWYgKG90aGVyR2FtZWJvYXJkLmJvYXJkW3ldW3hdID09PSAwIHx8IG90aGVyR2FtZWJvYXJkLmJvYXJkW3ldW3hdWzBdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgb3RoZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFrZUNvbXB1dGVyVHVybihvdGhlckdhbWVib2FyZCk7XG4gICAgICAgICAgICB9ICAgICAgXG4gICAgICAgIH0gICAgIFxuICAgIH1cblxuICAgIHJldHVybiB7IGdhbWVib2FyZCwgdGFrZVBsYXllclR1cm4sIHRha2VDb21wdXRlclR1cm4gfTtcbn1cblxuZXhwb3J0IHsgUGxheWVyIH07IiwiY29uc3QgU2hpcCA9IChsZW5ndGgsIGhpdHMsIHN1bmssIG9yaWVudGF0aW9uKSA9PiB7XG5cbiAgICByZXR1cm4geyBsZW5ndGgsIGhpdHMsIHN1bmssIG9yaWVudGF0aW9uIH07XG4gICAgXG59XG5cbmV4cG9ydCB7IFNoaXAgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWUgfSBmcm9tICcuL21vZHVsZXMvZ2FtZS5qcyc7XG5cbmNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1ib2FyZCcpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wdXRlci1ib2FyZCcpO1xuY29uc3QgZW5kU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZC1zY3JlZW4nKTtcblxuZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgbGV0IHR1cm4gPSAncGxheWVyJztcbiAgICBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcblxuICAgIGVuZFNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGZpbGxCb2FyZChwbGF5ZXJCb2FyZCk7XG4gICAgZmlsbEJvYXJkKGNvbXB1dGVyQm9hcmQpOyAgXG4gICAgcGxheWVyQm9hcmQuc3R5bGUub3BhY2l0eSA9IDAuNjsgXG4gICAgY29tcHV0ZXJCb2FyZC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwLWljb24nKTtcbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICBzaGlwLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjNTNhOGI2JztcbiAgICB9KTtcbiAgICBjb25zdCBnYW1lID0gR2FtZSgpO1xuXG4gICAgY29uc3QgcGxheWVyU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwbGF5ZXItYm9hcmQgPiAuc3F1YXJlJyk7XG4gICAgc2hvd1BsYXllclNoaXBzKHBsYXllclNxdWFyZXMsIGdhbWUpO1xuXG4gICAgY29uc3QgY29tcHV0ZXJTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvbXB1dGVyLWJvYXJkID4gLnNxdWFyZScpO1xuICAgIGNvbXB1dGVyU3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0dXJuID09PSAncGxheWVyJyAmJiAhZ2FtZU92ZXIgJiYgKGdhbWUuY29tcHV0ZXIuZ2FtZWJvYXJkLmJvYXJkW3NxdWFyZS5kYXRhc2V0LnldW3NxdWFyZS5kYXRhc2V0LnhdID09PSAwIHx8IFxuICAgICAgICAgICAgICAgIGdhbWUuY29tcHV0ZXIuZ2FtZWJvYXJkLmJvYXJkW3NxdWFyZS5kYXRhc2V0LnldW3NxdWFyZS5kYXRhc2V0LnhdWzBdID09PSAwKSkge1xuICAgICAgICAgICAgICAgIGdhbWUucGxheWVyLnRha2VQbGF5ZXJUdXJuKHNxdWFyZS5kYXRhc2V0LngsIHNxdWFyZS5kYXRhc2V0LnksIGdhbWUuY29tcHV0ZXIuZ2FtZWJvYXJkKTtcbiAgICAgICAgICAgICAgICByZW5kZXJDb21wdXRlclNxdWFyZXMoY29tcHV0ZXJTcXVhcmVzLCBnYW1lKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJCb2FyZC5zdHlsZS5vcGFjaXR5ID0gMTsgXG4gICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5zdHlsZS5vcGFjaXR5ID0gMC42OyBcbiAgICAgICAgICAgICAgICB0dXJuID0gJ2NvbXB1dGVyJztcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmNvbXB1dGVyLmdhbWVib2FyZC5zaGlwc1tpXS5zdW5rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjc2hpcHMtcmlnaHQgOm50aC1jaGlsZCgke2kgKyAxfSkgPiAuc2hpcC1pY29uYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2xpZ2h0Z3JheSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5jb21wdXRlci5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBlbmRTY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdmbGV4JzsgICAgXG4gICAgICAgICAgICAgICAgICAgIGVuZFNjcmVlbi50ZXh0Q29udGVudCA9ICdZb3UgV2luISc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0QnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAncmVzZXQnKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRCdG4udGV4dENvbnRlbnQgPSAnUGxheSBBZ2Fpbic7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2V0dXApO1xuICAgICAgICAgICAgICAgICAgICBlbmRTY3JlZW4uYXBwZW5kQ2hpbGQocmVzZXRCdG4pO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWJvYXJkJykuc3R5bGUub3BhY2l0eSA9IDAuMztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbXB1dGVyLWJvYXJkJykuc3R5bGUub3BhY2l0eSA9IDAuMztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFnYW1lT3Zlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5jb21wdXRlci50YWtlQ29tcHV0ZXJUdXJuKGdhbWUucGxheWVyLmdhbWVib2FyZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJQbGF5ZXJTcXVhcmVzKHBsYXllclNxdWFyZXMsIGdhbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZXJCb2FyZC5zdHlsZS5vcGFjaXR5ID0gMTsgXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJCb2FyZC5zdHlsZS5vcGFjaXR5ID0gMC42OyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1cm4gPSAncGxheWVyJzsgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUucGxheWVyLmdhbWVib2FyZC5zaGlwc1tpXS5zdW5rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCNzaGlwcy1sZWZ0IDpudGgtY2hpbGQoJHtpICsgMX0pID4gLnNoaXAtaWNvbmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpcC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnbGlnaHRncmF5JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIuZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZFNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnOyAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRTY3JlZW4udGV4dENvbnRlbnQgPSAnWW91IExvc2UhJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0QnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAncmVzZXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNldEJ0bi50ZXh0Q29udGVudCA9ICdQbGF5IEFnYWluJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNldHVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRTY3JlZW4uYXBwZW5kQ2hpbGQocmVzZXRCdG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItYm9hcmQnKS5zdHlsZS5vcGFjaXR5ID0gMC4zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wdXRlci1ib2FyZCcpLnN0eWxlLm9wYWNpdHkgPSAwLjM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAnNzUwJyk7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZmlsbEJvYXJkKGJvYXJkKSB7XG4gICAgYm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnc3F1YXJlJyk7XG4gICAgICAgICAgICBzcXVhcmUuZGF0YXNldC54ID0gajtcbiAgICAgICAgICAgIHNxdWFyZS5kYXRhc2V0LnkgPSBpO1xuICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTsgICAgXG4gICAgICAgIH1cbiAgICB9ICAgIFxufVxuXG5mdW5jdGlvbiBzaG93UGxheWVyU2hpcHMoc3F1YXJlcywgZ2FtZSkge1xuICAgIHNxdWFyZXMuZm9yRWFjaChzcXVhcmUgPT4ge1xuICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkW3NxdWFyZS5kYXRhc2V0LnldW3NxdWFyZS5kYXRhc2V0LnhdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyUGxheWVyU3F1YXJlcyhzcXVhcmVzLCBnYW1lKSB7XG4gICAgc3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgIGlmIChnYW1lLnBsYXllci5nYW1lYm9hcmQuYm9hcmRbc3F1YXJlLmRhdGFzZXQueV1bc3F1YXJlLmRhdGFzZXQueF0gPT09IDEpIHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSAneCc7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2FtZS5wbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkW3NxdWFyZS5kYXRhc2V0LnldW3NxdWFyZS5kYXRhc2V0LnhdWzBdID09PSAxKSB7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSAnwrcnO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNvbXB1dGVyU3F1YXJlcyhzcXVhcmVzLCBnYW1lKSB7XG4gICAgc3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgIGlmIChnYW1lLmNvbXB1dGVyLmdhbWVib2FyZC5ib2FyZFtzcXVhcmUuZGF0YXNldC55XVtzcXVhcmUuZGF0YXNldC54XSA9PT0gMSkge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9ICd4JztcbiAgICAgICAgfSBlbHNlIGlmIChnYW1lLmNvbXB1dGVyLmdhbWVib2FyZC5ib2FyZFtzcXVhcmUuZGF0YXNldC55XVtzcXVhcmUuZGF0YXNldC54XVswXSA9PT0gMSkge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9ICfCtyc7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuc2V0dXAoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=