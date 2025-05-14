<?php
/**
 * Assets management class.
 *
 * @package WordPressBlocksPlugin
 */

namespace WordPressBlocksPlugin\Core;

/**
 * Assets class.
 */
class Assets {
    /**
     * Initialize assets.
     *
     * @return void
     */
    public function init() {
        add_action( 'init', [ $this, 'register_assets' ] );
    }

    /**
     * Register scripts and styles.
     *
     * @return void
     */
    public function register_assets() {
        // Register block editor assets
        $asset_file = include WP_BLOCKS_PLUGIN_DIR . 'build/index.asset.php';

        wp_register_script(
            'wordpress-blocks-plugin-editor',
            WP_BLOCKS_PLUGIN_URL . 'build/index.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );

        wp_register_style(
            'wordpress-blocks-plugin-editor',
            WP_BLOCKS_PLUGIN_URL . 'build/index.css',
            [],
            $asset_file['version']
        );

        // Register frontend styles
        wp_register_style(
            'wordpress-blocks-plugin-frontend',
            WP_BLOCKS_PLUGIN_URL . 'build/style-index.css',
            [],
            $asset_file['version']
        );

        // Add translations
        if ( function_exists( 'wp_set_script_translations' ) ) {
            wp_set_script_translations(
                'wordpress-blocks-plugin-editor',
                'wordpress-blocks-plugin',
                WP_BLOCKS_PLUGIN_DIR . 'languages'
            );
        }
    }
}
