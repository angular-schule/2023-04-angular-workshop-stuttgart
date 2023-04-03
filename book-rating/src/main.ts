import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));





  /////////

  const foo = function (arg) {
    return arg + 1;
  }

  const foo1 =  arg => arg + 1;




class Customer {

  private id = 4;

  fooBar() {

    setTimeout(() => {
      console.log('Die ID ist', this.id);
    }, 2000);
  }
}


const myCustomer = new Customer();
myCustomer.fooBar()
