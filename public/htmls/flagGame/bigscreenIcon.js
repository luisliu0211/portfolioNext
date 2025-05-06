let p1Icon = './img/Mayortaoyuan.svg';
let p1Congrats = '市長祝大家國泰民安';
let p1Name = '張善政';
let p2Icon = './img/taishan.svg';
let p2Congrats = '泰山祝大家事事平安順心';
let p2Name = '張泰山';
// // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// 抓取取使用者暱稱＆選取的人物
let user = {
  name: p1Name,
  figureNo: p1Icon,
  congrats: p1Congrats,
  ifOnline: true,
  ifFinished: false,
  gameTime: 0,
};

let currentRank;
// 连接本地服务器
// const socket = new WebSocket('ws://localhost:8081');
const socket = new WebSocket('wss://pkgameserver.zeabur.app/'); // 原来的生产环境连接
const audio = document.createElement('audio');
const audioAnthemloop = document.createElement('audio');
audioAnthemloop.src = './img/nationsongv2.mp3';
const clapping = document.createElement('audio');
clapping.src = './img/clapping.mp3';
const ScoreAudioSrc = './img/clickEffect.mp3';
ScoreAudioSrc.volume = 0.6;
// 創建 AudioContext 實例
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
let audioBuffer; // 缓存已解码的音频缓冲区
let audioSource; // 缓存音频源节点
let loadingAnimate = document.querySelector('.loading');
let progressBar = document.querySelector('.progress-bar');
let characterBox = document.querySelector('#infoModal');
let alertBox = document.querySelector('#alertModal');
let chooseBtn = document.querySelector('.chooseBtn');
let myFile = document.querySelector('.myFile');
let confirmBtn = document.querySelector('.confirmBtn');
let inputNickname = document.querySelector('.nicknameInput');
let congratTitle = document.querySelector('.congratInput');
let titleBox = document.querySelector('.titleBox');
let flagScene = document.querySelector('.flagScene');
let bar = document.querySelector('.bar');
let flag = document.querySelector('.flag');
let pole = document.querySelector('.pole');
let poly = document.querySelector('.poly');
let musicState = false;
let startMusic = document.querySelector('.startMusic');
let musicMute = document.querySelector('.soundMuteBox');
let musicPause = document.querySelector('.soundPauseBox');
let finalBox = document.querySelector('.finalBox');
let gradeBox = document.querySelector('.gradeBox');
let nowList = document.querySelector('.nowList');
let nowListText = document.querySelector('.nightText');
let timeText = document.querySelector('.timeText');
let timeLeft = document.querySelector('.leftTime');
let nowListUL = document.querySelector('.nowList>ul');
let nowState = document.querySelector('.currentOnline');
let airplain1 = document.querySelector('.airplane1');
let alertBox1 = document.querySelector('.alertBox1');
let alertBox2 = document.querySelector('.alertBox2');
let boxG = document.querySelectorAll('.boxG');
let hintText = document.querySelector('.hintText');
let btnleft = document.querySelector('.btnleft');
let btnright = document.querySelector('.btnright');
let finishedText = document.querySelector('.finishedText');
let ranking = document.querySelector('.ranking');
let replay = document.querySelector('.replay');
let crowded = document.querySelector('.crowded');
let screenshot = document.querySelector('.screensALBUMBox');
let outsoucreLink = document.querySelector('.outsoucreLink');
let pkModeW = document.querySelector('.pkModeWin');
let pkModeL = document.querySelector('.pkModeLoose');
let p1Img = document.querySelector('.p1');
p1Img.src = p1Icon;
let p2Img = document.querySelector('.p2');
p2Img.src = p2Icon;
fetch(ScoreAudioSrc)
  .then((response) => response.arrayBuffer())
  .then((arrayBuffer) => {
    audioCtx.decodeAudioData(
      arrayBuffer,
      function (buffer) {
        audioBuffer = buffer; // 缓存解码后的音频缓冲区
        // playAudio(buffer);
      },
      function (e) {
        console.log('發生錯誤：' + e.err);
      }
    );
  });
