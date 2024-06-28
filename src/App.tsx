import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ContextPool from "./components/util/ContextPool";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    element: <ContextPool />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <AppLayout />,
        path: "/",
        children: [
          {
            element: <Dashboard />,
            path: "dashboard",
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
