import { webpack } from "replugged";
import { RSModule } from "../module";

const tracking_functions = ["handleTrack", "handleConnectionClosed", "handleConnectionOpen", "handleFingerprint"];

export default class extends RSModule {
    override async enable() {
        let tracking_module         = await webpack.waitForModule(webpack.filters.byProps("handleTrack"));
        let tracking_module_exports = webpack.getExportsForProps(tracking_module, tracking_functions);
      
        if (tracking_module_exports != null) { 
          for (let f of tracking_functions) {
            //@ts-ignore
            this.injector.instead(tracking_module_exports, f, () => {});
          }
        } else {
          this.logger.error("!!! unable to find tracking code, analytics still enabled !!!");
        }
    }
}