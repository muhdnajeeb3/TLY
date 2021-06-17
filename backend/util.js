import jwt from "jsonwebtoken"

export const generateToken = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    eamil: user.email,
    isAdmin: user.isAdmin,
  },process.env.JWT_SECRET || 'somethingsecret' , {
      expiresIn: '30d',
  });
};
