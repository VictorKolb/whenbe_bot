const VK = require("vk-io").default;
const vk = new VK();
const token = require("../secrets/vkToken");

vk.token = token;

const getAllPosts = async vkId => {
  const res = await vk.api.groups.getById({ group_ids: vkId });
  const id = res[0].id;
  const posts = await vk.api.wall.get({
    owner_id: -id,
  });

  return posts.items;
};

const getLastPosts = async vkId => {
  const allPosts = await getAllPosts(vkId).catch(console.log);
  const lastPosts = [];

  allPosts.forEach(post => {
    const threeDayAgo = new Date();
    threeDayAgo.setDate(threeDayAgo.getDate() - 3);

    if (post.date * 1000 > threeDayAgo) lastPosts.push(post);
  });
  return lastPosts;
};

module.exports = getLastPosts;
