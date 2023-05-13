import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, CircularProgress, Tab, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getPokemonByID } from "../pokemonData";
import Header from "./Header";
import './style.css'

const PokemonDetails = () => {
    const [pokemon, setPokemon] = useState(null);
    const { pokemonId } = useParams();
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    useEffect(() => {
    const loadPokemon = async () => {
        const response = await getPokemonByID(pokemonId);
        setPokemon(response);
    };
    loadPokemon();
    }, [pokemonId]);

    if (!pokemon) {
    return <CircularProgress />;
    }

    const { name, types, stats, moves, abilities, sprites } = pokemon;

    return (
        <div>
            <Header />
            <Box sx={{  
                margin: '0',
                display: 'flex',
                flexDirection:'column',
                alignItems: 'flex-start',
                justifyContent:'flex-start',
                width:"100%",
                minWidth: '320px',
            }}>
                <Box sx={{ p: 2,
                    m:'0px auto',                 
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    minWidth: '50%',}}>
                        <Link to={`/`}>
                            <Box sx={{ 
                                display:'flex',
                                justifyContent:"center",
                                alignItems: 'center',
                                backgroundColor:'#ED2B2A',
                                borderRadius:2,
                                width:'150px',
                                height:'50px',
                                color:'white',
                                m:"50px 0"
                            }}>
                                    <ArrowBackIosIcon />
                                    <span>Back</span>
                            </Box>
                        </Link>
                        <Box sx={{boxShadow: 4, }}>
                            <Box  
                                sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                mb: 2,
                                }}>
                                <Box>
                                    <img
                                        src={sprites.front_default}
                                        alt={name}
                                        width="200"
                                        height="200"
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{fontSize:"1.5rem", mr:1}}>{name}</Typography>
                                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                        {types.map((type) => (
                                            <Box
                                                key={type.type.name}
                                                sx={{
                                                p: 1,
                                                m: 1,
                                                borderRadius: 3,
                                                backgroundColor: `${type.type.name === "grass" ? 'green' : type.type.name === 'fire' ? '#F55050' : type.type.name === 'poison' ? 'darkgreen' : 'gray' }`,
                                                }}
                                            >
                                                {type.type.name}
                                            </Box>
                                        ))}
                                    </Box>
                            </Box>
                            </Box>
                            <Box sx={{ typography: 'body1',}}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="StatS" value="1" />
                                            <Tab label="Moves" value="2" />
                                            <Tab label="Abilities" value="3" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent:"flex-start", alignItems:'center'}}>
                                            <Box sx={{ display: "flex", flexDirection: "column",alignItems:'flex-start' , borderRight:'1px solid gray' }}>
                                                {stats.map((stat) => (
                                                    <Box key={stat.stat.name} sx={{mb: 1, mr:2}}>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", textTransform:'uppercase' }}>
                                                            {stat.stat.name}
                                                        </Typography>
                                                    </Box>
                                                    ))}
                                            </Box>
                                            <Box sx={{ display: "flex", flexDirection: "column"}}>
                                                {stats.map((stat) => (
                                                    <Box key={stat.stat.name} sx={{mb: 1, ml:2}}>
                                                        <Typography
                                                        variant="subtitle1"
                                                        sx={{ ml: 1, fontWeight: "normal" }}
                                                        >
                                                        {stat.base_stat}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <Box sx={{ display: "flex", flexWrap: "wrap", maxWidth: "680px"}}>
                                                {moves.map((move) => (
                                                    <Box
                                                    key={move.move.name}
                                                    sx={{
                                                        p: 1,
                                                        m: 1,
                                                        borderRadius: 1,
                                                        backgroundColor: "#0EA293",
                                                        
                                                    }}
                                                    >
                                                    {move.move.name}
                                                    </Box>
                                                ))}
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <Box>
                                            <Box sx={{ display: "flex", flexWrap: "wrap", maxWidth: "680px" }}>
                                            {abilities.map((ability) => (
                                                <Box
                                                key={ability.ability.name}
                                                sx={{
                                                    p: 1,
                                                    m: 1,
                                                    borderRadius: 1,
                                                    backgroundColor: "#3A98B9",
                                                }}
                                                >
                                                {ability.ability.name}
                                                </Box>
                                            ))}
                                            </Box>
                                        </Box>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </Box>

                </Box>
            </Box>
        </div>
    );
};
export default PokemonDetails;