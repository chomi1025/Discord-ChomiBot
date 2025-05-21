const cron = require("node-cron");

// 기준 이벤트 날짜
const eventStartDate = new Date("2025-06-07T21:00:00+09:00"); // KST 9시

const eventIntervalDays = 28; // 4주 간격

function isEventDay(today) {
  const diffTime = today.getTime() - eventStartDate.getTime();
  if (diffTime < 0) return false; // 이벤트 시작 전

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % eventIntervalDays === 0;
}

function start(client, channelId) {
  // 8시에 이동알림
  cron.schedule("55 19 * * *", () => {
    const today = new Date();

    if (isEventDay(today)) {
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        channel.send(
          "```✅ 캐슬전투를 위해 솔라시티로 자리를 이동해주세요!😉\n" +
            "✅ Please move to Sunfire for the castle battle!😉```"
        );
      }
    }
  });

  // 9시에 전투 알림
  cron.schedule("55 20 * * *", () => {
    const today = new Date();

    if (isEventDay(today)) {
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        channel.send(
          "```✅ 5분 후 캐슬전투가 시작됩니다!😉\n" +
            "✅ The castle battle begins in 5 minutes!😉```"
        );
      }
    }
  });
}

module.exports = { start };
