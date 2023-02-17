import jwt from "jsonwebtoken";
import config from "config";

export default async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, config.get('secretKey'));
    req.user = decoded;
    /* const user = await User.findById(req.user.userId); */
    next();

  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}