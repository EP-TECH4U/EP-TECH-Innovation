# EP TECH Innovation

**Learn. Build. Grow.**

The official landing page for **EP TECH Innovation** — a growing community of 175+ tech learners sharing resources, scholarships, and real guidance for people serious about building a career in tech.

🔗 **Live site:** _add your deployed URL here_
📱 **Join the community:** [WhatsApp](https://whatsapp.com/channel/0029Vb7wtv5LdQeUi5zDGq3u) · [Discord](https://discord.gg/gscFNUKcc)

---

## About

EP TECH Innovation started as a small WhatsApp group and grew into a 175+ member community sharing scholarships, learning resources, and honest guidance for anyone on the path to becoming a developer, engineer, or tech professional. This repository is the source code for the community's public-facing website.

## Features

- **Fully responsive** — clean breakpoints for mobile, tablet, and desktop, including a custom slide-in mobile navigation menu
- **Animated hero section** — a lightweight canvas-based network animation (nodes + connecting lines) that reflects the community's peer-to-peer, networked identity
- **Scroll-triggered reveals** — sections and cards fade in as you scroll, using `IntersectionObserver`
- **Live counters** — member stats count up on scroll into view
- **Interactive "pillar" grid** — hovering a value pillar visually links it to the others, reinforcing the community/network theme
- **Accessible by default** — visible keyboard focus states, semantic HTML, `aria` labels on icon-only controls, and full support for `prefers-reduced-motion`
- **No build step** — plain HTML, CSS, and vanilla JavaScript; open `index.html` and it just works

## Sections

| Section | Purpose |
|---|---|
| **Hero** | Brand intro, mantra, and primary calls to action (WhatsApp / Discord) |
| **About** | Community origin story, founder note, and core values |
| **Opportunities** | What members get — scholarships, resources, mentorship, community support |
| **Contact** | Direct links to WhatsApp, email, LinkedIn, plus a newsletter signup form |
| **Footer** | Quick navigation, social links, and credit |

## Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties (design tokens), Flexbox/Grid layouts, responsive breakpoints
- **Vanilla JavaScript** — no frameworks or dependencies; handles navigation, animations, and form interaction
- **Fonts** — [Fraunces](https://fonts.google.com/specimen/Fraunces), [Inter](https://fonts.google.com/specimen/Inter), and [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) via Google Fonts

## Project Structure

```
eptech-innovation/
├── index.html      # Page markup and content
├── style.css       # Design system, layout, responsive rules
├── script.js       # Navigation, animations, form handling
└── README.md
```

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/EP-TECH4U/<repo-name>.git
   ```
2. Open `index.html` directly in your browser, or serve it locally:
   ```bash
   python3 -m http.server 8080
   ```
   then visit `http://localhost:8080`

No build tools, package managers, or dependencies required.

## Newsletter Form

The signup form in the Contact section is currently front-end only (validates input and shows a confirmation message locally). To make it functional, connect it to a form backend of your choice — e.g. [Formspree](https://formspree.io/), Mailchimp, or a custom API endpoint — inside the `submit` handler in `script.js`.

## Contributing

This is currently maintained by the EP TECH Innovation founder. If you're a community member and want to suggest changes or report a bug, open an issue or reach out directly via [WhatsApp](https://whatsapp.com/channel/0029Vb7wtv5LdQeUi5zDGq3u) or [LinkedIn](https://www.linkedin.com/in/ahundu-chukwuebuka-samuel-4u/).

## License

_Add a license here if you want the code to be open for reuse (e.g. MIT), or note that all rights are reserved._

---

Built by **Ahundu Chukwuebuka Samuel** — Founder, EP TECH Innovation
