import { ChatRoom } from "./components/chat/ChatRoom";
import { JoinScreen } from "./components/chat/JoinScreen";
import { useChatSocket } from "./hooks/useChatSocket";

export default function App() {
  const {
    joined,
    myName,
    room,
    messages,
    users,
    input,
    typers,
    sidebarOpen,
    connected,
    connError,
    handleJoin,
    handleLeave,
    handleInput,
    handleSend,
    toggleSidebar,
    closeSidebarMobile,
  } = useChatSocket();

  if (!joined) {
    return <JoinScreen onJoin={handleJoin} />;
  }

  return (
    <ChatRoom
      room={room}
      users={users}
      myName={myName}
      messages={messages}
      typers={typers}
      input={input}
      connected={connected}
      connError={connError}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={toggleSidebar}
      onCloseSidebarMobile={closeSidebarMobile}
      onLeave={handleLeave}
      onInput={handleInput}
      onSend={handleSend}
    />
  );
}
