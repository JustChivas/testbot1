
const { Intents } = require("discord.js");
const Client = require("./Structures/Client.js");
const config  = require("./config.js");
const client = new Client({
    partials: ['MESSAGE'],
    intents: [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
});

module.exports = client;

 require("./Structures/Event")(client)
 require("./Structures/slashCommand")(client)


client.login(process.env.TOKEN);