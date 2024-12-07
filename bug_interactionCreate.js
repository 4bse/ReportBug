const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isButton()) {
      if (interaction.customId.includes("bugSolved - ")) {
        var stringId = interaction.customId.replace("bugSolved - ", "");
        var member = await client.users.fetch(stringId);

        const embed = new EmbedBuilder()
          .setColor("#00C441")
          .setTitle("Bug Solved")
          .setDescription(
            `This message was initialized by the developers indicating that the bug you have reported has been solved.`,
          );

        await member.send({ embeds: [embed] });

        const replyEmbed = new EmbedBuilder()
          .setColor("#00C441")
          .setTitle("Bug Solved")
          .setDescription(
            "I have notified the member that their report is now solved.",
          );

        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

        await interaction.message.delete().catch((err) => {});
      }
    }

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
