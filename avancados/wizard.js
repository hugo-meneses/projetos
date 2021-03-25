const env = require('../.env')
const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')

let descricao = ''
let preco = 0
let data = null

const confirmacao = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sim', 's'),
    Markup.callbackButton('Não', 'n'),
]))

const precoHandler = new Composer()
precoHandler.hears(/(\d+)/, ctx =>{
    preco = ctx.match[1]
    ctx.reply('Qual dia o seu pagamento?')
    ctx.wizard.next()
})

precoHandler.use(ctx => ctx.reply('Informe apenas números'))

const dataHandler = new Composer()
dataHandler.hears(/(\d{2}\/\d{2}\/\d{4})/, ctx => {
    data = ctx.match[1]
    ctx.reply(`Resumo da sua compra:
        Descrição: ${descricao}
        Preço: ${preco}
        Data: ${data}
    Confirma?`, confirmacao)
    ctx.wizard.next()
})

dataHandler.use(ctx => ctx.reply('Informe a data com o formato dd/MM/YYYY'))

const confirmacaoHandler = new Composer()
confirmacaoHandler.action('s', ctx =>{
    ctx.reply('Compra confirmada com Sucesso!')
    ctx.scene.leave()
})

confirmacaoHandler.action('n', ctx => {
    ctx.reply('Compra não realizada ou cancelada!')
    ctx.scene.leave()
})

confirmacaoHandler.use(ctx => ctx.reply('Confirme', confirmacao))

const wizardCompra = new WizardScene('compra',
    ctx => {
        ctx.reply('Qual o item comprado por você?')
        ctx.wizard.next()
    },
    ctx => {
        descricao = ctx.update.message.text
        ctx.reply('O valor comprado foi?')
        ctx.wizard.next()
    },
    precoHandler,
    dataHandler,
    confirmacaoHandler
)

const bot = new Telegraf(env.token)
const stage = new Stage([wizardCompra], {default: 'compra'})
bot.use(session())
bot.use(stage.middleware())

bot.startPolling()