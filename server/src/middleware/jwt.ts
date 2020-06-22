import * as Express from "express";
import * as jwt from "jsonwebtoken";

export const verifyWebToken = () => {
    return function(req: Express.Request, res: Express.Response, next: Function) {
        const token = req.headers["token"]
        console.log(token)
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (!err) {
                console.log("Verified")
                next()
            }
            else {
                res.status(401).send({
                    "Message":"Invalid Session Token"
                });
            }
        });
        
    }
}