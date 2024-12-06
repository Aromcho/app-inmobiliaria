// middlewares/multerProperties.mid.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import __dirname from '../../utils.js'; // Asegúrate de que esta ruta sea correcta

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, 'Image-properties');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        cb(null, `${basename}-${uniqueSuffix}${ext}`);
    }
});

const uploadProperties = multer({ storage }).array('photos', 5); // Permitir hasta 5 imágenes

export default uploadProperties;
