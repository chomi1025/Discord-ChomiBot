const cron = require("node-cron");

// 기준 킬이벤트 날짜 (UTC 기준) 6월6일고정
const killEventStartDate = new Date("2025-06-06T00:00:00Z");

// 14일 간격 반복
const killEventIntervalDays = 28;

function isKillEventDay(today) {
  const diffTime = today.getTime() - killEventStartDate.getTime();
  if (diffTime < 0) return false;

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % killEventIntervalDays === 0;
}

function start(client, channelId) {
  // 킬이벤트 알림 - UTC 기준 00:00고정
  cron.schedule(
    "00 00 * * *",
    () => {
      const today = new Date();

      if (isKillEventDay(today)) {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
          const embed = {
            color: 0xaf5e12,
            title: "💀 킬 이벤트 (Kill Event)",
            description:
              "오늘은 킬이벤트 날입니다! 채집지를 주의하세요! ⚔️\n" +
              "It's Kill Event day! Watch out for gather spots! ⚔️",
            timestamp: new Date(),
          };

          channel.send({ embeds: [embed] });
        }
      }
    },
    {
      timezone: "UTC", // 💡 꼭 필요!
    }
  );
}

module.exports = { start };
