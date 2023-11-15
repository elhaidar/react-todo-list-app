/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import RootLayout from "../page/Layout";
import Layout from "../page/Dashboard/Layout";
import TodoPage from "../page/Dashboard/Todo";
import CategoriesPage from "../page/Dashboard/Categories";
import TimelinePage from "../page/Dashboard/Timeline";
import StatisticsPage from "../page/Dashboard/Statistics";
import HomePage from "../page/Dashboard/Home";
import NotFound from "../page/404";
import TrashPage from "../page/Dashboard/Trash";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="todo">
              <Route index element={<TodoPage />} />
            </Route>
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="timeline" element={<TimelinePage />} />
            <Route path="trash" element={<TrashPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
