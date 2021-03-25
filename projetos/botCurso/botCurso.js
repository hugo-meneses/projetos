const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const axios = require('axios')
const bot = new Telegraf(env.token)

const tecladoOpcoes = Markup.keyboard ([
    ['O que são bots?', 'O que veremos no curso?'],
    ['Posso automatizar as tarefas?'],
    ['Como adquirir o curso?']
]).resize().extra()

const botoes = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('Sim', 's'),
    Markup.callbackButton('Não', 'n')
], {columns: 2}))

const localizacao = Markup.keyboard([
    Markup.locationRequestButton('Clique aqui para enviar sua localização')
]).resize().oneTime().extra()

bot.start( async ctx => {
    const nome = ctx.update.message.from.first_name
    await ctx.replyWithMarkdown(`*Olá, ${nome}!*\nEu sou o ChatBot do curso`)
    await ctx.replyWithPhoto('http://files.cod3r.com.br/curso-bot/bot.png')
    await ctx.replyWithMarkdown(`_Posso te ajudar em algo?_`, tecladoOpcoes)
})

bot.hears('O que são bots?', ctx => {
    ctx.replyWithMarkdown('Um bot é uma ferramenta para conversar com seu cliente em linguagem natural.', tecladoOpcoes)
})

bot.hears('O que veremos no curso?', async ctx => {
    await ctx.replyWithMarkdown('No *curso* criaremos 3 projetos:')
    await ctx.reply('1. Bot para gerenciar lista')
    await ctx.reply('2. Bot para cadastrar seus eventos')
    await ctx.reply('3. Bot para simular um bot lista')
    await ctx.replyWithMarkdown('\n\n_Algo Mais_?', tecladoOpcoes)
})

bot.hears('Posso automatizar as tarefas?' , async ctx => {
    await ctx.replyWithMarkdown('\n\n_Deseja verificar como funciona_?', botoes)
})

bot.hears('Como adquirir o curso?', ctx => {
    ctx.replyWithMarkdown('Que bom... [link](https://www.cod3r.com.br/)', tecladoOpcoes)
})

bot.action('n', ctx => {
    ctx.reply('Ok, sem problemas 😩', tecladoOpcoes)
})

bot.action('s', async ctx => {
    await ctx.reply(`Que legal, tente me enviar a sua localização, ou escreva uma mensagem qualquer...`, localizacao)
})

bot.hears(/mensagem qualquer/i, ctx => {
    ctx.reply('Mensagem inesperada, tenta outra...', tecladoOpcoes)
})

bot.on('text', async ctx => {
    let msg = ctx.message.text
    msg = msg.split('').reverse().join('')
    await ctx.reply(`A Mensagem lida contrário foi essa:${msg}`)
    await ctx.reply('O bot demonstrou sua eficiência na detecção da mensagem!')
})

bot.on('location', async ctx => {
    try {
        const url = 'http://api.openweathermap.org/data/2.5/weather'
        const { latitude: lat, longitude: lon } = ctx.message.location
        //console.log(lat,lon)
        const res = await axios.get(`${url}?lat=${lat}&lon=${lon}&APPID=7a74eacd75fab92716916353f5beba39&units=metric`)
        await ctx.reply(`Você está em ${res.data.name}`)
        await ctx.reply(`A temperatura está por volta de ${res.data.main.temp}°C`, tecladoOpcoes)
    }catch(e) {
        ctx.reply(`Não foi possível acessar sua localização 😞 `, tecladoOpcoes)
    }
})

bot.startPolling()