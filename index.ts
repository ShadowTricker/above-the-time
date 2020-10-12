
/* window.addEventListener('beforeunload', (event: UIEvent) => {
  let message = "I'm really going to miss you if you go.";
  event.returnValue = message;
  return message;
}); */

/* window.addEventListener('pageshow', (e) => {
  console.log(e);
  console.log(1234);
});

document.addEventListener('contextmenu', (e) => {
  console.log('contextmenu');
  appendMenu();
  e.preventDefault();
});

function appendMenu() {
  const ul = document.createElement('ul');
  const li_1 = document.createElement('li');
  li_1.innerHTML = '1';
  const li_2 = document.createElement('li');
  li_2.innerHTML = '2';
  const li_3 = document.createElement('li');
  li_3.innerHTML = '3';
  ul.append(li_1);
  ul.append(li_2);
  ul.append(li_3);
  document.body.append(ul);
} */

interface HistoryObject {
  url: string;
  title?: string;
  state?: { [key: string]: any };
}

class MyHistory {

  private history: HistoryObject[] = [];

  private currentIndex: number = -1;

  get length() {
    return this.history.length;
  }

  get currentUrl() {
    return this.currentIndex === -1
      ? ''
      : this.history[this.currentIndex].url;
  }

  public go(link: number): void {
    const result = this.currentIndex + link;
    this.currentIndex = this.limited(result);
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

  private limited(range: number): number {
    if (range < -1) {
      return -1;
    } else if (range > this.length - 1) {
      return this.length - 1;
    } else {
      return range;
    }
  }

}

const historyObj = new MyHistory();
historyObj;