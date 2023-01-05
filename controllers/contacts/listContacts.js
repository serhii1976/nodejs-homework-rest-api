const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  let contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email");

  if (favorite) {
    contacts = await Contact.find({ owner: _id, favorite: favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email");
  }
  res.json({
    status: "success",
    code: "200",
    data: {
      result: contacts,
    },
  });
};
module.exports = listContacts;
