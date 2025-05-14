<?php
/**
 * Google Maps Block class.
 *
 * @package WordPressBlocksPlugin
 */

namespace WordPressBlocksPlugin\Blocks;

/**
 * GoogleMapsBlock class.
 */
class GoogleMapsBlock {
    /**
     * Block name.
     *
     * @var string
     */
    private $name = 'wordpress-blocks-plugin/google-maps';

    /**
     * Register the block.
     *
     * @return void
     */
    public function register() {
        register_block_type(
            'wordpress-blocks-plugin/google-maps',
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
        // Check if using iframe embed
        if ( ! empty( $attributes['useIframe'] ) && ! empty( $attributes['iframeCode'] ) ) {
            return $this->render_iframe( $attributes );
        }

        // Get API key from settings
        $api_key = get_option( 'wordpress_blocks_plugin_google_maps_api_key', '' );
        
        // If no API key and not using iframe, return a message for admins
        if ( empty( $api_key ) && current_user_can( 'manage_options' ) ) {
            return $this->render_api_key_notice();
        }

        // If we have an API key, render the map
        if ( ! empty( $api_key ) ) {
            return $this->render_map( $attributes, $api_key );
        }

        // Fallback to the default content
        return $content;
    }

    /**
     * Render the map using Google Maps API.
     *
     * @param array  $attributes Block attributes.
     * @param string $api_key    Google Maps API key.
     * @return string Rendered map.
     */
    private function render_map( $attributes, $api_key ) {
        $address = ! empty( $attributes['address'] ) ? $attributes['address'] : 'New York, NY, USA';
        $zoom = ! empty( $attributes['zoom'] ) ? $attributes['zoom'] : 12;
        $height = ! empty( $attributes['height'] ) ? $attributes['height'] : 400;
        $show_marker = isset( $attributes['showMarker'] ) ? $attributes['showMarker'] : true;
        $use_address = isset( $attributes['useAddress'] ) ? $attributes['useAddress'] : true;

        $latitude = $longitude = '';

        if ( $use_address ) {
    $url = add_query_arg([
        'address' => $address,
        'key'     => $api_key,
    ], 'https://maps.googleapis.com/maps/api/geocode/json');

    $response = wp_remote_get( $url );

    if ( is_wp_error( $response ) ) {
        return '<div class="wp-block-wordpress-blocks-plugin-google-maps-error"><p>' .
            esc_html__( 'Error retrieving location data.', 'wordpress-blocks-plugin' ) .
            '</p></div>';
    }

    $data = json_decode( wp_remote_retrieve_body( $response ), true );

    if (
        json_last_error() !== JSON_ERROR_NONE ||
        ! is_array( $data ) ||
        $data['status'] !== 'OK' ||
        empty( $data['results'][0]['geometry']['location'] )
    ) {
        return '<div class="wp-block-wordpress-blocks-plugin-google-maps-error"><p>' .
            esc_html__( 'Invalid address. Please check your address input: ', 'wordpress-blocks-plugin' ) .
            esc_html( $address ) .
            '</p></div>';
    }

    $latitude  = $data['results'][0]['geometry']['location']['lat'];
    $longitude = $data['results'][0]['geometry']['location']['lng'];
} else {
    $latitude  = $attributes['latitude'] ?? '40.7128';
    $longitude = $attributes['longitude'] ?? '-74.0060';
}

        // Generate a unique ID for this map
        $map_id = 'wp-block-wordpress-blocks-plugin-google-maps-' . uniqid();

        // Enqueue Google Maps API
        wp_enqueue_script(
            'google-maps-api',
            'https://maps.googleapis.com/maps/api/js?key=' . esc_attr( $api_key ) . '&callback=initMap',
            [],
            null,
            true
        );

        add_filter('script_loader_tag', function ($tag, $handle) {
            if ('google-maps-api' === $handle) {
                return str_replace('src=', 'async defer src=', $tag);
            }
            return $tag;
        }, 10, 2);

        // Add inline script to initialize the map
        $script = "
            function initMap() {
                var mapElement = document.getElementById('" . esc_js( $map_id ) . "');
                if (!mapElement) return;

                var mapOptions = {
                    zoom: " . esc_js( $zoom ) . ",
                    center: { lat: " . esc_js( $latitude ) . ", lng: " . esc_js( $longitude ) . " },
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: false
                };

                var map = new google.maps.Map(mapElement, mapOptions);

                " . ( $show_marker ? "
                var marker = new google.maps.Marker({
                    position: { lat: " . esc_js( $latitude ) . ", lng: " . esc_js( $longitude ) . " },
                    map: map
                });" : "" ) . "

                " . ( $use_address ? "
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'address': '" . esc_js( $address ) . "' }, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK && results[0]) {
                        map.setCenter(results[0].geometry.location);
                        " . ( $show_marker ? "
                        marker.setPosition(results[0].geometry.location);" : "" ) . "
                    }
                });" : "" ) . "
            }
        ";

        wp_add_inline_script( 'google-maps-api', $script );

        // Return the map container
        return sprintf(
            '<div class="wp-block-wordpress-blocks-plugin-google-maps">
                <div id="%s" class="wp-block-wordpress-blocks-plugin-google-maps-container" style="height: %dpx;"></div>
            </div>',
            esc_attr( $map_id ),
            esc_attr( $height )
        );

        wp_add_inline_script( 'google-maps-api', $script );

        // Return the map container
        return sprintf(
            '<div class="wp-block-wordpress-blocks-plugin-google-maps">
                <div id="%s" class="wp-block-wordpress-blocks-plugin-google-maps-container" style="height: %dpx;"></div>
            </div>',
            esc_attr( $map_id ),
            esc_attr( $height )
        );
    }

    /**
     * Render the iframe embed.
     *
     * @param array $attributes Block attributes.
     * @return string Rendered iframe.
     */
    private function render_iframe( $attributes ) {
        $iframe_code = ! empty( $attributes['iframeCode'] ) ? $attributes['iframeCode'] : '';
        $height = ! empty( $attributes['height'] ) ? $attributes['height'] : 400;

        // Basic sanitization - extract src attribute
        $src = '';
        if ( preg_match( '/src="([^"]+)"/', $iframe_code, $matches ) ) {
            $src = $matches[1];
        }

        if ( empty( $src ) ) {
            return '<div class="wp-block-wordpress-blocks-plugin-google-maps-error">
                <p>' . __( 'Invalid iframe code. Please check your embed code.', 'wordpress-blocks-plugin' ) . '</p>
            </div>';
        }

        // Return a sanitized iframe
        return sprintf(
            '<div class="wp-block-wordpress-blocks-plugin-google-maps">
                <div class="wp-block-wordpress-blocks-plugin-google-maps-iframe-container" style="height: %dpx;">
                    <iframe 
                        src="%s" 
                        width="100%%" 
                        height="100%%" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>',
            esc_attr( $height ),
            esc_url( $src )
        );
    }

    /**
     * Render API key notice for admins.
     *
     * @return string Notice HTML.
     */
    private function render_api_key_notice() {
        return '<div class="wp-block-wordpress-blocks-plugin-google-maps-error">
            <p>' . __( 'Please set a Google Maps API key in the plugin settings or use an iframe embed code.', 'wordpress-blocks-plugin' ) . '</p>
            <p><a href="' . esc_url( admin_url( 'options-general.php?page=wordpress-blocks-plugin-settings' ) ) . '">' . 
                __( 'Go to Settings', 'wordpress-blocks-plugin' ) . 
            '</a></p>
        </div>';
    }
}
