const collections = ['figures', 'titles', 'concepts', 'movements', 'organizations'];

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function indexById(records) {
  return new Map(asArray(records).map((record) => [record.id, record]));
}

function compareByName(left, right) {
  const leftName = left.name || left.title || left.term || left.id;
  const rightName = right.name || right.title || right.term || right.id;
  return leftName.localeCompare(rightName);
}

export function createSemanticNetwork(data) {
  const dataset = Object.fromEntries(
    collections.map((collection) => [collection, asArray(data?.[collection])])
  );

  const indexes = Object.fromEntries(
    collections.map((collection) => [collection, indexById(dataset[collection])])
  );

  function get(collection, id) {
    return indexes[collection]?.get(id) || null;
  }

  function getByIds(collection, ids) {
    return unique(asArray(ids))
      .map((id) => get(collection, id))
      .filter(Boolean)
      .sort(compareByName);
  }

  function recordsReferencing(collection, field, id) {
    return dataset[collection]
      .filter((record) => asArray(record[field]).includes(id))
      .sort(compareByName);
  }

  function list(collection) {
    return [...dataset[collection]].sort(compareByName);
  }

  function figureConceptIds(figure, titles) {
    return unique([
      ...asArray(figure.concepts),
      ...titles.flatMap((title) => asArray(title.concepts)),
    ]);
  }

  function getFigureProfile(id) {
    const figure = get('figures', id);
    if (!figure) return null;

    const titles = unique([
      ...asArray(figure.titles),
      ...recordsReferencing('titles', 'figures', id).map((title) => title.id),
    ]);
    const resolvedTitles = getByIds('titles', titles);

    return {
      figure,
      titles: resolvedTitles,
      concepts: getByIds('concepts', figureConceptIds(figure, resolvedTitles)),
      movements: getByIds('movements', figure.movements),
      organizations: getByIds('organizations', figure.organizations),
    };
  }

  function getConceptProfile(id) {
    const concept = get('concepts', id);
    if (!concept) return null;

    const titles = unique([
      ...asArray(concept.titles),
      ...recordsReferencing('titles', 'concepts', id).map((title) => title.id),
    ]);
    const figures = unique([
      ...asArray(concept.figures),
      ...recordsReferencing('figures', 'concepts', id).map((figure) => figure.id),
      ...getByIds('titles', titles).flatMap((title) => asArray(title.figures)),
    ]);

    return {
      concept,
      titles: getByIds('titles', titles),
      figures: getByIds('figures', figures),
      movements: recordsReferencing('movements', 'concepts', id),
      organizations: recordsReferencing('organizations', 'concepts', id),
    };
  }

  function getTitleProfile(id) {
    const title = get('titles', id);
    if (!title) return null;

    return {
      title,
      figures: getByIds('figures', title.figures),
      concepts: getByIds('concepts', title.concepts),
      movements: recordsReferencing('movements', 'titles', id),
      organizations: recordsReferencing('organizations', 'titles', id),
    };
  }

  function getMovementProfile(id) {
    const movement = get('movements', id);
    if (!movement) return null;

    return {
      movement,
      figures: getByIds('figures', movement.figures),
      titles: getByIds('titles', movement.titles),
      concepts: getByIds('concepts', movement.concepts),
      organizations: recordsReferencing('organizations', 'movements', id),
    };
  }

  function getOrganizationProfile(id) {
    const organization = get('organizations', id);
    if (!organization) return null;

    return {
      organization,
      figures: getByIds('figures', organization.figures),
      titles: getByIds('titles', organization.titles),
      concepts: getByIds('concepts', organization.concepts),
      movements: getByIds('movements', organization.movements),
    };
  }

  function searchFigures(query) {
    const term = String(query || '').trim().toLowerCase();
    if (!term) return [];

    return dataset.figures
      .filter((figure) => {
        const searchable = [
          figure.name,
          figure.lastName,
          figure.bio,
          ...asArray(figure.tags),
          ...asArray(figure.professions),
        ].join(' ').toLowerCase();
        return searchable.includes(term);
      })
      .sort(compareByName);
  }

  function getRandomFigure(random = Math.random) {
    if (dataset.figures.length === 0) return null;
    const index = Math.floor(random() * dataset.figures.length);
    return dataset.figures[index];
  }

  return {
    listFigures: () => list('figures'),
    listTitles: () => list('titles'),
    listConcepts: () => list('concepts'),
    listMovements: () => list('movements'),
    listOrganizations: () => list('organizations'),
    getFigureProfile,
    getConceptProfile,
    getTitleProfile,
    getMovementProfile,
    getOrganizationProfile,
    searchFigures,
    getRandomFigure,
  };
}
