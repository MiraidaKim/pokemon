import { Card, Button } from "antd";

export default function PokemonCard({ pokemon, onCatch }) {
  return (
    <Card
      hoverable
      style={{ width: 180, textAlign: "center", margin: 10 }}
      cover={
        <img
          alt={pokemon.name}
          src={pokemon.sprite}
          style={{ width: 150, height: 150, margin: "auto" }}
        />
      }
    >
      <h3 style={{ textTransform: "capitalize" }}>{pokemon.name}</h3>
      {onCatch && (
        <Button type="primary" onClick={() => onCatch(pokemon)}>
          Поймать
        </Button>
      )}
    </Card>
  );
}
