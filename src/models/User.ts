export default interface User {
    token: string
    email: string
    created: boolean
    permissions: string[]
}