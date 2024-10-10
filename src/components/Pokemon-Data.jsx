import styled from "@emotion/styled";
import { colors, typography } from "../styles";
import { AiFillStar } from "react-icons/ai";
import { LiaRulerVerticalSolid } from 'react-icons/lia';
import { FaWeightScale } from 'react-icons/fa6';

function formatId(id) {
    id = String(id);
    return id.length < 2 ? `#00${id}` : id.length < 3 ? `#0${id}` : `#${id}`;
}
const PokeImage = styled.img`
max-width: 144px;
`;
const FavoriteButton = styled.button` 
display:flex;
align-items:center;
justify-content:center;
gap:0.5rem;
background-color: ${colors.gray.medium};
border:none;
border-radius: 0.8rem;
padding: 0.5rem 1rem;
font-family: ${typography.text};
font-weight: bold;
color: white;
`
export default function PokemonData({
    dataPokemon, onAddFavorite, onRemoveFavorite, isFavorite }) {

    console.log("isFavorite", isFavorite);

    const regularContent = (
        <>
            <AiFillStar color={colors.gray.light} /> Mark as favorite
        </>
    );

    const favoriteContent = (
        <>
            <AiFillStar color={colors.yellow[500]} /> Remove Favorite
        </>
    );
    return (
        <div>
            <h2>{dataPokemon.name}</h2>
            <p>{formatId(dataPokemon.id)}</p>
            <PokeImage
                src={dataPokemon.sprites.other["official-artwork"].front_default}
                alt={dataPokemon.name}
            />
            {dataPokemon.types.map((element) => (
                <p key={element.slot} >{element.type.name}</p>
            ))}
            <p><LiaRulerVerticalSolid />Height: {dataPokemon.height / 10} m</p>
            <p><FaWeightScale />Weight: {dataPokemon.weight / 10} kg</p>

            <FavoriteButton onClick={() => isFavorite ? onRemoveFavorite(dataPokemon) : onAddFavorite(dataPokemon)}>
                {isFavorite ? favoriteContent : regularContent}
            </FavoriteButton>
        </div>
    );
};