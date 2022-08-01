define("ace/mode/clue_highlight_rules", [
  "require",
  "exports",
  "module",
  "ace/lib/oop",
  "ace/mode/text_highlight_rules"
], function (require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

  var ClueHighlightRules = function () {
    this.$rules = {
      start: [
        {
          token: "constant.numeric.integer.hexadecimal.clue",
          regex: /(?<![\w\d.])0[xX][0-9A-Fa-f]+(?![pPeE.0-9])/
        },
        {
          token: "constant.numeric.float.hexadecimal.clue",
          regex:
            /(?<![\w\d.])0[xX][0-9A-Fa-f]+(?:\.[0-9A-Fa-f]+)?(?:[eE]-?\d*)?(?:[pP][-+]\d+)?/
        },
        {
          token: "constant.numeric.integer.clue",
          regex: /(?<![\w\d.])\d+(?![pPeE.0-9])/
        },
        {
          token: "constant.numeric.float.clue",
          regex: /(?<![\w\d.])\d+(?:\.\d+)?(?:[eE]-?\d*)?/
        },
        {
          token: "punctuation.definition.string.multilined.begin.clue",
          regex: /'/,
          push: [
            {
              token: "punctuation.definition.string.multilined.end.clue",
              regex: /'/,
              next: "pop"
            },
            {
              include: "#escaped_char"
            },
            {
              defaultToken: "string.quoted.single.clue"
            }
          ]
        },
        {
          token: "punctuation.definition.string.multilined.begin.clue",
          regex: /"/,
          push: [
            {
              token: "punctuation.definition.string.multilined.end.clue",
              regex: /"/,
              next: "pop"
            },
            {
              include: "#escaped_char"
            },
            {
              defaultToken: "string.quoted.double.clue"
            }
          ]
        },
        {
          token: "comment.line.double-dash.clue",
          regex: /\/\/.*/
        },
        {
          token: "punctuatio.definition.comment.begin.clue",
          regex: /\/\*/,
          push: [
            {
              token: "punctuatio.definition.comment.end.clue",
              regex: /\*\//,
              next: "pop"
            },
            {
              include: "#escaped_char"
            },
            {
              defaultToken: "comment.block.clue"
            }
          ]
        },
        {
          token: "keyword.control.clue",
          regex:
            /\b(?:if|elseif|else|for|of|in|with|while|meta|until|fn|method|return|loop|enum|continue|break|try|catch|match|default)\b/
        },
        {
          token: "keyword.scope.clue",
          regex: /\b(?:local|global|static)\b/
        },
        {
          token: "constant.language.clue",
          regex:
            /(?<![^.]\.|:)\b(?:false|nil|true|_G|_VERSION|math\.(?:pi|huge))\b|(?<![.])\.{3}(?!\.)/
        },
        {
          token: "variable.language.self.clue",
          regex: /(?<![^.]\.|:)\bself\b/
        },
        {
          token: "support.function.any-method.clue",
          regex: /\b([a-zA-Z_][a-zA-Z0-9_]*)\b(?=\(\s*)"/
        },
        {
          token: "variable.other.clue",
          regex: /[A-Za-z_][0-9A-Za-z_]*/
        },
        {
          token: "keyword.operator.clue",
          regex:
            /\&|\||\!|\~|\?|\.|\$|:|\+|-|%|#|\*|\/|\^|==?|<=?|>=?|(?<!\.)\.{2}(?!\.)/
        }
      ],
      "#escaped_char": [
        {
          token: "constant.character.escape.clue",
          regex: /\\[abfnrtvz\\"'$]/
        },
        {
          token: "constant.character.escape.byte.clue",
          regex: /\\\d{1,3}/
        },
        {
          token: "constant.character.escape.byte.clue",
          regex: /\\x[0-9A-Fa-f][0-9A-Fa-f]/
        },
        {
          token: "constant.character.escape.unicode.clue",
          regex: /\\u\{[0-9A-Fa-f]+\}/
        },
        {
          token: "invalid.illegal.character.escape.clue",
          regex: /\\./
        }
      ]
    };

    this.normalizeRules();
  };

  ClueHighlightRules.metaData = {
    name: "Clue",
    scopeName: "source.clue"
  };

  oop.inherits(ClueHighlightRules, TextHighlightRules);

  exports.ClueHighlightRules = ClueHighlightRules;
});

define("ace/mode/folding/cstyle", [
  "require",
  "exports",
  "module",
  "ace/lib/oop",
  "ace/range",
  "ace/mode/folding/fold_mode"
], function (require, exports, module) {
  "use strict";

  var oop = require("../../lib/oop");
  var Range = require("../../range").Range;
  var BaseFoldMode = require("./fold_mode").FoldMode;

  var FoldMode = (exports.FoldMode = function (commentRegex) {
    if (commentRegex) {
      this.foldingStartMarker = new RegExp(
        this.foldingStartMarker.source.replace(
          /\|[^|]*?$/,
          "|" + commentRegex.start
        )
      );
      this.foldingStopMarker = new RegExp(
        this.foldingStopMarker.source.replace(
          /\|[^|]*?$/,
          "|" + commentRegex.end
        )
      );
    }
  });
  oop.inherits(FoldMode, BaseFoldMode);

  (function () {
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    this._getFoldWidgetBase = this.getFoldWidget;
    this.getFoldWidget = function (session, foldStyle, row) {
      var line = session.getLine(row);

      if (this.singleLineBlockCommentRe.test(line)) {
        if (
          !this.startRegionRe.test(line) &&
          !this.tripleStarBlockCommentRe.test(line)
        )
          return "";
      }

      var fw = this._getFoldWidgetBase(session, foldStyle, row);

      if (!fw && this.startRegionRe.test(line)) return "start"; // lineCommentRegionStart

      return fw;
    };

    this.getFoldWidgetRange = function (
      session,
      foldStyle,
      row,
      forceMultiline
    ) {
      var line = session.getLine(row);

      if (this.startRegionRe.test(line))
        return this.getCommentRegionBlock(session, line, row);

      var match = line.match(this.foldingStartMarker);
      if (match) {
        var i = match.index;

        if (match[1])
          return this.openingBracketBlock(session, match[1], row, i);

        var range = session.getCommentFoldRange(row, i + match[0].length, 1);

        if (range && !range.isMultiLine()) {
          if (forceMultiline) {
            range = this.getSectionRange(session, row);
          } else if (foldStyle != "all") range = null;
        }

        return range;
      }

      if (foldStyle === "markbegin") return;

      var match = line.match(this.foldingStopMarker);
      if (match) {
        var i = match.index + match[0].length;

        if (match[1])
          return this.closingBracketBlock(session, match[1], row, i);

        return session.getCommentFoldRange(row, i, -1);
      }
    };

    this.getSectionRange = function (session, row) {
      var line = session.getLine(row);
      var startIndent = line.search(/\S/);
      var startRow = row;
      var startColumn = line.length;
      row = row + 1;
      var endRow = row;
      var maxRow = session.getLength();
      while (++row < maxRow) {
        line = session.getLine(row);
        var indent = line.search(/\S/);
        if (indent === -1) continue;
        if (startIndent > indent) break;
        var subRange = this.getFoldWidgetRange(session, "all", row);

        if (subRange) {
          if (subRange.start.row <= startRow) {
            break;
          } else if (subRange.isMultiLine()) {
            row = subRange.end.row;
          } else if (startIndent == indent) {
            break;
          }
        }
        endRow = row;
      }

      return new Range(
        startRow,
        startColumn,
        endRow,
        session.getLine(endRow).length
      );
    };
    this.getCommentRegionBlock = function (session, line, row) {
      var startColumn = line.search(/\s*$/);
      var maxRow = session.getLength();
      var startRow = row;

      var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
      var depth = 1;
      while (++row < maxRow) {
        line = session.getLine(row);
        var m = re.exec(line);
        if (!m) continue;
        if (m[1]) depth--;
        else depth++;

        if (!depth) break;
      }

      var endRow = row;
      if (endRow > startRow) {
        return new Range(startRow, startColumn, endRow, line.length);
      }
    };
  }.call(FoldMode.prototype));
});

define("ace/mode/clue", [
  "require",
  "exports",
  "module",
  "ace/lib/oop",
  "ace/mode/text",
  "ace/mode/clue_highlight_rules",
  "ace/mode/folding/cstyle"
], function (require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  var TextMode = require("./text").Mode;
  var ClueHighlightRules = require("./clue_highlight_rules").ClueHighlightRules;
  var FoldMode = require("./folding/cstyle").FoldMode;

  var Mode = function () {
    this.HighlightRules = ClueHighlightRules;
    this.foldingRules = new FoldMode();
  };
  oop.inherits(Mode, TextMode);

  (function () {
    this.$id = "ace/mode/clue";
  }.call(Mode.prototype));

  exports.Mode = Mode;
});
(function () {
  window.require(["ace/mode/clue"], function (m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
