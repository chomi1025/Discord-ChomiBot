const cron = require("node-cron");
const { isCanyonEventDay } = require("./eventUtils");

const DAY_MS = 1000 * 60 * 60 * 24;
const canyonStartDate = new Date("2025-05-17T00:00:00Z"); //협곡이벤트 기준 날짜

// 곰 사냥 시간 패턴(협곡 있는주)
const specialPostCanyonPattern = [
  { hour: 12, minute: 30 },
  { hour: 12, minute: 5 },
  { hour: 11, minute: 55 },
];

function getBearTime(today) {
  // 협곡 이벤트 날 체크
  if (isCanyonEventDay(today)) {
    return { hour: 12, minute: 55 }; // 협곡일 고정 시간 13:00 UTC
  }

  // 총 경과일 계산 (Start Date 기준)
  const diffTime = today.getTime() - canyonStartDate.getTime();
  const totalDays = Math.floor(diffTime / DAY_MS);

  if (totalDays % 2 !== 0) {
    return null;
  }

  const daysSinceCanyon = totalDays % 28;

  //협곡 있는주
  if (daysSinceCanyon === 2) {
    return specialPostCanyonPattern[0]; // 12:35
  } else if (daysSinceCanyon === 4) {
    return specialPostCanyonPattern[1]; // 12:05
  } else if (daysSinceCanyon >= 6 && daysSinceCanyon % 2 === 0) {
    //나머지  12:00
    return specialPostCanyonPattern[2];
  }

  return null;
}

function start(client, channelId) {
  if (!channelId) return;

  // 매분 체크
  cron.schedule(
    "* * * * *",
    () => {
      const now = new Date();

      const time = getBearTime(now);

      if (!time) return;

      const channel = client.channels.cache.get(channelId);
      if (!channel) return;

      const embed = {
        color: 0xf5f93e,
        title: "🐻 곰 사냥(Bear)",
        description:
          "곰 사냥 5분 전입니다. 사냥을 준비해주세요! 😉\nBear hunting starts in 5 minutes. Get ready! 😉",
        timestamp: new Date(),
      };

      if (
        now.getUTCHours() === time.hour &&
        now.getUTCMinutes() === time.minute
      ) {
        channel.send({ embeds: [embed] });
      }
    },
    { timezone: "UTC" },
  );
}

module.exports = { start };
