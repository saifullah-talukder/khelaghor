const { searchResults, user } = require("./data");
const { sleep } = require("../../helpers");

const register = async (req, res) => {
  console.log("register");
  await sleep(1000);
  res.status(200).send({
    user_id: "12b48e74-f596-11ee-85a9-f3d0e85b3083",
    email: "username@email.com",
  });
};

const login = async (req, res) => {
  console.log("login");
  await sleep(1000);
  res.status(200).send({
    user_id: "12b48e74-f596-11ee-85a9-f3d0e85b3083",
    email: "username@email.com",
  });
};

const logout = async (req, res) => {
  console.log("logout");
  await sleep(500);
  res.status(200).send();
};

const search = async (req, res) => {
  console.log("search");
  await sleep(5000);
  res.status(200).send({ ...searchResults[0] });
};

const searchHistory = async (req, res) => {
  console.log("search history");
  console.log("query params", req.query);
  await sleep(1000);
  res.status(200).send([...searchResults]);
};

const searchOne = async (req, res) => {
  console.log("search one");
  await sleep(1000);
  res.status(200).send({ ...searchResults[0] });
};

const userProfile = async (req, res) => {
  console.log("user profile");
  await sleep(500);
  res.status(200).send({ ...user });
};

const reaction = async (req, res) => {
  console.log("reaction", req.body);
  await sleep(300);
  res.status(200).send({ message: "success" });
};

module.exports = {
  register,
  login,
  logout,
  search,
  searchHistory,
  searchOne,
  userProfile,
  reaction,
};
