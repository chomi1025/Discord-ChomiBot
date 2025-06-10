#  👾 Discord-ChomiBot
![Build Status](https://img.shields.io/github/actions/workflow/status/사용자명/저장소명/ci.yml?branch=main)
![Node Version](https://img.shields.io/node/v/패키지명)
![License](https://img.shields.io/github/license/사용자명/저장소명)

이 디스코드 봇은, 제가 실제로 플레이하고 있는 **모바일 MMORPG 게임**의 길드 친구들을 위해 제작한 프로젝트입니다 !

미국, 대만, 중국, 러시아 등 다양한 지역에 거주하는 외국인 친구들과 함께 플레이하다 보니 
 **이벤트 시간을 자주 잊는 일이 생겼고**, 자연스럽게 **참여율이 낮아지는 문제**로 이어졌습니다.

그래서 "디스코드에서 봇이 자동으로 알림을 보내주면 어떨까?" 하는 생각이 들었고,  
길드 유저들의 **이벤트 참여율을 높이고 소통을 돕기 위해** 이 봇을 만들게 되었습니다. 💡

처음에는 단순히 이벤트 알림 기능만 구현했지만, 만들다 보니 욕심이 생겨
불참자 등록 및 조회 기능, 랜덤 동물 사진 출력 같은 소소한 기능들도 함께 추가했습니다.😊

　
## 🖼️ 데모 & 스크린샷
### 🔔 1. 이벤트 알림
![image](https://github.com/user-attachments/assets/55e2e4d0-7e47-4afc-b736-9c177c871aca)

* 게임 이벤트는 N주, N회, N시와 같이 **고정된 주기로 반복되는 특징**을 가지고 있습니다.
* 이러한 반복적인 이벤트를 놓치지 않도록 **Node-cron 기능을 활용**하여 **자동 타이머 알림 기능**을 개발했습니다.

[자세한 설명 보기](https://github.com/chomi1025/Discord-ChomiBot/wiki/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%95%8C%EB%A6%BC)


　
### ❌ 2. 불참자 등록/조회
#### 2-1 불참자 등록
<table align="center" style="margin: auto; width: 100%;">
  <tr>
    <td align="center" style="padding: 10px; vertical-align: top;">
      <div>
        <img src="https://github.com/user-attachments/assets/2bf85c43-145c-4f7f-bdb8-a69f5fe09e1f" width="450" />
      </div>
    </td>
    <td align="center" style="padding: 10px;">
      <div>
        <img src="https://github.com/user-attachments/assets/bf059b73-faf2-49c7-9259-899f636ee15c" width="450" />
      </div>
    </td>
  </tr>
  
 <tr>
    <td align="center" style="padding-top: 10px;">
      <em>📖 디스코드에서 불참자를 작성합니다.</em>
    </td>
   <td align="center" style="padding-top: 10px;">
      <em>🚀 구글시트에 데이터값이 전송됩니다.</em>
    </td>
  </tr>
  
  <tr>
    <td colspan="2" align="center" style="padding-top: 10px;">
      <em>디스코드에서 명령어 입력과 동시에 구글시트에 실시간으로 작성이 이루어집니다.</em>
    </td>
  </tr>
</table>

#### 2-1 불참자 조회
<table align="center" style="margin: auto; width: 100%;">
  <tr>
    <td align="center" style="padding: 10px; vertical-align: top;">
      <div>
        <img src="https://github.com/user-attachments/assets/2bf85c43-145c-4f7f-bdb8-a69f5fe09e1f" width="450" />
      </div>
    </td>
    <td align="center" style="padding: 10px;">
      <div>
        <img src="https://github.com/user-attachments/assets/bf059b73-faf2-49c7-9259-899f636ee15c" width="450" />
      </div>
    </td>
  </tr>
  
 <tr>
    <td align="center" style="padding-top: 10px;">
      <em>🔎 디스코드에서 불참자를 조회합니다.</em>
    </td>
   <td align="center" style="padding-top: 10px;">
      <em>📖 구글시트에 있던 데이터값을 불러옵니다.</em>
    </td>
  </tr>
  
  <tr>
    <td colspan="2" align="center" style="padding-top: 10px;">
      <em> 특정 이벤트 + 최근 이벤트날짜의 불참자를 조회하는 기능입니다.</em>
    </td>
  </tr>
</table>

[자세한 설명 보기](https://github.com/chomi1025/Discord-ChomiBot/wiki/%EB%B6%88%EC%B0%B8%EC%9E%90-%EB%93%B1%EB%A1%9D-%EC%A1%B0%ED%9A%8C)

　
### 🐶 3. 동물사진 출력기능
![GIF 2025-06-10 오후 4-14-19](https://github.com/user-attachments/assets/273153b8-0b40-4e49-b2e9-901ab36ed407)


[!자세한 설명 보기](https://github.com/chomi1025/Discord-ChomiBot/wiki/%EC%82%AC%EC%A7%84-%EC%B6%9C%EB%A0%A5)

　
## 🛠️ 기술 스택 (Tech Stack)

이 프로젝트는 다음 기술들을 활용하여 개발되었습니다.
| 분류 | 기술 스택 |
|------|-----------|
| **언어** | JavaScript (Node.js) |
| **라이브러리** | Discord.js, Google Sheets API, Node-cron, Axios |
| **데이터베이스** | Google Sheets |
| **클라우드 & 배포** | Google Cloud Platform (GCP) • PM2 |
| **개발 도구** | Git, GitHub, VSCode |

　
## 🧪 테스트 환경
안정적인 개발과 테스트를 위해 아래와 같은 구조로 테스트 환경을 분리해 두었습니다.

#### 🎯 1. 실제 운영 채널
- 실사용 중인 본 디스코드 서버 채널입니다.
- 봇이 실제로 알림을 보내는 채널이며, 길드원들과의 소통도 이곳에서 이루어집니다.

![image](https://github.com/user-attachments/assets/da6ff4be-6eda-4853-aaed-1491e47340c0)


#### 🧪 2. 테스트 전용 채널
- 봇의 기능 개발 및 수정을 실험해볼 수 있는 전용 테스트 서버입니다. 
- 실험용 디스코드 봇이 연결되어 있어, 본 채널에 영향을 주지 않고 자유롭게 테스트할 수 있습니다.

![image](https://github.com/user-attachments/assets/9abdb175-3cfe-4d43-868d-4f0cdb0ef0d2)

>🧠 처음에는 UTC 시간 개념이 익숙지 않아 테스트가 많이 필요했지만, 이러한 구조 덕분에 실제 채널에 피해 없이 새로운 기능을 마음껏 실험할 수 있었습니다!

　
## 🚀 설치 및 실행 방법
<details><summary>보기
</summary>

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

</details>

　　
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
│ └── cat.js #고양이
│ └── dog.js #강아지
│ └── mule.js #노새
├── 📁 config #구글 시트 연동을 위한 키 파일
│ └── service-account.json
├── eventScheduler.js #이벤트 알림 기능 종합
├── Channel.js # 디스코드 채널 ID 설정
├── bot.js # 봇 실행 메인 파일
├── .env #디스코드 토큰 환경 변수
├── package.json
└── README.md
```

　
## ✨ 회고 및 앞으로의 계획
이번 프로젝트를 진행하면서 구글 시트를 데이터베이스로 활용하고, 디스코드 봇과 연동하며, 구글 클라우드를 이용해 배포하는 경험을 쌓을 수 있었습니다.
특히 함께 게임하는 친구들이 사용할 봇이라는 생각 덕분에 기획 단계에서 어려움 없이 빠르게 작업할 수 있었고, 실사용 목적의 프로젝트라 피드백도 활발하게 받아가며 즐겁게 진행했습니다.
처음에는 어렵게 느껴졌지만, 하나씩 차근차근 구현해 나가면서 많은 경험과 자신감을 얻을 수 있었습니다.
결과적으로, 이 프로젝트 덕분에 참여율이 크게 높아져 더욱 의미 있는 작업이 되었습니다.💗
