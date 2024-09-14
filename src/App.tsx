import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ContextPool from "./components/util/ContextPool";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import Classes from "./components/classes/details/ClassDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Protect from "./components/general/Protect";
import Course from "./pages/Course";
import MasterData from "./pages/MasterData";
import path from "path";
import ClassLayout from "./pages/ClassLayout";
import ClassDetails from "./components/classes/details/ClassDetails";
import Assignment from "./components/classes/assignment/Assignment";
import Attendance from "./components/classes/attendance/Attendance";
import Schedule from "./pages/Schedule";
import Tutorial from "./pages/Tutorial";

const router = createBrowserRouter([
  {
    path: "/tutorial",
    element: <Tutorial />,
  },
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
            element: <ClassLayout />,
            path: "classes/:classId?",
            children: [
              {
                path: "details",
                element: <ClassDetails />,
              },
              {
                path: "assignment",
                element: <Assignment />,
              },
              {
                path: "attendance",
                element: <Attendance />,
              },
            ],
          },
          {
            element: <Schedule />,
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
