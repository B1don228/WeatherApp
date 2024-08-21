import { Outlet } from "react-router-dom";
import { Header } from "./layouts/Header";
import "./App.scss";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
