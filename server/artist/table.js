const pool = require("../../utils/databasePool");

module.exports = class ArtistTable {
  static createArtist(artist) {
    const { title, vkId } = artist;
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO artist(title, "vkId", "lastPostId") VALUES($1, $2, $3)`,
        [title, vkId, 0],
        (error, response) => {
          if (error) reject(error);

          resolve(response);
        },
      );
    });
  }

  static updateLastPostId({ lastPostId, vkId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE artist SET "lastPostId" = $1 WHERE "vkId" = $2`,
        [lastPostId, vkId],
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
