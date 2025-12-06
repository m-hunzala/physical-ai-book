# My Robotics Book - Learning Platform

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator. It includes advanced features for personalized learning and multilingual support.

## Features

- **Personalized Learning Experience**: Content adapts based on your hardware, experience level, and domain of interest
- **Multilingual Support**: Chapters can be translated to Urdu with preservation of technical terms
- **Interactive Chatbot**: AI-powered assistant to answer questions about the content
- **User Authentication**: Secure login with profile customization

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Translation Feature

The platform includes a translation feature that allows chapters to be translated to Urdu while preserving technical terms and code blocks:

- On-demand translation per chapter
- Caching to optimize costs and performance
- Preservation of code blocks, URDF files, and technical identifiers
- Fallback mechanism when LLM fails

For more information, see the [Translation Feature Documentation](./docs/translation-feature.md).

## Authentication & Personalization

The platform features user authentication and content personalization:

- Profile signup with hardware and experience details
- Content adjustment based on user preferences
- "Personalize this chapter" functionality

For more information, see the [Authentication Documentation](./docs/authentication.md).
