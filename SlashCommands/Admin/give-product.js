const { MessageEmbed } = require("discord.js")
const Accounts = require("../../Detabase/Accounts")
const config = require("../../config")
module.exports = {
    name: 'give-products',
    description: 'Send products to someone.',
    options: [
        {
            name:"user",
            description:"mention user",
            type: 'USER',
            required:true
        },
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
    let user = interaction.options.getUser("user")
    let product = interaction.options.getString('product')
    if(user.bot) return interaction.reply({content:`I cannot add coins to bots`,ephemeral:true})
    
    if(['visa','xbox-visa'].includes(product)) {
        const findData = await Accounts.find({
            type: product
        })
        if(findData.length === 0 || !findData) {
            interaction.reply({
                content:`The stock of \`${product}\` is \`0\``
            })
        } else if(findData) {
            var _0xf239=["\x72\x61\x6E\x64\x6F\x6D","\x6C\x65\x6E\x67\x74\x68","\x66\x6C\x6F\x6F\x72"];const visa=findData[Math[_0xf239[2]](Math[_0xf239[0]]()* findData[_0xf239[1]])]
            try {
                user.send({
                    embeds: [
                        new MessageEmbed().setTitle(`New: ${i.values[0]}`).setTimestamp().setFooter(`given by: ${interaction.user.username}`).addField("Number:",`${visa.Number}`).addField("Valid Untill:",`${visa.Time}`).addField("Cvv: (don't share it with anyone)",`||${visa.CVV}||`)
                    ]
                })
                client.channels.cache.get(config.Channel.Done).send({
                    embeds: [
                        new MessageEmbed().setAuthor(i.user.tag,i.user.displayAvatarURL({dynamic:true})).setDescription(`لقد تم اعطاء \`${product}\` ل ${user} من قبل ${interaction.user.username}`).setFooter(`Made by: ${dev.username}`)
                       ]
                })
                await Accounts.deleteOne({Number: visa.Number})
            } catch (e) {
                console.error(e)
                interaction.reply({
                    content:`Error: ${e}`,
                    ephemeral:true
                })
            }
        }
    } else if(['nitro-3m','nitro-1m'].includes(product)) {
        const findData = await Accounts.find({
            type: product,
        })
        if(findData.length === 0 || !findData) {
            interaction.reply({
                content:`The stock of \`${product}\` is \`0\``
            })
        } else if(findData) {
            var _0x6f1b=["\x72\x61\x6E\x64\x6F\x6D","\x6C\x65\x6E\x67\x74\x68","\x66\x6C\x6F\x6F\x72"];const links=findData[Math[_0x6f1b[2]](Math[_0x6f1b[0]]()* findData[_0x6f1b[1]])]
            try {
                user.send({
                    embeds: [
                        new MessageEmbed().setTitle(`New: ${product}`).setTimestamp().setFooter(`given by: ${interaction.user.username}`).addField("Link:", `${links.Link}`)
                    ]
                })
                client.channels.cache.get(config.Channel.Done).send({
                    embeds: [
                        new MessageEmbed().setAuthor(i.user.tag,i.user.displayAvatarURL({dynamic:true})).setDescription(`لقد تم اعطاء \`${product}\` ل ${user} من قبل ${interaction.user.username}`).setFooter(`Made by: ${dev.username}`)
                       ]
                })
                await Accounts.deleteOne({Link: links.Link})
            } catch (e) {
                console.error(e)
                interaction.reply({
                    content:`Error: ${e}`,
                    ephemeral:true
                })
            }
        }
    } else if(["steam",'crunchyroll','spotify','netflix'].includes(product)) {
        const findData = await Accounts.find({
            type: product,
        })
        if(findData.length === 0 || !findData) {
            interaction.reply({
                content:`The stock of \`${product}\` is \`0\``
            })
        } else if(findData){
            var _0xf6a6=["\x72\x61\x6E\x64\x6F\x6D","\x6C\x65\x6E\x67\x74\x68","\x66\x6C\x6F\x6F\x72"];const account=findData[Math[_0xf6a6[2]](Math[_0xf6a6[0]]()* findData[_0xf6a6[1]])]
            try {
                user.send({
                    embeds: [
                        new MessageEmbed().setTitle(`New: ${product}`).setTimestamp().setFooter(`given by: ${interaction.user.username}`).addField("Email:", `${account.email}`).addField("Password:",`${account.password}`)
                    ]
                })
                client.channels.cache.get(config.Channel.Done).send({
                    embeds: [
                        new MessageEmbed().setAuthor(i.user.tag,i.user.displayAvatarURL({dynamic:true})).setDescription(`لقد تم اعطاء \`${product}\` ل ${user} من قبل ${interaction.user.username}`).setFooter(`Made by: ${dev.username}`)
                       ]
                })
                await Accounts.deleteOne({email: account.email})
            } catch (e) {
                console.error(e)
                interaction.reply({
                    content:`Error: ${e}`,
                    ephemeral:true
                })
            }
        }
    }

}
}