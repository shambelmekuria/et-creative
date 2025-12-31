'use client'
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from 'zod'

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

export default function LocationForm({ setOpen, location }: LocationFormProps) {
    const form = useForm<z.infer<typeof LocationSchema>>({
        resolver: zodResolver(LocationSchema),
        defaultValues: location ? { name: location.name } : {
            name: ""
        },
    })
    function onSubmit(data: z.infer<typeof LocationSchema>) {
        setOpen(false)
    }
    return (
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
    )
}
