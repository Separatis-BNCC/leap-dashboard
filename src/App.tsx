import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ContextPool from "./components/util/ContextPool";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Protect from "./components/general/Protect";
import Course from "./pages/Course";

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
            element: <div>All Courses</div>,
            path: "courses",
          },
          {
            element: <Course />,
            path: "courses/:name",
          },
          {
            element: <div>Classes</div>,
            path: "classes",
          },
          {
            element: <div>schedule</div>,
            path: "schedule",
          },
          {
            element: <div>Master Data</div>,
            path: "master-data",
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
