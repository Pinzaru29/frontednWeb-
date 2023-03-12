const useAuthorized = (): number | null => {
    let id = sessionStorage.getItem("id") || localStorage.getItem("id")
    if (id !== null) {
        return parseInt(id)
    }
    return null
}
export {useAuthorized}