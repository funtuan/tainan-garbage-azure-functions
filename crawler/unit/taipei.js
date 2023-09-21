
const { downloadCSV } = require('./download')

const taipeiGeneralGarbageDay = [1, 2, 4, 5, 6]
const taipeiRecycleGarbageDay = [2, 4, 6]

function parseTimeText(text) {
  const h = text.substr(0, 2)
  const m = text.substr(2, 2)
  return Number(h) * 60 + Number(m)
}

module.exports = async () => {
  console.log('taipei running...')
  const json = await downloadCSV('https://data.taipei/api/dataset/6bb3304b-4f46-4bb0-8cd1-60c66dcd1cae/resource/a6e90031-7ec4-4089-afb5-361a4efe7202/download', {
    format: 'big5',
  })
  if (json.length === 0) {
    throw new Error('taipei json length is 0')
  }

  const data = json.reduce((row, one) => {
    row.push({
      address: one['地點'],
      startTime: parseTimeText(one['抵達時間']),
      endTime: parseTimeText(one['離開時間']),
      lat: Number(one['緯度']),
      lon: Number(one['經度']),
      garbageDay: taipeiGeneralGarbageDay,
      recycleDay: taipeiRecycleGarbageDay,
    })
    return row
  }, [])

  console.log('taipei done')
  return data
}

