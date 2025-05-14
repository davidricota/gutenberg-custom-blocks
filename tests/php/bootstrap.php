<?php
/**
 * PHPUnit bootstrap file.
 *
 * @package WordPressBlocksPlugin
 */

// Composer autoloader must be loaded before WP_PHPUNIT__DIR will be available
require_once dirname( dirname( __DIR__ ) ) . '/vendor/autoload.php';

// Determine the tests directory path
$_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $_tests_dir ) {
    $_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

// Give access to tests_add_filter() function
require_once $_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
    require dirname( dirname( __DIR__ ) ) . '/wordpress-blocks-plugin.php';
}
tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

// Start up the WP testing environment
require $_tests_dir . '/includes/bootstrap.php';
