const data = require("../../Detabase/Ppl")

module.exports = {
    name: 'remove-money',
    description: 'Remove money from users.',
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
  if(!interaction.member.permissions.has("ADMINISTRATOR"))return interaction.reply({content:`You can't use this interaction.`,ephermal:true})
  let user = interaction.options.getUser("user")
  let money = interaction.options.getNumber("money")
  if(user.bot) return interaction.reply({content:`I cannot remove coins from bots!`,ephermal:true})
         const findData = await data.findOne({
            User: user.id
         })
         
         if(findData.length === 0 || !findData) {
            interaction.reply({
                content:`${user} didn't has any data yet!`
            })
         } else if(findData) {
            if(findData.Coins < money) {
                interaction.reply({
                    content:`**I cannot remove \`${money}$\` from ${user}\n__He has \`${findData.Coins}$\`__**`
                })
            } else if(findData.Coins >= money) {
                findData.Coins -= money
                findData.save()
                await interaction.reply({
                    content:`**Done removed \`${money}$\` from ${user}**`
                })
            }
         }
        
    }
}