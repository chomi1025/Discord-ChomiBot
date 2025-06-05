const cron = require("node-cron");

// 여러 기준 날짜를 배열로 설정 (UTC 기준)
const baseDates = [
  new Date("2025-05-20T00:00:00Z"),
  new Date("2025-05-22T00:00:00Z"),
];

//14
const eventIntervalDays = 14; // 2주 간격 반복

function isEventDay(today) {
  // today는 UTC 기준 Date 객체라고 가정
  const todayMidnightUTC = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  );

  return baseDates.some((baseDate) => {
    const baseMidnightUTC = Date.UTC(
      baseDate.getUTCFullYear(),
      baseDate.getUTCMonth(),
      baseDate.getUTCDate()
    );

    const diffTime = todayMidnightUTC - baseMidnightUTC;
    if (diffTime < 0) return false;

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays % eventIntervalDays === 0;
  });
}

function start(client, channelId) {
  cron.schedule(
    "31 21 * * *",
    () => {
      const nowUTC = new Date();
      console.log("⏰ CRON 작동함 (UTC):", nowUTC.toISOString());

      if (isEventDay(nowUTC)) {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
          const embed = {
            color: 0xffffff,
            title: "🐱‍👤 미치광이 조이(Crazy Joe)",
            description: "잠시 후 조이가 시작됩니다! 수비하러 갑시다!😉",
            timestamp: new Date(),
          };

          channel.send({ embeds: [embed] });
        } else {
          console.log("❌ 채널 못 찾음. ID 확인:", channelId);
        }
      } else {
        console.log("📭 오늘은 이벤트 날 아님");
      }
    },
    {
      timezone: "UTC", // 🔥 핵심!!!!
    }
  );
}

module.exports = { start };
