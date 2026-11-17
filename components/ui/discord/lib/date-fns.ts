// Adapted from Would-You-Bot/discord-components: always renders the time of
// day only. The upstream version compares against `new Date()` to show
// "Yesterday"/full dates, which makes the output depend on when the page was
// rendered and breaks static prerendering.
export function formatDate(date: Date, use24Hour = false): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? " PM" : " AM";

  if (!use24Hour) {
    hours %= 12;
    hours = hours ? hours : 12;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}${
    use24Hour ? "" : ampm
  }`;
}
