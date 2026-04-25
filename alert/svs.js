const cron = require("node-cron");
const { Temporal } = require("@js-temporal/polyfill");
const eventStartDate = Temporal.PlainDate.from("2025-04-26");
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
          hour: 18,
          minute: 55,
          color: 0xfc0707,
          title: "🚨 공격 경고!(attack warning!)",
          description:
            "잠시 후 적들이 공격해옵니다! 🙀 얼른 접속해서 보호막을 활성화 해주세요!\nAfter a while, Enemies will attack! 🙀 Log in now and activate your shield!",
        },
        {
          hour: 20,
          minute: 0,
          color: 0x3498db,
          title: "📍 이동 알림(Movement Notice)",
          description:
            "SVS를 위해 솔라시티로 자리를 이동해주세요!😉\nPlease move to Sunfire for the SVS!😉",
        },
        {
          hour: 20,
          minute: 55,
          color: 0xfc0707,
          title: "🛕 서버전 알림(SVS alarm)",
          description:
            "5분 후 서버전이 시작됩니다! 솔라시티로 모여 승리를 위해 함께 싸워요! 💪\nThe SVS starts in 5 minutes! Gather in Solar and fight together for victory! 💪",
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
