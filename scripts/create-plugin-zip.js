const fs = require("fs")
const path = require("path")
const archiver = require("archiver")
const { rimraf } = require("rimraf")

// Plugin name
const PLUGIN_NAME = "wordpress-blocks-plugin"

// Paths
const ROOT_DIR = path.resolve(__dirname, "..")
const BUILD_DIR = path.resolve(ROOT_DIR, "build")
const DIST_DIR = path.resolve(ROOT_DIR, "dist")
const PLUGIN_ZIP = path.resolve(DIST_DIR, `${PLUGIN_NAME}.zip`)

// Files and directories to include in the zip
const INCLUDE_FILES = ["wordpress-blocks-plugin.php", "build", "src", "languages", "vendor", "README.md", "LICENSE"]

// Create dist directory if it doesn't exist
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true })
}

// Delete existing zip file if it exists
if (fs.existsSync(PLUGIN_ZIP)) {
  fs.unlinkSync(PLUGIN_ZIP)
}

// Create a file to stream archive data to
const output = fs.createWriteStream(PLUGIN_ZIP)
const archive = archiver("zip", {
  zlib: { level: 9 }, // Compression level
})

// Listen for all archive data to be written
output.on("close", () => {
  console.log(`Plugin zip created: ${PLUGIN_ZIP}`)
  console.log(`Total size: ${archive.pointer()} bytes`)
})

// Handle warnings and errors
archive.on("warning", (err) => {
  if (err.code === "ENOENT") {
    console.warn(err)
  } else {
    throw err
  }
})

archive.on("error", (err) => {
  throw err
})

// Pipe archive data to the file
archive.pipe(output)

// Add files and directories to the archive
INCLUDE_FILES.forEach((file) => {
  const filePath = path.resolve(ROOT_DIR, file)

  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      archive.directory(filePath, file)
    } else {
      archive.file(filePath, { name: file })
    }
  }
})

// Finalize the archive
archive.finalize()
