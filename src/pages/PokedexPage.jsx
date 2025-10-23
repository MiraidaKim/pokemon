
import { useInfiniteQuery } from "@tanstack/react-query";
import { pokeApi } from "../api/pokeApi";
import { useCollection } from "../store/useCollection";
import { Button, Card, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "../index.css"; 

export default function PokedexPage() {
  const { add } = useCollection();

  const fetchPokemons = async ({ pageParam = 0 }) => {
    const res = await pokeApi.get(`pokemon?limit=20&offset=${pageParam}`);
    const results = await Promise.all(
      res.data.results.map(async (r) => {
        const d = await pokeApi.get(r.url);
        return {
          id: d.data.id,
          name: d.data.name,
          image:
            d.data.sprites.other["official-artwork"].front_default ||
            d.data.sprites.front_default,
            stats: d.data.stats.map((s) => ({
            name: s.stat.name,
            base_stat: s.base_stat,
          })),
        };
      })
    );
      return { results, nextOffset: pageParam + 20 };
  };

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    getNextPageParam: (last) => last.nextOffset,
  });

  const allPokemons = data?.pages.flatMap((p) => p.results) || [];

  return (
    <div className="pokedex-container">
      <h2 className="pokedex-title"> Pokemon</h2>

      {isLoading && <Spin size="large" className="pokedex-loading" />}

      <InfiniteScroll
        dataLength={allPokemons.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Spin className="pokedex-loading" />}
        className="pokedex-scroll"
      >
        <div className="pokedex-grid">
          {allPokemons.map((p) => (
            <Card
              key={p.id}
              hoverable
              cover={
                <img
                  src={p.image}
                  alt={p.name}
                  className="pokedex-image"
                />
              }
              className="pokedex-card"
            >
              <b className="pokemon-name">{p.name}</b>
              <div>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => add(p)}
                  className="catch-button"
                >
                  Ловить
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
