import { util, webpack } from "replugged";
import { ObjectExports } from "replugged/dist/types";
import { RSModule } from "../module";

interface GuildChannelStore {
    getGuild(t: any, e: any): {
        guildChannelsVersion: 0,
        guildChannels: GuildChannels
    }
};

type GuildChannelRecord = {

};

type GuildChannel = {
    id:          string,
    position:    number,
    record:      GuildChannelRecord,
    renderLevel: number,
    subtitle:    unknown,
    threadCount: number,
    threadIds:   unknown[]
};

type GuildCategoryRecord = {

};

type GuildCategory = {
    channels:        { [index: string]: GuildChannel },
    guild:           GuildChannels,
    id:              string,
    isCollapsed:     boolean,
    isMuted:         boolean,
    position:        number,
    record:          GuildCategoryRecord,
    shownChannelIds: string[]
};

type GuildChannels = {
    rows:                  string[][],
    sections:              number[],
    sortedNamedCategories: GuildCategory[] | null;
};

export default class extends RSModule {
    public async enable() {
        let guild_channels_store = webpack.getByProps("getChannels", "getDefaultChannel");

        console.log(guild_channels_store);

        // not really what were looking for, but need to do this in order to find what we really want
        /*let guild_channels_containing_module = await webpack.waitForModule<ObjectExports>(webpack.filters.bySource("this.nonPositionalChannelUpdate"));
        console.log(guild_channels_containing_module);
        let guild_channels_returning_thing_key = webpack.getFunctionKeyBySource("this.guilds={}", guild_channels_containing_module);
        if  (guild_channels_returning_thing_key == undefined) {
            console.error("unable to access guild channels prototype");
            return;
        }

        let guild_channels_returning_thing_constructor = guild_channels_containing_module[guild_channels_returning_thing_key];
        console.log(guild_channels_returning_thing_constructor);*/

        /*// this thing has the thing with the sidebar but its gonna take a bit of work to reach it
        let thing = await webpack.waitForModule<ObjectExports>(webpack.filters.bySource("props.guildChannels.getFirstVoiceChannel()"));

        if (typeof thing == "object") {
            // this might not process anything but whatever we dont care
            // its just a way for us to access the guildchannels prototype
            let k = webpack.getFunctionKeyBySource<string>("getGuild", thing);
            if (k != void 0) {
                let handle = this.injector.before(thing as any, k, ([shit]) => {
                    console.log(shit);
                    
                });
            } else { console.error("unable to find thing"); }
        } else { console.error("unable to find sidebar module"); }*/

        let gcsm = await webpack.waitForModule(webpack.filters.bySource("displayName=\"ChannelListStore\""));
        if (gcsm) {
            let gcs = webpack.getExportsForProps(gcsm, ["__proto__"]) as GuildChannelStore | undefined;
            if (gcs) {               
                // now we can modify the channel list as much as we want
                this.injector.after(gcs, "getGuild", ([t, e], res) => {     
                    let gc = res.guildChannels;

                    if (gc.sortedNamedCategories) {
                        console.log(gc);
                        for (let i = 0; i < gc.sortedNamedCategories.length; i++) {
                            let c = gc.sortedNamedCategories[i];

                            let rows: [number, string][] = [];

                            for (let i2 in c.channels) {
                                let ch = c.channels[i2];
                                rows.push([ch.position, ch.id]);
                            }

                            rows.sort((a, b) => a[0] - b[0]);

                            for (let i2 = 0; i2 < rows.length; i2++) {
                                gc.rows[i + 4][i2] = rows[i2][1];
                            }

                            gc.sections[i + 4] = rows.length;
                        }
                    }
                });
            } else { console.error("could not access guildchannelstore"); }
        } else { console.error("could not access guildchannelstore"); }
    }
}