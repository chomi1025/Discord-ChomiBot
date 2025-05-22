const cron = require("node-cron");

// 기준 이벤트 날짜
const eventStartDate = new Date("2025-05-17T00:00:00Z"); // UTC 기준
const eventIntervalDays = 28; // 4주 간격

function isEventDay(today) {
  const diffTime = today.getTime() - eventStartDate.getTime();
  if (diffTime < 0) return false; // 이벤트 시작 전

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % eventIntervalDays === 0;
}

function start(client, channelId) {
  // 1군단(9시)
  cron.schedule("55 11 * * *", () => {
    const today = new Date();

    if (isEventDay(today)) {
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        channel.send(
          "```✅ 협곡전투 1군단 시작 5분 전 입니다! 들어와서 전투를 준비해주세요😉\n" +
            "✅ The Legion1 of the Canyon Battle starts in 5 minutes! Please join and get ready for the fight😉```"
        );
      }
    }
  });

  // 2군단(11시)
  cron.schedule("55 13 * * *", () => {
    const today = new Date();

    if (isEventDay(today)) {
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        channel.send(
          "```✅ 협곡전투 2군단 시작 5분 전 입니다! 들어와서 전투를 준비해주세요😉\n" +
            "✅ The Legion2 of the Canyon Battle starts in 5 minutes! Please join and get ready for the fight😉```"
        );
      }
    }
  });
}

module.exports = { start };
