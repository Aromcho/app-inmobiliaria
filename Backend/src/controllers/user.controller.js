import UserManager from "../manager/user.manager.js";
import User from '../models/User.model.js';
import Property from '../models/Property.model.js';

export const createUser = async (req, res, next) => {
      try {
        const data = req.body;
        const one = await UserManager.create(data);
        return res.status(201).json({ message: 'User created successfully', user: one });

      } catch (error) {
        return next(error);
      }
    };

export const getUsers = async (req, res, next) => {
    try {
        const { role } = req.query;
        const all = await UserManager.read(role);
        if (all.length > 0) {
          
          return res.status(200).json(all);

        } else {
          return res.status(404).json(error);
        }
      } catch (error) {
        return next(error);
      }

    };

export const getUserById = async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await UserManager.readOne(uid);
        if (one) {
          return res.status(200).json(one);
        } else {
          return res.status(404).json(error);
        }
      } catch (error) {
        return next(error);
      }
    };

export const updateUser = async (req, res, next) => {
      try {
        const { uid } = req.params;
        const data = req.body;
        const one = await UserManager.update(uid, data);
        return res.status(200).json(one);
      } catch (error) {
        return next(error);
      }
    };

export const deleteUser = async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await UserManager.destroy(uid);
        return res.status(200).json(one);
      } catch (error) {
        return next(error);
      }
    };
  


export const addFavorite = async (req, res) => {
  try {
    const { userId } = req.params;
    const { propertyId } = req.body;

    // Buscar al usuario y agregar su favorito si no existe
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: propertyId } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error agregando favorito', error });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { userId, propertyId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: propertyId } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error removiendo favorito', error });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    // Buscar al usuario y luego obtener los detalles de sus favoritos
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // user.favorites = [123, 124, 125,...]
    const favorites = await Property.find({ _id: { $in: user.favorites } }).lean();
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener favoritos', error });
  }
};
