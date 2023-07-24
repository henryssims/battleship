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

export { Gameboard };