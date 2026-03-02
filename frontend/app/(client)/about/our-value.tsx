import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Code, Heart } from 'lucide-react';
import { FaMobile, FaShop } from 'react-icons/fa6';

export default function OurValue() {
  return (
    <section className='max-w-4xl mx-auto w-full my-24'>
        <div className='flex flex-col justify-center items-center gap-2 mb-8'>
            <h1 className='text-2xl font-bold'>Our Service</h1>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-8">
          <Card className="text-center">
            <CardContent>
              <Button variant="secondary">
                <FaShop size={80} />
              </Button>
            </CardContent>
            <CardHeader>
              <CardTitle>Connect To Seller</CardTitle>
              <CardDescription>
                Lorem, ipsum dolor sit amet consectetur adipisicing.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardContent>
              <Button variant="secondary">
                <Code size={48} />
              </Button>
            </CardContent>
            <CardHeader>
              <CardTitle>Post Product</CardTitle>
              <CardDescription>
                Lorem, ipsum dolor sit amet consectetur adipisicing.
              </CardDescription>
            </CardHeader>
          </Card>
           <Card className="text-center">
            <CardContent>
              <Button variant="secondary">
                <Code size={48} />
              </Button>
            </CardContent>
            <CardHeader>
              <CardTitle>Post Product</CardTitle>
              <CardDescription>
                Lorem, ipsum dolor sit amet consectetur adipisicing.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
    </section>
  )
}
