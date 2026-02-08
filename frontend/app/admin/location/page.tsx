import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
import { fetchLocation } from "@/actions/location";

export default async function Page() {
  const data = await fetchLocation()
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}