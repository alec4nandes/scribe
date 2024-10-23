import { settings, pronouns } from "./model.mjs";
import { makeInputs } from "./view.mjs";

const formElem = document.querySelector("form#settings");
formElem.innerHTML = makeInputs(settings);
formElem.onchange = () => handleSettingsChange(formElem);

handleSettingsChange(formElem);

function handleSettingsChange(formElem) {
    const format = formElem.format.value,
        person = formElem.person.value,
        number = formElem.number.value,
        pronoun = pronouns[person][number],
        getChecked = (name) =>
            [...formElem.querySelectorAll(`input[name="${name}"]`)]
                .filter(({ checked }) => checked)
                .map(({ value }) => value),
        voices = getChecked("voice").map(aOrAn),
        tones = getChecked("tone"),
        intents = getChecked("intent"),
        audience = formElem.audience.value,
        prompt =
            `I am writing a ${format} in the ${person} person ${number} ` +
            `with the pronoun "${pronoun}" and using the ` +
            `voice${voices.length > 1 ? "s" : ""} of ${joiner(voices)}. ` +
            `The tone${
                tones.length > 1 ? "s will include" : " will be"
            } ${joiner(tones)} ` +
            `with the intent to ${joiner(intents)} ${audience}.`,
        promptElem = document.querySelector("#prompt");
    promptElem.innerHTML = prompt;
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
