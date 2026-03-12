import { useState } from "react";
import { styles } from "../../styles/chatStyles";
import "../../styles/mobile.css";

export function JoinScreen({ onJoin }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("Genel");
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    onJoin(username.trim(), room.trim() || "Genel");
  };

  return (
    <div style={styles.joinWrap}>
      <div style={styles.joinGlow} />
      <div
        className="join-card"
        style={{
          ...styles.joinCard,
          animation: shake ? "shake 0.4s ease" : "fadeUp 0.5s ease",
        }}
      >
        <div style={styles.joinLogo}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#7C3AED" />
            <path d="M10 14h20v2H10zM10 19h14v2H10zM10 24h16v2H10z" fill="#fff" />
          </svg>
          <span style={styles.joinLogoText}>NexChat</span>
        </div>
        <p style={styles.joinSub}>Gercek zamanli sohbet platformu</p>
        <form onSubmit={handleSubmit} style={styles.joinForm}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Kullanici Adi</label>
            <input
              style={styles.input}
              placeholder="Adinizi girin..."
              value={username}
              maxLength={24}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Oda</label>
            <input
              style={styles.input}
              placeholder="Genel"
              value={room}
              maxLength={32}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>

          <button type="submit" style={styles.joinBtn}>
            Odaya Katil
          </button>
        </form>
      </div>
    </div>
  );
}
