
    import "reflect-metadata";
    import * as dotenv from "dotenv";
    
    import AppApp from "./app/app";
    import MiddleWare from "./middleware/MiddleWare";
    
    import { Routes } from "./routes";
    
    dotenv.config();
    
    AppApp.run({
        routes: Routes,
        middleware: new MiddleWare().apply(),
        port: process.env.PORT,
        // admin: Admin.register(AdminRoutes), 
        // docs: Docs.init().swagger(DocPages),
    });
    
    