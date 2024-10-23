function makeInputs(settings) {
    return Object.entries(settings).map(makeSetting).join("");
}

function makeSetting(entry) {
    const [setting, { type, options }] = entry;
    return `
        <div class="setting">
            <h3>${setting}</h3>
            ${options
                .map((option, i) =>
                    makeRadio({ setting, type, option, isChecked: !i })
                )
                .join("")}
        </div>
    `;
}

function makeRadio({ setting, type, option, isChecked }) {
    return `
        <label>
            <input
                type="${type}"
                name="${setting}"
                value="${option}"
                ${isChecked ? "checked" : ""}
            />
            ${option}
        </label>
    `;
}

export { makeInputs };
