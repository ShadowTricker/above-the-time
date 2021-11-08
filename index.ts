import { AddressComponent } from "./components/address.component";
import { createElement } from './utils/create-element';
import { from, fromEvent, Subject } from 'rxjs';
import { listenable } from "./utils/decorators";
import router, { Route } from './services/router';
import { RouterOutlet } from "./services/router-outlet";


// const stateListen = new Subject<void>();
// // browser
// const addrBrowser = listenable(stateListen)(new AddressComponent("browser"));
// let curBrowserDOM = createElement(addrBrowser.render());
// document.body.append(curBrowserDOM);
// // origin
// /* const addrOrigin = listenable(stateListen)(new AddressComponent("origin"));
// let curOriginDOM = createElement(addrOrigin.render());
// document.body.append(curOriginDOM); */
// stateListen.subscribe(() => {
//   // browser
//   let newBrowserDOM = createElement(addrBrowser.render());
//   document.body.replaceChild(newBrowserDOM as Node, curBrowserDOM as Node);
//   curBrowserDOM = newBrowserDOM;

//   // origin
//   /* let newOriginDOM = createElement(addrOrigin.render());
//   document.body.replaceChild(newOriginDOM as Node, curOriginDOM as Node);
//   curOriginDOM = newOriginDOM; */
// });



const routes: Route[] = [
  {
    path: '/home',
    component: `
      HomePage
    `
  },
  {
    path: '/user',
    component: `
      UserPage<br />
      <router-outlet level="1"></router-outlet>
    `,
    children: [
      {
        path: '/userInfo',
        component: `
          UserName: {userName}
        `
      }
    ]
  }
];

initialRouter();
RouterOutlet.router = router;
customElements.define('router-outlet', RouterOutlet);

document.addEventListener('DOMContentLoaded', e => {
  const testBtn = document.querySelector('#test');
  const homeBtn = document.querySelector('#home');
  const hashBtn1 = document.querySelector('#hash-foo');
  const hashBtn2 = document.querySelector('#hash-test');

  const handlerMap = {
    user(btnString: string) {
      router.navigateTo(`/${btnString}/userInfo`, {
        queryParams: {
          userName: 'ShadowTricker'
        }
      });
    },
    home(btnString: string) {
      router.navigateTo(`/${btnString}`);
    },
    ['hash-foo'](btnString: string) {
      const hash = btnString.split('-')[1];
      location.hash = `/${hash}`;
    },
    ['hash-test'](btnString: string) {
      const hash = btnString.split('-')[1];
      location.hash = `/${hash}`;
    },
  };

  [testBtn, homeBtn, hashBtn1, hashBtn2].forEach(
    btn => fromEvent(btn, 'click').subscribe(e => {
      handlerMap[btn.innerHTML](btn.innerHTML);
    })
  );
});

function initialRouter(): void {
  router.setConfig(routes);
  router.initialize();
}



