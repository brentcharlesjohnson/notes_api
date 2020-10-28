import { NoteModel } from './src/models/note';
declare namespace Express {
    export interface Request {
        note: NoteModel;
    }
}