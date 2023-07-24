import { Player } from './player.js';

const Game = () => {
    const player = Player();
    const computer = Player();

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

export { Game };