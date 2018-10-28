import {dataReceived} from "./actions";

class GeneralLog {

    init(url) {
        var ws = new WebSocket( url );
        ws.onopen = function () {};
        ws.onclose = function () {};
        ws.onmessage = function ( event ) {
            dataReceived(event.data);
        };
    }
}

export default 