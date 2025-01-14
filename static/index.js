// MIT License

// Copyright (c) 2023 - 2025 treeben77

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

import { generateLeetspeakRegex } from "../generators.js";

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
const checkbox_duc = document.getElementById("dedup-char")
const checkbox_uni = document.getElementById("filter-uni")

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
    settings += checkbox_duc.checked << 9
    settings += checkbox_uni.checked << 10

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
    
    let generated = generateLeetspeakRegex(start_text, settings)

    error_length.hidden = !generated.too_long
    output.innerText = generated.regex;
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
    checkbox_duc.checked = false;
    checkbox_uni.checked = false;
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
checkbox_duc.onchange = updateRegex
checkbox_uni.onchange = updateRegex

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
    checkbox_duc.checked = data.settings & 512
    checkbox_uni.checked = data.settings & 1024
}

updateRegex()