export function normalizeDurableText(value) {
  return String(value ?? "").replace(/[ \t]+(?=\r?$)/gm, "");
}

export function boundedDurableOutput(value, size = 8000) {
  const bounded = String(value ?? "")
    .replaceAll(/\x1b\[[0-9;]*m/g, "")
    .slice(0, size);
  return normalizeDurableText(bounded);
}

export function trailingWhitespaceLines(value) {
  return String(value ?? "")
    .split(/\r?\n/)
    .flatMap((line, index) => (/[ \t]+$/.test(line) ? [index + 1] : []));
}

export function adoptedTrialIds(value) {
  const adopted = new Set();
  for (const section of String(value ?? "")
    .split(/^## Finding /m)
    .slice(1)) {
    if (!/^- Disposition: ADOPTED$/m.test(section)) continue;
    const affected = /^- Affected Trials: (.+)$/m.exec(section)?.[1] ?? "";
    for (const match of affected.matchAll(/`([^`]+)`/g)) adopted.add(match[1]);
  }
  return adopted;
}
