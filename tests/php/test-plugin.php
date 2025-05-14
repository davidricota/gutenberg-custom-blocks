<?php
/**
 * Class PluginTest
 *
 * @package WordPressBlocksPlugin
 */

use WordPressBlocksPlugin\Core\Plugin;

/**
 * Plugin test case.
 */
class PluginTest extends WP_UnitTestCase {

    /**
     * Test plugin initialization.
     */
    public function test_plugin_initialization() {
        $plugin = new Plugin();
        $plugin->init();
        
        // Check if actions are added
        $this->assertEquals( 10, has_action( 'plugins_loaded', [ $plugin, 'load_textdomain' ] ) );
        
        // Add more assertions as needed
        $this->assertTrue( true );
    }
}