flagScene.classList.add('active');
myFile.setAttribute('data-name', user.name);
myFile.setAttribute('data-icon', user.figureNo);
myFile.setAttribute('data-courage', user.congrats);
myFile.style.backgroundImage = `url("${user.figureNo}")`;
// let rankingIndex;
timeLeft.innerText = 40;

// flagscene 動畫跑完 奏樂按鈕浮出
flagScene.addEventListener('animationend', () => {
  if (!ifLoginOrder) {
    playNationalAnthem();
  } else {
    audioAnthemloop.muted = true;
  }
});

function increaseProgress() {
  let width = 0;
  const increment = 1; // 每次增加的宽度
  const interval = 10; // 逐渐增加的间隔时间（毫秒）

  const progressInterval = setInterval(() => {
    width += increment; // 增加进度
    progressBar.style.width = `${width}%`;

    if (width >= 100) {
      // 进度达到100%，停止逐渐增加
      clearInterval(progressInterval);
      setTimeout(() => {
        // 隐藏进度条并执行动画
        progressBar.style.display = 'none';
        loadingAnimate.classList.add('close');
        // 一進網頁顯示dialog
        characterBox.showModal();
        document.body.addEventListener('keydown', forcetoReload, false);
        document.body.addEventListener('keydown', keydownChoose, false);
        document.body.addEventListener('keydown', confirmChoose, false);
      }, 1000);
      setTimeout(() => {
        loadingAnimate.style.display = 'none';
      }, 1000);
    }
  }, interval);
}

document.addEventListener('readystatechange', function () {
  if (document.readyState === 'loading') {
    // 页面资源加载中，显示进度条
    progressBar.style.width = '0%';
    progressBar.style.display = 'block';
  } else if (document.readyState === 'interactive') {
    // 可交互状态，大部分 DOM 加载完成
  } else if (document.readyState === 'complete') {
    // 所有资源加载完成
    progressBar.style.width = '100%';
  }
});
// 等待所有资源加载完成
window.onload = function () {
  // 页面资源加载完后开始逐渐增加进度
  progressBar.style.width = '0%';
  progressBar.style.display = 'block';
  increaseProgress();
};

