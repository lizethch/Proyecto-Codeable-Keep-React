import React, { useState } from 'react'
import Input from '../components/Input';
import { getPokemon } from '../services/pokeapi-service';
import PokemonData from '../components/Pokemon-Data';
import { Link } from 'react-router-dom';
const SearchPage = ({ favorites, onAddFavorites, onRemoveFavorites }) => {
    const [query, setQuery] = useState("");
    const [state, setState] = useState({
        status: "idle", // success, error,pending
        data: null,
        error: null,
    });
    const { status, data: pokemon, error } = state;

    function handleSubmit(e) {
        e.preventDefault();
        console.log(query);
        if (query.length === 0) return;
        setState({ status: "pending", data: null, error: null });
        getPokemon(query)
            .then((data) => {
                setState({ status: "success", data: data, error: null });

            })
            .catch((error) => {
                setState({
                    status: "error",
                    data: null,
                    error: "El pokemon no existe! Intenta de nuevo",
                });

            });
    }


    const isFavorite = favorites.find((favorite) => favorite.pokemon_name === pokemon?.name)
        ? true
        : false;

    return (
        <div>
            <Link to="/favorites">Go to Favorites</Link>
            <form onSubmit={handleSubmit}>
                <Input
                    name="query"
                    placeholder="pokemon name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button>Search</button>
            </form>
            {status === "idle" && "Ready to search"}
            {status === "pending" && "Loading..."}
            {status === "success" && (
                <PokemonData
                    dataPokemon={pokemon}
                    onAddFavorite={onAddFavorites}
                    onRemoveFavorite={onRemoveFavorites}
                    isFavorite={isFavorite}
                />
            )}
            {status === "error" && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default SearchPage;