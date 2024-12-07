const { EmbedBuilder, Events, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (!interaction.guild || !interaction.isModalSubmit()) return;

    if (interaction.customId === 'bugreport') {
      const command = interaction.fields.getTextInputValue('type')
      const description = interaction.fields.getTextInputValue('description')

      const id = interaction.user.id;
      const member = interaction.member;
      const server = interaction.guild;

      const channel = await client.channels.cache.get('1314313346522284132');

      const embed = new EmbedBuilder()
        .setColor('00C441')
        .setTitle('New Bug Report!')
        .addFields({ name: "Reporting Member", value: `\`${member.user.username} (${id})\`` })
        .addFields({ name: "Reporting Guild", value: `\`${server.name} (${server.id})\`` })
        .addFields({ name: "Problematic Feature", value: `> ${command}` })
        .addFields({ name: "Report Description", value: `> ${description}` })
        .setTimestamp()
        .setFooter({ text: 'Management Bug Report System' });

      const button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`bugSolved - ${id}`)
            .setStyle('Secondary') // 'Danger' should be uppercase
            .setLabel('Mark as solved')
        );

      await channel.send({ embeds: [embed], components: [button] }).catch(console.error);
        
        
      const replyEmbed = new EmbedBuilder()
        .setColor('00C441')
        .setTitle('Bug Report')
        .setDescription('Your report has been recorded. Our Developers will look into this issue, and reach out with any further questions.');

      // Reply to the interaction with the reply embed
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
    }
  }
};
