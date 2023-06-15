import { Routes, Route } from "react-router-dom";
import { routes } from "./RouterIndex";

export const RouterApp = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
