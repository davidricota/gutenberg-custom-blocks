<?php
/**
 * Plugin Name: WordPress Blocks Plugin
 * Description: A plugin that adds custom Gutenberg blocks for CTA, Google Maps, and YouTube videos.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://yourwebsite.com
 * Text Domain: wordpress-blocks-plugin
 * Domain Path: /languages
 * License: GPL v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package WordPressBlocksPlugin
 */

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define plugin constants
define( 'WP_BLOCKS_PLUGIN_VERSION', '1.0.0' );
define( 'WP_BLOCKS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'WP_BLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'WP_BLOCKS_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

// Autoload dependencies
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
    require_once __DIR__ . '/vendor/autoload.php';
}

// Initialize the plugin
if ( class_exists( 'WordPressBlocksPlugin\\Core\\Plugin' ) ) {
    $plugin = new WordPressBlocksPlugin\Core\Plugin();
    $plugin->init();
}

// Activation hook
register_activation_hook( __FILE__, function() {
    // Activation tasks
    flush_rewrite_rules();
} );

// Deactivation hook
register_deactivation_hook( __FILE__, function() {
    // Deactivation tasks
    flush_rewrite_rules();
} );
