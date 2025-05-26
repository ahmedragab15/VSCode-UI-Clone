import { v4 as uuid } from "uuid";
import { IFile } from "../interfaces";

export const fileTree: IFile = {
  id: uuid(),
  name: "VS Code Clone",
  isFolder: true,
  children: [
    {
      id: uuid(),
      name: "node_modules",
      isFolder: true,
      children: [],
    },
    {
      id: uuid(),
      name: "public",
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: "icons",
          isFolder: true,
        },
      ],
    },
    {
      id: uuid(),
      name: "src",
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: "app",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "store.ts",
              isFolder: false,
              content: `import { configureStore } from "@reduxjs/toolkit";
import fileTreeSlice from "./features/fileTreeSlice";

export const store = configureStore({
  reducer: {
    tree: fileTreeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
`,
            },
          ],
        },
        {
          id: uuid(),
          name: "components",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "IconImg.tsx",
              isFolder: false,
              content: `interface IProps {
  src: string;
  className?: string;
}

const IconImg = ({ src, className = "w-6 h-w-6" }: IProps) => {
  return <img src={src} className={className} />;
};

export default IconImg;
`,
            },
            {
              id: uuid(),
              name: "Preview.tsx",
              isFolder: false,
              content: `import { useSelector } from "react-redux";
import FileSyntaxHighlighter from "./FileSyntaxHighlighter";
import OpenedFilesBar from "./OpenedFilesBar";
import { RootState } from "../app/store";

const Preview = () => {
  const {
    clickedFile: { fileContent },
  } = useSelector(({ tree }: RootState) => tree);

  return (
    <>
      <OpenedFilesBar />
      <FileSyntaxHighlighter content={fileContent} />
    </>
  );
};

export default Preview;
`,
            },
          ],
        },
        {
          id: uuid(),
          name: "constants",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "index.ts",
              isFolder: false,
              content: `export const extensionIconPaths: Record<string, string> = {
  // ** Files
  js: "/icons/javascript",
  ts: "/icons/typescript",
  tsx: "/icons/react_ts",
  jsx: "/icons/react",
  html: "/icons/html",
  css: "/icons/css",
  svg: "/icons/svg",
  gitignore: "/icons/git",
  json: "/icons/nodejs",

  //** Folders
  node_modules: "/icons/folder-node",
  public: "/icons/folder-public",
  src: "/icons/folder-src",
  app: "/icons/folder-app",
  components: "/icons/folder-components",
  constants: "/icons/folder-constant",
};
`,
            },
          ],
        },
        {
          id: uuid(),
          name: "App.tsx",
          isFolder: false,
          content: `import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Preview from "./components/Preview";
import RecursiveComponent from "./components/RecursiveComponent";
import ResizablePanel from "./components/ResizablePanel";
import WelcomeTab from "./components/WelcomeTab";
import { fileTree } from "./data/fileTree";

const App = () => {
  const { openedFiles } = useSelector(({ tree }: RootState) => tree);

  return (
    <div>
      <div className="flex h-screen">
        <ResizablePanel
          showLeftPanel
          leftPanel={
            <div className="w-64 p-2">
              <RecursiveComponent fileTree={fileTree} />
            </div>
          }
          rightPanel={openedFiles.length ? <Preview /> : <WelcomeTab />}
        />
      </div>
    </div>
  );
};

export default App;
`,
        },
        {
          id: uuid(),
          name: "index.css",
          isFolder: false,
          content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 23, 21, 32, 255;
    --background-end-rgb: 23, 21, 32, 255;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(to bottom, transparent, 
  rgb(var(--background-end-rgb))) rgb(var(--background-start-rgb));
}

`,
        },
        {
          id: uuid(),
          name: "main.tsx",
          isFolder: false,
          content: `import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
`,
        },
      ],
    },
    {
      id: uuid(),
      name: ".gitignore",
      isFolder: false,
      content: `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local`,
    },
    {
      id: uuid(),
      name: "index.html",
      isFolder: false,
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#1e1e1e" />
<title>VSCode Clone</title>
</head>
<body>
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
</body>
</html>
`,
    },
    {
      id: uuid(),
      name: "package.json",
      isFolder: false,
      content: `{
  "name": "vscode-clone",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^1.9.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.2",
    "react-resizable-panels": "^0.0.54",
    "react-syntax-highlighter": "^15.5.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@types/react-syntax-highlighter": "^15.5.7",
    "@types/uuid": "^9.0.2",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}
`,
    },
  ],
};
