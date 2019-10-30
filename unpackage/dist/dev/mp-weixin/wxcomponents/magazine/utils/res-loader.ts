const reqCountLimit = 5
let loadList: Array<string> = []
let loadedResList: Array<{ origin: string; local: string }> = []
let caller: any = null
let onProgress: Function
let onResLoaded: Function
let reqCount = 0
let totalCount = 0

function loadRes(resList: Array<string>, onProgressFun: Function, onResLoadedFun: Function, funCaller: any) {
  totalCount = resList.length
  loadList = resList
  onProgress = onProgressFun
  onResLoaded = onResLoadedFun
  caller = funCaller
  startLoad()
}

function startLoad() {
  while (reqCount < reqCountLimit && loadList.length > 0) {
    let url = loadList.pop() as string
    reqCount++
    loadSingleRes(url)
      .then(path => {
        reqCount--
        onLoadSuccess(url, path)
      })
      .catch(err => {
        reqCount--
        console.warn('load res error path=' + url, err)
        loadList.push(url)
      })
  }
}

function loadSingleRes(url) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url,
      success({ tempFilePath }) {
        resolve(tempFilePath)
      },
      fail: reject
    })
  })
}

function onLoadSuccess(origin, local) {
  loadedResList.push({ origin, local })
  if (onProgress && caller) {
    onProgress.call(caller, loadedResList.length)
  }
  if (loadedResList.length < totalCount) {
    setTimeout(() => {
      startLoad()
    }, 10)
  }
  // 加载完毕
  else {
    if (onResLoaded && caller) {
      onResLoaded.call(caller, loadedResList)
    }
  }
}

export {
  loadRes
}