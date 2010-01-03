const { exec } = require("child_process");
const { readFile } = require("fs");

let pattern = `
011****11**11111111**11111111**11111111**111******11
011****11**11****11**11********11****11**11*1*****11
011****11**11****11**11********11****11**11**1****11
011111111**11111111**11111111**11111111**11***1***11
011****11**11****11********11**11****11**11****1**11
*11****11**11****11********11**11****11**11*****1*11
*11****11**11****11**11111111**11****11**11******110`.replaceAll("\n", "");

(async () => {
  


function exec_cmd(str) {
  exec(str, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    return 0
  });
}
function dayOfYearToMonthDay(dayNumber) {
  dayNumber = dayNumber + 1;
  if (dayNumber < 1 || dayNumber > 365) {
    throw new Error("Day number must be between 1 and 365");
  }

  const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let month = 1;
  while (dayNumber > monthLengths[month - 1]) {
    dayNumber -= monthLengths[month - 1];
    month++;
  }

  const padNumber = (num) => ("0" + num).slice(-2);

  return {
    month: padNumber(month),
    day: padNumber(dayNumber),
  };
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
let z = 0;
for (let i = 0; i < 52; i++) {
  for (let j = 0; j < 7; j++) {
    let el = pattern[j * 52 + i];
    if (el == "0") {
      continue;
    } else {
      z++;
      if (el == "1") {
        // console.log(z);
        let date = dayOfYearToMonthDay(z)
        exec_cmd(`git add . ; git commit --date="2010-${date.month}-${date.day} 00:01:09" -m "today is 2010-${date.month}-${date.day}"; git push -u origin master`)
        await sleep(10000);
      }
    }

  }
}
})()