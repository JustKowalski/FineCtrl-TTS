const references = [
  { name: "Speaker 01", src: "assets/reference/speaker-01.wav" },
  { name: "Speaker 02", src: "assets/reference/speaker-02.wav" },
  { name: "Speaker 03", src: "assets/reference/speaker-03.wav" },
  { name: "Speaker 04", src: "assets/reference/speaker-04.wav" }
];

const samples = [
  {
    id: "01",
    dataset: "realworld",
    speaker: "Speaker 01",
    speed: "Moderate",
    scenario: "Customer service",
    events: ["Filled pause"],
    text: "对对对，您确认没收到短信验证码，[mn]那这块没问题的话，我马上为您触发二次发送，并同步检查通道状态。",
    instruction: "请用温和亲切的语气，专业耐心说话。请用适中的语速说一句话。"
  },
  {
    id: "02",
    dataset: "realworld",
    speaker: "Speaker 02",
    speed: "Moderate",
    scenario: "Customer service",
    events: ["Filled pause", "Breath"],
    text: "好的[mn]，感谢您的理解！[breath]如果后续有任何关于电表安装的需求，[breath]欢迎随时联系我们。祝您生活愉快，再见！",
    instruction: "请用亲切温和的语气，专业耐心说话。请用适中的语速说一句话。"
  },
  {
    id: "03",
    dataset: "realworld",
    speaker: "Speaker 02",
    speed: "Moderate",
    scenario: "Customer service",
    events: ["Emphasis", "Filled pause"],
    text: "请问是门诊楼的哪个[strong]科室呢？[mn]因为还需要明确科室信息。",
    instruction: "请用亲切温和的语气，专业耐心说话。请用适中的语速说一句话。"
  },
  {
    id: "04",
    dataset: "realworld",
    speaker: "Speaker 02",
    speed: "Fast",
    scenario: "Marketing",
    events: ["Filled pause", "Breath"],
    text: "也就是说[mn]，您主要想找一台省油、空间大、适合全家出行的车[breath]，是这个意思吧？",
    instruction: "请用温和耐心的语气，真诚沟通说话。请用尽可能快的语速说一句话。"
  },
  {
    id: "05",
    dataset: "realworld",
    speaker: "Speaker 03",
    speed: "Fast",
    scenario: "Marketing",
    events: ["Filled pause"],
    text: "好的[mn]，这样吧，您把您爱人的顾虑告诉我，我帮您针对性地准备一些解答材料。",
    instruction: "请用平和自然的语气，服务导向说话。请用尽可能快的语速说一句话。"
  },
  {
    id: "06",
    dataset: "realworld",
    speaker: "Speaker 03",
    speed: "Moderate",
    scenario: "General support",
    events: ["Filled pause"],
    text: "这玩意儿挺瓷实，[mn]就是个头儿小了点，能换个大的不？我急等着用呢。",
    instruction: "请用坦诚沟通的语气，专业耐心说话。请用适中的语速说一句话。"
  },
  {
    id: "07",
    dataset: "realworld",
    speaker: "Speaker 04",
    speed: "Fast",
    scenario: "Marketing",
    events: ["Filled pause", "Breath"],
    text: "您对比一下就知道，[mn]同样的保额我们每年保费少交将近两千块，[breath]保障范围还更广。",
    instruction: "请用自然随和的语气，亲切真诚说话。请用尽可能快的语速说一句话。"
  },
  {
    id: "08",
    dataset: "seedbench",
    speaker: "Speaker 01",
    speed: "Moderate",
    scenario: "General conversation",
    events: ["Quick breath"],
    text: "熊猫先生又把另一副眼镜递给小鼹鼠，[quick_breath]当你要去找小象玩时。",
    instruction: "请用温和亲切的语气，自然确认说话。请用适中的语速说一句话。"
  },
  {
    id: "09",
    dataset: "seedbench",
    speaker: "Speaker 02",
    speed: "Moderate",
    scenario: "General conversation",
    events: ["Laughter"],
    text: "[laughter]好的，我妻子刚给我发了一条短信让我回家呢。",
    instruction: "请用平和自然的语气，专业耐心说话。请用适中的语速说一句话。"
  },
  {
    id: "10",
    dataset: "seedbench",
    speaker: "Speaker 04",
    speed: "Moderate",
    scenario: "General conversation",
    events: ["Laughter", "Emphasis"],
    text: "尾号三五零七的乘客刚夸了你，[laughter]你就是城市的[strong]无名英雄[laughter]。",
    instruction: "请用轻松自然的语气，亲切随和说话。请用适中的语速说一句话。"
  }
];

const methods = [
  { name: "BASE", detail: "Clean text only", file: "Ordinary.wav", className: "" },
  { name: "BASE + Style Prompt", detail: "Global instruction", file: "Prompted.wav", className: "" },
  { name: "FineCtrl-TTS", detail: "Global + local control", file: "FineCtrl.wav", className: "featured" }
];

const playIcon = `
  <svg class="play-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.7v10.6c0 .8.9 1.3 1.6.9l8-5.3c.6-.4.6-1.3 0-1.7l-8-5.3C4.9 1.4 4 1.9 4 2.7Z"/></svg>
  <svg class="pause-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 2.5h3v11h-3zm6 0h3v11h-3z"/></svg>
`;

function highlightEvents(text) {
  return text.replace(/(\[(?:mn|breath|quick_breath|laughter|strong)\])/g, "<mark>$1</mark>");
}

