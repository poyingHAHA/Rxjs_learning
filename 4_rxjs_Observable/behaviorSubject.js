import { BehaviorSubject } from "rxjs";

/** BehaviorSubject
 * Subject 產生的物件在訂閱時若沒有事件發生，會一直收不到資料，
 * 如果希望在一開始訂閱時會先收到一個預設值，且有事件發生後才訂閱的行為
 * 也可以收到最近一次發生過的事件資料，則可以使用 BehaviorSubject
 */
const source$ = new BehaviorSubject("initial");

source$.subscribe(data => console.log(`BehaviorSubject 第一次訂閱: ${data}`))

source$.next("data");
source$.next("latest");

// 此時若有一個新的訂閱進來呢?
// 這時候會立刻收到「最近一次發生過的事件資料」
source$.subscribe(data => console.log(`BehaviorSubject 第二次訂閱: ${data}`));

// BehaviorSubject 產生的物件，有一個 value 屬性，可以得知前面提到的「最近一次事件的資料」：
console.log(`目前 BehaviorSubject 的內容為: ${source$.value}`)