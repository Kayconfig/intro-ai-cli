# Ice-Breaker CLI

![License](https://img.shields.io/badge/License-MIT-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

This project is a command-line interface (CLI) application built with **NodeJs**, **LangChainJs**, **Tavily** that helps you get to know people better by providing a quick summary and three fun facts about them via LinkedIn.

## Description

Ice-Breaker is a simple yet powerful AI tool designed to break the ice in any social (only linkedIn is integrated for now) or professional setting. Whether you're meeting a new team member, preparing for a networking event, or just curious about a public figure, this app provides you with a concise summary and interesting tidbits to spark a conversation. The entire experience is handled through your terminal, making it a lightweight and fast tool for developers and command-line enthusiasts.

## Features

- **Person Summary:** Get a brief overview of a person's background and achievements.
- **Fun Facts:** Discover three interesting and lesser-known facts about the individual.
- **Command-Line Interface:** A clean and intuitive CLI for a seamless user experience.

## Technologies Used

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **LangChain:** A framework for developing applications powered by language models.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/kayode-odole/ice-breaker.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd ice-breaker
    ```
3.  Install the dependencies:
    ```bash
    pnpm install
    ```

## Usage

To get information about a person, run the following command in your terminal:

### Set Environment

create .env file using .env.example as a guide

```bash
pnpm ice-break --name "Name of the person"
```

For example:

```bash
pnpm ice-break --name "Elon Musk"
```

The application will then output the summary and three fun facts about the person you specified.

## 📌 Why This Project?

This project demonstrates:

📌 Why This Project?

This project demonstrates:

- ✅ CLI conversation with Large Language Model using NodeJs
- ✅ Agentic AI
- ✅ Tool calling
- ✅ Utilizing third party service like Tavily

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

## Author

- **Kayode Odole**

## License

This project is licensed under the [MIT License](LICENSE) — feel free to use it.
