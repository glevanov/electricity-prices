import { isSameDay } from "date-fns";

export class PersistentStorage {
  _key = "electricity-prices:response";

  load() {
    const data = JSON.parse(localStorage.getItem(this._key));

    return this._isExpired(data) ? undefined : data;
  }

  write(data) {
    localStorage.setItem(this._key, JSON.stringify(data));
  }

  _isExpired(data) {
    if (data == null) return true;

    const today = new Date();
    const firstEntry = new Date(data[0]?.start);

    return !isSameDay(today, firstEntry);
  }
}
