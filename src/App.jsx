import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PokedexPage from "./pages/PokedexPage";
import ArenaPage from "./pages/ArenaPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/reset.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <nav
          style={{
            display: "flex",
            gap: 10,
            padding: 10,
            background: "#222",
            color: "white",
          }}
        >
          <Link to="/" style={{ color: "white" }}>
            Pokedex
          </Link>
          <Link to="/arena" style={{ color: "white" }}>
            Арена
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<PokedexPage />} />
          <Route path="/arena" element={<ArenaPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
