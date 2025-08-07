import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "your-fallback-uri";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Define a type for the global cache object
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the Node.js global type
const globalForMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

// Initialize the global cache if it doesn't exist
if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

const mongooseCache = globalForMongoose.mongoose;

async function dbConnect(): Promise<typeof mongoose> {
  if (mongooseCache.conn) return mongooseCache.conn;

  if (!mongooseCache.promise) {
    mongooseCache.promise = mongoose.connect(MONGODB_URI, {
      dbName: "musicplayer",
      bufferCommands: false,
    });
  }

  mongooseCache.conn = await mongooseCache.promise;
  return mongooseCache.conn;
}

export default dbConnect;
