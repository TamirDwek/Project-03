import { Sequelize } from "sequelize-typescript";
import User from "../models/users";
import config from 'config'
import Vacation from "../models/vacations";
import Followers from "../models/followers";
import Vacations from "../models/vacations";
import Users from "../models/users";

const logging = config.get<boolean>(`sequelize.logging`)? console.log : false 

const sequelize = new Sequelize({
    // [add all model classes you created to the array]
    models:[Users,Followers, Vacations],
    dialect:'mysql',
    ...config.get('db'),
    logging,
})



export default sequelize