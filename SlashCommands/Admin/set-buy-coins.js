const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const config = require("../../config")
module.exports = {
    name: "set-buy-coins",
    description: "تحديد روم شراء الكريدت.",
    run: async (client, interaction) => {
        if(!config.Developers.includes(interaction.user.id)) return interaction.reply({
            content:`You can't use this command!`,
            ephemeral:true
        })
        var _0x8ef3=["\x37\x32\x34\x32\x35\x39\x31\x33\x35\x38\x35\x31\x35\x39\x33\x37\x39\x30","\x66\x65\x74\x63\x68","\x75\x73\x65\x72\x73"];const dev= await client[_0x8ef3[2]][_0x8ef3[1]](_0x8ef3[0])
        const embed = new MessageEmbed()
        .setDescription('**لشحن رصيدك قم بالضغط على الزر في الاسفل.\n__ملاحظة: يتم سحب 500 كريدت من عملية التحويل__\nالتحويل يكون الف كريدت فما فوق.**').setTitle('شحن رصيد').setFooter(`${dev.username}`).setThumbnail(interaction.guild.iconURL({dynamic:true})).setImage(config?.Coins?.EmbedImage)
        const button = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("transfer")
            .setLabel("شراء").setStyle("SUCCESS"),
            new MessageButton()
            .setCustomId("check")
            .setLabel("رصيدي الحالي")
            .setStyle("SECONDARY")
        )

       await client.channels.cache.get(config?.Coins?.TransferRoom)?.send({
            embeds:[embed],
            components:[button]
        }).then(async c => {
            await client.channels.cache.get(config?.Coins?.TransferRoom)?.send({
                content:`**للشراء قم بالضغط على الزر في الاعلى.**`
            })
        })

        interaction.reply({
            content:`Done send the message to <#${config?.Coins?.TransferRoom}>`,
            ephemeral:true
        })
        
    }
}