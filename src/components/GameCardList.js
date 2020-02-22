import '../styles/GameCardList.scss';
import React from 'react';
import GameCard from './GameCard';

const GameCardList = ({ games, loading }) => {
    if (!games) return;

    const renderGameCardList = () => {
        if (games.length === 0 && !loading)
            return <h1 className="no-games">Couldn't find anything :(</h1>;
        return games.map(game => {
            if (!game.cover) return null;
            return <GameCard key={game.id} game={game} />;
        });
    };

    return <div className="game-card-list">{renderGameCardList()}</div>;
};

export default GameCardList;
