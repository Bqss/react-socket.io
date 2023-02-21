import {Router} from "express"
import { getAllUser, saveUserIfNotExist } from "./user.js";


const route = Router();

route.post("/user", (req, res) => {

    const {error, data} = saveUserIfNotExist(req.body);
    if(error)  res.status(301).statusMessage = error;
    res.send(data).status(201);

})


route.delete("/user",(req, res) => {
    const {id} = req.body;
     
})

route.get("/user", (req, res) => {
    const result = getAllUser();
    res.send(result).status(200);
})



export default route;