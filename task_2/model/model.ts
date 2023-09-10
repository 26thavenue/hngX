import mongoose, { Schema, Document } from 'mongoose';

export interface IPerson extends Document {
  name: string;
}

export interface SPerson{
    name:string
}

const PersonSchema: Schema = new Schema({
  name: String,
});

export default mongoose.model<IPerson>('Person', PersonSchema);
