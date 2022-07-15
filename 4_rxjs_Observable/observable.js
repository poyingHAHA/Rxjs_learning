/** Observable
 * Observable 是 RxJS 中建立串流最基本的方式之一，我們可以透過 Observable 類別來建立一個
 * 「可被觀察的」物件，我們會在這個物件內先寫好整個資料流的流程，以便未來訂閱 (subscribe) 時
 * 可以依照這資料流程進行處理
 */

import { Observable } from "rxjs";

/** 建立資料流
 * 使用 Observable 建立資料流時，可以傳入一個 callback function，
 * function 內只有一個物件參數，我們稱為訂閱者 (Subscriber)，這個訂閱者就是處理資料流程的人，
 * 也就是負責呼叫 next()、complete()和 error() 的物件，我們可以透過這個物件先設計好資料流的流程
 */
const source$ = new Observable((subscriber) => {
  console.log("stream 開始");
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.next(4);
  console.log("stream 結束");
  subscriber.complete();
});

/** 訂閱 Observable
 * 有了這個資料流後，就可以開始進行訂閱啦！
 */
const subscriberA = {
  next: (data) => console.log(`Observable 第一次訂閱: ${data}`),
  complete: () => console.log("第一次訂閱完成"),
};

const subscriberB = {
  next: (data) => console.log(`Observable 第二次訂閱: ${data}`),
  complete: () => console.log("第二次訂閱完成"),
};

source$.subscribe(subscriberA);
source$.subscribe(subscriberB);

/** 非同步
 * 每次訂閱發生時，就會呼叫 new Observable() 內的 callback function，以上面的例子來說，
 * 這樣的呼叫是同步的，也就是發生兩次訂閱時，會依序等前一次訂閱全部執行完畢才會執行下一次訂閱。
 * 
 * 那麼有沒有辦法讓它已非同步執行呢？非常簡單，只要在一個非同步方法內呼叫 next() 即可
 */
const source2$ = new Observable(subscriber => {
  console.log('stream 開始');
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
    console.log('stream 結束');
  });
});
console.log("===================非同步===================")
source2$.subscribe(subscriberA);
source2$.subscribe(subscriberB);