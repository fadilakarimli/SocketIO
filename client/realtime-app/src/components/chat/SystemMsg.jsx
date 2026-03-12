import { styles } from "../../styles/chatStyles";

export function SystemMsg({ text }) {
  return (
    <div style={styles.systemMsg}>
      <span style={styles.systemDot} />
      {text}
    </div>
  );
}
