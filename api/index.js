import express from 'express';

const notFound = (res, name) => res.status(404).json({ error: `${name} not found` });

export function createApiRouter(network) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json({
      message: 'Welcome to Echo Lab: The African American Studies API',
      available_routes: [
        '/api/figures',
        '/api/figures/:id',
        '/api/figures/search?q=',
        '/api/figures/random',
        '/api/concepts',
        '/api/concepts/:id',
        '/api/titles',
        '/api/titles/:id',
        '/api/movements',
        '/api/movements/:id',
        '/api/organizations',
        '/api/organizations/:id',
      ],
      filters_supported: ['concept', 'movement', 'organization', 'tag', 'name'],
      tools: [
        'pagination (limit & offset)',
        'sorting (name, lastName, lifespan-asc/desc)',
        'random figure: /api/figures/random',
      ],
    });
  });

  router.get('/figures/search', (req, res) => {
    res.json({ figures: network.searchFigures(req.query.q) });
  });

  router.get('/figures/random', (req, res) => {
    const figure = network.getRandomFigure();
    if (!figure) return notFound(res, 'Figure');
    return res.json({ figure });
  });

  router.get('/figures', (req, res) => {
    res.json({ figures: network.listFigures() });
  });

  router.get('/figures/:id', (req, res) => {
    const profile = network.getFigureProfile(req.params.id);
    if (!profile) return notFound(res, 'Figure');
    return res.json(profile);
  });

  router.get('/concepts', (req, res) => {
    res.json({ concepts: network.listConcepts() });
  });

  router.get('/concepts/:id', (req, res) => {
    const profile = network.getConceptProfile(req.params.id);
    if (!profile) return notFound(res, 'Concept');
    return res.json(profile);
  });

  router.get('/titles', (req, res) => {
    res.json({ titles: network.listTitles() });
  });

  router.get('/titles/:id', (req, res) => {
    const profile = network.getTitleProfile(req.params.id);
    if (!profile) return notFound(res, 'Title');
    return res.json(profile);
  });

  router.get('/movements', (req, res) => {
    res.json({ movements: network.listMovements() });
  });

  router.get('/movements/:id', (req, res) => {
    const profile = network.getMovementProfile(req.params.id);
    if (!profile) return notFound(res, 'Movement');
    return res.json(profile);
  });

  router.get('/organizations', (req, res) => {
    res.json({ organizations: network.listOrganizations() });
  });

  router.get('/organizations/:id', (req, res) => {
    const profile = network.getOrganizationProfile(req.params.id);
    if (!profile) return notFound(res, 'Organization');
    return res.json(profile);
  });

  return router;
}
