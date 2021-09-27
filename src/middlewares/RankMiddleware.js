const { validate: isUuid } = require("uuid");
const Rank = require("../models/Rank");

module.exports = {
  async validateId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
      return response.status(400).json({ error: "Invalid ID." });
    }

    try {
      const rank = await Rank.findById(id);
      response.rank = rank;
      if (!rank) {
        return response.status(404).json({ error: "Rank not found." });
      }
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }

    next();
  },
};
