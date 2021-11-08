import { BehaviorSubject, Subject } from "rxjs";

export interface Route {
  path?: string;
  component?: any;
  children?: Route[];
}

export interface RouterInterface {
  config: Route[];
  popState: (res) => void;
}

export interface PopEvent {
  url: string;
  params: any;
  components: any[];
}

export interface Extras {
  queryParams: { [key: string]: any }
}

class Router {
  private config = [];
  private cache: PopEvent = null;
  private popEvent: BehaviorSubject<any>;
  get popStateChange(): BehaviorSubject<any> {
    return this.popEvent;
  }

  initialize(): void {
    this.popEvent = new BehaviorSubject(this.config[0]);
    this.listenPopStateChange();
    this.navigateTo(this.config[0].path);
  }

  setConfig(routes: Route[]): void {
    this.config = routes;
  }

  listenPopStateChange(): void {
    window.addEventListener('popstate', () => {
      const { hash, pathname, search } = document.location;
      console.log(hash);
      const params = this.genParamsObject(new URLSearchParams(search));
      const components = this.genComponents(pathname);
      const cur = { url: pathname + search, params, components };
      this.popEvent.next(cur);
    });

    /* window.addEventListener('hashchange', e => {
      console.log(e);
    }); */
  }

  navigateTo(url: string, extra?: Extras): void {
    history.pushState({}, '', this.navigatePrepare(url, extra));
  }

  replaceTo(url: string, extra?: Extras): void {
    history.replaceState({}, '', this.navigatePrepare(url, extra));
  }

  private navigatePrepare(url: string, extra?: Extras): string {
    const urlString = this.genSerializedString(url, extra);
    if (this.cache && this.cache.url === urlString) {
      return;
    }
    const components = this.genComponents(url);
    const cur = { url: urlString, params: extra?.queryParams || {}, components };
    this.popEvent.next(cur);
    this.cache = cur;
    return urlString;
  }

  private genComponents(url: string): any[] {
    const urls = url.match(/(\/[^/]+)/g);
    const route = this.config.find(c => c.path === urls[0]);
    return route.children ? [ route.component, route.children[0].component ] : [route.component];
  }

  private genSerializedString(url: string, extra: Extras): string {
    const params = new URLSearchParams(extra?.queryParams);
    const paramString = params.toString();
    return `${url}${paramString ? '?' + paramString : ''}`;
  }

  private genParamsObject(params: URLSearchParams): Extras['queryParams'] {
    let obj = {};
    for (const [key, value] of (params as any ).entries()) {
      obj[key] = value;
    }
    return obj;
  }
}

const router = new Router();
export default router;