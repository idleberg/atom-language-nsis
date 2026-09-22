import { AutoLanguageClient, LanguageServerProcess } from "atom-languageclient";
import "atom";
//#region node_modules/vscode-languageserver-types/lib/umd/main.d.ts
/**
 * A tagging type for string properties that are actually document URIs.
 */
declare type DocumentUri = string;
/**
 * Defines an integer in the range of -2^31 to 2^31 - 1.
 */
declare type integer = number;
declare namespace integer {
  const MIN_VALUE = -2147483648;
  const MAX_VALUE = 2147483647;
}
/**
 * Defines an unsigned integer in the range of 0 to 2^31 - 1.
 */
declare type uinteger = number;
declare namespace uinteger {
  const MIN_VALUE = 0;
  const MAX_VALUE = 2147483647;
}
/**
 * The diagnostic tags.
 *
 * @since 3.15.0
 */
declare namespace DiagnosticTag {
  /**
   * Unused or unnecessary code.
   *
   * Clients are allowed to render diagnostics with this tag faded out instead of having
   * an error squiggle.
   */
  const Unnecessary: 1;
  /**
   * Deprecated or obsolete code.
   *
   * Clients are allowed to rendered diagnostics with this tag strike through.
   */
  const Deprecated: 2;
}
declare type DiagnosticTag = 1 | 2;
/**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */
declare namespace MarkupKind {
  /**
   * Plain text is supported as a content format
   */
  const PlainText: 'plaintext';
  /**
   * Markdown is supported as a content format
   */
  const Markdown: 'markdown';
}
declare type MarkupKind = 'plaintext' | 'markdown';
declare namespace MarkupKind {
  /**
   * Checks whether the given value is a value of the [MarkupKind](#MarkupKind) type.
   */
  function is(value: any): value is MarkupKind;
}
/**
 * The kind of a completion entry.
 */
declare namespace CompletionItemKind {
  const Text: 1;
  const Method: 2;
  const Function: 3;
  const Constructor: 4;
  const Field: 5;
  const Variable: 6;
  const Class: 7;
  const Interface: 8;
  const Module: 9;
  const Property: 10;
  const Unit: 11;
  const Value: 12;
  const Enum: 13;
  const Keyword: 14;
  const Snippet: 15;
  const Color: 16;
  const File: 17;
  const Reference: 18;
  const Folder: 19;
  const EnumMember: 20;
  const Constant: 21;
  const Struct: 22;
  const Event: 23;
  const Operator: 24;
  const TypeParameter: 25;
}
declare type CompletionItemKind = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;
/**
 * Completion item tags are extra annotations that tweak the rendering of a completion
 * item.
 *
 * @since 3.15.0
 */
declare namespace CompletionItemTag {
  /**
   * Render a completion as obsolete, usually using a strike-out.
   */
  const Deprecated = 1;
}
declare type CompletionItemTag = 1;
/**
 * How whitespace and indentation is handled during completion
 * item insertion.
 *
 * @since 3.16.0
 */
declare namespace InsertTextMode {
  /**
   * The insertion or replace strings is taken as it is. If the
   * value is multi line the lines below the cursor will be
   * inserted using the indentation defined in the string value.
   * The client will not apply any kind of adjustments to the
   * string.
   */
  const asIs: 1;
  /**
   * The editor adjusts leading whitespace of new lines so that
   * they match the indentation up to the cursor of the line for
   * which the item is accepted.
   *
   * Consider a line like this: <2tabs><cursor><3tabs>foo. Accepting a
   * multi line completion item is indented using 2 tabs and all
   * following lines inserted will be indented using 2 tabs as well.
   */
  const adjustIndentation: 2;
}
declare type InsertTextMode = 1 | 2;
/**
 * A symbol kind.
 */
declare namespace SymbolKind {
  const File: 1;
  const Module: 2;
  const Namespace: 3;
  const Package: 4;
  const Class: 5;
  const Method: 6;
  const Property: 7;
  const Field: 8;
  const Constructor: 9;
  const Enum: 10;
  const Interface: 11;
  const Function: 12;
  const Variable: 13;
  const Constant: 14;
  const String: 15;
  const Number: 16;
  const Boolean: 17;
  const Array: 18;
  const Object: 19;
  const Key: 20;
  const Null: 21;
  const EnumMember: 22;
  const Struct: 23;
  const Event: 24;
  const Operator: 25;
  const TypeParameter: 26;
}
declare type SymbolKind = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26;
/**
 * Symbol tags are extra annotations that tweak the rendering of a symbol.
 * @since 3.16
 */
declare namespace SymbolTag {
  /**
   * Render a symbol as obsolete, usually using a strike-out.
   */
  const Deprecated: 1;
}
declare type SymbolTag = 1;
/**
 * The kind of a code action.
 *
 * Kinds are a hierarchical list of identifiers separated by `.`, e.g. `"refactor.extract.function"`.
 *
 * The set of kinds is open and client needs to announce the kinds it supports to the server during
 * initialization.
 */
declare type CodeActionKind = string;
/**
 * A set of predefined code action kinds
 */
