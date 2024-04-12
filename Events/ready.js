const Discord = require('discord.js');
const data = require('../Detabase/Ppl')
const config = require("../config")
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Modal, TextInputComponent } = require("discord.js");
const tax =  require("probot-tax")
const Accounts = require('../Detabase/Accounts');
const Ppl = require('../Detabase/Ppl');

module.exports = async (client) => {
var _0x8ef3=["\x37\x32\x34\x32\x35\x39\x31\x33\x35\x38\x35\x31\x35\x39\x33\x37\x39\x30","\x66\x65\x74\x63\x68","\x75\x73\x65\x72\x73"];const dev= await client[_0x8ef3[2]][_0x8ef3[1]](_0x8ef3[0])
   client.user.setPresence({
        status: "online",
        activities: [
            {
                name: `${dev.username}`,
                type: "WATCHING"
            }
        ]
    });
    console.log(`Logged in as ${client.user.tag}.`);

    client.on("interactionCreate", async i => {
        if(i.customId === "check") {
            const findData = await data.findOne({
                User: i?.user?.id,
            })
            if(findData) {
                await i.reply({
                    content:`**رصـيـد حـسـابـك هـو : \`${findData.Coins}$\`**`,
                    ephemeral:true
                })
            } else if(!findData || findData === null) {
                await i.reply({
                    content:`**لـيـس لـديـك رصـيـد كـاف!**`,
                    ephemeral:true
                })
            }
        } else if(i.customId === "transfer") {
            const fields = {money: new TextInputComponent().setStyle("SHORT").setCustomId("money").setLabel("اكتب المبلغ الذي تريد دفع كريدت به").setMinLength(1).setMaxLength(4000).setPlaceholder("مثال: 10k").setRequired(true)}
            const modal = new Modal().setCustomId("getmoney").setTitle("شراء عملة البوت").setComponents(
                new MessageActionRow().addComponents(fields.money))
                await i.showModal(modal)
                const d = await i.awaitModalSubmit({
                    time:400000,
                    filter: interaction => i.user.id === interaction.user.id
                }).catch(e => console.error(e))
                if(d) {
                const [ money ]=Object["keys"](fields)["map"]((key)=>{return d["fields"]["getTextInputValue"](fields[key]["customId"])})
                if(money == isNaN) return d.reply({
                    content:`**Type a valid number.**`,
                    ephemeral:true
                })
                if(money < 1000) return d.reply({
                    content:`**Type number above \`1000\`**`,
                    ephemeral:true
                })
                const taxx = require('probot-taxs');
                let p = taxx.specific(money, '500', true).tax
                let f = taxx.specific(money, "500", true).difference
                const final = p - f - 500
                
                i.channel.permissionOverwrites.edit(i.user.id, {SEND_MESSAGES: true})
                var _0x87f8=["\x2A\x2A\x3A\x6D\x6F\x6E\x65\x79\x62\x61\x67\x3A\x20\x7C\x20","\x75\x73\x65\x72\x6E\x61\x6D\x65","\x75\x73\x65\x72","\x2C\x20\x68\x61\x73\x20\x74\x72\x61\x6E\x73\x66\x65\x72\x72\x65\x64\x20","\x73\x74\x61\x72\x74\x73\x57\x69\x74\x68","\x63\x6F\x6E\x74\x65\x6E\x74","","\x44\x65\x76\x65\x6C\x6F\x70\x65\x72\x73","\x69\x6E\x63\x6C\x75\x64\x65\x73","\x69\x64","\x61\x75\x74\x68\x6F\x72","\x50\x72\x6F\x62\x6F\x74\x49\x64","\x43\x6F\x69\x6E\x73"];const fil=(_0xcfa4x2)=>{return _0xcfa4x2[_0x87f8[5]][_0x87f8[4]](`${_0x87f8[0]}${i[_0x87f8[2]][_0x87f8[1]]}${_0x87f8[3]}`)&& _0xcfa4x2[_0x87f8[5]][_0x87f8[8]](`${_0x87f8[6]}${config[_0x87f8[7]]}${_0x87f8[6]}`)&& _0xcfa4x2[_0x87f8[10]][_0x87f8[9]]=== config[_0x87f8[12]][_0x87f8[11]]&& _0xcfa4x2[_0x87f8[5]][_0x87f8[8]](Number(p- f))}
                d.reply({content:`c ${config.Developers} ${p}`, ephemeral:true})
                i.channel.awaitMessages({filter: fil, max:1}).then(async done => {
                   const findData = await Ppl.findOne({
                    User: i.user.id,
                   })
                   if(findData) {
                const da = await Ppl.findOne({User: i.user.id})
                da.Coins += final
                da.save();
                    i.followUp({
                        content:`**تمت الاضافة \`${final}$\` رصيدك الى.**`,
                        ephemeral:true
                    })
                    await client.channels.cache.get(config
                        .Channel.Done).send({
                            embeds: [
                                new MessageEmbed().setAuthor(i.user.tag,i.user.displayAvatarURL({dynamic:true})).setDescription(`تم شحن \`${final}$\` من قبل ${i.user}`).setFooter(`Made by: ${dev.username}`)
                               ]
                        })
                   } else if(!findData) {
                    const newData = await Ppl.create({
                        guildID: i.guild.id,
                        User: i.user.id,
                        Coins: final
                    });
                    (await newData).save()
                    i.followUp({
                        content:`**Done added \`${final}$\` to your balance.**`,
                        ephemeral:true
                    })
                 }
               }).then(d => {
                i.channel.permissionOverwrites.edit(i.user.id, {SEND_MESSAGES: false})
                  i.channel.messages.fetch({
                    limit: 10
                  }).then((messages) => {
                    const userMsg = [];
                   messages.filter(m => m.author.id !== client.user.id).forEach(msg => userMsg.push(msg))
                    i.channel.bulkDelete(userMsg)
                    
                });
               })
        }
    } 
    })

        client.on("interactionCreate", async i => {
            if(!i.isSelectMenu()) return;
        if(["steam",'crunchyroll','spotify','netflix'].includes(i.values[0])) {
            i.message.edit(`_ _`)
            const findData = await Accounts.find({
                type: i.values[0]
            })
            const checkUser = await Ppl.findOne({
                User: i.user.id,
            })
            if(findData.length === 0 || !findData) {
                i.reply({
                    content:`The stock of \`${i.values[0]}\` is \`\`0\`\``,
                    ephemeral:true
                })
            } else if(findData) {
                const ac = await Accounts.findOne({type: i.values[0]})
                const da = await Ppl.findOne({User: i.user.id})
                 if(checkUser.Coins < ac.price) {
                     i.reply({
                         content:`**You don't have enough money.**`,
                         ephemeral:true
                     })
                } else if(checkUser.Coins >= ac.price) {
                    da.Coins -= ac.price
                    da.save();
                    var _0x23a8=["\x72\x61\x6E\x64\x6F\x6D","\x6C\x65\x6E\x67\x74\x68","\x66\x6C\x6F\x6F\x72"];const acc=findData[Math[_0x23a8[2]](Math[_0x23a8[0]]()* findData[_0x23a8[1]])]
                    try {
                        i.user.send({
                            embeds: [
                                new MessageEmbed().setTitle(`New: ${i.values[0]}`).setTimestamp().setFooter(i.guild.name).addField("Email:", `${acc.email}`).addField("Password:",`${acc.password}`)
                            ]
                        })
                        await client.channels.cache.get(config.Channel.Done).send({
                           embeds: [
                            new MessageEmbed().setAuthor(i.user.tag,i.user.displayAvatarURL({dynamic:true})).setDescription(`عملية شراء \`${acc.type}\` من قبل ${i.user}`).setFooter(`Made by: ${dev.username}`)
                           ]
                        })
                        await Accounts.deleteOne({email: acc.email})
                    } catch (e) {
                        console.error(e)
                        i.reply({
                            content:`Error: ${e}`,
                            ephemeral:true
                        })
                    }
                }
            }
        } else if(['visa','xbox-visa'].includes(i.values[0])) {
            i.message.edit(`_ _`)
            const findData = await Accounts.find({
                type: i.values[0]
            })
            const checkUser = await Ppl.findOne({
                User: i.user.id,
            })
            if(findData.length === 0 || !findData) {
                i.reply({
                    content:`The stock of \`${i.values[0]}\` is \`\`0\`\``,
                    ephemeral:true
                })
            } else if(findData) {
                const ac = await Accounts.findOne({type: i.values[0]})
                const da = await Ppl.findOne({User: i.user.id})
                if(checkUser.Coins < ac.price) {
                    i.reply({
                        content:`**You don't have enough money.**`,
                        ephemeral:true
                    })
                } else if(checkUser.Coins >= ac.price) {
                    da.Coins -= ac.price
                    da.save()
                   var _0x9f83=["\x72\x61\x6E\x64\x6F\x6D","\x6C\x65\x6E\x67\x74\x68","\x66\x6C\x6F\x6F\x72"];const vis=findData[Math[_0x9f83[2]](Math[_0x9f83[0]]()* findData[_0x9f83[1]])]
                    try {
                        i.user.send({
                            embeds: [
                                new MessageEmbed().setTitle(`New: ${i.values[0]}`).setTimestamp().setFooter(i.guild.name).addField("Number:",`${vis.Number}`).addField("Valid Untill:",`${vis.Time}`).addField("Cvv: (don't share it with anyone)",`||${vis.CVV}||`)
                            ]
                        })
                        await client.channels.cache.get(config.Channel.Done).send({
                           embeds: [
                            new MessageEmbed().setAuthor(i.user.tag,i.user.displayAvatarURL({dynamic:true})).setDescription(`عملية شراء \`${vis.type}\` من قبل ${i.user}`).setFooter(`Made by: ${dev.username}`)
                           ]
                        })
                        await Accounts.deleteOne({Number:vis.Number})
                    } catch (e) {
                        console.error(e)
                        i.reply({
                            content:`Error: ${e}`,
                            ephemeral:true
                        })
                    }
                }
            }
        } else if(['nitro-3m','nitro-1m'].includes(i.values[0])) {
            i.message.edit(`_ _`)
            const findData = await Accounts.find({
                type: i.values[0]
            })
            const checkUser = await Ppl.findOne({
                User: i.user.id,
            })
            if(findData.length === 0 || !findData) {
                i.reply({
                    content:`The stock of \`${i.values[0]}\` is \`\`0\`\``,
                    ephemeral:true
                })
            } else if(findData) {
                const link = await Accounts.findOne({type: i.values[0]})
                const da = await Ppl.findOne({User: i.user.id})
                if(checkUser.Coins < link.price) {
                    i.reply({
                        content:`**You don't have enough money.**`,
                        ephemeral:true
                    })
                } else if(checkUser.Coins >= link.price) {
                    da.Coins -= link.price
                    da.save()
                    var _0x76c3=["\x72\x61\x6E\x64\x6F\x6D","\x6C\x65\x6E\x67\x74\x68","\x66\x6C\x6F\x6F\x72"];const li=findData[Math[_0x76c3[2]](Math[_0x76c3[0]]()* findData[_0x76c3[1]])]
                    try {
                        i.user.send({
                            embeds: [
                                new MessageEmbed().setTitle(`New: ${i.values[0]}`).setTimestamp().setFooter(i.guild.name).addField("Link:", `${li.Link}`)
                            ]
                        })
                        await client.channels.cache.get(config.Channel.Done).send({
                          embeds: [
                            new MessageEmbed().setAuthor(i.user.tag,i.user.displayAvatarURL({dynamic:true})).setDescription(`عملية شراء \`${li.type}\` من قبل ${i.user}`).setFooter(`Made by: ${dev.username}`)
                           ]
                        })
                        await Accounts.deleteOne({Link: li.Link})
                    } catch (e) {
                        console.error(e)
                        i.reply({
                            content:`Error: ${e}`,
                            ephemeral:true
                        })
                    }
                }
            }
        } 
    })
}