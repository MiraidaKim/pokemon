import axios from "axios";

export const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const getPokemons = async (pageParam = 0) => {
  const limit = 20;
  const offset = pageParam * limit;
  const { data } = await pokeApi.get(`pokemon?limit=${limit}&offset=${offset}`);
  const detailed = await Promise.all(
    data.results.map(async (p) => {
      const detail = await pokeApi.get(p.url);
      return {
        id: detail.data.id,
        name: detail.data.name,
        sprite:
          detail.data.sprites.other["official-artwork"].front_default ||
          detail.data.sprites.front_default,
        stats: detail.data.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
      };
    })
  );
  return {results: detailed, nextPage:pageParam+1 };
};
