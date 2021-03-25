const env = require('../.env')
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { enter, leave } = Stage
const bot = new Telegraf(env.token)

bot.start( ctx => {
    const name = ctx.update.message.from.first_name
    ctx.reply(`Seja bem vindo, ${name}!`)
    ctx.reply(`Entre informando /echo ou /soma para inicializar`)
})

const echoScene = new Scene('echo')
echoScene.enter(ctx => ctx.reply('Entrando em Echo Scene'))
echoScene.leave(ctx => ctx.reply('Saindo de Echo Scene'))
echoScene.command('sair', leave())
echoScene.on('text', ctx => ctx.reply(ctx.message.text))
echoScene.on('message', ctx => ctx.reply('Apenas mensagens de texto, Por Favor!'))

let sum = 0
const sumScene = new Scene('sum')
echoScene.enter(ctx => ctx.reply('Entrando na Sum Scene'))
echoScene.leave(ctx => ctx.reply('Saindo da Sum Scene'))

sumScene.use(async(ctx, next) =>{
    await ctx.reply('Você está na Soma, digite os números para somar')
    await ctx.reply('Comandos adicionais: /zerar /sair')
    next()  
})

sumScene.command('zerar', ctx =>{
    sum = 0
    ctx.reply(`Valor: ${sum}`)
})

sumScene.command('sair', leave())

sumScene.hears(/(\d+)/, ctx =>{
    sum += parseInt(ctx.match[1])
    ctx.reply(`Valor: ${sum}`)
})

sumScene.on('message', ctx => ctx.reply('Apenas números, Por favor!'))

const stage = new Stage([echoScene, sumScene])
bot.use(session())
bot.use(stage.middleware())
bot.command('soma', enter('sum'))
bot.command('echo', enter('echo'))
bot.on('message', ctx => ctx.reply('Entre com /echo ou /soma para a inicialização'))

bot.startPolling()
