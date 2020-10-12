import { HistoryObject, MyHistory } from "./services/my-history";


const myHistory = new MyHistory();

interface ElementParams {
  tagName: string;
  children: (HTMLElement | string)[],
  attributes?: { [key: string]: any },
  events?: { [key: string]: (e: Event, ...params: any[]) => any }
}

function createElement({
  tagName,
  children,
  attributes = {},
  events = {}
}: ElementParams): HTMLElement {
  const newElem = document.createElement(tagName);
  for (let child of children) {
    newElem.append(child);
  }

  const attrs = Object.keys(attributes);
  for (let attr of attrs) {
    newElem.setAttribute(attr, attributes[attr]);
  }

  const evts = Object.keys(events);
  for (let evt of evts) {
    newElem.addEventListener(evt.toString(), events[evt]);
  }

  return newElem;
}

const backButton = createElement({
  tagName: 'button',
  children: ['←'],
  attributes: {
    title: '后退'
  },
  events: {
    click(e: MouseEvent) {
      myHistory.back();
    }
  }
});

const forwardButton = createElement({
  tagName: 'button',
  children: ['→'],
  attributes: {
    title: '前进'
  },
  events: {
    click(e: MouseEvent) {
      myHistory.forward();
    }
  }
});

const resetButton = createElement({
  tagName: 'button',
  children: ['۞'],
  attributes: {
    title: '刷新'
  },
  events: {
    click(e: MouseEvent) {
      myHistory.reset();
    }
  }
});

const address = createElement({
  tagName: 'input',
  children: [''],
  attributes: {
    placeholder: '请输入一个地址',
    name: 'address'
  }
});

const submit = createElement({
  tagName: 'button',
  children: ['✎'],
  attributes: {
    type: 'submit'
  }
});

const form = createElement({
  tagName: 'form',
  children: [address, submit],
  events: {
    submit(e: any) {
      e.preventDefault();
      const { value } = e.target.elements['address'];
      myHistory.pushState({
        url: value,
        title: null,
        state: null
      });
    }
  }
});

const showHistory = createElement({
  tagName: 'button',
  children: ['∑'],
  attributes: {
    title: 'show'
  },
  events: {
    click(e: MouseEvent) {
      console.log(myHistory);
    }
  }
});

const addressContainer = createElement({
  tagName: 'div',
  children: [backButton, forwardButton, resetButton, form, showHistory],
  attributes: {
    class: 'container'
  }
});

document.body.appendChild(addressContainer);

myHistory.listenPopState().subscribe((res: HistoryObject) => {
  (address as HTMLInputElement).value = res.url;
});