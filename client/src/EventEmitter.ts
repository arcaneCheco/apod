export default class EventEmitter {
  _events: any;
  constructor() {
    this._events = {};
  }

  on(event: any, fn: any) {
    if (!this._events[event]) {
      this._events[event] = [];
    }

    this._events[event].push(fn);
  }

  off(event: any, fn: any) {
    if (!this._events[event]) {
      throw new Error(
        `Can't remove a listener. Event "${event}" doesn't exits.`
      );
    }

    this._events[event] = this._events[event].filter(
      (listener: any) => listener !== fn
    );
  }

  emit(name: any, data: any) {
    if (!this._events[name]) {
      throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
    }

    this._events[name].forEach((fn: any) => fn(data));
  }
}
