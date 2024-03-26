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

const regex_types = [
    {
        name: "zalgo",
        copy_btn: document.getElementById("copy-regex-zalgo"),
        output: document.getElementById("regex-output-zalgo"),
        generator: function(settings) {
            if (settings.accents.checked) {
                return "\\p{M}{1,}";
            } else {
                return "\\p{M}{3,}";
            };
        },
        setting_elements: {
            accents: document.getElementById("filter-accents")
        }
    },
    {
        name: "emoji-spam",
        copy_btn: document.getElementById("copy-regex-emoji"),
        output: document.getElementById("regex-output-emoji"),
        generator: function(settings) {
            const slider_value = document.getElementById("emoji-range-value");
            slider_value.innerText = settings.slider.value;

            if (settings.slider.value == 0) {
                return `<a?:[a-z_0-9]+:[0-9]+>|\\p{Extended_Pictographic}|[\\u{1F1E6}-\\u{1F1FF}]|[0-9#\\*]\\u{fe0f})`;
            } else {
                return `d(?s)(?i)((<a?:[a-z_0-9]+:[0-9]+>|\\p{Extended_Pictographic}|[\\u{1F1E6}-\\u{1F1FF}]|[0-9#\\*]\\u{fe0f}).*){${+settings.slider.value + 1},}`;
            };
        },
        setting_elements: {
            slider: document.getElementById("emoji-range")
        }
    },
    {
        name: "links",
        copy_btn: document.getElementById("copy-regex-links"),
        output: document.getElementById("regex-output-links"),
        generator: function(settings) {
            if (settings.nonclick.checked) {
                return `(?:https?://)?[a-z0-9_\\-\\.]*[a-z0-9_\\-]+\\.[a-z]{2,}`;
            } else {
                return `(?:https?://)[a-z0-9_\\-\\.]*[a-z0-9_\\-]+\\.[a-z]{2,}`;
            };
        },
        setting_elements: {
            nonclick: document.getElementById("include-nonclickable")
        }
    },
    {
        name: "inline-links",
        copy_btn: document.getElementById("copy-regex-inline-links"),
        output: document.getElementById("regex-output-inline-links"),
        generator: function(settings) {
            return `\\[.*\\]\\(<?(?:https?://)?[a-z0-9_\\-\\.]*[a-z0-9_\\-]+\\.[a-z]{2,}.*>?\\)`
        },
        setting_elements: {}
    },
    {
        name: "invite-links",
        copy_btn: document.getElementById("copy-regex-invite-links"),
        output: document.getElementById("regex-output-invite-links"),
        generator: function(settings) {
            if (settings.third_party.checked) {
                return "(?:https?://)?(?:www.|ptb.|canary.)?(?:discord(?:app)?\\.(?:(?:com|gg)/(?:invite|servers)/[a-z0-9-_]+)|discord\\.gg/[a-z0-9-_]+)|(?:https?://)?(?:www\\.)?(?:dsc\\.gg|invite\\.gg+|discord\\.link|(?:discord\\.(gg|io|me|li|id))|disboard\\.org)/[a-z0-9-_/]+";
            } else {
                return `(?:https?://)?(?:www.|ptb.|canary.)?(?:discord(?:app)?\\.(?:(?:com|gg)/(?:invite|servers)/[a-z0-9-_]+)|discord\\.gg/[a-z0-9-_]+)`;
            };
        },
        setting_elements: {
            third_party: document.getElementById("include-3rdparty")
        }
    },
    {
        name: "headings",
        copy_btn: document.getElementById("copy-regex-headn"),
        output: document.getElementById("regex-output-headn"),
        generator: function(settings) {
            const slider_value = document.getElementById("headn-range-value");
            if (settings.slider.value == 4) {
                slider_value.innerText = "-";
            } else {
                slider_value.innerText = settings.slider.value;
            };

            if (settings.slider.value == 2) {
                return `^#\\s.*$`;
            } else {
                return `^#{1,${settings.slider.value - 1}}\\s.*$`;
            }
        },
        setting_elements: {
            slider: document.getElementById("headn-range")
        }
    },
    {
        name: "email-addresses",
        copy_btn: document.getElementById("copy-regex-email"),
        output: document.getElementById("regex-output-email"),
        generator: function(settings) {
            return `[a-z0-9_\\-\\.\\+]+@[a-z0-9_\\-\\.]*[a-z0-9_\\-]+\\.[a-z]{2,}`
        },
        setting_elements: {}
    }
];

for (var i = 0; i < regex_types.length; i++) {
    let regex = regex_types[i];

    function update() {
        regex.copy_btn.innerText = "Copy";
        regex.output.innerText = regex.generator(regex.setting_elements);
    }

    let setting_keys = Object.keys(regex.setting_elements);
    for (var i1 = 0; i1 < setting_keys.length; i1++) {
        let element = regex.setting_elements[setting_keys[i1]];

        element.onchange = update;
        element.oninput = update;
    };
    update();

    regex.copy_btn.onclick = function() {
        navigator.clipboard.writeText(regex.output.innerText);
        regex.copy_btn.innerText = "Copied!";
        setTimeout(function() {
            regex.copy_btn.innerText = "Copy"
        }, 5000);
    }
};
