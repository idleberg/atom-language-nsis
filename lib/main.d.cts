import { CompositeDisposable } from "atom";

//#region src/main.d.ts
declare const _default: {
  config: {
    compilerOptions: {
      title: string;
      type: string;
      order: number;
      properties: {
        pathToMakensis: {
          title: string;
          description: string;
          type: string;
          default: string;
          order: number;
        };
        verbosity: {
          title: string;
          description: string;
          type: string;
          default: number;
          enum: {
            value: number;
            description: string;
          }[];
          order: number;
        };
        strictMode: {
          title: string;
          description: string;
          type: string;
          default: boolean;
          order: number;
        };
        customArguments: {
          title: string;
          description: string;
          type: string;
          default: string;
          order: number;
        };
      };
    };
    processHeaders: {
      title: string;
      description: string;
      type: string;
      enum: string[];
      default: string;
      order: number;
    };
    showBuildNotifications: {
      title: string;
      description: string;
      type: string;
      default: boolean;
      order: number;
    };
    showFlagsAsObject: {
      title: string;
      description: string;
      type: string;
      default: boolean;
      order: number;
    };
    alwaysShowOutput: {
      title: string;
      description: string;
      type: string;
      default: boolean;
      order: number;
    };
    clearConsole: {
      title: string;
      description: string;
      type: string;
      default: boolean;
      order: number;
    };
    compilerOutput: {
      title: string;
      description: string;
      type: string;
      default: string;
      enum: {
        value: string;
        description: string;
      }[];
      order: number;
    };
    buildFileSyntax: {
      title: string;
      description: string;
      type: string;
      default: string;
      enum: {
        value: string;
        description: string;
      }[];
      order: number;
    };
    useWineToRun: {
      title: string;
      description: string;
      type: string;
      default: boolean;
      order: number;
    } | {
      title?: undefined;
      description?: undefined;
      type?: undefined;
      default?: undefined;
      order?: undefined;
    };
    pathToWine: {
      title: string;
      description: string;
      type: string;
      default: string;
      order: number;
    } | {
      title?: undefined;
      description?: undefined;
      type?: undefined;
      default?: undefined;
      order?: undefined;
    };
    manageDependencies: {
      title: string;
      description: string;
      type: string;
      default: boolean;
      order: number;
    };
    formatter: {
      title: string;
      type: string;
      order: number;
      properties: {
        formatOnSave: {
          title: string;
          description: string;
          type: string;
          default: boolean;
          order: number;
        };
        endOfLine: {
          title: string;
          description: string;
          type: string;
          default: string;
          enum: {
            value: string;
            description: string;
          }[];
          order: number;
        };
        trimLines: {
          title: string;
          description: string;
          type: string;
          default: boolean;
          order: number;
        };
        useTabs: {
          title: string;
          description: string;
          type: string;
          default: boolean;
          order: number;
        };
        indentSize: {
          title: string;
          description: string;
          type: string;
          default: number;
          minimum: number;
          order: number;
        };
      };
    };
  };
  subscriptions: CompositeDisposable;
  activate(): Promise<void>;
  deactivate(): void;
  consumeConsolePanel(consolePanel: unknown): void;
  consumeBrowse(browse: unknown): void;
  consumeSignal(registry: unknown): void;
};
export = _default;