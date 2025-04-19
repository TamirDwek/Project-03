import {
    AllowNull, BeforeCreate, BelongsToMany, Column,
    DataType, Default, Index, Model, PrimaryKey, Table
  } from "sequelize-typescript";
  import Followers from "./followers";
  import Vacations from "./vacations";
  import bcrypt from "bcrypt";
  
  @Table({ underscored: true })
  export default class Users extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;
  
    @AllowNull(false)
    @Column(DataType.STRING(40))
    firstName: string;
  
    @AllowNull(false)
    @Column(DataType.STRING(40))
    lastName: string;
  
    @AllowNull(false)
    @Index({ unique: true })
    @Column(DataType.STRING(50))
    email: string;
  
    @AllowNull(false)
    @Column(DataType.STRING(64))
    password: string;
  
    @AllowNull(false)
    @Default("User")
    @Column(DataType.ENUM("User", "Admin"))
    role: "User" | "Admin";
  
    @BelongsToMany(() => Vacations, () => Followers, "userId", "vacationId")
    followedVacations: Vacations[];
  
    @BeforeCreate
    static async hashPassword(user: Users) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
  