function linksTemplate(vkId, post) {
  return `\nhttps://vk.com/${vkId}?w=wall${post.owner_id}_${post.id}`;
}
module.exports = function({ artist: { title, vkId }, concertPosts }) {
  if (concertPosts.length) {
    const links = concertPosts.map(post => linksTemplate(vkId, post));
    return `\nТут, видимо, ${title} чё-то про концерты пишет: ${links}\n\n`;
  } else return "";
};
