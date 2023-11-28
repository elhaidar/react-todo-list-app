/* eslint-disable @typescript-eslint/no-explicit-any */

//import react-router
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";

//import Root Layout
import RootLayout from "../page/RootLayout";

//import Page Layout
import Layout from "../page/Layout";

//import Todo Page
import TodoPage from "../page/Todo";

//import Categories Page
import CategoriesPage from "../page/Categories";

//import Timeline Page
import TimelinePage from "../page/Timeline";

//import Statistics Page
import StatisticsPage from "../page/Statistics";

//import Home Page
import HomePage from "../page/Home";

//import Not Found Page
import NotFound from "../page/Not Found/404";

//import Trash Page
import TrashPage from "../page/Trash";

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