function audioPlayer(sample, method) {
  const recommended = method.className ? '<span class="recommended">Full control</span>' : "";
  return `
    <div class="audio-player ${method.className}">
      <div class="audio-title">
        <div><strong>${method.name}</strong><small>${method.detail}</small></div>
        ${recommended}
      </div>
      <div class="player-controls">
        <button class="play-button" type="button" aria-label="Play ${method.name}, sample ${sample.id}">${playIcon}</button>
        <div class="progress-wrap">
          <input class="progress" type="range" min="0" max="100" value="0" step="0.1" aria-label="Audio progress for ${method.name}, sample ${sample.id}">
          <div class="time-row"><span class="current-time">0:00</span><span class="duration">0:00</span></div>
        </div>
      </div>
      <audio preload="metadata" src="assets/audio/${sample.id}/${method.file}"></audio>
    </div>
  `;
}

function sampleCard(sample) {
  const tags = sample.events.map(event => `<span class="event-tag">${event}</span>`).join("");
  const players = methods.map(method => audioPlayer(sample, method)).join("");
  return `
    <article class="sample-card" data-dataset="${sample.dataset}">
      <div class="sample-top">
        <span class="sample-number">${sample.id}</span>
        <div class="sample-copy">
          <div class="sample-tags">${tags}</div>
          <p class="transcript" lang="zh-CN">${highlightEvents(sample.text)}</p>
          <p class="instruction"><strong>Instruction</strong><span lang="zh-CN">${sample.instruction}</span></p>
        </div>
        <div class="sample-meta"><span>${sample.speaker}</span><span>${sample.speed}</span></div>
      </div>
      <div class="sample-audio-grid">${players}</div>
    </article>
  `;
}

function sampleGroup(dataset, title, description) {
  const cards = samples.filter(sample => sample.dataset === dataset).map(sampleCard).join("");
  return `
    <section class="sample-group" data-dataset="${dataset}">
      <div class="group-heading"><h3>${title}</h3><p>${description}</p></div>
      ${cards}
    </section>
  `;
}

function referencePlayer(reference, index) {
  const heights = [8, 17, 11, 22, 14, 7, 19, 12, 24, 9, 16, 6];
  const wave = heights.map(height => `<i style="--h:${height}px"></i>`).join("");
  return `
    <div class="reference-player">
      <button class="play-button" type="button" aria-label="Play ${reference.name} reference">${playIcon}</button>
      <div><strong>${reference.name}</strong><small>Reference voice ${String(index + 1).padStart(2, "0")}</small></div>
      <div class="mini-wave" aria-hidden="true">${wave}</div>
      <audio preload="metadata" src="${reference.src}"></audio>
    </div>
  `;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function playerFor(audio) {
  return audio.closest(".audio-player, .reference-player");
}

function buttonFor(audio) {
  return playerFor(audio)?.querySelector(".play-button");
}

function resetPlayer(audio) {
  const button = buttonFor(audio);
  const player = playerFor(audio);
  button?.classList.remove("playing");
  button?.setAttribute("aria-label", button.getAttribute("aria-label").replace(/^Pause/, "Play"));
  const progress = player?.querySelector(".progress");
  const current = player?.querySelector(".current-time");
  if (progress) {
    progress.value = 0;
    progress.style.setProperty("--progress", "0%");
  }
  if (current) current.textContent = "0:00";
}

function pauseOtherPlayers(activeAudio) {
  document.querySelectorAll("audio").forEach(audio => {
    if (audio !== activeAudio && !audio.paused) audio.pause();
  });
}

function bindAudio(audio) {
  const player = playerFor(audio);
  const button = buttonFor(audio);
  const progress = player?.querySelector(".progress");
  const current = player?.querySelector(".current-time");
  const duration = player?.querySelector(".duration");

  const updateDuration = () => {
    if (duration) duration.textContent = formatTime(audio.duration);
  };

  audio.addEventListener("loadedmetadata", updateDuration);
  if (audio.readyState >= 1) updateDuration();

  audio.addEventListener("play", () => {
    pauseOtherPlayers(audio);
    button?.classList.add("playing");
    button?.setAttribute("aria-label", button.getAttribute("aria-label").replace(/^Play/, "Pause"));
  });

  audio.addEventListener("pause", () => {
    button?.classList.remove("playing");
    button?.setAttribute("aria-label", button.getAttribute("aria-label").replace(/^Pause/, "Play"));
  });

  audio.addEventListener("timeupdate", () => {
    if (!progress || !Number.isFinite(audio.duration)) return;
    const value = audio.currentTime / audio.duration * 100;
    progress.value = value;
    progress.style.setProperty("--progress", `${value}%`);
    if (current) current.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener("ended", () => resetPlayer(audio));

  button?.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => resetPlayer(audio));
    } else {
      audio.pause();
    }
  });

  progress?.addEventListener("input", () => {
    if (!Number.isFinite(audio.duration)) return;
    audio.currentTime = Number(progress.value) / 100 * audio.duration;
  });
}

function stopAllAudio() {
  document.querySelectorAll("audio").forEach(audio => audio.pause());
}

document.getElementById("reference-grid").innerHTML = references.map(referencePlayer).join("");
document.getElementById("sample-list").innerHTML = [
  sampleGroup("realworld", "FineCustomer-RealWorld", "7 examples · customer-service scenarios"),
  sampleGroup("seedbench", "FineCustomer-SeedBench", "3 examples · open benchmark prompts")
].join("");

document.querySelectorAll("audio").forEach(bindAudio);

document.querySelectorAll(".sample-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;
    stopAllAudio();
    document.querySelectorAll(".sample-tab").forEach(button => {
      const selected = button === tab;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll(".sample-group").forEach(group => {
      group.hidden = filter !== "all" && group.dataset.dataset !== filter;
    });
    const visibleSamples = filter === "all" ? samples.length : samples.filter(sample => sample.dataset === filter).length;
    document.querySelector(".toolbar-count").textContent = String(visibleSamples * methods.length);
  });
});
