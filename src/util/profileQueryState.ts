import { parseAsNativeArrayOf, parseAsString, parseAsStringEnum } from 'nuqs'
import { SortOption } from './filterProfiles'

export const profileQueryParsers = {
    search: parseAsString.withDefault(''),
    countries: parseAsNativeArrayOf(parseAsString).withDefault([]),
    jobTitles: parseAsNativeArrayOf(parseAsString).withDefault([]),
    skills: parseAsNativeArrayOf(parseAsString).withDefault([]),
    sort: parseAsStringEnum<SortOption>([
        'default',
        'name-asc',
        'name-desc',
    ]).withDefault('default'),
}

export const profileQueryUrlKeys = {
    search: 'q',
    countries: 'country',
    jobTitles: 'role',
    skills: 'skill',
    sort: 'sort',
}
