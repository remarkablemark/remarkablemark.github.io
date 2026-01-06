---
layout: post
title: Transcribe Speech to Text
date: 2020-08-24 21:41:26
updated: 2020-11-05 21:32:48
excerpt: How to transcribe speech to text using Python's SpeechRecognition library or the JavaScript Web Speech API.
categories: python javascript web speech text
---

Transcribe speech to text with Python or the Web Speech API:

- [Python](#python)
- [Web Speech API](#web-speech-api)

## Python

Make sure you have [Python](https://www.python.org/downloads/) installed:

```sh
python --version
```

> Python version 3 is recommended.

Install [`SpeechRecognition`](https://pypi.org/project/SpeechRecognition/) module:

```sh
pip install SpeechRecognition
```

Create script `speech_to_text.py` that transcribes audio file `Hello World.wav` to text:

```py
# speech_to_text.py
import speech_recognition as sr

r = sr.Recognizer()
filename = "Hello World.wav"

with sr.AudioFile(filename) as source:
    audio = r.listen(source)

text = r.recognize_google(audio)
print(text)
```

Run script:

```sh
python speech_to_text.py # hello world
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

| Pros            | Cons                                                                 |
| --------------- | -------------------------------------------------------------------- |
| Free            | API limitations (e.g., network timeout, file too big, rate limiting) |
| Fairly accurate | Transcript can be off                                                |
|                 | No punctuation marks                                                 |

See [guide](https://realpython.com/python-speech-recognition/) for more details.

### Demo

[Repl.it](https://replit.com/@remarkablemark/Speech-Recognition):

<iframe height="550px" width="100%" src="https://replit.com/@remarkablemark/Speech-Recognition?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

See [GitHub repository](https://github.com/remarkablemark/speech-recognition-demo) for more details.

## Web Speech API

If [audio input can be directed to your microphone](https://www.vb-audio.com/Cable/), then you can use the [JavaScript Web Speech API](https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API):

<iframe height="400px" width="100%" src="https://www.google.com/intl/en/chrome/demos/speech.html" scrolling="no" frameborder="no" allow="microphone"></iframe>

See [Web Speech API Demonstration](https://www.google.com/intl/en/chrome/demos/speech.html).
