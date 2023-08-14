const numReplacers = {
    "i": ["1"],
    "l": ["1"],
    "e": ["3"],
    "a": ["4"],
    "s": ["5"],
    "t": ["7"],
    "b": ["8"],
    "g": ["9"],
    "o": ["0"]
};

const symReplacers = {
    "a": ["@", "∆", "/-\\\\", "/_\\\\", "/\\\\", "Д"],
    "b": ["\\|}", "\\|:", "\\|8", "ß", "ь"],
    "c": ["\\(", "€"],
    "e": ["£"],
    "f": ["ƒ", "£"],
    "h": ["\\|-\\|", "#", "\\}\\{"],
    "i": ["!", "\\|"],
    "j": ["ʝ"],
    "k": ["\\|<"],
    "l": ["!", "\\|"],
    "n": ["\\|\\|"],
    "s": ["\\$", "§"],
    "x": ["><"],
    "y": ["¥"]
};

const letReplacers = {
    "i": ["l"],
    "l": ["i"],
    "u": ["v"],
    "m": ["nn", "rn"],
    "w": ["vv", "uu"]
};

const emoReplacers = {
    "a": ["🇦", "🅰️"],
    "b": ["🇧", "🅱️"],
    "c": ["🇨", "©️"],
    "d": ["🇩"],
    "e": ["🇪"],
    "f": ["🇫"],
    "g": ["🇬"],
    "h": ["🇭"],
    "i": ["🇮", "ℹ️"],
    "j": ["🇯"],
    "k": ["🇰"],
    "l": ["🇱"],
    "m": ["🇲", "Ⓜ️"],
    "n": ["🇳"],
    "o": ["🇴", "🅾️⭕"],
    "p": ["🇵", "🅿️"],
    "q": ["🇶"],
    "r": ["🇷", "®️"],
    "s": ["🇸"],
    "t": ["🇹", "✝️"],
    "u": ["🇺"],
    "v": ["🇻"],
    "w": ["🇼"],
    "x": ["🇽", "❌", "❎", "✖️"],
    "y": ["🇾"],
    "z": ["🇿"],
    "1": ["1️⃣"],
    "2": ["2️⃣"],
    "3": ["3️⃣"],
    "4": ["4️⃣"],
    "5": ["5️⃣"],
    "6": ["6️⃣"],
    "7": ["7️⃣"],
    "8": ["8️⃣"],
    "9": ["9️⃣"],
    "0": ["0️⃣"]
};

function generateLeetspeakRegex(text, settings) {

    let end_text = "";
    let previous_charater;
    let previous_charater_combo = 0;
    let previous_charater_modified = false;
    for (var i = 0; i < text.length; i++) {
        let character = (text[i]);
        let replacers = [];

        if (character == previous_charater & previous_charater_modified) {
            previous_charater_combo++;
            continue;
        } else if (previous_charater_combo > 0 & previous_charater_modified) {
            if ((settings & 16) != 0) {
                end_text = end_text.concat(`{${previous_charater_combo + 1},}`);
            } else if ((settings & 512) != 0 && (settings & 16) != 0) {
                end_text = end_text.concat(`+`)
            } else if ((settings & 512) != 0 && (settings & 16) == 0) {
                end_text = end_text.concat(`{1, ${previous_charater_combo + 1}}`)
            } else {
                end_text = end_text.concat(`{${previous_charater_combo + 1}}`);
            }
            previous_charater_combo = 0;
            previous_charater_modified = false;
        } else if (i != 0 & previous_charater_combo == 0 & (settings & 16) != 0) {
            end_text = end_text.concat(`+`);
        };

        if ((settings & 1) != 0) {
            const numbers = numReplacers[character];
            if (numbers) {
                for (var i2 = 0; i2 < numbers.length; i2++) {
                    replacers.push(numbers[i2]);
                };
            };
        };

        if ((settings & 2) != 0) {
            const symbols = symReplacers[character];
            if (symbols) {
                for (var i2 = 0; i2 < symbols.length; i2++) {
                    replacers.push(symbols[i2]);
                };
            };
        };

        if ((settings & 4) != 0) {
            const letters = letReplacers[character];
            if (letters) {
                for (var i2 = 0; i2 < letters.length; i2++) {
                    replacers.push(letters[i2]);
                };
            };
        };

        if ((settings & 8) != 0) {
            const emojis = emoReplacers[character];
            if (emojis) {
                for (var i2 = 0; i2 < emojis.length; i2++) {
                    replacers.push(emojis[i2]);
                };
            };
        };

        let is_all_one_char = true
        for (var i2 = 0; i2 < replacers.length; i2++) {
            let replacer = replacers[i2];

            if (replacer == null) {break}

            if (replacer.replaceAll("\\", "").length > 1 & ((settings & 32) != 0 || /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g.test(replacer))) {
                is_all_one_char = false
            } else if (replacer.replaceAll("\\", "").length > 1) {
                // pass
            } else if (replacer.length > 1) {
                replacers.splice(i2, 1)
                i2--
            }
        };

        if ((settings & 64) != 0 & !end_text == "") {
            end_text = end_text.concat("\\s*")
        }
        if (replacers.length == 0) {
            end_text = end_text.concat(character);
        } else {
            if (is_all_one_char) {
                end_text = end_text.concat(`[${character}${replacers.join('')}]`);
            } else {
                end_text = end_text.concat(`(${character}|${replacers.join('|')})`);
            }
            previous_charater_modified = true;
        };

        if ((settings & 128) != 0 & (character == "a" || character == "e" || character == "i" || character == "o" || character == "u")) {
            end_text = end_text.concat("?")
        };

        previous_charater = character;
    };

    if (previous_charater_combo > 0 & previous_charater_modified) {
        if ((settings & 16) != 0) {
            end_text = end_text.concat(`{${previous_charater_combo + 1},}`);
        } else {
            end_text = end_text.concat(`{${previous_charater_combo + 1}, ${previous_charater_combo + 1}}`);
        }
        previous_charater_combo = 0;
        previous_charater_modified = false;
    };

    if (previous_charater_combo > 0 & previous_charater_modified) {
        if ((settings & 16) != 0  && (settings & 512) == 0) {
            end_text = end_text.concat(`{${previous_charater_combo + 1},}`);
        } else if ((settings & 512) != 0 && (settings & 16) != 0) {
            end_text = end_text.concat(`+`)
        } else if ((settings & 512) != 0 && (settings & 16) == 0) {
            end_text = end_text.concat(`{0, ${previous_charater_combo + 1}}`)
        } else {
            end_text = end_text.concat(`{${previous_charater_combo + 1}}`);
        }
        previous_charater_combo = 0;
        previous_charater_modified = false;
    } else if (previous_charater_combo == 0 & (settings & 16) != 0) {
        end_text = end_text.concat(`+`);
    };

    if ((settings & 256) == 0) {
        end_text = `(\\A|\\s)${end_text}(\\z|\\s)`
    }
    
    return {
      regex: end_text,
      too_long: end_text.length > 260
    }
  }

// module.exports = {
//     generateLeetspeakRegex: generateLeetspeakRegex
// }

export { generateLeetspeakRegex }