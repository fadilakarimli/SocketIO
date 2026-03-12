export function formatTime(ts) {
  return new Date(ts).toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
