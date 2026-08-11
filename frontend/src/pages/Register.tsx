import { register } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ ...props }: React.ComponentProps<typeof Card>) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword , setConfirmPassword] = useState("");


  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      // console.log(response);
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/homepage");
      
    },
    onError: (error) => {
      console.log("Register failed", error);
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
   
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(formData.password!==confirmPassword) return alert("The password is mismatch.");
    mutation.mutate(formData);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card {...props}>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            {mutation.isError&&<span className="text-red-500">{"Something went wrong!"}</span>}
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    className={"border-2 rounded border-grey-900 p-1"}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    className={"border-2 rounded border-grey-900 p-1"}
                    id="email"
                    type="email"
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="m@example.com"
                    required
                    />
                  <FieldDescription>
                    We&apos;ll use this to contact you. We will not share your
                    email with anyone else.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    className={"border-2 rounded border-grey-900 p-1"}
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    className={"border-2 rounded border-grey-900 p-1"}
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    required
                  />
                  <FieldDescription>
                    Please confirm your password.
                  </FieldDescription>
                </Field>
                <FieldGroup>
                  <Field>
                    <Button disabled={mutation.isPending} type="submit">
                      {mutation.isPending && (
                        <LoaderCircle className="animate-spin" />
                      )}
                      Create Account</Button>

                    <FieldDescription className="px-6 text-center">
                      Already have an account?{" "}
                      <Link to="/auth/login">Sign in</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
