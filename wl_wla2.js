const {
    EmbedBuilder,
    Events,
    ActionRowBuilder,
    ButtonBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.guild) return;

        // Handle Button Click for "wla2"
        if (interaction.isButton() && interaction.customId === 'wla2') {
            // Create the modal
            const modal = new ModalBuilder()
                .setCustomId('wla2Modal')
                .setTitle('Whitelist ansökan - Del 2');

            // Add text input fields to the modal
            modal.addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('hbdtebs')
                        .setLabel('Hur bidrar du till en bättre spelupplevelse?')
                        .setStyle(TextInputStyle.Paragraph)
                        .setPlaceholder('Beskriv dina bidrag...')
                        .setRequired(true)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('hemligt')
                        .setLabel('Hemligt ord')
                        .setStyle(TextInputStyle.Short)
                        .setPlaceholder('Ange det hemliga ordet...')
                        .setRequired(true)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('rfa')
                        .setLabel('Respekt för Administratörer')
                        .setStyle(TextInputStyle.Paragraph)
                        .setPlaceholder('Beskriv din respekt för administratörer...')
                        .setRequired(true)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('mor')
                        .setLabel('Metagaming och rollspelsengagemang')
                        .setStyle(TextInputStyle.Paragraph)
                        .setPlaceholder('Förklara din förståelse...')
                        .setRequired(true)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('gängm')
                        .setLabel('Gängmedlemskap')
                        .setStyle(TextInputStyle.Paragraph)
                        .setPlaceholder('Ange dina uppgifter om gängmedlemskap...')
                        .setRequired(true)
                )
            );

            // Show the modal to the user
            await interaction.showModal(modal);
        }

        // Handle Modal Submission
        if (interaction.isModalSubmit() && interaction.customId === 'wla2Modal') {
            const hbdtebs = interaction.fields.getTextInputValue('hbdtebs');
            const hemligt = interaction.fields.getTextInputValue('hemligt');
            const rfa = interaction.fields.getTextInputValue('rfa');
            const mor = interaction.fields.getTextInputValue('mor');
            const gängm = interaction.fields.getTextInputValue('gängm');

            const id = interaction.user.id;
            const channel = client.channels.cache.get('1301901658388959314');

            const embed = new EmbedBuilder()
                .setColor('FFFFFF')
                .setTitle('Whitelist ansökan | Del 2')
                .addFields(
                    { name: 'User', value: `<@${interaction.user.id}>` },
                    { name: 'Hur kommer du att bidra till en positiv spelupplevelse?', value: `> ${hbdtebs}` },
                    { name: 'Hemligt ord', value: `> ${hemligt}` },
                    { name: 'Respekt för Administratörer', value: `> ${rfa}` },
                    { name: 'Metagaming och rollspelsengagemang', value: `> ${mor}` },
                    { name: 'Gängmedlemskap', value: `> ${gängm}` }
                )
                .setTimestamp()
                .setFooter({ text: 'Whitelist Ansökan System' });

            const actionRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId(`godkänd - ${id}`).setStyle('Secondary').setLabel('✅ Godkänd'),
                new ButtonBuilder().setCustomId(`nekad - ${id}`).setStyle('Secondary').setLabel('❌ Nekad')
            );

            await channel.send({ embeds: [embed], components: [actionRow] });
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('FFFFFF')
                        .setTitle('Whitelist Ansökan skickad!')
                        .setDescription('Du kommer att få svar från administratörerna snart. Håller tummarna!')
                ],
                ephemeral: true,
            });
        }

        // Handle Approval or Denial
        if (interaction.isButton()) {
            const [action, userId] = interaction.customId.split(' - ');
            if (action === 'godkänd' || action === 'nekad') {
                const targetChannelId = action === 'godkänd' ? '1315644567936172082' : '1315644688895836250';
                const targetChannel = client.channels.cache.get(targetChannelId);
                if (!targetChannel) {
                    return interaction.reply({
                        content: 'Kunde inte hitta målet för att flytta meddelandet.',
                        ephemeral: true,
                    });
                }

                // Move the message
                const messages = await interaction.channel.messages.fetch({ limit: 10 });
                const targetMessage = messages.find(
                    msg => msg.embeds[0]?.footer?.text === 'Whitelist Ansökan System' && msg.author.id === client.user.id
                );

                if (!targetMessage) {
                    return interaction.reply({
                        content: 'Kunde inte hitta meddelandet att flytta.',
                        ephemeral: true,
                    });
                }

                await targetChannel.send({
                    content: `Ansökan för användaren <@${userId}> har blivit ${action === 'godkänd' ? '**Godkänd**' : '**Nekad**'}.`,
                    embeds: targetMessage.embeds,
                });
                await targetMessage.delete();
                await interaction.reply({ content: 'Ansökan har flyttats.', ephemeral: true });
            }
        }
    },
};
