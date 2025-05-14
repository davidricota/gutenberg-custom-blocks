"use client"

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n"
import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, TextControl, RangeControl, ToggleControl, TextareaControl, TabPanel } from "@wordpress/components"

/**
 * Internal dependencies
 */
import "./editor.css"
import "./style.css"

/**
 * Block name
 */
export const name = "wordpress-blocks-plugin/google-maps"

/**
 * Block settings
 */
export const settings = {
  apiVersion: 2,
  title: __("Google Maps", "wordpress-blocks-plugin"),
  description: __("Add a Google Maps block to your content.", "wordpress-blocks-plugin"),
  category: "widgets",
  icon: "location-alt",
  supports: {
    html: false,
    align: ["wide", "full"],
  },
  attributes: {
    address: {
      type: "string",
      default: "New York, NY, USA",
    },
    latitude: {
      type: "string",
      default: "40.7128",
    },
    longitude: {
      type: "string",
      default: "-74.0060",
    },
    zoom: {
      type: "number",
      default: 12,
    },
    height: {
      type: "number",
      default: 400,
    },
    showMarker: {
      type: "boolean",
      default: true,
    },
    useAddress: {
      type: "boolean",
      default: true,
    },
    useIframe: {
      type: "boolean",
      default: false,
    },
    iframeCode: {
      type: "string",
      default: "",
    },
  },

  /**
   * Edit function
   */
  edit: ({ attributes, setAttributes }) => {
    const { address, latitude, longitude, zoom, height, showMarker, useAddress, useIframe, iframeCode } = attributes

    const blockProps = useBlockProps({
      className: "wp-block-wordpress-blocks-plugin-google-maps",
    })

    // Extract iframe src if available
    const getIframeSrc = () => {
      if (!iframeCode) return ""
      const match = iframeCode.match(/src="([^"]+)"/)
      return match ? match[1] : ""
    }

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Map Settings", "wordpress-blocks-plugin")}>
            <ToggleControl
              label={__("Use iframe Embed", "wordpress-blocks-plugin")}
              checked={useIframe}
              onChange={(value) => setAttributes({ useIframe: value })}
              help={
                useIframe
                  ? __("Using iframe embed code from Google Maps.", "wordpress-blocks-plugin")
                  : __("Using Google Maps API (requires API key in settings).", "wordpress-blocks-plugin")
              }
            />

            <TabPanel
              className="wp-block-wordpress-blocks-plugin-google-maps-tabs"
              activeClass="active-tab"
              tabs={[
                {
                  name: "api",
                  title: __("API", "wordpress-blocks-plugin"),
                  className: "api-tab",
                },
                {
                  name: "iframe",
                  title: __("iframe", "wordpress-blocks-plugin"),
                  className: "iframe-tab",
                },
              ]}
            >
              {(tab) => {
                if (tab.name === "api") {
                  return (
                    <>
                      <ToggleControl
                        label={__("Use Address", "wordpress-blocks-plugin")}
                        checked={useAddress}
                        onChange={(value) => setAttributes({ useAddress: value })}
                        help={
                          useAddress
                            ? __("Using address to determine map location.", "wordpress-blocks-plugin")
                            : __("Using coordinates to determine map location.", "wordpress-blocks-plugin")
                        }
                        disabled={useIframe}
                      />

                      {useAddress ? (
                        <TextControl
                          label={__("Address", "wordpress-blocks-plugin")}
                          value={address}
                          onChange={(value) => setAttributes({ address: value })}
                          help={__("Enter a location or address.", "wordpress-blocks-plugin")}
                          disabled={useIframe}
                        />
                      ) : (
                        <>
                          <TextControl
                            label={__("Latitude", "wordpress-blocks-plugin")}
                            value={latitude}
                            onChange={(value) => setAttributes({ latitude: value })}
                            disabled={useIframe}
                          />
                          <TextControl
                            label={__("Longitude", "wordpress-blocks-plugin")}
                            value={longitude}
                            onChange={(value) => setAttributes({ longitude: value })}
                            disabled={useIframe}
                          />
                        </>
                      )}

                      <RangeControl
                        label={__("Zoom Level", "wordpress-blocks-plugin")}
                        value={zoom}
                        onChange={(value) => setAttributes({ zoom: value })}
                        min={1}
                        max={20}
                        disabled={useIframe}
                      />

                      <ToggleControl
                        label={__("Show Marker", "wordpress-blocks-plugin")}
                        checked={showMarker}
                        onChange={(value) => setAttributes({ showMarker: value })}
                        disabled={useIframe}
                      />
                    </>
                  )
                } else if (tab.name === "iframe") {
                  return (
                    <>
                      <TextareaControl
                        label={__("iframe Embed Code", "wordpress-blocks-plugin")}
                        value={iframeCode}
                        onChange={(value) => setAttributes({ iframeCode: value })}
                        help={__("Paste the embed code from Google Maps.", "wordpress-blocks-plugin")}
                        rows={4}
                        disabled={!useIframe}
                      />
                      <p className="components-base-control__help">
                        {__("How to get the embed code:", "wordpress-blocks-plugin")}
                      </p>
                      <ol className="wp-block-wordpress-blocks-plugin-google-maps-instructions">
                        <li>{__("Go to Google Maps", "wordpress-blocks-plugin")}</li>
                        <li>{__("Search for a location", "wordpress-blocks-plugin")}</li>
                        <li>{__("Click 'Share'", "wordpress-blocks-plugin")}</li>
                        <li>{__("Select 'Embed a map'", "wordpress-blocks-plugin")}</li>
                        <li>{__("Copy the HTML code", "wordpress-blocks-plugin")}</li>
                      </ol>
                    </>
                  )
                }
              }}
            </TabPanel>

            <RangeControl
              label={__("Height", "wordpress-blocks-plugin")}
              value={height}
              onChange={(value) => setAttributes({ height: value })}
              min={200}
              max={800}
              step={10}
            />
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          {useIframe && iframeCode ? (
            <div
              className="wp-block-wordpress-blocks-plugin-google-maps-iframe-preview"
              style={{ height: `${height}px` }}
            >
              <div className="wp-block-wordpress-blocks-plugin-google-maps-iframe-overlay">
                <div className="wp-block-wordpress-blocks-plugin-google-maps-content">
                  <div className="dashicons dashicons-location-alt"></div>
                  <p>{__("Google Maps iframe Embed", "wordpress-blocks-plugin")}</p>
                  <p className="wp-block-wordpress-blocks-plugin-google-maps-iframe-src">
                    {getIframeSrc() || __("Invalid iframe code", "wordpress-blocks-plugin")}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="wp-block-wordpress-blocks-plugin-google-maps-placeholder" style={{ height: `${height}px` }}>
              <div className="wp-block-wordpress-blocks-plugin-google-maps-overlay">
                <div className="wp-block-wordpress-blocks-plugin-google-maps-content">
                  <div className="dashicons dashicons-location-alt"></div>
                  <p>
                    {useAddress
                      ? __("Google Maps: ", "wordpress-blocks-plugin") + address
                      : __("Google Maps: ", "wordpress-blocks-plugin") + `${latitude}, ${longitude}`}
                  </p>
                  <p className="wp-block-wordpress-blocks-plugin-google-maps-zoom">
                    {__("Zoom: ", "wordpress-blocks-plugin") + zoom}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    )
  },

  /**
   * Save function
   */
  save: ({ attributes }) => {
    const { address, latitude, longitude, zoom, height, showMarker, useAddress, useIframe, iframeCode } = attributes

    const blockProps = useBlockProps.save({
      className: "wp-block-wordpress-blocks-plugin-google-maps",
    })

    // We're using server-side rendering, so we just need to save the attributes
    const dataAttributes = {
      "data-address": useAddress ? address : "",
      "data-latitude": latitude,
      "data-longitude": longitude,
      "data-zoom": zoom,
      "data-show-marker": showMarker ? "true" : "false",
      "data-use-address": useAddress ? "true" : "false",
      "data-use-iframe": useIframe ? "true" : "false",
      "data-iframe-code": useIframe ? iframeCode : "",
      "data-height": height,
    }

    return (
      <div {...blockProps}>
        <div
          className="wp-block-wordpress-blocks-plugin-google-maps-container"
          style={{ height: `${height}px` }}
          {...dataAttributes}
        >
          <div className="wp-block-wordpress-blocks-plugin-google-maps-loading">
            {__("Loading map...", "wordpress-blocks-plugin")}
          </div>
        </div>
      </div>
    )
  },
}
