# pi-model-system-prompts

A Pi extension that appends a system prompt only when its exact model is active.

## Install

```bash
pi install /path/to/pi-model-system-prompts
```

For a one-off local run:

```bash
pi -e /path/to/pi-model-system-prompts/index.ts
```

## Configure

Create either of these files:

- Global: `~/.pi/agent/model-system-prompts.json`
- Project: `.pi/model-system-prompts.json`

Map each `provider/model` to the prompt Pi should append:

```json
{
  "openai-codex/gpt-5.6-sol": "Work autonomously, verify repository facts before acting, and run relevant tests before claiming completion. Keep changes minimal.",
  "anthropic/claude-sonnet-4-6": "Use tools decisively and complete coding tasks end to end. Keep reasoning, changes, and final responses concise; avoid speculative work."
}
```

The match is exact. Model IDs may contain additional `/` characters. Project entries override global entries with the same key, and project configuration is read only for trusted projects.

Run `/reload` after editing the configuration. Use `/model` or `pi --list-models` to find the provider and model IDs.

## Development

```bash
npm test
```
