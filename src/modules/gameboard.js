import { Ship } from './ship.js';

const Gameboard = () => {

    let board = Array(10).fill().map(() => {
        return Array(10).fill(0);
    });

    let ships = [];

    const placeShip = (length, orientation, x, y) => {
        const ship = Ship(length, 0, false, orientation);
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

export { Gameboard };