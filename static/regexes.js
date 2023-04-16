const outputZalgo = document.getElementById("regex-output-zalgo");
const outputEmojiValue = document.getElementById("emoji-range-value");
const outputEmoji = document.getElementById("regex-output-emoji");
const outputLinks = document.getElementById("regex-output-links");

const copyZalgo = document.getElementById("copy-regex-zalgo")
const copyEmoji = document.getElementById("copy-regex-emoji")
const copyLinks = document.getElementById("copy-regex-links")

const checkbox_acc = document.getElementById("filter-accents");
const emoji_slider = document.getElementById("emoji-range");
const inc_nonclick = document.getElementById("include-nonclickable");


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
        outputEmoji.innerText = `(<a?:[a-z_0-9]+:[0-9]+>|\\p{Extended_Pictographic})`
    } else {
        outputEmoji.innerText = `(?s)((<a?:[a-z_0-9]+:[0-9]+>|\\p{Extended_Pictographic}).*){${+emoji_slider.value + 1},}`
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
        outputLinks.innerText = "(?:https?://)?[a-z0-9_\-\.]*[a-z0-9_\-]{2,}\.[a-z]{2,}";
    } else {
        outputLinks.innerText = "(?:https?://)[a-z0-9_\-\.]*[a-z0-9_\-]{2,}\.[a-z]{2,}";
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