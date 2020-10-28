import { Model, DataTypes, BuildOptions, Sequelize } from "sequelize";

export interface NoteAttributes {
    id: number;
    title: string;
    message: string;
    tags: string;
}

export interface NoteModel extends Model<NoteAttributes>, NoteAttributes {}
export class Note extends Model<NoteModel, NoteAttributes> {}

export type NoteInstance = typeof Model & {
    new(values?: object, options?: BuildOptions): NoteModel; 
}

export const NoteFactory = (sequelize: Sequelize): NoteInstance  => {
    return <NoteInstance>sequelize.define('note', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true 
            }
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        tags: DataTypes.STRING
    },{
        timestamps: false
    });
}