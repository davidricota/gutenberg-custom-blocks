### WordPress Blocks Plugin – Modern Gutenberg Blocks

**WordPress Blocks Plugin** is a modern WordPress plugin that adds three custom Gutenberg blocks built with React and Tailwind CSS. It follows best practices for WordPress plugin development including namespaces, Composer autoloading, and a comprehensive build system to generate production-ready code.

Designed for developers who want to extend WordPress with custom blocks while maintaining a clean, organized codebase that's easy to customize and extend.

---

## ✨ Features

- ✅ Three custom Gutenberg blocks:

- 🎯 **CTA Block**: Customizable call-to-action with button
- 🗺️ **Google Maps Block**: Embed maps with API or iframe options
- 🎬 **YouTube Block**: Advanced YouTube video embedding



- 🧩 Built with **React** and **Tailwind CSS**
- ⚙️ Modern PHP with **namespaces** and **Composer autoloading**
- 🔧 Complete build system with **Webpack** and **npm scripts**
- 🧪 Testing setup with **PHPUnit** and **Jest**
- 🔍 Code quality tools: **ESLint**, **PHPCS**, and **GitHub Actions**


---

## 📦 Installation

### 1. From ZIP File

1. Download the latest release ZIP file
2. Go to WordPress Admin > Plugins > Add New > Upload Plugin
3. Upload the ZIP file and activate the plugin


### 2. Manual Installation (Development)

Clone the repository and set up the development environment:

```shellscript
# Clone the repository
git clone https://github.com/your-username/wordpress-blocks-plugin.git
cd wordpress-blocks-plugin

# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install

# Build the assets
npm run build
```

---

## 🧰 Block Usage

### CTA Block

The Call to Action block allows you to create customizable CTA sections with a title, description, and button.

**Features:**

- Customizable title and description
- Button with configurable URL and text
- Color settings for background, text, and button
- Alignment options (left, center, right)


**Example:**

```plaintext
[CTA Block]
Title: "Subscribe to Our Newsletter"
Description: "Stay updated with our latest news and offers."
Button: "Subscribe Now" -> https://example.com/subscribe
```

### Google Maps Block

The Google Maps block allows you to embed Google Maps in two ways:

**Features:**

- Two embedding options:

- Google Maps API (requires API key)
- Direct iframe embed (no API key needed)



- Location by address or coordinates
- Customizable zoom level and height
- Option to show/hide marker


**API Key Setup:**

1. Go to WordPress Admin > Settings > WP Blocks Plugin
2. Enter your Google Maps API key
3. Save settings


**Example with API:**

```plaintext
[Google Maps Block]
Address: "1600 Amphitheatre Parkway, Mountain View, CA"
Zoom: 15
Height: 400px
```

**Example with iframe:**

```plaintext
[Google Maps Block]
Iframe: "<iframe src="https://www.google.com/maps/embed?pb=!1m18!..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>"
Height: 450px
```

### YouTube Block

The YouTube Block allows you to embed YouTube videos with advanced options.

**Features:**

- Video embedding by URL or ID
- Customizable aspect ratio (16:9, 4:3, 1:1)
- Start and end time settings
- Playback options (autoplay, loop, mute)
- Controls for video info and related videos


**Example:**

```plaintext
[YouTube Block]
Video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
Aspect Ratio: 16:9
Start Time: 30 seconds
Autoplay: Yes (muted)
```

---

## 🧪 Development

### Project Structure

```plaintext
wordpress-blocks-plugin/
├── build/                  # Compiled assets (generated)
├── dist/                   # Distribution files (generated)
├── src/
│   ├── Blocks/             # Block PHP classes
│   │   ├── CTABlock.php
│   │   ├── GoogleMapsBlock.php
│   │   └── YouTubeBlock.php
│   ├── Core/               # Core plugin functionality
│   │   ├── Assets.php      # Asset management
│   │   ├── BlocksManager.php # Register blocks
│   │   ├── Plugin.php      # Main plugin class
│   │   └── Settings.php    # Plugin settings
│   └── js/
│       ├── blocks/         # React block components
│       │   ├── cta/
│       │   ├── google-maps/
│       │   └── youtube/
│       └── index.js        # JS entry point
├── tests/                  # PHP and JS tests
├── vendor/                 # Composer dependencies
├── scripts/                # Build scripts
├── .github/                # GitHub workflows
├── composer.json           # PHP dependencies
├── package.json            # JS dependencies
├── webpack.config.js       # Webpack configuration
└── wordpress-blocks-plugin.php # Main plugin file
```

