import { injector, Injector, Logger, webpack, util } from "replugged";
import { fluxDispatcher } from "replugged/dist/renderer/modules/webpack/common";

import m_antitrack          from "./modules/antitrack";
import m_showhiddenchannels from "./modules/showhiddenchannels";

const logger = Logger.plugin("randomstuff");

let modules = [
  new m_antitrack(),
  new m_showhiddenchannels()
];

export async function start(): Promise<void> {
  logger.log("starting up~");

  for (let m of modules) {
    m.enable();
  }

  logger.log("done!");
}

export function stop(): void {
  for (let m of modules) {
    m.disable();
  }
}
