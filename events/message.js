const Discord = require('discord.js');
const settings = require('../settings.json');
const fs = require("fs");
const superagent = require('superagent');
const db = require('../database.json');
const mongoose = require('mongoose');
const Settings = require("../models/settings.js")

module.exports = async message => {
    let guildSettings = await Settings.findOne({
        guildID: message.guild.id
    })
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;

    let client = message.client;
    if (!guildSettings) {
        let prefix = settings.prefix;
        if (!message.content.startsWith(prefix)) return;
        let command = message.content.split(' ')[0].slice(prefix.length);
        let params = message.content.split(' ').slice(1);
        let perms = client.elevation(message);
        let cmd;
        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }
        if (cmd) {
            if (perms < cmd.conf.permLevel) {
                console.log(`Command: ${settings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
                return;
            }
            cmd.run(client, message, params, perms);
            console.log(`Command: ${settings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
        }
    } else {
        let prefix1 = guildSettings.prefix;
        if (!message.content.startsWith(prefix1)) return;
        let command = message.content.split(' ')[0].slice(prefix1.length);
        let params = message.content.split(' ').slice(1);
        let perms = client.elevation(message);
        let cmd;
        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }
        if (cmd) {
            if (perms < cmd.conf.permLevel) {
                console.log(`Command: ${guildSettings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
                return;
            }
            cmd.run(client, message, params, perms);
            console.log(`Command: ${guildSettings.prefix}` + cmd.help.name + " - Guild: " + message.guild.name + " ID: " + message.guild.id)
        }
    }


};
