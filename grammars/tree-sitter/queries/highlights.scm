; ── Block Keywords ──

(function_definition "Function" @keyword.function)
(function_definition "FunctionEnd" @keyword.function)

(section_definition "Section" @keyword.storage.type)
(section_definition "SectionEnd" @keyword.storage.type)

(section_group "SectionGroup" @keyword.storage.type)
(section_group "SectionGroupEnd" @keyword.storage.type)

(page_ex_block "PageEx" @keyword.storage.type)
(page_ex_block "PageExEnd" @keyword.storage.type)

(macro_definition "!macro" @keyword.directive)
(macro_definition "!macroend" @keyword.directive)

; ── Block Names ──

(function_definition
  name: (_) @function)

(section_definition
  parameter: (_) @string.special)

(macro_definition
  name: (identifier) @function.macro)

(macro_definition
  parameter: (identifier) @variable.parameter)

; ── Preprocessor ──

(preproc_conditional
  keyword: (preproc_keyword) @keyword.directive)

(preproc_conditional "!endif" @keyword.directive)

(preproc_else "!else" @keyword.directive)

; `!else if`, `!else ifdef` etc. — the modifier is part of the directive
(preproc_else
  modifier: (identifier) @keyword.directive
  (#match? @keyword.directive "^([iI][fF]|[iI][fF][dD][eE][fF]|[iI][fF][nN][dD][eE][fF]|[iI][fF][mM][aA][cC][rR][oO][dD][eE][fF]|[iI][fF][mM][aA][cC][rR][oO][nN][dD][eE][fF])$"))

(preproc_directive
  directive: (preproc_keyword) @keyword.directive)

; ── Variable Declaration ──

(variable_declaration "Var" @keyword)
(variable_declaration
  name: (identifier) @variable)

; ── Plugin Calls ──

(plugin_call
  plugin: (identifier) @module)
(plugin_call
  "::" @punctuation.delimiter)
(plugin_call
  function: (identifier) @function.method)

; ── Macro Invocations ──

; Built-in macros → @function.builtin
(macro_invocation
  name: (define_reference) @function.builtin
  (#match? @function.builtin "^\\$\\{([iI][fF]|[iI][fF][nN][oO][tT]|[uU][nN][lL][eE][sS][sS]|[eE][lL][sS][eE][iI][fF]|[eE][lL][sS][eE][iI][fF][nN][oO][tT]|[eE][lL][sS][eE][uU][nN][lL][eE][sS][sS]|[eE][lL][sS][eE]|[eE][nN][dD][iI][fF]|[eE][nN][dD][uU][nN][lL][eE][sS][sS]|[aA][nN][dD][iI][fF]|[aA][nN][dD][iI][fF][nN][oO][tT]|[aA][nN][dD][uU][nN][lL][eE][sS][sS]|[oO][rR][iI][fF]|[oO][rR][iI][fF][nN][oO][tT]|[oO][rR][uU][nN][lL][eE][sS][sS]|[iI][fF][cC][mM][dD]|[iI][fF][tT][hH][eE][nN]|[iI][fF][nN][oO][tT][tT][hH][eE][nN]|[sS][wW][iI][tT][cC][hH]|[sS][eE][lL][eE][cC][tT]|[cC][aA][sS][eE]|[cC][aA][sS][eE]2|[cC][aA][sS][eE]3|[cC][aA][sS][eE]4|[cC][aA][sS][eE]5|[cC][aA][sS][eE][eE][lL][sS][eE]|[cC][aA][sS][eE]_[eE][lL][sS][eE]|[dD][eE][fF][aA][uU][lL][tT]|[eE][nN][dD][sS][wW][iI][tT][cC][hH]|[eE][nN][dD][sS][eE][lL][eE][cC][tT]|[fF][oO][rR]|[fF][oO][rR][eE][aA][cC][hH]|[nN][eE][xX][tT]|[eE][xX][iI][tT][fF][oO][rR]|[dD][oO]|[dD][oO][wW][hH][iI][lL][eE]|[dD][oO][uU][nN][tT][iI][lL]|[lL][oO][oO][pP]|[lL][oO][oO][pP][wW][hH][iI][lL][eE]|[lL][oO][oO][pP][uU][nN][tT][iI][lL]|[eE][xX][iI][tT][dD][oO]|[wW][hH][iI][lL][eE]|[eE][nN][dD][wW][hH][iI][lL][eE]|[eE][xX][iI][tT][wW][hH][iI][lL][eE]|[bB][rR][eE][aA][kK]|[cC][oO][nN][tT][iI][nN][uU][eE]|[cC][mM][dD]|[aA][bB][oO][rR][tT]|[eE][rR][rR][oO][rR][sS]|[fF][iI][lL][eE][eE][xX][iI][sS][tT][sS]|[rR][eE][bB][oO][oO][tT][fF][lL][aA][gG]|[sS][iI][lL][eE][nN][tT]|[aA][lL][tT][rR][eE][gG][vV][iI][eE][wW]|[rR][tT][lL][lL][aA][nN][gG][uU][aA][gG][eE]|[sS][hH][eE][lL][lL][vV][aA][rR][cC][oO][nN][tT][eE][xX][tT][aA][lL][lL]|[rR][eE][gG][kK][eE][yY][iI][sS][eE][mM][pP][tT][yY]|[sS][eE][cC][tT][iI][oO][nN][iI][sS][bB][oO][lL][dD]|[sS][eE][cC][tT][iI][oO][nN][iI][sS][eE][xX][pP][aA][nN][dD][eE][dD]|[sS][eE][cC][tT][iI][oO][nN][iI][sS][pP][aA][rR][tT][iI][aA][lL][lL][yY][sS][eE][lL][eE][cC][tT][eE][dD]|[sS][eE][cC][tT][iI][oO][nN][iI][sS][rR][eE][aA][dD][oO][nN][lL][yY]|[sS][eE][cC][tT][iI][oO][nN][iI][sS][sS][eE][cC][tT][iI][oO][nN][gG][rR][oO][uU][pP]|[sS][eE][cC][tT][iI][oO][nN][iI][sS][sS][eE][cC][tT][iI][oO][nN][gG][rR][oO][uU][pP][eE][nN][dD]|[sS][eE][cC][tT][iI][oO][nN][iI][sS][sS][eE][lL][eE][cC][tT][eE][dD]|[sS][eE][cC][tT][iI][oO][nN][iI][sS][sS][uU][bB][sS][eE][cC][tT][iI][oO][nN]|[sS][eE][cC][tT][iI][oO][nN][iI][sS][sS][uU][bB][sS][eE][cC][tT][iI][oO][nN][eE][nN][dD]|[cC][oO][nN][tT][aA][iI][nN][sS]|[cC][oO][nN][tT][aA][iI][nN][sS][sS]|[eE][nN][dD][sS][wW][iI][tT][hH]|[eE][nN][dD][sS][wW][iI][tT][hH][sS]|[sS][tT][aA][rR][tT][sS][wW][iI][tT][hH]|[sS][tT][aA][rR][tT][sS][wW][iI][tT][hH][sS]|[iI][sS][lL][oO][wW][eE][rR][cC][aA][sS][eE]|[iI][sS][uU][pP][pP][eE][rR][cC][aA][sS][eE]|[iI][sS][dD][oO][mM][aA][iI][nN][cC][oO][nN][tT][rR][oO][lL][lL][eE][rR]|[iI][sS][nN][tT]|[iI][sS][sS][aA][fF][eE][bB][oO][oO][tT][mM][oO][dD][eE]|[iI][sS][sS][eE][rR][vV][eE][rR][oO][sS]|[iI][sS][sS][eE][rR][vV][iI][cC][eE][pP][aA][cC][kK]|[iI][sS][sS][tT][aA][rR][tT][eE][rR][eE][dD][iI][tT][iI][oO][nN]|[iI][sS][wW][iI][nN]2003[rR]2|[oO][sS][hH][aA][sS][mM][eE][dD][iI][aA][cC][eE][nN][tT][eE][rR]|[oO][sS][hH][aA][sS][tT][aA][bB][lL][eE][tT][sS][uU][pP][pP][oO][rR][tT]|[bB][aA][nN][nN][eE][rR][tT][rR][iI][mM][pP][aA][tT][hH]|[dD][iI][rR][sS][tT][aA][tT][eE]|[dD][rR][iI][vV][eE][sS][pP][aA][cC][eE]|[gG][eE][tT][bB][aA][sS][eE][nN][aA][mM][eE]|[gG][eE][tT][dD][rR][iI][vV][eE][sS]|[gG][eE][tT][eE][xX][eE][nN][aA][mM][eE]|[gG][eE][tT][eE][xX][eE][pP][aA][tT][hH]|[gG][eE][tT][fF][iI][lL][eE][aA][tT][tT][rR][iI][bB][uU][tT][eE][sS]|[gG][eE][tT][fF][iI][lL][eE][eE][xX][tT]|[gG][eE][tT][fF][iI][lL][eE][nN][aA][mM][eE]|[gG][eE][tT][fF][iI][lL][eE][vV][eE][rR][sS][iI][oO][nN]|[gG][eE][tT][oO][pP][tT][iI][oO][nN][sS]|[gG][eE][tT][oO][pP][tT][iI][oO][nN][sS][sS]|[gG][eE][tT][pP][aA][rR][aA][mM][eE][tT][eE][rR][sS]|[gG][eE][tT][pP][aA][rR][eE][nN][tT]|[gG][eE][tT][rR][oO][oO][tT]|[gG][eE][tT][sS][iI][zZ][eE]|[gG][eE][tT][tT][iI][mM][eE]|[lL][oO][cC][aA][tT][eE]|[rR][eE][fF][rR][eE][sS][hH][sS][hH][eE][lL][lL][iI][cC][oO][nN][sS]|[sS][tT][rR][fF][iI][lL][tT][eE][rR]|[sS][tT][rR][fF][iI][lL][tT][eE][rR][sS]|[vV][eE][rR][sS][iI][oO][nN][cC][oO][mM][pP][aA][rR][eE]|[vV][eE][rR][sS][iI][oO][nN][cC][oO][nN][vV][eE][rR][tT]|[wW][oO][rR][dD][aA][dD][dD]|[wW][oO][rR][dD][aA][dD][dD][sS]|[wW][oO][rR][dD][fF][iI][nN][dD]|[wW][oO][rR][dD][fF][iI][nN][dD]2[xX]|[wW][oO][rR][dD][fF][iI][nN][dD]2[xX][sS]|[wW][oO][rR][dD][fF][iI][nN][dD]3[xX]|[wW][oO][rR][dD][fF][iI][nN][dD]3[xX][sS]|[wW][oO][rR][dD][fF][iI][nN][dD][sS]|[wW][oO][rR][dD][iI][nN][sS][eE][rR][tT]|[wW][oO][rR][dD][iI][nN][sS][eE][rR][tT][sS]|[wW][oO][rR][dD][rR][eE][pP][lL][aA][cC][eE]|[wW][oO][rR][dD][rR][eE][pP][lL][aA][cC][eE][sS]|[cC][oO][nN][fF][iI][gG][rR][eE][aA][dD]|[cC][oO][nN][fF][iI][gG][rR][eE][aA][dD][sS]|[cC][oO][nN][fF][iI][gG][wW][rR][iI][tT][eE]|[cC][oO][nN][fF][iI][gG][wW][rR][iI][tT][eE][sS]|[fF][iI][lL][eE][jJ][oO][iI][nN]|[fF][iI][lL][eE][rR][eE][aA][dD][fF][rR][oO][mM][eE][nN][dD]|[fF][iI][lL][eE][rR][eE][cC][oO][dD][eE]|[lL][iI][nN][eE][fF][iI][nN][dD]|[lL][iI][nN][eE][rR][eE][aA][dD]|[lL][iI][nN][eE][sS][uU][mM]|[tT][eE][xX][tT][cC][oO][mM][pP][aA][rR][eE]|[tT][eE][xX][tT][cC][oO][mM][pP][aA][rR][eE][sS]|[tT][rR][iI][mM][nN][eE][wW][lL][iI][nN][eE][sS]|[dD][iI][sS][aA][bB][lL][eE][xX]64[fF][sS][rR][eE][dD][iI][rR][eE][cC][tT][iI][oO][nN]|[eE][nN][aA][bB][lL][eE][xX]64[fF][sS][rR][eE][dD][iI][rR][eE][cC][tT][iI][oO][nN]|[gG][eE][tT][nN][aA][tT][iI][vV][eE][mM][aA][cC][hH][iI][nN][eE][aA][rR][cC][hH][iI][tT][eE][cC][tT][uU][rR][eE]|[iI][sS][nN][aA][tT][iI][vV][eE][aA][mM][dD]64|[iI][sS][nN][aA][tT][iI][vV][eE][aA][rR][mM]64|[iI][sS][nN][aA][tT][iI][vV][eE][iI][aA]32|[iI][sS][nN][aA][tT][iI][vV][eE][mM][aA][cC][hH][iI][nN][eE][aA][rR][cC][hH][iI][tT][eE][cC][tT][uU][rR][eE]|[iI][sS][wW][oO][wW]64|[rR][uU][nN][nN][iI][nN][gG][xX]64|[aA][tT][lL][eE][aA][sS][tT][bB][uU][iI][lL][dD]|[aA][tT][lL][eE][aA][sS][tT][sS][eE][rR][vV][iI][cC][eE][pP][aA][cC][kK]|[aA][tT][lL][eE][aA][sS][tT][wW][aA][aA][sS]|[aA][tT][mM][oO][sS][tT][bB][uU][iI][lL][dD]|[aA][tT][mM][oO][sS][tT][sS][eE][rR][vV][iI][cC][eE][pP][aA][cC][kK]|[aA][tT][mM][oO][sS][tT][wW][aA][aA][sS]|[wW][iI][nN][vV][eE][rR][gG][eE][tT][bB][uU][iI][lL][dD]|[wW][iI][nN][vV][eE][rR][gG][eE][tT][mM][aA][jJ][oO][rR]|[wW][iI][nN][vV][eE][rR][gG][eE][tT][mM][iI][nN][oO][rR]|[wW][iI][nN][vV][eE][rR][gG][eE][tT][sS][eE][rR][vV][iI][cC][eE][pP][aA][cC][kK][lL][eE][vV][eE][lL]|[mM][eE][mM][eE][nN][tT][oO][sS][eE][cC][tT][iI][oO][nN]|[mM][eE][mM][eE][nN][tT][oO][sS][eE][cC][tT][iI][oO][nN][dD][oO][nN][eE]|[mM][eE][mM][eE][nN][tT][oO][sS][eE][cC][tT][iI][oO][nN][eE][nN][dD]|[mM][eE][mM][eE][nN][tT][oO][sS][eE][cC][tT][iI][oO][nN][eE][xX]|[mM][eE][mM][eE][nN][tT][oO][sS][eE][cC][tT][iI][oO][nN][rR][eE][sS][tT][oO][rR][eE]|[mM][eE][mM][eE][nN][tT][oO][sS][eE][cC][tT][iI][oO][nN][sS][aA][vV][eE]|[mM][eE][mM][eE][nN][tT][oO][uU][nN][sS][eE][lL][eE][cC][tT][eE][dD][sS][eE][cC][tT][iI][oO][nN])\\}$"))

; User-defined/third-party macros → @function.macro
(macro_invocation
  name: (define_reference) @function.macro)

; ── Labels ──

(label
  name: (identifier) @label)

(label_reference) @label

; ── Constants ──

((identifier) @attribute
  (#match? @attribute "^([aA][rR][cC][hH][iI][vV][eE]|[fF][iI][lL][eE]_[aA][tT][tT][rR][iI][bB][uU][tT][eE]_[aA][rR][cC][hH][iI][vV][eE]|[fF][iI][lL][eE]_[aA][tT][tT][rR][iI][bB][uU][tT][eE]_[hH][iI][dD][dD][eE][nN]|[fF][iI][lL][eE]_[aA][tT][tT][rR][iI][bB][uU][tT][eE]_[nN][oO][rR][mM][aA][lL]|[fF][iI][lL][eE]_[aA][tT][tT][rR][iI][bB][uU][tT][eE]_[oO][fF][fF][lL][iI][nN][eE]|[fF][iI][lL][eE]_[aA][tT][tT][rR][iI][bB][uU][tT][eE]_[rR][eE][aA][dD][oO][nN][lL][yY]|[fF][iI][lL][eE]_[aA][tT][tT][rR][iI][bB][uU][tT][eE]_[sS][yY][sS][tT][eE][mM]|[fF][iI][lL][eE]_[aA][tT][tT][rR][iI][bB][uU][tT][eE]_[tT][eE][mM][pP][oO][rR][aA][rR][yY]|[hH][iI][dD][dD][eE][nN]|[hH][kK][cC][cC]|[hH][kK][cC][rR]|[hH][kK][cC][rR]32|[hH][kK][cC][rR]64|[hH][kK][cC][uU]|[hH][kK][cC][uU]32|[hH][kK][cC][uU]64|[hH][kK][dD][dD]|[hH][kK][eE][yY]_[cC][lL][aA][sS][sS][eE][sS]_[rR][oO][oO][tT]|[hH][kK][eE][yY]_[cC][uU][rR][rR][eE][nN][tT]_[cC][oO][nN][fF][iI][gG]|[hH][kK][eE][yY]_[cC][uU][rR][rR][eE][nN][tT]_[uU][sS][eE][rR]|[hH][kK][eE][yY]_[dD][yY][nN]_[dD][aA][tT][aA]|[hH][kK][eE][yY]_[lL][oO][cC][aA][lL]_[mM][aA][cC][hH][iI][nN][eE]|[hH][kK][eE][yY]_[pP][eE][rR][fF][oO][rR][mM][aA][nN][cC][eE]_[dD][aA][tT][aA]|[hH][kK][eE][yY]_[uU][sS][eE][rR][sS]|[hH][kK][lL][mM]|[hH][kK][lL][mM]32|[hH][kK][lL][mM]64|[hH][kK][pP][dD]|[hH][kK][uU]|[iI][dD][aA][bB][oO][rR][tT]|[iI][dD][cC][aA][nN][cC][eE][lL]|[iI][dD][dD]_[dD][iI][rR]|[iI][dD][dD]_[iI][nN][sS][tT]|[iI][dD][dD]_[iI][nN][sS][tT][fF][iI][lL][eE][sS]|[iI][dD][dD]_[lL][iI][cC][eE][nN][sS][eE]|[iI][dD][dD]_[sS][eE][lL][cC][oO][mM]|[iI][dD][dD]_[uU][nN][iI][nN][sS][tT]|[iI][dD][dD]_[vV][eE][rR][iI][fF][yY]|[iI][dD][iI][gG][nN][oO][rR][eE]|[iI][dD][nN][oO]|[iI][dD][oO][kK]|[iI][dD][rR][eE][tT][rR][yY]|[iI][dD][yY][eE][sS]|[mM][bB]_[aA][bB][oO][rR][tT][rR][eE][tT][rR][yY][iI][gG][nN][oO][rR][eE]|[mM][bB]_[dD][eE][fF][bB][uU][tT][tT][oO][nN]1|[mM][bB]_[dD][eE][fF][bB][uU][tT][tT][oO][nN]2|[mM][bB]_[dD][eE][fF][bB][uU][tT][tT][oO][nN]3|[mM][bB]_[dD][eE][fF][bB][uU][tT][tT][oO][nN]4|[mM][bB]_[iI][cC][oO][nN][eE][xX][cC][lL][aA][mM][aA][tT][iI][oO][nN]|[mM][bB]_[iI][cC][oO][nN][iI][nN][fF][oO][rR][mM][aA][tT][iI][oO][nN]|[mM][bB]_[iI][cC][oO][nN][qQ][uU][eE][sS][tT][iI][oO][nN]|[mM][bB]_[iI][cC][oO][nN][sS][tT][oO][pP]|[mM][bB]_[oO][kK]|[mM][bB]_[oO][kK][cC][aA][nN][cC][eE][lL]|[mM][bB]_[rR][eE][tT][rR][yY][cC][aA][nN][cC][eE][lL]|[mM][bB]_[rR][iI][gG][hH][tT]|[mM][bB]_[rR][tT][lL][rR][eE][aA][dD][iI][nN][gG]|[mM][bB]_[sS][eE][tT][fF][oO][rR][eE][gG][rR][oO][uU][nN][dD]|[mM][bB]_[tT][oO][pP][mM][oO][sS][tT]|[mM][bB]_[uU][sS][eE][rR][iI][cC][oO][nN]|[mM][bB]_[yY][eE][sS][nN][oO]|[mM][bB]_[yY][eE][sS][nN][oO][cC][aA][nN][cC][eE][lL]|[nN][oO][rR][mM][aA][lL]|[oO][fF][fF][lL][iI][nN][eE]|[rR][eE][aA][dD][oO][nN][lL][yY]|[sS][hH][cC][tT][xX]|[sS][hH][eE][lL][lL]_[cC][oO][nN][tT][eE][xX][tT]|[sS][wW]_[hH][iI][dD][eE]|[sS][wW]_[sS][hH][oO][wW]|[sS][wW]_[sS][hH][oO][wW][dD][eE][fF][aA][uU][lL][tT]|[sS][wW]_[sS][hH][oO][wW][mM][aA][xX][iI][mM][iI][zZ][eE][dD]|[sS][wW]_[sS][hH][oO][wW][mM][iI][nN][iI][mM][iI][zZ][eE][dD]|[sS][wW]_[sS][hH][oO][wW][nN][oO][rR][mM][aA][lL]|[sS][yY][sS][tT][eE][mM]|[tT][eE][mM][pP][oO][rR][aA][rR][yY])$"))

; ── Booleans ──

((identifier) @constant.builtin.boolean
  (#match? @constant.builtin.boolean "^([tT][rR][uU][eE]|[oO][nN]|[fF][aA][lL][sS][eE]|[oO][fF][fF])$"))

; ── Commands ──

(command
  name: (identifier) @keyword
  (#match? @keyword "^([aA][bB][oO][rR][tT]|[aA][dD][dD][bB][rR][aA][nN][dD][iI][nN][gG][iI][mM][aA][gG][eE]|[aA][dD][dD][sS][iI][zZ][eE]|[aA][lL][lL][oO][wW][rR][oO][oO][tT][dD][iI][rR][iI][nN][sS][tT][aA][lL][lL]|[aA][lL][lL][oO][wW][sS][kK][iI][pP][fF][iI][lL][eE][sS]|[aA][uU][tT][oO][cC][lL][oO][sS][eE][wW][iI][nN][dD][oO][wW]|[bB][gG][fF][oO][nN][tT]|[bB][gG][gG][rR][aA][dD][iI][eE][nN][tT]|[bB][rR][aA][nN][dD][iI][nN][gG][tT][eE][xX][tT]|[bB][rR][iI][nN][gG][tT][oO][fF][rR][oO][nN][tT]|[cC][aA][lL][lL]|[cC][aA][lL][lL][iI][nN][sS][tT][dD][lL][lL]|[cC][aA][pP][tT][iI][oO][nN]|[cC][hH][aA][nN][gG][eE][uU][iI]|[cC][hH][eE][cC][kK][bB][iI][tT][mM][aA][pP]|[cC][lL][eE][aA][rR][eE][rR][rR][oO][rR][sS]|[cC][oO][mM][pP][lL][eE][tT][eE][dD][tT][eE][xX][tT]|[cC][oO][mM][pP][oO][nN][eE][nN][tT][tT][eE][xX][tT]|[cC][oO][pP][yY][fF][iI][lL][eE][sS]|[cC][pP][uU]|[cC][rR][cC][cC][hH][eE][cC][kK]|[cC][rR][eE][aA][tT][eE][dD][iI][rR][eE][cC][tT][oO][rR][yY]|[cC][rR][eE][aA][tT][eE][fF][oO][nN][tT]|[cC][rR][eE][aA][tT][eE][sS][hH][oO][rR][tT][cC][uU][tT]|[dD][eE][lL][eE][tT][eE]|[dD][eE][lL][eE][tT][eE][iI][nN][iI][sS][eE][cC]|[dD][eE][lL][eE][tT][eE][iI][nN][iI][sS][tT][rR]|[dD][eE][lL][eE][tT][eE][rR][eE][gG][kK][eE][yY]|[dD][eE][lL][eE][tT][eE][rR][eE][gG][vV][aA][lL][uU][eE]|[dD][eE][tT][aA][iI][lL][pP][rR][iI][nN][tT]|[dD][eE][tT][aA][iI][lL][sS][bB][uU][tT][tT][oO][nN][tT][eE][xX][tT]|[dD][iI][rR][tT][eE][xX][tT]|[dD][iI][rR][vV][aA][rR]|[dD][iI][rR][vV][eE][rR][iI][fF][yY]|[eE][nN][aA][bB][lL][eE][wW][iI][nN][dD][oO][wW]|[eE][nN][uU][mM][rR][eE][gG][kK][eE][yY]|[eE][nN][uU][mM][rR][eE][gG][vV][aA][lL][uU][eE]|[eE][xX][cC][hH]|[eE][xX][eE][cC]|[eE][xX][eE][cC][sS][hH][eE][lL][lL]|[eE][xX][eE][cC][sS][hH][eE][lL][lL][wW][aA][iI][tT]|[eE][xX][eE][cC][wW][aA][iI][tT]|[eE][xX][pP][aA][nN][dD][eE][nN][vV][sS][tT][rR][iI][nN][gG][sS]|[fF][iI][lL][eE]|[fF][iI][lL][eE][bB][uU][fF][sS][iI][zZ][eE]|[fF][iI][lL][eE][cC][lL][oO][sS][eE]|[fF][iI][lL][eE][eE][rR][rR][oO][rR][tT][eE][xX][tT]|[fF][iI][lL][eE][oO][pP][eE][nN]|[fF][iI][lL][eE][rR][eE][aA][dD]|[fF][iI][lL][eE][rR][eE][aA][dD][bB][yY][tT][eE]|[fF][iI][lL][eE][rR][eE][aA][dD][uU][tT][fF]16[lL][eE]|[fF][iI][lL][eE][rR][eE][aA][dD][wW][oO][rR][dD]|[fF][iI][lL][eE][wW][rR][iI][tT][eE][uU][tT][fF]16[lL][eE]|[fF][iI][lL][eE][sS][eE][eE][kK]|[fF][iI][lL][eE][wW][rR][iI][tT][eE]|[fF][iI][lL][eE][wW][rR][iI][tT][eE][bB][yY][tT][eE]|[fF][iI][lL][eE][wW][rR][iI][tT][eE][wW][oO][rR][dD]|[fF][iI][nN][dD][cC][lL][oO][sS][eE]|[fF][iI][nN][dD][fF][iI][rR][sS][tT]|[fF][iI][nN][dD][nN][eE][xX][tT]|[fF][iI][nN][dD][wW][iI][nN][dD][oO][wW]|[fF][lL][uU][sS][hH][iI][nN][iI]|[gG][eE][tT][cC][uU][rR][iI][nN][sS][tT][tT][yY][pP][eE]|[gG][eE][tT][cC][uU][rR][rR][eE][nN][tT][aA][dD][dD][rR][eE][sS][sS]|[gG][eE][tT][dD][lL][gG][iI][tT][eE][mM]|[gG][eE][tT][dD][lL][lL][vV][eE][rR][sS][iI][oO][nN]|[gG][eE][tT][dD][lL][lL][vV][eE][rR][sS][iI][oO][nN][lL][oO][cC][aA][lL]|[gG][eE][tT][eE][rR][rR][oO][rR][lL][eE][vV][eE][lL]|[gG][eE][tT][fF][iI][lL][eE][tT][iI][mM][eE]|[gG][eE][tT][fF][iI][lL][eE][tT][iI][mM][eE][lL][oO][cC][aA][lL]|[gG][eE][tT][fF][uU][lL][lL][pP][aA][tT][hH][nN][aA][mM][eE]|[gG][eE][tT][fF][uU][nN][cC][tT][iI][oO][nN][aA][dD][dD][rR][eE][sS][sS]|[gG][eE][tT][iI][nN][sS][tT][dD][iI][rR][eE][rR][rR][oO][rR]|[gG][eE][tT][kK][nN][oO][wW][nN][fF][oO][lL][dD][eE][rR][pP][aA][tT][hH]|[gG][eE][tT][lL][aA][bB][eE][lL][aA][dD][dD][rR][eE][sS][sS]|[gG][eE][tT][rR][eE][gG][vV][iI][eE][wW]|[gG][eE][tT][sS][hH][eE][lL][lL][vV][aA][rR][cC][oO][nN][tT][eE][xX][tT]|[gG][eE][tT][tT][eE][mM][pP][fF][iI][lL][eE][nN][aA][mM][eE]|[gG][eE][tT][wW][iI][nN][vV][eE][rR]|[gG][oO][tT][oO]|[hH][iI][dD][eE][wW][iI][nN][dD][oO][wW]|[iI][cC][oO][nN]|[iI][fF][aA][bB][oO][rR][tT]|[iI][fF][aA][lL][tT][rR][eE][gG][vV][iI][eE][wW]|[iI][fF][eE][rR][rR][oO][rR][sS]|[iI][fF][fF][iI][lL][eE][eE][xX][iI][sS][tT][sS]|[iI][fF][rR][eE][bB][oO][oO][tT][fF][lL][aA][gG]|[iI][fF][rR][tT][lL][lL][aA][nN][gG][uU][aA][gG][eE]|[iI][fF][sS][hH][eE][lL][lL][vV][aA][rR][cC][oO][nN][tT][eE][xX][tT][aA][lL][lL]|[iI][fF][sS][iI][lL][eE][nN][tT]|[iI][nN][iI][tT][pP][lL][uU][gG][iI][nN][sS][dD][iI][rR]|[iI][nN][sS][tT][aA][lL][lL][bB][uU][tT][tT][oO][nN][tT][eE][xX][tT]|[iI][nN][sS][tT][aA][lL][lL][cC][oO][lL][oO][rR][sS]|[iI][nN][sS][tT][aA][lL][lL][dD][iI][rR]|[iI][nN][sS][tT][aA][lL][lL][dD][iI][rR][rR][eE][gG][kK][eE][yY]|[iI][nN][sS][tT][pP][rR][oO][gG][rR][eE][sS][sS][fF][lL][aA][gG][sS]|[iI][nN][sS][tT][tT][yY][pP][eE]|[iI][nN][sS][tT][tT][yY][pP][eE][gG][eE][tT][tT][eE][xX][tT]|[iI][nN][sS][tT][tT][yY][pP][eE][sS][eE][tT][tT][eE][xX][tT]|[iI][nN][tT]64[cC][mM][pP]|[iI][nN][tT]64[cC][mM][pP][uU]|[iI][nN][tT]64[fF][mM][tT]|[iI][nN][tT][cC][mM][pP]|[iI][nN][tT][cC][mM][pP][uU]|[iI][nN][tT][fF][mM][tT]|[iI][nN][tT][oO][pP]|[iI][nN][tT][pP][tT][rR][cC][mM][pP]|[iI][nN][tT][pP][tT][rR][cC][mM][pP][uU]|[iI][nN][tT][pP][tT][rR][oO][pP]|[iI][sS][wW][iI][nN][dD][oO][wW]|[lL][aA][nN][gG][sS][tT][rR][iI][nN][gG]|[lL][iI][cC][eE][nN][sS][eE][bB][kK][cC][oO][lL][oO][rR]|[lL][iI][cC][eE][nN][sS][eE][dD][aA][tT][aA]|[lL][iI][cC][eE][nN][sS][eE][fF][oO][rR][cC][eE][sS][eE][lL][eE][cC][tT][iI][oO][nN]|[lL][iI][cC][eE][nN][sS][eE][lL][aA][nN][gG][sS][tT][rR][iI][nN][gG]|[lL][iI][cC][eE][nN][sS][eE][tT][eE][xX][tT]|[lL][oO][aA][dD][aA][nN][dD][sS][eE][tT][iI][mM][aA][gG][eE]|[lL][oO][aA][dD][lL][aA][nN][gG][uU][aA][gG][eE][fF][iI][lL][eE]|[lL][oO][cC][kK][wW][iI][nN][dD][oO][wW]|[lL][oO][gG][sS][eE][tT]|[lL][oO][gG][tT][eE][xX][tT]|[mM][aA][nN][iI][fF][eE][sS][tT][aA][pP][pP][eE][nN][dD][cC][uU][sS][tT][oO][mM][sS][tT][rR][iI][nN][gG]|[mM][aA][nN][iI][fF][eE][sS][tT][dD][iI][sS][aA][bB][lL][eE][wW][iI][nN][dD][oO][wW][fF][iI][lL][tT][eE][rR][iI][nN][gG]|[mM][aA][nN][iI][fF][eE][sS][tT][dD][pP][iI][aA][wW][aA][rR][eE]|[mM][aA][nN][iI][fF][eE][sS][tT][dD][pP][iI][aA][wW][aA][rR][eE][nN][eE][sS][sS]|[mM][aA][nN][iI][fF][eE][sS][tT][gG][dD][iI][sS][cC][aA][lL][iI][nN][gG]|[mM][aA][nN][iI][fF][eE][sS][tT][lL][oO][nN][gG][pP][aA][tT][hH][aA][wW][aA][rR][eE]|[mM][aA][nN][iI][fF][eE][sS][tT][mM][aA][xX][vV][eE][rR][sS][iI][oO][nN][tT][eE][sS][tT][eE][dD]|[mM][aA][nN][iI][fF][eE][sS][tT][sS][uU][pP][pP][oO][rR][tT][eE][dD][oO][sS]|[mM][eE][sS][sS][aA][gG][eE][bB][oO][xX]|[mM][iI][sS][cC][bB][uU][tT][tT][oO][nN][tT][eE][xX][tT]|[nN][aA][mM][eE]|[nN][oO][pP]|[oO][uU][tT][fF][iI][lL][eE]|[pP][aA][gG][eE]|[pP][aA][gG][eE][cC][aA][lL][lL][bB][aA][cC][kK][sS]|[pP][eE][aA][dD][dD][rR][eE][sS][oO][uU][rR][cC][eE]|[pP][eE][dD][lL][lL][cC][hH][aA][rR][aA][cC][tT][eE][rR][iI][sS][tT][iI][cC][sS]|[pP][eE][rR][eE][mM][oO][vV][eE][rR][eE][sS][oO][uU][rR][cC][eE]|[pP][eE][sS][uU][bB][sS][yY][sS][vV][eE][rR]|[pP][oO][pP]|[pP][uU][sS][hH]|[qQ][uU][iI][tT]|[rR][eE][aA][dD][eE][nN][vV][sS][tT][rR]|[rR][eE][aA][dD][iI][nN][iI][sS][tT][rR]|[rR][eE][aA][dD][mM][eE][mM][oO][rR][yY]|[rR][eE][aA][dD][rR][eE][gG][dD][wW][oO][rR][dD]|[rR][eE][aA][dD][rR][eE][gG][sS][tT][rR]|[rR][eE][bB][oO][oO][tT]|[rR][eE][gG][dD][lL][lL]|[rR][eE][nN][aA][mM][eE]|[rR][eE][qQ][uU][eE][sS][tT][eE][xX][eE][cC][uU][tT][iI][oO][nN][lL][eE][vV][eE][lL]|[rR][eE][sS][eE][rR][vV][eE][fF][iI][lL][eE]|[rR][eE][tT][uU][rR][nN]|[rR][mM][dD][iI][rR]|[sS][eE][aA][rR][cC][hH][pP][aA][tT][hH]|[sS][eE][cC][tT][iI][oO][nN][gG][eE][tT][fF][lL][aA][gG][sS]|[sS][eE][cC][tT][iI][oO][nN][gG][eE][tT][iI][nN][sS][tT][tT][yY][pP][eE][sS]|[sS][eE][cC][tT][iI][oO][nN][gG][eE][tT][sS][iI][zZ][eE]|[sS][eE][cC][tT][iI][oO][nN][gG][eE][tT][tT][eE][xX][tT]|[sS][eE][cC][tT][iI][oO][nN][iI][nN]|[sS][eE][cC][tT][iI][oO][nN][iI][nN][sS][tT][tT][yY][pP][eE]|[sS][eE][cC][tT][iI][oO][nN][sS][eE][tT][fF][lL][aA][gG][sS]|[sS][eE][cC][tT][iI][oO][nN][sS][eE][tT][iI][nN][sS][tT][tT][yY][pP][eE][sS]|[sS][eE][cC][tT][iI][oO][nN][sS][eE][tT][sS][iI][zZ][eE]|[sS][eE][cC][tT][iI][oO][nN][sS][eE][tT][tT][eE][xX][tT]|[sS][eE][nN][dD][mM][eE][sS][sS][aA][gG][eE]|[sS][eE][tT][aA][uU][tT][oO][cC][lL][oO][sS][eE]|[sS][eE][tT][bB][rR][aA][nN][dD][iI][nN][gG][iI][mM][aA][gG][eE]|[sS][eE][tT][cC][oO][mM][pP][rR][eE][sS][sS]|[sS][eE][tT][cC][oO][mM][pP][rR][eE][sS][sS][iI][oO][nN][lL][eE][vV][eE][lL]|[sS][eE][tT][cC][oO][mM][pP][rR][eE][sS][sS][oO][rR]|[sS][eE][tT][cC][oO][mM][pP][rR][eE][sS][sS][oO][rR][dD][iI][cC][tT][sS][iI][zZ][eE]|[sS][eE][tT][cC][tT][lL][cC][oO][lL][oO][rR][sS]|[sS][eE][tT][cC][uU][rR][iI][nN][sS][tT][tT][yY][pP][eE]|[sS][eE][tT][dD][aA][tT][aA][bB][lL][oO][cC][kK][oO][pP][tT][iI][mM][iI][zZ][eE]|[sS][eE][tT][dD][aA][tT][eE][sS][aA][vV][eE]|[sS][eE][tT][dD][eE][tT][aA][iI][lL][sS][pP][rR][iI][nN][tT]|[sS][eE][tT][dD][eE][tT][aA][iI][lL][sS][vV][iI][eE][wW]|[sS][eE][tT][eE][rR][rR][oO][rR][lL][eE][vV][eE][lL]|[sS][eE][tT][eE][rR][rR][oO][rR][sS]|[sS][eE][tT][fF][iI][lL][eE][aA][tT][tT][rR][iI][bB][uU][tT][eE][sS]|[sS][eE][tT][fF][oO][nN][tT]|[sS][eE][tT][oO][uU][tT][pP][aA][tT][hH]|[sS][eE][tT][oO][vV][eE][rR][wW][rR][iI][tT][eE]|[sS][eE][tT][rR][eE][bB][oO][oO][tT][fF][lL][aA][gG]|[sS][eE][tT][rR][eE][gG][vV][iI][eE][wW]|[sS][eE][tT][sS][hH][eE][lL][lL][vV][aA][rR][cC][oO][nN][tT][eE][xX][tT]|[sS][eE][tT][sS][iI][lL][eE][nN][tT]|[sS][hH][oO][wW][iI][nN][sS][tT][dD][eE][tT][aA][iI][lL][sS]|[sS][hH][oO][wW][uU][nN][iI][nN][sS][tT][dD][eE][tT][aA][iI][lL][sS]|[sS][hH][oO][wW][wW][iI][nN][dD][oO][wW]|[sS][iI][lL][eE][nN][tT][iI][nN][sS][tT][aA][lL][lL]|[sS][iI][lL][eE][nN][tT][uU][nN][iI][nN][sS][tT][aA][lL][lL]|[sS][lL][eE][eE][pP]|[sS][pP][aA][cC][eE][tT][eE][xX][tT][sS]|[sS][tT][rR][cC][mM][pP]|[sS][tT][rR][cC][mM][pP][sS]|[sS][tT][rR][cC][pP][yY]|[sS][tT][rR][lL][eE][nN]|[sS][uU][bB][cC][aA][pP][tT][iI][oO][nN]|[tT][aA][rR][gG][eE][tT]|[uU][nN][iI][cC][oO][dD][eE]|[uU][nN][iI][nN][sS][tT][aA][lL][lL][bB][uU][tT][tT][oO][nN][tT][eE][xX][tT]|[uU][nN][iI][nN][sS][tT][aA][lL][lL][cC][aA][pP][tT][iI][oO][nN]|[uU][nN][iI][nN][sS][tT][aA][lL][lL][iI][cC][oO][nN]|[uU][nN][iI][nN][sS][tT][aA][lL][lL][sS][uU][bB][cC][aA][pP][tT][iI][oO][nN]|[uU][nN][iI][nN][sS][tT][aA][lL][lL][tT][eE][xX][tT]|[uU][nN][iI][nN][sS][tT][pP][aA][gG][eE]|[uU][nN][rR][eE][gG][dD][lL][lL]|[uU][nN][sS][aA][fF][eE][sS][tT][rR][cC][pP][yY]|[vV][iI][aA][dD][dD][vV][eE][rR][sS][iI][oO][nN][kK][eE][yY]|[vV][iI][fF][iI][lL][eE][vV][eE][rR][sS][iI][oO][nN]|[vV][iI][pP][rR][oO][dD][uU][cC][tT][vV][eE][rR][sS][iI][oO][nN]|[wW][iI][nN][dD][oO][wW][iI][cC][oO][nN]|[wW][rR][iI][tT][eE][iI][nN][iI][sS][tT][rR]|[wW][rR][iI][tT][eE][rR][eE][gG][bB][iI][nN]|[wW][rR][iI][tT][eE][rR][eE][gG][dD][wW][oO][rR][dD]|[wW][rR][iI][tT][eE][rR][eE][gG][eE][xX][pP][aA][nN][dD][sS][tT][rR]|[wW][rR][iI][tT][eE][rR][eE][gG][mM][uU][lL][tT][iI][sS][tT][rR]|[wW][rR][iI][tT][eE][rR][eE][gG][nN][oO][nN][eE]|[wW][rR][iI][tT][eE][rR][eE][gG][sS][tT][rR]|[wW][rR][iI][tT][eE][uU][nN][iI][nN][sS][tT][aA][lL][lL][eE][rR]|[xX][pP][sS][tT][yY][lL][eE])$"))
; ── Deprecated Commands ──

(command
  name: (identifier) @keyword.deprecated
  (#match? @keyword.deprecated "^([cC][oO][mM][pP][aA][rR][eE][dD][lL][lL][vV][eE][rR][sS][iI][oO][nN][sS]|[cC][oO][mM][pP][aA][rR][eE][fF][iI][lL][eE][tT][iI][mM][eE][sS]|[dD][iI][rR][sS][hH][oO][wW]|[dD][iI][sS][aA][bB][lL][eE][dD][bB][iI][tT][mM][aA][pP]|[eE][nN][aA][bB][lL][eE][dD][bB][iI][tT][mM][aA][pP]|[gG][eE][tT][fF][uU][lL][lL][dD][lL][lL][pP][aA][tT][hH]|[gG][eE][tT][pP][aA][rR][eE][nN][tT]|[gG][eE][tT][wW][iI][nN][aA][mM][pP][iI][nN][sS][tT][pP][aA][tT][hH]|[lL][aA][nN][gG][sS][tT][rR][iI][nN][gG][uU][pP]|[pP][aA][cC][kK][eE][xX][eE][hH][eE][aA][dD][eE][rR]|[sS][eE][cC][tT][iI][oO][nN][dD][iI][vV][iI][dD][eE][rR]|[sS][eE][tT][pP][lL][uU][gG][iI][nN][uU][nN][lL][oO][aA][dD]|[sS][uU][bB][sS][eE][cC][tT][iI][oO][nN]|[sS][uU][bB][sS][eE][cC][tT][iI][oO][nN][eE][nN][dD]|[uU][nN][iI][nN][sS][tT][aA][lL][lL][eE][xX][eE][nN][aA][mM][eE])$"))

; ── Variables & References ──

(variable) @variable
(define_reference) @constant.builtin
(lang_string_reference) @string.special

; ── Built-in Variables ──

((variable) @variable.builtin
  (#match? @variable.builtin "^\\$([aA][dD][mM][iI][nN][tT][oO][oO][lL][sS]|[aA][pP][pP][dD][aA][tT][aA]|[cC][dD][bB][uU][rR][nN]_[aA][rR][eE][aA]|[cC][mM][dD][lL][iI][nN][eE]|[cC][oO][mM][mM][oO][nN][fF][iI][lL][eE][sS]|[cC][oO][oO][kK][iI][eE][sS]|[dD][eE][sS][kK][tT][oO][pP]|[dD][oO][cC][uU][mM][eE][nN][tT][sS]|[eE][xX][eE][dD][iI][rR]|[eE][xX][eE][fF][iI][lL][eE]|[eE][xX][eE][pP][aA][tT][hH]|[fF][aA][vV][oO][rR][iI][tT][eE][sS]|[fF][oO][nN][tT][sS]|[hH][iI][sS][tT][oO][rR][yY]|[hH][wW][nN][dD][pP][aA][rR][eE][nN][tT]|[iI][nN][sS][tT][dD][iI][rR]|[iI][nN][tT][eE][rR][nN][eE][tT]_[cC][aA][cC][hH][eE]|[lL][aA][nN][gG][uU][aA][gG][eE]|[lL][oO][cC][aA][lL][aA][pP][pP][dD][aA][tT][aA]|[mM][uU][sS][iI][cC]|[nN][eE][tT][hH][oO][oO][dD]|[nN][sS][iI][sS]_[mM][aA][xX]_[sS][tT][rR][lL][eE][nN]|[nN][sS][iI][sS]_[vV][eE][rR][sS][iI][oO][nN]|[nN][sS][iI][sS][dD][iI][rR]|[oO][uU][tT][dD][iI][rR]|[pP][iI][cC][tT][uU][rR][eE][sS]|[pP][lL][uU][gG][iI][nN][sS][dD][iI][rR]|[pP][rR][iI][nN][tT][hH][oO][oO][dD]|[pP][rR][oO][fF][iI][lL][eE]|[pP][rR][oO][gG][rR][aA][mM][fF][iI][lL][eE][sS]|[pP][rR][oO][gG][rR][aA][mM][fF][iI][lL][eE][sS]32|[pP][rR][oO][gG][rR][aA][mM][fF][iI][lL][eE][sS]64|[qQ][uU][iI][cC][kK][lL][aA][uU][nN][cC][hH]|[rR][eE][cC][eE][nN][tT]|[rR][eE][sS][oO][uU][rR][cC][eE][sS]|[rR][eE][sS][oO][uU][rR][cC][eE][sS]_[lL][oO][cC][aA][lL][iI][zZ][eE][dD]|[sS][eE][nN][dD][tT][oO]|[sS][mM][pP][rR][oO][gG][rR][aA][mM][sS]|[sS][mM][sS][tT][aA][rR][tT][uU][pP]|[sS][tT][aA][rR][tT][mM][eE][nN][uU]|[sS][yY][sS][dD][iI][rR]|[tT][eE][mM][pP]|[tT][eE][mM][pP][lL][aA][tT][eE][sS]|[vV][iI][dD][eE][oO][sS]|[wW][iI][nN][dD][iI][rR])$"))

; ── Strings ──

(string) @string
(raw_string) @string
(backtick_string) @string
(escape_sequence) @constant.character.escape

; ── Numbers ──

(number) @constant.numeric

; ── Flags ──

(flag) @attribute

; ── Operators ──

(comparison_operator) @operator
(pipe_operator) @operator

; ── Comments ──

(comment) @comment.line
(block_comment) @comment.block
