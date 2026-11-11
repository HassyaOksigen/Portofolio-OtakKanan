import fs from 'fs'
import zlib from 'zlib'

// CRC32 table
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
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6 // RGBA
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0
  const ihdrChunk = createChunk('IHDR', ihdr)

  const stride = 1 + width * 4
  const rawData = Buffer.alloc(height * stride)

  for (let y = 0; y < height; y++) {
    const rowOffset = y * stride
    rawData[rowOffset] = 0
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

// Generate stylish cursive signature path
const width = 600
const height = 300

// Define key points of cursive "Hassya 05"
const strokePoints = [
  // H initial loop & stem
  { x: 80, y: 180 }, { x: 100, y: 70 }, { x: 115, y: 60 }, { x: 125, y: 75 },
  { x: 120, y: 220 }, { x: 110, y: 250 }, { x: 95, y: 240 }, { x: 90, y: 210 },
  // H cross & second stem
  { x: 140, y: 130 }, { x: 175, y: 120 }, { x: 190, y: 70 }, { x: 200, y: 220 },
  // a
  { x: 220, y: 170 }, { x: 240, y: 150 }, { x: 260, y: 170 }, { x: 255, y: 200 },
  { x: 235, y: 205 }, { x: 225, y: 180 }, { x: 265, y: 160 }, { x: 270, y: 205 },
  // ss
  { x: 285, y: 160 }, { x: 305, y: 150 }, { x: 300, y: 180 }, { x: 315, y: 205 },
  { x: 330, y: 155 }, { x: 345, y: 150 }, { x: 340, y: 180 }, { x: 355, y: 205 },
  // y flourish
  { x: 375, y: 160 }, { x: 390, y: 195 }, { x: 405, y: 160 }, { x: 410, y: 220 },
  { x: 405, y: 270 }, { x: 380, y: 280 }, { x: 350, y: 250 }, { x: 430, y: 200 },
  // a & underline flourish
  { x: 450, y: 165 }, { x: 470, y: 150 }, { x: 480, y: 175 }, { x: 475, y: 200 },
  { x: 490, y: 200 }, { x: 530, y: 140 }, { x: 550, y: 190 },
  // Underline swoop
  { x: 80, y: 265 }, { x: 250, y: 270 }, { x: 420, y: 265 }, { x: 540, y: 240 }
]

function distToSegment(p, v, w) {
  const l2 = (w.x - v.x) ** 2 + (w.y - v.y) ** 2
  if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y)
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2
  t = Math.max(0, Math.min(1, t))
  return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)))
}

function minDistanceToSignature(x, y) {
  let minDist = 9999
  for (let i = 0; i < strokePoints.length - 1; i++) {
    const d = distToSegment({ x, y }, strokePoints[i], strokePoints[i + 1])
    if (d < minDist) minDist = d
  }
  return minDist
}

const pngBuffer = createPng(width, height, (x, y) => {
  const d = minDistanceToSignature(x, y)
  const strokeRadius = 2.4

  if (d <= strokeRadius) {
    // Solid neon green
    return [0, 255, 157, 255]
  } else if (d <= strokeRadius + 4.0) {
    // Glowing neon green feather
    const alpha = Math.floor((1 - (d - strokeRadius) / 4.0) * 190)
    return [0, 255, 157, alpha]
  }

  return [0, 0, 0, 0]
})

fs.writeFileSync('public/signature.png', pngBuffer)
console.log('Successfully generated public/signature.png (' + (pngBuffer.length / 1024).toFixed(1) + ' KB)')
