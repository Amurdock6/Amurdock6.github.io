# Alex Murdock’s portfolio

Static HTML/CSS/JavaScript portfolio for alexanderrmurdock.com. No build step or package installation is required.

## Local preview

From this directory:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. The existing fonts, Bootstrap, animation libraries, and StyleStreak videos load from external hosts.

To preview on a phone connected to the same Wi-Fi/LAN, stop the server with Ctrl+C and run:

```sh
python -m http.server 8000 --bind 0.0.0.0
```

Open `http://<computer-LAN-IP>:8000` on the phone. Find the computer’s LAN address with `ip -4 route get 1.1.1.1` (the address after `src`). `localhost` on the phone refers to the phone itself.

## Content workflow

See [AGENTS.md](AGENTS.md). Alex chooses topics and writes first drafts. Generated edits need explicit review before being added to the website.

## Website

The existing homepage, project pages, biography, contact page, and blog were restored to their pre-session content. The blog contains the original Raspberry Pi / 350Z post. The original minimalist homepage, image-driven project boxes, StyleStreak highlight, and typewriter effect are preserved.
