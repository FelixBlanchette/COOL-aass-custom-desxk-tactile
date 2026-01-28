
class WebSocketClient {
    static INSTANCE = null
    static PORT = 3000
    static RESPONSE_ID_GIVER = 1

    constructor() {
        if (!WebSocketClient.INSTANCE) WebSocketClient.INSTANCE = this
        else return WebSocketClient.INSTANCE

        this._backlog = []
        this._responseMapper = []
        this._connection = new WebSocket("ws://localhost:"+WebSocketClient.PORT)
        this.#init()
    }

    /**
     * To send JSON to the backend
     * @param {Object} obj A js object ex: {type:"idk", value?} 
     * @param {Function?} callback If a response is expected, it will be returned as the parameter of this callback. (res)=>{} 
     */
    send(obj, callback) {
        if (this._connection.readyState == 1) {
            if (callback) {
                const id = WebSocketClient.RESPONSE_ID_GIVER++
                this._responseMapper[id] = callback
                obj.RESPONSE_ID = id
            }
            this._connection.send(JSON.stringify(obj))
        }
        else if (!this._connection.readyState) this._backlog.push([obj, callback])
    }

    #init() {
        this._connection.onopen=()=>{
            this._connection.onmessage=message=>{
                const msg = JSON.parse(message.data)
                if (msg.RESPONSE_ID) this._responseMapper[msg.RESPONSE_ID](msg.value)
            }
            this._backlog.forEach(([obj, callback])=>this.send(obj, callback))
        }
    }
}

export default WebSocketClient