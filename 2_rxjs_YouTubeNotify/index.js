/** 實作觀察者 (Observer)
 * 假設現在有兩個人想要知道影片上架了，也就是這兩個人都是所謂的「觀察者」，
 * 每個觀察者必須實作 notify 方法，用來接受新影片的通知
 */
const observerA = {
  notify: id => {
    console.log(`我是觀察者 A，我收到影片 ${id} 上架通知了`);
  }
};

const observerB = {
  notify: id => {
    console.log(`我是觀察者 B，我收到影片 ${id} 上架通知了`);
  }
}

/** 實作目標 (Subject)
 * 接著實作要觀察的「目標」，這個目標要負責管理所有的觀察者，
 * 並且在需要的時候通知它們
 */
const youtuberSubject = {
  // 存放所有的觀察者，也就是開啟通知使用者
  observers: [],
  // 通知所有觀察者新影片上架
  notifyObservers: id => {
    // 列舉每個觀察者，並進行通知動作
    youtuberSubject.observers.forEach(observer => {
      observer.notify(id);
    })
  },
  // 加入新的觀察者，也就是有新使用者開啟通知
  addObserver: observer => {
    youtuberSubject.observers.push(observer);
  },
  // 將某個觀察者移除，也就是某個使用者關閉通知了
  deleteObserver: observer => {
    youtuberSubject.observers = youtuberSubject.observers.filter(
      obs => obs !== observer
    );
  }
}

/** 實際執行看看
 * 有了「觀察者」和「目標」後，我們就可以實際看看雙方互動的結果
 */

// 影片 1 上架，此時還沒有觀察者
// 輸出結果： (沒有任何輸出)
youtuberSubject.notifyObservers(1);

// 接著加入一個觀察者，然後上架新影片， 有了一個觀察者後，當新影片上架，自然就會收到通知啦！
// 加入觀察者 A，也就是觀察者 A 開啟通知了
youtuberSubject.addObserver(observerA);
// 影片 2 上架，此時觀察者 A 會收到通知
youtuberSubject.notifyObservers(2);

// 加入觀察者 B，也就是觀察者 B 開啟通知了
youtuberSubject.addObserver(observerB);
// 影片 3 上架，此時觀察者 A 跟 B 都會收到通知
youtuberSubject.notifyObservers(3);

// 移除觀察者 B，也就是觀察者 B 關閉通知了
youtuberSubject.deleteObserver(observerB);
// 影片 4 上架，此時只剩下觀察者 A 會收到通知
youtuberSubject.notifyObservers(4);