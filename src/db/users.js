const connectToDb = require("./connection");

const createUser = async (user) => {
  const db = await connectToDb();
  const result = await db.collection("users").insertOne({
    ...user,
    createdAt: new Date(),
  });
  return result;
};

const findUserByEmail = async (email) => {
  const db = await connectToDb();
  return await db.collection("users").findOne({ email });
};

const deleteUserByEmail = async (email) => {
  const db = await connectToDb();
  return await db.collection("users").deleteOne({ email });
};

module.exports = { createUser, findUserByEmail, deleteUserByEmail };

