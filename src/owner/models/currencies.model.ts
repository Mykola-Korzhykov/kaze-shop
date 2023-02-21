import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
  IsInt,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Owner } from './owner.model';


@Table({ tableName: 'Currencies' })
export class Currencies extends Model<Currencies> { 
    @ApiProperty({ example: '1', description: 'unique identifier' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id',
    })
    public id: number;
    
    @Column({
        type: DataType.ENUM('USD'),
        unique: true,
        allowNull: false,
        field: 'base',
    })
    public base: string;

    @Column({
        type: DataType.DATE,
        unique: true,
        allowNull: false,
        field: 'Date',
    })
    public date: Date;

    @Column({
        type: DataType.JSONB,
        unique: true,
        allowNull: false,
        field: 'rates',
    })
    public rates: string;

    @IsInt
    @ForeignKey(() => Owner)
    @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
    private ownerId: number;

    @BelongsTo(() => Owner)
    private owner: Owner;  
    
    getAuthor(): Owner {
        return this.owner;
    }

    setAuthor(owner: Owner): Owner {
        this.owner = owner;
        return this.owner;
    }

    getOwnerId(): number {
        return this.ownerId;
    }

    setOwnerId(ownerId: number): number {
        this.ownerId = ownerId;
        return this.ownerId;
    }
}