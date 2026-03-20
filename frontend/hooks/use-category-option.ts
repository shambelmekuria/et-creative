type Category = {
    id: string;
    name: string;
    slug: string;
}
type CategoryOptionUpdated = {
    label: string;
    value: string;
}
export default function useCategoryOption(categories: Category[]) {
    const categoriesOption: CategoryOptionUpdated[] = categories.map((item) => ({
        label: item.name,
        value: String(item.id),
    }))

    return {categoriesOption}
}