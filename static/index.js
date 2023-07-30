const output = document.getElementById("regex-output")
const input = document.getElementById("word-input")
const error_length = document.getElementById("regex-error-toolong")
const reset_settings = document.getElementById("reset-settings")
const copy_output = document.getElementById("copy-regex")

const checkbox_num = document.getElementById("filter-num")
const checkbox_sym = document.getElementById("filter-sym")
const checkbox_let = document.getElementById("filter-let")
const checkbox_emo = document.getElementById("filter-emo")
const checkbox_dub = document.getElementById("double-spm")
const checkbox_mul = document.getElementById("multi-char")
const checkbox_vow = document.getElementById("vowel-less")
const checkbox_whi = document.getElementById("whitespace")
const checkbox_pmc = document.getElementById("part-match")

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

function updateRegex() {
    copy_output.innerText = "Copy"
    var settings = 0
    settings += checkbox_num.checked << 0
    settings += checkbox_sym.checked << 1
    settings += checkbox_let.checked << 2
    settings += checkbox_emo.checked << 3
    settings += checkbox_dub.checked << 4
    settings += checkbox_mul.checked << 5
    settings += checkbox_whi.checked << 6
    settings += checkbox_vow.checked << 7
    settings += checkbox_pmc.checked << 8
    console.log(settings)

    location.hash = btoa(JSON.stringify({
        input: input.value.toLowerCase(),
        settings: settings
    })).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')

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

            if (replacer.replaceAll("\\", "").length > 1 & (checkbox_mul.checked || /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g.test(replacer))) {
                is_all_one_char = false
            } else if (replacer.replaceAll("\\", "").length > 1) {
                console.log('o7', replacer, '>>', replacer.replaceAll("\\", ""), replacer.replaceAll("\\", "").length, /\p{Extended_Pictographic}/u.test(replacer))
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
    if (!checkbox_pmc.checked) {
        end_text = `(\\A|\\s)${end_text}(\\z|\\s)`
    }

    if (end_text.length > 260) {
        error_length.hidden = false
    } else {
        error_length.hidden = true
    }

    output.innerText = end_text;
}

reset_settings.onclick = function() {
    checkbox_num.checked = true;
    checkbox_sym.checked = true;
    checkbox_let.checked = true;
    checkbox_emo.checked = true;
    checkbox_dub.checked = true;
    checkbox_mul.checked = false;
    checkbox_whi.checked = false;
    checkbox_vow.checked = false;
    checkbox_pmc.checked = true;
    updateRegex();
};

copy_output.onclick = function() {
    navigator.clipboard.writeText(output.innerText);
    copy_output.innerText = "Copied!";
    setTimeout(function() {
        copy_output.innerText = "Copy"
    }, 5000);
}

input.oninput = updateRegex
checkbox_num.onchange = updateRegex
checkbox_sym.onchange = updateRegex
checkbox_let.onchange = updateRegex
checkbox_emo.onchange = updateRegex
checkbox_dub.onchange = updateRegex
checkbox_mul.onchange = updateRegex
checkbox_whi.onchange = updateRegex
checkbox_vow.onchange = updateRegex
checkbox_pmc.onchange = updateRegex

if (location.hash.length > 1) {
    const data = JSON.parse(atob(location.hash.replace("#", "").replace('_', '/').replace('-', '+')));

    input.value = data.input;

    checkbox_num.checked = data.settings & 1
    checkbox_sym.checked = data.settings & 2
    checkbox_let.checked = data.settings & 4
    checkbox_emo.checked = data.settings & 8
    checkbox_dub.checked = data.settings & 16
    checkbox_mul.checked = data.settings & 32
    checkbox_whi.checked = data.settings & 64
    checkbox_vow.checked = data.settings & 128
    checkbox_pmc.checked = data.settings & 256
}

updateRegex()