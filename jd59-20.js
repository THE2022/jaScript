// 包含请求模块
var request = require("request");
var restartTime = 0
var errorDescList = ['很抱歉，没抢到', '哎呦，网络拥堵，请刷新后试试哦']
var stopDescList = ['活动太火爆，休息一会再来哟~~']
var isSuccess = true
var errorExists = false
var errorDescArr = []
var jdCookie = $store.get('jdCookie')
// var jdCookie = 'webp=1; __jdc=122270672; mba_muid=1648101355721263982410; visitkey=53769464881346099; shshshfpa=7d4f6a79-75c1-778b-9fe4-ab8678735f44-1648101364; shshshfpb=frrHfsacX6etxeFpImwh4Eg; whwswswws=; autoOpenApp_downCloseDate_auto=1648101821050_1800000; downloadAppPlugIn_downCloseDate=1648101838158_1800000; retina=1; cid=9; appCode=ms0ca95114; __jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1650906535106; share_cpin=; share_open_id=; share_gpin=; shareChannel=; source_module=; erp=; sc_width=360; equipmentId=2VWW55DIPAQTRSDPMAXKI42IRBED3CTZYXE2EMFSO7BVA74LGSBKFSYLWAK5UXYASWBG3AK2FWBUBHM7DV2XPPRVBY; fingerprint=4d606852443623c3225066660b32ba87; deviceVersion=87.0.23.184.0; deviceOS=android; deviceOSVersion=10; deviceName=Chrome; jcap_dvzw_fp=54GV9ypPyzMs5cIZ9C_EMhyHwEGbd1FX8yLZ-xwFe5FMe_jzkLep-xORdNmLKRkPC96FIQ==; TrackerID=ij7OXDnCXi1J6kRrlhp8r7hSgFAeYYRQUn7-Sx4Qs8phDkuTRoJgzwml3SWo-6ds33H3s5HsS_fb15mTy3R9HcLNdT0wkq1Xezan79dEU0y9uaHOk31d7-QwBGnNOjee2c0XFNI6D1IB43zhhPY8WQ; pt_key=AAJiZtX_ADBP7ct2ORpd2-tdrjPSd9EGm0x0TUn6-bl-EbXKccnpu8GSVSHdm99cWrLD9F6grHc; pt_pin=jd_79aea3106869d; pt_token=vk4f9kss; pwdt_id=jd_79aea3106869d; shshshfp=4bc905048e69fa0857c45098882130ad; wxa_level=1; jxsid=16516045554370702779; autoOpenApp_downCloseDate_jd_homePage=1651604556261_1; wqmnx1=MDEyNjM4Ny9qeS44NDlhaWQ7KWU3VGUgODFiYTMxIHIuOzFzZjQyRUgmUg%3D%3D; __wga=1651604561429.1651604561429.1650906535085.1648101363677.1.3; PPRD_P=UUID.1648101355721263982410; __jda=122270672.1648101355721263982410.1648101355.1650906535.1651604561.3; jxsid_s_t=1651604561732; jxsid_s_u=https%3A//home.m.jd.com/myJd/home.action; shshshsID=2e29f429159c94e52d61d3245eeaf214_1_1651604562714'

if (!jdCookie) {
    console.error('本次运行结束!请填写COOKIE!')
    errorExists = true
}
mainTask()

function mainTask() {
    var option = {
        url: 'https://api.m.jd.com/client.action?functionId=receiveNecklaceCoupon&clientVersion=9.5.2&client=android&uuid=unknown&st=1621365309780&sign=614a046a6d266e6d06113e90edb1d9bf&sv=111&body=%7B%22extend%22%3A%22CE04067719A2789F05A5399B36E879696C2BD7A8CD65FF63254F05FBC29ECC48D648F5B0E7329A8BEA05F30DC14C741A1318E35C21BE7DC1FCC8AD59A729E468D4E097496F48E437B8389AAADB10251EBFD2C43396DB49BF931E3A9A7B739FA11D369DB32BFB27C75265D38EF4FDDADA787266042BE7A4C5FF4792DA5F414D7CEF1EA4A13C97AEA9472F414DF80AC24483F31A4CD518B6822B03F240082B915869680133904D02D9B0A08BA81D506A129EAA611DDFBA5DA125776C38B15D74EBEDADDF37CDCC6B50ECD05CDBDD50292BEA84013CEE8F827FC019C6EA5E37EDD4%22%2C%22rcType%22%3A%224%22%2C%22source%22%3A%22couponCenter_app%22%7D',
        headers: {
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'cache-control': 'max-age=0',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Microsoft Edge";v="101"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'Cookie': jdCookie,
        }
    };
    request(option, (error, response, data) => {
        var res = JSON.parse(data);
        if (res.code == '3') {
            console.log('登录失效!请重新获取Cookie')
            mySendNotify(
                'js59-20脚本执行日志-登录失效!',
                `登录失效!请重新获取Cookie! \\
                            ${res.msg}`
            )
            return
        } else {
            if (res.result) {
                var desc = res.result.desc
                if (errorDescList.includes(desc)) {
                    console.log(desc) //{ optCode: '9002', desc: '哎呦，网络拥堵，请刷新后试试哦' }
                    errorDescArr.push(desc)
                    isSuccess = false
                    restartTime++
                    if (restartTime <= 25) {
                        setTimeout(function() {
                            console.log("重试中!!!!") 
                            mainTask()
                        }, 500)
                    } else {
                        mySendNotify(
                            'js59-20脚本执行日志-未抢到！',
                            `未抢到 \\
                                        ${errorDescArr.join(` \\
                                        `)}`
                        )
                        console.log(
                            `=========脚本结束 - 北京时间(UTC+8)：${new Date(
                      new Date().getTime() +
                        new Date().getTimezoneOffset() * 60 * 1000 +
                        8 * 60 * 60 * 1000
                    )
                      .toLocaleString('zh', { hour12: false })
                      .replace(' 24:', ' 00:')}=========\n`
                        )
                    }
                } else {
                    isSuccess = true
                    console.log(desc) //{ optCode: '9002', desc: '活动太火爆，休息一会再来哟~~' }
                    if (stopDescList.includes(desc)) {
                        mySendNotify('js59-20脚本执行日志-未抢到！',
                            `${errorDescArr.join(` \\
                                        `)} \\ 
                                        Finally: ${desc}
                                        `)
                    } else {
                        if (isSuccess) {
                            mySendNotify(
                                'js59-20脚本执行日志-抢到了！',
                                `恭喜你抢到优惠券！ \\
                                            ${desc}+${res}`
                            )
                        }
                    }
                    console.log(
                        `=========脚本结束 - 北京时间(UTC+8)：${new Date(
                    new Date().getTime() +
                      new Date().getTimezoneOffset() * 60 * 1000 +
                      8 * 60 * 60 * 1000
                  )
                    .toLocaleString('zh', { hour12: false })
                    .replace(' 24:', ' 00:')}=========\n`
                    )
                }
            }
        }
    });
}

function mySendNotify(title, content) {
    var xizhiToken = $store.get('xizhiToken');
    if (!xizhiToken) {
        console.error('跳过通知推送！')
        return
    }
    var url = `https://xizhi.qqoq.net/${xizhiToken}.send?title=${encodeURI(title)}&content=${encodeURI(content)}`
    request(url, (data) => {
        console.log('已尝试发送通知！', data)
    })
}