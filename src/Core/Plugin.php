<?php
/**
 * Main plugin class.
 *
 * @package WordPressBlocksPlugin
 */

namespace WordPressBlocksPlugin\Core;

/**
 * Plugin class.
 */
class Plugin {
    /**
     * The blocks manager instance.
     *
     * @var BlocksManager
     */
    private $blocks_manager;

    /**
     * The assets manager instance.
     *
     * @var Assets
     */
    private $assets;

    /**
     * The settings manager instance.
     *
     * @var Settings
     */
    private $settings;

    /**
     * Constructor.
     */
    public function __construct() {
        $this->blocks_manager = new BlocksManager();
        $this->assets = new Assets();
        $this->settings = new Settings();
    }

    /**
     * Initialize the plugin.
     *
     * @return void
     */
    public function init() {
        // Load text domain
        add_action( 'plugins_loaded', [ $this, 'load_textdomain' ] );

        // Initialize components
        $this->assets->init();
        $this->blocks_manager->init();
        $this->settings->init();
    }

    /**
     * Load plugin text domain.
     *
     * @return void
     */
    public function load_textdomain() {
        load_plugin_textdomain(
            'wordpress-blocks-plugin',
            false,
            dirname( WP_BLOCKS_PLUGIN_BASENAME ) . '/languages'
        );
    }
}
