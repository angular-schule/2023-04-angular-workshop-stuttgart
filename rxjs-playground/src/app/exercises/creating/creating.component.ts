import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Subscriber, Observer, take, OperatorFunction } from 'rxjs';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/


    // of('A', 'B', 'C')
    // from([1,2,3,4,5])
    // from(fetch('https://api.angular.schule/books'))
    // interval(1000)    // ---0---1---2---3---4--- ...
    // timer(2000)       // ------0|
    // timer(4000, 1000) // ------------0---1---2---3---4--- ...
    // timer(0, 1000)    // 0---1---2---3---4--- ...


    function myOperator(): OperatorFunction<number, string> {
      return (source$: Observable<number>) => {
        return new Observable(sub => {
          source$.subscribe(num => sub.next(num.toString()))
        })
      }
    }

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0),
      myOperator()
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE'),
    })



    // filter(e => e % 2 === 0)(map(e => e * 3)(timer(0, 1000)))






    /******************************/


    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);

      sub.next(10);
      sub.next(20);

      setTimeout(() => sub.next(50), 2000)
      const timer = setTimeout(() => {
        console.log('HERE')
        sub.next(60)
      }, 4000)
      setTimeout(() => sub.complete(), 5000)

      // Teardown Logic
      return () => {
        clearTimeout(timer);
      };
    }

    const obs: Observer<number> = {
      next: (e) => console.log(e),
      error: (err) => console.error(err),
      complete: () => console.log('FERTIG')
    };

    // Finnische Notation 🇫🇮
    const myObservable$ = new Observable(producer);
    const myObservable2$ = new Observable<number>(sub => {
      sub.next(1);
      sub.next(2);
    });
    // const subscr = myObservable$.subscribe(obs);

    setTimeout(() => {
      // subscr.unsubscribe()
    }, 3000)


    // producer(obs);

    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
