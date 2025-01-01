import { ACValue } from "./AutocompleteMultiple";


export const defaultCompareItem = <T extends ACValue = ACValue>(item: T, search: string) => {
    item.label.toLowerCase().includes(search.toLowerCase())
}

export const defaultRenderItem = <T extends ACValue = ACValue>(item: T) => {
    return (
        <div>
            {item.label}
        </div>
    )
}