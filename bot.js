require("dotenv").config();

const fs = require("fs");
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // 메시지 내용 읽기
  ],
});

const eventScheduler = require("./eventScheduler"); // 이벤트 스케줄러 모듈 불러오기

client.once("ready", () => {
  console.log("봇 켜짐!");
  // 🔥 저장된 채널 ID 가져와서 스케줄 시작
  try {
    const { channelId } = require("./channel");
    eventScheduler.start(client, channelId);
    console.log("자동 알림 스케줄 등록 완료!");
  } catch (error) {
    console.log("채널 정보가 아직 없습니다. !등록 먼저 해주세요!");
  }

  console.log("성공적으로 불러옴 !");
});

//디스코드 봇 특정방에 등록하는거
client.on("messageCreate", (message) => {
  if (message.content === "!등록") {
    const idToSave = message.channel.id;
    fs.writeFileSync(
      "channel.js",
      `module.exports = { channelId: "${idToSave}" };`
    );
    message.channel.send("✅ 이 채널로 알림 보낼게요!");
  }

  if (message.content === "!알림") {
    const { channelId } = require("./channel"); // 동적으로 불러오기
    eventScheduler.start(client, channelId);

    const targetChannel = client.channels.cache.get(channelId);
    if (targetChannel) {
      targetChannel.send("📢 테스트 알림입니다!");
    } else {
      message.channel.send("❌ 채널을 찾을 수 없어요!");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
