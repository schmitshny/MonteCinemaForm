import "./styles/App.scss";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";

import Register from "./pages/Register";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;
