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

export default function MissionVission() {
  return (
    <section className='max-w-4xl mx-auto w-full mb-24'>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-8">
          <Card className="text-center">
            <CardContent>
              <Button variant="secondary">
                <FaShop size={80} />
              </Button>
            </CardContent>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
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
              <CardTitle>What We Do</CardTitle>
              <CardDescription>
                Lorem, ipsum dolor sit amet consectetur adipisicing.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
    </section>
  )
}
