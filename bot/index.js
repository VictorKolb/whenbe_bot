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

async function parse() {
  bot.sendMessage(168224148, "Пойду посмотрю, что там по концертам");
  const result = await getConcertsString();

  if (result) {
    bot.sendMessage(168224148, result);
  } else {
    bot.sendMessage(168224148, "По концертам пока тишина.");
  }
}

schedule.scheduleJob("17 * * *", function() {
  parse();
});

bot.sendMessage(168224148, "Whenbe bot запущен успешно");