//建立音樂
//目標高度
let movingDist = 145;
let finalPoleHeight;
audio.src = './img/flagsongv3.mp3';
audio.preload = 'true';
let ifCount = false;
// let flagHeight = 40;
// 播放國旗歌音樂
function keydownPlay(e) {
  // 方向鍵開始遊戲32
  if (e.keyCode === 38) {
    playAudio();
    socket.send(
      JSON.stringify({
        type: 'startPlay',
        data: user,
      })
    );
  }
}
function keydownReplay(e) {
  if (e.keyCode === 40) {
    user.ifFinished = false;
    user.gameTime = 0;
    socket.send(
      JSON.stringify({
        type: 'replay',
        data: user,
      })
    );
  }
}
function replayAction() {
  currentRank = null;
  myFile.classList.remove('active');
  myFile.style.display = 'block';
  canvas.style.opacity = 0;
  flag.style.opacity = 0;
  flag.style.display = 'block';
  flag.style.transform = `translateY(-145px)`;
  startMusic.style.display = 'flex';
  finalBox.style.transform = 'scale(0)';
  btnleft.style.display = 'block';
  btnright.style.display = 'block';
  movingDist = 145;
  // gradeBox.innerHTML='';
  crowded.classList.remove('end');
  poly.setAttribute('src', './img/flagpole01v2.png');
  myFile.classList.remove('removeDialog');
  myFile.style.bottom = '5%';
  myFile.setAttribute('data-courage', '努力突破成績！');
  timeLeft.innerText = 40;
  document.body.removeEventListener('keydown', keydownReplay, false);
  document.body.addEventListener('keydown', keydownPlay, false);
}
let keyCombo = [];
function playAudio() {
  document.body.removeEventListener('keydown', keydownPlay, false);
  audio.play();
  audio.muted = false;
  loop();
  audio.currentTime = 0;
  audio.volume = 1;
  audioAnthemloop.pause();
  finalBox.style.transform = 'scale(0)';
  startMusic.style.display = 'none';
  myFile.classList.add('active');
  flag.classList.add('active');
  flag.style.opacity = 0;
  myFile.classList.add('play');
  myFile.style.display = 'block';
  finalPoleHeight = pole.clientHeight - 10;
  myFile.setAttribute('data-courage', '鍵盤方向鍵快速左右按↔！');
  document.body.addEventListener('keydown', goRocket, false);
  audio.addEventListener('play', setTime, true);
  audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    timeLeft.innerText = 40 - Math.trunc(currentTime);
    const progress = (currentTime / duration) * 100;
    //歌曲播放的動作樣式
    if (movingDist >= finalPoleHeight && progress !== 100) {
      socket.send(
        JSON.stringify({
          type: 'ranking',
          data: user,
        })
      );

      clapping.play();
      audio.pause();
      document.body.addEventListener('keydown', keydownReplay, false);
      document.body.removeEventListener('keydown', goRocket, false);
      audio.removeEventListener('play', setTime, true);
      myFile.setAttribute('data-courage', '善哥幫一把！');
      finishedText.innerHTML = `恭喜完成遊戲</br>您花了${
        Math.round((currentTime + Number.EPSILON) * 100) / 100
      }秒`;
      user.gameTime = Math.round((currentTime + Number.EPSILON) * 100) / 100;
      user.ifFinished = true;
      crowded.classList.add('end');
      btnleft.style.display = 'none';
      btnright.style.display = 'none';
      myFile.style.bottom = '-20%';
      setTimeout(() => {
        finalBox.classList.add('finished');
        finalBox.style.transform = 'scale(1.5)';
      }, 2500);
      flag.style.transform = `translateY(${-(pole.clientHeight - 10)}px)`;
      pole.style.transform = 'translateX(calc(-50vw + 35px))';
      poly.setAttribute('src', './img/flagpole03-mv2.webp');
      setTimeout(() => {
        myFile.classList.add('removeDialog');
      }, 500);
    }
    // 歌曲播放的畫面樣式
    if (progress < 1) {
      flag.style.opacity = 0;
    } else if (progress > 0 && progress <= 10) {
      flag.style.opacity = 1;
    } else if (progress > 10 && progress < 100) {
      let backgroundOpacity = progress * 0.01;
      nowListText.style.color = 'white';
      timeText.style.color = 'white';
      backgroundOpacity > 0.7
        ? (canvas.style.opacity = 0.7)
        : (canvas.style.opacity = progress * 0.01);
    } else {
      document.body.addEventListener('keydown', keydownReplay, false);
      document.body.removeEventListener('keydown', goRocket, false);
      audio.removeEventListener('play', setTime, true);
      myFile.setAttribute('data-courage', '善哥幫一把！');
      finishedText.innerHTML = `時間到遊戲結束！</br>下次再接再厲！`;
      crowded.classList.add('end');
      btnleft.style.display = 'none';
      btnright.style.display = 'none';
      finalBox.classList.add('finished');
      finalBox.style.transform = 'scale(1.5)';
      clapping.play();
      myFile.style.bottom = '-20%';
      flag.style.transform = `translateY(${-(pole.clientHeight - 50)}px)`;
      pole.style.transform = 'translateX(calc(-50vw + 35px))';
      poly.setAttribute('src', './img/flagpole03-mv2.webp');
      setTimeout(() => {
        myFile.classList.add('removeDialog');
      }, 500);
      user.ifFinished = true;
      user.gameTime = 40.0;
      socket.send(
        JSON.stringify({
          type: 'userDetail',
          data: user,
        })
      );
    }
  });
}
function setTime() {
  for (let i = 1; i <= 40; i++) {
    setTimeout(() => {
      if (ifCount) {
        ifCount = false;

        myFile.setAttribute('data-courage', '鍵盤方向鍵快速左右按↔！');

        if (
          movingDist / finalPoleHeight >= 0.5 &&
          movingDist / finalPoleHeight < 0.75
        ) {
          myFile.setAttribute('data-courage', '還差一些 加油加油');
        } else if (
          movingDist / finalPoleHeight >= 0.75 &&
          movingDist / finalPoleHeight < 0.9
        ) {
          myFile.setAttribute('data-courage', '快結束了 再撐一下');
        } else if (
          movingDist / finalPoleHeight >= 0.9 &&
          movingDist / finalPoleHeight < 1
        ) {
          myFile.setAttribute('data-courage', '終點就在你眼前');
        } else if (movingDist / finalPoleHeight >= 1) {
          myFile.setAttribute('data-courage', '恭喜完成！');
        }
      } else {
        myFile.setAttribute('data-courage', '你累了嗎？讓善哥來');
      }
    }, i * 1000);
  }
}
// 自動播放國歌背景
function playNationalAnthem() {
  audioAnthemloop.play();
  audioAnthemloop.volume = 0.7;
  audioAnthemloop.muted = false;
  audioAnthemloop.loop = true;
}
function playClapping() {
  clapping.play();
  clapping.volume = 0.7;
  playNationalAnthem();
  myFile.style.bottom = '-20%';
}
// firework effect 煙火特效
const PI2 = Math.PI * 3;
const random = (min, max) => (Math.random() * (max - min + 1) + min) | 0;
let timestamp = (_) => new Date().getTime();
// container
class Birthday {
  constructor() {
    this.resize();
    // create a lovely place to store the firework
    this.fireworks = [];
    this.counter = 0;
  }
  resize() {
    this.width = canvas.width = window.innerWidth;
    let center = (this.width / 2) | 0;
    this.spawnA = (center - center / 4) | 0;
    this.spawnB = (center + center / 4) | 0;

    this.height = canvas.height = window.innerHeight;
    this.spawnC = this.height * 0.1;
    this.spawnD = this.height * 0.3;
  }

