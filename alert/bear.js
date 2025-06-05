const cron = require("node-cron");
const eventStartDate = new Date("2025-05-21T00:00:00Z"); // UTC 기준
const eventIntervalDays = 2; // 2로 고정하시오

function isEventDay(today) {
  const diffTime = today.getTime() - eventStartDate.getTime();
  if (diffTime < 0) return false; // 이벤트 시작 전
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % eventIntervalDays === 0;
}

function start(client, channelId) {
  if (!channelId) return;

  //55 11로 바꾸시오
  cron.schedule(
    "55 11 * * *",
    () => {
      const today = new Date(); // UTC 기준 그대로!

      if (isEventDay(today)) {
        const channel = client.channels.cache.get(channelId);

        if (channel) {
          const embed = {
            color: 0xf5f93e, // 주황색 바
            title: "🐻 곰 사냥(Bear)",
            description:
              "곰 사냥 5분 전입니다. 사냥을 준비해주세요! 😉\nBear hunting starts in 5 minutes. Get ready! 😉",
            timestamp: new Date(),
          };

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
