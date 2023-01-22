import { Injector, Logger, webpack } from "replugged";

const inject = new Injector();
const logger = Logger.plugin("randomstuff");

export async function start(): Promise<void> {
  logger.log("starting up~");

  // disable tracking
  let tracking_module      = await webpack.waitForModule(webpack.filters.byProps("handleTrack"));
  let tracking_module_shit = Object.getOwnPropertyNames(tracking_module);
  for (let i = 0; i < tracking_module_shit.length; i++) {
    //@ts-ignore
    if (tracking_module[tracking_module_shit[i]]["handleTrack"] != undefined) {
      //@ts-ignore
      let m = tracking_module[tracking_module_shit[i]];

      m["handleTrack"] = () => {};
      m["handleConnectionOpen"] = () => {};
    }
  }

  logger.log("done!");
}

export function stop(): void {
  inject.uninjectAll();
}
