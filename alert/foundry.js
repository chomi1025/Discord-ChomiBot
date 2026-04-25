const cron = require("node-cron");
const { Temporal } = require("@js-temporal/polyfill");

const eventStartDate = Temporal.PlainDate.from("2025-05-18");
const eventIntervalDays = 14;

function isEventDay(today) {
  const duration = today.since(eventStartDate);
  const diffDays = Math.floor(duration.total({ unit: "days" }));

  return diffDays >= 0 && diffDays % eventIntervalDays === 0;
}

function start(client, channelId) {
  if (!channelId) return;

  cron.schedule(
    "* * * * *",
    () => {
      const nowKST = Temporal.Now.zonedDateTimeISO("Asia/Seoul");
      const today = nowKST.toPlainDate();

      if (!isEventDay(today)) return;

      const channel = client.channels.cache.get(channelId);
      if (!channel) return;

      const alerts = [
        {
          hour: 20,
          minute: 55,
          title: "🔥 무기공장 2군단(Foundry Legion2)",
          description:
            "무기공장 2군단 시작 5분 전 입니다! 들어와서 전투를 준비해주세요 😉\nThe Legion2 of the Foundry starts in 5 minutes! Please join and get ready for the fight 😉",
        },
        {
          hour: 22,
          minute: 55,
          title: "🔥 무기공장 1군단(Foundry Legion1)",
          description:
            "무기공장 1군단 시작 5분 전 입니다! 들어와서 전투를 준비해주세요 😉\nThe Legion1 of the Foundry starts in 5 minutes! Please join and get ready for the fight 😉",
        },
      ];

      const currentAlert = alerts.find(
        (a) => a.hour === nowKST.hour && a.minute === nowKST.minute,
      );

      if (currentAlert) {
        const embed = {
          color: 0x9f6bfe,
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
