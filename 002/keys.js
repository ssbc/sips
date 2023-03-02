// SPDX-FileCopyrightText: 2021 Anders Rune Jensen
//
// SPDX-License-Identifier: CC0-1.0

const crypto = require("crypto")
const ssbKeys = require('ssb-keys')
const derive = require('derive-key')

/*
const length = 32
const ikm = crypto.randomBytes(length) // aka as seed
*/

// or from backup:
const ikm_hex = '4e2ce5ca70cd12cc0cee0a5285b61fbc3b5f4042287858e613f9a8bf98a70d39'
ikm = Buffer.from(ikm_hex, 'hex')

console.log("seed", ikm.toString('hex'))

const mf_seed = derive('ssb-meta-feed', ikm, 'ssb-meta-feed-seed-v1:metafeed')
//console.log('the derived meta feed seed is:', mf_seed)
const mf_key = ssbKeys.generate("ed25519", mf_seed)
console.log("mf_key", mf_key)

const sf_seed = derive('ssb-meta-feed', ikm, 'ssb-meta-feed-seed-v1:subfeed-1')
//console.log('the derived sub feed seed is:', sf_seed)
const sf_key = ssbKeys.generate("ed25519", sf_seed)
console.log("sf_key", sf_key)
