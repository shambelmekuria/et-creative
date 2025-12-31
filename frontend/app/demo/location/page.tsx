import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return  [
  { id: "728ed52f", amount: 100, status: "pending",   email: "m1@example.com" },
  { id: "91ab3c20", amount: 250, status: "success",   email: "m2@example.com" },
  { id: "bc72fa11", amount: 75,  status: "failed",    email: "m3@example.com" },
  { id: "a18d9e44", amount: 300, status: "pending",   email: "m4@example.com" },
  { id: "f03b2d99", amount: 180, status: "success",   email: "m5@example.com" },
  { id: "d91e7a62", amount: 90,  status: "failed",    email: "m6@example.com" },
  { id: "0abf449c", amount: 120, status: "pending",   email: "m7@example.com" },
  { id: "e7c221aa", amount: 500, status: "success",   email: "m8@example.com" },
  { id: "5c8b113e", amount: 60,  status: "failed",    email: "m9@example.com" },
  { id: "9fd22b71", amount: 210, status: "pending",   email: "m10@example.com" },

  { id: "71c82fa0", amount: 330, status: "success",   email: "m11@example.com" },
  { id: "a3f912cd", amount: 45,  status: "failed",    email: "m12@example.com" },
  { id: "c19e7b82", amount: 150, status: "pending",   email: "m13@example.com" },
  { id: "ee72a901", amount: 275, status: "success",   email: "m14@example.com" },
  { id: "8bbd442f", amount: 95,  status: "failed",    email: "m15@example.com" },
  { id: "33a8fd90", amount: 400, status: "pending",   email: "m16@example.com" },
  { id: "6a912be1", amount: 220, status: "success",   email: "m17@example.com" },
  { id: "fa21c388", amount: 130, status: "failed",    email: "m18@example.com" },
  { id: "0d1e77ab", amount: 170, status: "pending",   email: "m19@example.com" },
  { id: "b82c9f55", amount: 600, status: "success",   email: "m20@example.com" },
];

}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}