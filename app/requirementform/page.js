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
import LoadingOverlay from '../components/Loader';
import { useRouter } from 'next/navigation';


const page = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState("")

    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(userData),
        defaultValues: {
            name: "",
            gender: "",
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
                body: JSON.stringify(data)
            })

            const responce = await res.json()
            if (!res.ok) {
                console.log("Error occured ")
            }
            else {
                router.push(`/whatyouwilldo/${responce.message.trim().replaceAll(" ","-")}`)
            }
        } catch (error) {
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
           {isLoading && <LoadingOverlay />}
            <div className="intro">
                <h1 className=" headline">AI-Driven Career Guidance</h1>
                <h1>Confused about career ? </h1>
                <h2>Don't worry Mentor-25 will help you find your career path according to your skills and interests .</h2>
                <h2>Fill up the form bellow to get guidance about your career</h2>
            </div>
            <Form {...form} >
                <h2 className="headline">Career Prediction Form</h2>
                <p className="intro">Fill in the details to predict your career path.</p>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 container">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your name" className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your gender" className="input-field" />
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
                                    <Input {...field} placeholder="Your Course" className="input-field" />
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
                                    <Input {...field} placeholder="Your Specialization" className="input-field" />
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
                                    <Input
                                        type="number"
                                        onChange={(e) => form.setValue("cgpa", Number(e.target.value))}
                                        placeholder="Your CGPA"
                                        className="input-field"
                                    />
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
                                        className="input-field"
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
                                        className="input-field"
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
                                        className="input-field"
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
                                        placeholder="Your Job Title"
                                        className="input-field"
                                    />
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
                                        placeholder="Field of Masters"
                                        className="input-field"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button  type="submit" className="w-full cursor-pointer submit-btn">Submit</Button>
                </form>
            </Form>


        </>
    )
}

export default page