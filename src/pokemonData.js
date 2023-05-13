import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemons = async (limit, offset) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/pokemon`, {
        params: {
            limit,
            offset,
        },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getPokemonByID = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
