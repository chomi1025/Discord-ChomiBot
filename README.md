#  👾 Discord-ChomiBot

이 디스코드 봇은, 제가 실제로 플레이하고 있는 **모바일 MMORPG 게임**의 길드 친구들을 위해 제작한 프로젝트입니다 !

미국, 대만, 중국, 러시아 등 다양한 지역에 거주하는 외국인 친구들과 함께 플레이하다 보니 
 **이벤트 시간을 자주 잊는 일이 생겼고**, 자연스럽게 **참여율이 낮아지는 문제**로 이어졌습니다.

그래서 "디스코드에서 봇이 자동으로 알림을 보내주면 어떨까?" 하는 생각이 들었고,  
길드 유저들의 **이벤트 참여율을 높이고 소통을 돕기 위해** 이 봇을 만들게 되었습니다. 💡

처음에는 단순히 이벤트 알림 기능만 구현했지만, 만들다 보니 욕심이 생겨
불참자 등록 및 조회 기능, 랜덤 동물 사진 출력 같은 소소한 기능들도 함께 추가했습니다.😊
그 덕에 디스코드 서버가 공지용을 넘어, 더 활기차고 즐거운 공간이 되었습니다. 🎮

　
## 📌 기능 소개

- 1️⃣ 이벤트 알림기능<메인 기능>
- 2️⃣ 이벤트 불참자 등록 / 조회 기능
- 3️⃣ 강아지, 고양이 사진 랜덤 불러오기 기능

　
## 📁 폴더구조

```bash
📦 Discord-ChomiBot
├── 📁 absent #불참자 등록/조회 기능
│ └── index.js 
├── 📁 alert #이벤트 알림 개별 기능
│ └── bear.js #곰 사냥
│ └── canyon.js #협곡 전투
│ └── foundry.js #무기 공장
│ └── joe.js #미치광이 조이
│ └── kill.js #킬 이벤트
│ └── mercenary.js #용병 명예
│ └── solar.js #솔라 시티
│ └── svs.js #서버전
├── 📁 fetchImage #사진 출력 기능
├── 📁 config #구글 시트 연동을 위한 키 파일
├── eventScheduler.js #이벤트 알림 기능 종합
├── Channel.js # 디스코드 채널 ID 설정
├── bot.js # 봇 실행 메인 파일
├── .env #디스코드 토큰 환경 변수
├── package.json
└── README.md
```

　
## 🖼️ 데모 & 스크린샷

![image](https://github.com/user-attachments/assets/55e2e4d0-7e47-4afc-b736-9c177c871aca)
![image](https://github.com/user-attachments/assets/cf093313-150c-4785-a6d8-a0920e7a5a81)


　
## 🚀 설치 및 실행 방법

```
git clone https://github.com/yourname/project-name.git
cd Discord-ChomiBot
npm install
npm start
```
⚠️ 이 봇은 특정 Discord 채널 ID 및 토큰 설정이 필요하여, 기본 상태로는 실행되지 않습니다.
<br>
👉 실제 사용을 위해선 Channel.js 파일에서 Discord 채널설정을 추가해야 합니다.

　
### 실제 사용을 위한 필수 파일 및 설정 안내
### 1. Channel.js 
- 디스코드 채널 ID를 입력하세요
- 예시 :
```js
module.exports = {
  DISCORD_CHANNEL_ID: "여기에_디스코드_채널_ID를_입력하세요",
};
```
### 2. absent/index.js 
- 구글 시트 연동 코드가 포함된 파일입니다.
- 서비스 계정 키 파일 경로를 본인 환경에 맞게 수정하세요.
- 예시:
```js
const path = require("path");
const KEY_FILE_PATH = path.join(__dirname, "..", "config", "service-account.json");

```

### 3. config/service-account.json
- 구글 클라우드에서 생성한 서비스 계정 키(JSON) 파일입니다.
- 프로젝트 내 config 폴더에 넣어 사용합니다.
- 이 파일은 민감한 정보이므로 절대 공개 저장소에 업로드하지 마세요!

　
## ✨ 회고 및 앞으로의 계획
이번 프로젝트를 진행하면서 구글 시트를 데이터베이스로 활용하고, 디스코드 봇과 연동하며, 구글 클라우드를 이용해 배포하는 경험을 쌓을 수 있었습니다.
특히 함께 게임하는 친구들이 사용할 봇이라는 생각 덕분에 기획 단계에서 어려움 없이 빠르게 작업할 수 있었고, 실사용 목적의 프로젝트라 피드백도 활발하게 받아가며 즐겁게 진행했습니다.
처음에는 어렵게 느껴졌지만, 하나씩 차근차근 구현해 나가면서 많은 경험과 자신감을 얻을 수 있었습니다.
결과적으로, 이 프로젝트 덕분에 참여율이 크게 높아져 더욱 의미 있는 작업이 되었습니다.💗
