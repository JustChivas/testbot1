const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "say-embed",
    description: "Embed",
    options: [
        {
            name:"channel",
            type:'CHANNEL',
            channelTypes: ['GUILD_TEXT'],
            required:true,
            description:"Mention channel where embed go in!"
        },
        {
            name:"title",
            type:'STRING',
            required:true,
            description:"Title Embed."
        },
        {
            name:"description",
            type:'STRING',
            required:true,
            description:"Description Embed."
        },
        {
            name:"image",
            type:"ATTACHMENT",
            require:false,
            description:'Image Embed.'
        },
        {
            name:"color",
            type:'STRING',
            required:false,
            description:"Color Embed."
        },
    ],
    run: async (client, interaction) => {
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content:`You can't use this interaction!`, ephemeral:true})

        const channel = interaction.options.getChannel("channel")
        const title = interaction.options.getString("title")
        const description = interaction.options.getString("description")
        let color = interaction.options.getString("color")
        if(!color) color = 'RANDOM'
        let image = interaction.options.getAttachment("image")
            const embed = new MessageEmbed()
            .setTitle(`${title}`).setDescription(`${description}`).setColor(color).setThumbnail(interaction.guild.iconURL({dynamic:true})).setImage(image?.url)
            try {
                await channel.send({embeds:[embed]})
                interaction.reply({content:`Done Send The embed to ${channel}`, ephemeral:true})
            } catch (e) {
                console.error(e)
               return interaction.reply(`${e.message}`)
            }
    }
}