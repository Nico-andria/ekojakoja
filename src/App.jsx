import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Details from "./pages/Details";
import Loading from "./components/Loading";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
