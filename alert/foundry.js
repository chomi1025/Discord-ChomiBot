const cron = require("node-cron");

// 기준 이벤트 날짜
const eventStartDate = new Date("2025-05-18T00:00:00Z"); // UTC 기준

const eventIntervalDays = 14; // 14고정

// 이벤트 날인지 확인하는 함수
function isEventDay(today) {
  const diffTime = today.getTime() - eventStartDate.getTime();
  if (diffTime < 0) return false; // 이벤트 시작 전

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % eventIntervalDays === 0;
}

function start(client, channelId) {
  // 1군단(11시)
  // 55 13 고정
  cron.schedule(
    "55 13 * * *",
    () => {
      const today = new Date(); //오늘 날짜

      //오늘이 이벤트 날이면
      if (isEventDay(today)) {
        const channel = client.channels.cache.get(channelId);

        // 채널 없으면
        if (!channel) {
          console.error(`채널을 찾을 수 없습니다.`);
          return;
        }

        const embed = {
          color: 0x9f6bfe,
          title: "🔥 무기공장 1군단(Foundry Legion1)",
          description:
            "무기공장 1군단 시작 5분 전 입니다! 들어와서 전투를 준비해주세요 😉\n" +
            "The Legion1 of the Foundry starts in 5 minutes! Please join and get ready for the fight 😉",
          timestamp: new Date(),
        };

        channel.send({ embeds: [embed] });
      }
    },
    {
      timezone: "UTC",
    },
  );

  // 2군단(9시)
  //55 11 고정
  cron.schedule(
    "55 11 * * *",
    () => {
      const today = new Date();

      if (isEventDay(today)) {
        const channel = client.channels.cache.get(channelId);

        // 채널 없으면
        if (!channel) {
          console.error(`채널을 찾을 수 없습니다.`);
          return;
        }

        const embed = {
          color: 0x9f6bfe,
          title: "🔥 무기공장 2군단(Foundry Legion2)",
          description:
            "무기공장 2군단 시작 5분 전 입니다! 들어와서 전투를 준비해주세요 😉\n" +
            "The Legion2 of the Foundry starts in 5 minutes! Please join and get ready for the fight 😉",
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
