import { Schema, model } from 'mongoose';

const collection = 'articules';
const schema = new Schema({
    title: { type: String, required: true, unique: true, index: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    photos: [{ type: String, required: false }], // Cambiado para ser un array de URLs de imágenes
    category: { type: String, required: true },
}, {
    timestamps: true
});

const Articule = model(collection, schema);
export default Articule;
