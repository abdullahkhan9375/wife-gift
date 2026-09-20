const { memories, letter, opening, closing, audio } = window.giftContent;
const image = document.querySelector("#memory-image");
const placeholder = document.querySelector("#photo-placeholder");
const photoIndex = document.querySelector("#photo-index");
const title = document.querySelector("#memory-title");
const description = document.querySelector("#memory-description");
const dots = document.querySelector("#carousel-dots");
const envelope = document.querySelector("#envelope");
const paper = document.querySelector("#letter-paper");
let activeIndex = 0;
let imageRequest = 0;

function showMemory(index) {
  activeIndex = (index + memories.length) % memories.length;
  const memory = memories[activeIndex];
  const request = ++imageRequest;

  image.hidden = true;
  placeholder.hidden = false;
  image.alt = memory.alt || memory.title;

  const preloadedImage = new Image();
  preloadedImage.onload = () => {
    if (request !== imageRequest) return;
    image.src = memory.image;
    image.hidden = false;
    placeholder.hidden = true;
  };
  preloadedImage.src = memory.image;

  title.textContent = memory.title;
  description.textContent = memory.description;
  description.hidden = !memory.description;
  photoIndex.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;
  [...dots.children].forEach((dot, dotIndex) => {
    dot.setAttribute("aria-current", String(dotIndex === activeIndex));
  });
}

memories.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "carousel__dot";
  dot.setAttribute("aria-label", `Show photograph ${index + 1}`);
  dot.addEventListener("click", () => showMemory(index));
  dots.append(dot);
});

document.querySelector("#previous").addEventListener("click", () => showMemory(activeIndex - 1));
document.querySelector("#next").addEventListener("click", () => showMemory(activeIndex + 1));

document.querySelector(".carousel").addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showMemory(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});

let touchStartX = null;
document.querySelector(".photo-card").addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });
document.querySelector(".photo-card").addEventListener("touchend", (event) => {
  if (touchStartX === null) return;
  const distance = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(distance) > 45) showMemory(activeIndex + (distance < 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });

const letterBody = document.querySelector("#letter-body");
document.querySelector("#letter-opening").textContent = opening;
document.querySelector("#letter-closing").textContent = closing;
letter.forEach((paragraph) => {
  const element = document.createElement("p");
  element.textContent = paragraph;
  letterBody.append(element);
});

envelope.addEventListener("click", () => {
  const isOpen = envelope.getAttribute("aria-expanded") === "true";
  envelope.setAttribute("aria-expanded", String(!isOpen));
  envelope.setAttribute("aria-label", isOpen ? "Open your letter" : "Close your letter");
  paper.hidden = isOpen;
  document.querySelector("#envelope-instruction").textContent = isOpen ? "TAP THE ENVELOPE TO OPEN" : "TAP THE ENVELOPE TO CLOSE";
});

showMemory(0);

const music = document.querySelector("#background-music");
const musicToggle = document.querySelector("#music-toggle");

function updateMusicToggle() {
  const audible = !music.paused && !music.muted;
  const label = music.paused
    ? "Play background music"
    : audible ? "Mute background music" : "Unmute background music";
  musicToggle.dataset.state = audible ? "playing" : "muted";
  musicToggle.setAttribute("aria-label", label);
  musicToggle.title = label;
}

if (audio) {
  music.src = audio;
  music.volume = 0.35;
  music.addEventListener("canplay", () => {
    musicToggle.hidden = false;
    updateMusicToggle();
    music.play().catch(() => {
      // Browsers commonly wait for a tap before allowing sound.
      updateMusicToggle();
    });
  }, { once: true });
  music.addEventListener("error", () => { musicToggle.hidden = true; });
  music.addEventListener("play", updateMusicToggle);
  music.addEventListener("pause", updateMusicToggle);
  music.addEventListener("volumechange", updateMusicToggle);
  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      music.muted = false;
      try {
        await music.play();
      } catch {
        updateMusicToggle();
      }
    } else {
      music.muted = !music.muted;
    }
    updateMusicToggle();
  });
  music.load();
}
