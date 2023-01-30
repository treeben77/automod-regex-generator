const outputZalgo = document.getElementById("regex-output-zalgo");
const outputEmojiValue = document.getElementById("emoji-range-value");
const outputEmoji = document.getElementById("regex-output-emoji");
const outputNewln = document.getElementById("regex-output-newline");

const checkbox_acc = document.getElementById("filter-accents");
const emoji_slider = document.getElementById("emoji-range");
const max_newlines = document.getElementById("max-newlines");


function updateRegexZalgo() {
    if (checkbox_acc.checked) {
        outputZalgo.innerText = "\\p{M}{1,}";
    } else {
        outputZalgo.innerText = "\\p{M}{3,}";
    };
};

checkbox_acc.onchange = updateRegexZalgo;
updateRegexZalgo();

function updateRegexEmoji() {
    outputEmojiValue.innerText = emoji_slider.value
    outputEmoji.innerText = `(?s)((<a?:[a-z_0-9]+:[0-9]+>|\\p{Extended_Pictographic}).*){${+emoji_slider.value + 1},}`
};

emoji_slider.onchange = updateRegexEmoji
emoji_slider.oninput = updateRegexEmoji
updateRegexEmoji()

function updateRegexNewln() {
    outputNewln.innerText = `(\\n.*){${+max_newlines.value + 1},}`
}
max_newlines.onchange = updateRegexNewln;
max_newlines.oninput = updateRegexNewln;
