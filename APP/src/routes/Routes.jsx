import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// Routes
import { Root } from "./Root";
import { Home } from "../pages/Home/Home";
import { Validation } from "../pages/Validation/Validation";
import { MyProfile } from "../pages/MyProfile/MyProfile";
import { EditProfile } from "../pages/EditProfile/EditProfile";
import { AddFriend } from "../pages/AddFriend/AddFriend";
import { MyNotifications } from "../pages/MyNotifications/MyNotifications";
import { MyFriends } from "../pages/MyFriends/MyFriends";
import { PublicProfile } from "../pages/PublicProfile/PublicProfile";
import { RoomPage } from "../pages/RoomPage/RoomPage";
import { MoviePage } from "../pages/MoviePage/MoviePage";
import { NotFound } from "../pages/NotFound/NotFound";

// Use Root as the page structure, Home as home page and each route is specified with its page
export const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="validate/:regCode" element={<Validation />} />
        <Route path="my-profile/:username" element={<MyProfile />} />
        <Route path="edit-profile/:username" element={<EditProfile />} />
        <Route path="add-friend/:username/:regCode" element={<AddFriend />} />
        <Route
          path="my-notifications/:username"
          element={<MyNotifications />}
        />
        <Route path="my-friends/:username" element={<MyFriends />} />
        <Route path="user-profile/:username" element={<PublicProfile />} />
        <Route path="room/:title" element={<RoomPage />} />
        <Route path="room/:title/:type/:id" element={<MoviePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
