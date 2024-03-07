const db = require("../db/mysql.config");

const registerUser = async (profile) => {
  const { first_name, last_name, email, password } = profile;

  const registerQuery = `INSERT INTO profiles 
        (first_name, last_name, email, password)
        VALUES 
        (?, ?, ?, ?)`;

  try {
    await db.query(registerQuery, [first_name, last_name, email, password]);
  } catch (err) {
    return {
      error: err,
    };
  }

  return {
    success: "User registered",
  };
};

const getUser = async () => {
  const getUserQuery = "SELECT * FROM profiles";

  let resp;

  try {
    resp = await db.query(getUserQuery);
  } catch (err) {
    return {
      error: err,
    };
  }

  return resp[0];
};

const deleteUser = async (id) => {
  const deleteUserQuery = "DELETE FROM profiles WHERE id = ?";

  let resp;

  try {
    resp = await db.query(deleteUserQuery, [id]);
  } catch (err) {
    return {
      error: err,
    };
  }

  if (resp[0].affectedRows === 0) {
    return {
      error: "Account already deleted",
    };
  }

  return {
    success: "Account deleted",
  };
};

const updateUser = async (id, body) => {
  const updateUser = "UPDATE profiles SET first_name = ? WHERE id = ?";

  let resp;

  try {
    resp = await db.query(updateUser, [body, id]);
  } catch (err) {
    return {
      error: err,
    };
  }

  if (resp[0].affectedRows === 0) {
    return {
      error: "Account not found",
    };
  }

  return {
    success: "User updated",
  };
};

module.exports = {
  registerUser,
  getUser,
  deleteUser,
  updateUser,
};
