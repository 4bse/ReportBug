const { Client, GatewayIntentBits, interaction, EmbedBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return; // Check if the interaction is a button interaction

    // Call the handleButtonInteraction function when a button interaction occurs
    await handleButtonInteraction(interaction, client);
});

async function handleButtonInteraction(interaction, client) {
    // Check if the button's custom ID is "bugreport"
    if (interaction.customId === 'bugreport') {
        // Create the modal "bugreport"
        const modal = new ModalBuilder()
            .setTitle('Bug Reporting')
            .setCustomId('bugreport');

        // Define the text input for the problematic feature
        const command = new TextInputBuilder()
            .setCustomId('type')
            .setRequired(true)
            .setPlaceholder('Please only state the problematic feature')
            .setLabel('What feature has a bug?')
            .setStyle(TextInputStyle.Paragraph);

        // Define the text input for bug description
        const description = new TextInputBuilder()
            .setCustomId('description')
            .setRequired(true)
            .setPlaceholder('Please describe the bug in detail')
            .setLabel('Bug Description')
            .setStyle(TextInputStyle.Paragraph);

        // Add text inputs to different action rows
        const one = new ActionRowBuilder().addComponents(command);
        const two = new ActionRowBuilder().addComponents(description);
        
        // Add action rows to the modal
        modal.addComponents(one, two);

        // Show the modal to the user
        await interaction.showModal(modal);
    }
}

client.login(process.env.token);
