# Smart apps to work smartly

Hello there 👋

This is a monorepo which currently includes the following apps:

- LinkedIn-to-Notion

This monorepo uses [pnpm](https://pnpm.io/).

## Getting started

Follow these steps to start working on the project.
<br>
⚠️ Basic setup (npm installed, node installed, etc.) are not included in this setup.
<br>
_Recommended node version: `v18.16.0`. Manage your versions with [nvm](https://github.com/nvm-sh/nvm) if needed._

**1. Clone the repository**

```
git clone https://github.com/Bastien-and-Gauvain/monorepo.git
```

**2. Install PNPM _(optional)_**
<br>
If you haven't already, install PNPM globally on your system:

```
npm install -g pnpm
```

**3. Start and build the Design System**

- Navigate to the /libs/design-system directory:

```
cd libs/design-system
```

- Install dependencies:

```
pnpm install
```

- Build it:

```
pnpm run dev
```

**4. Start the LinkedIn-to-Notion extension**

- Navigate to the /apps/linkedin-to-notion directory:

```
cd /apps/linkedin-to-notion
```

- Install dependencies:

```
pnpm install
```

- Start the project using Plasmo:

```
pnpm run dev
```

**5. Import the build as an extension on chrome**
<br>
The first time you start the project you must load the extension in Chrome. Follow this steps to do so: https://docs.plasmo.com/framework#loading-the-extension-in-chrome
