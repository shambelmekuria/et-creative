import { fetchCategories } from "@/actions/category";
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function Page() {
  const data = await fetchCategories()
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}