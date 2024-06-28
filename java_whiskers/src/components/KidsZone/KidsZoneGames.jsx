import React, { useEffect, useState } from 'react';
import {red_top_wave, cats_play_3, cats_play_5} from "../../assets/index.js";

const KidsZoneGames = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            // Assuming db.json is served from public directory or server
            const response = await fetch('/db.json');
            const data = await response.json();
            setGames(data.Kids_Games);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    return (
        <div className="games-container">
            {games.map((game) => (
                <div key={game.id} className="game-item">
                    <img src={game.icon} alt={`${game.title} icon`} className="game-icon"/>
                    <div className="game-details">
                        <h3 className="game-title">{game.title} <br/></h3>
                        <p className="game-desc">{game.desc}</p>
                        <a href={game.docSrc} className="download_button" style={{top: '35px'}}>Download (PDF)</a>
                    </div>
                </div>
            ))}

        </div>

    );
};

export default KidsZoneGames;