import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { Input } from "@base-ui/react/input"
import { useState } from "react"
import {config} from "../config/config"
import axios from "axios"

import { Link } from "react-router-dom"

const Login = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [formData , setFormData] = useState({
    email:"",
    password:"",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      
      const response = await axios.post(`${config.backend_url}/login`,formData)
      if(!response) return
      console.log(response);
    } catch (error) {
      console.log("Login Error:",error)
    }
    


    console.log(formData);
  }

  

  
  
  return (
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-1 border-grey-900">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit ={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                className={"border-2 rounded border-grey-900 p-1"}
                
                  id="email"
                  type="email"
                  value={formData.email}
                  placeholder="m@example.com"
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input className={"border-2 rounded border-grey-900 p-1"} id="password" type="password" value={formData.password} onChange={handleChange} required />
              </Field>
              <Field>
                <Button  type="submit">Login</Button>
                
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to={"/register"}>Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      </div>
      </div>
    </div>
  )
}

export default Login
