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

import { generateCharacterTypeRegex } from "../generators.js";

const output = document.getElementById("regex-output");
const whitelist_mode = document.getElementById("whitelist-mode");
const error_length = document.getElementById("regex-error-toolong");
const reset_settings = document.getElementById("reset-settings");
const copy_output = document.getElementById("copy-regex");

const checkbox_let = document.getElementById("filter-let");
const checkbox_num = document.getElementById("filter-num");
const checkbox_asc = document.getElementById("filter-asc");
const checkbox_sym = document.getElementById("filter-sym");
const checkbox_acc = document.getElementById("filter-acc");
const checkbox_emo = document.getElementById("filter-emo");
const checkbox_cyr = document.getElementById("filter-cyr");
const checkbox_kaj = document.getElementById("filter-kaj");
const checkbox_arb = document.getElementById("filter-arb");

function updateRegex() {
    copy_output.innerText = "Copy"

    var settings = 0;
    settings += (whitelist_mode.value == "allow") << 0
    settings += checkbox_let.checked << 1
    settings += checkbox_num.checked << 2
    settings += checkbox_asc.checked << 3
    settings += checkbox_sym.checked << 4
    settings += checkbox_acc.checked << 5
    settings += checkbox_emo.checked << 6
    settings += checkbox_cyr.checked << 7
    settings += checkbox_kaj.checked << 8
    settings += checkbox_arb.checked << 9

    location.hash = btoa(JSON.stringify({
        s: settings
    })).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
    
    let generated = generateCharacterTypeRegex(settings)

    error_length.hidden = !generated.too_long
    output.innerText = generated.regex;
}

reset_settings.onclick = function() {
    whitelist_mode.value = "allow"
    checkbox_let.checked = true;
    checkbox_num.checked = true;
    checkbox_asc.checked = true;
    checkbox_sym.checked = true;
    checkbox_acc.checked = true;
    checkbox_emo.checked = true;
    checkbox_cyr.checked = false;
    checkbox_kaj.checked = false;
    checkbox_arb.checked = false;
    updateRegex();
};

copy_output.onclick = function() {
    navigator.clipboard.writeText(output.innerText);
    copy_output.innerText = "Copied!";
    setTimeout(function() {
        copy_output.innerText = "Copy"
    }, 5000);
}

// input.oninput = updateRegex
checkbox_let.onchange = updateRegex
checkbox_num.onchange = updateRegex
checkbox_asc.onchange = updateRegex
checkbox_sym.onchange = updateRegex
checkbox_acc.onchange = updateRegex
checkbox_emo.onchange = updateRegex
checkbox_cyr.onchange = updateRegex
checkbox_kaj.onchange = updateRegex
checkbox_arb.onchange = updateRegex
whitelist_mode.onchange = updateRegex

if (location.hash.length > 1) {
    const data = JSON.parse(atob(location.hash.replace("#", "").replace('_', '/').replace('-', '+')));

    checkbox_let.checked = data.s & 2
    checkbox_num.checked = data.s & 4
    checkbox_asc.checked = data.s & 8
    checkbox_sym.checked = data.s & 16
    checkbox_acc.checked = data.s & 32
    checkbox_emo.checked = data.s & 64
    checkbox_cyr.checked = data.s & 128
    checkbox_kaj.checked = data.s & 256
    checkbox_arb.checked = data.s & 512
    if (data.s & 1) {
        whitelist_mode.value = "allow"
    } else {
        whitelist_mode.value = "block"
    }
}

updateRegex()