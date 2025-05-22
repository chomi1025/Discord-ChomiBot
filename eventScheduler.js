const bear = require("./alert/bear"); // 곰
const svs = require("./alert/svs"); // svs
const solar = require("./alert/solar"); //솔라
const canyon = require("./alert/canyon"); //솔라
const mercenary = require("./alert/mercenary"); //솔라
const foundry = require("./alert/foundry"); //솔라
const joe = require("./alert/joe"); //솔라

function start(client, channelId) {
  bear.start(client, channelId);
  svs.start(client, channelId);
  solar.start(client, channelId);
  canyon.start(client, channelId);
  mercenary.start(client, channelId);
  foundry.start(client, channelId);
  joe.start(client, channelId);
}

module.exports = { start };
