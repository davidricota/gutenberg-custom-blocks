/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks"

// Mock registerBlockType
jest.mock("@wordpress/blocks", () => ({
  registerBlockType: jest.fn(),
}))

/**
 * Internal dependencies
 */
import * as ctaBlock from "../../src/js/blocks/cta"
import * as googleMapsBlock from "../../src/js/blocks/google-maps"
import * as youtubeBlock from "../../src/js/blocks/youtube"

describe("Block Registration", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  test("CTA Block registers correctly", () => {
    // Import the main index file which registers blocks
    require("../../src/js/index")

    // Check if registerBlockType was called with the correct block name
    expect(registerBlockType).toHaveBeenCalledWith(
      ctaBlock.name,
      expect.objectContaining({
        title: expect.any(String),
        category: expect.any(String),
        icon: expect.any(String),
      }),
    )
  })

  test("Google Maps Block registers correctly", () => {
    // Import the main index file which registers blocks
    require("../../src/js/index")

    // Check if registerBlockType was called with the correct block name
    expect(registerBlockType).toHaveBeenCalledWith(
      googleMapsBlock.name,
      expect.objectContaining({
        title: expect.any(String),
        category: expect.any(String),
        icon: expect.any(String),
      }),
    )
  })

  test("YouTube Block registers correctly", () => {
    // Import the main index file which registers blocks
    require("../../src/js/index")

    // Check if registerBlockType was called with the correct block name
    expect(registerBlockType).toHaveBeenCalledWith(
      youtubeBlock.name,
      expect.objectContaining({
        title: expect.any(String),
        category: expect.any(String),
        icon: expect.any(String),
      }),
    )
  })
})
