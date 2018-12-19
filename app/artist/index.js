const express = require("express");
const ArtistTable = require("../table");
const router = express.Router();

router.get("/all", async (req, res) => {
  const artists = await ArtistTable.getAllArtists();

  res.json(artists.rows);
});

router.get("/create/:title", async (req, res) => {
  const { title } = req.params;
  const artists = await ArtistTable.createArtist({ title });

  res.json(artists.rows);
});

module.exports = router;
