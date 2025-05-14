/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks"

/**
 * Import Tailwind CSS
 */
import './tailwind.css';

/**
 * Internal dependencies
 */
import * as ctaBlock from "./blocks/cta"
import * as googleMapsBlock from "./blocks/google-maps"
import * as youtubeBlock from "./blocks/youtube"

/**
 * Register all blocks
 */
const blocks = [ctaBlock, googleMapsBlock, youtubeBlock]

/**
 * Register each block
 */
blocks.forEach((block) => {
  const { name, settings } = block
  registerBlockType(name, settings)
})
