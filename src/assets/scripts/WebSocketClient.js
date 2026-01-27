
class WebSocketClient {
    static INSTANCE = null
    static PORT = 3000

    constructor() {
        if (!WebSocketClient.INSTANCE) WebSocketClient.INSTANCE = this
        else return WebSocketClient.INSTANCE

        this._backlog = []
        this._connection = new WebSocket("ws://localhost:"+WebSocketClient.PORT)
        this.#init()
    }

    /**
     * To send JSON to the backend
     * @param {Object} obj A js object ex: {type:"idk", value?} 
     */
    send(obj) {
        if (this._connection.readyState == 1) this._connection.send(JSON.stringify(obj))
        else if (!this._connection.readyState) this._backlog.push(obj)
    }

    #init() {
        this._connection.onopen=()=>{
            this._connection.onmessage=message=>{
                const m = JSON.parse(message.data)
                console.log(m)// TODO
            }

            this._backlog.forEach(this.send.bind(this))
        }
    }
}

export default WebSocketClient