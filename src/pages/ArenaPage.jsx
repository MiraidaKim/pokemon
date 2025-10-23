import React, { useState } from "react";
import { useCollection } from "../store/useCollection";
import { Select, Card } from "antd";

export default function ArenaPage() {
  const { list } = useCollection();
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);

  const getPower = (p) => {
    if (!p) return 0;
    return (
      p.stats.reduce((acc, s) => acc + s.base_stat, 0)
    );
  };

  const winner =
    p1 && p2
      ? getPower(p1) > getPower(p2)
        ? p1.name
        : p2.name
      : null;

  return (
    <div style={{ padding: 20 }}>
      <h2> Боевая арена</h2>
      <div style={{ display: "flex", gap: 20 }}>
        <Select
          placeholder="Выбери 1-го"
          style={{ width: 200 }}
          onChange={(id) => setP1(list.find((x) => x.id === id))}
          options={list.map((p) => ({
            label: p.name,
            value: p.id,
          }))}
        />
        <Select
          placeholder="Выбери 2-го"
          style={{ width: 200 }}
          onChange={(id) => setP2(list.find((x) => x.id === id))}
          options={list.map((p) => ({
            label: p.name,
            value: p.id,
          }))}
        />
      </div>

      <div style={{ marginTop: 30, display: "flex", gap: 20 }}>
        {[p1, p2].map(
          (p, i) =>
            p && (
              <Card
                key={i}
                style={{ width: 200, textAlign: "center" }}
                cover={<img alt={p.name} src={p.image} />}
              >
                <b>{p.name}</b>
              </Card>
            )
        )}
      </div>

      {winner && (
        <h3 style={{ marginTop: 30 }}> Победитель: {winner}</h3>
      )}
    </div>
  );
}
