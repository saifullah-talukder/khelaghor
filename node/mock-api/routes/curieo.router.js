const express = require("express");
const curierController = require("../controllers/curieo");

const router = express.Router();

router.post("/auth/register", curierController.register);
router.post("/auth/login", curierController.login);
router.get("auth/logout", curierController.logout);
router.get("/search", curierController.search);
router.get("/search/history", curierController.searchHistory);
router.get("/search/one", curierController.searchOne);
router.get("/users/me", curierController.userProfile);
router.patch("/search/reaction", curierController.reaction);

module.exports = router;
