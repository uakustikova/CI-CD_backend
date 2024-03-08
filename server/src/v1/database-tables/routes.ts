import databaseTables from ".";
import { adminAuthorizationMiddleware } from "../../middleware/authorization";
import { adminRole } from "../../services/userRoles";

export const privateDatabaseTableRoutes = {
  post: {},
  get: {},
  put: {
    databaseTables: {
      path: '/database-tables',
      access: adminRole,
      middleware: [adminAuthorizationMiddleware],
      nextFunc: databaseTables.reset,
    },
  },
  delete: {},
};

