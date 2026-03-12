import { useEffect, useRef } from "react";
import { Message } from "./Message";
import { Sidebar } from "./Sidebar";
import { SystemMsg } from "./SystemMsg";
import { TypingBubble } from "./TypingBubble";
import { styles } from "../../styles/chatStyles";
import "../../styles/mobile.css";

export function ChatRoom({
  room,
  users,
  myName,
  messages,
  typers,
  input,
  connected,
  connError,
  sidebarOpen,
  onToggleSidebar,
  onCloseSidebarMobile,
  onLeave,
  onInput,
  onSend,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typers]);

  return (
    <div style={styles.appWrap}>
      {/* Mobile overlay */}
      <div 
        className={`mobile-overlay ${sidebarOpen ? 'mobile-overlay-visible' : ''}`}
        onClick={onCloseSidebarMobile}
      />
      
      <button className="chat-menu-btn" style={styles.menuBtn} onClick={onToggleSidebar}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="#aaa">
          <rect y="3" width="20" height="2" rx="1" />
          <rect y="9" width="14" height="2" rx="1" />
          <rect y="15" width="17" height="2" rx="1" />
        </svg>
      </button>

      <Sidebar 
        room={room} 
        users={users} 
        onLeave={onLeave} 
        sidebarOpen={sidebarOpen} 
      />

      <div className="chat-area" style={styles.chatArea} onClick={onCloseSidebarMobile}>
        <div className="chat-header" style={styles.chatHeader}>
          <div style={styles.headerLeft}>
            <span style={styles.headerHash}>#</span>
            <span className="header-room" style={styles.headerRoom}>{room}</span>
            <span
              style={{
                ...styles.connDot,
                background: connected ? "#6BCB77" : "#FF6B6B",
              }}
            />
            <span style={styles.connLabel}>{connected ? "Bagli" : "Baglanti Kesildi"}</span>
          </div>
          <span style={styles.headerCount}>{Object.keys(users).length} kisi</span>
        </div>

        {connError && <div style={styles.connErrorBar}>{connError}</div>}

        <div className="msg-list" style={styles.msgList}>
          {messages.length === 0 && (
            <div style={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="#3a3a52" strokeWidth="2" />
                <path d="M14 20h20v2H14zM14 26h12v2H14z" fill="#3a3a52" />
              </svg>
              <p style={styles.emptyText}>Henuz mesaj yok. Ilk mesaji sen gonder!</p>
            </div>
          )}

          {messages.map((m) =>
            m.type === "system" ? (
              <SystemMsg key={m.id} text={m.text} />
            ) : (
              <Message key={m.id} msg={m} isSelf={m.username === myName} />
            )
          )}

          <TypingBubble typers={typers} />
          <div ref={bottomRef} />
        </div>

        <form onSubmit={onSend} className="input-bar" style={styles.inputBar}>
          <input
            className="chat-input"
            style={styles.chatInput}
            value={input}
            onChange={onInput}
            placeholder={`#${room} odasina mesaj gonder...`}
            maxLength={800}
            autoFocus
          />
          <button
            type="submit"
            style={{ ...styles.sendBtn, opacity: input.trim() ? 1 : 0.4 }}
            disabled={!input.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
