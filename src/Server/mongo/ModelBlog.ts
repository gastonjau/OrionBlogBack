import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IBlog extends Document {
    title: string;
    description: string;
    image: string;
    content: string;
    destacado: boolean;
  }



const SchemaBlog = new Schema<IBlog>({
    title:{ 
        type: String, required: [true, "titulo requerido"] 
    },
    description: { type: String, required:[true, "descripcion requerida"]},
    image: { type: String},
    content: { type: String,required:[true, "contenido requerido"]},
    destacado: {type: Boolean, default: false},
})

export const ModelBlog = mongoose.model<IBlog>('Blog', SchemaBlog)