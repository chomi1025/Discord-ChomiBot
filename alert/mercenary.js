const cron = require("node-cron");

// 기준 이벤트 날짜 (UTC 기준)
const eventStartDate = new Date("2025-06-02T00:00:00Z");

const eventIntervalDays = 21; // 21일 주기

// 현재까지 며칠 지났는지 계산
function getEventIndex(today) {
  const diffTime = today.getTime() - eventStartDate.getTime();
  if (diffTime < 0) return -1; // 이벤트 시작 전

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays % eventIntervalDays === 0) {
    return Math.floor(diffDays / eventIntervalDays);
  }
  return -1;
}

function sendAlert(client, channelId) {
  const channel = client.channels.cache.get(channelId);
  if (channel) {
    const embed = {
      color: 0x81d742,
      title: "🔧 용병명예(mercenary)",
      description:
        "잠시후 용병명예가 시작됩니다! 보상 먹으러 갑시다!😉\n" +
        "Mercenary starts will start soon! Let's go claim your rewards!😉",
      timestamp: new Date(),
    };
    channel.send({ embeds: [embed] });
  }
}

function start(client, channelId) {
  // 12:30 알림 (짝수번째)
  cron.schedule(
    "30 12 * * *",
    () => {
      const now = new Date();
      const eventIndex = getEventIndex(now);
      if (eventIndex >= 0 && eventIndex % 2 === 0) {
        sendAlert(client, channelId);
      }
    },
    {
      timezone: "UTC",
    },
  );

  // 12:00 알림 (홀수번째)
  cron.schedule(
    "0 12 * * *",
    () => {
      const now = new Date();
      const eventIndex = getEventIndex(now);
      if (eventIndex >= 0 && eventIndex % 2 === 1) {
        sendAlert(client, channelId);
      }
    },
    {
      timezone: "UTC",
    },
  );
}

module.exports = { start };
