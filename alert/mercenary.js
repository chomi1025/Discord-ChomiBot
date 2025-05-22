const cron = require("node-cron");

// 기준 이벤트 날짜
const eventStartDate = new Date("2025-04-30T00:00:00Z"); // UTC 기준

const eventIntervalDays = 28; // 28고정

function isEventDay(today) {
  const diffTime = today.getTime() - eventStartDate.getTime();
  if (diffTime < 0) return false; // 이벤트 시작 전

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % eventIntervalDays === 0;
}

function start(client, channelId) {
  // 5분전 알림
  // 55 11 고정
  cron.schedule("55 11 * * *", () => {
    const today = new Date();

    if (isEventDay(today)) {
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        const embed = {
          color: 0x81d742, // 라이트 핑크
          title: "🔧 용병명예(mercenary)",
          description:
            "잠시후 용병명예가 시작됩니다! 보상 먹으러 갑시다!😉\n" +
            "Mercenary starts will start soon! Let's go claim your rewards!😉",
          timestamp: new Date(),
        };

        channel.send({ embeds: [embed] });
      }
    }
  });
}

module.exports = { start };
