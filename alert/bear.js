const cron = require("node-cron");
const eventStartDate = new Date("2025-05-21T00:00:00Z"); // UTC 기준
const eventIntervalDays = 2; // 격일

function isEventDay(today) {
  const diffTime = today.getTime() - eventStartDate.getTime();
  if (diffTime < 0) return false; // 이벤트 시작 전
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % eventIntervalDays === 0;
}

function start(client, channelId) {
  if (!channelId) return;

  cron.schedule("55 11 * * *", () => {
    const today = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
    );
    if (isEventDay(today)) {
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        channel.send(
          "```🐻 곰 사냥 5분 전입니다. 사냥을 준비해주세요!😉\n🐻 Bear hunting starts in 5 minutes. Get ready!😉\n```"
        );
      }
    }
  });
}

module.exports = { start };
