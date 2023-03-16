const List = require("./Shema/list.js");
const Card = require("./Shema/card.js");

class PostController {
  async getList(req, res) {
    try {
      const lists = await List.find().populate("cards");
      res.send(lists);
    } catch (error) {
      console.log(error);
    }
  }

  async newList(req, res) {
    try {
      const { title } = req.body;
      const list = new List({ title });
      await list.save();
      res.send(list);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteList(req, res) {
    try {
      const { listId } = req.params;

      await Card.deleteMany({ listId });

      const deletedList = await List.findByIdAndDelete(listId);

      if (!deletedList) {
        return res.status(404).json({ message: "Список не знайдено" });
      }
      res.send({ success: true });
    } catch (error) {}
  }

  async deleteCard(req, res) {
    try {
      const { cardId } = req.params;
      const card = await Card.findByIdAndDelete(cardId);

      const list = await List.findOne({ _id: card.listId });
      list.cards = list.cards.filter((item) => item._id !== cardId);
      await list.save();

      res.send({ success: true });
    } catch (error) {
      console.log(error);
    }
  }

  async newCard(req, res) {
    try {
      const { listId } = req.params;
      const { title } = req.body;
      const card = new Card({ title, listId });
      await card.save();
      const list = await List.findOne({ _id: listId });
      list.cards.push(card);
      await list.save();

      res.send(card);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PostController();
