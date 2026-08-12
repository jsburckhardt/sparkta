import { getFoundationMessage } from "./foundation";
import "./index.css";

export const App = () => (
  <main>
    <p className="eyebrow">Foundation</p>
    <h1>Sparkta</h1>
    <p>{getFoundationMessage()}</p>
    <p className="scope">Product workflows are intentionally not part of this bootstrap.</p>
  </main>
);