  // onClick(evt) {
  //   let x = evt.clientX || (evt.touches && evt.touches[0].pageX);
  //   let y = evt.clientY || (evt.touches && evt.touches[0].pageY);

  //   let count = random(5, 9);
  //   for (let i = 0; i < count; i++)
  //     this.fireworks.push(
  //       new Firework(
  //         random(this.spawnA, this.spawnB),
  //         this.height,
  //         x,
  //         y,
  //         random(0, 260),
  //         random(30, 110)
  //       )
  //     );

  //   this.counter = -1;
  // }

  update(delta) {
    ctx.globalCompositeOperation = 'hard-light';
    ctx.fillStyle = `rgba(0,0,0,1)`;
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.globalCompositeOperation = 'lighter';
    for (let firework of this.fireworks) firework.update(delta);

    // if enough time passed... create new new firework
    if (window.innerWidth > 576) {
      this.counter += delta * 20; // each second
    } else {
      this.counter += delta * 5; // each second
    }

    if (this.counter >= 1) {
      this.fireworks.push(
        new Firework(
          random(this.spawnA, this.spawnB),
          this.height,
          random(0, this.width),
          random(this.spawnC, this.spawnD),
          random(0, 500),
          random(30, 250)
        )
      );
      this.counter = 0;
    }

    // remove the dead fireworks
    if (this.fireworks.length > 1000)
      this.fireworks = this.fireworks.filter((firework) => !firework.dead);
  }
}
class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings) {
    this.dead = false;
    this.offsprings = offsprings;

    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;

