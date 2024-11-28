import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const RegisterForm: React.FC<{ onSubmitRegister: any, registerSchema: any }> = ({ onSubmitRegister, registerSchema }) => {

    const registerFrom = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            username: "",
            password: ""
        },
    })

    return (
        <>
            <div className="flex flex-col space-y-2 text-center h-full w-full">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create a new account
                    </h1>
                    <p className="text-sm text-muted-foreground pb-3">
                        Enter the details below to create your account
                    </p>
                </div>

                <Form {...registerFrom}>
                    <form onSubmit={registerFrom.handleSubmit(onSubmitRegister)} className="space-y-8">
                        <FormField
                            control={registerFrom.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={registerFrom.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={registerFrom.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='login-page__form-submit'>
                            <Button variant="outline" type="submit">
                                Register
                            </Button>
                        </div>

                    </form>
                </Form>
            </div>
        </>
    );
}