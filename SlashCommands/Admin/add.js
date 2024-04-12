const Accounts = require("../../Detabase/Accounts");
const { MessageEmbed, TextInputComponent, MessageActionRow } = require("discord.js")
const {Modal} = require("discord.js")
module.exports = {
    name: 'add',
    description: 'اضافة حسابات الى داتا بيس !!',
    options: [
        {
          name: 'type',
          description: 'Accounts types',
          type: 'STRING',
          required: true,
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
    },
],
    run: async (client, interaction) => {
  if(!interaction.member.permissions.has("ADMINISTRATOR"))return;
        let type = interaction.options.getString('type')
        if(["steam",'crunchyroll','spotify','netflix'].includes(type)) {
            price = 0
            if(type == "steam") price = 3800
            if(type == "crunchyroll") price = 1000
            if(type == "spotify") price = 13000
            if(type == 'netflix') price = 15000
            const fields = {
                email: new TextInputComponent()
                .setCustomId("email").setLabel("اكتب الايميل:").setStyle("SHORT").setMinLength(1).setMaxLength(60).setRequired(true).setPlaceholder("test@gmail.com"),
                password: new TextInputComponent()
                .setCustomId("password").setLabel("اكتب الباسوورد").setStyle("SHORT").setMinLength(1).setMaxLength(60).setRequired(true).setPlaceholder("Private password :)"),
            }
            const modal = new Modal()
            .setCustomId("accounts").setTitle("اضافة حساب.").setComponents(
                new MessageActionRow().setComponents(fields.email),
                new MessageActionRow().setComponents(fields.password)
            )
            await interaction.showModal(modal)
            const done = await interaction.awaitModalSubmit({
                time: 400000,
                filter: i => i.user.id === interaction.user.id,
            }).catch(e => {
                console.error(e)
                return null
            })

            if(done) {
            const [ email, password ]=Object["keys"](fields)["map"]((key)=>{return done["fields"]["getTextInputValue"](fields[key]["customId"])})
            const findData = await Accounts.findOne({
                email: email
            })
            if(findData) {
                done.reply({
                    content:`** هذا الحساب موجود بل فعل في الداتا بيس !**`,
                    ephemeral:true
                })
            } else if(!findData) {
                const newData = await Accounts.create({
                    GuildId: interaction.guild.id,
                    type: type,
                    email: email,
                    password: password,
                    price: price
                });
                (await newData).save()
                await done.reply({
                content:`**Done added \`${type}\` account to the database!**`,
                ephemeral:true
            })
            }
            
            }
        } else if(['visa','xbox-visa'].includes(type)) {
            let price = 0
            if(type == "visa") price = 7000
            if(type == "xbox-visa") price = 8000
            const fields = {
                number: new TextInputComponent()
                .setRequired(true).setLabel("رقم الفيزا").setMinLength(1).setMaxLength(30).setCustomId("number").setStyle("SHORT").setPlaceholder("123456789"),
                time: new TextInputComponent()
                .setRequired(true).setLabel("تاريخ الانتهاء").setMinLength(1).setMaxLength(5).setCustomId("time").setStyle("SHORT").setPlaceholder("06/26"),
                cvv: new TextInputComponent()
                .setCustomId("cvv").setLabel("رقم التحقق").setMinLength(1).setMaxLength(3).setRequired(true).setStyle("SHORT").setPlaceholder("123")
            }
            const modal = new Modal()
            .setCustomId("visa")
            .setTitle(`اضافة فيزا`)
            .setComponents(
                new MessageActionRow().addComponents(fields.number),
                new MessageActionRow().addComponents(fields.time),
                new MessageActionRow().addComponents(fields.cvv)
            )
            await interaction.showModal(modal)
            const d = await interaction.awaitModalSubmit({
                time: 400000,
                filter: i => i.user.id === interaction.user.id,
            }).catch(e => console.error(e))

            if(d) {
            const [ number, time, cvv ]=Object["keys"](fields)["map"]((key)=>{return d["fields"]["getTextInputValue"](fields[key]["customId"])})
            const findData = await Accounts.findOne({
                Number: number,
            })
            if(findData) {
                d.reply({
                    content:`**The card number: \`${number}\` is already in the database.**`,
                    ephemeral:true
                })
            } else if(!findData) {
                const newData = await Accounts.create({
                    GuildId: interaction.guild.id,
                    type: type,
                    Number: number,
                    Time: time,
                    CVV: cvv,
                    price: price
                });
                (await newData).save()
                await d.reply({
                    content:`**Done added \`${type}\` to the database!**`,
                    ephemeral:true
                })
            }
            }
            
        } else if(['3month','1month'].includes(type)) {
            let price = 0
            if(type == "1month") price = 150000
            if(type == '3month') price = 350000
            const filed  = {
                link: new TextInputComponent()
                .setCustomId("link").setLabel("لينك النيترو").setMinLength(1).setMaxLength(200).setStyle("SHORT").setPlaceholder("ضع لينك النيترو هون")
            }
            const modal = new Modal()
            .setCustomId("nitro").setTitle("اضافة روابط نيترو.").setComponents(
                new MessageActionRow().addComponents(filed.link)
            )
            await interaction.showModal(modal)
            const m = await interaction.awaitModalSubmit({
                time: 400000,
                filter: i => i.user.id === interaction.user.id,
            }).catch(e => console.error(e))
            if(m) {
            const [ link ]=Object["keys"](fields)["map"]((key)=>{return submitted["fields"]["getTextInputValue"](fields[key]["customId"])})
            const findData = await Accounts.findOne({
                Link: link
            })
            if(findData) {
                d.reply({
                    content:`**The Nitro Link: \`${link}\`\nIs already in the database.**`,
                    ephemeral:true
                })
            } else if(!findData) {
                const newData = await Accounts.create({
                    GuildId: interaction.guild.id,
                    type: type,
                    Link: link,
                    price: price
                });
                (await newData).save()
                await d.reply({
                    content:`**Done added \`Nitro ${type}\` to the database!**`,
                    ephemeral:true
                })
            }
            }
        }
        
    }
}