import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/user.model.js'
import { generateToken } from '../utils/index.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const ddd = await user.matchPassword(password)

  if (user && (await user.matchPassword(password))) {
    // Generate token
   const token = generateToken(res, user)

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc Register a new user
// @route POST /api/users
// @access public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,
    email,
    password,
    isAdmin
  })
  if (user) {
    const token = generateToken(res, user)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Get user profile
// @route GET /api/users/profile
// @access private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Loggout user / clear cookie
// @route POST /api/users/logout
// @access Private
export const logoutUser = asyncHandler(async (req, res) => {
  // For clear cookies, need to pass the key of cookie with empty value with, the expires current.
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'Logged out successfully' });
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  res.json('get all users')
})

// @desc Get single user
// @route Get /api/users/:id
// @access Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  res.json('get user by ID')
})

// @desc Delete single user
// @route Delete /api/users/:id
// @access Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  res.json('delete user')
})

// @desc Update single user
// @route PUT /api/users/:id
// @access Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  res.json('update user')
})
