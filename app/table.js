const pool = require("../utils/databasePool");

module.exports = class ArtistTable {
  static createArtist(artist) {
    return new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO artist(title) VALUES($1)",
        [artist.title],
        (error, response) => {
          if (error) reject(error);

          resolve(response);
        },
      );
    });
  }

  static getAllArtists() {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM artist;", (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    });
  }
};

// ArtistTable.createArtist({ title: "ЛСП" });
