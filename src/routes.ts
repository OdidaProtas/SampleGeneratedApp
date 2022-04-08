


import { UserRoutes } from "./entity/User";


import { ProfileRoutes } from "./entity/Profile";


import registerRoutes from "./helpers/registerRoutes";


export const Routes = registerRoutes(
  [
      UserRoutes,ProfileRoutes
  ]
)
