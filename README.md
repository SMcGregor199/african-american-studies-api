# Echo Lab

**Echo Lab** is an open-source API project designed to support research, education, and creative work rooted in Black intellectual traditions. It provides structured, machine-readable access to curated data about Black historical figures, cultural texts, social movements, and foundational ideas.

This API is built for the Black Digital Humanities community — a flexible backend that can power visualizations, apps, bots, syllabi, and beyond. Whether you’re building a timeline, a citation tool, or a digital exhibition, Echo Lab offers a common layer of data to build upon.

---

## ✨ Why Echo Lab?

The internet is full of information, but little of it reflects Black thought in structured, accessible, developer-friendly ways. **Echo Lab** isn’t a central archive — it’s a resonant space:  
- A tool for remixing history  
- A foundation for collaboration  
- A way to keep the signal of Black study alive in digital form

We don’t just document memory. We create infrastructure that helps it echo forward.

---

## 🔭 What’s Planned

Echo Lab currently supports structured data for:

- `Figures` — Scholars, artists, activists, and key contributors to Black intellectual life  
- `Texts` — Foundational works, essays, books, and speeches  
- `Movements` — Events and social formations across history  
- `Terms` — Core concepts like "double consciousness" or "Afrofuturism"

Coming soon: timelines, related terms, and interdisciplinary crosswalks.

---

## 🛠️ Sample Endpoints (Planned)

```http
GET /figures?discipline=literature&birthplace=harlem
GET /texts?theme=identity
GET /terms?source=du-bois
GET /movements?decade=1960s
