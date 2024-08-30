import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = (res, user) => {
  console.log('rrrr', res, user)
  const token = jwt.sign(
    { userId: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  )

  // Set Jwt cookies for HTTP-ONLY
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
  })

  return token
}
