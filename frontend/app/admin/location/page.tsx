import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
import { fetchLocation } from "@/actions/location";
import { getToken } from "@/actions/token";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const token = await getToken(); 
  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export default async function Page() {
  const data = await fetchLocation()
  // const { data, error } = useSWR("/api/locations/", fetcher);
  // console.log("data")

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}