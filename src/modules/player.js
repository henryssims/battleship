import { Gameboard } from './gameboard.js';

const Player = () => {
    const gameboard = Gameboard();

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

export { Player };