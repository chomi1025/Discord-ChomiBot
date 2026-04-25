const cron = require("node-cron");
const { Temporal } = require("@js-temporal/polyfill");

const eventStartDate = Temporal.PlainDate.from("2025-05-10");
const eventIntervalDays = 28;

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
          minute: 0,
          color: 0xf38201,
          title: "🏃‍♂️ 자리이동(move)",
          description:
            "캐슬전투를 위해 솔라시티로 자리를 이동해주세요!😉\nPlease move to Sunfire for the castle battle!😉",
        },
        {
          hour: 20,
          minute: 55,
          color: 0xf38201,
          title: "🛕 캐슬전투(Castle Battle)",
          description:
            "5분 후 캐슬전투가 시작됩니다!😉\nThe castle battle begins in 5 minutes!😉",
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
