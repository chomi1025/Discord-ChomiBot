const cron = require("node-cron");

// 기준 이벤트 날짜
const eventStartDate = new Date("2025-04-26T00:00:00Z"); // UTC 기준

const eventIntervalDays = 28; // 28고정

function isEventDay(today) {
  const diffTime = today.getTime() - eventStartDate.getTime();

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % eventIntervalDays === 0;
}

function start(client, channelId) {
  // 7시에 보호막 알림
  // 55 09 고정
  cron.schedule(
    "55 09 * * *",
    () => {
      const today = new Date();

      if (isEventDay(today)) {
        const channel = client.channels.cache.get(channelId);

        if (!channel) {
          console.error(`채널을 찾을 수 없습니다.`);
          return;
        }

        const embed = {
          color: 0xfc0707,
          title: "🚨 공격 경고!(attack warning!)",
          description:
            "잠시 후 적들이 공격해옵니다! 🙀 얼른 접속해서 보호막을 활성화 해주세요!\n" +
            "After a while, Enemies will attack! 🙀 Log in now and activate your shield!",
          timestamp: new Date(),
        };

        channel.send({ embeds: [embed] });
      }
    },
    {
      timezone: "UTC",
    },
  );

  // 9시에 전투 알림
  // 55 11 고정
  cron.schedule(
    "55 11 * * *",
    () => {
      const today = new Date();

      if (isEventDay(today)) {
        const channel = client.channels.cache.get(channelId);

        if (!channel) {
          console.error(`채널을 찾을 수 없습니다.`);
          return;
        }

        const embed = {
          color: 0xfc0707,
          title: "🛕 서버전 알림(SVS alarm)",
          description:
            "5분 후 서버전이 시작됩니다! 솔라시티로 모여 승리를 위해 함께 싸워요! 💪\n" +
            "The SVS starts in 5 minutes! Gather in Solar and fight together for victory! 💪",
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
