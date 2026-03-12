import { useCallback, useEffect, useRef, useState } from "react";
import { socket, SERVER_URL } from "../config/socket";

export function useChatSocket() {
  const [joined, setJoined] = useState(false);
  const [myName, setMyName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});
  const [input, setInput] = useState("");
  const [typers, setTypers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [connected, setConnected] = useState(false);
  const [connError, setConnError] = useState("");

  const typingTimer = useRef(null);
  const isTypingRef = useRef(false);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
      setConnError("");
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("connect_error", (error) => {
      setConnected(false);
      setConnError(error?.message || `Servere baglanmaq olmadi (${SERVER_URL})`);
    });

    socket.on("room_ready", ({ room: rm, users: u, history }) => {
      setRoom(rm);
      setUsers(u);
      setMessages(history.map((m) => ({ ...m, type: "msg" })));
      setJoined(true);
    });

    socket.on("user_joined", ({ username, users: u, timestamp }) => {
      setUsers(u);
      setMessages((prev) => [
        ...prev,
        { id: `sys-${timestamp}`, type: "system", text: `${username} odaya katildi` },
      ]);
    });

    socket.on("user_left", ({ username, users: u, timestamp }) => {
      setUsers(u);
      setMessages((prev) => [
        ...prev,
        { id: `sys-${timestamp}`, type: "system", text: `${username} odadan ayrildi` },
      ]);
    });

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, { ...msg, type: "msg" }]);
    });

    socket.on("typing_update", ({ username, color, isTyping }) => {
      setTypers((prev) => {
        const filtered = prev.filter((t) => t.username !== username);
        return isTyping ? [...filtered, { username, color }] : filtered;
      });
    });

    return () => socket.removeAllListeners();
  }, []);

  const handleJoin = useCallback((username, rm) => {
    setMyName(username);
    socket.connect();
    socket.emit("join_room", { username, room: rm });
  }, []);

  const handleLeave = useCallback(() => {
    socket.disconnect();
    setJoined(false);
    setMessages([]);
    setUsers({});
    setTypers([]);
    setInput("");
    setSidebarOpen(true);
    setConnError("");
  }, []);

  const sendTyping = useCallback((active) => {
    if (isTypingRef.current === active) return;
    isTypingRef.current = active;
    socket.emit("typing", active);
  }, []);

  const handleInput = useCallback(
    (e) => {
      setInput(e.target.value);
      sendTyping(true);
      clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => sendTyping(false), 1500);
    },
    [sendTyping]
  );

  const handleSend = useCallback(
    (e) => {
      e.preventDefault();
      if (!input.trim()) return;
      socket.emit("send_message", { message: input });
      setInput("");
      sendTyping(false);
      clearTimeout(typingTimer.current);
    },
    [input, sendTyping]
  );

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((open) => !open);
  }, []);

  const closeSidebarMobile = useCallback(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, []);

  return {
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
  };
}
