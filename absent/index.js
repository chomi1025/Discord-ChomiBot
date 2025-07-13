require("dotenv").config();
const { google } = require("googleapis");
const path = require("path");

// 구글 시트 API 초기화 코드 작성 (OAuth2 or 서비스 계정 인증 등)
// 예시로 서비스 계정 키 JSON 파일을 쓰는 방법

const KEY_FILE_PATH = path.join(__dirname, "config", "service-account.json");

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH, // 본인 키파일 경로
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// 구글 스프레드시트 아이디
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

const SHEET_TABS = {
  무기공장: "무기공장(Foundry)",
  협곡전투: "협곡전투(Canyon)",
  foundry: "무기공장(Foundry)",
  canyon: "협곡전투(Canyon)",
};

const VALID_GROUPS = ["1군단", "2군단"];

// 시트 이름으로 시트 ID 얻기
async function getSheetIdByTitle(spreadsheetId, sheetTitle) {
  const res = await sheets.spreadsheets.get({ spreadsheetId });
  const sheet = res.data.sheets.find((s) => s.properties.title === sheetTitle);
  if (!sheet) throw new Error("Sheet not found: " + sheetTitle);
  return sheet.properties.sheetId;
}

// ✅ 가로로 한 줄씩, 아래로 추가되는 함수
async function appendRowVertically(spreadsheetId, sheetTab, values) {
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetTab}!B4:D`, // B~D열만 사용할 거라고 명시
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS", // 아래로 추가되게 설정
    resource: {
      values: [values], // 가로 한 줄 추가
    },
  });
}

function serialNumberToDate(serial) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  const year = date_info.getUTCFullYear();
  const month = (date_info.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date_info.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// 최신 불참자 목록 가져오기
async function getLatestAbsents(spreadsheetId, sheetTab) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetTab}!B4:D`,
  });

  const rows = res.data.values || [];

  if (rows.length === 0) return [];

  // 날짜 컬럼이 B열(인덱스 0)이니까
  const dates = rows.map((r) => {
    const val = r[0];
    if (typeof val === "number") {
      return serialNumberToDate(val);
    }
    return val;
  });

  // 최신 날짜 찾기 (내림차순 정렬 후 첫 번째)
  const latestDate = dates.sort().reverse()[0];

  // 최신 날짜와 같은 행만 필터링
  return rows.filter((r, idx) => {
    const val = r[0];
    const dateStr = typeof val === "number" ? serialNumberToDate(val) : val;
    return dateStr === latestDate;
  });
}

async function handleAbsentCommand(args) {
  try {
    let [eventKor, group, userName] = args;
    if (!eventKor || !group || !userName)
      return "명령어 형식이 올바르지 않습니다!";

    eventKor = eventKor.toLowerCase();

    const sheetTab = SHEET_TABS[eventKor];
    if (!sheetTab) return "이벤트명을 확인해 주세요!";

    if (!VALID_GROUPS.includes(group)) {
      return "군단은 1군단 또는 2군단만 입력 가능합니다!";
    }

    const today = `'${new Date().toISOString().slice(0, 10)}`;

    await appendRowVertically(SPREADSHEET_ID, sheetTab, [
      today,
      group,
      userName,
    ]);

    return `${eventKor} 이벤트에 ${userName}님의 결석 기록 완료!`;
  } catch (error) {
    console.error("ungroupAllRows 에러:", error);
    return "서버 오류가 발생했습니다.";
    // 에러났어도 서버가 멈추지 않도록 처리
  }
}

async function handleListCommand(args, isKoreanMode = true) {
  let [eventKor] = args;
  if (!eventKor) return "이벤트명을 입력해 주세요!";

  eventKor = eventKor.trim().toLowerCase();

  // 키워드 매핑: 한글, 영어 모두 지원
  const keywordMap = {
    canyon: "canyon",
    협곡: "canyon",
    무기공장: "foundry",
    foundry: "foundry",
  };

  const realEventKey = keywordMap[eventKor];
  if (!realEventKey) return "이벤트명을 확인해 주세요!";

  const sheetTab = SHEET_TABS[realEventKey];
  if (!sheetTab) return "이벤트명을 확인해 주세요!";

  const absents = await getLatestAbsents(SPREADSHEET_ID, sheetTab);
  if (absents.length === 0) return "최근 불참자가 없습니다!";

  const dates = absents.map((r) => r[0]);
  const latestDate = dates.sort().reverse()[0];

  // 한글/영어 이벤트 이름 매핑
  const displayNames = {
    canyon: {
      ko: "협곡",
      en: "Canyon",
    },
    foundry: {
      ko: "무기공장",
      en: "Foundry",
    },
  };

  // 한글/영어 불참자 레이블
  const labels = {
    ko: "불참자",
    en: "absentee",
  };

  // 표시할 언어 선택
  const lang = isKoreanMode ? "ko" : "en";

  // 제목 만들기
  const title = `👿 ${displayNames[realEventKey][lang]} ${labels[lang]} (${latestDate})`;

  // 설명 (불참자 목록)
  const description = absents
    .filter((r) => r[0] === latestDate)
    .map((r) => r[2])
    .join("\n");

  // 임베드 객체 반환
  const embed = {
    title,
    description,
    color: 0xf5f93e,
    timestamp: new Date(),
  };

  return { embeds: [embed] };
}

module.exports = {
  handleAbsentCommand,
  handleListCommand,
};
