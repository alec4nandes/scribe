import { settings, types, pronouns } from "./model.mjs";
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
    promptElem.innerHTML = makePrompt(formElem);
}

function handleRandom(formElem, promptElem) {
    const names = Object.keys(types),
        getInputs = (name) => [
            ...formElem.querySelectorAll(`input[name="${name}"]`),
        ];
    for (const name of names) {
        const inputs = getInputs(name),
            randomIndex = ~~(Math.random() * inputs.length);
        inputs.forEach((input, i) => (input.checked = i === randomIndex));
    }
    promptElem.innerHTML = makePrompt(formElem);
}

function makePrompt(formElem) {
    const { format, person, number, audience, topic, voice, tone, intent } =
            getFormData(formElem),
        pronoun = pronouns[person][number],
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

function getFormData(formElem) {
    const formData = new FormData(formElem);
    return Object.keys(types).reduce(
        (acc, name) => ({
            ...acc,
            [name]:
                types[name] === "checkbox"
                    ? formData.getAll(name)
                    : formData.get(name),
        }),
        {}
    );
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

function aOrAn(value) {
    const vowels = ["a", "e", "i", "o", "u"],
        a = vowels.includes(value.toLowerCase().charAt(0)) ? "an " : "a ";
    return a + value;
}
