const cron = require("node-cron");
const { Temporal } = require("@js-temporal/polyfill");

function start(client, channelId) {
  if (!channelId) return;

  const startDate = Temporal.PlainDate.from("2026-04-18");

  cron.schedule(
    "* * * * *",
    () => {
      const nowKST = Temporal.Now.zonedDateTimeISO("Asia/Seoul");
      const today = nowKST.toPlainDate();

      const diff = today.since(startDate, { largestUnit: "day" }).days;

      const isEventDay = diff >= 0 && diff % 28 === 0;

      if (!isEventDay) return;

      const channel = client.channels.cache.get(channelId);
      if (!channel) return;

      const alerts = [
        {
          hour: 20,
          minute: 55,
          title: "🔥 협곡전투 2군단(Foundry Legion2)",
          description:
            "협곡전투 2군단 시작 5분 전 입니다! 들어와서 전투를 준비해주세요😉\nThe Legion2 of the Canyon Battle starts in 5 minutes! Please join and get ready for the fight😉",
        },
        {
          hour: 22,
          minute: 55,
          title: "🔥 협곡전투 1군단(Canyon Legion1)",
          description:
            "협곡전투 1군단 시작 5분 전 입니다! 들어와서 전투를 준비해주세요😉\nThe Legion1 of the Canyon Battle starts in 5 minutes! Please join and get ready for the fight😉",
        },
      ];

      const currentAlert = alerts.find(
        (a) => a.hour === nowKST.hour && a.minute === nowKST.minute,
      );

      if (currentAlert) {
        const embed = {
          color: 0x49d3f2,
          title: currentAlert.title,
          description: currentAlert.description,
          timestamp: nowKST.toInstant().toString(),
        };

        channel.send({ embeds: [embed] });
      }
    },
    {
      timezone: "Asia/Seoul",
    },
  );
}

module.exports = { start };
