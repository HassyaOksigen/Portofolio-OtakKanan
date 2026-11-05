import fs from 'fs'
import zlib from 'zlib'

// CRC32 table for PNG chunk checksums
const crcTable = []
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1)
    else c = c >>> 1
  }
  crcTable[n] = c >>> 0
}

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}

function createChunk(type, data) {
  const len = data.length
  const buf = Buffer.alloc(4 + 4 + len + 4)
  buf.writeUInt32BE(len, 0)
  buf.write(type, 4, 4, 'ascii')
  data.copy(buf, 8)
  const checksum = crc32(buf.subarray(4, 8 + len))
  buf.writeUInt32BE(checksum, 8 + len)
  return buf
}

function createPng(width, height, renderPixel) {
  // 8-byte PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  // IHDR chunk
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type (RGBA)
  ihdr[10] = 0 // compression
  ihdr[11] = 0 // filter
  ihdr[12] = 0 // interlace
  const ihdrChunk = createChunk('IHDR', ihdr)

  // Scanlines with filter byte 0 (None)
  const stride = 1 + width * 4
  const rawData = Buffer.alloc(height * stride)

  for (let y = 0; y < height; y++) {
    const rowOffset = y * stride
    rawData[rowOffset] = 0 // Filter None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4
      const [r, g, b, a] = renderPixel(x, y, width, height)
      rawData[pxOffset] = r
      rawData[pxOffset + 1] = g
      rawData[pxOffset + 2] = b
      rawData[pxOffset + 3] = a
    }
  }

  const compressedData = zlib.deflateSync(rawData, { level: 9 })
  const idatChunk = createChunk('IDAT', compressedData)
  const iendChunk = createChunk('IEND', Buffer.alloc(0))

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk])
}

// Generate an ultra-stylish stylized portrait silhouette (like high-fashion editorial cutout)
const width = 720
const height = 960

const pngBuffer = createPng(width, height, (x, y, w, h) => {
  const nx = (x - w / 2) / (w / 2) // -1 to 1
  const ny = y / h // 0 to 1

  // Head center at (0, 0.28)
  const headDist = Math.hypot(nx * 1.05, (ny - 0.28) * 2.2)
  
  // Shoulders and torso curve
  const shoulderY = 0.46
  let torsoAlpha = 0
  if (ny > shoulderY) {
    const torsoWidth = 0.28 + (ny - shoulderY) * 1.15
    if (Math.abs(nx) < torsoWidth) {
      torsoAlpha = 1
    }
  }

  // Neck
  let neckAlpha = 0
  if (ny >= 0.36 && ny <= 0.48 && Math.abs(nx) < 0.14) {
    neckAlpha = 1
  }

  // Head silhouette
  const headAlpha = headDist < 0.22 ? 1 : 0

  // Combine
  let isInside = headAlpha || neckAlpha || torsoAlpha

  if (!isInside) {
    return [0, 0, 0, 0] // Transparent background
  }

  // Stylized editorial shading: dark charcoal with subtle rim lighting
  const rimLight = Math.max(0, 1 - Math.abs(nx) * 1.5)
  const verticalGrad = ny // darker at bottom, slightly highlighted at top

  // Dark obsidian/graphite outfit
  let r = 24 + Math.floor(rimLight * 20) + Math.floor((1 - verticalGrad) * 18)
  let g = 26 + Math.floor(rimLight * 20) + Math.floor((1 - verticalGrad) * 18)
  let b = 30 + Math.floor(rimLight * 25) + Math.floor((1 - verticalGrad) * 20)
  let a = 255

  // Subtle acid neon rim accent on the left shoulder/edge (Lando Norris electric neon detail!)
  if (nx < -0.15 && Math.abs(nx + 0.15) > 0.1 && ny > 0.42 && ny < 0.75) {
    if (Math.abs(nx) > (0.28 + (ny - shoulderY) * 1.15) - 0.03) {
      // Neon edge
      r = 212
      g = 255
      b = 0
    }
  }

  return [r, g, b, a]
})

fs.writeFileSync('public/profile.png', pngBuffer)
console.log('Successfully generated public/profile.png (' + (pngBuffer.length / 1024).toFixed(1) + ' KB)')
