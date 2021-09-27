const express = require("express");
const routes = express.Router();

const RankController = require("./controllers/RankController");
const RankMiddleware = require("./middlewares/RankMiddleware");

routes.get("/rank", RankController.index);
routes.post("/rank", RankController.store);
routes.put("/rank/:id", RankMiddleware.validateId, RankController.update);
routes.delete("/rank/:id", RankMiddleware.validateId, RankController.delete);

module.exports = routes;
