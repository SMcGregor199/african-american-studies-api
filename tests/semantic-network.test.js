import test from 'node:test';
import assert from 'node:assert/strict';
import { createSemanticNetwork } from '../semantic-network.js';

const fixture = {
  figures: [
    {
      id: 'frances-harper',
      name: 'Frances Harper',
      lastName: 'Harper',
      tags: ['poet'],
      titles: ['iola-leroy'],
      concepts: ['womanhood'],
      movements: ['abolition'],
      organizations: ['aass'],
    },
  ],
  titles: [
    {
      id: 'iola-leroy',
      title: 'Iola Leroy',
      figures: ['frances-harper'],
      concepts: ['racial-uplift'],
    },
  ],
  concepts: [
    { id: 'racial-uplift', term: 'Racial Uplift', titles: ['iola-leroy'], figures: ['frances-harper'] },
    { id: 'womanhood', term: 'Womanhood', titles: [], figures: ['frances-harper'] },
  ],
  movements: [
    { id: 'abolition', name: 'Abolition', figures: ['frances-harper'], titles: [], concepts: ['racial-uplift'] },
  ],
  organizations: [
    { id: 'aass', name: 'American Anti-Slavery Society', figures: ['frances-harper'], titles: [], concepts: [], movements: ['abolition'] },
  ],
};

test('figure profiles resolve direct and title-derived relationships', () => {
  const network = createSemanticNetwork(fixture);

  const profile = network.getFigureProfile('frances-harper');

  assert.equal(profile.figure.name, 'Frances Harper');
  assert.deepEqual(profile.titles.map((title) => title.id), ['iola-leroy']);
  assert.deepEqual(profile.concepts.map((concept) => concept.id), ['racial-uplift', 'womanhood']);
  assert.deepEqual(profile.movements.map((movement) => movement.id), ['abolition']);
  assert.deepEqual(profile.organizations.map((organization) => organization.id), ['aass']);
});

test('concept profiles resolve figures through concepts and related titles', () => {
  const network = createSemanticNetwork(fixture);

  const profile = network.getConceptProfile('racial-uplift');

  assert.equal(profile.concept.term, 'Racial Uplift');
  assert.deepEqual(profile.titles.map((title) => title.id), ['iola-leroy']);
  assert.deepEqual(profile.figures.map((figure) => figure.id), ['frances-harper']);
  assert.deepEqual(profile.movements.map((movement) => movement.id), ['abolition']);
});

test('missing records return null through the semantic network interface', () => {
  const network = createSemanticNetwork(fixture);

  assert.equal(network.getFigureProfile('missing'), null);
  assert.equal(network.getTitleProfile('missing'), null);
  assert.equal(network.getRandomFigure(() => 0).id, 'frances-harper');
});
