import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import PokemonDetails from './Components/PokemonDetails';
import { Typography } from '@mui/material';
import './App.css'

function App() {


  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/Pokemon-Gallary/" element={<Home />} />
          <Route exact path="/pokemon/:pokemonId" element={<PokemonDetails />} />
          <Route path="*"  element={<Typography variant="h3" sx={{alignContent:'center',display:'flex', justifyContent:"center", alignItems:"center" , textAlign: 'center', minHeight:"100vh", color: 'black'}}>404 Not Found</Typography>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
