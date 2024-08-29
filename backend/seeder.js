// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/user.js';
import products from './data/products.js';
import User from './models/user.model.js';
import Products from './models/product.model.js';
import Order from './models/order.model.js';
import connectDb from './config/db.js';
dotenv.config();
const dbUri = process.env.MONGO_URI;

connectDb(dbUri)

const importData = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();
    await Products.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await Products.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();
    await Products.deleteMany();
    await Order.deleteMany();

    console.log('Data Distroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
};
