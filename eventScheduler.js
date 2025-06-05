const bear = require("./alert/bear"); // 곰
const svs = require("./alert/svs"); // svs
const solar = require("./alert/solar"); //솔라
const canyon = require("./alert/canyon"); //협곡전투
const mercenary = require("./alert/mercenary"); //용병명예
const foundry = require("./alert/foundry"); //무기공장
const joe = require("./alert/joe"); //조이
const kill = require("./alert/Kill"); //킬이벤

let isRunning = false;

function start(client, channelId) {
  if (isRunning) return;
  isRunning = true;

  bear.start(client, channelId);
  svs.start(client, channelId);
  solar.start(client, channelId);
  canyon.start(client, channelId);
  mercenary.start(client, channelId);
  foundry.start(client, channelId);
  joe.start(client, channelId);
  kill.start(client, channelId);
}

module.exports = { start };
