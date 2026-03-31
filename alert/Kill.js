const cron = require("node-cron");

// 기준 킬이벤트 날짜 (UTC 기준) 6월6일고정
const killEventStartDate = new Date("2025-06-06T00:00:00Z");

// 28일 간격 반복
const killEventIntervalDays = 28;

function isKillEventDay(today) {
  const diffTime = today.getTime() - killEventStartDate.getTime();

  if (diffTime < 0) return false;

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); //일로 변환
  return diffDays % killEventIntervalDays === 0;
}

function start(client, channelId) {
  // 킬이벤트 알림 - UTC 기준 00:00고정(아침 9시)
  cron.schedule(
    "00 00 * * *",
    () => {
      const today = new Date();

      if (isKillEventDay(today)) {
        const channel = client.channels.cache.get(channelId);

        if (!channel) {
          console.error(`채널을 찾을 수 없습니다.`);
          return;
        }

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
    },
    {
      timezone: "UTC",
    },
  );
}

module.exports = { start };
