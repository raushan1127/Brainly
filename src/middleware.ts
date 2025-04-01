import { NextFunction, Response,Request } from "express"
import { Jwt} from "jsonwebtoken"
import { JWT_PASSWORD } from "./config"




export const userMiddleware = (req: Request, res: Response , next: NextFunction) => {
    const header = req.headers['authorization'];
    //@ts-ignore
    const decoded = Jwt.verify(header as string , JWT_PASSWORD)
    if(decoded) {
        //@ts-ignore
        req.userId = decoded._id;
        next()
    }
    else{
        res.json({
            message: "you are not loggedin"
        })
        
    }
}