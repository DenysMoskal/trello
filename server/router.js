const PostController = require("./PostController.js");

const Router = require("express").Router;

const router = new Router();

router.get("/lists", PostController.getList);
router.post("/lists", PostController.newList);
router.delete("/lists/:listId", PostController.deleteList);
router.delete("/cards/:cardId", PostController.deleteCard);
router.post("/lists/:listId/cards", PostController.newCard);

module.exports = router;
