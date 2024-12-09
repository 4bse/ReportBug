const { 
  EmbedBuilder, 
  Events, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ModalBuilder, 
  TextInputBuilder, 
  TextInputStyle, 
  ButtonStyle 
} = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (!interaction.guild) return;

    // Handle Button Click for "wla"
    if (interaction.isButton() && interaction.customId === 'wla') {
      // Create the modal
      const modal = new ModalBuilder()
        .setCustomId('wlaModal')
        .setTitle('Whitelist ansökan - Del 1');

      // Add text input fields to the modal
      const användarnamnInput = new TextInputBuilder()
        .setCustomId('användarnamn')
        .setLabel('Användarnamn')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Ange ditt användarnamn...')
        .setRequired(true);

      const ålderInput = new TextInputBuilder()
        .setCustomId('ålder')
        .setLabel('Ålder')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Ange din ålder...')
        .setRequired(true);

      const teafInput = new TextInputBuilder()
        .setCustomId('teaf')
        .setLabel('Tidigare erfarenhet av FiveM')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Beskriv din tidigare erfarenhet av FiveM...')
        .setRequired(true);

      const farInput = new TextInputBuilder()
        .setCustomId('far')
        .setLabel('Förståelse av regler')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Förklara hur du förstår reglerna...')
        .setRequired(true);

      const rkInput = new TextInputBuilder()
        .setCustomId('rk')
        .setLabel('Roll/Karaktär')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Beskriv din roll eller karaktär...')
        .setRequired(true);

      // Add all inputs to the modal
      modal.addComponents(
        new ActionRowBuilder().addComponents(användarnamnInput),
        new ActionRowBuilder().addComponents(ålderInput),
        new ActionRowBuilder().addComponents(teafInput),
        new ActionRowBuilder().addComponents(farInput),
        new ActionRowBuilder().addComponents(rkInput)
      );

      // Show the modal to the user
      await interaction.showModal(modal);
    }

    // Handle Modal Submission
    if (interaction.isModalSubmit() && interaction.customId === 'wlaModal') {
      const användarnamn = interaction.fields.getTextInputValue('användarnamn');
      const ålder = interaction.fields.getTextInputValue('ålder');
      const teaf = interaction.fields.getTextInputValue('teaf');
      const far = interaction.fields.getTextInputValue('far');
      const rk = interaction.fields.getTextInputValue('rk');

      const id = interaction.user.id;
      const member = interaction.member;
      const server = interaction.guild;

      const channel = await client.channels.cache.get('1301901658388959314');

      const embed = new EmbedBuilder()
        .setColor('FFFFFF')
        .setTitle('Whitelist ansökan | Del 1')
        .addFields({ name: "User", value: `<@${member.user.id}>` }) // Mention the user
        .addFields({ name: " ", value: "\n" }) // Empty field to create space
        .addFields({ name: "Användarnamn", value: `> ${användarnamn}` })
        .addFields({ name: "Ålder", value: `> ${ålder}` })
        .addFields({ name: "Tidigare erfarenhet av FiveM", value: `> ${teaf}` })
        .addFields({ name: "Förståelse av regler", value: `> ${far}` })
        .addFields({ name: "Roll/karaktär", value: `> ${rk}` })
        .setTimestamp()
        .setFooter({ text: 'Whitelist Ansökan System' });

      await channel.send({ embeds: [embed] }).catch(console.error);

      const replyEmbed = new EmbedBuilder()
        .setColor('FFFFFF')
        .setTitle('Del 1 inskickad')
        .setDescription('Tack för att du har skickat in del 1. Här kommer del 2.');

      // Create the "Del 2" button
      const select = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('wla2')
            .setLabel('Del 2')
            .setStyle(ButtonStyle.Secondary)
        );

      // Send the response with the button to the user
      await interaction.reply({ embeds: [replyEmbed], components: [select], ephemeral: true });
    }
  },
};
