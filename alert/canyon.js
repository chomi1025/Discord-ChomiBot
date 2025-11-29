const cron = require("node-cron");
const { isCanyonEventDay } = require("./eventUtils");

function start(client, channelId) {
  // 1군단(11시)
  //55 13 고정
  cron.schedule(
    "55 13 * * *",
    () => {
      const today = new Date();

      if (isCanyonEventDay(today)) {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
          const embed = {
            color: 0x49d3f2,
            title: "🔥 협곡전투 1군단(Canyon Legion1)",
            description:
              "협곡전투 1군단 시작 5분 전 입니다! 들어와서 전투를 준비해주세요😉\n" +
              "The Legion1 of the Canyon Battle starts in 5 minutes! Please join and get ready for the fight😉",
            timestamp: new Date(),
          };

          // 보내는 코드 예시
          channel.send({ embeds: [embed] });
        }
      }
    },
    {
      timezone: "UTC", // 🔥 핵심!!!!
    }
  );

  // 2군단(9시)
  // 55 11 고정
  cron.schedule(
    "55 11 * * *",
    () => {
      const today = new Date();

      if (isCanyonEventDay(today)) {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
          const embed = {
            color: 0x49d3f2,
            title: "🔥 협곡전투 2군단(Foundry Legion2)",
            description:
              "협곡전투 2군단 시작 5분 전 입니다! 들어와서 전투를 준비해주세요😉\n" +
              "The Legion2 of the Canyon Battle starts in 5 minutes! Please join and get ready for the fight😉",
            timestamp: new Date(),
          };

          // 보내는 코드 예시
          channel.send({ embeds: [embed] });
        }
      }
    },
    {
      timezone: "UTC", // 🔥 핵심!!!!
    }
  );
}

module.exports = { start };