    this.shade = shade;
    this.history = [];
  }
  update(delta) {
    if (this.dead) return;

    let xDiff = this.targetX - this.x;
    let yDiff = this.targetY - this.y;
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
      // is still moving
      this.x += xDiff * 2 * delta;
      this.y += yDiff * 2 * delta;

      this.history.push({
        x: this.x,
        y: this.y,
      });

      if (this.history.length > 20) this.history.shift();
    } else {
      if (this.offsprings && !this.madeChilds) {
        let babies = this.offsprings / 2;
        for (let i = 0; i < babies; i++) {
          let targetX =
            (this.x + this.offsprings * Math.cos((PI2 * i) / babies)) | 0;
          let targetY =
            (this.y + this.offsprings * Math.sin((PI2 * i) / babies)) | 0;

          birthday.fireworks.push(
            new Firework(this.x, this.y, targetX, targetY, this.shade, 0)
          );
        }
      }
      this.madeChilds = true;
      this.history.shift();
    }

    if (this.history.length === 0) this.dead = true;
    else if (this.offsprings) {
      for (let i = 0; this.history.length > i; i++) {
        let point = this.history[i];
        ctx.beginPath();
        ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)';

        ctx.arc(point.x, point.y, 2.5, 0, PI2, false);
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)';
      ctx.arc(this.x, this.y, 2.5, 0, PI2, false);
      ctx.fill();
    }
  }
}
let canvas = document.getElementById('firework');
let ctx = canvas.getContext('2d');
let then = timestamp();
let birthday = new Birthday();
// window.onresize = () => birthday.resize();
// document.onclick = (evt) => birthday.onClick(evt);
// document.ontouchstart = (evt) => birthday.onClick(evt);
function loop() {
  requestAnimationFrame(loop);
  let now = timestamp();
  let delta = now - then;
  then = now;
  birthday.update(delta / 1000);
}
// websocket
socket.addEventListener('open', (event) => {});
let alreadyChoose;
let dataNw;
let ifLoginOrder;
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  // console.log(data, '伺服器來的資料');
  if (data.type === 'loadingState') {
    if (data.number == 2) {
      ifLoginOrder = data.number;
    }
  }
  if (data.type === 'ranking') {
    handleRankingUpdate(data.data);
    audioAnthemloop.play();
  }
  if (data.type === 'chooseIcon') {
    alreadyChoose = data.icon;
    nowListUL.innerHTML = '';
    if (data.icon == p1Icon) {
      player1.style.backgroundColor = 'rgba(0,0,0,0.5)';
      player2.classList.add('taken');
      player2.classList.add('ready');
      player1.classList.remove('taken');
      dataNw.forEach((item) => {
        const li = document.createElement('li');
        if (item.user_name == data.whouse && !data.ifContinue) {
          li.classList.add('active');
          li.innerHTML = `<div class='name'><span class='nickname'>${item.user_name}</span><span class='congratsText'>${item.congrats}</span><span class='grade'>已準備</span></div>`;
        } else {
          li.innerHTML = `<div class='name'><span class='nickname'>${item.user_name}</span><span class='congratsText'>${item.congrats}</span><span class='grade'>確認中</span></div>`;
        }
        nowListUL.appendChild(li);
      });
    }
    if (data.icon == p2Icon) {
      player2.style.backgroundColor = 'rgba(0,0,0,0.5)';
      player1.classList.add('taken');
      console.log('tji');
      player1.classList.add('ready');
      player2.classList.remove('taken');
      dataNw.forEach((item) => {
        const li = document.createElement('li');
        if (item.user_name == data.whouse && !data.ifContinue) {
          li.classList.add('active');
          li.innerHTML = `<div class='name'><span class='nickname'>${item.user_name}</span><span class='congratsText'>${item.congrats}</span><span class='grade'>已準備</span></div>`;
        } else {
          li.innerHTML = `<div class='name'><span class='nickname'>${item.user_name}</span><span class='congratsText'>${item.congrats}</span><span class='grade'>確認中</span></div>`;
        }
        nowListUL.appendChild(li);
      });
    }
    if (data.ifContinue) {
      nowListUL.innerHTML = '';
      dataNw.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('active');
        li.innerHTML = `<div class='name'><span class='nickname'>${item.user_name}</span><span class='congratsText'>${item.congrats}</span><span class='grade'>已準備</span></div>`;
        nowListUL.appendChild(li);
      });
      if (user.name == data.whouse) {
        confirmAction();
        clickEffect();
      } else {
        confirmAction();
      }
    }
  }
  if (data.type === 'userDetail') {
    nowListUL.innerHTML = '';
    let filterDataGmer = data.data;
    //將資料庫裡面的資料列出來
    dataNw = filterDataGmer;
    let ifNooneFinished = filterDataGmer.filter((i) => {
      return i.game_time >= 40;
    });
    if (ifNooneFinished.length == 2) {
      ifNooneFinished[0].user_id == 1 ? audioAnthemloop.play() : '';
    }
    filterDataGmer.forEach((item) => {
      // 資料放入左上方列表
      let finishedPerson = data.length;
      nowListUL.setAttribute('data-number', finishedPerson);
      const li = document.createElement('li');
      if (item.ifFinished) {
        li.classList.add('active');
      }
      if (item.game_time == 0.0) {
        li.innerHTML = `<div class='name'><span class='nickname'>${item.user_name}</span><span class='congratsText'>${item.congrats}</span><span class='grade'>進行中</span></div>`;
      } else {
        li.innerHTML = `<div class='name'><span class='nickname'>${item.user_name}</span><span class='congratsText'>${item.congrats}</span><span class='grade'>時間:${item.game_time}s</span></div>`;
      }
      nowListUL.appendChild(li);
    });
    //抓取排名
    // filterDataGmer.sort((a, b) => a.game_time - b.gameTime);
    // rankingIndex = filterDataGmer.findIndex((i) => i.user_name === user.name);
    let currentOnline = data.data.filter((item) => {
      return item.ifOnline === 1;
    });
    let currentNumber = currentOnline.length;
    //TODO:設定上線人數
    nowState.innerText = currentNumber;
  }
  if (data.type === 'replay') {
    currentRank = null;
    if (data.ifContinue) {
      // console.log('全部人可以重新開始');
      if (user.name == data.whoRequest) {
        replayAction();
        clickEffect();
      } else {
        replayAction();
      }
    }
  }
  if (data.type === 'startPlay') {
    playAudio();
    nowListUL.innerHTML = '';
    dataNw.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('active');
      li.innerHTML = `<div class='name'><span class='nickname'>${item.user_name}</span><span class='congratsText'>${item.congrats}</span><span class='grade'>進行中</span></div>`;
      nowListUL.appendChild(li);
    });
    if (user.name == data.whoRequest) {
      audio.muted = false;
      clickEffect();
    } else {
      audio.muted = true;
    }
  }
  if (data.type === 'forcetoReload') {
    location.reload();
  }
});
socket.addEventListener('close', (event) => {
  console.log('Disconnected from server:', event);
});
// 監聽瀏覽器視窗關閉事件，以確保在視窗關閉時關閉 WebSocket 連接
window.addEventListener('beforeunload', () => {
  socket.close();
});

