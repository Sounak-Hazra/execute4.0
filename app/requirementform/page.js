"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import userData from '@/schemas/userData';


const page = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [data,setData] = useState("")
    const form = useForm({
        resolver: zodResolver(userData),
        defaultValues: {
            name: "",
            course: "",
            specialization: "",
            interests: [],
            skills: [],
            cgpa: 0,
            certifications: false,
            coursetitle: [],
            working: false,
            jobtitle: "Not working",
            masters: false,
            fieldofmasters: "No",
        },
    });

    

    const onSubmit = async (data) => {
        console.log(data)
        try {
            setIsLoading(true)
            const res = await fetch("api/suggestCareer", {
                method: "POST",
                body:JSON.stringify(data)
            })

            const responce  = await res.json()
            if (!res.ok) {
                console.log("Error occured ")
            }
            else {
                console.log(responce.message)
            }
        } catch(error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    };

    const handleMultiInput = (field, value) => {
        const arrayValues = value.split(",").map((item) => item.trim());
        form.setValue(field, arrayValues, { shouldValidate: true });
    };
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-6 border rounded-lg shadow">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="course"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Your Course" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="specialization"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Specialization</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Your Specialization" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cgpa"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CGPA</FormLabel>
                                <FormControl>
                                    <Input type="number"
                                        onChange={(e) => form.setValue("cgpa", Number(e.target.value))}
                                        placeholder="Your CGPA" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="interests"
                        render={() => (
                            <FormItem>
                                <FormLabel>Interests (comma-separated)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. Web Dev, AI, Cybersecurity"
                                        onChange={(e) => handleMultiInput("interests", e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="skills"
                        render={() => (
                            <FormItem>
                                <FormLabel>Skills (comma-separated)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. React, Node.js, Python"
                                        onChange={(e) => handleMultiInput("skills", e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="certifications"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel>Have Certifications?</FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="coursetitle"
                        render={() => (
                            <FormItem>
                                <FormLabel>Course Titles (comma-separated)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={!form.watch("certifications")}
                                        placeholder="List your course titles"
                                        onChange={(e) => handleMultiInput("coursetitle", e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="working"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel>Currently Working?</FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="jobtitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={!form.watch("working")}
                                        {...field}
                                        placeholder="Your Job Title" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="masters"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel>Planning for Masters?</FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="fieldofmasters"

                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Field of Masters</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={!form.watch("masters")}
                                        {...field}
                                        placeholder="Field of Masters" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </Form>

        </>
    )
}

export default page