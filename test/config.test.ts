import assert from "node:assert/strict";
import test from "node:test";
import { parseModelPrompts } from "../config.ts";

test("parses provider/model prompts", () => {
	const prompts = parseModelPrompts(
		JSON.stringify({
			"openai-codex/gpt-5.6-sol": "Prefer the standard library.",
			"anthropic/claude-sonnet-4-6": "Keep answers concise.",
		}),
		"prompts.json",
	);

	assert.equal(prompts["openai-codex/gpt-5.6-sol"], "Prefer the standard library.");
	assert.throws(() => parseModelPrompts('{"gpt-5": 42}', "prompts.json"), /provider\/model format/);
});
