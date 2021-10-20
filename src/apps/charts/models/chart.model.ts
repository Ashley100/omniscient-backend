// Package modules
import {
  Column,
  DataType,
  Model,
  Table
} from 'sequelize-typescript';

// Interfaces
export interface CandleInterface {
  symbol?: string;
  interval?: string;
  platform: string;
  direction: string | null;
  opened_at?: string;
  opened_at_utc?: Date;
  open_price?: string;
  close_price?: string;
  high_price?: string;
  low_price?: string;
  size?: string;
  amount?:string; // amount = price * size
  created_by?: string;
}

export class CreateChartDto {
  symbol?: string;
  interval?: string;
  platform: string;
  direction: string | null;
  opened_at?: string;
  opened_at_utc?: Date;
  open_price?: string;
  close_price?: string;
  high_price?: string;
  low_price?: string;
  size?: string;
  amount?:string; // amount = price * size
  created_by?: string;
}

@Table({
  tableName: 'charts'
})
export class ChartModel extends Model<ChartModel, CandleInterface> {

  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  symbol: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  interval: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  platform: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  direction: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  open_price: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  close_price: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  high_price: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  low_price: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  size: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  amount:string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  opened_at: number;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  opened_at_utc: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  created_by: string
}
