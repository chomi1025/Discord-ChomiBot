require("dotenv").config();
const fetch = require("node-fetch");
const { fetchMuleImage } = require("./fetchImage/mule.js");

const fs = require("fs");
const { Client, GatewayIntentBits } = require("discord.js");
const {
  handleAbsentCommand,
  handleListCommand,
} = require("./absent/googleSheets");
const eventScheduler = require("./eventScheduler"); // 이벤트 스케줄러 모듈 불러오기

// ✅ 전역 변수
let alarmChannelId = null;

// 📦 채널 ID 불러오기
try {
  const { channelId } = require("./channel");
  alarmChannelId = channelId;
} catch {
  console.log("📛 알림 채널 정보 없음");
}

// 🛠️ 디스코드 클라이언트 설정
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // 메시지 내용 읽기
  ],
});

// 봇 시작 시
client.once("ready", () => {
  console.log("🤖 봇 켜짐!");

  if (alarmChannelId) {
    eventScheduler.start(client, alarmChannelId);
    console.log("✅ 자동 알림 스케줄 시작!");
  } else {
    console.log(
      "⚠️ 알림 채널이 설정되지 않았습니다. !등록 명령어를 사용하세요!"
    );
  }

  console.log("🎉 봇 준비 완료!");
});

// 메시지 명령어 처리
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // ✅ 알림 채널 등록
  if (message.content === "!등록") {
    const idToSave = message.channel.id;
    fs.writeFileSync(
      "channel.js",
      `module.exports = { channelId: "${idToSave}" };`
    );
    alarmChannelId = idToSave; // 새로 저장
    message.channel.send("✅ 이 채널로 알림 보낼게요!");
  }

  // ✅ 수동 알림 테스트 (알림 채널에서만)
  if (message.content === "!알림") {
    if (message.channel.id !== alarmChannelId) {
      return message.channel.send(
        "❌ 이 명령어는 등록된 알림 채널에서만 사용할 수 있어요!"
      );
    }

    try {
      const { channelId } = require("./channel");
      const targetChannel = client.channels.cache.get(channelId);

      if (targetChannel) {
        eventScheduler.start(client, channelId);
        targetChannel.send("📢 테스트 알림입니다!");
      } else {
        message.channel.send("❌ 채널을 찾을 수 없어요!");
      }
    } catch {
      message.channel.send(
        "⚠️ 알림 채널이 등록되어 있지 않아요. !등록 먼저 해주세요!"
      );
    }
  }

  // ✅ 수동 알림 테스트 (불참자 채널에서만)
  if (message.content === "!불참알림") {
    if (message.channel.id !== absentChannelId) {
      return message.channel.send(
        "❌ 이 명령어는 등록된 불참자 채널에서만 사용할 수 있어요!"
      );
    }

    try {
      const { channelId } = require("./absentChannel.js");
      const targetChannel = client.channels.cache.get(channelId);

      if (targetChannel) {
        eventScheduler.start(client, channelId);
        targetChannel.send("📢 테스트 알림입니다!");
      } else {
        message.channel.send("❌ 채널을 찾을 수 없어요!");
      }
    } catch {
      message.channel.send(
        "⚠️ 불참자 채널이 등록되어 있지 않아요. !불참등록 먼저 해주세요!"
      );
    }
  }

  // ✅ 불참자 등록
  if (message.content.startsWith("!결석")) {
    const args = message.content.split(" ").slice(1);
    const reply = await handleAbsentCommand(args);
    message.channel.send(reply);
  }

  // ✅ 리스트 조회
  if (
    message.content.toLowerCase().startsWith("!리스트") ||
    message.content.toLowerCase().startsWith("!list")
  ) {
    // args를 소문자로 변환
    const isKoreanMode = message.content.startsWith("!리스트");
    const argsRaw = message.content.split(" ").slice(1);
    const args = argsRaw.map((arg) => arg.toLowerCase());

    const reply = await handleListCommand(args, isKoreanMode);
    if (reply) message.channel.send(reply);
  }

  // ✅ 고양이 사진 가져오기
  if (message.content === "!냥냥") {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search"
      );
      const data = await response.json();

      if (data[0] && data[0].url) {
        message.channel.send({
          files: [data[0].url],
        });
      } else {
        message.channel.send("😿 고양이 사진을 가져올 수 없어요!");
      }
    } catch (error) {
      console.error("API 오류:", error);
      message.channel.send("❌ 오류가 발생했어요");
    }
  }

  // ✅ 강아지 사진 가져오기
  if (message.content === "!멍멍") {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();

      if (data.status === "success" && data.message) {
        message.channel.send({
          files: [data.message],
        });
      } else {
        message.channel.send("🐕‍🦺 댕댕이 사진을 못 찾았어요ㅠㅠ");
      }
    } catch (error) {
      console.error("🐛 강아지 API 오류:", error);
      message.channel.send("❌ 오류가 발생했어요! 밍키가 댕댕이 데려올게요!");
    }
  }

  // ✅ 노새 사진 가져오기
  if (message.content === "!노새") {
    const muleImage = await fetchMuleImage();

    if (muleImage) {
      message.channel.send({
        files: [muleImage],
      });
    } else {
      message.channel.send("노새 이미지를 못 찾았어...ㅠㅠ");
    }
  }
});

// 로그인
client.login(process.env.DISCORD_TOKEN);
