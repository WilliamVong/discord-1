const Discord = require("discord.js");
const superagent = require("superagent");
const fs = require("fs");

const modules = [
  "apis",
  "economy",
  "images",
  "info",
  "misc",
  "moderation",
  "music",
  "owner",
  "roleplay",
  "utility"
];

function permlevel(input) {
  if (input == 5) {
    return "Can only be used by owner of bot";
  }
  if (input == 4) {
    return "Can only be used by guild owner";
  }
  if (input == 3) {
    return "Manage Guild";
  }
  if (input == 2) {
    return "Ban Members";
  }
  if (input == 1) {
    return "Manage Messages";
  } else {
    return "Anyone can use this command!";
  }
}
exports.run = async (client, message, args, tools) => {
  if (!args[0]) {
    let categoryEmbed = new Discord.MessageEmbed()
      .setTitle("Categories of commands for CommandStorm")
      .setColor("#d000a8")

      .setDescription(
        "apis\nbot\neconomy\nimages\ninfo\nmoderation\nmusic\nowner\nroleplay\nutility"
      )
      .setFooter("CommandStorm")
      .setTimestamp();
    message.channel.send(categoryEmbed);
  } else {
    if (modules.includes(args[0])) {
      fs.readdir(`commands/${args[0]}`, (err, files) => {
        let filesArray = [];
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) {
          message.channel.send(
            "There are no commands in the directory " + args[0]
          );
          return;
        }

        let result = jsfiles.forEach((f, i) => {
          let props = require(`../../commands/${args[0]}/${f}`);
          filesArray.push(`${props.help.name}`);
        });

        let commandslist = filesArray.join("\n");

        let listEmbed = new Discord.MessageEmbed()
          .setTitle(`Commands in directory \"${args[0]}\"`)
          .setColor("#d000a8")

          .setDescription(commandslist)
          .setFooter("CommandStorm")
          .setTimestamp();

        message.channel.send(listEmbed);
      });
    } else {
      let command = args[0];
      if (client.commands.has(command)) {
        cmd = client.commands.get(command);
        let helpEmbed = new Discord.MessageEmbed()
          .setTitle(`Help for command ${cmd.help.name}`)
          .setColor("#d000a8")
          .setDescription(
            `Name: ${cmd.help.name}\nDescription: ${
              cmd.help.description
            }\nUsage: \`${cmd.help.usage}\`\nExample: \`${
              cmd.help.example
            }\`\nPermission Level: ${cmd.conf.permLevel} (${permlevel(
              cmd.conf.permLevel
            )})`
          )
          .setFooter("CommandStorm")
          .setTimestamp();
        message.channel.send(helpEmbed);
      } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
        cmd = client.commands.get(command);
        let helpEmbed = new Discord.MessageEmbed()
          .setTitle(`Help for command ${cmd.help.name}`)
          .setColor("#d000a8")

          .setDescription(
            `Name: ${cmd.help.name}\nDescription: ${
              cmd.help.description
            }\nUsage: \`${cmd.help.usage}\`\nExample: \`${
              cmd.help.example
            }\`\nPermission Level: ${cmd.conf.permLevel} (${permlevel(
              cmd.conf.permLevel
            )})`
          )
          .setFooter("CommandStorm")
          .setTimestamp();
        message.channel.send(helpEmbed);
      } else {
        return message.reply("That command doesn't exist!");
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "help",
  description:
    "Returns a list of categories of commands, a list of commands for a category, or help for a command itself.",
  usage: "help <command or category>",
  example: "help bot (returns list of commands for the bot category)"
};
