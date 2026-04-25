const cron = require("node-cron");
const { Temporal } = require("@js-temporal/polyfill");

const baseDates = [
  Temporal.PlainDate.from("2025-05-20"),
  Temporal.PlainDate.from("2025-05-22"),
];

const eventIntervalDays = 14;

function isEventDay(today) {
  return baseDates.some((baseDate) => {
    const duration = today.since(baseDate);
    const diffDays = Math.floor(duration.total({ unit: "days" }));
    return diffDays >= 0 && diffDays % eventIntervalDays === 0;
  });
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
          color: 0xffffff,
          title: "🐱‍👤 미치광이 조이(Crazy Joe)",
          description: "잠시 후 조이가 시작됩니다! 수비하러 갑시다!😉",
        },
      ];

      const currentAlert = alerts.find(
        (a) => a.hour === nowKST.hour && a.minute === nowKST.minute,
      );

      if (currentAlert) {
        const embed = {
          color: currentAlert.color,
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
