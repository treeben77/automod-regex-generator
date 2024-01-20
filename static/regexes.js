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

const outputZalgo = document.getElementById("regex-output-zalgo");
const outputEmojiValue = document.getElementById("emoji-range-value");
const outputEmoji = document.getElementById("regex-output-emoji");
const outputLinks = document.getElementById("regex-output-links");
const outputInvit = document.getElementById("regex-output-invite-links");
const outputInlin = document.getElementById("regex-output-inline-links");
const outputHeadnValue = document.getElementById("headn-range-value");
const outputHeadn = document.getElementById("regex-output-headn");
const outputEmail = document.getElementById("regex-output-email");

const copyZalgo = document.getElementById("copy-regex-zalgo");
const copyEmoji = document.getElementById("copy-regex-emoji");
const copyLinks = document.getElementById("copy-regex-links");
const copyInvit = document.getElementById("copy-regex-invite-links");
const copyInlin = document.getElementById("copy-regex-inline-links");
const copyHeadn = document.getElementById("copy-regex-headn");
const copyEmail = document.getElementById("copy-regex-email");

const checkbox_acc = document.getElementById("filter-accents");
const emoji_slider = document.getElementById("emoji-range");
const headn_slider = document.getElementById("headn-range");
const inc_nonclick = document.getElementById("include-nonclickable");
const inc_3prtyinv = document.getElementById("include-3rdparty");


function updateRegexZalgo() {
    copyZalgo.innerText = "Copy"
    if (checkbox_acc.checked) {
        outputZalgo.innerText = "\\p{M}{1,}";
    } else {
        outputZalgo.innerText = "\\p{M}{3,}";
    };
};

copyZalgo.onclick = function() {
    navigator.clipboard.writeText(outputZalgo.innerText);
    copyZalgo.innerText = "Copied!";
    setTimeout(function() {
        copyZalgo.innerText = "Copy"
    }, 5000);
}

checkbox_acc.onchange = updateRegexZalgo;
updateRegexZalgo();

function updateRegexEmoji() {
    copyEmoji.innerText = "Copy"
    outputEmojiValue.innerText = emoji_slider.value
    if (emoji_slider.value == 0) {
        outputEmoji.innerText = `<a?:[a-z_0-9]+:[0-9]+>|\\p{Extended_Pictographic}|[\\u{1F1E6}-\\u{1F1FF}]|[0-9#\\*]\\u{fe0f})`
    } else {
        outputEmail.innerText = `(?s)(?i)((<a?:[a-z_0-9]+:[0-9]+>|\\p{Extended_Pictographic}|[\\u{1F1E6}-\\u{1F1FF}]|[0-9#\\*]\\u{fe0f}).*){${+emoji_slider.value + 1},}`
    }
};

copyEmoji.onclick = function() {
    navigator.clipboard.writeText(outputEmoji.innerText);
    copyEmoji.innerText = "Copied!";
    setTimeout(function() {
        copyEmoji.innerText = "Copy"
    }, 5000);
}

emoji_slider.onchange = updateRegexEmoji
emoji_slider.oninput = updateRegexEmoji
updateRegexEmoji()

function updateRegexLinks() {
    copyLinks.innerText = "Copy"
    if (inc_nonclick.checked) {
        outputLinks.innerText = "(?:https?://)?[a-z0-9_\\-\\.]*[a-z0-9_\\-]+\\.[a-z]{2,}";
    } else {
        outputLinks.innerText = "(?:https?://)[a-z0-9_\\-\\.]*[a-z0-9_\\-]+\\.[a-z]{2,}";
    };
};

copyLinks.onclick = function() {
    navigator.clipboard.writeText(outputLinks.innerText);
    copyLinks.innerText = "Copied!";
    setTimeout(function() {
        copyLinks.innerText = "Copy"
    }, 5000);
}

inc_nonclick.onchange = updateRegexLinks;
updateRegexLinks();

function updateRegexInlin() {
    copyInlin.innerText = "Copy"
    outputInlin.innerText = "\\[.*\\]\\(<?(?:https?://)?[a-z0-9_\\-\\.]*[a-z0-9_\\-]+\\.[a-z]{2,}.*>?\\)";
};

copyInlin.onclick = function() {
    navigator.clipboard.writeText(outputInlin.innerText);
    copyInlin.innerText = "Copied!";
    setTimeout(function() {
        copyInlin.innerText = "Copy"
    }, 5000);
}

updateRegexInlin();

function updateRegexInvit() {
    copyInvit.innerText = "Copy"
    if (inc_3prtyinv.checked) {
        outputInvit.innerText = "(?:https?://)?(?:www.|ptb.|canary.)?(?:discord(?:app)?\.(?:(?:com|gg)/(?:invite|servers)/[a-z0-9-_]+)|discord\.gg/[a-z0-9-_]+)|(?:https?://)?(?:www\.)?(?:dsc\.gg|invite\.gg+|discord\.link|(?:discord\.(gg|io|me|li|id))|disboard\.org)/[a-z0-9-_/]+"
    } else {
        outputInvit.innerText = "(?:https?://)?(?:www.|ptb.|canary.)?(?:discord(?:app)?\\.(?:(?:com|gg)/(?:invite|servers)/[a-z0-9-_]+)|discord\\.gg/[a-z0-9-_]+)";
    }
};

copyInvit.onclick = function() {
    navigator.clipboard.writeText(outputInvit.innerText);
    copyInvit.innerText = "Copied!";
    setTimeout(function() {
        copyInvit.innerText = "Copy"
    }, 5000);
}

updateRegexInvit();
inc_3prtyinv.onchange = updateRegexInvit

function updateRegexHeadn() {
    copyHeadn.innerText = "Copy";
    if (headn_slider.value == 4) {
        outputHeadnValue.innerText = "-";
    } else {
        outputHeadnValue.innerText = headn_slider.value;
    };
    if (headn_slider.value == 2) {
        outputHeadn.innerText = `^#\\s.*$`;
    } else {
        outputHeadn.innerText = `^#{1,${headn_slider.value - 1}}\\s.*$`;
    }
};

copyHeadn.onclick = function() {
    navigator.clipboard.writeText(outputHeadn.innerText);
    copyHeadn.innerText = "Copied!";
    setTimeout(function() {
        copyHeadn.innerText = "Copy"
    }, 5000);
};

headn_slider.onchange = updateRegexHeadn;
headn_slider.oninput = updateRegexHeadn;
updateRegexHeadn();

function updateRegexEmail() {
    copyEmail.innerText = "Copy"
    outputEmail.innerText = "[a-z0-9_\\-\\.\\+]+@[a-z0-9_\\-\\.]*[a-z0-9_\\-]+\\.[a-z]{2,}";
};

copyEmail.onclick = function() {
    navigator.clipboard.writeText(outputEmail.innerText);
    copyEmail.innerText = "Copied!";
    setTimeout(function() {
        copyEmail.innerText = "Copy"
    }, 5000);
}

updateRegexEmail();