const TelegramBot = require("node-telegram-bot-api");
const schedule = require("node-schedule");
const Agent = require("socks5-https-client/lib/Agent");
const config = require("../secrets/config");
const getConcertsString = require("../parser/app");

process.env["NTBA_FIX_319"] = "1";
const { token, socksHost, socksPort, socksUsername, socksPassword } = config;

const bot = new TelegramBot(token, {
  polling: true,
  request: {
    agentClass: Agent,
    agentOptions: {
      socksHost,
      socksPort,
      socksUsername,
      socksPassword,
    },
  },
});

async function parse({ withRespond = false }) {
  const result = await getConcertsString();

  if (result) {
    bot.sendMessage(168224148, result);
  } else {
    withRespond && bot.sendMessage(168224148, "По концертам пока тишина.");
  }
}

schedule.scheduleJob("0 * * * *", function() {
  parse({ withRespond: false });
});

bot.sendMessage(168224148, "Whenbe bot запущен успешно");

bot.on("message", async msg => {
  const { text } = msg;

  if (text === "че там") {
    bot.sendMessage(168224148, "Пойду посмотрю, что там по концертам");
    parse({ withRespond: true });
  }
});
