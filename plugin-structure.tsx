import { FolderTree } from "lucide-react"

export default function PluginStructure() {
  return (
    <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
      <h3 className="font-semibold mb-2 flex items-center gap-2">
        <FolderTree className="h-5 w-5" />
        Plugin Structure
      </h3>
      <pre className="text-sm overflow-auto p-3 bg-white dark:bg-slate-800 rounded border">
        {`wordpress-blocks-plugin/
├── .github/                      # GitHub workflows for CI/CD
├── .vscode/                      # VS Code settings
├── assets/                       # Static assets
├── build/                        # Production build output
├── node_modules/                 # JS dependencies
├── src/
│   ├── Blocks/                   # Block classes
│   │   ├── CTABlock.php
│   │   ├── GoogleMapsBlock.php
│   │   └── YouTubeBlock.php
│   ├── Core/                     # Core plugin functionality
│   │   ├── Assets.php            # Asset management
│   │   ├── BlocksManager.php     # Register blocks
│   │   └── Plugin.php            # Main plugin class
│   └── js/
│       ├── blocks/               # React block components
│       │   ├── cta/
│       │   ├── google-maps/
│       │   └── youtube/
│       └── index.js              # JS entry point
├── tests/                        # PHP and JS tests
│   ├── php/
│   └── js/
├── vendor/                       # Composer dependencies
├── .editorconfig                 # Editor settings
├── .eslintrc.js                  # ESLint config
├── .gitignore                    # Git ignore file
├── .phpcs.xml.dist               # PHP Code Sniffer config
├── composer.json                 # PHP dependencies
├── package.json                  # JS dependencies
├── phpunit.xml.dist              # PHPUnit config
├── webpack.config.js             # Webpack config
└── wordpress-blocks-plugin.php   # Main plugin file`}
      </pre>
    </div>
  )
}
