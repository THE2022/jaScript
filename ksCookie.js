/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写快手账号cookie。
let CookieJDs = [
  'kuaishou.api_st=Cg9rdWFpc2hvdS5hcGkuc3QSoAEI3x892ZpsHAnnaeDvBbrSA8cwAFW793WYzixEoaVGtVEeL1LIv-CSW44utJS6nUKWDU_Dw0Rh23QGWk3_3EO9OcU8XDA0ny7U1QXPAE1tCWc5MDshDyEIb_PndQZ9HyVnnX5r6J7JajNAmQQqpxRzfXG_dLhAdb5xvdfghAtdUBPUy6UpFKhYU3bnWgHp4QCBzoUuDoNFkhK811UuYEQYGhJPQv6ZTt1N5roF-otIWYG6ZJsiIKBCl21Z4tt8ckOj3vJB0GmiQZrBPrEaKNjMMicn2utnKAUwAQ;',//账号一ck,例:kuaishou.api_st=xxxxx;
  'kuaishou.api_st=Cg9rdWFpc2hvdS5hcGkuc3QSoAGjR5i81K0k7ulhDdXkRP2j9Ub-4EvwQ5ztq_y5S--6p3VKkOnbcplcpWwfdisvQmnYmCnzBSkVfpCcKuJyHiS_FVi618KvPgKx6WL9zwCW56Z976mV6ecxToKbOq-SyJRYUa-Fu9ac7URVpV6iyce6HI--BYZ15tUTT64zaY-1-11SG03IvwdABSfaKQMYdxBi4DlZ0pWnRn-HWrlFzc1gGhJEJSDbmRFB8aBbsn7UJvfzpQciIE3JGWpA8-1XXTpaV5kN6MEfwn0zEO0JttvZWH_GSPWYKAUwAQ;',//账号二ck,例:kuaishou.api_st=xxxxx;
]
// 判断环境变量里面是否有快手ck
if (process.env.ksjsbCookie) {
  if (process.env.ksjsbCookie.indexOf('@') > -1) {
    CookieJDs = process.env.ksjsbCookie.split('@');
  } else if (process.env.ksjsbCookie.indexOf('\n') > -1) {
    CookieJDs = process.env.ksjsbCookie.split('\n');
  } else {
    CookieJDs = [process.env.ksjsbCookie];
  }
}
if (JSON.stringify(process.env).indexOf('GITHUB')>-1) {
  console.log(`请勿使用github action运行此脚本,无论你是从你自己的私库还是其他哪里拉取的源代码，都会导致我被封号\n`);
  !(async () => {
    await require('./sendNotify').sendNotify('提醒', `请勿使用github action、滥用github资源会封我仓库以及账号`)
    await process.exit(0);
  })()
}
CookieJDs = [...new Set(CookieJDs.filter(item => !!item))]
console.log(`\n====================共${CookieJDs.length}个快手账号Cookie=========\n`);
console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)
if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
for (let i = 0; i < CookieJDs.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieJDs[i].trim();
}
