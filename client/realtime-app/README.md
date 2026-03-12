# Realtime Chat Client

## Setup

1. Create `.env` from `.env.example`.
2. Set `VITE_SERVER_URL` to your Node server URL.
3. Install deps and run client:

```bash
npm install
npm run dev
```

## Environment

```env
VITE_SERVER_URL=http://localhost:3001
```

## Notes

- Client connects to Socket.IO server using `VITE_SERVER_URL`.
- Message history is loaded from backend database when joining a room.
- Sending a message persists data on the server (MongoDB) and broadcasts in realtime.
