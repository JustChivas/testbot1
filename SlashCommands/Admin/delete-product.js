const Accounts = require("../../Detabase/Accounts")
module.exports = {
    name: 'delete-product',
    description: 'Remove Product with id',
    options: [
        {
            name:"id",
            description:"product id.",
            type:'STRING',
            required:true
        }
    ],
    run: async (client, interaction) => {
     if(!interaction.member.permissions.has("ADMINISTRATOR"))return interaction.reply({content:`You can't use this interaction.`,ephermal:true})
    let id = interaction.options.getString("id")
    const d = await Accounts.findById(id)
    if(!d) {
        return interaction.reply({
            content:`\`${d}\` is not exist.`,
            ephemeral:true
        })
    } else if(d) {
        try {
        d.deleteOne()
        interaction.reply({
            content:`Done delete \`${d.type}\` from the database!`
        })
        } catch (e) {
            console.error(e)
            interaction.reply({
                content:`Error: ${e}`
            })
        }
      }
    }
}