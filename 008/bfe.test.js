// SPDX-FileCopyrightText: 2021 Anders Rune Jensen
//
// SPDX-License-Identifier: CC0-1.0

const tape = require('tape')
const bfeTypes = require('./bfe.json')

tape('bfe', function (t) {
  t.false(
    bfeTypes.find((type, i) => type.code !== i),
    'type.code = Array index in bfe.json'
  )

  t.false(
    bfeTypes.reduce((acc, type) => {
      if (acc) return acc // already found a problem!

      const problem = type.formats.find((format, i) => format.code !== i)
      return problem
        ? { type: type.type, format: problem }
        : acc
    }, undefined),
    'format.code = Array index in bfe.json'
  )

  const sigils = new Set()
  loopOverTypes: for (const type of bfeTypes) {
    for (const {sigil} of type.formats) {
      if (sigils.has(sigil)) t.fail('Sigil is not unique for type ' + type.type)
      else if (sigil) {
        sigils.add(sigil)
        continue loopOverTypes;
      }
    }
  }
  t.pass('each sigil is unique to a type')
  t.equal(sigils.size, 3, 'there are only 3 sigils')

  const sigilsAndSuffixes = new Set()
  for (const type of bfeTypes) {
    for (const {sigil, suffix, format} of type.formats) {
      if (sigil || suffix) {
        const sigilSuffix = `|${sigil}|${suffix}|`
        if (sigilsAndSuffixes.has(sigilSuffix)) {
          t.fail('Sigil & suffix is not unique for type/format '+ type.type + ' ' + format)
        }
        else sigilsAndSuffixes.add(sigilSuffix)
      }
    }
  }
  t.pass('each sigil & suffix combination is unique')

  const sigillessSuffixFormats = bfeTypes.reduce((acc, type) =>
    [
      ...acc,
      ...type.formats.filter((format) => !format.sigil && format.suffix)
    ]
  , [])
  t.equal(
    sigillessSuffixFormats.length,
    new Set(sigillessSuffixFormats.map((type) => type.suffix)).size,
    'every suffix-only format is unique'
  )

  t.end()
})
