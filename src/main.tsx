import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store/index.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "./layouts/MainPage/index.tsx";
import { WeatherDetailPage } from "./layouts/WeatherDetailPage/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/:name",
        element: <WeatherDetailPage />,
      },
    ],
  },
]);

const isCities = localStorage.getItem("current_cities");
if (!isCities) {
  localStorage.setItem("current_cities", JSON.stringify([]));
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
