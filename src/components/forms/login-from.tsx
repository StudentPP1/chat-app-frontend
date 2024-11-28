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

export const LoginForm: React.FC<{ onSubmitLogin: any, loginSchema: any }> = ({ onSubmitLogin, loginSchema }) => {

    const loginFrom = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    return (
        <>
            <div className="flex flex-col space-y-2 text-center h-full w-full">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Login to your account
                </h1>
                <p className="text-sm text-muted-foreground pb-3">
                    Enter your username and password below to login to your account
                </p>

                <Form {...loginFrom}>
                    <form onSubmit={loginFrom.handleSubmit(onSubmitLogin)} className="space-y-8">
                        <FormField
                            control={loginFrom.control}
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
                            control={loginFrom.control}
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
                                Login
                            </Button>
                        </div>

                    </form>
                </Form>
            </div>
        </>

    );
}