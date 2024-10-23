import { settings, pronouns } from "./model.mjs";
import { makeInputs } from "./view.mjs";

const formElem = document.querySelector("form#settings"),
    promptElem = document.querySelector("#prompt"),
    randomBtn = document.querySelector("button#random");
formElem.innerHTML = makeInputs(settings);
formElem.onchange = () => handleSettingsChange(formElem, promptElem);
randomBtn.onclick = () => handleRandom(formElem, promptElem);

handleRandom(formElem, promptElem);

function handleSettingsChange(formElem, promptElem) {
    const format = formElem.format.value,
        person = formElem.person.value,
        number = formElem.number.value,
        getChecked = (name) =>
            [...formElem.querySelectorAll(`input[name="${name}"]`)]
                .filter(({ checked }) => checked)
                .map(({ value }) => value),
        voice = getChecked("voice"),
        tone = getChecked("tone"),
        intent = getChecked("intent"),
        audience = formElem.audience.value,
        prompt = makePrompt({
            format,
            person,
            number,
            voice,
            tone,
            intent,
            audience,
        });
    promptElem.innerHTML = prompt;
}

function makePrompt({ format, person, number, voice, tone, intent, audience }) {
    const pronoun = pronouns[person][number];
    return `
        I am writing a ${format} in the ${person} person ${number}
        with the pronoun "${pronoun}" and using the
        voice${voice.length > 1 ? "s" : ""} of ${joiner(voice.map(aOrAn))}.
        The tone${tone.length > 1 ? "s will include" : " will be"}
        ${joiner(tone)} with the intent to ${joiner(intent)} ${audience}.
    `;
}

function handleRandom(formElem, promptElem) {
    const names = [
            "format",
            "person",
            "number",
            "voice",
            "tone",
            "intent",
            "audience",
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
