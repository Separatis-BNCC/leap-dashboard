import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ContextPool from "./components/util/ContextPool";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Protect from "./components/general/Protect";
import Course from "./pages/Course";
import MasterData from "./pages/MasterData";

const router = createBrowserRouter([
  {
    element: <ContextPool />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: (
          <Protect>
            <AppLayout />
          </Protect>
        ),
        path: "/",
        children: [
          {
            element: <Dashboard />,
            path: "dashboard",
          },
          // TEMP
          {
            element: <Navigate to="/courses/frontend" />,
            path: "courses",
          },
          {
            element: <Course />,
            path: "courses/:name",
          },
          {
            element: <Classes />,
            path: "classes/:classId?",
          },
          {
            element: <div>schedule</div>,
            path: "schedule",
          },
          {
            element: <MasterData />,
            path: "master-data",
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
