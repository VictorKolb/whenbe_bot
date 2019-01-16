const express = require("express");
const ArtistTable = require("./table");
const router = express.Router();

router.get("/all", async (req, res) => {
  const artists = await ArtistTable.getAllArtists();

  res.json(artists.rows);
});

router.get("/add", async (req, res) => {
  const { title, vkId } = req.query;
  await ArtistTable.createArtist({
    title,
    vkId,
  });

  res.json("ok");
});

router.post("/update", async (req, res) => {
  const artists = await ArtistTable.updateLastPostId(req.body);

  res.json(artists.rows);
});

router.get("/create/", async (req, res) => {
  await ArtistTable.createArtist({
    title: "ЛСП",
    vkId: "lsp",
  });

  await ArtistTable.createArtist({
    title: "Anacondaz",
    vkId: "anacondaz",
  });

  await ArtistTable.createArtist({
    title: "Noize Mc",
    vkId: "noizemc",
  });

  await ArtistTable.createArtist({
    title: "Скриптонит",
    vkId: "scriptonite",
  });

  await ArtistTable.createArtist({
    title: "Loqiemean",
    vkId: "loqiemeanmusic",
  });

  await ArtistTable.createArtist({
    title: "WOODJU",
    vkId: "glitchheart",
  });

  await ArtistTable.createArtist({
    title: "Хлеб",
    vkId: "hleb",
  });

  await ArtistTable.createArtist({
    title: "Dance party. Dance! Dance!",
    vkId: "dancepartydancedance",
  });

  await ArtistTable.createArtist({
    title: "#####",
    vkId: "fivediezofficialgroup",
  });

  await ArtistTable.createArtist({
    title: "Кожаный Олень",
    vkId: "koleni_com",
  });

  await ArtistTable.createArtist({
    title: "I SEE STARS",
    vkId: "iseestarsofficial",
  });

  await ArtistTable.createArtist({
    title: "Jan Amit",
    vkId: "amit_music",
  });

  res.json();
});

module.exports = router;
