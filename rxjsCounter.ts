import { filter, fromEvent, Subject } from "rxjs";

const startButton:any = document.querySelector('#start');
const countButton:any = document.querySelector('#count');
const errorButton:any = document.querySelector('#error');
const completeButton:any = document.querySelector('#complete');

const currentCounterLabel:any = document.querySelector('#currentCounter');
const evenCounterLabel:any = document.querySelector('#evenCounter');
const statusLabel:any = document.querySelector('#status');

let counter = 0
// 自訂subject來通知計數器改變
// 在命名上，我們習慣會在變數後面加上一個 $ ，代表它是一個可被觀察的 (observable) 物件。
let counter$: Subject<number>;

// 將「開始新的計數器」按鈕事件變成一個 observable，並透過訂閱 (subscribe)得知事件發生：
fromEvent(startButton, 'click').subscribe(() => {
  // 重新建立 counter$ 實體
  counter$ = new Subject();
  // 將counter歸零
  counter = 0;
  // 顯示狀態
  statusLabel.innerHTML = "目前狀態:開始計數";

  // 訂閱 counter$ 並顯示目前計數值
  counter$.subscribe({
    next: data => {
      currentCounterLabel.innerHTML = `目前計數:${data}`;
    },
    error: message => {
      statusLabel.innerHTML = `目前狀態:錯誤 -> ${message}`
    },
    complete: () => {
      statusLabel.innerHTML = '目前狀態：完成'
    }
  });

  // 「偶數計數值」的計數器，它可以從「目前計數值」這個 observable 搭配 filter 這個 operator 來獲得一個新的 observable
  const evenCounter$ = counter$.pipe(
    filter(data => data % 2 ===0)
  )  
  // 此時的 evenCounter$ 就是透過 filter 這個 operator 來建立的「新的 observable」，
  // 接著就可以訂閱這個 observable，來取得「偶數計數值」改變時的內容
  evenCounter$.subscribe(data => {
    evenCounterLabel.innerHTML = `偶數計數：${data}`;
  })

  // 最後我們讓 counter$ 這個 subject 送出新的「計數值事件」，讓畫面一開始就能顯示計數器內容為 0
  counter$.next(counter)
})

// 「計數」按鈕事件訂閱
fromEvent(countButton, 'click').subscribe(() => {
  counter$.next(++counter);
})

// 實作「發生錯誤」按鈕
fromEvent(errorButton, 'click').subscribe(() => {
  const reason = prompt('請輸入錯誤訊息');
  counter$.error(reason || 'error');
})

// 實作「完成計數」按鈕
fromEvent(completeButton, 'click').subscribe(() => {
  counter$.complete();
})