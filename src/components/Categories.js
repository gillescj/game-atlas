import '../styles/Categories.scss';

import React from 'react';

const Categories = props => {
    const onGenreSelectChange = event => {
        const value = event.target.value;
        if (value === 'all') {
            props.findPopularGames();
        } else {
            props.findGenre(value);
        }
    };

    return (
        <>
            <select className="genre-select" onChange={onGenreSelectChange}>
                <option value="all">All Genres</option>
                <option value="4">Fighting</option>
                <option value="8">Platform</option>
                <option value="9">Puzzle</option>
                <option value="11">Real Time Strategy (RTS)</option>
                <option value="12">Role Playing Game (RPG)</option>
                {/* <option vaule="10">Racing</option> */}
                <option value="5">Shooter</option>
                <option value="16">Turn Based Strategy (TBS)</option>
            </select>
        </>
    );
};

export default Categories;
