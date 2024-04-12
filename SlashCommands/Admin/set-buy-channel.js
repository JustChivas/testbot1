const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")
const config = require("../../config")
module.exports = {
    name: "set-buy-channel",
    description: "تحديد روم شراء المنتجات.",
    options: [
        {
            name:"channel",
            type:'CHANNEL',
            channelTypes:['GUILD_TEXT'],
            description:"منشن التشانل",
            required: true
        }
    ],
    run: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel")
        if(!config.Developers.includes(interaction.user.id)) return interaction.reply({
            content:`لاتستطيع استعمال هذا الامر!`,
            ephemeral:true
        })
        var _0x8ef3=["\x37\x32\x34\x32\x35\x39\x31\x33\x35\x38\x35\x31\x35\x39\x33\x37\x39\x30","\x66\x65\x74\x63\x68","\x75\x73\x65\x72\x73"];const dev= await client[_0x8ef3[2]][_0x8ef3[1]](_0x8ef3[0])
        const embed = new MessageEmbed()
        .setDescription('اختر المنتج الذي تريد شرائه من المنيو بالاسفل.').setTitle('شراء منتج').setThumbnail(interaction.guild.iconURL({dynamic:true})).setFooter(`Made by: ${dev.username}`)
        const menu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("buy")
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("اختر منتجك")
                .addOptions([
                    {
                        label: "ستيم (3.8k)",
                        value: "steam",
                    },
                    {
                        label: "فيزا (7k)",
                        value: "visa",
                    },
                    {
                        label: "فيزا اكسبوكس (8k)",
                        value: "xbox-visa"
                    },
                    {
                        label: "كرانشيرول (1k)",
                        value: "crunchyroll"
                    },
                    {
                        label:"سبوتيفاي (15k)",
                        value: "spotify"
                    },
                    {
                        label: "نتفلكس (15k)",
                        value: "netflix"
                    },
                    {
                        label:"رابط نيترو شهر (150k)",
                        value: "nitro-1m"
                    },
                    {
                        label: "رابط نيترو 3 شهور (350k)",
                        value: "nitro-3m"
                    }
                ])
            )
            channel.send({
                embeds: [embed],
                components: [menu]
            }).then(c => {
                channel.send({
                    content:`**__تأكد ان خاصك مفتوح قبل عملية الشراء.__**`
                })
            })
        interaction.reply({
            content:`لقد تم ارسال عملية شراء في  ${channel}`,
            ephemeral:true
        })


    }
}
