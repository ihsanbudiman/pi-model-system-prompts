export type ModelPrompts = Record<string, string>;

export function parseModelPrompts(content: string, path: string): ModelPrompts {
	const value: unknown = JSON.parse(content);

	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`${path} must contain a JSON object`);
	}

	for (const [model, prompt] of Object.entries(value)) {
		const slash = model.indexOf("/");
		if (slash < 1 || slash === model.length - 1) {
			throw new Error(`${path}: "${model}" must use the provider/model format`);
		}
		if (typeof prompt !== "string") {
			throw new Error(`${path}: prompt for "${model}" must be a string`);
		}
	}

	return value as ModelPrompts;
}
