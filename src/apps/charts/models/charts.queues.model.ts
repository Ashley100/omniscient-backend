// Package modules
import {
  Column,
  DataType,
  Model,
  Table
} from 'sequelize-typescript';

// Interfaces
export interface ChartsQueuesModelInterface {
  jobId: number | string;
  owner?: string;
  queue?: string;
  inProcess?: boolean;
  createdAt?: Date | null;
  completedAt?: Date | null;
}

export class ChartsQueuesDto {
  jobId: number | string;
  owner?: string;
  queue?: string;
  inProcess?: boolean;
  createdAt?: Date | null;
  completedAt?: Date | null;
}

@Table({
  tableName: 'charts_queues'
})
export class ChartsQueuesModel extends Model<ChartsQueuesModel, ChartsQueuesModelInterface> {

  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  jobId: number;

  @Column({
    type: DataType.STRING,
  })
  owner: string;

  @Column({
    type: DataType.STRING,
  })
  queue: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  inProcess: boolean;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  completedAt: Date;
}
