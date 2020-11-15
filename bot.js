const Discord = require('discord.js')

const fetch = require ('node-fetch')

const bot = new Discord.Client()
const token = process.env.BOT_TOKEN
bot.on('ready',() => {
  console.log('Bot online')
  bot.user.setPresence({
        status: "online",  // You can show online, idle... Do not disturb is dnd
        game: {
            name: "around the house eating dust",  // The message shown
            type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
})

const prefix = '!'
bot.on('message', async (msg) => {
  console.log('>>> ' + msg.content);
  if (msg.content === 'good bot') {
    msg.reply(':)')
    return
  }

  if (msg.content === 'bad bot') {
    if (Math.random() < 0.3333) {
      msg.reply('piss off flesh bag')
    } else if (Math.random() > 0.6666) {
      msg.reply(':(')
    } else {
      msg.reply('bad human')
    }
    return
  }
  if(msg.content[0] !== prefix) {
    console.log('no prefix')
    return
  }

  const args = msg.content.slice(prefix.length).trim().split(' ')
  console.log(args)
  const command = args.shift().toLowerCase()
  console.log(command)

  if(command === 'yesno') {
    //msg.react(':smiley:')
    //msg.reply('ok')
    if (Math.random() > 0.5) {
      msg.reply('yes')
    } else {
      msg.reply('no')
    }
    return
  }
  
 /* if (command === 'pog') {
	console.log('pogging')
	const reactionEmoji = msg.guild.emojis.cache.find(emoji => emoji.name === 'pog');
	 msg.react(reactionEmoji);
  }
	
  if (command === 'soviet') {
	console.log('union')
	const reactionEmoji = msg.guild.emojis.cache.find(emoji => emoji.name === 'soviet');
	 msg.react(reactionEmoji);
  }
	
  if (command === 'omba') {
	console.log('ombing')
	const reactionEmoji = msg.guild.emojis.cache.find(emoji => emoji.name === 'omba');
	 msg.react(reactionEmoji);
  }*/
	
  if(command === 'joke') {
      let getJoke = async () => {
        let result = await fetch('https://official-joke-api.appspot.com/random_joke')
        let json = await result.json()
        return json
      }

      
      let joke = await getJoke()

      msg.reply(`
      Here's your joke:
      
      ${joke.setup}
      
      ${joke.punchline}
      `)
      return
  }

  if(command === 'help') {
    msg.reply(`Commands:
    !yesno: ask a yes or no question and I will reply with yes or no.
    !ok: ok
    !joke: gets a random joke off of the internet
    bad bot: dont say this as it saddens me
    good bot: :)
    say any emoji/custom emoji name (ex. !pog) and i will react to your message with it.`)
    return
  }                  
              
  if(command === 'ok') {
      msg.reply('ok')
      return
  }

  if (command === "clear") {
    let num = 2;
    if (args[0]) {
      num = parseInt(args[0]) + 1;
    }
    const user = msg.mentions.users.first()
    console.log('USER:')
    console.log(user)
    if (user != null) {
      console.log('Messages:')
      //const messageList = msg.channel.message.fetch({limit: 100})
      const msgList = msg.channel;
      //console.log(msgList.messages.fetch({limit: 100}))
      //console.log(msgList.messageList.fetch({limit: 100}))
    } else {
      console.log(`Bulk delete of ${num} messages`);
      msg.channel.bulkDelete(num);
      msg.channel.send(`${args[0]} posts deleted.`)
    }
    //const messageList = msg.channel.message.fetch({limit: 100})
    //console.log(msg.channel.message)
    return
  }
	
	console.log('emoji search started:' + command)
	const reactionEmoji = msg.guild.emojis.cache.find(emoji => emoji.name === command);
	if(reactionEmoji != null){
	    console.log('emoji ready')
	    msg.react(reactionEmoji);
	}

})
bot.login(token)
