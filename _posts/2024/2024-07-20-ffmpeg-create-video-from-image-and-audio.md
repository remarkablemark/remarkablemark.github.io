---
layout: post
title: ffmpeg create video from image and audio
date: 2024-07-20 14:09:53
excerpt: How to create a video from an image and audio with ffmpeg.
categories: video ffmpeg
---

Create a video from an image and audio with [ffmpeg](https://ffmpeg.org/):

```sh
ffmpeg -loop 1 -i <your_image.jpg> -i <your_audio.wav> -c:v libx264 -tune stillimage -c:a aac -b:a 192k -pix_fmt yuv420p -shortest <your_video.mp4>
```

- Replace `<your_image.jpg>` with the path of your image file
- Replace `<your_audio.wav>` with the path of your audio file
- Replace `<your_video.mp4>` with the path of your output video file
