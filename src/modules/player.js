import { Gameboard } from './gameboard.js';

const Player = () => {
    const gameboard = Gameboard();

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

export { Player };