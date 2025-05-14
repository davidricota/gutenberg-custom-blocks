<?php
/**
 * YouTube Block class.
 *
 * @package WordPressBlocksPlugin
 */

namespace WordPressBlocksPlugin\Blocks;

/**
 * YouTubeBlock class.
 */
class YouTubeBlock {
    /**
     * Block name.
     *
     * @var string
     */
    private $name = 'wordpress-blocks-plugin/youtube';

    /**
     * Register the block.
     *
     * @return void
     */
    public function register() {
        register_block_type(
            'wordpress-blocks-plugin/youtube',
            [
                'editor_script' => 'wordpress-blocks-plugin-editor',
                'editor_style'  => 'wordpress-blocks-plugin-editor',
                'style'         => 'wordpress-blocks-plugin-frontend',
                'render_callback' => [ $this, 'render' ],
            ]
        );
    }

    /**
     * Render the block.
     *
     * @param array    $attributes Block attributes.
     * @param string   $content    Block content.
     * @param WP_Block $block      Block instance.
     * @return string Rendered block.
     */
    public function render( $attributes, $content, $block ) {
        // Server-side rendering if needed
        return $content;
    }
}
