const { request } = require("express");
const { v4: uuid } = require("uuid");
const { update } = require("../models/Rank");
const Rank = require("../models/Rank");

module.exports = {
  async index(request, response) {
    try {
      const rank = await Rank.find();
      return response.status(200).json({ rank });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async store(request, response) {
    const { name, score } = request.body;

    if (!name || !score) {
      return response.status(400).json({ error: "Missing name or score." });
    }

    const rank = new Rank({
      _id: uuid(),
      name,
      score,
      createAt: new Date()
    });

    try {
      await rank.save();
      return response.status(201).json({ message: "Rank added successfully." });
    } catch (err) {
      response.status(400).json({ error: err.message });
    }
  },

  async update(request, response) {
    const { name, score } = request.body;

    if (!name && !score) {
      return response
        .status(400)
        .json({ error: "You must inform a new name or score" });
    }

    console.log(response);
    if (name) response.rank.name = name;
    if (score) response.rank.score = score;

    try {
      await response.rank.save();
      return response
        .status(200)
        .json({ message: "Rank updated successfully" });
    } catch (err) {
      response.status().json({ error: err.message });
    }
  },

  async delete(request, response) {
    try {
      await response.rank.remove();
      return response
        .status(200)
        .json({ message: "Rank deleted successfully" });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  },
};
