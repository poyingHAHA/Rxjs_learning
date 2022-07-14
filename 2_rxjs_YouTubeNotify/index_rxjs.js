import {Subject} from 'rxjs';

/** 步驟 1：建立被觀察的目標
 * 我們已經知道有一個被觀察的目標，這個目標資料變動時會通知所有的觀察者，
 * 我們可以直接建立一個 Subject 物件，作為被觀察的目標
 */

// 建立 youtuber$ subject (被觀察的目標)
const youtuber$ = new Subject()

// 之後只要有影片上架，都可以透過 next() 方法將更新資料送出通知所有的觀察者
// 影片 1 上架，此時還沒有觀察者；只會顯示通知
youtuber$.next(1);

/** 步驟 2：建立第一個觀察者
 * 在 RxJS 內，每個觀察者都是一個實作 next()、error() 和 complete() 方法的物件，
 * 分別來處理「資料變更」、「發生錯誤」和「串流完成」的行為；
 * 當然，如果某個行為沒有要處理，該方法可以直接不宣告。
 */

// 建立觀察者 A 物件
const observerA = {
  next: id => {
    console.log(`我是觀察者 A，我收到影片 ${id} 上架通知了`);
  },
  error: () => {}, // 沒有要處理「錯誤」的話不一定要加上這一行
  complete: () => {} // 沒有要處理「完成」的話不一定要加上這一行
}

/** 步驟 3：執行訂閱 (加入通知對象)
 * 以觀察者模式來說，我們會說「把觀察者加入被通知的對象清單」；
 * 而在 RxJS 中，我更喜歡說成「訂閱某個目標，把資料交給觀察者處理」。
 * 
 * 這個訂閱的動作，也會回傳一個 Subscription 訂閱物件，未來我們可以使用這個物件進行退訂動作。
 */

// 加入觀察者 A，也就是觀察者 A 開啟通知了
const observerASubscription = youtuber$.subscribe(observerA);

/** 步驟 4：送出新事件 (通知所有觀察者)
 * 以「影片上架通知」的例子來說，整個過程是一個「串流」，
 * 而每次影片上架都是一個新的「事件發生」，這個事件發生會及時通知所有的觀察者。
 * 所以在此時我們呼叫 youtuber$ 這個 Subject 的 next() 方法，
 * 就會進入 observerA 的 next() 方法內的處理邏輯。
 */

// 影片 2 上架，此時觀察者 A 會收到通知
youtuber$.next(1);

/** 步驟 5：建立新的觀察者
 * 接著我們在建立一個觀察者，但用更簡單的寫法；由於不處理 error() 和 complete()，
 * 我們不需要把完整的物件建立起來，只要準備好一個處理 next() 的方法放到訂閱參數裡面就好。
 */

// 加入觀察者 B，也就是觀察者 B 開啟通知了
// 由於只處理 next，這裡就使用簡單的寫法，不另外建立物件
const observerBSubscription = youtuber$.subscribe(id => {
  console.log(`我是觀察者 B，我收到影片 ${id} 上架通知了`);
}) 

// 影片 3 上架，此時觀察者 A 跟 B 都會收到通知
youtuber$.next(3);

/** 步驟 6：取消訂閱
 * 當呼叫 youtuber$ 的 subscribe() 方法後，回會傳一個訂閱物件，
 * 我們可以透過此物件來決定何時要取消訂閱。
 */

// 移除觀察者 B，也就是觀察者 B 關閉通知了
// 在 ReactiveX 中也稱為「取消訂閱」
observerBSubscription.unsubscribe();

// 影片 4 上架，此時只剩下觀察者 A 會收到通知
youtuber$.next(4);