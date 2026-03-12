import { Avatar } from "../common/Avatar";
import { formatTime } from "../../utils/formatTime";
import { styles } from "../../styles/chatStyles";

export function Message({ msg, isSelf }) {
  return (
    <div
      style={{
        ...styles.msgRow,
        justifyContent: isSelf ? "flex-end" : "flex-start",
        animation: "msgIn 0.25s ease",
      }}
    >
      {!isSelf && <Avatar name={msg.username} color={msg.color} size={32} />}
      <div
        style={{
          maxWidth: "68%",
          display: "flex",
          flexDirection: "column",
          alignItems: isSelf ? "flex-end" : "flex-start",
        }}
      >
        {!isSelf && <span style={{ ...styles.msgName, color: msg.color }}>{msg.username}</span>}
        <div
          style={{
            ...styles.bubble,
            background: isSelf ? "#7C3AED" : "#1e1e2e",
            borderRadius: isSelf ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          }}
        >
          {msg.message}
        </div>
        <span style={styles.msgTime}>{formatTime(msg.timestamp)}</span>
      </div>
      {isSelf && <Avatar name={msg.username} color={msg.color} size={32} />}
    </div>
  );
}
