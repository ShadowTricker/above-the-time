

export interface ElementParams {
  tagName: string;
  children: (ElementParams | string)[];
  attributes?: { [key: string]: any };
  events?: { [key: string]: (e: Event, ...params: any[]) => any };
}

export function createElement(elem: ElementParams | string): HTMLElement | string {
  if (typeof elem === "string") {
    return elem;
  } else {
    const { tagName, children, attributes, events } = elem;
    const newElem = document.createElement(tagName);
    for (let childObj of children) {
      let child = createElement(childObj);
      newElem.append(child);
    }

    if (attributes) {
      const attrs = Object.keys(attributes);
      for (let attr of attrs) {
        newElem.setAttribute(attr, attributes[attr]);
      }
    }

    if (events) {
      const evts = Object.keys(events);
      for (let evt of evts) {
        newElem.addEventListener(evt.toString(), events[evt]);
      }
    }

    return newElem;
  }
}