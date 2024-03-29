// MIT License

// Copyright (c) 2023 - 2024 treeben77

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
    "n": ["\\|\\\\|"],
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
    "o": ["🇴", "🅾️", "⭕"],
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

const uniReplacers = {
    "a": ["ɑ", "а", "🅐"],
    "b": ["Ƅ", "Ь", "Ꮟ", "ᑲ", "ᖯ", "🅑"],
    "c": ["ϲ", "с", "ᴄ", "ⲥ", "ꮯ", "🅒"],
    "d": ["ԁ", "Ꮷ", "ᑯ", "ꓒ", "🅓"],
    "e": ["е", "ҽ", "ꬲ", "🅔"],
    "f": ["ẝ", "ꞙ", "ꬵ", "🅕"],
    "g": ["ƍ", "ɡ", "ᶃ", "🅖"],
    "h": ["һ", "հ", "Ꮒ", "🅗"],
    "i": ["ı", "ɩ", "ɪ", "ӏ", "Ꭵ", "ꙇ", "ꭵ", "ǀ", "Ι", "І", "Ӏ", "׀", "ו", "ן", "١", "۱", "ا", "Ⲓ", "ⵏ", "ꓲ", "𐊊", "𐌉", "𐌠", "𖼨", "ﺍ", "ﺎ", "￨", "🅘"],
    "j": ["🅙"],
    "k": ["🅚"],
    "l": ["ı", "ɩ", "ɪ", "ӏ", "Ꭵ", "ꙇ", "ꭵ", "ǀ", "Ι", "І", "Ӏ", "׀", "ו", "ן", "١", "۱", "ا", "Ⲓ", "ⵏ", "ꓲ", "𐊊", "𐌉", "𐌠", "𖼨", "ﺍ", "ﺎ", "￨", "🅛"],
    "m": ["𑜀", "𑣣", "🅜"],
    "n": ["ո", "ռ", "🅝"],
    "o": ["σ", "о", "ס", "ه", "٥", "ھ", "ہ", "ە", "۵", "०", "੦", "૦", "௦", "ం", "౦","ಂ","೦","ം","ං","๐","໐","ဝ","၀","ჿ","ᴏ","ᴑ","ⲟ","ꬽ","𐓪","𑣈","𑣗","ﮦ","ﻩ","ｏ", "○", "◍", "●", "🅞"],
    "p": ["р", "ⲣ", "ք", "🅟"],
    "q": ["🅠"],
    "r": ["г", "ᴦ", "ⲅ", "ꭇ", "ꭈ", "ꮁ", "🅡"],
    "s": ["ƽ", "ꜱ", "ꮪ", "𐑈", "𑣁", "🅢"],
    "t": ["🅣"],
    "u": ["ʋ", "υ", "ս", "ᴜ", "ꞟ", "ꭎ", "ꭒ", "𑣘", "ט", "𑜆", "🅤"],
    "v": ["ν", "ѵ", "ꮩ", "𑣀", "𑜆", "🅥"],
    "w": ["ɯ", "ѡ", "ԝ", "ա", "ᴡ", "ꮃ", "𑜊", "𑜎", "𑜏", "🅦"],
    "x": ["х", "ᕁ", "ᕽ", "᙮", "🅧"],
    "y": ["ɣ", "ʏ", "γ", "у", "ү", "ყ", "ᶌ", "ỿ", "ℽ", "ꭚ", "𑣄", "🅨"],
    "z": ["ᴢ", "ꮓ", "🅩"]
}

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

        
        if ((settings & 1024) != 0) {
            const unicodes = uniReplacers[character];
            if (unicodes) {
                for (var i2 = 0; i2 < unicodes.length; i2++) {
                    replacers.push(unicodes[i2]);
                };
            };
        };

        let is_all_one_char = true
        for (var i2 = 0; i2 < replacers.length; i2++) {
            let replacer = replacers[i2];

            if (replacer == null) {break}

            if (replacer.replaceAll("\\", "").length > 1 & ((settings & 32) != 0 ||
            /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g.test(replacer))) {
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

export { generateLeetspeakRegex }
