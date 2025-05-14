"use client"

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n"
import { useBlockProps, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, TextControl, ToggleControl, RangeControl, SelectControl } from "@wordpress/components"

/**
 * Internal dependencies
 */
import "./editor.css"
import "./style.css"

/**
 * Block name
 */
export const name = "wordpress-blocks-plugin/youtube"

/**
 * Block settings
 */
export const settings = {
  apiVersion: 2,
  title: __("YouTube Video", "wordpress-blocks-plugin"),
  description: __("Embed a YouTube video with advanced options.", "wordpress-blocks-plugin"),
  category: "media",
  icon: "video-alt3",
  supports: {
    html: false,
    align: ["wide", "full"],
  },
  attributes: {
    videoId: {
      type: "string",
      default: "dQw4w9WgXcQ", // Rick Roll as default :)
    },
    title: {
      type: "string",
      default: "",
    },
    autoplay: {
      type: "boolean",
      default: false,
    },
    loop: {
      type: "boolean",
      default: false,
    },
    mute: {
      type: "boolean",
      default: false,
    },
    showControls: {
      type: "boolean",
      default: true,
    },
    showInfo: {
      type: "boolean",
      default: true,
    },
    aspectRatio: {
      type: "string",
      default: "16:9",
    },
    startTime: {
      type: "number",
      default: 0,
    },
    endTime: {
      type: "number",
      default: 0,
    },
    relatedVideos: {
      type: "boolean",
      default: true,
    },
  },

  /**
   * Edit function
   */
  edit: ({ attributes, setAttributes }) => {
    const {
      videoId,
      title,
      autoplay,
      loop,
      mute,
      showControls,
      showInfo,
      aspectRatio,
      startTime,
      endTime,
      relatedVideos,
    } = attributes

    const blockProps = useBlockProps({
      className: "wp-block-wordpress-blocks-plugin-youtube",
    })

    // Extract video ID from URL if needed
    const handleVideoIdChange = (value) => {
      let id = value

      // Check if it's a URL
      if (value.includes("youtube.com") || value.includes("youtu.be")) {
        // Extract ID from youtube.com/watch?v=ID
        const watchMatch = value.match(
          /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/,
        )
        if (watchMatch && watchMatch[1]) {
          id = watchMatch[1]
        }
      }

      setAttributes({ videoId: id })
    }

    // Calculate aspect ratio
    const getAspectRatioPadding = () => {
      if (aspectRatio === "16:9") {
        return "56.25%"
      } else if (aspectRatio === "4:3") {
        return "75%"
      } else if (aspectRatio === "1:1") {
        return "100%"
      }
      return "56.25%" // Default to 16:9
    }

    // Build embed URL with parameters
    const getEmbedUrl = () => {
      const url = `https://www.youtube.com/embed/${videoId}?`

      const params = []

      if (autoplay) params.push("autoplay=1")
      if (mute) params.push("mute=1")
      if (loop) params.push("loop=1")
      if (!showControls) params.push("controls=0")
      if (!showInfo) params.push("showinfo=0")
      if (startTime > 0) params.push(`start=${startTime}`)
      if (endTime > 0) params.push(`end=${endTime}`)
      if (!relatedVideos) params.push("rel=0")

      return url + params.join("&")
    }

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Video Settings", "wordpress-blocks-plugin")}>
            <TextControl
              label={__("YouTube Video URL or ID", "wordpress-blocks-plugin")}
              value={videoId}
              onChange={handleVideoIdChange}
              help={__("Enter a YouTube video URL or ID.", "wordpress-blocks-plugin")}
            />

            <TextControl
              label={__("Video Title (optional)", "wordpress-blocks-plugin")}
              value={title}
              onChange={(value) => setAttributes({ title: value })}
              help={__("Add a title for accessibility.", "wordpress-blocks-plugin")}
            />

            <SelectControl
              label={__("Aspect Ratio", "wordpress-blocks-plugin")}
              value={aspectRatio}
              options={[
                { label: "16:9", value: "16:9" },
                { label: "4:3", value: "4:3" },
                { label: "1:1", value: "1:1" },
              ]}
              onChange={(value) => setAttributes({ aspectRatio: value })}
            />

            <RangeControl
              label={__("Start Time (seconds)", "wordpress-blocks-plugin")}
              value={startTime}
              onChange={(value) => setAttributes({ startTime: value })}
              min={0}
              max={3600}
            />

            <RangeControl
              label={__("End Time (seconds, 0 = end)", "wordpress-blocks-plugin")}
              value={endTime}
              onChange={(value) => setAttributes({ endTime: value })}
              min={0}
              max={3600}
            />

            <ToggleControl
              label={__("Autoplay", "wordpress-blocks-plugin")}
              checked={autoplay}
              onChange={(value) => setAttributes({ autoplay: value })}
              help={__("Note: Autoplay requires mute to be enabled in most browsers.", "wordpress-blocks-plugin")}
            />

            <ToggleControl
              label={__("Mute", "wordpress-blocks-plugin")}
              checked={mute}
              onChange={(value) => setAttributes({ mute: value })}
            />

            <ToggleControl
              label={__("Loop", "wordpress-blocks-plugin")}
              checked={loop}
              onChange={(value) => setAttributes({ loop: value })}
            />

            <ToggleControl
              label={__("Show Controls", "wordpress-blocks-plugin")}
              checked={showControls}
              onChange={(value) => setAttributes({ showControls: value })}
            />

            <ToggleControl
              label={__("Show Video Info", "wordpress-blocks-plugin")}
              checked={showInfo}
              onChange={(value) => setAttributes({ showInfo: value })}
            />

            <ToggleControl
              label={__("Show Related Videos", "wordpress-blocks-plugin")}
              checked={relatedVideos}
              onChange={(value) => setAttributes({ relatedVideos: value })}
            />
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          {title && <h3 className="wp-block-wordpress-blocks-plugin-youtube-title">{title}</h3>}
          <div
            className="wp-block-wordpress-blocks-plugin-youtube-container"
            style={{ paddingBottom: getAspectRatioPadding() }}
          >
            <iframe
              src={getEmbedUrl()}
              title={title || __("YouTube Video", "wordpress-blocks-plugin")}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
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
      videoId,
      title,
      autoplay,
      loop,
      mute,
      showControls,
      showInfo,
      aspectRatio,
      startTime,
      endTime,
      relatedVideos,
    } = attributes

    const blockProps = useBlockProps.save({
      className: "wp-block-wordpress-blocks-plugin-youtube",
    })

    // Calculate aspect ratio
    const getAspectRatioPadding = () => {
      if (aspectRatio === "16:9") {
        return "56.25%"
      } else if (aspectRatio === "4:3") {
        return "75%"
      } else if (aspectRatio === "1:1") {
        return "100%"
      }
      return "56.25%" // Default to 16:9
    }

    // Build embed URL with parameters
    const getEmbedUrl = () => {
      const url = `https://www.youtube.com/embed/${videoId}?`

      const params = []

      if (autoplay) params.push("autoplay=1")
      if (mute) params.push("mute=1")
      if (loop) params.push("loop=1")
      if (!showControls) params.push("controls=0")
      if (!showInfo) params.push("showinfo=0")
      if (startTime > 0) params.push(`start=${startTime}`)
      if (endTime > 0) params.push(`end=${endTime}`)
      if (!relatedVideos) params.push("rel=0")

      return url + params.join("&")
    }

    return (
      <div {...blockProps}>
        {title && <h3 className="wp-block-wordpress-blocks-plugin-youtube-title">{title}</h3>}
        <div
          className="wp-block-wordpress-blocks-plugin-youtube-container"
          style={{ paddingBottom: getAspectRatioPadding() }}
        >
          <iframe
            src={getEmbedUrl()}
            title={title || __("YouTube Video", "wordpress-blocks-plugin")}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    )
  },
}
