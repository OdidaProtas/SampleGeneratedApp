
import { Request, Response, NextFunction } from "express"
import createRoute from "../helpers/createRoute";
import useTryCatch from "../helpers/useTryCatch";
import { PrimaryGeneratedColumn, Entity, Column, getRepository, OneToOne } from "typeorm"
import User from "./User";

@Entity()
export default class Profile {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    avatar: string

    @OneToOne(() => User, user => user.profile)
    user: User
}

class ProfileController {
    private pR = getRepository(Profile);

    async save(req: Request, res: Response, next: NextFunction) {
        const [data, error] = await useTryCatch(this.pR.save(req.body));
        if (data) return data;
        else res.status(403).json(error);
    }

    async one(req: Request, res: Response, next: NextFunction) {
        const [data, error] = await useTryCatch(this.pR.findOne())
        if (data) return data;
        else res.status(403).json(error);
    }

    async all(req: Request, res: Response, next: NextFunction) {
        console.log("hehe")
        if (Boolean(req.query.take) && Boolean(req.query.skip)) {
            const [data, error] = await useTryCatch(this.pR.find({ take: req.query.take as unknown as number, skip: req.query.skip as unknown as number }))
            console.log(error)
            if (data) return data;
            else res.status(403).json(error);
        } else {
            const [data, error] = await useTryCatch(this.pR.find())
            console.log(error)
            if (data) return data;
            else res.status(403).json(error);
        }

    }

    async update(req: Request, res: Response, next: NextFunction) {
        const [data, error] = await useTryCatch(this.pR.save(req.body))
        if (data) return data;
        else res.status(403).json(error);
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const [profile, error] = await useTryCatch(this.pR.findOne(req.params.id))
        const [data, err] = await useTryCatch(this.pR.remove(profile))
        if (data) return data;
        else res.status(403).json(error)
    }

}


export const ProfileRoutes = [
    createRoute("post", "/Profile", ProfileController, "save"),
    createRoute("get", "/Profile", ProfileController, "all"),
    createRoute("get", "/Profile/:id", ProfileController, "one"),
    createRoute("put", "/Profile", ProfileController, "update"),
    createRoute("delete", "/Profile/:id ", ProfileController, "delete"),
]
