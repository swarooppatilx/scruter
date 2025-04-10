## Contributing to Scruter

Thank you for your interest in contributing to Scruter! Your contributions help improve our community and make it easier for everyone to buy, sell, and exchange goods and services. Please follow the guidelines below to ensure a smooth contribution process.

## Table of Contents

- [Getting Started](#getting-started)
- [Opening a Pull Request](#opening-a-pull-request)
- [Contribution Guidelines](#contribution-guidelines)
- [Commit Messages](#commit-messages)
- [Creating Issues](#creating-issues)
- [Acknowledgments](#acknowledgments)

## Getting Started

1. **🍴 Fork the repository** to your own GitHub account by clicking the "Fork" button at the top-right corner of the repository page.
2. **💻 Clone your forked repository** to your local machine:
   ```bash
   git clone https://github.com/your-username/scruter.git
   cd scruter
   ```
3. **🌿 Create a new branch** for your changes:
   ```bash
   git checkout -b feature-branch-name
   ```
4. **🛠️ Make your changes** and test them locally.

## Setting up environment

1. **Get your mongodb connection string**. Download mongodb compass if you're not having already and you can find your connection string there
2. Register for cloudinary account and get your api key, api secret and cloud name
3. Give a session secret and you're good to go

## Getting your cloudinary keys

1. Sign up for cloudinary and go to [cloudinary console](https://console.cloudinary.com/)
2. Create environment in cloudinary and go to settings by clicking gear icon in the left panel
3. Find API keys in the sidebar and generate and copy your api keys and secret
4. Also get your cloud name and keep it in .env file

![image](https://github.com/user-attachments/assets/22efe54c-c2aa-4e63-bc1e-58e7c09c509d)

## Install the packages and start dev server

```bash
npm install
```

```bash
npm run dev
```

## Opening a Pull Request

1. **✅ Commit your changes** with clear commit messages:
   ```bash
   git add .
   git commit -m 'Add some feature'
   ```
2. **📤 Push to your branch**:
   ```bash
   git push origin feature-branch-name
   ```
3. **🔄 Submit a pull request**: Go to the original repository and click on the "Pull Request" button to submit your changes.

## Contribution Guidelines

- We welcome contributions in the form of new features, bug fixes, enhancements, and documentation updates.
- Be respectful and constructive in all interactions with other contributors.
- Test your changes thoroughly before submitting a pull request.
- Include a clear and descriptive title for your pull request summarizing the changes.

# 🏆 Contribution Points

All tasks will be assigned various levels based on complexity and required skills. Each level provides different points:

- **🥇 Level 1:** 10 Points
- **🥈 Level 2:** 25 Points
- **🥉 Level 3:** 45 Points

## Commit Messages

- Use meaningful commit messages related to your changes.
- Prefix your commit messages with the following:
  - `fix:` for bug fixes.
  - `feat:` for new features.
  - `docs:` for documentation updates.
  - `chore:` for miscellaneous changes.

## Creating Issues

- Use a clear and descriptive title for your issue.
- Provide detailed information about the issue, including:
  - Steps to reproduce the problem.
  - Expected and actual results.
  - Any relevant screenshots or error messages.
- When suggesting new features, provide a detailed description of the feature and its potential benefits.

## Acknowledgments

Thank you for considering contributing to Scruter!
If you enjoy working with us, please give the project a ⭐ star! Your support means a lot and encourages further contributions. ✨

Happy coding! 🚀
