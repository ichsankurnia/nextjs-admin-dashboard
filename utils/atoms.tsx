import { atom } from "recoil";

export const collapseState = atom({
    key: 'collapseState',
    default: true
})

export const titleNavState = atom({
    key: 'titleNavState',
    default: 'Dashboard'
})