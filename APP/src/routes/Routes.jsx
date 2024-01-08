import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// Routes
import { Root } from "./Root";
import { Home } from "../pages/Home/Home";

import { AcceptInvitation } from "../pages/AcceptInvitation/AcceptInvitation";
import { EditProfile } from "../pages/EditProfile/EditProfile";
import { Film } from "../pages/Film/Film";
import { FriendProfile } from "../pages/FriendProfile/FriendProfile";
import { Friends } from "../pages/Friends/Friends";
import { Notifications } from "../pages/Notifications/Notifications";
import { Profile } from "../pages/Profile/Profile";
import { Room } from "../pages/Room/Room";
import { Validation } from "../pages/Validation/Validation";
import { NotFound } from "../pages/NotFound/NotFound";

// Use Root as the page structure, Home as home page and each route is specified with its page
export const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route
          path="invitacion/:username/:regCode"
          element={<AcceptInvitation />}
        />
        <Route path="perfil/editar/:username" element={<EditProfile />} />
        <Route path="sala/:title/:type/:id" element={<Film />} />
        <Route path="amigos/perfil/:username" element={<FriendProfile />} />
        <Route path="amigos/:username" element={<Friends />} />
        <Route path="notificaciones/:username" element={<Notifications />} />
        <Route path="perfil/:username" element={<Profile />} />
        <Route path="sala/:id" element={<Room />} />
        <Route path="validate/:regCode" element={<Validation />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
