import moment from 'moment';

function getVestingMonthsByType(type):number {
  switch (type) {
    case 'public':
      return 6;
    case 'public_v2':
      return 6;
    case 'team':
      return 36;
    default:
      return 12;
  }
}

export function calculateEndTime(startTime, type):any {
  const momentStartTime = moment(startTime * 1000);
  return momentStartTime.add(getVestingMonthsByType(type), 'months');
}

export function calculateNextDistribution(startTime, releaseInterval):any {
  const momentStartTime = moment(startTime * 1000);
  const currentTime = moment();
  const timePassed = currentTime.diff(momentStartTime);
  const passedIntervals = timePassed / (releaseInterval * 1000);
  return momentStartTime.add(Math.ceil(passedIntervals) * releaseInterval, 'seconds');
}

export function calculateStartTime(startTime):any {
  return moment(startTime * 1000);
}
