import { CronJob } from 'cron'

// var CronJob = require('cron').CronJob;
// var job = new CronJob('* * * * * *', function() {
//   console.log('You will see this message every second');
// }, null, true, 'America/Los_Angeles');
// job.start();

class PeriodTopic {
  start () {
    
  }
}

const period = new PeriodTopic()

const start = period.start.bind(period)

export const periodStart = new CronJob('* * * * * *', start)