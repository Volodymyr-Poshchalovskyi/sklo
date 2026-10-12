#!/usr/bin/env bash
# Two quality tiers plus a poster frame for every large video.
#
#   public/assets/gallery/animation/001.mp4
#   → 001-hd.mp4   long edge 1920, H.264, CRF 22, ≤ 6 Mbit/s
#   → 001-sd.mp4   long edge 1280, H.264, CRF 26, ≤ 2 Mbit/s   (phones, slow links)
#   → 001-poster.webp  first displayed frame, 1280 wide
#
# `src/lib/media.js` picks the tier in the browser from the connection and the
# viewport. The unsuffixed source is deleted afterwards; the masters stay in
# "images for gallery/". Service tiles (< 1 MB loops) are left alone.
#
# Usage: scripts/media/encode-video-variants.sh [--keep-originals]
set -euo pipefail
export LD_LIBRARY_PATH=/usr/lib64   # Fedora: ffmpeg-libs over the stale libavcodec-freeworld
KEEP=${1:-}

# path:start-seconds — the start matches `start:` in galleryData so the
# poster is not a black fade-in frame.
VIDEOS=(
  "public/assets/gallery/animation/001.mp4:1.2"
  "public/assets/gallery/animation/002.mp4:0"
  "public/assets/gallery/animation/003.mp4:1.4"
  "public/assets/gallery/animation/004.mp4:0"
  "public/assets/gallery/animation/005.mp4:0"
  "public/assets/gallery/animation/006.mp4:0"
  "public/assets/gallery/cinemagraph/001.mp4:0"
  "public/assets/gallery/cinemagraph/002.mp4:0"
  "public/assets/gallery/cinemagraph/003.mp4:0"
  "public/assets/gallery/cinemagraph/004.mp4:0"
  "public/assets/gallery/cinemagraph/005.mp4:0"
  "public/assets/gallery/cinemagraph/006.mp4:0"
  "public/assets/gallery/cinemagraph/007.mp4:0"
  "public/assets/gallery/cinemagraph/008.mp4:0"
  "public/assets/gallery/cinemagraph/009.mp4:0"
  "public/assets/gallery/cinemagraph/010.mp4:0"
  "public/assets/gallery/cinemagraph/011.mp4:0"
  "public/assets/gallery/cinemagraph/012.mp4:0"
  "public/assets/home/faqsection.mp4:0"
  "public/assets/home/hero_video.webm:0"
)

encode() { # in out long-edge crf maxrate
  local in=$1 out=$2 edge=$3 crf=$4 rate=$5
  [ -f "$out" ] && { echo "skip $out"; return; }
  # scale the long edge to $edge, never upscale, keep even dimensions
  local vf="scale='if(gt(iw,ih),min($edge,iw),-2)':'if(gt(iw,ih),-2,min($edge,ih))'"
  ffmpeg -v error -y -i "$in" -vf "$vf" -c:v libx264 -preset medium -crf "$crf" \
    -maxrate "$rate" -bufsize "$((${rate%M} * 2))M" -pix_fmt yuv420p -movflags +faststart \
    -c:a aac -b:a 128k "$out"
  echo "made $out ($(du -k "$out" | cut -f1)K)"
}

for entry in "${VIDEOS[@]}"; do
  in=${entry%%:*}; start=${entry##*:}
  [ -f "$in" ] || { echo "missing $in"; continue; }
  base=${in%.*}
  encode "$in" "$base-hd.mp4" 1920 22 6M
  encode "$in" "$base-sd.mp4" 1280 26 2M
  if [ ! -f "$base-poster.webp" ]; then
    ffmpeg -v error -y -ss "$start" -i "$in" -frames:v 1 -vf "scale=1280:-2" -c:v libwebp -q:v 78 "$base-poster.webp"
    echo "made $base-poster.webp"
  fi
  [ "$KEEP" = "--keep-originals" ] || rm -f "$in"
done
echo done
