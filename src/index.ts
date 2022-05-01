/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Client, Intents, TextChannel } from 'discord.js';
import { token, textChannelID } from '../config.json';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, 'GUILD_VOICE_STATES', 'GUILD_MESSAGES'],
});

client.once('ready', () => {
  console.log('Ready');
});

client.on('voiceStateUpdate', (oldState, newState) => {
  const channel = client.channels.cache.get(textChannelID);
  const toDay: Date = new Date();

  if (newState.channelId !== oldState.channelId) {
    void (channel as TextChannel).send(
      `${
        newState.member?.user.username
      } がやってきたよ(${toDay.getHours()}:${toDay.getMinutes()})\n。:.ﾟ٩(๑＞◡＜๑)۶:.｡`,
    );
  }
  if (oldState.channelId !== null && newState.channelId === null) {
    console.log(`disconnect`);
    void (channel as TextChannel).send(
      `誰もいなくなったよ(${toDay.getHours()}:${toDay.getMinutes()})\n｡･ﾟﾟ･(>д<;)･ﾟﾟ･｡`,
    );
  }
});
void client.login(token);
