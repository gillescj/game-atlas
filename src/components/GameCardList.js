import '../styles/GameCardList.scss';
import React from 'react';
import GameCard from './GameCard';

const GameCardList = ({ games }) => {
    if (!games) return;
    const gameCardList = games.map(game => {
        if (!game.cover) return;
        return <GameCard key={game.id} game={game} />;
    });
    return <div className="game-card-list">{gameCardList}</div>;
};

export default GameCardList;
