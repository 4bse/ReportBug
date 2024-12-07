const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reg-bug')
        .setDescription('Create a report embed message with a button'),

    async execute(interaction) {
        try {
            const select = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('bugreport')
                        .setLabel('Report')
                        .setStyle(ButtonStyle.Secondary)
                );

            const embed = new EmbedBuilder()
                .setColor('#00C441')
                .setTitle('🪲 Report a Bug')
                .setDescription('Encountered a bug? Please let us know!');

            await interaction.reply({
                embeds: [embed],
                components: [select],
            });
        } catch (error) {
            console.error(`Error in reg-bug command: ${error}`);
            if (!interaction.replied) {
                await interaction.reply({
                    content: 'An error occurred while processing your request.',
                    ephemeral: true,
                });
            }
        }
    },
};
