'use client'
import React, { useState } from 'react'
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import LocationForm from './form'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Edit } from 'lucide-react'

import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'

const LocationSchema = z.object({
    name: z.string().min(2).max(100),
})
export type location = {
    id: string,
    name: string
}
type LocationFormProps = {
    open?: boolean,
    setOpen: (open: boolean) => void,
    location?: location
}

type LocationProps = {
    location?: location
}
export default function Location({ location }: LocationProps) {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof LocationSchema>>({
        resolver: zodResolver(LocationSchema),
        defaultValues: location ? { name: location.name } : {
            name: ""
        },
    })
    function onSubmit(data: z.infer<typeof LocationSchema>) {
        console.log(data)
        setOpen(false)
    }
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {location ?
                    <Button variant="ghost" className="font-normal flex items-center justify-start w-full mx-0">
                        Edit
                    </Button>
                    : <Button> Add Location</Button>}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className='text-lg'> {location ? "Edit Location" : "Add Location"}</SheetTitle>
                    <SheetDescription>
                        {location ? "Edit the location details and save the changes." : "Fill the form below to add a new location."}
                    </SheetDescription>

                    <form id="location" onSubmit={form.handleSubmit(onSubmit)} className="mt-3">
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="location-name">
                                            Location Name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="location-name"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Field orientation="horizontal">
                                <Button type="button" variant="outline" onClick={() => form.reset()}>
                                    Reset
                                </Button>
                                <Button type="submit" form="location">
                                    Submit
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}
