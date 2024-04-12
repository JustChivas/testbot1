const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const config = require("../../config")
module.exports = {
    name: "reset",
    description: 'reset all messages in channel.',
    run: async (client, interaction) => {
        if(!config.Developers.includes(interaction.user.id)) return interaction.reply({
            content:`You can't use this command!`,
            ephemeral:true
        })
      const channel = await client.channels.cache.get(config.Coins.TransferRoom)
      channel.messages.fetch({
        limit: 100
      }).then((messages) => {
        const userMsg = [];
        messages.filter(m => m.author.id !== client.user.id).forEach(msg => userMsg.push(msg))
        channel.bulkDelete(userMsg)
    });
    channel.permissionOverwrites.set([
        {
           id: channel.guild.roles.everyone,
           deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
        },
      ]);
    interaction.reply({
        content:`Done deleted all messages in ${channel}`,
        ephemeral:false
    })
    }
}