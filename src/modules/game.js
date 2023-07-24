import { Player } from './player.js';

const Game = () => {
    const player = Player();
    const computer = Player();

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

export { Game };