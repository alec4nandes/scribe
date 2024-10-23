function makeInputs(settings) {
    return settings
        .map(
            (section) => `
                <section ${
                    Object.keys(section).includes("person")
                        ? `class="no-wrap"`
                        : ""
                }>
                    ${Object.entries(section).map(makeSetting).join("")}
                </section>
            `
        )
        .join("");
}

function makeSetting(entry) {
    const [setting, { type, options, placeholder }] = entry;
    return `
        <div class="setting">
            <h3>${setting}</h3>
            <div class="options">
                ${options
                    .map((option, i) =>
                        makeInput({
                            setting,
                            type,
                            option,
                            placeholder,
                            isChecked: !i,
                        })
                    )
                    .join("")}
            </div>
        </div>
    `;
}

function makeInput({ setting, type, option, placeholder, isChecked }) {
    return `
        <label>
            <input
                type="${type}"
                name="${setting}"
                ${option ? `value="${option}"` : ""}
                ${placeholder ? `placeholder="${placeholder}"` : ""}
                ${isChecked ? "checked" : ""}
            />
            ${option}
        </label>
    `;
}

export { makeInputs };
