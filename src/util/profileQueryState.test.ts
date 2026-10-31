import { describe, expect, it } from 'vitest'
import { createLoader, createSerializer } from 'nuqs/server'
import { emptyCriteria } from './filterProfiles'
import { profileQueryParsers, profileQueryUrlKeys } from './profileQueryState'

const serialize = createSerializer(profileQueryParsers, {
    urlKeys: profileQueryUrlKeys,
    clearOnDefault: true,
})

const load = createLoader(profileQueryParsers, {
    urlKeys: profileQueryUrlKeys,
})

describe('profile query state', () => {
    it('serializes criteria into the expected query string', () => {
        const query = serialize({
            search: 'C++ Developer',
            countries: ['United States', 'India'],
            jobTitles: ['Software Engineer'],
            skills: ['C++', 'React JS'],
            sort: 'name-desc',
        })

        expect(query).toBe(
            '?q=C%2B%2B+Developer' +
                '&country=United+States' +
                '&country=India' +
                '&role=Software+Engineer' +
                '&skill=C%2B%2B' +
                '&skill=React+JS' +
                '&sort=name-desc'
        )
    })

    it('parses query parameters back into profile criteria', () => {
        const criteria = load(
            '?q=C%2B%2B+Developer' +
                '&country=United+States' +
                '&country=India' +
                '&role=Software+Engineer' +
                '&skill=C%2B%2B' +
                '&skill=React+JS' +
                '&sort=name-desc'
        )

        expect(criteria).toEqual({
            search: 'C++ Developer',
            countries: ['United States', 'India'],
            jobTitles: ['Software Engineer'],
            skills: ['C++', 'React JS'],
            sort: 'name-desc',
        })
    })

    it('returns empty criteria for an empty query string', () => {
        expect(load('')).toEqual(emptyCriteria)
    })
})
