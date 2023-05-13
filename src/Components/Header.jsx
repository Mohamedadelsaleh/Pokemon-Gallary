/* eslint-disable react/prop-types */
import './style.css'
import { Link } from "react-router-dom";
import pokemonIcon from '../assets/pokeapi_256.png'
const Header = (props) => {

  return (
    <div className="container">
        <div className="containerLogo">
          <Link to={`/`}>
            <img className="pokemonImage" src={pokemonIcon} alt='pokemonstore' />
          </Link>
            <h3>Pokemon Gallery</h3>
        </div>
        <div className="containersearch">
            {props.children}
        </div>
    </div>
  )
}

export default Header