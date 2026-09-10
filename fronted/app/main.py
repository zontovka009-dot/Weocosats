from fastapi import FastAPI, WebSocket
app=FastAPI(title="Wathis API",version="0.1.0")
@app.get("/health")
async def health(): return {"status":"ok","service":"wathis"}
@app.websocket("/ws/rooms/{room_id}")
async def room_socket(ws:WebSocket,room_id:str):
    await ws.accept(); await ws.send_json({"type":"connected","room_id":room_id})
    while True:
        await ws.send_json(await ws.receive_json())
