import { settings, pronouns } from "./model.mjs";
import { makeInputs } from "./view.mjs";

const formElem = document.querySelector("form#settings");
formElem.innerHTML = makeInputs(settings);
const forWhatInput = formElem.querySelector(`input[name="topic"]`),
    promptElem = document.querySelector("#prompt"),
    randomBtn = document.querySelector("button#random");

formElem.onchange = () => handleSettingsChange(formElem, promptElem);
forWhatInput.oninput = () => handleSettingsChange(formElem, promptElem);
randomBtn.onclick = () => handleRandom(formElem, promptElem);

handleRandom(formElem, promptElem);

function handleSettingsChange(formElem, promptElem) {
    const getData = (names, func) =>
            names.reduce((acc, name) => ({ ...acc, [name]: func(name) }), {}),
        getValue = (name) => formElem[name].value,
        getChecked = (name) =>
            [...formElem.querySelectorAll(`input[name="${name}"]`)]
                .filter(({ checked }) => checked)
                .map(({ value }) => value),
        valueNames = ["format", "person", "number", "audience", "topic"],
        checkedNames = ["voice", "tone", "intent"];
    promptElem.innerHTML = makePrompt({
        ...getData(valueNames, getValue),
        ...getData(checkedNames, getChecked),
    });
}

function makePrompt({
    format,
    person,
    number,
    audience,
    topic,
    voice,
    tone,
    intent,
}) {
    const pronoun = pronouns[person][number],
        s = (arr) => (arr.length > 1 ? "s" : "");
    return `
        I am writing a ${format} in the ${person} person ${number}
        with the pronoun "${pronoun}" and using the
        voice${s(voice)} of ${joiner(voice.map(aOrAn))}.
        My audience is ${audience}, and the tone will be
        ${joiner(tone)} with the intent to
        ${joiner(intent)}${topic ? ` ${topic}` : ""}.
    `;
}

function handleRandom(formElem, promptElem) {
    const names = [
            "format",
            "person",
            "number",
            "audience",
            "topic",
            "voice",
            "tone",
            "intent",
        ],
        getInputs = (name) => [
            ...formElem.querySelectorAll(`input[name="${name}"]`),
        ],
        data = {};
    for (const name of names) {
        const inputs = getInputs(name),
            randomIndex = ~~(Math.random() * inputs.length);
        inputs.forEach((input, i) => {
            if (i === randomIndex) {
                input.checked = true;
                const { value } = input;
                data[name] = input.type === "checkbox" ? [value] : value;
            } else {
                input.checked = false;
            }
        });
    }
    promptElem.innerHTML = makePrompt(data);
}

function aOrAn(value) {
    const vowels = ["a", "e", "i", "o", "u"],
        a = vowels.includes(value.toLowerCase().charAt(0)) ? "an " : "a ";
    return a + value;
}

function joiner(values) {
    if (values.length === 1) {
        return values[0];
    }
    if (values.length === 2) {
        return values.join(" and ");
    }
    const last = values.pop();
    return `${values.join(", ")}, and ${last}`;
}
