const express = require("express");
const router = express.Router();

router.get("/data", (req, res) => {
  res.json({ data: [{ id: 1 }, { id: 2 }] });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  // find by id in the DB
  //res.json(updatedData);
});

router.post("/create", async (req, res) => {
  const newData = req.body;
  try {
    const savedData = await newData.save();
    res.json(savedData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
