# Echo Lab

**Echo Lab** is an open-source API project designed to support research, education, and creative work rooted in Black intellectual traditions. It provides structured, machine-readable access to curated data about Black historical figures, cultural texts, social movements, and foundational ideas.

This API is built for the Black Digital Humanities community — a flexible backend that can power visualizations, apps, bots, syllabi, and beyond. Whether you’re building a timeline, a citation tool, or a digital exhibition, Echo Lab offers a common layer of data to build upon.

---
## ✨ Why Echo Lab?

The internet is full of information — but little of it reflects Black thought in **structured**, **relational**, and **developer-friendly** ways. **Echo Lab** isn’t just a database. It’s a **resonant engine**:

- A tool for remixing history  
- A foundation for interdisciplinary collaboration  
- A method of preserving Black study as **living infrastructure**

We don’t just document memory. We create the systems that help it **echo forward**.

---

## 🔧 What Echo Lab Supports

Echo Lab organizes content using a growing **semantic network**, currently built around five core entities:

- `figures` — Scholars, artists, activists, theorists  
- `titles` — Foundational texts: books, essays, speeches  
- `concepts` — Core ideas like "invisibility" or "freedom"  
- `movements` — Social, cultural, or political movements  
- `organizations` — Key institutions and collectives

Each entity links to the others using shared identifiers, forming a **relational web** that reveals the interconnected nature of Black thought across history.

---

## 🔍 API Layer

Echo Lab exposes a RESTful API via Express that allows you to query and filter each entity:

### 🛠️ Sample Endpoints

```
GET /api/figures
GET /api/figures/:id

GET /api/titles
GET /api/titles/:id

GET /api/concepts
GET /api/concepts/:id
GET /api/concepts?tag=freedom

GET /api/movements
GET /api/movements/:id

GET /api/organizations
GET /api/organizations/:id
```

Each endpoint returns structured JSON formatted for extensibility and clean integration with frontends, data visualizations, and educational applications.

---

## 🎨 View Layer

Echo Lab also includes a **server-rendered frontend** built with EJS that allows users to explore relationships between entities in the browser.

Example routes:

- `/figures/:id` — shows a figure’s biography + linked titles/concepts  
- `/concepts/:id` — visualizes a concept and its connections  
- `/movements/:id` — introduces a movement with contextual figures and texts  

The views are fully modular and can be extended with new visual logic (e.g. timelines, maps, network diagrams).

---

## 🧠 JSON Schema (Relational Structure)

Each object type in Echo Lab uses a shared relational schema:

```json
{
    "id": "racial-uplift",
    "term": "Racial Uplift",
    "definition": "A 19th-century movement advocating for the moral, educational, and social advancement of African Americans as a collective strategy for progress.",
    "category": "political",
    "titles": ["iola-leroy"],
    "figures": ["frances-harper", "w-e-b-du-bois"]
}
```

All relationships are tracked using `id` values. Figures are always referenced using `figureIds`, while other linked entities use plural field names for now (`titles`, `concepts`, `movements`, `organizations`). A future update will normalize these to `*_Ids` format.

---

## 🚧 Roadmap

Planned features include:

- Advanced filtering by tag or time period  
- Embeddable JS widgets for public history use  
- PDF exports for syllabi + classroom use  
- Graph visualizations (concept maps, figure clusters)  
- Versioned data snapshots for digital citation  

---

## 🙌 Contributing

Echo Lab is in active development and welcomes collaboration from:

- Scholars in Black Studies / African American Studies  
- Developers working in open data or cultural infrastructure  
- Designers interested in UI for history, theory, and narrative  
- Educators creating digital-first classrooms  

---

## 📜 License

MIT License. Built for learning, remixing, and educational use.

---

## ✊🏾 Built with Purpose

Echo Lab is not just a codebase. It’s a digital method. A slow archive. A cultural infrastructure. A way of saying: **Black memory has structure. Black ideas have continuity. And digital tools can help them resonate.**