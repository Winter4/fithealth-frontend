import { IRoute } from "@/types";
import { lazy } from "react";

const Home = lazy(() =>
  import("@/pages/Home").then((module) => ({ default: module.Home }))
);

const AdminPanel = lazy(() =>
  import("@/pages/AdminPanel/AdminPanel").then((module) => ({
    default: module.AdminPanel,
  }))
);

export const routes: IRoute[] = [
  {
    path: "/user/:uuid",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
];
