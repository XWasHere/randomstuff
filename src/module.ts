import { Injector, Logger } from "replugged";

export class RSModule {
    injector: Injector;
    logger:   Logger;
    
    constructor() {
        this.injector = new Injector();
        this.logger   = Logger.plugin("randomstuff:unkmodule");
    }

    public async enable() {
        
    }

    public async disable() {
        this.injector.uninjectAll();
    }
};