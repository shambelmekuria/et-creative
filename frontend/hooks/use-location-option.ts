import { Location } from "@/types/location";
type LocationOptionUpdated = {
    label: string;
    value: string;
}
export default function useLocationOption(locations: Location[]) {
    const locationsOption: LocationOptionUpdated[] = locations.map((item) => ({
        label: item.name,
        value: String(item.id),
    }))

    return {locationsOption}
}