const TelegramBot = require("node-telegram-bot-api");
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
  const result = await getConcertsString();
  if (result) {
    bot.sendMessage(168224148, result);
  }
}

parse();
