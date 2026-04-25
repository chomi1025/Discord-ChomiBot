const cron = require("node-cron");
const { Temporal } = require("@js-temporal/polyfill");

const eventStartDate = Temporal.PlainDate.from("2025-06-02");
const eventIntervalDays = 21;

function getEventIndex(today) {
  const diff = today.since(eventStartDate, { largestUnit: "day" }).days;
  if (diff < 0) return -1;

  if (diff % eventIntervalDays === 0) {
    return Math.floor(diff / eventIntervalDays);
  }
  return -1;
}

function sendAlert(client, channelId) {
  const channel = client.channels.cache.get(channelId);
  if (!channel) return;

  const embed = {
    color: 0x81d742,
    title: "🔧 용병명예(mercenary)",
    description:
      "잠시후 용병명예가 시작됩니다! 보상 먹으러 갑시다!😉\n" +
      "Mercenary starts will start soon! Let's go claim your rewards!😉",
    timestamp: Temporal.Now.zonedDateTimeISO("Asia/Seoul")
      .toInstant()
      .toString(),
  };

  channel.send({ embeds: [embed] });
}

function start(client, channelId) {
  cron.schedule(
    "30 21 * * *",
    () => {
      const nowKST = Temporal.Now.zonedDateTimeISO("Asia/Seoul").toPlainDate();
      const eventIndex = getEventIndex(nowKST);

      if (eventIndex >= 0) {
        sendAlert(client, channelId);
      }
    },
    { timezone: "Asia/Seoul" },
  );
}

module.exports = { start };
