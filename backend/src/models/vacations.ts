import { 
    AllowNull, BelongsToMany, Column, DataType, Default, 
    Model, PrimaryKey, Table 
} from "sequelize-typescript";
import Followers from "./followers";
import Users from "./users";

@Table({
    underscored: true,

})
export default class Vacations extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    destination: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    startDate: Date;

    @AllowNull(false)
    @Column(DataType.DATE)
    endDate: Date;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    price: number;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    imageFile: string;
    
    @Default(0)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    likesCount: number;
    
    @BelongsToMany(() => Users, () => Followers, 'vacationId', 'userId')
    followers: Users[];
}
