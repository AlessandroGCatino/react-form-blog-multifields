import { FaCartPlus as CartIcon } from "react-icons/fa";

const Card = ({imageUrl, title, description, ingredients, price, available}) => {

    return (
        <div className={`pizza ${available ? 'available' : ''}`}>
            <div className="card-image">
                <img src={imageUrl} alt="Pizza Random" />
            </div>
            <div className="card-content">
                <h3>{title}</h3>
                {ingredients.length > 0 ? 
                    <div className="ingredienti">
                        <strong>Ingredienti:</strong>
                        <ul>
                            {ingredients.map((ingredient, index) => (
                                <li key={`ingr${index}`}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                :
                    <strong>Ingredienti non specificati</strong>
                }
                <p className={`${!description ? 'italic' : ''}`}>
                    {description || "Descrizione non disponibile"}
                </p>
                <div className="prezzo">€ {price.toFixed(2)}</div>
                {available &&
                    <button>
                        Add to Cart <CartIcon/>
                    </button>
                }
            </div>
        </div>
    )
}
export default Card;