### Available Scripts

- `npm start`: Start development with hot reloading
- `npm run build`: Build production assets
- `npm run lint:js`: Lint JavaScript files
- `npm run lint:css`: Lint CSS files
- `npm run lint:php`: Lint PHP files with PHPCS
- `npm run fix:php`: Fix PHP linting issues
- `npm run test:js`: Run JavaScript tests
- `npm run test:php`: Run PHP tests
- `npm run plugin-zip`: Create a distributable plugin ZIP file


### Building for Production

To create a production-ready ZIP file:

```shellscript
# Install dependencies
composer install --no-dev
npm install

# Build assets
npm run build

# Create plugin ZIP
npm run plugin-zip
```

The ZIP file will be created in the `dist/` directory.

---

## 🔧 Extending the Plugin

### Adding a New Block

1. Create a new PHP class in `src/Blocks/`
2. Create a new React component in `src/js/blocks/`
3. Register the block in `src/Core/BlocksManager.php`
4. Import and register the block in `src/js/index.js`


**Example PHP Class:**

```php
<?php
namespace WordPressBlocksPlugin\Blocks;

class NewBlock {
    private $name = 'wordpress-blocks-plugin/new-block';

    public function register() {
        register_block_type(
            'wordpress-blocks-plugin/new-block',
            [
                'editor_script' => 'wordpress-blocks-plugin-editor',
                'editor_style'  => 'wordpress-blocks-plugin-editor',
                'style'         => 'wordpress-blocks-plugin-frontend',
                'render_callback' => [ $this, 'render' ],
            ]
        );
    }

    public function render($attributes, $content, $block) {
        // Server-side rendering
        return $content;
    }
}
```

**Example JS Component:**

```javascriptreact
// src/js/blocks/new-block/index.js
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export const name = 'wordpress-blocks-plugin/new-block';

export const settings = {
    apiVersion: 2,
    title: __('New Block', 'wordpress-blocks-plugin'),
    description: __('A new custom block.', 'wordpress-blocks-plugin'),
    category: 'widgets',
    icon: 'smiley',
    supports: {
        html: false,
    },
    attributes: {
        // Define attributes
    },
    
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        
        return (
            <div {...blockProps}>
                {/* Block editor UI */}
            </div>
        );
    },
    
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
        
        return (
            <div {...blockProps}>
                {/* Block saved content */}
            </div>
        );
    },
};
```

### Customizing Existing Blocks

You can customize existing blocks by modifying their PHP classes and React components. The plugin is structured to make it easy to extend and modify.

---

## 🧪 Testing

### PHP Tests

The plugin includes PHPUnit tests for PHP code:

```shellscript
# Run PHP tests
composer test
```

### JavaScript Tests

The plugin includes Jest tests for JavaScript code:

```shellscript
# Run JavaScript tests
npm run test:js
```

### GitHub Actions

The plugin includes GitHub Actions workflows for continuous integration:

- PHP tests on multiple PHP versions
- JavaScript linting and tests
- Build verification


---

## 🚀 Deployment

The plugin can be deployed to WordPress.org or distributed as a ZIP file:

```shellscript
# Create a distributable ZIP file
npm run plugin-zip
```

---

## 🔭 Future Improvements

- Block patterns combining multiple blocks
- Block variations for common use cases
- Admin preview for blocks
- Additional blocks (slider, accordion, etc.)
- Block templates for common layouts


---

## 📄 License

This project is licensed under the GPL v2 or later - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


---

## 📚 Resources

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/)