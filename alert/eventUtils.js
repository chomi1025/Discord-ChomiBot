// eventUtils.js
// 협곡 + 곰

const canyonStartDate = new Date("2025-05-17T00:00:00Z");
const canyonIntervalDays = 28;

function isCanyonEventDay(today) {
  const diff = today - canyonStartDate;
  if (diff < 0) return false;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days % canyonIntervalDays === 0;
}

module.exports = { isCanyonEventDay };
