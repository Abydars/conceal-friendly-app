export default class EventListeners {
    static listeners = {};

    static addListener = (caller, event, callback) => {
        if (EventListeners.listeners[event] === undefined)
            EventListeners.listeners[event] = {};

        EventListeners.listeners[event][caller] = callback;
    };

    static removeListener = (caller, event) => {
        if (EventListeners.listeners[event] !== undefined && EventListeners.listeners[event][caller] !== undefined)
            delete EventListeners.listeners[event][caller];
    };

    static trigger = (event) => {
        for (let i in EventListeners.listeners[event]) {
            EventListeners.listeners[event][i]();
        }
    };
}