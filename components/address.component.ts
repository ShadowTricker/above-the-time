import { HistoryObject, MyHistory } from "../services/my-history";
import { ElementParams } from "../utils/create-element";
import { listenable } from "../utils/decorators";

// @listenable('test')
export class AddressComponent {
  private mode: string = null;
  private myHistory: MyHistory = null;
  private state = null;
  private emitter: any;

  constructor(mode: string) {
    this.mode = mode;
    this.myHistory = new MyHistory();
    this.state = {
      curUrl: this.myHistory.currentUrl,
      history: this.myHistory.currentHistory,
    };
    this.myHistory.listenPopState().subscribe((res: HistoryObject) => {
      this.setState({
        curUrl: res.url,
        history: this.myHistory.currentHistory,
      });
    });
  }

  public render(): ElementParams {
    let arrowsButtons;
    if (this.mode === "browser") {
      arrowsButtons = [
        {
          tagName: "button",
          children: ["←"],
          attributes: {
            title: "后退",
          },
          events: {
            click: (e: MouseEvent) => {
              this.myHistory.back();
            },
          },
        },
        {
          tagName: "button",
          children: ["→"],
          attributes: {
            title: "前进",
          },
          events: {
            click: (e: MouseEvent) => {
              this.myHistory.forward();
            },
          },
        },
      ];
    } else {
      arrowsButtons = [
        {
          tagName: "button",
          children: ["←"],
          attributes: {
            title: "后退",
          },
          events: {
            click: (e: MouseEvent) => {
              this.myHistory.pop();
            },
          },
        },
      ];
    }
    return {
      tagName: "div",
      children: [
        {
          tagName: "h2",
          children: [this.mode],
          attributes: {
            class: "container"
          }
        },
        {
          tagName: "div",
          children: [
            ...arrowsButtons,
            {
              tagName: "form",
              children: [
                {
                  tagName: "input",
                  children: [""],
                  attributes: {
                    placeholder: "请输入一个地址",
                    name: "address",
                    value: this.state.curUrl,
                  },
                },
                {
                  tagName: "button",
                  children: ["✎"],
                  attributes: {
                    type: "submit",
                  },
                },
              ],
              events: {
                submit: (e: any) => {
                  e.preventDefault();
                  const { value } = e.target.elements["address"];
                  this.myHistory.pushState({
                    url: value,
                    title: null,
                    state: null,
                  });
                },
              },
            },
            {
              tagName: "button",
              children: ["∑"],
              attributes: {
                title: "show",
              },
              events: {
                click: (e: MouseEvent) => {
                  console.log(this.myHistory);
                },
              },
            },
          ],
          attributes: {
            class: "container",
          },
        },
        {
          tagName: "div",
          children: [
            JSON.stringify(this.state.history.map(
              (item: HistoryObject) => item.url
            ))
          ],
          attributes: {
            class: "container",
          }
        }
      ],
      attributes: {}
    };
  }

  private setState(state: { [key: string]: any }): void {
    this.state = {
      ...this.state,
      ...state,
    };
    this.emitter.next();
  }
}
