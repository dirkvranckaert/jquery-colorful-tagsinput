!function (t) {
    "use strict";

    const _tags_input_color_palette = [
        ["rgb(204, 51, 139)", "rgb(220, 20, 60)", "rgb(194, 30, 86)", "rgb(205, 91, 69)", "rgb(237, 145, 33)", "rgb(238, 230, 0)", "rgb(0, 153, 102)"],
        ["rgb(143, 188, 143)", "rgb(102, 153, 204)", "rgb(230, 230, 250)", "rgb(148, 0, 211)", "rgb(51, 0, 102)", "rgb(54, 69, 79)", "rgb(128, 128, 128)"]
    ];
    const defaultLabelColor = "#36454f";

    function e() {
    }

    t.fn.tagsInput = function (n) {
        const i = t.extend({
            tagClass: "badge badge-secondary",
            tagsContainerClass: "form-control",
            highlightColor: "#ffc107"
        }, n);
        const a = new e;
        const o = function (disabled, allowColorChange) {
            return a.fillIn('<div class="tag {tagClass}" style="background-color: {colorValue}; color: {textColorValue};">{tagColorPickerIcon}<span>{value}</span>{tagRemoveIcon}</div>', {
                tagClass: a.sanitizeText(i.tagClass),
                tagRemoveIcon: disabled ? "" : '<i class="tag-remove">&#10006;</i>',
                tagColorPickerIcon: disabled || !allowColorChange ? "" : '<i class="tag-color-picker" id="tag-color-picker-for-tag-{tagIndex}">&#9207;</i>'
            });
        };
        const f = function() {
            return "<span class='tags-input-suggestion-tag' style='background-color: {colorValue}; color: {textColorValue};'>{value}</span>";
            
        }
        if (i.colorPalette) {
            e.prototype.colorPalette = i.colorPalette;
        } else {
            e.prototype.colorPalette = _tags_input_color_palette;
        }
        if (i.additionalColorPalette) {
            e.prototype.additionalColors = i.additionalColorPalette
        } else {
            e.prototype.additionalColors = []
        }
        if (i.onChange) {
            e.prototype.onChange = i.onChange;
        }
        if (i.defaultLabelColor) {
            e.prototype.defaultLabelColor = i.defaultLabelColor;
        } else {
            e.prototype.defaultLabelColor = defaultLabelColor;
        }
        e.prototype.uniqueID = `${Math.floor(Math.random() * 1000000)}`;
        this.each(function () {
            if (this.hasAttribute("data-rendered")) return;

            const e = this.hasAttribute("disabled");
            const n = o(e, i.allowColorChange == undefined ? true : i.allowColorChange);
            const r = function (t) {
                return a.fillIn('<div class="tags-container {tagsContainerClass} {state}" id="{randomId}"><input type="text" size="1" {state}><div>', {
                    tagsContainerClass: a.sanitizeText(i.tagsContainerClass),
                    state: t ? "disabled" : "",
                    randomId: a.uniqueID
                })
            }(e);
            const s = t(this);
            const c = [];
            const l = s.val();
            l && t.each(l.split(";"), function (t, e) {
                var i = e.trim();
                var color = a.defaultLabelColor;
                if (i.length > 0 && i.startsWith("#")) {
                    color = i.substring(0, 7);
                    i = i.substring(7);
                }
                const textColorValue = _blackOrWhiteContrast(color);
                i.length > 0 && c.unshift(jQuery(n.replace("{colorValue}", color).replace("{textColorValue}", textColorValue).replace("{value}", i).replace("{tagIndex}", t)));
            });
            const u = t(r);
            t.each(c, function (t, e) {
                u.prepend(e)
            }), s.after(u), s.attr("hidden", "true"), s.attr("data-rendered", "true")
        });
        t("i.tag-remove").click(a.removeTag);
        t("i.tag-color-picker").click(a.colorPicker);
        t(".tags-container").not("disabled").click(function (e) {
            t(this).children("input").focus()
        });
        t(".tags-container").not("disabled").children("input").bind("input", function (t) {
            a.resetSize(this)
        });
        const r = o(this[0].hasAttribute("disabled"), i.allowColorChange == undefined ? true : i.allowColorChange);
        e.prototype.tagRenderer = r;
        e.prototype.simpleTagRenderer = f();
        t(".tags-container").not("disabled").children("input").keyup(function (e) {
            if ("Enter" === e.key || "Tab" === e.key || ";" === e.key || "," === e.key) {
                return;
            } else {
                let newInput = e.key;
                const n = t(e.currentTarget);
                let o = n.val().trim();
                if (o) {
                    let inputValue = a.sanitizeText(o);
                    let tagsInputElement = e.currentTarget.parentElement;
                    a.hideSuggestions();
                    a.showSuggestions(inputValue, tagsInputElement);
                } else {
                    a.hideSuggestions();
                }
            }
        });
        t(".tags-container").not("disabled").children("input").keydown(function (e) {
            a.closeColorPicker();
            if ("Enter" === e.key || "Tab" === e.key || ";" === e.key || "," === e.key) {
                e.preventDefault();
                a.hideSuggestions();
                const n = t(e.currentTarget);
                let o = n.val().trim();
                if (o) {
                    o = a.sanitizeText(o);
                    const e = n.siblings("div").filter(function () {
                        return t(this).find("span").text() === o
                    });
                    if (e.length > 0) i.hasOwnProperty("tagColor") || (i.tagColor = e.css("background-color")), a.blink(e, i.highlightColor, i.tagColor); else {
                        var color = a.defaultLabelColor;
                        var label = o;
                        if (o.length > 0 && o.startsWith("#")) {
                            color = o.substring(0, 7);
                            label = o.substring(7);
                        }

                        const textColorValue = _blackOrWhiteContrast(color);
                        const e = t(r.replace("{value}", label).replace("{colorValue}", color).replace("{textColorValue}", textColorValue).replace("{tagIndex}", n.siblings("div").length-1));
                        e.insertBefore(n);
                        e.children("i.tag-remove").click(a.removeTag);
                        e.children("i.tag-color-picker").click(a.colorPicker);
                        const i = t(this).parent().prev();
                        let s = i.val();
                        s.length > 0 && ";" != s.charAt(s.length - 1) && (s += ";"), n.val(""), a.resetSize(n), i.val(s.concat(o).concat(";"));
                        if (a.onChange) {
                            a.onChange(i.val());
                        }
                    }
                }
                return !1
            }
        });
        console.log("Tagsinput setup!");
        return a;
    };
    e.prototype.resetSize = function (e) {
        const n = t(e), i = n.val().length;
        n.attr("size", i < 1 ? 1 : i)
    };
    e.prototype.removeTag = function (event) {
        const n = t(this);
        const i = n.parent();
        const a = i.parent().prev();
        const o = n.siblings("span").text();
        const r = `(^(\#[A-Fa-f0-9]{6}){0,1}${o};)|(;(\#[A-Fa-f0-9]{6}){0,1}${o};)`;
        const s = a.val().replace(new RegExp(r, "u"), ";");
        a.val(s);
        i.remove();
        if (e.prototype.onChange) {
            e.prototype.onChange(a.val());
        }
    };
    e.prototype.colorPickerColorSelected = function (event) {
        const backgroundColor = $(this).css('backgroundColor');
        const originalHexColor = $(this).parent().parent().attr('data-tagcolor');
        const tagValue = $(this).parent().parent().attr('data-tagvalue');
        var hexColor = backgroundColor;
        if (!backgroundColor.startsWith("#")) {
            hexColor = _rgbToHex(backgroundColor);
        }

        const originalTag = `${originalHexColor}${tagValue}`;
        const newTag = `${hexColor}${tagValue}`;

        // Update the form
        const form = $(`.tag-color-picker`).parent().parent().prev();
        const tags = form.val().split(";");
        var tagIndex = -1;
        for (let i = 0; i < tags.length; i++) {
            var currentTag = tags[i];
            if (currentTag.startsWith("#")) {
                currentTag = currentTag.substring(7);
            }
            if (currentTag == tagValue) {
                tagIndex = i;
                break;
            }
        }
        if (tagIndex !== -1) {
            // Update the forms element
            tags[tagIndex] = newTag;
            const updatedTags = tags.join(";");
            form.val(updatedTags);

            // Update the UI
            const tagElement = form.next().first().children()[tagIndex];
            $(tagElement).css("background-color", hexColor);

            // Make sure the text has enough contrast with the background
            const textColorValue = _blackOrWhiteContrast(hexColor);
            $(tagElement).css("color", textColorValue);

            // Propagate the change to the onChange-callback
            if (e.prototype.onChange) {
                e.prototype.onChange(form.val());
            }
        }

        e.prototype.closeColorPicker();
    }
    e.prototype.useSuggestedTag = function(event) {
        console.log("Suggestion clicked!");
        e.prototype.hideSuggestions();
        let tagValue = event.target.attributes["data-tagvalue"].value;


        let n = $(`#${e.prototype.uniqueID} input`);

        var color = e.prototype.defaultLabelColor;
        var label = tagValue;
        if (tagValue.length > 0 && tagValue.startsWith("#")) {
            color = tagValue.substring(0, 7);
            label = tagValue.substring(7);
        }

        const textColorValue = _blackOrWhiteContrast(color);
        const tag = t(e.prototype.tagRenderer.replace("{value}", label).replace("{colorValue}", color).replace("{textColorValue}", textColorValue).replace("{tagIndex}", n.siblings("div").length-1));
        tag.insertBefore(n);
        tag.children("i.tag-remove").click(e.prototype.removeTag);
        tag.children("i.tag-color-picker").click(e.prototype.colorPicker);
        const i = n.parent().prev();
        let s = i.val();
        s.length > 0 && ";" != s.charAt(s.length - 1) && (s += ";"), n.val(""), e.prototype.resetSize(n), i.val(s.concat(tagValue).concat(";"));
        if (e.prototype.onChange) {
            e.prototype.onChange(i.val());
        }

    }
    e.prototype.showSuggestions = function(filterString, inputElement) {
        console.log(`Build suggestions for ${filterString}`);

        const offsetLeft = inputElement.offsetLeft;
        const offsetTop = inputElement.offsetTop;
        const offsetWidth = inputElement.offsetWidth;
        const offsetHeight = inputElement.offsetHeight;

        let dropdownWidth = 200; // TODO make this configurable?
        if (offsetWidth < dropdownWidth) {
            // Make sure we don't go bigger than the 'parent'
            dropdownWidth = offsetWidth;
        }

        console.log("debug");

        const suggestionDropdown = $('<div/>');
        const suggestionDropdownInnerDiv = $('<div style="display: inline-flex; flex-wrap: wrap;"/>');
        suggestionDropdown.append(suggestionDropdownInnerDiv);

        var suggestionItems = [];
        suggestionItems[suggestionItems.length] = "#FF9988Item1";
        suggestionItems[suggestionItems.length] = "#339988Item2";
        suggestionItems[suggestionItems.length] = "#FF2211Item3";
        suggestionItems[suggestionItems.length] = "#FF5511Item 4 is bigger!";
        suggestionItems[suggestionItems.length] = "#FF4433Item5";

        var SEARCH_PATTERN = filterString.toLowerCase();
        var filteredSuggestions = suggestionItems.filter(function (str) { 
            var label = str;
            if (label.length > 0 && label.startsWith("#")) {
                label = label.substring(7);
            }
            var matchesWithSuggestions = label.toLowerCase().indexOf(SEARCH_PATTERN) >= 0;
            // TODO check if this 'str' is not yet part of the input field
            const activeTags = $(`#${e.prototype.uniqueID}`).prev().val();
            const notYetUsed = activeTags.toLowerCase().indexOf(str.toLowerCase()) === -1;
            return matchesWithSuggestions && notYetUsed;
        });

        for (var i=0; i<filteredSuggestions.length; i++) {
            var color = this.defaultLabelColor;
            var label = filteredSuggestions[i];
            if (label.length > 0 && label.startsWith("#")) {
                color = filteredSuggestions[i].substring(0, 7);
                label = filteredSuggestions[i].substring(7);
            }

            const textColorValue = _blackOrWhiteContrast(color);
            const e = $(this.simpleTagRenderer.replace("{value}", label).replace("{colorValue}", color).replace("{textColorValue}", textColorValue).replace("{tagIndex}", i));
            e.attr('data-tagvalue', filteredSuggestions[i]);
            e.click(this.useSuggestedTag);
            
            //suggestionDropdown.append("<div class='tags-input-suggestion-tag-line'><span class='tags-input-suggestion-tag' style='background-color: #FF2211;'>" + suggestionItems[i] + "</span></div>");
            suggestionDropdownInnerDiv.append(e);
        }

        if (filteredSuggestions.length == 0) {
            this.hideSuggestions();
            return;
        }

        suggestionDropdown.attr('class', 'tags-input-suggestion-dropdown');
        suggestionDropdown.css("left",offsetLeft);
        suggestionDropdown.css("top",offsetTop + offsetHeight);
        suggestionDropdown.css("width",dropdownWidth);
        suggestionDropdown.appendTo('body');

        // TODO dropdown to be shown...
    }
    e.prototype.hideSuggestions = function () {
        var activeSuggestions = $(".tags-input-suggestion-dropdown")
        if (activeSuggestions) {
            activeSuggestions.first().remove();
        }
        return activeSuggestions;
    }
    e.prototype.closeColorPicker = function () {
        var activeColorPicker = $(".tags-input-color-picker")
        if (activeColorPicker) {
            activeColorPicker.first().remove();
        }
        return activeColorPicker;
    }
    e.prototype.colorPicker = function (event) {
        const tagValue = t(this).parent().children().filter(function () {
            return t(this)[0].nodeName === "SPAN"
        }).first().text();
        var tagColor = t(this).parent().css("background-color");
        if (!tagColor.startsWith("#")) {
            // Convert from RGB to HEX
            tagColor = _rgbToHex(tagColor);
        }

        var activeColorPicker = e.prototype.closeColorPicker();
        if (activeColorPicker) {
            var colorPickerTagValue = $(activeColorPicker.first()).attr("data-tagvalue");
            if (colorPickerTagValue == tagValue) {
                return;
            }
        }

        const clickElementHeight = t(this).height();
        const clickElementWidth = t(this).width();
        const elementPosition = t(this).offset();
        const startPositionOffset = 0;
        const startPositionLeft = elementPosition.left + (clickElementWidth/2);
        const startPositionTop = elementPosition.top + clickElementHeight + startPositionOffset;

        const colorPickerPopup = $('<div/>');


        for (let i = 0; i < e.prototype.colorPalette.length; i++) {
            const color_line = e.prototype.colorPalette[i];
            const colorLineDiv = $('<div/>');
            colorLineDiv.attr('class', 'color-line');

            for (let j = 0; j < color_line.length; j++) {
                const color = color_line[j];
                const colorSelectionItem = $('<span/>');
                var hexColor = color;
                if (!hexColor.startsWith("#")) {
                    hexColor = _rgbToHex(hexColor);
                }
                if (hexColor == tagColor) {
                    colorSelectionItem.html("&check;");
                    colorSelectionItem.css("cursor", "not-allowed");
                    colorSelectionItem.css("padding-top", "5px");

                    const rgbColor = _hexToRgb(hexColor);

                    const contrastColor = _blackOrWhiteContrast(hexColor);
                    colorSelectionItem.css("color", contrastColor);
                } else {
                    colorSelectionItem.click(e.prototype.colorPickerColorSelected);
                }
                colorSelectionItem.attr("align", "center");
                colorSelectionItem.attr('class', 'color-item');
                colorSelectionItem.css("background-color",`${color}`);

                colorLineDiv.append(colorSelectionItem);
            }
            colorPickerPopup.append(colorLineDiv);
        }

        for (let i = 0; i < e.prototype.additionalColors.length; i++) {
            const color_line = e.prototype.additionalColors[i];
            const colorLineDiv = $('<div/>');
            colorLineDiv.attr('class', 'color-line');

            for (let j = 0; j < color_line.length; j++) {
                const color = color_line[j].color;
                const label = color_line[j].label;
                const colorSelectionItem = $('<span/>');
                var hexColor = color;
                if (!hexColor.startsWith("#")) {
                    hexColor = _rgbToHex(hexColor);
                }
                if (hexColor == tagColor) {
                    colorSelectionItem.html("&check;");
                    colorSelectionItem.css("cursor", "not-allowed");
                    colorSelectionItem.css("padding-top", "5px");

                    const rgbColor = _hexToRgb(hexColor);

                    const contrastColor = _blackOrWhiteContrast(hexColor);
                    colorSelectionItem.css("color", contrastColor);
                } else {
                    colorSelectionItem.click(e.prototype.colorPickerColorSelected);
                }
                colorSelectionItem.attr("align", "center");
                colorSelectionItem.attr('class', 'color-item');
                colorSelectionItem.css("background-color",`${color}`);
                colorSelectionItem.attr("title", label);

                colorLineDiv.append(colorSelectionItem);
            }

            colorPickerPopup.append(colorLineDiv);
        }

        colorPickerPopup.attr('class', 'tags-input-color-picker');
        colorPickerPopup.attr('data-tagcolor',  tagColor);
        colorPickerPopup.attr('data-tagvalue',  tagValue);
        colorPickerPopup.css("left",startPositionLeft);
        colorPickerPopup.css("top",startPositionTop + 15);
        colorPickerPopup.appendTo('body');

        // t(this).parent().parent().after($("<div/>").append(colorPickerPopup).html());

        /*activeColorPicker = Color(i[0].parent, {
            onchange: function (s, color) {
                button.style.backgroundColor = color;
            },
            palette: 
        });*/
    };
    e.prototype.sanitizeText = function (e) {
        return t("<div>").text(e).html()
    };
    e.prototype.blink = function (e, n, i) {
        const a = t(e);
        a.stop().animate({backgroundColor: n}, 200).promise().done(function () {
            a.animate({backgroundColor: i}, 200)
        })
    };
    e.prototype.fillIn = function (t, e) {
        return t.replace(new RegExp("{([^{]+)}", "g"), function (t, n) {
            return void 0 === e[n] ? "{".concat(n).concat("}") : e[n]
        })
    };
}(jQuery);

