import axios from "axios";
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
import Test from "./test";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return  [
  { id: "728ed52f", amount: 100, status: "pending",   email: "m1@example.com" },
  { id: "91ab3c20", amount: 250, status: "success",   email: "m2@example.com" },
  { id: "bc72fa11", amount: 75,  status: "failed",    email: "m3@example.com" },
  { id: "a18d9e44", amount: 300, status: "pending",   email: "m4@example.com" },
  { id: "f03b2d99", amount: 180, status: "success",   email: "m5@example.com" },

];

}

export default async function DemoPage() {
  const data = await getData()
  

  return (
    <div className="container mx-auto py-10">
      <Test/>
      <DataTable columns={columns} data={data} />
    </div>
  )
}