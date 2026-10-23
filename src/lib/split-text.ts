/** Split element text into word/char spans wrapped in line masks for staggered reveals. */
export function splitToWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  const words = text.split(/(\s+)/);
  el.textContent = "";
  const out: HTMLElement[] = [];
  words.forEach((w) => {
    if (/^\s+$/.test(w)) {
      el.appendChild(document.createTextNode(" "));
      return;
    }
    const mask = document.createElement("span");
    mask.style.display = "inline-block";
    mask.style.overflow = "hidden";
    mask.style.verticalAlign = "top";
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = w;
    mask.appendChild(inner);
    el.appendChild(mask);
    out.push(inner);
  });
  return out;
}

export function splitToChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";
  const out: HTMLElement[] = [];
  for (const ch of text) {
    const mask = document.createElement("span");
    mask.style.display = "inline-block";
    mask.style.overflow = "hidden";
    mask.style.verticalAlign = "top";
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = ch;
    if (ch === " ") inner.style.width = "0.28em";
    mask.appendChild(inner);
    el.appendChild(mask);
    out.push(inner);
  }
  return out;
}
