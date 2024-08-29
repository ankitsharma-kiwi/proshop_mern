import mongoose from 'mongoose';

const connectDB = async (dbUrl) => {
    console.log("dddd", dbUrl)
  try {
    const conn = await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;