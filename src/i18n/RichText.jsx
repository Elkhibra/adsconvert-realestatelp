/* Renders "**bold**" segments in a translation string as <strong>. */
export default function RichText({ text }) {
  const parts = text.split("**");
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
  );
}
