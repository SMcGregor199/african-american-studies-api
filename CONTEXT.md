# Echo Lab Domain Context

Echo Lab is a semantic network for Black intellectual traditions and African American Studies.

## Domain Terms

- **Echo Lab semantic network**: The relational domain made from figures, titles, concepts, movements, and organizations linked by stable identifiers.
- **Figure**: A scholar, artist, activist, theorist, or other person represented in the network.
- **Title**: A foundational text such as a book, essay, speech, poem, or periodical.
- **Concept**: A core idea or theme used to organize Black intellectual history.
- **Movement**: A social, cultural, political, or artistic movement.
- **Organization**: An institution, association, or collective.
- **Profile**: A resolved view of one domain record plus its related records.
- **Identifier link**: A string identifier stored on one record that refers to another record in the semantic network.

## Architectural Vocabulary

- A **module** should hide implementation complexity behind a smaller interface.
- A deep module gives leverage: many call sites can rely on one interface while the implementation absorbs relationship traversal.
- Good locality means bugs in Echo Lab relationship traversal concentrate in the semantic network module instead of leaking into HTTP routes.
