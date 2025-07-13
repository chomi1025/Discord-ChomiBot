const cron = require("node-cron");

// 기준 이벤트 날짜
const eventStartDate = new Date("2025-05-10T00:00:00Z"); // UTC 기준

const eventIntervalDays = 28; // 28고정

function isEventDay(today) {
  const diffTime = today.getTime() - eventStartDate.getTime();
  if (diffTime < 0) return false; // 이벤트 시작 전

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % eventIntervalDays === 0;
}

function start(client, channelId) {
  // 8시에 이동알림
  //55 10 고정
  cron.schedule(
    "00 11 * * *",
    () => {
      const today = new Date();

      if (isEventDay(today)) {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
          const embed = {
            color: 0xf38201,
            title: "🏃‍♂️ 자리이동(move)",
            description:
              "캐슬전투를 위해 솔라시티로 자리를 이동해주세요!😉\n" +
              "Please move to Sunfire for the castle battle!😉",
            timestamp: new Date(),
          };

          // 보내는 코드 예시
          channel.send({ embeds: [embed] });
        }
      }
    },
    {
      timezone: "UTC",
    }
  );

  // 9시에 전투 알림
  //55 11 고정
  cron.schedule(
    "55 11 * * *",
    () => {
      const today = new Date();

      if (isEventDay(today)) {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
          const embed = {
            color: 0xf38201,
            title: "🛕 캐슬전투(Castle Battle)",
            description:
              "5분 후 캐슬전투가 시작됩니다!😉\n" +
              "The castle battle begins in 5 minutes!😉",
            timestamp: new Date(),
          };

          channel.send({ embeds: [embed] });
        }
      }
    },
    {
      timezone: "UTC",
    }
  );
}

module.exports = { start };
