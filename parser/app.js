const PythonShell = require("python-shell").PythonShell;
const getLastPosts = require("./getLastPosts");
const ArtistsApi = require("./artists");
const textMessageTemplate = require("./textMessageTemplate");
const path = require("path");

module.exports = async function getConcertsString() {
  const artists = await ArtistsApi.getAllArtists();
  let result = "";

  await Promise.all(
    artists.map(async artist => {
      const { vkId, lastPostId } = artist;
      const posts = await getLastPosts(vkId).catch(console.log);
      const concertPosts = [];
      const getResult = [];

      for (let i = 0; i < posts.length; i++) {
        const { text, id: postId, owner_id } = posts[i];

        if (lastPostId === postId) break;

        const promise = new Promise((resolve, reject) => {
          const options = {
            args: [text],
          };

          PythonShell.run(
            path.resolve("./python/predict.py"),
            options,
            (err, results) => {
              if (err) return reject(err);

              const isConcert = !!parseInt(results[results.length - 1]);

              if (isConcert) {
                concertPosts.push({
                  id: postId,
                  owner_id,
                });
              }
              resolve();
            },
          );
        });

        getResult.push(promise);
      }

      await Promise.all(getResult).catch(err => console.log(err));
      console.log(`Кажется, найдено ${concertPosts.length}`);
      if (posts[0]) {
        ArtistsApi.setLastPostId({ vkId, lastPostId: posts[0].id });
      }

      result += textMessageTemplate({ artist, concertPosts });
    }),
  );

  return result;
};
