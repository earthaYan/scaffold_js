const ora = require('ora')
/**
 * sleep 休眠函数
 * @param {Number} n 休眠时间
 */
function sleep(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, n);
  })
}

/**
 * loading 加载效果
 * @param {String} message 加载信息
 * @param {Function} fn 加载函数
 * @param {List} args fn 函数执行的参数
 * @returns 异步调用返回值
 */
async function loading(message, fn, ...args) {
  const spinner = ora(message)
  spinner.start()//开启加载
  try {
    let executeRes = await fn(...args)
    spinner.succeed()
    return executeRes
  } catch (err) {
    spinner.fail('request fail,retrying...')
    await sleep()
    return loading(message, fn, ...args)
  }
}
module.exports={loading}