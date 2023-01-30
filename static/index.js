const output = document.getElementById("regex-output")
const input = document.getElementById("word-input")
const error_length = document.getElementById("regex-error-toolong")

const checkbox_num = document.getElementById("filter-num")
const checkbox_sym = document.getElementById("filter-sym")
const checkbox_let = document.getElementById("filter-let")
const checkbox_emo = document.getElementById("filter-emo")
const checkbox_dub = document.getElementById("double-spm")
const checkbox_mul = document.getElementById("multi-char")
const checkbox_vow = document.getElementById("vowel-less")
const checkbox_whi = document.getElementById("whitespace")

const numReplacers = {
    "i": ["1"],
    "l": ["1"],
    "e": ["3"],
    "a": ["4"],
    "t": ["7"],
    "b": ["8"],
    "g": ["9"],
    "o": ["0"],
    "s": ["5"]
};

const symReplacers = {
    "i": ["!", "|"],
    "l": ["!", "|"],
    "s": ["\\$"],
    "h": ["\\|-\\|"],
    "n": ["|\\|"],
    "c": ["\\("],
    "k": ["\\|<"],
    "a": ["@", "∆", "/-\\\\", "/_\\", "/\\", "Д"],
    "b": ["|}", "|:", "|8", "ß", "ь"]
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

function updateRegex() {
    let start_text;
    if (!input.value == "") {
        start_text = input.value.toLowerCase();
    } else {
        start_text = "hello world";
    };
    
    let end_text = "";
    let previous_charater;
    let previous_charater_combo = 0;
    let previous_charater_modified = false;
    for (var i = 0; i < start_text.length; i++) {
        let character = (start_text[i]);
        let replacers = [];

        if (character == previous_charater & previous_charater_modified) {
            previous_charater_combo++;
            continue;
        } else if (previous_charater_combo > 0 & previous_charater_modified) {
            if (checkbox_dub.checked) {
                end_text = end_text.concat(`{${previous_charater_combo + 1},}`);
            } else {
                end_text = end_text.concat(`{${previous_charater_combo + 1}, ${previous_charater_combo + 1}}`);
            }
            previous_charater_combo = 0;
            previous_charater_modified = false;
        };

        if (checkbox_num.checked) {
            const numbers = numReplacers[character];
            if (numbers) {
                for (var i2 = 0; i2 < numbers.length; i2++) {
                    replacers.push(numbers[i2]);
                };
            };
        };

        if (checkbox_sym.checked) {
            const symbols = symReplacers[character];
            if (symbols) {
                for (var i2 = 0; i2 < symbols.length; i2++) {
                    replacers.push(symbols[i2]);
                };
            };
        };

        if (checkbox_let.checked) {
            const letters = letReplacers[character];
            if (letters) {
                for (var i2 = 0; i2 < letters.length; i2++) {
                    replacers.push(letters[i2]);
                };
            };
        };

        if (checkbox_emo.checked) {
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

            if (replacer.replace("\\", "").length > 1 & checkbox_mul.checked) {
                is_all_one_char = false
            } else if (/\p{Extended_Pictographic}/u.test(replacer)) {
                //pass
            } else if (replacer.length > 2) {
                replacers.splice(i2, 1)
                i2--
            }
        };

        if (checkbox_whi.checked & !end_text == "") {
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

        if (checkbox_vow.checked & (character == "a" || character == "e" || character == "i" || character == "o" || character == "u")) {
            end_text = end_text.concat("?")
        };

        previous_charater = character;
    };

    if (previous_charater_combo > 0 & previous_charater_modified) {
        if (checkbox_dub.checked) {
            end_text = end_text.concat(`{${previous_charater_combo + 1},}`);
        } else {
            end_text = end_text.concat(`{${previous_charater_combo + 1}, ${previous_charater_combo + 1}}`);
        }
        previous_charater_combo = 0;
        previous_charater_modified = false;
    };

    if (end_text.length > 260) {
        error_length.hidden = false
    } else {
        error_length.hidden = true
    }

    output.innerText = end_text;
}

input.oninput = updateRegex
checkbox_num.onchange = updateRegex
checkbox_sym.onchange = updateRegex
checkbox_let.onchange = updateRegex
checkbox_dub.onchange = updateRegex
checkbox_mul.onchange = updateRegex
checkbox_vow.onchange = updateRegex
checkbox_whi.onchange = updateRegex
checkbox_emo.onchange = updateRegex
updateRegex()