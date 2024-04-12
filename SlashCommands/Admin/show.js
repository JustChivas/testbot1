const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "show",
    description: "اظهار شات.",
    options: [
        {
            name:"channel",
            type:'CHANNEL',
            channelTypes: ['GUILD_TEXT'],
            required:true,
            description:"Mention channel to show it!"
        },
    ],
    run: async (client, interaction) => {
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content:`You can't use this interaction!`, ephemeral:true})
        const channel = interaction.options.getChannel("channel")
        
        await channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(role => role.name === '@everyone'), { VIEW_CHANNEL: true });

        return interaction.reply({content:`Done Unhide ${channel}`})

    }
}