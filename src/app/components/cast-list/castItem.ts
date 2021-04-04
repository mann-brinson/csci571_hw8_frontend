export interface CastItem {
    id: number,
    name: string,
    character: string,
    profile_path: string
}

export interface CastItemFull {
    person: {
        gender: string,
        profile_path: string,
        birthday: string,
        name: string,
        also_known_as: Array<string>,
        known_for: string,
        biography: string,
        externalIds: Array<object>
    }
}