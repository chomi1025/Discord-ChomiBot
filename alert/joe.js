const cron = require("node-cron");

// 날짜를 배열로
const baseDates = [
  new Date("2025-05-20T00:00:00Z"),
  new Date("2025-05-22T00:00:00Z"),
];

const eventIntervalDays = 14; // 2주 간격 반복

function isEventDay(today) {
  const todayMidnightUTC = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );

  return baseDates.some((baseDate) => {
    const baseMidnightUTC = Date.UTC(
      baseDate.getUTCFullYear(),
      baseDate.getUTCMonth(),
      baseDate.getUTCDate(),
    );

    const diffTime = todayMidnightUTC - baseMidnightUTC;

    if (diffTime < 0) return false;

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); //일로변환
    return diffDays % eventIntervalDays === 0;
  });
}

function start(client, channelId) {
  cron.schedule(
    "55 11 * * *",
    () => {
      const nowUTC = new Date(); //오늘

      if (isEventDay(nowUTC)) {
        const channel = client.channels.cache.get(channelId);

        if (!channel) {
          console.error(`채널을 찾을 수 없습니다.`);
          return;
        }

        const embed = {
          color: 0xffffff,
          title: "🐱‍👤 미치광이 조이(Crazy Joe)",
          description: "잠시 후 조이가 시작됩니다! 수비하러 갑시다!😉",
          timestamp: new Date(),
        };

        channel.send({ embeds: [embed] });
      } else {
        console.log("오늘은 이벤트 날 아님.");
      }
    },
    {
      timezone: "UTC",
    },
  );
}

module.exports = { start };