function clickEffect() {
  if (audioBuffer) {
    playClick(audioBuffer);
  }
}
// 播放音频的函数
function playClick(buffer) {
  // 如果音频源节点已存在，停止并重新开始播放
  if (audioSource) {
    audioSource.stop();
  }
  audioSource = audioCtx.createBufferSource();
  const gainNode = audioCtx.createGain();
  audioSource.buffer = buffer;
  gainNode.gain.value = 0.4; // 音量设置为 0.4（0.5 是半音量）
  audioSource.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  audioSource.start();
}
let player1 = document.querySelector('.player1');
let player2 = document.querySelector('.player2');
function confirmChoose(e) {
  if (e.keyCode === 40) {
    clickEffect();
    socket.send(
      JSON.stringify({
        type: 'chooseIcon',
        data: user,
        ifReady: true,
      })
    );
    if (alreadyChoose) {
      if (user.figureNo === alreadyChoose) {
        confirmBtn.setAttribute('data-alert', '不得重複選角');
      } else {
        document.body.removeEventListener('keydown', confirmChoose, false);
        document.body.removeEventListener('keydown', keydownChoose, false);
      }
    } else {
      document.body.removeEventListener('keydown', confirmChoose, false);
      document.body.removeEventListener('keydown', keydownChoose, false);
    }
  }
}
function confirmAction() {
  // clickEffect();
  document.body.removeEventListener('keydown', keydownChoose, false);
  document.body.addEventListener('keydown', keydownPlay, false);
  characterBox.close();
}
function keydownChoose(e) {
  if (e.keyCode === 37) {
    clickEffect();
    player1.classList.add('active');
    player2.classList.remove('active');
    user.name = p1Name;
    user.figureNo = p1Icon;
    user.congrats = p1Congrats;
    myFile.setAttribute('data-name', user.name);
    myFile.setAttribute('data-icon', user.figureNo);
    myFile.setAttribute('data-courage', user.congrats);
    myFile.style.backgroundImage = `url("${user.figureNo}")`;
  } else if (e.keyCode === 39) {
    clickEffect();
    player1.classList.remove('active');
    player2.classList.add('active');
    user.name = p2Name;
    user.figureNo = p2Icon;
    user.congrats = p2Congrats;
    myFile.setAttribute('data-name', user.name);
    myFile.setAttribute('data-icon', user.figureNo);
    myFile.setAttribute('data-courage', user.congrats);
    myFile.style.backgroundImage = `url("${user.figureNo}")`;
  }
}
function handleRankingUpdate(data) {
  let myRank = data.filter((i) => {
    return i.name === user.name;
  });
  if (myRank[0].rank === 1) {
    currentRank = 1;
    pkModeW.classList.add('open');
    ranking.innerText = `本次ＰＫ遊戲勝利`;
    // audioAnthemloop.play();
    setTimeout(() => {
      pkModeW.classList.remove('open');
    }, 1000);
    socket.send(
      JSON.stringify({
        type: 'userDetail',
        data: user,
      })
    );
  } else if (myRank[0].rank === 2) {
    currentRank = 2;
    audio.muted = true;
    pkModeL.classList.add('open');
    ranking.innerText = `本次ＰＫ遊戲失敗`;
    setTimeout(() => {
      pkModeL.classList.remove('open');
    }, 1500);
  }
}
let forceKeycode = [];
function forcetoReload(e) {
  if (e.keyCode == 32) {
    forceKeycode.push(e.keyCode);
  } else {
    forceKeycode = [];
  }
  if (forceKeycode.length == 3) {
    socket.send(
      JSON.stringify({
        type: 'forcetoReload',
      })
    );
    forceKeycode = [];
  }
}
function leftAndRightClick() {
  let p1 = './img/flagpole01v2.png';
  let p2 = './img/flagpole02v2.png';
  if (poly.getAttribute('src') == p1) {
    poly.setAttribute('src', p2);
  } else {
    poly.setAttribute('src', p1);
  }
  movingDist += 5;
  if (movingDist >= pole.clientHeight - 10) {
    flag.style.transform = `translateY(${-(pole.clientHeight - 10)}px)`;
  } else {
    flag.style.transform = `translateY(${-movingDist}px)`;
    if (
      movingDist / finalPoleHeight >= 0.5 &&
      movingDist / finalPoleHeight < 0.75
    ) {
      myFile.setAttribute('data-courage', '還差一些 加油加油');
    } else if (
      movingDist / finalPoleHeight >= 0.75 &&
      movingDist / finalPoleHeight < 0.9
    ) {
      myFile.setAttribute('data-courage', '快結束了 再撐一下');
    } else if (
      movingDist / finalPoleHeight >= 0.9 &&
      movingDist / finalPoleHeight < 1
    ) {
      myFile.setAttribute('data-courage', '終點就在你眼前');
    } else if (movingDist / finalPoleHeight >= 1) {
      poly.setAttribute('src', './img/flagpole03-mv2.webp');
      myFile.setAttribute('data-courage', '恭喜完成！');
      setTimeout(() => {
        myFile.classList.add('removeDialog');
      }, 300);
    }
  }
}
function goRocket(e) {
  if (e.keyCode === 37 || e.keyCode === 39) {
    clickEffect();
    ifCount = true;
    keyCombo.push(e.keyCode);
    if (keyCombo.length >= 2) {
      if (keyCombo[0] === 37 && keyCombo[1] === 39) {
        leftAndRightClick();
      }
      if (keyCombo[0] === 39 && keyCombo[1] === 37) {
        leftAndRightClick();
      }
      keyCombo = [];
    }
  }
  if (e.keyCode === 37) {
    btnleft.style.boxShadow = '0px 0px 20px white';
    btnleft.style.transform = 'scale(1.2)';
    btnleft.style.transition = '.1s linear';
    document.body.addEventListener('keyup', () => {
      btnleft.style.boxShadow = '0px 0px 20px black';
      btnleft.style.transform = 'scale(1)';
    });
  }
  if (e.keyCode === 39) {
    btnright.style.boxShadow = '0px 0px 20px white';
    btnright.style.transform = 'scale(1.2)';
    btnright.style.transition = '.1s linear';
    document.body.addEventListener('keyup', () => {
      btnright.style.boxShadow = '0px 0px 20px black';
      btnright.style.transform = 'scale(1)';
    });
  }
}
