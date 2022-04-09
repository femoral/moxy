import * as uuid from 'uuid';

export class Subscription<T> {
  constructor(
    private readonly _observer: Observer<T>,
    private readonly _id: string,
    private readonly _handler: (value: T) => void
  ) {}

  public unsubscribe() {
    this._observer.unsubscribe(this._id);
  }

  public notify(value: T) {
    this._handler(value);
  }
}

export class Observer<T> {
  private readonly _subscriptions: Map<string, Subscription<T>>;

  constructor() {
    this._subscriptions = new Map<string, Subscription<T>>();
  }

  public subscribe(handler: (value: T) => void): Subscription<T> {
    const subscriptionId = uuid.v4();
    const subscription = new Subscription<T>(this, subscriptionId, handler);
    this._subscriptions.set(subscriptionId, subscription);
    return subscription;
  }

  public unsubscribe(id: string) {
    this._subscriptions.delete(id);
  }

  public notify(value: T) {
    for (const subscription of this._subscriptions.values()) {
      setImmediate(() => subscription.notify(value));
    }
  }
}
