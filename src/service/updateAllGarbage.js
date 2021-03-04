const CronJob = require('cron').CronJob;
const cache = require('../utils/cache');
const updateTainanGarbage = require('./updateTainanGarbage');

// 每天執行更新
const job = new CronJob(process.env.UPDATE_GARBAGE_TIME, async () => {
  await updateTainanGarbage();

  cache.reset();
}, null, true, 'Asia/Taipei');
job.start();
