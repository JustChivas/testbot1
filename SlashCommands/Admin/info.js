const { MessageEmbed, MessageActionRow } = require("discord.js")
const Accounts = require("../../Detabase/Accounts")
const config = require("../../config")
module.exports = {
    name: 'info',
    description: 'Show available products.',
    options: [
        {
            name:"product",
            description:"اختر اي شي من الخيارات الظهارة امامك.",
            type:'STRING',
            required:true,
            choices: [
                {name: "Steam", value: "steam"},
                {name: "Nitro-1month",value: "1month"},
                {name: "Nitro-3month",value: "3month"},
                {name: "Visa",value: "visa"},
                {name: "Visa-Xbox",value: "xbox-visa"},
                {name: "Crunchyroll",value: "crunchyroll"},
                {name: "Spotify",value: "spotify"},
                {name: "Netflix",value: "netflix"},
            ]
        }
    ],
    run: async (client, interaction) => {
    if(!interaction.member.permissions.has("ADMINISTRATOR"))return interaction.reply({content:`You can't use this interaction.`,ephemeral:true})
    var _0x8ef3=["\x37\x32\x34\x32\x35\x39\x31\x33\x35\x38\x35\x31\x35\x39\x33\x37\x39\x30","\x66\x65\x74\x63\x68","\x75\x73\x65\x72\x73"];const dev= await client[_0x8ef3[2]][_0x8ef3[1]](_0x8ef3[0])
        let product = interaction.options.getString("product")
        if(['visa','xbox-visa'].includes(product)) {
            const findData = await Accounts.find({
                type: product
            })
            if(findData.length === 0 || !findData) {
               return interaction.reply({
                content:`The stock of \`${product}\` is \`0\``
               })
            } else {
                const ed = findData.map((mention) => {
                    return [
                        `**ID:** ${mention._id}\n`,
                        `**${product}:** __${mention.Number}__**:**__${mention.Time}__**:**__${mention.CVV}__\n\n`,
                    ].join(' ')
                });
                const embed = new MessageEmbed()
                .setTitle(`${product}:`)
                .setDescription(`${ed}`).setFooter(`Made by: ${dev.username}`).setColor('RANDOM')
                interaction.reply({
                    embeds: [embed]
                })
            }
        } else if(['nitro-3m','nitro-1m'].includes(product)) {
            const findData = await Accounts.find({
                type: product,
            })
            if(findData.length === 0 || !findData) {
                return interaction.reply({
                    content:`The stock of \`${product}\` is \`0\``
                })
            } else {
                const ed = findData.map((mention) => {
                    return [
                        `**ID:** ${mention._id}\n`,
                        `**Link:** ${mention.Link}\n\n`
                    ].join(" ")
                })
                const embed = new MessageEmbed()
                .setTitle(`${product}:`)
                .setDescription(`${ed}`).setFooter(`Made by: ${dev.username}`).setColor('RANDOM')
                interaction.reply({
                    embeds: [embed]
                })
            }
        } else if(["steam",'crunchyroll','spotify','netflix'].includes(product)) {
            const findData = await Accounts.find({
                type: product,
            })
            if(findData.length === 0 || !findData) {
                return interaction.reply({
                    content:`The stock of \`${product}\` is \`0\``
                })
            } else {
                const ed = findData.map((mention) => {
                    return [
                        `**ID:** ${mention._id}\n`,
                        `**Email:** ${mention.email}\n`,
                        `**Password:** ${mention.password}\n\n`
                    ].join(' ')
                })
                const embed = new MessageEmbed()
                .setTitle(`${product}:`)
                .setDescription(`${ed}`).setFooter(`Made by: ${dev.username}`).setColor('RANDOM')
                interaction.reply({
                    embeds: [embed]
                })
            }
            
            }
    }
}