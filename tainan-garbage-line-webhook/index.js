
const { bot } = require('./linebot.js')
const TaiwanGarbage = require('./service/TaiwanGarbage.js')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // verify
    console.log('req.rawBody', req.rawBody)
    const signature = req.headers['x-line-signature']
    if (!bot.verify(req.rawBody, signature)) {
        context.res = {
            status: 401,
            body: 'Verify fail'
        }
        return
    }

    const taiwanGarbageOpendataData = context.bindings.taiwanGarbageOpendataBlob
    const garbage = new TaiwanGarbage()
    garbage.load(taiwanGarbageOpendataData)
    console.log('taiwanGarbageOpendataData.length', taiwanGarbageOpendataData.length)
    for (const event of req.body.events) {
        event.garbage = garbage
    }

    await bot.parse(req.body)

    context.res = {
        body: 'ok'
    };
}