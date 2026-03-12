import { Avatar } from "../common/Avatar";
import { styles } from "../../styles/chatStyles";

export function Sidebar({ room, users, onLeave, sidebarOpen }) {
  const entries = Object.entries(users);

  return (
    <div
      style={{
        ...styles.sidebar,
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
      }}
    >
      <div style={styles.sidebarHeader}>
        <div style={styles.sidebarLogo}>
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#7C3AED" />
            <path d="M10 14h20v2H10zM10 19h14v2H10zM10 24h16v2H10z" fill="#fff" />
          </svg>
          NexChat
        </div>
      </div>

      <div style={styles.roomBadge}>
        <span style={styles.roomHash}>#</span>
        <span style={styles.roomName}>{room}</span>
      </div>

      <div style={styles.sectionLabel}>Cevrimici - {entries.length}</div>

      <div style={styles.userList}>
        {entries.map(([name, color]) => (
          <div key={name} style={{ ...styles.userItem, animation: "slideIn 0.3s ease" }}>
            <div style={{ position: "relative" }}>
              <Avatar name={name} color={color} size={34} />
              <span style={styles.onlineDot} />
            </div>
            <span style={{ ...styles.userName, color }}>{name}</span>
          </div>
        ))}
      </div>

      <button onClick={onLeave} style={styles.leaveBtn}>
        Odadan Cik
      </button>
    </div>
  );
}
