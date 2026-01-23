import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import React from "react";
type statusProps = {
  status: string;
};
export default function Status({ status }: statusProps) {
  if (status == "approved") {
    return <Badge  className="bg-green-200 text-green-500 dark:bg-green-300 dark:text-green-600 px-3 py-1 capitalize">  {status}</Badge>
  } else if(status == "pending"){
    return <Badge className="capitalize bg-yellow-200 dark:bg-yellow-400 text-yellow-700 px-3 py-1 "> {status}</Badge>;
  }
  else{
    return  <Badge variant="outline" className=" text-red-500 bg-red-200 dark:text-red-200 dark:bg-red-600 px-3 py-1  capitalize">{status}</Badge>;
  }
}
 