declare namespace CodeActionKind {
  /**
   * Empty kind.
   */
  const Empty: CodeActionKind;
  /**
   * Base kind for quickfix actions: 'quickfix'
   */
  const QuickFix: CodeActionKind;
  /**
   * Base kind for refactoring actions: 'refactor'
   */
  const Refactor: CodeActionKind;
  /**
   * Base kind for refactoring extraction actions: 'refactor.extract'
   *
   * Example extract actions:
   *
   * - Extract method
   * - Extract function
   * - Extract variable
   * - Extract interface from class
   * - ...
   */
  const RefactorExtract: CodeActionKind;
  /**
   * Base kind for refactoring inline actions: 'refactor.inline'
   *
   * Example inline actions:
   *
   * - Inline function
   * - Inline variable
   * - Inline constant
   * - ...
   */
  const RefactorInline: CodeActionKind;
  /**
   * Base kind for refactoring rewrite actions: 'refactor.rewrite'
   *
   * Example rewrite actions:
   *
   * - Convert JavaScript function to class
   * - Add or remove parameter
   * - Encapsulate field
   * - Make method static
   * - Move method to base class
   * - ...
   */
  const RefactorRewrite: CodeActionKind;
  /**
   * Base kind for source actions: `source`
   *
   * Source code actions apply to the entire file.
   */
  const Source: CodeActionKind;
  /**
   * Base kind for an organize imports source action: `source.organizeImports`
   */
  const SourceOrganizeImports: CodeActionKind;
  /**
   * Base kind for auto-fix source actions: `source.fixAll`.
   *
   * Fix all actions automatically fix errors that have a clear fix that do not require user input.
   * They should not suppress errors or perform unsafe fixes such as generating new types or classes.
   *
   * @since 3.15.0
   */
  const SourceFixAll: CodeActionKind;
}
//#endregion
//#region node_modules/vscode-jsonrpc/lib/common/connection.d.ts
declare type ProgressToken = number | string;
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.d.ts
/**
 * @since 3.6.0
 */
