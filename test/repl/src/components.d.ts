/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  InputFile,
  OutputFile,
} from './components/stencil-repl/stencil-repl';
import {
  InputFile as InputFile1,
} from './components/stencil-repl/stencil-repl';

export namespace Components {
  interface ReplHeader {
    'appName': string;
  }
  interface ReplInputFile {
    'code': string;
    'isSelected': boolean;
    'name': string;
  }
  interface ReplInputSelection {
    'isSelected': boolean;
    'name': string;
  }
  interface ReplInputs {
    'inputs': InputFile[];
    'selectedName': string;
  }
  interface ReplOutputFile {
    'code': string;
    'isSelected': boolean;
    'name': string;
  }
  interface ReplOutputs {
    'outputs': OutputFile[];
    'selectedTarget': string;
  }
  interface ReplViewport {}
  interface StencilRepl {
    'appName': string;
    'inputs': InputFile[];
    'selectedTarget': string;
    'stencilCompilerPath': string;
  }
}

declare global {


  interface HTMLReplHeaderElement extends Components.ReplHeader, HTMLStencilElement {}
  var HTMLReplHeaderElement: {
    prototype: HTMLReplHeaderElement;
    new (): HTMLReplHeaderElement;
  };

  interface HTMLReplInputFileElement extends Components.ReplInputFile, HTMLStencilElement {}
  var HTMLReplInputFileElement: {
    prototype: HTMLReplInputFileElement;
    new (): HTMLReplInputFileElement;
  };

  interface HTMLReplInputSelectionElement extends Components.ReplInputSelection, HTMLStencilElement {}
  var HTMLReplInputSelectionElement: {
    prototype: HTMLReplInputSelectionElement;
    new (): HTMLReplInputSelectionElement;
  };

  interface HTMLReplInputsElement extends Components.ReplInputs, HTMLStencilElement {}
  var HTMLReplInputsElement: {
    prototype: HTMLReplInputsElement;
    new (): HTMLReplInputsElement;
  };

  interface HTMLReplOutputFileElement extends Components.ReplOutputFile, HTMLStencilElement {}
  var HTMLReplOutputFileElement: {
    prototype: HTMLReplOutputFileElement;
    new (): HTMLReplOutputFileElement;
  };

  interface HTMLReplOutputsElement extends Components.ReplOutputs, HTMLStencilElement {}
  var HTMLReplOutputsElement: {
    prototype: HTMLReplOutputsElement;
    new (): HTMLReplOutputsElement;
  };

  interface HTMLReplViewportElement extends Components.ReplViewport, HTMLStencilElement {}
  var HTMLReplViewportElement: {
    prototype: HTMLReplViewportElement;
    new (): HTMLReplViewportElement;
  };

  interface HTMLStencilReplElement extends Components.StencilRepl, HTMLStencilElement {}
  var HTMLStencilReplElement: {
    prototype: HTMLStencilReplElement;
    new (): HTMLStencilReplElement;
  };
  interface HTMLElementTagNameMap {
    'repl-header': HTMLReplHeaderElement;
    'repl-input-file': HTMLReplInputFileElement;
    'repl-input-selection': HTMLReplInputSelectionElement;
    'repl-inputs': HTMLReplInputsElement;
    'repl-output-file': HTMLReplOutputFileElement;
    'repl-outputs': HTMLReplOutputsElement;
    'repl-viewport': HTMLReplViewportElement;
    'stencil-repl': HTMLStencilReplElement;
  }
}

declare namespace LocalJSX {
  interface ReplHeader {
    'appName'?: string;
  }
  interface ReplInputFile {
    'code'?: string;
    'isSelected'?: boolean;
    'name'?: string;
    'onFileUpdate'?: (event: CustomEvent<InputFile>) => void;
  }
  interface ReplInputSelection {
    'isSelected'?: boolean;
    'name'?: string;
    'onFileDelete'?: (event: CustomEvent<InputFile>) => void;
    'onFileSelect'?: (event: CustomEvent<InputFile>) => void;
  }
  interface ReplInputs {
    'inputs'?: InputFile[];
    'selectedName'?: string;
  }
  interface ReplOutputFile {
    'code'?: string;
    'isSelected'?: boolean;
    'name'?: string;
  }
  interface ReplOutputs {
    'onTargetUpdate'?: (event: CustomEvent<string>) => void;
    'outputs'?: OutputFile[];
    'selectedTarget'?: string;
  }
  interface ReplViewport {}
  interface StencilRepl {
    'appName'?: string;
    'inputs'?: InputFile[];
    'selectedTarget'?: string;
    'stencilCompilerPath'?: string;
  }

  interface IntrinsicElements {
    'repl-header': ReplHeader;
    'repl-input-file': ReplInputFile;
    'repl-input-selection': ReplInputSelection;
    'repl-inputs': ReplInputs;
    'repl-output-file': ReplOutputFile;
    'repl-outputs': ReplOutputs;
    'repl-viewport': ReplViewport;
    'stencil-repl': StencilRepl;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'repl-header': LocalJSX.ReplHeader & JSXBase.HTMLAttributes<HTMLReplHeaderElement>;
      'repl-input-file': LocalJSX.ReplInputFile & JSXBase.HTMLAttributes<HTMLReplInputFileElement>;
      'repl-input-selection': LocalJSX.ReplInputSelection & JSXBase.HTMLAttributes<HTMLReplInputSelectionElement>;
      'repl-inputs': LocalJSX.ReplInputs & JSXBase.HTMLAttributes<HTMLReplInputsElement>;
      'repl-output-file': LocalJSX.ReplOutputFile & JSXBase.HTMLAttributes<HTMLReplOutputFileElement>;
      'repl-outputs': LocalJSX.ReplOutputs & JSXBase.HTMLAttributes<HTMLReplOutputsElement>;
      'repl-viewport': LocalJSX.ReplViewport & JSXBase.HTMLAttributes<HTMLReplViewportElement>;
      'stencil-repl': LocalJSX.StencilRepl & JSXBase.HTMLAttributes<HTMLStencilReplElement>;
    }
  }
}

