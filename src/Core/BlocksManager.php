<?php
/**
 * Blocks manager class.
 *
 * @package WordPressBlocksPlugin
 */

namespace WordPressBlocksPlugin\Core;

use WordPressBlocksPlugin\Blocks\CTABlock;
use WordPressBlocksPlugin\Blocks\GoogleMapsBlock;
use WordPressBlocksPlugin\Blocks\YouTubeBlock;

/**
 * BlocksManager class.
 */
class BlocksManager {
    /**
     * Blocks collection.
     *
     * @var array
     */
    private $blocks = [];

    /**
     * Constructor.
     */
    public function __construct() {
        $this->blocks = [
            new CTABlock(),
            new GoogleMapsBlock(),
            new YouTubeBlock(),
        ];
    }

    /**
     * Initialize blocks.
     *
     * @return void
     */
    public function init() {
        add_action( 'init', [ $this, 'register_blocks' ] );
    }

    /**
     * Register all blocks.
     *
     * @return void
     */
    public function register_blocks() {
        foreach ( $this->blocks as $block ) {
            $block->register();
        }
    }
}
