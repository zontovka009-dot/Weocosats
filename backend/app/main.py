from fastapi import FastAPI, WebSocket

app = FastAPI(title="Wathis API", version="0.2.0")

@app.get("/health")
async def health():
    return {"ok": True, "service": "wathis-api"}

@app.websocket("/ws/rooms/{room_id}")
async def room_socket(websocket: WebSocket, room_id: str):
    await websocket.accept()
    await websocket.send_json({"type": "connected", "room_id": room_id})
    try:
        while True:
            message = await websocket.receive_json()
            await websocket.send_json({"type": "echo", "room_id": room_id, "payload": message})
    except Exception:
        await websocket.close()