function _rgbToHex(rgb) {
    var parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return '#' + parts.join('');
}

// https://stackoverflow.com/a/5624139
function _hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : undefined;
}

// CONTRAST: https://stackoverflow.com/a/9733420
const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;

const GAMMA = 2.4;

function _luminance(r, g, b) {
    var a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, GAMMA);
    });
    return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

function _contrast(rgb1, rgb2) {
    var lum1 = _luminance(...rgb1);
    var lum2 = _luminance(...rgb2);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

function _blackOrWhiteContrast(color) {
    var hexColor = color;
    if (!hexColor.startsWith('#')) {
        hexColor = _rgbToHex(hexColor);
    }
    const rgbColor = _hexToRgb(hexColor);
    const whiteContrast = _contrast([rgbColor.r, rgbColor.g, rgbColor.b], [255, 255, 255]);
    const blackContrast = _contrast([rgbColor.r, rgbColor.g, rgbColor.b], [0, 0, 0]);
    var constastColor = "rgb(0, 0, 0)";

    const blackContrastInt = parseInt(blackContrast, 10);
    const whiteContrastInt = parseInt(whiteContrast, 10);
    if (whiteContrastInt >= 2) {
        constastColor = "rgb(255, 255, 255)";
    }

    return constastColor;
}

function renderColorfullBootstrapTag(tagConfig) {
    if (tagConfig.startsWith("#")) {
        color = tagConfig.substring(0, 7);
        tag = tagConfig.substring(7);
        textColor = _blackOrWhiteContrast(color);
    } else {
        color = "#36454f"
        textColor = _blackOrWhiteContrast(color);
        tag = tagConfig;

    }
    return `<span class="badge badge-secondary" style="background-color: ${color}; color: ${textColor};">${tag}</span>`;
}
