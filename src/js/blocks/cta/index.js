"use client"

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n"
import { useBlockProps, RichText, InspectorControls, ColorPalette } from "@wordpress/block-editor"
import { PanelBody, SelectControl, TextControl } from "@wordpress/components"

/**
 * Internal dependencies
 */
import "./editor.css"
import "./style.css"

/**
 * Block name
 */
export const name = "wordpress-blocks-plugin/cta"

/**
 * Block settings
 */
export const settings = {
  apiVersion: 2,
  title: __("Call to Action", "wordpress-blocks-plugin"),
  description: __("Add a customizable call to action button.", "wordpress-blocks-plugin"),
  category: "widgets",
  icon: "megaphone",
  supports: {
    html: false,
    align: ["wide", "full"],
  },
  attributes: {
    title: {
      type: "string",
      default: __("Call to Action", "wordpress-blocks-plugin"),
    },
    description: {
      type: "string",
      default: __("This is a call to action block. Click the button below!", "wordpress-blocks-plugin"),
    },
    buttonText: {
      type: "string",
      default: __("Click Here", "wordpress-blocks-plugin"),
    },
    buttonUrl: {
      type: "string",
      default: "#",
    },
    backgroundColor: {
      type: "string",
      default: "#f8f9fa",
    },
    textColor: {
      type: "string",
      default: "#212529",
    },
    buttonColor: {
      type: "string",
      default: "#0d6efd",
    },
    buttonTextColor: {
      type: "string",
      default: "#ffffff",
    },
    alignment: {
      type: "string",
      default: "center",
    },
  },

  /**
   * Edit function
   */
  edit: ({ attributes, setAttributes }) => {
    const {
      title,
      description,
      buttonText,
      buttonUrl,
      backgroundColor,
      textColor,
      buttonColor,
      buttonTextColor,
      alignment,
    } = attributes

    const blockProps = useBlockProps({
      className: `wp-block-wordpress-blocks-plugin-cta text-${alignment}`,
      style: {
        backgroundColor,
        color: textColor,
      },
    })

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("CTA Settings", "wordpress-blocks-plugin")}>
            <SelectControl
              label={__("Alignment", "wordpress-blocks-plugin")}
              value={alignment}
              options={[
                { label: __("Left", "wordpress-blocks-plugin"), value: "left" },
                { label: __("Center", "wordpress-blocks-plugin"), value: "center" },
                { label: __("Right", "wordpress-blocks-plugin"), value: "right" },
              ]}
              onChange={(value) => setAttributes({ alignment: value })}
            />

            <TextControl
              label={__("Button URL", "wordpress-blocks-plugin")}
              value={buttonUrl}
              onChange={(value) => setAttributes({ buttonUrl: value })}
            />

            <div className="wp-block-wordpress-blocks-plugin-cta-color-settings">
              <p>{__("Background Color", "wordpress-blocks-plugin")}</p>
              <ColorPalette value={backgroundColor} onChange={(value) => setAttributes({ backgroundColor: value })} />

              <p>{__("Text Color", "wordpress-blocks-plugin")}</p>
              <ColorPalette value={textColor} onChange={(value) => setAttributes({ textColor: value })} />

              <p>{__("Button Color", "wordpress-blocks-plugin")}</p>
              <ColorPalette value={buttonColor} onChange={(value) => setAttributes({ buttonColor: value })} />

              <p>{__("Button Text Color", "wordpress-blocks-plugin")}</p>
              <ColorPalette value={buttonTextColor} onChange={(value) => setAttributes({ buttonTextColor: value })} />
            </div>
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          <div className="wp-block-wordpress-blocks-plugin-cta-container">
            <RichText
              tagName="h2"
              className="wp-block-wordpress-blocks-plugin-cta-title"
              value={title}
              onChange={(value) => setAttributes({ title: value })}
              placeholder={__("Enter title...", "wordpress-blocks-plugin")}
            />

            <RichText
              tagName="p"
              className="wp-block-wordpress-blocks-plugin-cta-description"
              value={description}
              onChange={(value) => setAttributes({ description: value })}
              placeholder={__("Enter description...", "wordpress-blocks-plugin")}
            />

            <div className="wp-block-wordpress-blocks-plugin-cta-button-container">
              <RichText
                tagName="a"
                className="wp-block-wordpress-blocks-plugin-cta-button"
                value={buttonText}
                onChange={(value) => setAttributes({ buttonText: value })}
                placeholder={__("Button text...", "wordpress-blocks-plugin")}
                style={{
                  backgroundColor: buttonColor,
                  color: buttonTextColor,
                }}
              />
            </div>
          </div>
        </div>
      </>
    )
  },

  /**
   * Save function
   */
  save: ({ attributes }) => {
    const {
      title,
      description,
      buttonText,
      buttonUrl,
      backgroundColor,
      textColor,
      buttonColor,
      buttonTextColor,
      alignment,
    } = attributes

    const blockProps = useBlockProps.save({
      className: `wp-block-wordpress-blocks-plugin-cta text-${alignment}`,
      style: {
        backgroundColor,
        color: textColor,
      },
    })

    return (
      <div {...blockProps}>
        <div className="wp-block-wordpress-blocks-plugin-cta-container">
          <h2 className="wp-block-wordpress-blocks-plugin-cta-title">{title}</h2>
          <p className="wp-block-wordpress-blocks-plugin-cta-description">{description}</p>
          <div className="wp-block-wordpress-blocks-plugin-cta-button-container">
            <a
              href={buttonUrl}
              className="wp-block-wordpress-blocks-plugin-cta-button"
              style={{
                backgroundColor: buttonColor,
                color: buttonTextColor,
              }}
              rel="noopener noreferrer"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    )
  },
}
