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

    player.gameboard.placeShip(2, 'horizontal', 2, 6);
    player.gameboard.placeShip(3, 'horizontal', 2, 4);
    player.gameboard.placeShip(3, 'horizontal', 3, 2);
    player.gameboard.placeShip(4, 'vertical', 7, 3);
    player.gameboard.placeShip(5, 'horizontal', 4, 9);

    computer.gameboard.placeShip(2, 'horizontal', 2, 6);
    computer.gameboard.placeShip(3, 'horizontal', 2, 4);
    computer.gameboard.placeShip(3, 'horizontal', 3, 2);
    computer.gameboard.placeShip(4, 'vertical', 7, 3);
    computer.gameboard.placeShip(5, 'horizontal', 4, 9);

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

    return { board, placeShip, receiveAttack, allShipsSunk };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7O0FBRXJDO0FBQ0EsbUJBQW1CLGtEQUFNO0FBQ3pCLHFCQUFxQixrREFBTTs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQmlDOztBQUVqQzs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBLHFCQUFxQiw4Q0FBSTtBQUN6QjtBQUNBO0FBQ0EsZ0NBQWdDLGdCQUFnQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLGdDQUFnQyxnQkFBZ0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xEMkM7O0FBRTNDO0FBQ0Esc0JBQXNCLHdEQUFTOztBQUUvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjs7Ozs7Ozs7Ozs7Ozs7OztBQy9CQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTs7Ozs7Ozs7VUNKQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnlDOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHNEQUFJOztBQUVyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLFEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXIuanMnO1xuXG5jb25zdCBHYW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllciA9IFBsYXllcigpO1xuICAgIGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKCk7XG5cbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcCgyLCAnaG9yaXpvbnRhbCcsIDIsIDYpO1xuICAgIHBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKDMsICdob3Jpem9udGFsJywgMiwgNCk7XG4gICAgcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoMywgJ2hvcml6b250YWwnLCAzLCAyKTtcbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcCg0LCAndmVydGljYWwnLCA3LCAzKTtcbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcCg1LCAnaG9yaXpvbnRhbCcsIDQsIDkpO1xuXG4gICAgY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcCgyLCAnaG9yaXpvbnRhbCcsIDIsIDYpO1xuICAgIGNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXAoMywgJ2hvcml6b250YWwnLCAyLCA0KTtcbiAgICBjb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwKDMsICdob3Jpem9udGFsJywgMywgMik7XG4gICAgY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcCg0LCAndmVydGljYWwnLCA3LCAzKTtcbiAgICBjb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwKDUsICdob3Jpem9udGFsJywgNCwgOSk7XG5cbiAgICByZXR1cm4geyBwbGF5ZXIsIGNvbXB1dGVyIH07XG59XG5cbmV4cG9ydCB7IEdhbWUgfTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwLmpzJztcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuXG4gICAgbGV0IGJvYXJkID0gQXJyYXkoMTApLmZpbGwoKS5tYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gQXJyYXkoMTApLmZpbGwoMCk7XG4gICAgfSk7XG5cbiAgICBsZXQgc2hpcHMgPSBbXTtcblxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChsZW5ndGgsIG9yaWVudGF0aW9uLCB4LCB5KSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXAgPSBTaGlwKGxlbmd0aCwgMCwgZmFsc2UsIG9yaWVudGF0aW9uKTtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGlmICh4ID49IDAgJiYgeCA8PSA5ICYmIHggKyBsZW5ndGggLSAxIDw9IDkgJiYgeSA+PSAwICYmIHkgPD0gOSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB4OyBpIDwgeCArIGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkW3ldW2ldID0gWzAsIHNoaXBdO1xuICAgICAgICAgICAgICAgIH0gICAgIFxuICAgICAgICAgICAgICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2hpcCBjYW4ndCBiZSBwbGFjZWQgdGhlcmUhXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICBpZiAoeCA+PSAwICYmIHggPD0gOSAmJiB5ICsgbGVuZ3RoIC0gMSA8PSA5ICYmIHkgPj0gMCAmJiB5IDw9IDkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0geTsgaSA8IHkgKyBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBib2FyZFtpXVt4XSA9IFswLCBzaGlwXTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2hpcCBjYW4ndCBiZSBwbGFjZWQgdGhlcmUhXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgICAgIGlmIChib2FyZFt5XVt4XSA9PT0gMCkge1xuICAgICAgICAgICAgYm9hcmRbeV1beF0gPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGJvYXJkW3ldW3hdWzBdID09PSAwKSB7XG4gICAgICAgICAgICBib2FyZFt5XVt4XVswXSA9IDFcbiAgICAgICAgICAgIGJvYXJkW3ldW3hdWzFdLmhpdHMrKztcbiAgICAgICAgICAgIGlmIChib2FyZFt5XVt4XVsxXS5oaXRzID09PSBib2FyZFt5XVt4XVsxXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBib2FyZFt5XVt4XVsxXS5zdW5rID0gdHJ1ZTsgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuc3Vuayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgYWxsU2hpcHNTdW5rIH07XG59XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9OyIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkLmpzJztcblxuY29uc3QgUGxheWVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuXG4gICAgY29uc3QgdGFrZVBsYXllclR1cm4gPSAoeCwgeSwgb3RoZXJHYW1lYm9hcmQpID0+IHtcbiAgICAgICAgb3RoZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9XG5cbiAgICBjb25zdCB0YWtlQ29tcHV0ZXJUdXJuID0gKG90aGVyR2FtZWJvYXJkKSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGlmIChvdGhlckdhbWVib2FyZC5ib2FyZFt5XVt4XSA9PT0gMCB8fCBvdGhlckdhbWVib2FyZC5ib2FyZFt5XVt4XVswXSA9PT0gMCkge1xuICAgICAgICAgICAgb3RoZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRha2VDb21wdXRlclR1cm4ob3RoZXJHYW1lYm9hcmQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdGhlckdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgICAgY29uc3QgZW5kU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZC1zY3JlZW4nKTtcbiAgICAgICAgICAgIGVuZFNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnOyAgICBcbiAgICAgICAgICAgIGVuZFNjcmVlbi50ZXh0Q29udGVudCA9ICdZb3UgTG9zZSEnO1xuICAgICAgICAgICAgY29uc3QgcmVzZXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHJlc2V0QnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAncmVzZXQnKTtcbiAgICAgICAgICAgIHJlc2V0QnRuLnRleHRDb250ZW50ID0gJ1BsYXkgQWdhaW4nO1xuICAgICAgICAgICAgZW5kU2NyZWVuLmFwcGVuZENoaWxkKHJlc2V0QnRuKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItYm9hcmQnKS5zdHlsZS5vcGFjaXR5ID0gMC4zO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbXB1dGVyLWJvYXJkJykuc3R5bGUub3BhY2l0eSA9IDAuMztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IGdhbWVib2FyZCwgdGFrZVBsYXllclR1cm4sIHRha2VDb21wdXRlclR1cm4gfTtcbn1cblxuZXhwb3J0IHsgUGxheWVyIH07IiwiY29uc3QgU2hpcCA9IChsZW5ndGgsIGhpdHMsIHN1bmssIG9yaWVudGF0aW9uKSA9PiB7XG5cbiAgICByZXR1cm4geyBsZW5ndGgsIGhpdHMsIHN1bmssIG9yaWVudGF0aW9uIH07XG4gICAgXG59XG5cbmV4cG9ydCB7IFNoaXAgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWUgfSBmcm9tICcuL21vZHVsZXMvZ2FtZS5qcyc7XG5cbmNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1ib2FyZCcpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wdXRlci1ib2FyZCcpO1xuY29uc3QgcGxheWVyU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwbGF5ZXItYm9hcmQgPiAuc3F1YXJlJyk7XG5jb25zdCBjb21wdXRlclNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY29tcHV0ZXItYm9hcmQgPiAuc3F1YXJlJyk7XG5jb25zdCBlbmRTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5kLXNjcmVlbicpO1xuXG5mdW5jdGlvbiBzZXR1cCgpIHtcbiAgICBsZXQgdHVybiA9ICdwbGF5ZXInO1xuICAgIGxldCBnYW1lT3ZlciA9IGZhbHNlO1xuXG4gICAgZW5kU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZmlsbEJvYXJkKHBsYXllckJvYXJkKTtcbiAgICBmaWxsQm9hcmQoY29tcHV0ZXJCb2FyZCk7ICBcbiAgICBwbGF5ZXJCb2FyZC5zdHlsZS5vcGFjaXR5ID0gMC42OyBcbiAgICBjb21wdXRlckJvYXJkLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIGNvbnN0IGdhbWUgPSBHYW1lKCk7XG5cbiAgICBjb25zdCBwbGF5ZXJTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3BsYXllci1ib2FyZCA+IC5zcXVhcmUnKTtcbiAgICBzaG93UGxheWVyU2hpcHMocGxheWVyU3F1YXJlcywgZ2FtZSk7XG5cbiAgICBjb25zdCBjb21wdXRlclNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY29tcHV0ZXItYm9hcmQgPiAuc3F1YXJlJyk7XG4gICAgY29tcHV0ZXJTcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHR1cm4gPT09ICdwbGF5ZXInICYmICFnYW1lT3ZlciAmJiAoZ2FtZS5jb21wdXRlci5nYW1lYm9hcmQuYm9hcmRbc3F1YXJlLmRhdGFzZXQueV1bc3F1YXJlLmRhdGFzZXQueF0gPT09IDAgfHwgXG4gICAgICAgICAgICAgICAgZ2FtZS5jb21wdXRlci5nYW1lYm9hcmQuYm9hcmRbc3F1YXJlLmRhdGFzZXQueV1bc3F1YXJlLmRhdGFzZXQueF1bMF0gPT09IDApKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5wbGF5ZXIudGFrZVBsYXllclR1cm4oc3F1YXJlLmRhdGFzZXQueCwgc3F1YXJlLmRhdGFzZXQueSwgZ2FtZS5jb21wdXRlci5nYW1lYm9hcmQpO1xuICAgICAgICAgICAgICAgIHJlbmRlckNvbXB1dGVyU3F1YXJlcyhjb21wdXRlclNxdWFyZXMsIGdhbWUpO1xuICAgICAgICAgICAgICAgIHBsYXllckJvYXJkLnN0eWxlLm9wYWNpdHkgPSAxOyBcbiAgICAgICAgICAgICAgICBjb21wdXRlckJvYXJkLnN0eWxlLm9wYWNpdHkgPSAwLjY7IFxuICAgICAgICAgICAgICAgIHR1cm4gPSAnY29tcHV0ZXInO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChnYW1lLmNvbXB1dGVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgICAgICBnYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGVuZFNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnOyAgICBcbiAgICAgICAgICAgICAgICAgICAgZW5kU2NyZWVuLnRleHRDb250ZW50ID0gJ1lvdSBXaW4hJztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzZXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRCdG4uc2V0QXR0cmlidXRlKCdpZCcsICdyZXNldCcpO1xuICAgICAgICAgICAgICAgICAgICByZXNldEJ0bi50ZXh0Q29udGVudCA9ICdQbGF5IEFnYWluJztcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZXR1cCk7XG4gICAgICAgICAgICAgICAgICAgIGVuZFNjcmVlbi5hcHBlbmRDaGlsZChyZXNldEJ0bik7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItYm9hcmQnKS5zdHlsZS5vcGFjaXR5ID0gMC4zO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tcHV0ZXItYm9hcmQnKS5zdHlsZS5vcGFjaXR5ID0gMC4zO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWdhbWVPdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLmNvbXB1dGVyLnRha2VDb21wdXRlclR1cm4oZ2FtZS5wbGF5ZXIuZ2FtZWJvYXJkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlclBsYXllclNxdWFyZXMocGxheWVyU3F1YXJlcywgZ2FtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlckJvYXJkLnN0eWxlLm9wYWNpdHkgPSAxOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckJvYXJkLnN0eWxlLm9wYWNpdHkgPSAwLjY7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdHVybiA9ICdwbGF5ZXInOyAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIuZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZFNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnOyAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRTY3JlZW4udGV4dENvbnRlbnQgPSAnWW91IExvc2UhJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0QnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAncmVzZXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNldEJ0bi50ZXh0Q29udGVudCA9ICdQbGF5IEFnYWluJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNldHVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRTY3JlZW4uYXBwZW5kQ2hpbGQocmVzZXRCdG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItYm9hcmQnKS5zdHlsZS5vcGFjaXR5ID0gMC4zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wdXRlci1ib2FyZCcpLnN0eWxlLm9wYWNpdHkgPSAwLjM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAnNzUwJyk7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBmaWxsQm9hcmQoYm9hcmQpIHtcbiAgICBib2FyZC5pbm5lckhUTUwgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdzcXVhcmUnKTtcbiAgICAgICAgICAgIHNxdWFyZS5kYXRhc2V0LnggPSBqO1xuICAgICAgICAgICAgc3F1YXJlLmRhdGFzZXQueSA9IGk7XG4gICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpOyAgICBcbiAgICAgICAgfVxuICAgIH0gICAgXG59XG5cbmZ1bmN0aW9uIHNob3dQbGF5ZXJTaGlwcyhzcXVhcmVzLCBnYW1lKSB7XG4gICAgc3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiB7XG4gICAgICAgIGlmIChnYW1lLnBsYXllci5nYW1lYm9hcmQuYm9hcmRbc3F1YXJlLmRhdGFzZXQueV1bc3F1YXJlLmRhdGFzZXQueF0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJQbGF5ZXJTcXVhcmVzKHNxdWFyZXMsIGdhbWUpIHtcbiAgICBzcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgaWYgKGdhbWUucGxheWVyLmdhbWVib2FyZC5ib2FyZFtzcXVhcmUuZGF0YXNldC55XVtzcXVhcmUuZGF0YXNldC54XSA9PT0gMSkge1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9ICd4JztcbiAgICAgICAgfSBlbHNlIGlmIChnYW1lLnBsYXllci5nYW1lYm9hcmQuYm9hcmRbc3F1YXJlLmRhdGFzZXQueV1bc3F1YXJlLmRhdGFzZXQueF1bMF0gPT09IDEpIHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9ICfCtyc7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29tcHV0ZXJTcXVhcmVzKHNxdWFyZXMsIGdhbWUpIHtcbiAgICBzcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHtcbiAgICAgICAgaWYgKGdhbWUuY29tcHV0ZXIuZ2FtZWJvYXJkLmJvYXJkW3NxdWFyZS5kYXRhc2V0LnldW3NxdWFyZS5kYXRhc2V0LnhdID09PSAxKSB7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gJ3gnO1xuICAgICAgICB9IGVsc2UgaWYgKGdhbWUuY29tcHV0ZXIuZ2FtZWJvYXJkLmJvYXJkW3NxdWFyZS5kYXRhc2V0LnldW3NxdWFyZS5kYXRhc2V0LnhdWzBdID09PSAxKSB7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gJ8K3JztcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5zZXR1cCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==