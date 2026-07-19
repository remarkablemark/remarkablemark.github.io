---
layout: post
title: How to use Code Ollama
date: 2026-07-19 15:51:18
excerpt: How to use Code Ollama, a free coding agent that runs in your terminal. The TUI has no per-token API cost, runs privately with local inference, works offline without internet, and uses open-weight models (Gemma, Qwen, DeepSeek).
categories: code-ollama ollama ai agent tui cli llm
---

This post goes over how to use [Code Ollama](https://github.com/ai-action/code-ollama), a free coding agent that runs in your terminal.

## Motivation

Why use Code Ollama?

- **free** (no per-token API cost)
- **private** (local inference)
- **offline** (run without internet)
- **open models** (Gemma, Qwen, DeepSeek, etc.)

## Ollama

Install [Ollama](https://ollama.com/download):

```sh
brew install ollama
```

Start the Ollama server in a separate terminal:

```sh
ollama serve
```

Download [gemma4](https://ollama.com/library/gemma4):

```sh
ollama pull gemma4
```

> You can also download a model from the TUI using the `/models` command.

Confirm the model works:

```sh
ollama run gemma4 "Hello, world!"
```

## Code Ollama

Run Code Ollama without installing it:

```sh
npx code-ollama
```

Or install the [npm package](https://www.npmjs.com/package/code-ollama) globally:

```sh
npm install --global code-ollama
```

> Alternatively, download a standalone executable for Linux, macOS, and Windows from [GitHub Releases](https://github.com/ai-action/code-ollama/releases). Standalone executables do not support certain features.

Check that Code Ollama can connect to Ollama and find the selected model:

```sh
code-ollama doctor
```

Open the terminal user interface (TUI) from a project directory:

```bash
cd path/to/project
code-ollama
```

Code Ollama will ask whether you trust the directory before reading files or running tools. Once the TUI opens, try a prompt:

```text
Explain this project and suggest one small improvement.
```

Use `/models` to switch or download models. Press `?` to see the keyboard shortcuts and available commands.

## Tools and Modes

Code Ollama can use tools to search and read files, edit code, and run shell commands. Press `Shift+Tab` to cycle through modes:

- **Safe**: runs read-only tools automatically and asks for approval before editing files or running commands
- **Auto**: runs permitted tools without asking for approval
- **Plan**: researches with read-only tools and creates a plan before making changes

## One-Off Prompts

Run a prompt without opening the TUI:

```sh
code-ollama run gemma4 "Review the changes in this repository"
```

Add `--trust` to skip the directory trust prompt:

```sh
code-ollama run --trust gemma4 "Review the changes in this repository"
```

You can also attach images when using a vision-capable model:

```sh
code-ollama run gemma4 "Describe this error" --image screenshot.png
```

## Skills

[Skills](https://github.com/ai-action/code-ollama#skills) are Markdown instructions that add project or user context to Code Ollama.

Add a project skill at:

```text
.code-ollama/skills/<skill-name>/SKILL.md
```

Use `/skills` in the TUI to see which skills are loaded.

## MCP

Code Ollama supports [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) servers, which make additional tools and resources available to the agent.

Configure local or remote MCP servers in:

```text
~/.code-ollama/config.json
```

Use `/mcp` in the TUI to inspect configured servers, loaded tools, permissions, and errors. See the [Code Ollama documentation](https://github.com/ai-action/code-ollama#mcp) for configuration examples.

## Resources

Code Ollama is [open source](https://github.com/ai-action/code-ollama) and available for macOS, Linux, and Windows through [npm](https://www.npmjs.com/package/code-ollama) and [GitHub Releases](https://github.com/ai-action/code-ollama/releases). Check out the [wiki](https://github.com/ai-action/code-ollama/wiki) for more information!
