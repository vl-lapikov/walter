import {dataReceived} from "./actions";

class GeneralLog {

    listen(url) {
        this.ws = new WebSocket( url );
        this.ws.onopen = function () {};
        this.ws.onclose = function () {};
        this.ws.onmessage = function ( event ) {
            dataReceived(event.data);
        };
    }
}

export default GeneralLog