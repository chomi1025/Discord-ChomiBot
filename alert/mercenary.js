const cron = require("node-cron");

// 기준 이벤트 날짜
const eventStartDate = new Date("2025-05-28T21:00:00+09:00"); // KST 9시

const eventIntervalDays = 28; // 4주 간격

function isEventDay(today) {
  const diffTime = today.getTime() - eventStartDate.getTime();
  if (diffTime < 0) return false; // 이벤트 시작 전

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % eventIntervalDays === 0;
}

function start(client, channelId) {
  // 5분전 알림
  cron.schedule("55 20 * * *", () => {
    const today = new Date();

    if (isEventDay(today)) {
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        channel.send(
          "```✅ 5분후 용병명예가 시작됩니다! 보상 먹으러 갑시다!😉 \n" +
            "✅  Mercenary starts in 5 minutes! Let's go claim your rewards!😉```"
        );
      }
    }
  });
}

module.exports = { start };
