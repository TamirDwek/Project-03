import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Users from "./users";
import Vacations from "./vacations";

@Table({
  underscored: true,
})
export default class Followers extends Model {
  @PrimaryKey
  @ForeignKey(() => Users)
  @Column(DataType.UUID)
  userId!: string;

  @PrimaryKey
  @ForeignKey(() => Vacations)
  @Column(DataType.UUID)
  vacationId: string;
}
