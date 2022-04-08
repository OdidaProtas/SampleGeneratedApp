
import { Request, Response, NextFunction } from "express"
import createRoute from "../helpers/createRoute";
import useTryCatch from "../helpers/useTryCatch";
import { PrimaryGeneratedColumn, Entity, Column, getRepository ,OneToOne} from "typeorm"
import Profile from "./Profile";

@Entity() 
export default class User {
@PrimaryGeneratedColumn("uuid")
id: string

@Column() 
name: string

@OneToOne(() => Profile, profile => profile.user) 
profile: Profile 
}

class UserController {
    private uR = getRepository(User);

    async save(req: Request, res: Response, next: NextFunction) {
        const [data, error] = await useTryCatch(this.uR.save(req.body));
        if (data) return data;
        else res.status(403).json(error);
    }

    async one(req: Request, res: Response, next: NextFunction) {
        const [data, error] = await useTryCatch(this.uR.findOne())
    if (data) return data;
    else res.status(403).json(error);
}

async all(req: Request, res: Response, next: NextFunction) {
    if(Boolean(req.query.take)&& Boolean(req.query.skip)){
        const [data, error] = await useTryCatch(this.uR.find({take:req.query.take as unknown as number, skip:req.query.skip as unknown as number}))
if (data) return data;
else res.status(403).json(error);
    }else{
        const [data, error] = await useTryCatch(this.uR.find())
if (data) return data;
else res.status(403).json(error);
    }
  
}

async update(req: Request, res: Response, next: NextFunction) {
    const [data, error] = await useTryCatch(this.uR.save(req.body))
    if (data) return data;
    else res.status(403).json(error);
}

async delete(req: Request, res: Response, next: NextFunction) {
    const [user, error] = await useTryCatch(this.uR.findOne(req.params.id))
    const [data, err] = await useTryCatch(this.uR.remove(user))
    if (data) return data;
    else res.status(403).json(error)
}

}


export const UserRoutes = [
createRoute("post", "/User", UserController, "save"),
createRoute("get", "/User", UserController, "all"),
createRoute("get", "/User/:id", UserController, "one"),
createRoute("put", "/User", UserController, "update"),
createRoute("delete", "/User/:id ", UserController, "delete"),
]
