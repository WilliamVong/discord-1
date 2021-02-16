const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let inviteEmbed = new Discord.MessageEmbed()
    .setColor("#d000a8")
    .setTitle('CommandStorm')
    .setDescription(`[Invite](https://discord.com/oauth2/authorize?client_id=811123536252108821&scope=bot+applications.commands&guild_id=undefined&permissions=8)`)
    .setTimestamp()
    message.channel.send(inviteEmbed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'invite',
    description: 'Returns an invite link for the bot.',
    usage: 'invite',
    example: 'invite (returns a link to invite bot)'
  };