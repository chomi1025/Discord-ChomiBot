// bear.js
const cron = require("node-cron");
const { isCanyonEventDay } = require("./eventUtils"); // eventUtils.js 파일의 함수를 사용합니다.

// 시간 계산에 필요한 상수 정의 (eventUtils.js와 동일한 시작일 사용을 전제로 함)
const DAY_MS = 1000 * 60 * 60 * 24;
const canyonStartDate = new Date("2025-05-17T00:00:00Z"); // eventUtils.js의 값과 동일해야 합니다.

// 곰 사냥 시간 패턴 정의 (사용자 요청 기반)
const specialPostCanyonPattern = [
  { hour: 12, minute: 30 }, // 협곡 후 첫 사냥일 (Days 2)
  { hour: 12, minute: 5 }, // 협곡 후 둘째 사냥일 (Days 4)
  { hour: 11, minute: 55 }, // 협곡 후 셋째 사냥일 및 고정 시간 (Days 6 이후)
];

function getBearTime(today) {
  // 1. 협곡 이벤트 날 체크
  if (isCanyonEventDay(today)) {
    return { hour: 12, minute: 55 }; // 협곡일 고정 시간 13:00 UTC
  }

  // 2. 총 경과일 계산 (Start Date 기준)
  const diffTime = today.getTime() - canyonStartDate.getTime();
  const totalDays = Math.floor(diffTime / DAY_MS);

  // 3. 격일 (Every Other Day) 체크: totalDays가 홀수이면 쉬는 날
  // 시작일(Day 0)이 사냥일이므로, 총 경과일이 홀수이면 알림 없음
  if (totalDays % 2 !== 0) {
    return null;
  }

  // 4. 협곡 사이클 내 경과일 계산 (totalDays는 현재 짝수임: 2, 4, 6, ... 26)
  // daysSinceCanyon은 0 (협곡일)은 제외한 짝수일만 남습니다.
  const daysSinceCanyon = totalDays % 28;

  // 5. Post-Canyon 특별 패턴 및 고정 시간 적용
  if (daysSinceCanyon === 2) {
    return specialPostCanyonPattern[0]; // 12:35
  } else if (daysSinceCanyon === 4) {
    return specialPostCanyonPattern[1]; // 12:05
  } else if (daysSinceCanyon >= 6 && daysSinceCanyon % 2 === 0) {
    // Days 6, 8, 10, ..., 26: 고정 시간 12:00 UTC
    return specialPostCanyonPattern[2];
  }

  return null; // 기타 경우 (예: 아직 시작일이 안 된 경우)
}

function start(client, channelId) {
  if (!channelId) return;

  // 매분 체크
  cron.schedule(
    "* * * * *",
    () => {
      const now = new Date();

      const time = getBearTime(now); // { hour, minute } 또는 null 반환

      // 쉬는 날이거나 이벤트가 없는 시간이면 실행하지 않음
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

      // 현재 시간이 계산된 시간과 일치하는지 확인
      if (
        now.getUTCHours() === time.hour &&
        now.getUTCMinutes() === time.minute
      ) {
        channel.send({ embeds: [embed] });
      }
    },
    { timezone: "UTC" }
  );
}

// 확인
module.exports = { start };
