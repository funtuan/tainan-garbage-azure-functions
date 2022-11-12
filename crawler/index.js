
const hash = require('object-hash')
const taipeiCrawler = require('./unit/taipei')
const newtaipeiCrawler = require('./unit/newtaipei')
const tainanCrawler = require('./unit/tainan')
const kaohsiungCrawler = require('./unit/kaohsiung')

module.exports = async (context) => {
  const taipeiData = await taipeiCrawler()
  const newtaipeiData = await newtaipeiCrawler()
  const tainanData = await tainanCrawler()
  const kaohsiungData = await kaohsiungCrawler()

  const data = [
    ...taipeiData,
    ...newtaipeiData,
    ...tainanData,
    ...kaohsiungData,
  ]
  for (const one of data) {
    one.pid = hash(one)
  }
  context.bindings.openDataOutputBlob = JSON.stringify(data)
  context.res = {
    body: 'ok',
  }
}
