import { injector, Injector, Logger, webpack } from "replugged";

const inject = new Injector();
const logger = Logger.plugin("randomstuff");

export async function start(): Promise<void> {
  logger.log("starting up~");

  // disable tracking
  const tracking_functions      = ["handleTrack", "handleConnectionClosed", "handleConnectionOpen", "handleFingerprint"];
  let   tracking_module         = await webpack.waitForModule(webpack.filters.byProps("handleTrack"));
  let   tracking_module_exports = webpack.getExportsForProps(tracking_module, ["handleTrack", "handleConnectionClosed", "handleConnectionOpen", "handleFingerprint"]);

  if (tracking_module_exports != null) { 
    for (let f of tracking_functions) {
      //@ts-ignore
      inject.instead(tracking_module_exports, f, () => {});
    }
  } else {
    logger.error("!!! unable to find tracking code, analytics still enabled !!!");
  }

  logger.log("done!");
}

export function stop(): void {
  inject.uninjectAll();
}
