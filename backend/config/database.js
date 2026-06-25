import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('MONGODB_URI env var:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
