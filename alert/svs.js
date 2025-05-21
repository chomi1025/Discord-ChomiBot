const cron = require("node-cron");

// 기준 이벤트 날짜
const eventStartDate = new Date("2025-05-24T21:00:00+09:00"); // KST 9시

const eventIntervalDays = 28; // 4주 간격

function isEventDay(today) {
  const diffTime = today.getTime() - eventStartDate.getTime();
  if (diffTime < 0) return false; // 이벤트 시작 전

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % eventIntervalDays === 0;
}

function start(client, channelId) {
  // 7시에 보호막 알림
  cron.schedule("55 18 * * *", () => {
    const today = new Date();

    if (isEventDay(today)) {
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        channel.send(
          "```🚨 5분 후 적들이 공격해옵니다! 🙀 얼른 접속해서 보호막을 활성화 해주세요!\n" +
            "🚨 Enemies will attack in 5 minutes! 🙀 Log in now and activate your shield!```"
        );
      }
    }
  });

  // 9시에 전투 알림
  cron.schedule("55 20 * * *", () => {
    const today = new Date();

    if (isEventDay(today)) {
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        channel.send(
          "```✅ 5분 후 서버전이 시작됩니다! 솔라시티로 모여 승리를 위해 함께 싸워요! 💪\n" +
            "✅ The SVS starts in 5 minutes! Gather in Solar and fight together for victory! 💪```"
        );
      }
    }
  });
}

module.exports = { start };
