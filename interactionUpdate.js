require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
    new SlashCommandBuilder()
        .setName("로그인_폼_등록")
        .setDescription("로그인 폼을 채널에 전송합니다.")
        .setDefaultMemberPermissions(8),
    new SlashCommandBuilder()
        .setDefaultMemberPermissions(8)
        .setName("계정정보_삭제")
        .setDescription("등록된 계정 정보를 삭제합니다.")
        .addStringOption(options =>
            options.setName("id")
                .setDescription("학번")
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName("건의")
        .setDescription("전주대학교 서버에 관해 관리자에게 건의합니다.")
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Start refresh slash commands.');

        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands.map(c => c.toJSON()) });

        console.log('Successfully reloaded slash commands.');
    } catch (error) {
        console.error(error);
    }
})();