/** Subject
 * Subject 與 Observable 有兩個明顯不同的地方：
 * 1. Observable 在建立物件同時就決定好資料流向了，而 Subject 是在產生物件後才決定資料的流向。
 * 2. Observable 每個訂閱者都會得到獨立的資料流，又稱為 unicast；而 Subject 則是每次事件發生時
 *    就會同步傳遞給所有訂閱者 (Observer)，又稱為 multicast。
 * 3. Subject 是在產生物件後才決定資料流向，因此比較適合在程式互動過程中動態決定資料流向，
 *    也就是 Subjct 建立好後，將這個 Subject 物件傳出去，讓其它程式來透過呼叫該物件的 next()
 *    等方法來決定資料流向。
 */
import {Subject} from 'rxjs';
const source$ = new Subject();

// 由於 Subject 是在產生後才決定資料流，因此需要先訂閱，才收得到資料流事件，上述程式執行結果如下：
const subscriberA = {
  next: (data) => console.log(`Observable 第一次訂閱: ${data}`),
  complete: () => console.log("第一次訂閱完成"),
};

const subscriberB = {
  next: (data) => console.log(`Observable 第二次訂閱: ${data}`),
  complete: () => console.log("第二次訂閱完成"),
};

source$.subscribe(subscriberA);

source$.next(1);
source$.next(2);

// 每次訂閱後，都會在有新的事件時才會收到新事件的資料。每次訂閱都是直接訂閱這條執行中的資料流，
// 這就是跟 Observable 最大不同的地方。
source$.subscribe(subscriberB);
source$.next(3);
source$.next(4);