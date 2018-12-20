const axios = require("axios");

module.exports = class ArtistsApi {
  static async getAllArtists() {
    const { data: artists } = await axios.get(
      "http://localhost:3000/artist/all",
    );
    return artists;
  }

  static setLastPostId({ vkId, lastPostId }) {
    axios.post("http://localhost:3000/artist/update", {
      lastPostId,
      vkId,
    });
  }
};
