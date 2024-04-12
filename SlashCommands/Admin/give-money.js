const data = require("../../Detabase/Ppl")

module.exports = {
    name: 'give-money',
    description: 'Add money to users.',
    options: [
        {
            name:"user",
            description:"mention user",
            type: 'USER',
            required:true
        },
        {
            name:"money",
            description:"how much?",
            type:'NUMBER',
            required:true
        }
    ],
    run: async (client, interaction) => {
  if(!interaction.member.permissions.has("ADMINISTRATOR"))return interaction.reply({content:`You can't use this interaction.`,ephemeral:true})
  let user = interaction.options.getUser("user")
  let money = interaction.options.getNumber("money")
  if(user.bot) return interaction.reply({content:`I cannot add coins to bots`,ephemeral:true})
         const findData = await data.findOne({
            User: user.id
         })
         
         if(findData) {
         findData.Coins += money
         findData.save()
         interaction.reply({
            content:`**Done added \`${money}$\` to ${user}!**`
         })
         } else if(!findData) {
            const newData = await data.create({
                guildID: interaction.guild.id,
                User: user.id,
                Coins: money
            });
            (await newData).save()
            interaction.reply({
                content:`Done created data for ${user} and added \`${money}$\``
            })
         }
        
    }
}