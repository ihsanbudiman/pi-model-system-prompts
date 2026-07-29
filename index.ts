import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
	CONFIG_DIR_NAME,
	getAgentDir,
	type ExtensionAPI,
	type ExtensionContext,
} from "@earendil-works/pi-coding-agent";
import { parseModelPrompts, type ModelPrompts } from "./config.ts";

const CONFIG_FILE = "model-system-prompts.json";

function load(path: string, ctx: ExtensionContext): ModelPrompts {
	try {
		return parseModelPrompts(readFileSync(path, "utf8"), path);
	} catch (error) {
		if (error instanceof Error && "code" in error && error.code === "ENOENT") return {};
		const message = `[pi-model-system-prompts] ${error}`;
		if (ctx.hasUI) ctx.ui.notify(message, "error");
		else console.error(message);
		return {};
	}
}

export default function modelSystemPrompts(pi: ExtensionAPI) {
	let prompts: ModelPrompts = {};

	pi.on("session_start", (_event, ctx) => {
		const globalPrompts = load(join(getAgentDir(), CONFIG_FILE), ctx);
		const projectPrompts = ctx.isProjectTrusted()
			? load(join(ctx.cwd, CONFIG_DIR_NAME, CONFIG_FILE), ctx)
			: {};
		prompts = { ...globalPrompts, ...projectPrompts };
	});

	pi.on("before_agent_start", (event, ctx) => {
		if (!ctx.model) return;

		const prompt = prompts[`${ctx.model.provider}/${ctx.model.id}`];
		if (!prompt) return;

		return { systemPrompt: `${event.systemPrompt}\n\n${prompt}` };
	});
}
