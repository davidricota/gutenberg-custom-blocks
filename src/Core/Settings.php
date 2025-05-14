<?php
/**
 * Settings page for the plugin.
 *
 * @package WordPressBlocksPlugin
 */

namespace WordPressBlocksPlugin\Core;

/**
 * Settings class.
 */
class Settings {
    /**
     * Option group.
     *
     * @var string
     */
    private $option_group = 'wordpress_blocks_plugin_options';

    /**
     * Option name for Google Maps API key.
     *
     * @var string
     */
    private $google_maps_api_key_option = 'wordpress_blocks_plugin_google_maps_api_key';

    /**
     * Initialize settings.
     *
     * @return void
     */
    public function init() {
        add_action( 'admin_menu', [ $this, 'add_settings_page' ] );
        add_action( 'admin_init', [ $this, 'register_settings' ] );
    }

    /**
     * Add settings page to admin menu.
     *
     * @return void
     */
    public function add_settings_page() {
        add_options_page(
            __( 'WordPress Blocks Plugin Settings', 'wordpress-blocks-plugin' ),
            __( 'WP Blocks Plugin', 'wordpress-blocks-plugin' ),
            'manage_options',
            'wordpress-blocks-plugin-settings',
            [ $this, 'render_settings_page' ]
        );
    }

    /**
     * Register settings.
     *
     * @return void
     */
    public function register_settings() {
        register_setting(
            $this->option_group,
            $this->google_maps_api_key_option,
            [
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => '',
            ]
        );

        add_settings_section(
            'wordpress_blocks_plugin_google_maps_section',
            __( 'Google Maps Settings', 'wordpress-blocks-plugin' ),
            [ $this, 'render_google_maps_section' ],
            'wordpress-blocks-plugin-settings'
        );

        add_settings_field(
            'wordpress_blocks_plugin_google_maps_api_key',
            __( 'Google Maps API Key', 'wordpress-blocks-plugin' ),
            [ $this, 'render_google_maps_api_key_field' ],
            'wordpress-blocks-plugin-settings',
            'wordpress_blocks_plugin_google_maps_section'
        );
    }

    /**
     * Render settings page.
     *
     * @return void
     */
    public function render_settings_page() {
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }

        if ( isset( $_GET['settings-updated'] ) ) {
            add_settings_error(
                'wordpress_blocks_plugin_messages',
                'wordpress_blocks_plugin_message',
                __( 'Settings Saved', 'wordpress-blocks-plugin' ),
                'updated'
            );
        }

        settings_errors( 'wordpress_blocks_plugin_messages' );
        ?>
        <div class="wrap">
            <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields( $this->option_group );
                do_settings_sections( 'wordpress-blocks-plugin-settings' );
                submit_button( __( 'Save Settings', 'wordpress-blocks-plugin' ) );
                ?>
            </form>
        </div>
        <?php
    }

    /**
     * Render Google Maps section.
     *
     * @param array $args Section arguments.
     * @return void
     */
    public function render_google_maps_section( $args ) {
        ?>
        <p>
            <?php
            echo esc_html__(
                'Enter your Google Maps API key to enable the Google Maps block. If you don\'t have an API key, you can still use the block with an iframe embed code.',
                'wordpress-blocks-plugin'
            );
            ?>
        </p>
        <p>
            <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer">
                <?php esc_html_e( 'Get a Google Maps API Key', 'wordpress-blocks-plugin' ); ?>
            </a>
        </p>
        <?php
    }

    /**
     * Render Google Maps API key field.
     *
     * @param array $args Field arguments.
     * @return void
     */
    public function render_google_maps_api_key_field( $args ) {
        $api_key = get_option( $this->google_maps_api_key_option );
        ?>
        <input
            type="text"
            id="<?php echo esc_attr( $this->google_maps_api_key_option ); ?>"
            name="<?php echo esc_attr( $this->google_maps_api_key_option ); ?>"
            value="<?php echo esc_attr( $api_key ); ?>"
            class="regular-text"
        />
        <p class="description">
            <?php esc_html_e( 'Your Google Maps API key.', 'wordpress-blocks-plugin' ); ?>
        </p>
        <?php
    }
}
