const cron = require("node-cron");
const { Temporal } = require("@js-temporal/polyfill");

const startDate = Temporal.PlainDate.from("2025-05-17");

function start(client, channelId) {
  if (!channelId) return;

  cron.schedule(
    "* * * * *",
    () => {
      const nowKST = Temporal.Now.zonedDateTimeISO("Asia/Seoul");
      const today = nowKST.toPlainDate();

      const duration = today.since(startDate);
      const totalDays = Math.floor(duration.total({ unit: "days" }));

      if (totalDays % 2 !== 0) return;

      const channel = client.channels.cache.get(channelId);
      if (!channel) return;

      const alerts = [
        { hour: 20, minute: 55, title: "🐻 사냥함정2(Bear2)" },
        { hour: 21, minute: 55, title: "🐻 사냥함정1(Bear1)" },
      ];

      const currentAlert = alerts.find(
        (a) => a.hour === nowKST.hour && a.minute === nowKST.minute,
      );

      if (currentAlert) {
        const embed = {
          color: 0xf5f93e,
          title: currentAlert.title,
          description:
            "곰 사냥 5분 전입니다. 사냥을 준비해주세요! 😉\nBear hunting starts in 5 minutes. Get ready! 😉",
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
