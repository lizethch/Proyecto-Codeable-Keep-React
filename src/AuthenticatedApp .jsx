import React, { useEffect, useState } from 'react';
import SearchPage from './pages/Search-Page';
import { createFavorite, getFavorites, removeFavorite } from './services/favorites-service';
import FavoritesPage from './pages/Favorites-Page';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from './context/Auth-Context';

const AuthenticatedApp = () => {
    const [favorites, setFavorites] = useState([]);
    const { logout } = useAuth();

    function handleAddFavorite(pokemon) {
        console.log("pokemon", pokemon);
        const data = {
            pokemon_name: pokemon.name,
            pokemon_id: pokemon.id,
            pokemon_type: pokemon.types[0].type.name,
            pokemon_avatar_url:
                pokemon.sprites.other["official-artwork"].front_default,
        };
        createFavorite(data)
            .then((newFavorite) => setFavorites([...favorites, newFavorite]))
            .catch((error) => console.log(error));
    }

    function handleRemoveFavorite(pokemon) {
        const favorite = favorites.find(
            (favorite) => favorite.pokemon_name === pokemon.name);

        removeFavorite(favorite.id).then(() => {
            const newFavorites = favorites.filter
                (favorite => favorite.pokemon_name != pokemon.name);
            setFavorites(newFavorites);
        })
    }
    useEffect(() => {
        getFavorites().then((data) => setFavorites(data));
    }, []);

    return (
        <div>
            <button onClick={logout}>Log out</button>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <SearchPage
                                favorites={favorites}
                                onAddFavorites={handleAddFavorite}
                                onRemoveFavorites={handleRemoveFavorite}
                            />
                        }
                    />
                    <Route
                        path="/favorites"
                        element={<FavoritesPage favorites={favorites} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default AuthenticatedApp; 