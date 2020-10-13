import { Subject } from 'rxjs';

export interface HistoryObject {
  url: string;
  title?: string;
  state?: { [key: string]: any };
}

export class MyHistory {

  private history: HistoryObject[] = [];
  private currentIndex: number = -1;
  private initialHistory: HistoryObject = {
    url: '',
    title: null,
    state: null
  };

  private popEvent = new Subject<HistoryObject>();

  get length() {
    return this.history.length;
  }

  get currentUrl() {
    return this.currentIndex === -1
      ? this.initialHistory.url
      : this.history[this.currentIndex].url;
  }

  constructor() {}

  public reset(): void {
    this.history = [];
    this.currentIndex = -1;
    this.popEvent.next(this.initialHistory);
  }

  public go(link: number): void {
    const result = this.currentIndex + link;
    this.currentIndex = this.limited(result);
  }

  public pop(): void {
    this.history.pop();
    this.currentIndex = this.length - 1;
    this.popEvent.next(
      this.currentIndex === -1
        ? this.initialHistory
        : this.history[this.currentIndex]
    );
  }

  public forward(): void {
    this.go(1);
  }

  public back(): void {
    this.go(-1);
  }

  public pushState(urlObject: HistoryObject): void {
    this.history = [...this.history.slice(0, this.currentIndex + 1), urlObject];
    this.currentIndex = this.length - 1;
  }

  public replaceState(urlObject: HistoryObject): void {
    this.history = [...this.history.slice(0, this.currentIndex), urlObject];
    this.currentIndex = this.length - 1;
  }

  public listenPopState(): Subject<HistoryObject> {
    return this.popEvent;
  }

  private limited(range: number): number {
    if (range <= -1) {
      this.popEvent.next(this.initialHistory);
      return -1;
    } else if (range > this.length - 1) {
      this.popEvent.next(
        this.history[this.length - 1]
          ? this.history[this.length - 1]
          : this.initialHistory
      );
      return this.length - 1;
    } else {
      this.popEvent.next(this.history[range]);
      return range;
    }
  }

}