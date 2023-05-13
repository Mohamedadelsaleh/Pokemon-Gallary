import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Pagination, TextField } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getPokemons } from "../pokemonData";
import Header from "./Header";

const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const loadPokemons = async () => {
        const response = await getPokemons(6, (page - 1) * 6);
        console.log(response);
        setPokemons(response.results)
        setCount(Math.ceil(response.count / 6));
        };
        loadPokemons();
    }, [page]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const filteredPokemons = pokemons.filter((pokemon) =>
            pokemon.name.includes(search.toLowerCase())
        
    );
    console.log(filteredPokemons);

    return (
        <div>
            <Header>
                <TextField
                sx={
                    {
                        backgroundColor:'#ebebecf5',
                    }
                }
                placeholder="Search...."
                value={search}
                onChange={handleSearchChange}
                />
            </Header>
            <Box sx={{  
                margin: '0',
                display: 'flex',
                justifyContent: 'center',
                placeItems: 'center',
                minWidth: '320px',
                minHeight:'80vh'
            }}> {
                filteredPokemons.length ? (                
                    <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        {filteredPokemons.map((pokemon) => (
                        <Grid item xs={6} sm={4} md={4} key={pokemon.name}>
                            <Link to={`/pokemon/${pokemon.url.split("/")[6]}`}>
                            <Box
                                sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                p: 2,
                                borderRadius: 1,
                                boxShadow: 1,
                                transition: "box-shadow 0.3s",
                                "&:hover": {
                                    boxShadow: 4,
                                },
                                }}
                            >
                                <Box sx={{
                                    backgroundColor:'lightgray',
                                    width: '100%',
                                    }}>
                                    <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`}
                                    alt={pokemon.name}
                                    width="100"
                                    height="150"
                                    />
                                </Box>
                                <Box sx={{ mt: 1 }}>{pokemon.name}</Box>
                            </Box>
                            </Link>
                        </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 2, display: "flex",justifyContent: "center" }}>
                        <Pagination
                        count={count}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        />

                    </Box>
                </Box>) : (
                    <div className="returnBack">
                        <h2>No Pokemon with this name in this page</h2>
                            <Box onClick={()=>{
                                window.location.reload(false)}} sx={{ 
                                display:'flex',
                                justifyContent:"center",
                                alignItems: 'center',
                                backgroundColor:'#ED2B2A',
                                borderRadius:2,
                                width:'150px',
                                height:'50px',
                                color:'white',
                                m:"50px 0",
                                cursor:"pointer"
                            }}>
                                    <ArrowBackIosIcon />
                                    <span>Return Back</span>
                            </Box>
                    </div>
                )
            }
            </Box>
        </div>  
    );
};

export default Home;