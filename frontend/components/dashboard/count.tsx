"use client"
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from 'lucide-react';
import { fetchDashboard } from '@/actions/dashboard';
export default function Count() {
    const [totalProduct,setTotalProduct] = useState(0)
    const [approved,setApproved] = useState(0);
    const [pending,setPending] = useState(0);
    const [rejected,setRejected] = useState(0);
    useEffect(()=>{
    async function dashboard() {
        const res = await fetchDashboard();
        console.log("res",res)
        setApproved(res!.approved);
        setPending(res!.pending)
        setRejected(res!.rejected)
        setTotalProduct(res?.totalProduct)
        
    }
    dashboard();
    },[])
  return (
    <>
      <Card className="gap-2">
            <CardHeader>
              <CardTitle className="font-bold">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalProduct}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span>Product Overview</span>
              <span>Last 30 days</span>
            </CardFooter>
          </Card>
          <Card className="gap-3">
            <CardHeader className="items-center">
              <CardTitle className="font-bold">Approved</CardTitle>
              <CardDescription>Lorem ipsum dolor sit.</CardDescription>
              <CardAction>
                <span className="bg-amber-300 dark:bg-amber-400 rounded-full p-3 block">
                  <Check className="" />
                </span>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{approved}</p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <span>Last 30 days</span>
              <span>Updated just now</span>
            </CardFooter>
          </Card>
          <Card className="gap-3">
            <CardHeader className="items-center">
              <CardTitle className="font-bold">Pending</CardTitle>
              <CardDescription>Lorem ipsum dolor sit.</CardDescription>
              <CardAction>
                <span className="bg-green-300 rounded-full p-3 block">
                  <Check />
                </span>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{pending}</p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <span>Last 30 days</span>
              <span>Updated just now</span>
            </CardFooter>
          </Card>
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="font-bold">Rejected</CardTitle>
              <CardDescription>Lorem ipsum dolor sit.</CardDescription>
              <CardAction>
                <span className="bg-red-300 rounded-full p-3 block">
                  <X />
                </span>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{rejected}</p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <span>Last 30 days</span>
              <span>Updated just now</span>
            </CardFooter>
          </Card>
    </>
  )
}
