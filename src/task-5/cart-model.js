import Subject from "./subject.js";
import { status } from "../task-1.js";

export default class Cart {
  constructor() {
    this.baseUrl = "http://localhost:3001/cart/items/";
    this.subject = new Subject();
    this.items = [];
    this.loading = false;
  }

  _ajax(url, method = "GET", data = null, middleware = () => {}) {
    const params = {
      method,
      mode: "cors",
      headers: { "Content-type": "application/json" },
    };
    if (data) {
      params.body = JSON.stringify(data);
    }
    this.loading = true;
    this._notify();

    return window
      .fetch(url, params)
      .then(status)
      .then((response) => (response.status === 200 ? response.json() : null))
      .then(middleware)
      .then(() => {
        this.loading = false;
        this._notify();
      })
      .catch((error) => new Error(error.message));
  }

  _notify() {
    this.subject.notifyObservers();
  }

  register(...args) {
    this.subject.add(...args);
  }

  getItems() {
    return this.items;
  }

  getTotalQuantity() {
    return this.items.length;
  }

  getTotalPrice() {
    return this.items.length !== 0
      ? this.items.map((item) => item.price).reduce((acc, qty) => acc + qty)
      : 0;
  }

  load() {
    return this._ajax(this.baseUrl, "GET", null, (data) => {
      this.items = data;
    });
  }

  addItem(item) {
    return this._ajax(this.baseUrl, "POST", item, () => this.items.push(item));
  }

  updateItem(itemId, item) {
    return this._ajax(`${this.baseUrl}${itemId}`, "PUT", item, () =>
      this.items.forEach((value, i) => {
        if (value.id === itemId) {
          this.items[i].name = item.name;
          this.items[i].price = item.price;
          this.items[i].quantity = item.quantity;
        }
      })
    );
  }

  removeItem(itemId) {
    return this._ajax(`${this.baseUrl}${itemId}`, "DELETE", null, () => {
      this.items.forEach((value, i) => {
        if (value.id === itemId) {
          this.items.splice(i, 1);
        }
      });
    });
  }

  removeAll() {
    return this._ajax(this.baseUrl, "DELETE", null, () => {
      this.items = [];
    });
  }
}
