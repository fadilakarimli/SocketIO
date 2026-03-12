import { styles } from "../../styles/chatStyles";

export function TypingBubble({ typers }) {
  if (!typers.length) return null;

  const text =
    typers.length === 1
      ? `${typers[0].username} yaziyor`
      : `${typers.map((t) => t.username).join(", ")} yaziyor`;

  return (
    <div style={{ ...styles.msgRow, justifyContent: "flex-start" }}>
      <div style={styles.typingBubble}>
        <span style={styles.typingText}>{text}</span>
        {[0, 0.15, 0.3].map((delay, i) => (
          <span key={i} style={{ ...styles.typingDot, animationDelay: `${delay}s` }} />
        ))}
      </div>
    </div>
  );
}