interface ImplementationClientCapabilities {
  /**
   * Whether implementation supports dynamic registration. If this is set to `true`
   * the client supports the new `ImplementationRegistrationOptions` return value
   * for the corresponding server capability as well.
   */
  dynamicRegistration?: boolean;
  /**
   * The client supports additional metadata in the form of definition links.
   *
   * @since 3.14.0
   */
  linkSupport?: boolean;
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.d.ts
/**
 * Since 3.6.0
 */
interface TypeDefinitionClientCapabilities {
  /**
   * Whether implementation supports dynamic registration. If this is set to `true`
   * the client supports the new `TypeDefinitionRegistrationOptions` return value
   * for the corresponding server capability as well.
   */
  dynamicRegistration?: boolean;
  /**
   * The client supports additional metadata in the form of definition links.
   *
   * Since 3.14.0
   */
  linkSupport?: boolean;
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolders.d.ts
interface WorkspaceFoldersClientCapabilities {
  /**
   * The workspace client capabilities
   */
  workspace?: {
    /**
     * The client has support for workspace folders
     *
     * @since 3.6.0
     */
    workspaceFolders?: boolean;
  };
}
interface WorkspaceFolder {
  /**
   * The associated URI for this workspace folder.
   */
  uri: string;
  /**
   * The name of the workspace folder. Used to refer to this
   * workspace folder in the user interface.
   */
  name: string;
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.d.ts
interface ConfigurationClientCapabilities {
  /**
   * The workspace client capabilities
   */
  workspace?: {
    /**
     * The client supports `workspace/configuration` requests.
     *
     * @since 3.6.0
     */
    configuration?: boolean;
  };
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.d.ts
interface DocumentColorClientCapabilities {
  /**
   * Whether implementation supports dynamic registration. If this is set to `true`
   * the client supports the new `DocumentColorRegistrationOptions` return value
   * for the corresponding server capability as well.
   */
  dynamicRegistration?: boolean;
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.d.ts
interface FoldingRangeClientCapabilities {
  /**
   * Whether implementation supports dynamic registration for folding range providers. If this is set to `true`
   * the client supports the new `FoldingRangeRegistrationOptions` return value for the corresponding server
   * capability as well.
   */
  dynamicRegistration?: boolean;
  /**
   * The maximum number of folding ranges that the client prefers to receive per document. The value serves as a
   * hint, servers are free to follow the limit.
   */
  rangeLimit?: uinteger;
  /**
   * If set, the client signals that it only supports folding complete lines. If set, client will
   * ignore specified `startCharacter` and `endCharacter` properties in a FoldingRange.
   */
  lineFoldingOnly?: boolean;
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.d.ts
/**
 * @since 3.14.0
 */
interface DeclarationClientCapabilities {
  /**
   * Whether declaration supports dynamic registration. If this is set to `true`
   * the client supports the new `DeclarationRegistrationOptions` return value
   * for the corresponding server capability as well.
   */
  dynamicRegistration?: boolean;
  /**
   * The client supports additional metadata in the form of declaration links.
   */
  linkSupport?: boolean;
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.d.ts
interface SelectionRangeClientCapabilities {
  /**
   * Whether implementation supports dynamic registration for selection range providers. If this is set to `true`
   * the client supports the new `SelectionRangeRegistrationOptions` return value for the corresponding server
   * capability as well.
   */
  dynamicRegistration?: boolean;
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.d.ts
interface WorkDoneProgressClientCapabilities {
  /**
   * Window specific client capabilities.
   */
  window?: {
    /**
     * Whether client supports server initiated progress using the
     * `window/workDoneProgress/create` request.
     *
     * Since 3.15.0
     */
    workDoneProgress?: boolean;
  };
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.d.ts
/**
 * @since 3.16.0
 */
interface CallHierarchyClientCapabilities {
  /**
   * Whether implementation supports dynamic registration. If this is set to `true`
   * the client supports the new `(TextDocumentRegistrationOptions & StaticRegistrationOptions)`
   * return value for the corresponding server capability as well.
   */
  dynamicRegistration?: boolean;
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.d.ts
declare namespace TokenFormat {
  const Relative: 'relative';
}
declare type TokenFormat = 'relative';
/**
 * @since 3.16.0
 */
interface SemanticTokensClientCapabilities {
  /**
   * Whether implementation supports dynamic registration. If this is set to `true`
   * the client supports the new `(TextDocumentRegistrationOptions & StaticRegistrationOptions)`
   * return value for the corresponding server capability as well.
   */
  dynamicRegistration?: boolean;
  /**
   * Which requests the client supports and might send to the server
   * depending on the server's capability. Please note that clients might not
   * show semantic tokens or degrade some of the user experience if a range
   * or full request is advertised by the client but not provided by the
   * server. If for example the client capability `requests.full` and
   * `request.range` are both set to true but the server only provides a
   * range provider the client might not render a minimap correctly or might
   * even decide to not show any semantic tokens at all.
   */
  requests: {
    /**
     * The client will send the `textDocument/semanticTokens/range` request if
     * the server provides a corresponding handler.
     */
    range?: boolean | {};
    /**
     * The client will send the `textDocument/semanticTokens/full` request if
     * the server provides a corresponding handler.
     */
    full?: boolean | {
      /**
       * The client will send the `textDocument/semanticTokens/full/delta` request if
       * the server provides a corresponding handler.
       */
      delta?: boolean;
    };
  };
  /**
   * The token types that the client supports.
   */
  tokenTypes: string[];
  /**
   * The token modifiers that the client supports.
   */
  tokenModifiers: string[];
  /**
   * The token formats the clients supports.
   */
  formats: TokenFormat[];
  /**
   * Whether the client supports tokens that can overlap each other.
   */
  overlappingTokenSupport?: boolean;
  /**
   * Whether the client supports tokens that can span multiple lines.
   */
  multilineTokenSupport?: boolean;
}
interface SemanticTokensWorkspaceClientCapabilities {
  /**
   * Whether the client implementation supports a refresh request sent from
   * the server to the client.
   *
   * Note that this event is global and will force the client to refresh all
   * semantic tokens currently shown. It should be used with absolute care
   * and is useful for situation where a server for example detect a project
   * wide change that requires such a calculation.
   */
  refreshSupport?: boolean;
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.d.ts
/**
 * Client capabilities for the show document request.
 *
 * @since 3.16.0
 */
interface ShowDocumentClientCapabilities {
  /**
   * The client has support for the show document
   * request.
   */
  support: boolean;
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.d.ts
/**
 * Client capabilities for the linked editing range request.
 *
 * @since 3.16.0
 */
interface LinkedEditingRangeClientCapabilities {
  /**
   * Whether implementation supports dynamic registration. If this is set to `true`
   * the client supports the new `(TextDocumentRegistrationOptions & StaticRegistrationOptions)`
   * return value for the corresponding server capability as well.
   */
  dynamicRegistration?: boolean;
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.d.ts
/**
 * Capabilities relating to events from file operations by the user in the client.
 *
 * These events do not come from the file system, they come from user operations
 * like renaming a file in the UI.
 *
 * @since 3.16.0
 */
interface FileOperationClientCapabilities {
  /**
   * Whether the client supports dynamic registration for file requests/notifications.
   */
  dynamicRegistration?: boolean;
  /**
   * The client has support for sending didCreateFiles notifications.
   */
  didCreate?: boolean;
  /**
   * The client has support for willCreateFiles requests.
   */
  willCreate?: boolean;
  /**
   * The client has support for sending didRenameFiles notifications.
   */
  didRename?: boolean;
  /**
   * The client has support for willRenameFiles requests.
   */
  willRename?: boolean;
  /**
   * The client has support for sending didDeleteFiles notifications.
   */
  didDelete?: boolean;
  /**
   * The client has support for willDeleteFiles requests.
   */
  willDelete?: boolean;
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.d.ts
/**
 * Client capabilities specific to the moniker request.
 *
 * @since 3.16.0
 */
interface MonikerClientCapabilities {
  /**
   * Whether moniker supports dynamic registration. If this is set to `true`
   * the client supports the new `MonikerRegistrationOptions` return value
   * for the corresponding server capability as well.
   */
  dynamicRegistration?: boolean;
}
//#endregion
//#region node_modules/vscode-languageserver-protocol/lib/common/protocol.d.ts
/**
 * The kind of resource operations supported by the client.
 */
declare type ResourceOperationKind = 'create' | 'rename' | 'delete';
declare namespace ResourceOperationKind {
  /**
   * Supports creating new files and folders.
   */
  const Create: ResourceOperationKind;
  /**
   * Supports renaming existing files and folders.
   */
  const Rename: ResourceOperationKind;
  /**
   * Supports deleting existing files and folders.
   */
  const Delete: ResourceOperationKind;
}
declare type FailureHandlingKind = 'abort' | 'transactional' | 'undo' | 'textOnlyTransactional';
declare namespace FailureHandlingKind {
  /**
   * Applying the workspace change is simply aborted if one of the changes provided
   * fails. All operations executed before the failing operation stay executed.
   */
  const Abort: FailureHandlingKind;
  /**
   * All operations are executed transactional. That means they either all
   * succeed or no changes at all are applied to the workspace.
   */
  const Transactional: FailureHandlingKind;
  /**
   * If the workspace edit contains only textual file changes they are executed transactional.
   * If resource changes (create, rename or delete file) are part of the change the failure
   * handling strategy is abort.
   */
  const TextOnlyTransactional: FailureHandlingKind;
  /**
   * The client tries to undo the operations already executed. But there is no
   * guarantee that this is succeeding.
   */
  const Undo: FailureHandlingKind;
}
/**
 * Workspace specific client capabilities.
 */
interface WorkspaceClientCapabilities {
  /**
   * The client supports applying batch edits
   * to the workspace by supporting the request
   * 'workspace/applyEdit'
   */
  applyEdit?: boolean;
  /**
   * Capabilities specific to `WorkspaceEdit`s
   */
  workspaceEdit?: WorkspaceEditClientCapabilities;
  /**
   * Capabilities specific to the `workspace/didChangeConfiguration` notification.
   */
  didChangeConfiguration?: DidChangeConfigurationClientCapabilities;
  /**
   * Capabilities specific to the `workspace/didChangeWatchedFiles` notification.
   */
  didChangeWatchedFiles?: DidChangeWatchedFilesClientCapabilities;
  /**
   * Capabilities specific to the `workspace/symbol` request.
   */
  symbol?: WorkspaceSymbolClientCapabilities;
  /**
   * Capabilities specific to the `workspace/executeCommand` request.
   */
  executeCommand?: ExecuteCommandClientCapabilities;
  /**
   * Capabilities specific to the semantic token requests scoped to the
   * workspace.
   *
   * @since 3.16.0.
   */
  semanticTokens?: SemanticTokensWorkspaceClientCapabilities;
  /**
   * Capabilities specific to the code lens requests scoped to the
   * workspace.
   *
   * @since 3.16.0.
   */
  codeLens?: CodeLensWorkspaceClientCapabilities;
  /**
   * The client has support for file notifications/requests for user operations on files.
   *
   * Since 3.16.0
   */
  fileOperations?: FileOperationClientCapabilities;
}
/**
 * Text document specific client capabilities.
 */
interface TextDocumentClientCapabilities {
  /**
   * Defines which synchronization capabilities the client supports.
   */
  synchronization?: TextDocumentSyncClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/completion`
   */
  completion?: CompletionClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/hover`
   */
  hover?: HoverClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/signatureHelp`
   */
  signatureHelp?: SignatureHelpClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/declaration`
   *
   * @since 3.14.0
   */
  declaration?: DeclarationClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/definition`
   */
  definition?: DefinitionClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/typeDefinition`
   *
   * @since 3.6.0
   */
  typeDefinition?: TypeDefinitionClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/implementation`
   *
   * @since 3.6.0
   */
  implementation?: ImplementationClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/references`
   */
  references?: ReferenceClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/documentHighlight`
   */
  documentHighlight?: DocumentHighlightClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/documentSymbol`
   */
  documentSymbol?: DocumentSymbolClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/codeAction`
   */
  codeAction?: CodeActionClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/codeLens`
   */
  codeLens?: CodeLensClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/documentLink`
   */
  documentLink?: DocumentLinkClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/documentColor`
   */
  colorProvider?: DocumentColorClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/formatting`
   */
  formatting?: DocumentFormattingClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/rangeFormatting`
   */
  rangeFormatting?: DocumentRangeFormattingClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/onTypeFormatting`
   */
  onTypeFormatting?: DocumentOnTypeFormattingClientCapabilities;
  /**
   * Capabilities specific to the `textDocument/rename`
   */
  rename?: RenameClientCapabilities;
  /**
   * Capabilities specific to `textDocument/foldingRange` request.
   *
   * @since 3.10.0
   */
  foldingRange?: FoldingRangeClientCapabilities;
  /**
   * Capabilities specific to `textDocument/selectionRange` request.
   *
   * @since 3.15.0
   */
  selectionRange?: SelectionRangeClientCapabilities;
  /**
   * Capabilities specific to `textDocument/publishDiagnostics` notification.
   */
  publishDiagnostics?: PublishDiagnosticsClientCapabilities;
  /**
   * Capabilities specific to the various call hierarchy request.
   *
   * @since 3.16.0
   */
  callHierarchy?: CallHierarchyClientCapabilities;
  /**
   * Capabilities specific to the various semantic token request.
   *
   * @since 3.16.0
   */
  semanticTokens?: SemanticTokensClientCapabilities;
  /**
   * Capabilities specific to the linked editing range request.
   *
   * @since 3.16.0
   */
  linkedEditingRange?: LinkedEditingRangeClientCapabilities;
  /**
   * Client capabilities specific to the moniker request.
   *
   * @since 3.16.0
   */
  moniker: MonikerClientCapabilities;
}
interface WindowClientCapabilities {
  /**
   * Whether client supports handling progress notifications. If set
   * servers are allowed to report in `workDoneProgress` property in the
   * request specific server capabilities.
   *
   * @since 3.15.0
   */
  workDoneProgress?: boolean;
  /**
   * Capabilities specific to the showMessage request.
   *
   * @since 3.16.0
   */
  showMessage?: ShowMessageRequestClientCapabilities;
  /**
   * Capabilities specific to the showDocument request.
   *
   * @since 3.16.0
   */
  showDocument?: ShowDocumentClientCapabilities;
}
/**
 * Client capabilities specific to regular expressions.
 *
 * @since 3.16.0
 */
interface RegularExpressionsClientCapabilities {
  /**
   * The engine's name.
   */
  engine: string;
  /**
   * The engine's version.
   */
  version?: string;
}
/**
 * Client capabilities specific to the used markdown parser.
 *
 * @since 3.16.0
 */
interface MarkdownClientCapabilities {
  /**
   * The name of the parser.
   */
  parser: string;
  /**
   * The version of the parser.
   */
  version?: string;
}
/**
 * General client capabilities.
 *
 * @since 3.16.0
 */
interface GeneralClientCapabilities {
  /**
   * Client capabilities specific to regular expressions.
   *
   * @since 3.16.0
   */
  regularExpressions?: RegularExpressionsClientCapabilities;
  /**
   * Client capabilities specific to the client's markdown parser.
   *
   * @since 3.16.0
   */
  markdown?: MarkdownClientCapabilities;
}
/**
 * Defines the capabilities provided by the client.
 */
interface _ClientCapabilities {
  /**
   * Workspace specific client capabilities.
   */
  workspace?: WorkspaceClientCapabilities;
  /**
   * Text document specific client capabilities.
   */
  textDocument?: TextDocumentClientCapabilities;
  /**
   * Window specific client capabilities.
   */
  window?: WindowClientCapabilities;
  /**
   * General client capabilities.
   *
   * @since 3.16.0
   */
  general?: GeneralClientCapabilities;
  /**
   * Experimental client capabilities.
   */
  experimental?: object;
}
declare type ClientCapabilities = _ClientCapabilities & WorkspaceFoldersClientCapabilities & ConfigurationClientCapabilities & WorkDoneProgressClientCapabilities;
interface DidChangeConfigurationClientCapabilities {
  /**
   * Did change configuration notification supports dynamic registration.
   */
  dynamicRegistration?: boolean;
}
/**
 * Show message request client capabilities
 */
interface ShowMessageRequestClientCapabilities {
  /**
   * Capabilities specific to the `MessageActionItem` type.
   */
  messageActionItem?: {
    /**
     * Whether the client supports additional attributes which
     * are preserved and send back to the server in the
     * request's response.
     */
    additionalPropertiesSupport?: boolean;
  };
}
interface TextDocumentSyncClientCapabilities {
  /**
   * Whether text document synchronization supports dynamic registration.
   */
  dynamicRegistration?: boolean;
  /**
   * The client supports sending will save notifications.
   */
  willSave?: boolean;
  /**
   * The client supports sending a will save request and
   * waits for a response providing text edits which will
   * be applied to the document before it is saved.
   */
  willSaveWaitUntil?: boolean;
  /**
   * The client supports did save notifications.
   */
  didSave?: boolean;
}
interface DidChangeWatchedFilesClientCapabilities {
  /**
   * Did change watched files notification supports dynamic registration. Please note
   * that the current protocol doesn't support static configuration for file changes
   * from the server side.
   */
  dynamicRegistration?: boolean;
}
/**
 * The publish diagnostic client capabilities.
 */
interface PublishDiagnosticsClientCapabilities {
  /**
   * Whether the clients accepts diagnostics with related information.
   */
  relatedInformation?: boolean;
  /**
   * Client supports the tag property to provide meta data about a diagnostic.
   * Clients supporting tags have to handle unknown tags gracefully.
   *
   * @since 3.15.0
   */
  tagSupport?: {
    /**
     * The tags supported by the client.
     */
    valueSet: DiagnosticTag[];
  };
  /**
   * Whether the client interprets the version property of the
   * `textDocument/publishDiagnostics` notification`s parameter.
   *
   * @since 3.15.0
   */
  versionSupport?: boolean;
  /**
   * Client supports a codeDescription property
   *
   * @since 3.16.0
   */
  codeDescriptionSupport?: boolean;
  /**
   * Whether code action supports the `data` property which is
   * preserved between a `textDocument/publishDiagnostics` and
   * `textDocument/codeAction` request.
   *
   * @since 3.16.0
   */
  dataSupport?: boolean;
}
/**
 * Completion client capabilities
 */
interface CompletionClientCapabilities {
  /**
   * Whether completion supports dynamic registration.
   */
  dynamicRegistration?: boolean;
  /**
   * The client supports the following `CompletionItem` specific
   * capabilities.
   */
  completionItem?: {
    /**
     * Client supports snippets as insert text.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     */
    snippetSupport?: boolean;
    /**
     * Client supports commit characters on a completion item.
     */
    commitCharactersSupport?: boolean;
    /**
     * Client supports the follow content formats for the documentation
     * property. The order describes the preferred format of the client.
     */
    documentationFormat?: MarkupKind[];
    /**
     * Client supports the deprecated property on a completion item.
     */
    deprecatedSupport?: boolean;
    /**
     * Client supports the preselect property on a completion item.
     */
    preselectSupport?: boolean;
    /**
     * Client supports to kee
     */
    /**
     * Client supports the tag property on a completion item. Clients supporting
     * tags have to handle unknown tags gracefully. Clients especially need to
     * preserve unknown tags when sending a completion item back to the server in
     * a resolve call.
     *
     * @since 3.15.0
     */
    tagSupport?: {
      /**
       * The tags supported by the client.
       */
      valueSet: CompletionItemTag[];
    };
    /**
     * Client support insert replace edit to control different behavior if a
     * completion item is inserted in the text or should replace text.
     *
     * @since 3.16.0
     */
    insertReplaceSupport?: boolean;
    /**
     * Indicates which properties a client can resolve lazily on a completion
     * item. Before version 3.16.0 only the predefined properties `documentation`
     * and `details` could be resolved lazily.
     *
     * @since 3.16.0
     */
    resolveSupport?: {
      /**
       * The properties that a client can resolve lazily.
       */
      properties: string[];
    };
    /**
     * The client supports the `insertTextMode` property on
     * a completion item to override the whitespace handling mode
     * as defined by the client (see `insertTextMode`).
     *
     * @since 3.16.0
     */
    insertTextModeSupport?: {
      valueSet: InsertTextMode[];
    };
  };
  completionItemKind?: {
    /**
     * The completion item kind values the client supports. When this
     * property exists the client also guarantees that it will
     * handle values outside its set gracefully and falls back
     * to a default value when unknown.
     *
     * If this property is not present the client only supports
     * the completion items kinds from `Text` to `Reference` as defined in
     * the initial version of the protocol.
     */
    valueSet?: CompletionItemKind[];
  };
  /**
   * Defines how the client handles whitespace and indentation
   * when accepting a completion item that uses multi line
   * text in either `insertText` or `textEdit`.
   *
   * @since 3.16.0
   */
  insertTextMode?: InsertTextMode;
  /**
   * The client supports to send additional context information for a
   * `textDocument/completion` request.
   */
  contextSupport?: boolean;
}
interface HoverClientCapabilities {
  /**
   * Whether hover supports dynamic registration.
   */
  dynamicRegistration?: boolean;
  /**
   * Client supports the follow content formats for the content
   * property. The order describes the preferred format of the client.
   */
  contentFormat?: MarkupKind[];
}
/**
 * Client Capabilities for a [SignatureHelpRequest](#SignatureHelpRequest).
 */
interface SignatureHelpClientCapabilities {
  /**
   * Whether signature help supports dynamic registration.
   */
  dynamicRegistration?: boolean;
  /**
   * The client supports the following `SignatureInformation`
   * specific properties.
   */
  signatureInformation?: {
    /**
     * Client supports the follow content formats for the documentation
     * property. The order describes the preferred format of the client.
     */
    documentationFormat?: MarkupKind[];
    /**
     * Client capabilities specific to parameter information.
     */
    parameterInformation?: {
      /**
       * The client supports processing label offsets instead of a
       * simple label string.
       *
       * @since 3.14.0
       */
      labelOffsetSupport?: boolean;
    };
    /**
     * The client support the `activeParameter` property on `SignatureInformation`
     * literal.
     *
     * @since 3.16.0
     */
    activeParameterSupport?: boolean;
  };
  /**
   * The client supports to send additional context information for a
   * `textDocument/signatureHelp` request. A client that opts into
   * contextSupport will also support the `retriggerCharacters` on
   * `SignatureHelpOptions`.
   *
   * @since 3.15.0
   */
  contextSupport?: boolean;
}
/**
 * Client Capabilities for a [DefinitionRequest](#DefinitionRequest).
 */
interface DefinitionClientCapabilities {
  /**
   * Whether definition supports dynamic registration.
   */
  dynamicRegistration?: boolean;
  /**
   * The client supports additional metadata in the form of definition links.
   *
   * @since 3.14.0
   */
  linkSupport?: boolean;
}
/**
 * Client Capabilities for a [ReferencesRequest](#ReferencesRequest).
 */
interface ReferenceClientCapabilities {
  /**
   * Whether references supports dynamic registration.
   */
  dynamicRegistration?: boolean;
}
/**
 * Client Capabilities for a [DocumentHighlightRequest](#DocumentHighlightRequest).
 */
interface DocumentHighlightClientCapabilities {
  /**
   * Whether document highlight supports dynamic registration.
   */
  dynamicRegistration?: boolean;
}
/**
 * Client Capabilities for a [DocumentSymbolRequest](#DocumentSymbolRequest).
 */
interface DocumentSymbolClientCapabilities {
  /**
   * Whether document symbol supports dynamic registration.
   */
  dynamicRegistration?: boolean;
  /**
   * Specific capabilities for the `SymbolKind`.
   */
  symbolKind?: {
    /**
     * The symbol kind values the client supports. When this
     * property exists the client also guarantees that it will
     * handle values outside its set gracefully and falls back
     * to a default value when unknown.
     *
     * If this property is not present the client only supports
     * the symbol kinds from `File` to `Array` as defined in
     * the initial version of the protocol.
     */
    valueSet?: SymbolKind[];
  };
  /**
   * The client support hierarchical document symbols.
   */
  hierarchicalDocumentSymbolSupport?: boolean;
  /**
   * The client supports tags on `SymbolInformation`. Tags are supported on
   * `DocumentSymbol` if `hierarchicalDocumentSymbolSupport` is set to true.
   * Clients supporting tags have to handle unknown tags gracefully.
   *
   * @since 3.16.0
   */
  tagSupport?: {
    /**
     * The tags supported by the client.
     */
    valueSet: SymbolTag[];
  };
  /**
   * The client supports an additional label presented in the UI when
   * registering a document symbol provider.
   *
   * @since 3.16.0
   */
  labelSupport?: boolean;
}
/**
 * The Client Capabilities of a [CodeActionRequest](#CodeActionRequest).
 */
interface CodeActionClientCapabilities {
  /**
   * Whether code action supports dynamic registration.
   */
  dynamicRegistration?: boolean;
  /**
   * The client support code action literals of type `CodeAction` as a valid
   * response of the `textDocument/codeAction` request. If the property is not
   * set the request can only return `Command` literals.
   *
   * @since 3.8.0
   */
  codeActionLiteralSupport?: {
    /**
     * The code action kind is support with the following value
     * set.
     */
    codeActionKind: {
      /**
       * The code action kind values the client supports. When this
       * property exists the client also guarantees that it will
       * handle values outside its set gracefully and falls back
       * to a default value when unknown.
       */
      valueSet: CodeActionKind[];
    };
  };
  /**
   * Whether code action supports the `isPreferred` property.
   *
   * @since 3.15.0
   */
  isPreferredSupport?: boolean;
  /**
   * Whether code action supports the `disabled` property.
   *
   * @since 3.16.0
   */
  disabledSupport?: boolean;
  /**
   * Whether code action supports the `data` property which is
   * preserved between a `textDocument/codeAction` and a
   * `codeAction/resolve` request.
   *
   * @since 3.16.0
   */
  dataSupport?: boolean;
  /**
   * Whether the client support resolving additional code action
   * properties via a separate `codeAction/resolve` request.
   *
   * @since 3.16.0
   */
  resolveSupport?: {
    /**
     * The properties that a client can resolve lazily.
     */
    properties: string[];
  };
  /**
   * Whether th client honors the change annotations in
   * text edits and resource operations returned via the
   * `CodeAction#edit` property by for example presenting
   * the workspace edit in the user interface and asking
   * for confirmation.
   *
   * @since 3.16.0
   */
  honorsChangeAnnotations?: boolean;
}
/**
 * Client capabilities for a [WorkspaceSymbolRequest](#WorkspaceSymbolRequest).
 */
interface WorkspaceSymbolClientCapabilities {
  /**
   * Symbol request supports dynamic registration.
   */
  dynamicRegistration?: boolean;
  /**
   * Specific capabilities for the `SymbolKind` in the `workspace/symbol` request.
   */
  symbolKind?: {
    /**
     * The symbol kind values the client supports. When this
     * property exists the client also guarantees that it will
     * handle values outside its set gracefully and falls back
     * to a default value when unknown.
     *
     * If this property is not present the client only supports
     * the symbol kinds from `File` to `Array` as defined in
     * the initial version of the protocol.
     */
    valueSet?: SymbolKind[];
  };
  /**
   * The client supports tags on `SymbolInformation`.
   * Clients supporting tags have to handle unknown tags gracefully.
   *
   * @since 3.16.0
   */
  tagSupport?: {
    /**
     * The tags supported by the client.
     */
    valueSet: SymbolTag[];
  };
}
/**
 * The client capabilities  of a [CodeLensRequest](#CodeLensRequest).
 */
interface CodeLensClientCapabilities {
  /**
   * Whether code lens supports dynamic registration.
   */
  dynamicRegistration?: boolean;
}
/**
 * @since 3.16.0
 */
interface CodeLensWorkspaceClientCapabilities {
  /**
   * Whether the client implementation supports a refresh request sent from the
   * server to the client.
   *
   * Note that this event is global and will force the client to refresh all
   * code lenses currently shown. It should be used with absolute care and is
   * useful for situation where a server for example detect a project wide
   * change that requires such a calculation.
   */
  refreshSupport?: boolean;
}
/**
 * The client capabilities of a [DocumentLinkRequest](#DocumentLinkRequest).
 */
interface DocumentLinkClientCapabilities {
  /**
   * Whether document link supports dynamic registration.
   */
  dynamicRegistration?: boolean;
  /**
   * Whether the client support the `tooltip` property on `DocumentLink`.
   *
   * @since 3.15.0
   */
  tooltipSupport?: boolean;
}
/**
 * Client capabilities of a [DocumentFormattingRequest](#DocumentFormattingRequest).
 */
interface DocumentFormattingClientCapabilities {
  /**
   * Whether formatting supports dynamic registration.
   */
  dynamicRegistration?: boolean;
}
/**
 * Client capabilities of a [DocumentRangeFormattingRequest](#DocumentRangeFormattingRequest).
 */
interface DocumentRangeFormattingClientCapabilities {
  /**
   * Whether range formatting supports dynamic registration.
   */
  dynamicRegistration?: boolean;
}
/**
 * Client capabilities of a [DocumentOnTypeFormattingRequest](#DocumentOnTypeFormattingRequest).
 */
interface DocumentOnTypeFormattingClientCapabilities {
  /**
   * Whether on type formatting supports dynamic registration.
   */
  dynamicRegistration?: boolean;
}
declare namespace PrepareSupportDefaultBehavior {
  /**
   * The client's default behavior is to select the identifier
   * according the to language's syntax rule.
   */
  const Identifier: 1;
}
declare type PrepareSupportDefaultBehavior = 1;
interface RenameClientCapabilities {
  /**
   * Whether rename supports dynamic registration.
   */
  dynamicRegistration?: boolean;
  /**
   * Client supports testing for validity of rename operations
   * before execution.
   *
   * @since 3.12.0
   */
  prepareSupport?: boolean;
  /**
   * Client supports the default behavior result.
   *
   * The value indicates the default behavior used by the
   * client.
   *
   * @since 3.16.0
   */
  prepareSupportDefaultBehavior?: PrepareSupportDefaultBehavior;
  /**
   * Whether th client honors the change annotations in
   * text edits and resource operations returned via the
   * rename request's workspace edit by for example presenting
   * the workspace edit in the user interface and asking
   * for confirmation.
   *
   * @since 3.16.0
   */
  honorsChangeAnnotations?: boolean;
}
/**
 * The client capabilities of a [ExecuteCommandRequest](#ExecuteCommandRequest).
 */
interface ExecuteCommandClientCapabilities {
  /**
   * Execute command supports dynamic registration.
   */
  dynamicRegistration?: boolean;
}
interface WorkspaceEditClientCapabilities {
  /**
   * The client supports versioned document changes in `WorkspaceEdit`s
   */
  documentChanges?: boolean;
  /**
   * The resource operations the client supports. Clients should at least
   * support 'create', 'rename' and 'delete' files and folders.
   *
   * @since 3.13.0
   */
  resourceOperations?: ResourceOperationKind[];
  /**
   * The failure handling strategy of a client if applying the workspace edit
   * fails.
   *
   * @since 3.13.0
   */
  failureHandling?: FailureHandlingKind;
  /**
   * Whether the client normalizes line endings to the client specific
   * setting.
   * If set to `true` the client will normalize line ending characters
   * in a workspace edit containing to the client specific new line
   * character.
   *
   * @since 3.16.0
   */
  normalizesLineEndings?: boolean;
  /**
   * Whether the client in general supports change annotations on text edits,
   * create file, rename file and delete file changes.
   *
   * @since 3.16.0
   */
  changeAnnotationSupport?: {
    /**
     * Whether the client groups edits with equal labels into tree nodes,
     * for instance all edits labelled with "Changes in Strings" would
     * be a tree node.
     */
    groupsOnLabel?: boolean;
  };
}
//#endregion
//#region src/build/output.d.ts
/**
 * The `console-panel` service, as provided by the `console` package. Its types
 * are not published, so the shape used here is declared rather than imported.
 */
type ConsolePanel = {
  show(): void;
  hide(): void;
  toggle(): void;
  clear(): void;
  log(...message: unknown[]): void;
  warn(...message: unknown[]): void;
  error(...message: unknown[]): void;
};
//#endregion
//#region src/config.d.ts
type Configuration = {
  serverPath?: string;
  makensis?: {
    path?: string;
  };
  diagnostics?: {
    enabledOnSave?: boolean;
    preprocessMode?: string;
  };
  formatter?: {
    commentStyle?: string;
    endOfLine?: string;
    printWidth?: number;
    singleQuote?: boolean;
    trimEmptyLines?: boolean;
  };
};
//#endregion
//#region src/client.d.ts
declare class NSISLanguageClient extends AutoLanguageClient {
  private commands;
  activate(): void;
  deactivate(): Promise<void>;
  /**
   * The `console` package's panel, which the build system logs to. Optional:
   * without it the compiler output falls back to the developer console.
   */
  consumeConsolePanel(consolePanel: ConsolePanel): void;
  getGrammarScopes(): string[];
  getLanguageName(): string;
  getServerName(): string;
  getRootConfigurationKey(): string;
  /**
   * The server replaces its settings wholesale on `didChangeConfiguration` and
   * expects them shaped like `initializationOptions`, so the mapped object is
   * returned here rather than the raw configuration section.
   */
  mapConfigurationObject(configuration?: Configuration): Record<string, unknown>;
  /**
   * `atom-languageclient` sends no `initializationOptions`, but the server reads
   * its settings on `initialize`; without this, the first `didChangeConfiguration`
   * would be the earliest it heard about them.
   */
  getInitializeParams(projectPath: string, lsProcess: LanguageServerProcess): {
    initializationOptions: Record<string, unknown>;
    processId: integer | null;
    clientInfo?: {
      name: string;
      version?: string;
    };
    locale?: string;
    rootPath?: string | null;
    rootUri: DocumentUri | null;
    capabilities: ClientCapabilities;
    trace?: "off" | "messages" | "verbose";
    workDoneToken?: ProgressToken;
    workspaceFolders: WorkspaceFolder[] | null;
  };
  startServerProcess(projectPath: string): Promise<LanguageServerProcess>;
}
//#endregion
//#region src/main.d.ts
declare const _default: NSISLanguageClient & {
  config: {
    serverPath: {
      title: string;
      description: string;
      type: string;
      default: string;
      order: number;
    };
    makensis: {
      title: string;
      type: string;
      order: number;
      properties: {
        path: {
          title: string;
          description: string;
          type: string;
          default: string;
          order: number;
        };
      };
    };
    compiler: {
      title: string;
      type: string;
      order: number;
      properties: {
        verbosity: {
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
          default: never[];
          items: {
            type: string;
          };
          order: number;
        };
        processHeaders: {
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
        showNotifications: {
          title: string;
          description: string;
          type: string;
          default: boolean;
          order: number;
        };
        showOutputView: {
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
        showFlagsAsObject: {
          title: string;
          description: string;
          type: string;
          default: boolean;
          order: number;
        };
        showVersionAsNotification: {
          title: string;
          description: string;
          type: string;
          default: boolean;
          order: number;
        };
      };
    };
    wine: {
      title: string;
      type: string;
      order: number;
      properties: {
        runWithWine: {
          title: string;
          description: string;
          type: string;
          default: boolean;
          order: number;
        };
        pathToWine: {
          title: string;
          description: string;
          type: string;
          default: string;
          order: number;
        };
      };
    };
    diagnostics: {
      title: string;
      type: string;
      order: number;
      properties: {
        enabledOnSave: {
          title: string;
          description: string;
          type: string;
          default: boolean;
          order: number;
        };
        preprocessMode: {
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
      };
    };
    formatter: {
      title: string;
      type: string;
      order: number;
      properties: {
        commentStyle: {
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
        printWidth: {
          title: string;
          description: string;
          type: string;
          default: number;
          minimum: number;
          order: number;
        };
        singleQuote: {
          title: string;
          description: string;
          type: string;
          default: boolean;
          order: number;
        };
        trimEmptyLines: {
          title: string;
          description: string;
          type: string;
          default: boolean;
          order: number;
        };
      };
    };
  };
};
export = _default;