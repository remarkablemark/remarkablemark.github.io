---
layout: post
title: Transcribe audio to text
date: 2020-08-24 21:41:26
excerpt: Convert audio to text using Python SpeechRecognition or JavaScript Web Speech API.
categories: python javascript web speech audio text api
---

## Python

Make sure you have [Python](https://www.python.org/downloads/) installed:

```sh
$ python --version
```

> Python version 3 is recommended.

Install [`SpeechRecognition`](https://pypi.org/project/SpeechRecognition/) module:

```sh
$ pip install SpeechRecognition
```

Create script `audio-to-text.py` that transcribes audio file `Hello World.wav` to text:

```py
import speech_recognition as sr

r = sr.Recognizer()

with sr.AudioFile('Hello World.wav') as source:
    audio = r.listen(source)

text = r.recognize_google(audio)
print(text)
```

Run script:

```sh
$ python audio-to-text.py
hello world
```

### Library

[SpeechRecognition](https://pypi.org/project/SpeechRecognition/) supports the following engines/API's:

- `recognize_sphinx` (works offline)
- `recognize_google`
- `recognize_wit`
- `recognize_bing`
- `recognize_api`
- `recognize_houndify`
- `recognize_ibm`

| Pros     | Cons                                                          |
| -------- | ------------------------------------------------------------- |
| Free     | API exceptions (network timeout, file too big, rate limiting) |
| Accurate | Transcript does not include punctuation marks and can be off  |

See [guide](https://realpython.com/python-speech-recognition/) for more details.

### Demo

[Repl.it](https://repl.it/@remarkablemark/Speech-Recognition):

<iframe height="500px" width="100%" src="https://repl.it/@remarkablemark/Speech-Recognition?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Web

If you can [input audio to your microphone](https://rogueamoeba.com/loopback/), you can use the [JavaScript Web Speech API](https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API):

<iframe height="400px" width="100%" src="https://www.google.com/intl/en/chrome/demos/speech.html" scrolling="no" frameborder="no" allow="microphone"></iframe>
