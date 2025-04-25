import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link, useForm, Head, usePage, router, createInertiaApp } from "@inertiajs/react";
import { LoaderCircle, CheckIcon, Clock, Youtube, Linkedin, Instagram, Twitter, Facebook, Globe, Phone, Mail, MapPin, ChevronDownIcon, ChevronUpIcon, XIcon, PanelLeftIcon, Settings, CircleDollarSign, CreditCard, LogOut, ChevronsUpDown, BadgeCheck, LayoutGrid, ChevronRight, Bell, X, Upload, Check, Copy, PlusCircle, ShieldAlert, Wifi, Download, Edit, ChevronUp, ChevronDown, ArrowLeft, ArrowRight, Share2, LinkIcon, Contact, Sun, Moon, Monitor, AlertCircle, Menu, Github, Smartphone, Zap, Repeat, Shield, Palette } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";
import { useTheme } from "next-themes";
import { Toaster as Toaster$1, toast } from "sonner";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";
import { useEffect, useState, useCallback, Fragment as Fragment$1, useRef } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { TabsContent as TabsContent$1 } from "@radix-ui/react-tabs";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { Button as Button$1, Transition } from "@headlessui/react";
import axios from "axios";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function InputError({ message, className = "", ...props }) {
  return message ? /* @__PURE__ */ jsx("p", { ...props, className: cn("text-sm text-red-600 dark:text-red-400", className), children: message }) : null;
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium"
        }
      },
      ...props
    }
  );
};
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn("flex flex-col gap-1.5 px-6", className),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function AuthCardLayout({
  children,
  title,
  description
}) {
  return /* @__PURE__ */ jsx("div", { className: "bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-md flex-col gap-6", children: [
    /* @__PURE__ */ jsx(Link, { href: route("home"), className: "flex items-center gap-2 self-center font-medium", children: /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 items-center justify-center", children: /* @__PURE__ */ jsxs("a", { href: "/", className: "flex items-center gap-[1px] text-xl font-semibold", children: [
      /* @__PURE__ */ jsx("span", { className: "text-brand-purple", children: "Mulu" }),
      /* @__PURE__ */ jsx("span", { children: "Card" })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-6", children: /* @__PURE__ */ jsxs(Card, { className: "rounded-xl", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "px-10 pt-8 pb-0 text-center", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: title }),
        /* @__PURE__ */ jsx(CardDescription, { children: description })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "px-10 py-8", children })
    ] }) })
  ] }) });
}
function AuthLayout({ children, title, description, ...props }) {
  return /* @__PURE__ */ jsxs(AuthCardLayout, { title, description, ...props, children: [
    /* @__PURE__ */ jsx(Toaster, { richColors: true }),
    children
  ] });
}
function ConfirmPassword() {
  const { data, setData, post: post2, processing, errors, reset } = useForm({
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post2(route("password.confirm"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(
    AuthLayout,
    {
      title: "Confirm your password",
      description: "This is a secure area of the application. Please confirm your password before continuing.",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Confirm password" }),
        /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password",
                type: "password",
                name: "password",
                placeholder: "Password",
                autoComplete: "current-password",
                value: data.password,
                autoFocus: true,
                onChange: (e) => setData("password", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.password })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(Button, { className: "w-full", disabled: processing, children: [
            processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            "Confirm password"
          ] }) })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmPassword
}, Symbol.toStringTag, { value: "Module" }));
function TextLink({ className = "", children, ...props }) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      className: cn(
        "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500",
        className
      ),
      ...props,
      children
    }
  );
}
function ForgotPassword({ status }) {
  const { data, setData, post: post2, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post2(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Forgot password", description: "Enter your email to receive a password reset link", children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot password" }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: status }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email address" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              name: "email",
              autoComplete: "off",
              value: data.email,
              autoFocus: true,
              onChange: (e) => setData("email", e.target.value),
              placeholder: "email@example.com"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "my-6 flex items-center justify-start", children: /* @__PURE__ */ jsxs(Button, { className: "w-full", disabled: processing, children: [
          processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Email password reset link"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground space-x-1 text-center text-sm", children: [
        /* @__PURE__ */ jsx("span", { children: "Or, return to" }),
        /* @__PURE__ */ jsx(TextLink, { href: route("login"), children: "log in" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}
function Login({ status, canResetPassword }) {
  const { data, setData, post: post2, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const submit = (e) => {
    e.preventDefault();
    post2(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Log in to your account", description: "Enter your email and password below to log in", children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-6", onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email address" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              required: true,
              autoFocus: true,
              tabIndex: 1,
              autoComplete: "email",
              value: data.email,
              onChange: (e) => setData("email", e.target.value),
              placeholder: "email@example.com"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            canResetPassword && /* @__PURE__ */ jsx(TextLink, { href: route("password.request"), className: "ml-auto text-sm", tabIndex: 5, children: "Forgot password?" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              required: true,
              tabIndex: 2,
              autoComplete: "current-password",
              value: data.password,
              onChange: (e) => setData("password", e.target.value),
              placeholder: "Password"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx(Checkbox, { id: "remember", name: "remember", tabIndex: 3 }),
          /* @__PURE__ */ jsx(Label, { htmlFor: "remember", children: "Remember me" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", className: "mt-4 w-full", tabIndex: 4, disabled: processing, children: [
          processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Log in"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-center text-sm", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx(TextLink, { href: route("register"), tabIndex: 5, children: "Sign up" })
      ] })
    ] }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: status })
  ] });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function MagicLogin({ status }) {
  const { data, setData, post: post2, processing, errors, reset } = useForm({
    email: ""
  });
  useEffect(() => {
    if (status) {
      toast.success(status);
      reset();
    }
  }, [status, reset]);
  const submit = (e) => {
    e.preventDefault();
    post2(route("login"), {
      onSuccess: () => {
      },
      onError: (errors2) => {
        if (errors2.email && !errors2.email.includes("required")) {
          toast.error(errors2.email);
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Log in to your account", description: "Enter your email Address", children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-6", onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email address" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              required: true,
              autoFocus: true,
              tabIndex: 1,
              autoComplete: "email",
              value: data.email,
              onChange: (e) => setData("email", e.target.value),
              placeholder: "email@example.com"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", className: "mt-4 w-full", tabIndex: 4, disabled: processing, children: [
          processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Log in"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-center text-sm", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx(TextLink, { href: route("register"), tabIndex: 5, children: "Sign up" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MagicLogin
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
  const { data, setData, post: post2, processing, errors, reset } = useForm({
    name: "",
    email: ""
    // password: '',
    // password_confirmation: '',
  });
  const submit = (e) => {
    e.preventDefault();
    post2(route("register"));
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Create an account", description: "Enter your details below to create your account", children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-6", onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              type: "text",
              required: true,
              autoFocus: true,
              tabIndex: 1,
              autoComplete: "name",
              value: data.name,
              onChange: (e) => setData("name", e.target.value),
              disabled: processing,
              placeholder: "Full name"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email address" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              required: true,
              tabIndex: 2,
              autoComplete: "email",
              value: data.email,
              onChange: (e) => setData("email", e.target.value),
              disabled: processing,
              placeholder: "email@example.com"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", className: "mt-2 w-full", tabIndex: 5, disabled: processing, children: [
          processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Create account"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-center text-sm", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsx(TextLink, { href: route("login"), tabIndex: 6, children: "Log in" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({ token, email }) {
  const { data, setData, post: post2, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post2(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Reset password", description: "Please enter your new password below", children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset password" }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "email",
            type: "email",
            name: "email",
            autoComplete: "email",
            value: data.email,
            className: "mt-1 block w-full",
            readOnly: true,
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "password",
            type: "password",
            name: "password",
            autoComplete: "new-password",
            value: data.password,
            className: "mt-1 block w-full",
            autoFocus: true,
            onChange: (e) => setData("password", e.target.value),
            placeholder: "Password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "password_confirmation", children: "Confirm password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "password_confirmation",
            type: "password",
            name: "password_confirmation",
            autoComplete: "new-password",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            onChange: (e) => setData("password_confirmation", e.target.value),
            placeholder: "Confirm password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { type: "submit", className: "mt-4 w-full", disabled: processing, children: [
        processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        "Reset password"
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function VerifyEmail({ status }) {
  const { post: post2, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post2(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Verify email", description: "Please verify your email address by clicking on the link we just emailed to you.", children: [
    /* @__PURE__ */ jsx(Head, { title: "Email verification" }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6 text-center", children: [
      /* @__PURE__ */ jsxs(Button, { disabled: processing, variant: "secondary", children: [
        processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        "Resend verification email"
      ] }),
      /* @__PURE__ */ jsx(TextLink, { href: route("logout"), method: "post", className: "mx-auto block text-sm", children: "Log out" })
    ] })
  ] });
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
function BusinessHoursPreview({ business_hours }) {
  console.log("BusinessHoursPreview");
  console.log(business_hours);
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };
  const groupedSchedule = () => {
    if (!business_hours) return [];
    const groups = [];
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    daysOfWeek.forEach((day) => {
      const daySchedule = business_hours.find((schedule) => schedule.day === day);
      const scheduleString = getScheduleString(daySchedule);
      const existingGroup = groups.find((group) => group.schedule === scheduleString);
      if (existingGroup) {
        existingGroup.days.push(day);
      } else {
        groups.push({ days: [day], schedule: scheduleString });
      }
    });
    return groups;
  };
  const getScheduleString = (daySchedule) => {
    if (!daySchedule || daySchedule.isOpen == false) return "Closed";
    return `${daySchedule.open}-${daySchedule.close}`;
  };
  const formatDays = (days) => {
    if (days.length === 1) return days[0];
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const indices = days.map((day) => daysOfWeek.indexOf(day)).sort((a, b) => a - b);
    let isConsecutive = true;
    for (let i = 1; i < indices.length; i++) {
      if (indices[i] !== indices[i - 1] + 1) {
        isConsecutive = false;
        break;
      }
    }
    if (isConsecutive) {
      return `${daysOfWeek[indices[0]]} - ${daysOfWeek[indices[indices.length - 1]]}`;
    } else {
      return days.join(", ");
    }
  };
  return /* @__PURE__ */ jsxs(Card, { className: "w-full border-none shadow-none", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5" }),
      "Business Hours"
    ] }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: groupedSchedule().map((group, index) => /* @__PURE__ */ jsxs("div", { className: "border-b pb-3 last:border-b-0 last:pb-0", children: [
      /* @__PURE__ */ jsx("div", { className: "font-medium", children: formatDays(group.days) }),
      /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: group.schedule === "Closed" ? "Closed" : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        formatTime(business_hours.find((schedule) => schedule.day === group.days[0]).open),
        " -",
        " ",
        formatTime(business_hours.find((schedule) => schedule.day === group.days[0]).close)
      ] }) })
    ] }, index)) }) })
  ] });
}
const socialIconMap = {
  email: Mail,
  phone: Phone,
  website: Globe,
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube
};
function MuluCard({
  banner,
  avatar,
  logo,
  banner_color,
  links,
  first_name,
  last_name,
  organization,
  job_title,
  phone,
  email,
  headline,
  address,
  location,
  galleries,
  services,
  business_hours
}) {
  return /* @__PURE__ */ jsxs(Card, { className: "w-full rounded-lg bg-gray-50 p-0 shadow-none", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "h-[200px] w-full rounded-lg border-none bg-gray-50 p-0", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-[200px] w-full",
          children: banner.path && /* @__PURE__ */ jsx("img", { src: banner.path, alt: "", className: "h-full w-full border-none object-cover" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative -mt-14 flex flex-row justify-between border-none px-4", children: [
        /* @__PURE__ */ jsx("div", { className: "bordr-white flex h-[100px] w-[100px] items-center justify-center rounded-full border-4 border-gray-500 bg-white", children: /* @__PURE__ */ jsx("img", { src: avatar.path, alt: "", className: "h-full w-full rounded-full border-none object-contain" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex h-[100px] w-[100px] items-center justify-center rounded-lg border-4 border-gray-500 bg-white", children: /* @__PURE__ */ jsx("img", { src: logo.path, alt: "", className: "h-full w-full rounded-full border-none object-contain" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col gap-4 border-none bg-gray-50 p-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col items-center border-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "font-norma flex flex-row space-x-4 text-2xl capitalize", children: [
          /* @__PURE__ */ jsx("p", { children: first_name }),
          /* @__PURE__ */ jsx("p", { children: last_name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-md font-bold capitalize", children: organization }),
          /* @__PURE__ */ jsx("p", { className: "text-md font-bold capitalize", children: job_title })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "font-mute p-2 text-center", children: headline }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-row flex-wrap items-start justify-center gap-2 border-none", children: links == null ? void 0 : links.map((link, index) => {
        const Icon2 = socialIconMap[link.name.toLowerCase()] || Globe;
        return link.url && /* @__PURE__ */ jsx("div", { className: "flex flex-row flex-wrap items-center gap-2 rounded-lg border-none p-0", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#ff8c39]",
            style: {
              backgroundColor: banner_color
            },
            children: /* @__PURE__ */ jsx("a", { href: link.url, className: "text-xl font-bold text-black", children: /* @__PURE__ */ jsx(Icon2, { className: "h-5 w-5 text-white" }) })
          }
        ) }, index);
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-4 border-none p-2 text-center font-bold text-white capitalize", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "rounded-4xl border-none p-2",
            style: {
              backgroundColor: banner_color
            },
            children: /* @__PURE__ */ jsx("a", { href: `tel:${phone}`, children: "call me" })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "rounded-4xl border-2 p-2",
            style: {
              backgroundColor: banner_color
            },
            children: /* @__PURE__ */ jsx("a", { href: `mailto:${email}`, children: "email me" })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "rounded-4xl border-none p-2",
            style: {
              backgroundColor: banner_color
            },
            children: "visit website"
          }
        )
      ] }),
      services.length > 0 && /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-none", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Our Services" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-6", children: services.map((item) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "aspect-video w-full overflow-hidden rounded-lg border bg-white", children: item.path && /* @__PURE__ */ jsx("img", { src: item.path, alt: item.name, className: "h-full w-full object-contain" }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-medium", children: item.name }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: item.description || "No description provided" })
          ] })
        ] }, item.id)) }) })
      ] }),
      galleries.length > 0 && /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-none", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Galleries" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-6", children: galleries.map((item) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "aspect-video w-full overflow-hidden rounded-lg border bg-white", children: item.path && /* @__PURE__ */ jsx("img", { src: item.path, alt: item.description, className: "h-full w-full object-contain" }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: item.description || "No description provided" }) })
        ] }, item.id)) }) })
      ] }),
      /* @__PURE__ */ jsx(BusinessHoursPreview, { business_hours }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 rounded-lg border-none p-2 shadow-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 p-2", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-8 w-8", color: banner_color }),
          /* @__PURE__ */ jsx("p", { className: "font-mute text-md", children: address })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "cursor-pointer rounded-4xl p-2 text-center font-bold text-white", style: { backgroundColor: banner_color }, children: /* @__PURE__ */ jsx("a", { href: location, target: "_blank", className: "capitalize", children: "view on google map" }) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MuluCard
}, Symbol.toStringTag, { value: "Module" }));
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ScrollAreaPrimitive.Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsx(ScrollBar, {}),
        /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ScrollAreaPrimitive.ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SwitchPrimitive.Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        SwitchPrimitive.Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Root,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-1",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex items-center justify-center gap-2 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function Footer$1() {
  return /* @__PURE__ */ jsxs("footer", { className: "flex flex-col items-center justify-center gap-2 border-t-2 py-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-between gap-8 border-none p-2 font-bold", children: [
      /* @__PURE__ */ jsx(Link, { href: "home", children: "Home" }),
      /* @__PURE__ */ jsx(Link, { href: "home", children: "Blog" }),
      /* @__PURE__ */ jsx(Link, { href: "home", children: "Privacy Policy" }),
      /* @__PURE__ */ jsx(Link, { href: "home", children: "terms" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-center gap-4 border-none p-0", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-brand-purple flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#ff8c39]", children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-xl font-bold text-black", children: /* @__PURE__ */ jsx(Facebook, { className: "h-5 w-5 text-white" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-brand-purple flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#ff8c39]", children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-xl font-bold text-black", children: /* @__PURE__ */ jsx(Twitter, { className: "h-5 w-5 text-white" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-brand-purple flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#ff8c39]", children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-xl font-bold text-black", children: /* @__PURE__ */ jsx(Instagram, { className: "h-5 w-5 text-white" }) }) })
    ] })
  ] });
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 4,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-w-sm rounded-md px-3 py-1.5 text-xs",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(void 0);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator-root",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ...props,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsxs(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: [
      /* @__PURE__ */ jsxs(SheetHeader, { className: "sr-only", children: [
        /* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }),
        /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })
      ] }),
      /* @__PURE__ */ jsx(
        SheetContent,
        {
          "data-sidebar": "sidebar",
          "data-slot": "sidebar",
          "data-mobile": "true",
          className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
          style: {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE
          },
          side,
          children: /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col", children })
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick == null ? void 0 : onClick(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx(PanelLeftIcon, {}),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: cn(
        "bg-background relative flex min-h-svh flex-1 flex-col",
        "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      ),
      ...props
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
}
function SidebarGroupContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
function AppContent({ variant = "header", children, ...props }) {
  if (variant === "sidebar") {
    return /* @__PURE__ */ jsx(SidebarInset, { ...props, children });
  }
  return /* @__PURE__ */ jsx("main", { className: "mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl", ...props, children });
}
function AppShell({ children, variant = "header" }) {
  const [isOpen, setIsOpen] = useState(() => typeof window !== "undefined" ? localStorage.getItem("sidebar") !== "false" : true);
  const handleSidebarChange = (open) => {
    setIsOpen(open);
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar", String(open));
    }
  };
  if (variant === "header") {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen w-full flex-col", children });
  }
  return /* @__PURE__ */ jsx(SidebarProvider, { defaultOpen: isOpen, open: isOpen, onOpenChange: handleSidebarChange, children });
}
function Icon({ iconNode: IconComponent, className, ...props }) {
  return /* @__PURE__ */ jsx(IconComponent, { className: cn("h-4 w-4", className), ...props });
}
function NavFooter({
  items,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(SidebarGroup, { ...props, className: `group-data-[collapsible=icon]:p-0 ${className || ""}`, children: /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(
    SidebarMenuButton,
    {
      asChild: true,
      className: "text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",
      children: /* @__PURE__ */ jsxs("a", { href: item.url, target: "_blank", rel: "noopener noreferrer", children: [
        item.icon && /* @__PURE__ */ jsx(Icon, { iconNode: item.icon, className: "h-5 w-5" }),
        /* @__PURE__ */ jsx("span", { children: item.title })
      ] })
    }
  ) }, item.title)) }) }) });
}
function NavMain({ items = [] }) {
  const page = usePage();
  return /* @__PURE__ */ jsxs(SidebarGroup, { className: "px-2 py-0", children: [
    /* @__PURE__ */ jsx(SidebarGroupLabel, { children: "Platform" }),
    /* @__PURE__ */ jsx(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, { asChild: true, isActive: item.url === page.url, children: /* @__PURE__ */ jsxs(Link, { href: item.url, prefetch: true, children: [
      item.icon && /* @__PURE__ */ jsx(item.icon, {}),
      /* @__PURE__ */ jsx("span", { children: item.title })
    ] }) }) }, item.title)) })
  ] });
}
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
function useInitials() {
  const getInitials = (fullName) => {
    const names = fullName.trim().split(" ");
    if (names.length === 0) return "";
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    const firstInitial = names[0].charAt(0);
    const lastInitial = names[names.length - 1].charAt(0);
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };
  return getInitials;
}
function UserInfo({ user, showEmail = false }) {
  const getInitials = useInitials();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 overflow-hidden rounded-full", children: [
      /* @__PURE__ */ jsx(AvatarImage, { src: user.avatar, alt: user.name }),
      /* @__PURE__ */ jsx(AvatarFallback, { className: "rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white", children: getInitials(user.name) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
      /* @__PURE__ */ jsx("span", { className: "truncate font-medium", children: user.name }),
      showEmail && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground truncate text-xs", children: user.email })
    ] })
  ] });
}
function useMobileNavigation() {
  const cleanup = useCallback(() => {
    document.body.style.removeProperty("pointer-events");
  }, []);
  return cleanup;
}
function UserMenuContent({ user }) {
  const cleanup = useMobileNavigation();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "p-0 font-normal", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm", children: /* @__PURE__ */ jsx(UserInfo, { user, showEmail: true }) }) }),
    /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
    /* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
      /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { className: "block w-full", href: route("profile.edit"), as: "button", prefetch: true, onClick: cleanup, children: [
        /* @__PURE__ */ jsx(Settings, { className: "mr-2" }),
        "Settings"
      ] }) }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { className: "block w-full", href: route("settings.subscription"), as: "button", prefetch: true, onClick: cleanup, children: [
        /* @__PURE__ */ jsx(CircleDollarSign, { className: "mr-2" }),
        "Manage Subscription"
      ] }) }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { className: "block w-full", href: route("settings.plans"), as: "button", prefetch: true, onClick: cleanup, children: [
        /* @__PURE__ */ jsx(CreditCard, { className: "mr-2" }),
        "Plans & Pricing"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
    /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { className: "block w-full", method: "post", href: route("logout"), as: "button", onClick: cleanup, children: [
      /* @__PURE__ */ jsx(LogOut, { className: "mr-2" }),
      "Log out"
    ] }) })
  ] });
}
function NavUser() {
  const { auth } = usePage().props;
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  return /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("div", { className: `p-1 ${state === "collapsed" ? "" : "rounded-xl border-2"}`, children: [
      /* @__PURE__ */ jsxs(SidebarMenuButton, { size: "lg", className: "text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent group", children: [
        /* @__PURE__ */ jsx(UserInfo, { user: auth.user }),
        /* @__PURE__ */ jsx(ChevronsUpDown, { className: "ml-auto size-4" })
      ] }),
      state !== "collapsed" && /* @__PURE__ */ jsx(Fragment, { children: auth.activePlan && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("hr", {}),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-center gap-4 p-1", children: [
          /* @__PURE__ */ jsx(BadgeCheck, { color: "#6265f1", className: "size-6" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-[#6265f1] capitalize", children: [
            auth.activePlan.plan.name,
            " plan"
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      DropdownMenuContent,
      {
        className: "w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg",
        align: "end",
        side: isMobile ? "bottom" : state === "collapsed" ? "left" : "bottom",
        children: /* @__PURE__ */ jsx(UserMenuContent, { user: auth.user })
      }
    )
  ] }) }) });
}
function AppLogo() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("a", { href: "/", className: "flex items-center gap-[1px] text-xl font-semibold", children: [
    /* @__PURE__ */ jsx("span", { className: "text-brand-purple", children: "Mulu" }),
    /* @__PURE__ */ jsx("span", { children: "Card" })
  ] }) });
}
const mainNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutGrid
  }
];
const footerNavItems = [
  // {
  //     title: 'Repository',
  //     url: 'https://github.com/laravel/react-starter-kit',
  //     icon: Folder,
  // },
  // {
  //     title: 'Documentation',
  //     url: 'https://laravel.com/docs/starter-kits',
  //     icon: BookOpen,
  // },
];
function AppSidebar() {
  return /* @__PURE__ */ jsxs(Sidebar, { collapsible: "icon", variant: "inset", children: [
    /* @__PURE__ */ jsx(SidebarHeader, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, { size: "lg", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/dashboard", prefetch: true, children: /* @__PURE__ */ jsx(AppLogo, {}) }) }) }) }) }),
    /* @__PURE__ */ jsx(SidebarContent, { children: /* @__PURE__ */ jsx(NavMain, { items: mainNavItems }) }),
    /* @__PURE__ */ jsxs(SidebarFooter, { children: [
      /* @__PURE__ */ jsx(NavFooter, { items: footerNavItems, className: "mt-auto" }),
      /* @__PURE__ */ jsx(NavUser, {})
    ] })
  ] });
}
function Breadcrumb({ ...props }) {
  return /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...props });
}
function BreadcrumbList({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      ),
      ...props
    }
  );
}
function BreadcrumbItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: cn("inline-flex items-center gap-1.5", className),
      ...props
    }
  );
}
function BreadcrumbLink({
  asChild,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "breadcrumb-link",
      className: cn("hover:text-foreground transition-colors", className),
      ...props
    }
  );
}
function BreadcrumbPage({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("text-foreground font-normal", className),
      ...props
    }
  );
}
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsx(ChevronRight, {})
    }
  );
}
function Breadcrumbs({ breadcrumbs: breadcrumbs2 }) {
  return /* @__PURE__ */ jsx(Fragment, { children: breadcrumbs2.length > 0 && /* @__PURE__ */ jsx(Breadcrumb, { children: /* @__PURE__ */ jsx(BreadcrumbList, { children: breadcrumbs2.map((item, index) => {
    const isLast = index === breadcrumbs2.length - 1;
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: isLast ? /* @__PURE__ */ jsx(BreadcrumbPage, { children: item.title }) : /* @__PURE__ */ jsx(BreadcrumbLink, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: item.href, children: item.title }) }) }),
      !isLast && /* @__PURE__ */ jsx(BreadcrumbSeparator, {})
    ] }, index);
  }) }) }) });
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function NotificationPanel() {
  const page = usePage();
  const { auth } = page.props;
  const unReadNotifications = auth.unReadNotifications;
  const unreadCount = unReadNotifications.length;
  const [expandedId, setExpandedId] = useState(null);
  const removeNotification = (id) => {
    router.post(route("dashboard.marknotificationasread", { id }));
  };
  const markAllAsRead = () => {
    const notificationIds = unReadNotifications.map((notification) => notification.id);
    router.post(route("dashboard.markallasread"), {
      notificationsIds: notificationIds
    });
  };
  const toggleNotification = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  return /* @__PURE__ */ jsxs(Sheet, { children: [
    /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "icon", className: "relative", children: [
      /* @__PURE__ */ jsx(Bell, { className: "h-5 w-5" }),
      unreadCount > 0 && /* @__PURE__ */ jsx(Badge, { className: "absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500", children: unreadCount })
    ] }) }),
    /* @__PURE__ */ jsxs(SheetContent, { side: "right", className: "w-full sm:max-w-md", children: [
      /* @__PURE__ */ jsxs(SheetHeader, { className: "mb-4", children: [
        /* @__PURE__ */ jsx(SheetTitle, { children: "Notifications" }),
        /* @__PURE__ */ jsxs(SheetDescription, { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "You have ",
            unreadCount,
            " notifications"
          ] }),
          unreadCount > 0 && /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => markAllAsRead(), children: "Mark all as read" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4 mt-4 max-h-[80vh] overflow-y-auto pr-2", children: unreadCount > 0 ? unReadNotifications.map((notification) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `relative p-4 border rounded-lg ${notification.read_at ? "bg-background" : "bg-muted"} transition-all`,
          children: [
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "absolute top-2 right-2 h-6 w-6 z-10",
                onClick: (e) => {
                  e.stopPropagation();
                  removeNotification(notification.id);
                },
                children: [
                  /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "pr-6 cursor-pointer", onClick: () => toggleNotification(notification.id), children: [
              /* @__PURE__ */ jsx("h4", { className: "font-medium", children: notification.data.subject }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-2", children: notification.created_at }),
              expandedId === notification.id && /* @__PURE__ */ jsx("div", { className: "mt-4 pt-4 border-t text-sm animate-in fade-in-50 duration-200", children: /* @__PURE__ */ jsx("p", { children: notification.data.body }) })
            ] })
          ]
        },
        notification.id
      )) : /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No notifications" }) })
    ] })
  ] });
}
function AppSidebarHeader({ breadcrumbs: breadcrumbs2 = [] }) {
  return /* @__PURE__ */ jsxs("header", { className: "flex justify-between border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(SidebarTrigger, { className: "-ml-1" }),
      /* @__PURE__ */ jsx(Breadcrumbs, { breadcrumbs: breadcrumbs2 })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(NotificationPanel, {}) })
  ] });
}
function AppSidebarLayout({ children, breadcrumbs: breadcrumbs2 = [] }) {
  return /* @__PURE__ */ jsxs(AppShell, { variant: "sidebar", children: [
    /* @__PURE__ */ jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxs(AppContent, { variant: "sidebar", children: [
      /* @__PURE__ */ jsx(AppSidebarHeader, { breadcrumbs: breadcrumbs2 }),
      children
    ] })
  ] });
}
const AppLayout = ({ children, breadcrumbs: breadcrumbs2, ...props }) => /* @__PURE__ */ jsxs(AppSidebarLayout, { breadcrumbs: breadcrumbs2, ...props, children: [
  /* @__PURE__ */ jsx(Toaster, { richColors: true }),
  /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx("main", { className: "flex-grow", children }) }),
  /* @__PURE__ */ jsx(Footer$1, {})
] });
const breadcrumbs$8 = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  { title: "Create Card", href: "" }
];
function CreateCard() {
  var _a, _b;
  const auth = usePage().props.auth;
  const activePlan = auth.activePlan;
  const serviceLimit = ((_a = activePlan == null ? void 0 : activePlan.plan) == null ? void 0 : _a.number_of_service) ?? 0;
  const galleryLimit = ((_b = activePlan == null ? void 0 : activePlan.plan) == null ? void 0 : _b.number_of_gallery) ?? 0;
  const cardSocialLinks = usePage().props.cardSocialLinks;
  const links = cardSocialLinks.map((link) => ({
    name: link,
    url: "",
    placeholder: `https://${link.toLowerCase()}.com/your-profile`
  }));
  const colors = ["#3a59ae", "#a580e5", "#6dd3c7", "#3bb55d", "#ffc631", "#ff8c39", "#ea3a2e", "#ee85dd", "#4a4a4a"];
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  const copyToAllDays = (day) => {
    const updatedSchedule = data.business_hours.map((item) => {
      return {
        ...item,
        open: day.open,
        close: day.close
      };
    });
    setData("business_hours", updatedSchedule);
  };
  const updateTimeSlot = (day, field, value) => {
    console.log(day, field, value);
    const updatedSchedule = data.business_hours.map((item) => {
      if (item.id === day.id) {
        if (field === "open") {
          return {
            ...item,
            open: value
          };
        } else if (field === "close") {
          return {
            ...item,
            close: value
          };
        }
      }
      return item;
    });
    setData("business_hours", updatedSchedule);
  };
  const toggleDayOpen = (day) => {
    const updatedSchedule = data.business_hours.map((item) => {
      if (item.id === day.id) {
        return {
          ...item,
          isOpen: !item.isOpen
        };
      }
      return item;
    });
    setData("business_hours", updatedSchedule);
  };
  const { data, setData, post: post2, processing, errors } = useForm({
    banner: {
      file: null,
      path: null
    },
    avatar: {
      file: null,
      path: null
    },
    logo: {
      file: null,
      path: null
    },
    first_name: "",
    last_name: "",
    organization: "",
    job_title: "",
    phone: "",
    email: "",
    banner_color: colors[0],
    // constract the links from cardSocialLinks
    links,
    address: "",
    location: "",
    headline: "",
    galleries: [{ id: crypto.randomUUID(), file: null, path: null, description: "" }],
    services: [
      { id: crypto.randomUUID(), file: null, path: null, name: "", description: "" }
    ],
    business_hours: [
      { id: crypto.randomUUID(), day: "Monday", isOpen: true, open: "03:00", close: "11:00" },
      { id: crypto.randomUUID(), day: "Tuesday", isOpen: true, open: "03:00", close: "11:00" },
      { id: crypto.randomUUID(), day: "Wednesday", isOpen: true, open: "03:00", close: "11:00" },
      { id: crypto.randomUUID(), day: "Thursday", isOpen: true, open: "03:00", close: "11:00" },
      { id: crypto.randomUUID(), day: "Friday", isOpen: true, open: "03:00", close: "11:00" },
      { id: crypto.randomUUID(), day: "Saturday", isOpen: false, open: "03:00", close: "11:00" },
      { id: crypto.randomUUID(), day: "Sunday", isOpen: false, open: "03:00", close: "11:00" }
    ]
  });
  const hasTabError = (prefixes, errors2) => {
    return Object.keys(errors2).some(
      (key) => prefixes.some((prefix) => key.startsWith(prefix))
    );
  };
  const DisplayError = hasTabError(["avatar.file", "banner.file", "logo.file"], errors);
  const personalInformationError = hasTabError(
    ["first_name", "last_name", "organization", "job_title", "email", "phone", "headline"],
    errors
  );
  const linksError = hasTabError(
    ["links.0", "links.1", "links.2", "links.3", "links.4", "links.5"],
    errors
  );
  const locationError = hasTabError(["address", "location"], errors);
  const galleryError = hasTabError(["galleries.0", "galleries.1", "galleries.2"], errors);
  const serviceError = hasTabError(["services.0", "services.1", "services.2"], errors);
  const businessHoursError = hasTabError(["business_hours.0", "business_hours.1", "business_hours.2"], errors);
  console.log("personalInformationError", personalInformationError);
  const handleGalleryFileChange = (id, file) => {
    const newGallery = data.galleries.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          file,
          path: file ? URL.createObjectURL(file) : null
        };
      }
      return item;
    });
    setData("galleries", newGallery);
  };
  const handleServiceFileChange = (id, file) => {
    const newService = data.services.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          file,
          path: file ? URL.createObjectURL(file) : null
        };
      }
      return item;
    });
    setData("services", newService);
  };
  const handleServiceDescriptionChange = (id, description) => {
    const newService = data.services.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          description
        };
      }
      return item;
    });
    setData("services", newService);
  };
  const handleServiceNameChange = (id, name) => {
    const newService = data.services.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          name
        };
      }
      return item;
    });
    setData("services", newService);
  };
  const handleDescriptionChange = (id, description) => {
    const newGallery = data.galleries.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          description
        };
      }
      return item;
    });
    setData("galleries", newGallery);
  };
  const addMoreItem = () => {
    setData("galleries", [...data.galleries, { id: crypto.randomUUID(), file: null, path: null, description: "" }]);
  };
  const addMoreServiceItem = () => {
    setData("services", [...data.services, { id: crypto.randomUUID(), file: null, name: "", path: null, description: "" }]);
  };
  const removeGalleryItem = (id) => {
    setData(
      "galleries",
      data.galleries.filter((item) => item.id !== id)
    );
  };
  const removeServiceItem = (id) => {
    setData(
      "services",
      data.services.filter((item) => item.id !== id)
    );
  };
  const removeGalleryFile = (id) => {
    setData(
      "galleries",
      data.galleries.map((item) => {
        if (item.id === id) {
          return { ...item, file: null, path: null };
        }
        return item;
      })
    );
  };
  const removeServiceFile = (id) => {
    setData(
      "services",
      data.services.map((item) => {
        if (item.id === id) {
          return { ...item, file: null, path: null };
        }
        return item;
      })
    );
  };
  const validItems = data.galleries.filter((item) => item.file && item.path);
  const ValidServiceItems = data.services.filter((item) => item.file && item.path);
  const handleFileChange = (field) => (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (field === "banner") {
      const newBanner = {
        file,
        path: file ? URL.createObjectURL(file) : null
      };
      setData("banner", newBanner);
    }
    if (field === "avatar") {
      const newAvatar = {
        file,
        path: file ? URL.createObjectURL(file) : null
      };
      setData("avatar", newAvatar);
    }
    if (field === "logo") {
      const newLogo = {
        file,
        path: file ? URL.createObjectURL(file) : null
      };
      setData("logo", newLogo);
    }
  };
  const submit = (event) => {
    event.preventDefault();
    console.log(data);
    post2(route("card.store"), {
      onSuccess: () => {
        console.log("Upload successful!");
      },
      onError: (errors2) => {
        console.log("Upload errors:", errors2);
      },
      preserveState: true,
      preserveScroll: true
    });
  };
  const removeFile = (field) => {
    if (field === "avatar") {
      setData("avatar", { file: null, path: null });
    } else if (field === "logo") {
      setData("logo", { file: null, path: null });
    } else if (field === "banner") {
      setData("banner", { file: null, path: null });
    }
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$8, children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "min-h-screen", children: [
      /* @__PURE__ */ jsx("div", { className: "m-2 flex flex-row justify-end rounded-lg border-2 p-2 shadow-none", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", type: "submit", className: "cursor-pointer bg-green-600 text-white", tabIndex: 5, disabled: processing, children: [
        processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        "Create Card"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "m-2 grid h-full flex-1 grid-cols-1 gap-4 rounded-xl border-none p-4 md:grid-cols-5", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-2 hidden h-[820px] rounded-lg border-none border-red-500 p-0 shadow-none md:block", children: /* @__PURE__ */ jsx(ScrollArea, { className: "h-[800px] cursor-pointer rounded-md border-1", children: /* @__PURE__ */ jsx(
          MuluCard,
          {
            url: data.url,
            avatar: data.avatar,
            logo: data.logo,
            first_name: data.first_name,
            last_name: data.last_name,
            organization: data.organization,
            job_title: data.job_title,
            phone: data.phone,
            email: data.email,
            banner_color: data.banner_color,
            links: data.links,
            address: data.address,
            location: data.location,
            headline: data.headline,
            galleries: validItems,
            services: ValidServiceItems,
            business_hours: data.business_hours,
            banner: data.banner
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-3 border-none p-2", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "display", children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "h- flex h-auto w-full flex-row flex-wrap justify-around", children: [
            /* @__PURE__ */ jsx(TabsTrigger, { value: "display", children: DisplayError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Display" }) : /* @__PURE__ */ jsx("span", { className: "", children: "Display" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "personal_information", children: personalInformationError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Information" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Information" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "links", children: linksError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Social Links" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Social Links" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "location", children: locationError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Location" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Location" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "business_hours", children: businessHoursError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Business Hours" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Business Hours" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "service", children: serviceError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Services" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Services" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "gallery", children: galleryError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Galleries" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Galleries" }) })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "display", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Display" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Make changes to your account here." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 rounded-xl border-2 px-2 py-4", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "avatar-upload", className: "text-sm font-medium text-black", children: "Upload Your Banner" }),
                data.banner.file ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800", children: [
                  /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: data.banner.file.name }),
                  /* @__PURE__ */ jsxs(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => removeFile("banner"), children: [
                    /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove file" })
                  ] })
                ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "banner-upload",
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: handleFileChange("banner")
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: () => {
                        var _a2;
                        return (_a2 = document.getElementById("banner-upload")) == null ? void 0 : _a2.click();
                      },
                      className: "flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
                        "Select Image"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors["banner.file"], className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 rounded-xl border-2 px-2 py-4", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "avatar-upload", className: "text-sm font-medium text-black", children: "Upload Your Avatar" }),
                data.avatar.file ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800", children: [
                  /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: data.avatar.file.name }),
                  /* @__PURE__ */ jsxs(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => removeFile("avatar"), children: [
                    /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove file" })
                  ] })
                ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "avatar-upload",
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: handleFileChange("avatar")
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: () => {
                        var _a2;
                        return (_a2 = document.getElementById("avatar-upload")) == null ? void 0 : _a2.click();
                      },
                      className: "flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
                        "Select Image"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors["avatar.file"], className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 rounded-xl border-2 px-2 py-4", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "avatar-upload", className: "text-sm font-medium text-black", children: "Upload Your Logo" }),
                data.logo.file ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800", children: [
                  /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: data.logo.file.name }),
                  /* @__PURE__ */ jsxs(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => removeFile("logo"), children: [
                    /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove file" })
                  ] })
                ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "logo-upload",
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: handleFileChange("logo")
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: () => {
                        var _a2;
                        return (_a2 = document.getElementById("logo-upload")) == null ? void 0 : _a2.click();
                      },
                      className: "flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
                        "Select Image"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors["logo.file"], className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-row flex-wrap gap-2 rounded-lg border-2 p-2", children: colors.map((color, index) => /* @__PURE__ */ jsx("div", { className: "cursor-pointer rounded-full border-2 p-2", children: /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "flex h-10 w-10 items-center justify-center rounded-full",
                  style: { backgroundColor: color },
                  onClick: () => setData("banner_color", color),
                  children: color === data.banner_color && /* @__PURE__ */ jsx(Check, { color: "white" })
                }
              ) }) }, index)) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "personal_information", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Personal" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Make changes to your account here." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "fname", children: "First Name" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "fname",
                      value: data.first_name,
                      onChange: (e) => setData("first_name", e.target.value),
                      disabled: processing
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.first_name, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "lname", children: "Last Name" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "lname",
                      value: data.last_name,
                      onChange: (e) => setData("last_name", e.target.value),
                      disabled: processing
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.last_name, className: "mt-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "organization", children: "Organization" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "organization",
                      value: data.organization,
                      onChange: (e) => setData("organization", e.target.value),
                      disabled: processing
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.organization, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "jobtitle", children: "Job Title" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "jobtitle",
                      value: data.job_title,
                      onChange: (e) => setData("job_title", e.target.value),
                      disabled: processing
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.job_title, className: "mt-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Phone" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "phone",
                      type: "tel",
                      value: data.phone,
                      onChange: (e) => setData("phone", e.target.value),
                      disabled: processing
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "email",
                      type: "email",
                      value: data.email,
                      onChange: (e) => setData("email", e.target.value),
                      disabled: processing
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    className: "h-30 w-full",
                    placeholder: "enter your headline text",
                    value: data.headline,
                    onChange: (e) => setData("headline", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.headline, className: "mt-2" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "links", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Links" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "add social media links." })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: data.links.map((link, index) => {
              const Icon2 = socialIconMap[link.name.toLowerCase()] || Globe;
              return /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-lg border-2 border-dashed p-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-md flex h-[50px] flex-row items-center gap-2 border-none px-4 font-bold", children: [
                  /* @__PURE__ */ jsx(Icon2, { className: "h-6 w-6" }),
                  link.name
                ] }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "url",
                    className: "h-[50px] w-full",
                    placeholder: link.placeholder,
                    value: link.url,
                    onChange: (e) => {
                      const updatedLinks = [...data.links];
                      updatedLinks[index] = { ...updatedLinks[index], url: e.target.value };
                      setData("links", updatedLinks);
                    },
                    disabled: processing
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors[`links.${index}.url`], className: "mt-2" })
              ] }, index);
            }) })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "location", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Location" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Enter your address and location details." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "address", children: "Address" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "address",
                    value: data.address,
                    onChange: (e) => setData("address", e.target.value),
                    disabled: processing
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.address, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "lname", children: "Location" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "location",
                    value: data.location,
                    onChange: (e) => setData("location", e.target.value),
                    disabled: processing
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.location, className: "mt-2" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "business_hours", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Business Hours" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Set the operating hours for your organization" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-6", children: data.business_hours.map((day, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(
                    Switch,
                    {
                      id: `${day.id}-toggle`,
                      checked: day.isOpen,
                      onCheckedChange: () => toggleDayOpen(day)
                    }
                  ),
                  /* @__PURE__ */ jsx(Label, { htmlFor: `${day.id}-toggle`, className: "text-lg font-medium", children: day.day })
                ] }),
                day.isOpen && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => copyToAllDays(day),
                    className: "flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4 md:hidden" }),
                      /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Apply to all days" })
                    ]
                  }
                ) })
              ] }),
              day.isOpen ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-2 md:flex-row", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "text-muted-foreground mr-2 hidden h-4 w-4 md:block" }),
                    /* @__PURE__ */ jsxs(
                      Select,
                      {
                        value: day.open,
                        onValueChange: (value) => updateTimeSlot(day, "open", value),
                        children: [
                          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[100px] md:w-[150px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Opening time" }) }),
                          /* @__PURE__ */ jsx(SelectContent, { children: timeOptions.map((time) => /* @__PURE__ */ jsx(SelectItem, { value: time, children: time }, `open-${time}`)) })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "to" }),
                  /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(
                    Select,
                    {
                      value: day.close,
                      onValueChange: (value) => updateTimeSlot(day, "close", value),
                      children: [
                        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[100px] md:w-[150px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Closing time" }) }),
                        /* @__PURE__ */ jsx(SelectContent, { children: timeOptions.map((time) => /* @__PURE__ */ jsx(SelectItem, { value: time, children: time }, `open-${time}`)) })
                      ]
                    }
                  ) })
                ] }),
                errors[`business_hours.${index}.open`] && errors[`business_hours.${index}.close`] ? /* @__PURE__ */ jsx(
                  InputError,
                  {
                    message: `please select both opening and closing time for ${day.day}`,
                    className: "mt-2"
                  }
                ) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  errors[`business_hours.${index}.open`] && /* @__PURE__ */ jsx(
                    InputError,
                    {
                      message: errors[`business_hours.${index}.open`],
                      className: "mt-2"
                    }
                  ),
                  errors[`business_hours.${index}.close`] && /* @__PURE__ */ jsx(
                    InputError,
                    {
                      message: errors[`business_hours.${index}.close`],
                      className: "mt-2"
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ jsx("div", { className: "text-muted-foreground italic", children: "Closed" })
            ] }, day.id)) })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "service", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Service" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "add all service" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              data.services.map((item, index) => /* @__PURE__ */ jsx(Card, { className: "relative", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "absolute top-2 right-2",
                    onClick: () => removeServiceItem(item.id),
                    children: [
                      /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }),
                      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                    item.file ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800", children: [
                      /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: item.file.name }),
                      /* @__PURE__ */ jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "ghost",
                          size: "icon",
                          onClick: () => removeServiceFile(item.id),
                          children: [
                            /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove file" })
                          ]
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: `image-${item.id}`,
                          type: "file",
                          accept: "image/*",
                          className: "hidden",
                          onChange: (e) => {
                            var _a2;
                            const file = ((_a2 = e.target.files) == null ? void 0 : _a2[0]) || null;
                            handleServiceFileChange(item.id, file);
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          onClick: () => {
                            var _a2;
                            return (_a2 = document.getElementById(`image-${item.id}`)) == null ? void 0 : _a2.click();
                          },
                          className: "flex items-center gap-2",
                          children: [
                            /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
                            "Select Image"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(
                      InputError,
                      {
                        message: errors[`services.${index}.file`],
                        className: "mt-2"
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "mb-2 block", children: "Name" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "name",
                        placeholder: "name",
                        value: item.name,
                        onChange: (e) => handleServiceNameChange(item.id, e.target.value)
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      InputError,
                      {
                        message: errors[`services.${index}.name`],
                        className: "mt-2"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: `description-${item.id}`, className: "mb-2 block", children: "Description" }),
                    /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        id: `description-${item.id}`,
                        placeholder: "Enter a description for this image",
                        value: item.description,
                        onChange: (e) => handleServiceDescriptionChange(item.id, e.target.value),
                        className: "min-h-24"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      InputError,
                      {
                        message: errors[`services.${index}.description`],
                        className: "mt-2"
                      }
                    )
                  ] })
                ] })
              ] }) }, item.id)),
              data.services.length >= serviceLimit && /* @__PURE__ */ jsx(
                InputError,
                {
                  message: errors.services,
                  className: "mt-2"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row", children: [
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: addMoreServiceItem,
                    className: "flex items-center gap-2",
                    disabled: data.services.length >= serviceLimit,
                    children: [
                      /* @__PURE__ */ jsx(PlusCircle, { className: "h-5 w-5" }),
                      "Add More"
                    ]
                  }
                ),
                data.services.length >= serviceLimit && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-yellow-600", children: [
                  /* @__PURE__ */ jsx(ShieldAlert, { className: "h-8 w-8" }),
                  /* @__PURE__ */ jsx("span", { children: "Service limit reached. Upgrade your plan to add more services." })
                ] })
              ] })
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "gallery", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Gallery" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "enter your pictures" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              data.galleries.map((item, index) => /* @__PURE__ */ jsx(Card, { className: "relative", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "absolute top-2 right-2",
                    onClick: () => removeGalleryItem(item.id),
                    children: [
                      /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }),
                      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs(Label, { htmlFor: `image-${item.id}`, className: "mb-2 block", children: [
                      "Image ",
                      index + 1
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: item.file ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800", children: [
                      /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: item.file.name }),
                      /* @__PURE__ */ jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "ghost",
                          size: "icon",
                          onClick: () => removeGalleryFile(item.id),
                          children: [
                            /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove file" })
                          ]
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: `image-${item.id}`,
                          type: "file",
                          accept: "image/*",
                          className: "hidden",
                          onChange: (e) => {
                            var _a2;
                            const file = ((_a2 = e.target.files) == null ? void 0 : _a2[0]) || null;
                            handleGalleryFileChange(item.id, file);
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          onClick: () => {
                            var _a2;
                            return (_a2 = document.getElementById(`image-${item.id}`)) == null ? void 0 : _a2.click();
                          },
                          className: "flex items-center gap-2",
                          children: [
                            /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
                            "Select Image"
                          ]
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsx(
                      InputError,
                      {
                        message: errors[`galleries.${index}.file`],
                        className: "mt-2"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: `description-${item.id}`, className: "mb-2 block", children: "Description" }),
                    /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        id: `description-${item.id}`,
                        placeholder: "Enter a description for this image",
                        value: item.description,
                        onChange: (e) => handleDescriptionChange(item.id, e.target.value),
                        className: "min-h-24"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      InputError,
                      {
                        message: errors[`galleries.${index}.description`],
                        className: "mt-2"
                      }
                    )
                  ] })
                ] })
              ] }) }, item.id)),
              data.galleries.length >= galleryLimit && /* @__PURE__ */ jsx(
                InputError,
                {
                  message: errors.galleries,
                  className: "mt-2"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row", children: [
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: addMoreItem,
                    className: "flex items-center gap-2",
                    disabled: data.galleries.length >= galleryLimit,
                    children: [
                      /* @__PURE__ */ jsx(PlusCircle, { className: "h-5 w-5" }),
                      "Add More"
                    ]
                  }
                ),
                data.galleries.length >= galleryLimit && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-yellow-600", children: [
                  /* @__PURE__ */ jsx(ShieldAlert, { className: "h-6 w-6" }),
                  /* @__PURE__ */ jsx("span", { children: "Gallery limit reached. Upgrade your plan to add more images." })
                ] })
              ] })
            ] }) })
          ] }) })
        ] }) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateCard
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$7 = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Edit Card", href: "" }
];
function EditCard({ card }) {
  var _a, _b, _c, _d;
  const props = usePage().props;
  const auth = props.auth;
  const activePlan = auth.activePlan;
  const serviceLimit = ((_a = activePlan == null ? void 0 : activePlan.plan) == null ? void 0 : _a.number_of_service) ?? 0;
  const galleryLimit = ((_b = activePlan == null ? void 0 : activePlan.plan) == null ? void 0 : _b.number_of_gallery) ?? 0;
  const cardSocialLinks = props.cardSocialLinks;
  const existingLinksMap = new Map(
    (card.links || []).map((link) => [link.name, link.url])
  );
  const links = cardSocialLinks.map((linkName) => ({
    name: linkName,
    url: existingLinksMap.get(linkName) || "",
    placeholder: `https://${linkName.toLowerCase()}.com/your-profile`
  }));
  const colors = ["#3a59ae", "#a580e5", "#6dd3c7", "#3bb55d", "#ffc631", "#ff8c39", "#ea3a2e", "#ee85dd", "#4a4a4a"];
  console.log(card);
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  const { data, setData, post: post2, processing, errors } = useForm({
    banner: card.banner,
    avatar: card.avatar,
    logo: card.logo,
    first_name: card.first_name,
    last_name: card.last_name,
    organization: card.organization,
    job_title: card.job_title,
    email: card.email,
    phone: card.phone,
    banner_color: card.banner_color,
    links,
    location: card.location,
    address: card.address,
    headline: card.headline,
    galleries: ((_c = card.galleries) == null ? void 0 : _c.length) > 0 ? card.galleries : [],
    services: ((_d = card.services) == null ? void 0 : _d.length) > 0 ? card.services : [],
    business_hours: card.business_hours
  });
  const hasTabError = (prefixes, errors2) => {
    return Object.keys(errors2).some(
      (key) => prefixes.some((prefix) => key.startsWith(prefix))
    );
  };
  const DisplayError = hasTabError(["avatar.file", "banner.file", "logo.file"], errors);
  const personalInformationError = hasTabError(
    ["first_name", "last_name", "organization", "job_title", "email", "phone", "headline"],
    errors
  );
  const linksError = hasTabError(
    ["links.0", "links.1", "links.2", "links.3", "links.4", "links.5"],
    errors
  );
  const locationError = hasTabError(["address", "location"], errors);
  const galleryError = hasTabError(["galleries.0", "galleries.1", "galleries.2"], errors);
  const serviceError = hasTabError(["services.0", "services.1", "services.2"], errors);
  const businessHoursError = hasTabError(["business_hours.0", "business_hours.1", "business_hours.2"], errors);
  const copyToAllDays = (day) => {
    const updatedSchedule = data.business_hours.map((item) => ({
      ...item,
      open: day.open,
      close: day.close
    }));
    setData("business_hours", updatedSchedule);
  };
  const updateTimeSlot = (day, field, value) => {
    const updatedSchedule = data.business_hours.map((item) => {
      if (item.id === day.id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setData("business_hours", updatedSchedule);
  };
  const toggleDayOpen = (day) => {
    const updatedSchedule = data.business_hours.map((item) => {
      if (item.id === day.id) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });
    setData("business_hours", updatedSchedule);
  };
  const handleGalleryFileChange = (id, file) => {
    const newGallery = data.galleries.map((item) => {
      if (item.id === id) {
        return { ...item, file, path: file ? URL.createObjectURL(file) : null };
      }
      return item;
    });
    setData("galleries", newGallery);
  };
  const handleServiceFileChange = (id, file) => {
    const newService = data.services.map((item) => {
      if (item.id === id) {
        return { ...item, file, path: file ? URL.createObjectURL(file) : null };
      }
      return item;
    });
    console.log(newService);
    setData("services", newService);
  };
  const handleServiceDescriptionChange = (id, description) => {
    const newService = data.services.map((item) => {
      if (item.id === id) {
        return { ...item, description };
      }
      return item;
    });
    setData("services", newService);
  };
  const handleServiceNameChange = (id, name) => {
    const newService = data.services.map((item) => {
      if (item.id === id) {
        return { ...item, name };
      }
      return item;
    });
    setData("services", newService);
  };
  const handleDescriptionChange = (id, description) => {
    const newGallery = data.galleries.map((item) => {
      if (item.id === id) {
        return { ...item, description };
      }
      return item;
    });
    setData("galleries", newGallery);
  };
  const addMoreItem = () => {
    setData("galleries", [...data.galleries, { id: crypto.randomUUID(), file: null, path: null, description: "" }]);
  };
  const addMoreServiceItem = () => {
    setData("services", [...data.services, { id: crypto.randomUUID(), file: null, path: null, name: "", description: "" }]);
  };
  const removeGalleryItem = (id) => {
    setData(
      "galleries",
      data.galleries.filter((item) => item.id !== id)
    );
  };
  const removeServiceItem = (id) => {
    setData(
      "services",
      data.services.filter((item) => item.id !== id)
    );
  };
  const removeGalleryFile = (id) => {
    setData(
      "galleries",
      data.galleries.map((item) => {
        if (item.id === id) {
          return { ...item, file: null, path: null };
        }
        return item;
      })
    );
  };
  const removeServiceFile = (id) => {
    setData(
      "services",
      data.services.map((item) => {
        if (item.id === id) {
          return { ...item, file: null, path: null };
        }
        return item;
      })
    );
  };
  const handleFileChange = (field) => (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (file) {
      setData(field, { file, path: URL.createObjectURL(file) });
    }
  };
  const submit = (event) => {
    event.preventDefault();
    post2(route("card.update", card.id), {
      onSuccess: () => {
        toast.success("Card updated successfully!");
      },
      onError: (errors2) => {
        toast.error("Failed to update card. Please check the form for errors.");
        console.log("Update errors:", errors2);
      },
      preserveState: true,
      preserveScroll: true
    });
  };
  const removeFile = (field) => {
    setData(field, { file: null, path: null });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$7, children: [
    /* @__PURE__ */ jsx(Head, { title: "Edit Card" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "min-h-screen", children: [
      /* @__PURE__ */ jsxs("div", { className: "m-2 flex flex-row justify-between rounded-lg border-2 p-2 shadow-none", children: [
        /* @__PURE__ */ jsx(Link, { className: "cursor-pointer bg-red-300  rounded-sm px-4  py-1 text-black", href: route("card.show", card.id), children: "Cancel" }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", type: "submit", className: "cursor-pointer bg-green-600 text-white", disabled: processing, children: [
          processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Update Card"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "m-2 grid h-full flex-1 grid-cols-1 gap-4 rounded-xl border-none p-4 md:grid-cols-5", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-2 hidden h-[820px] rounded-lg border-none border-red-500 p-0 shadow-none md:block", children: /* @__PURE__ */ jsx(ScrollArea, { className: "h-[800px] cursor-pointer rounded-md border-1", children: /* @__PURE__ */ jsx(
          MuluCard,
          {
            avatar: data.avatar,
            logo: data.logo,
            first_name: data.first_name,
            last_name: data.last_name,
            organization: data.organization,
            job_title: data.job_title,
            phone: data.phone,
            email: data.email,
            banner_color: data.banner_color,
            links: data.links,
            address: data.address,
            location: data.location,
            headline: data.headline,
            galleries: data.galleries,
            services: data.services,
            business_hours: data.business_hours,
            banner: data.banner,
            url: data.url
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-3 border-none p-2", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "display", children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "flex h-auto w-full flex-row flex-wrap justify-around", children: [
            /* @__PURE__ */ jsx(TabsTrigger, { value: "display", children: DisplayError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Display" }) : /* @__PURE__ */ jsx("span", { className: "", children: "Display" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "personal_information", children: personalInformationError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Information" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Information" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "links", children: linksError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Social Links" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Social Links" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "location", children: locationError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Location" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Location" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "business_hours", children: businessHoursError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Business Hours" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Business Hours" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "service", children: serviceError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Services" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Services" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "gallery", children: galleryError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Galleries" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Galleries" }) })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "display", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Display" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Update your display settings here." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 rounded-xl border-2 px-2 py-4", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "banner-upload", className: "text-sm font-medium text-black", children: "Upload Your Banner" }),
                data.banner.path ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800", children: [
                  /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: data.banner.path.split("/").pop() || "Existing Banner" }),
                  /* @__PURE__ */ jsxs(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => removeFile("banner"), children: [
                    /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove file" })
                  ] })
                ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "banner-upload",
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: handleFileChange("banner")
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: () => {
                        var _a2;
                        return (_a2 = document.getElementById("banner-upload")) == null ? void 0 : _a2.click();
                      },
                      className: "flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
                        "Select Image"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors["banner.file"] || errors["banner.path"], className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 rounded-xl border-2 px-2 py-4", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "avatar-upload", className: "text-sm font-medium text-black", children: "Upload Your Avatar" }),
                data.avatar.path ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800", children: [
                  /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: data.avatar.path.split("/").pop() || "Existing Avatar" }),
                  /* @__PURE__ */ jsxs(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => removeFile("avatar"), children: [
                    /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove file" })
                  ] })
                ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "avatar-upload",
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: handleFileChange("avatar")
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: () => {
                        var _a2;
                        return (_a2 = document.getElementById("avatar-upload")) == null ? void 0 : _a2.click();
                      },
                      className: "flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
                        "Select Image"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors["avatar.file"] || errors["avatar.path"], className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 rounded-xl border-2 px-2 py-4", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "logo-upload", className: "text-sm font-medium text-black", children: "Upload Your Logo" }),
                data.logo.path ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800", children: [
                  /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: data.logo.path.split("/").pop() || "Existing Logo" }),
                  /* @__PURE__ */ jsxs(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => removeFile("logo"), children: [
                    /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove file" })
                  ] })
                ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "logo-upload",
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: handleFileChange("logo")
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: () => {
                        var _a2;
                        return (_a2 = document.getElementById("logo-upload")) == null ? void 0 : _a2.click();
                      },
                      className: "flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
                        "Select Image"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors["logo.file"] || errors["logo.path"], className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-row flex-wrap gap-2 rounded-lg border-2 p-2", children: colors.map((color, index) => /* @__PURE__ */ jsx("div", { className: "cursor-pointer rounded-full border-2 p-2", children: /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "flex h-10 w-10 items-center justify-center rounded-full",
                  style: { backgroundColor: color },
                  onClick: () => setData("banner_color", color),
                  children: color === data.banner_color && /* @__PURE__ */ jsx(Check, { color: "white" })
                }
              ) }) }, index)) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "personal_information", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Personal" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Update your personal information here." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "fname", children: "First Name" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "fname",
                      value: data.first_name,
                      onChange: (e) => setData("first_name", e.target.value),
                      disabled: processing
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.first_name, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "lname", children: "Last Name" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "lname",
                      value: data.last_name,
                      onChange: (e) => setData("last_name", e.target.value),
                      disabled: processing
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.last_name, className: "mt-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "organization", children: "Organization" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "organization",
                      value: data.organization,
                      onChange: (e) => setData("organization", e.target.value),
                      disabled: processing
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.organization, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "jobtitle", children: "Job Title" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "jobtitle",
                      value: data.job_title,
                      onChange: (e) => setData("job_title", e.target.value),
                      disabled: processing
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.job_title, className: "mt-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Phone" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "phone",
                      type: "tel",
                      value: data.phone,
                      onChange: (e) => setData("phone", e.target.value),
                      disabled: processing
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "email",
                      type: "email",
                      value: data.email,
                      onChange: (e) => setData("email", e.target.value),
                      disabled: processing
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "headline", children: "Headline" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: "headline",
                    className: "h-30 w-full",
                    placeholder: "Enter your headline text",
                    value: data.headline,
                    onChange: (e) => setData("headline", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.headline, className: "mt-2" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "links", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Links" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Update your social media links." })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: data.links.map((link, index) => {
              const Icon2 = socialIconMap[link.name.toLowerCase()] || null;
              return /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-lg border-2 border-dashed p-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-md flex h-[50px] flex-row items-center gap-2 border-none px-4 font-bold", children: [
                  Icon2 && /* @__PURE__ */ jsx(Icon2, { className: "h-6 w-6" }),
                  link.name
                ] }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "url",
                    className: "h-[50px] w-full",
                    placeholder: link.placeholder,
                    value: link.url,
                    onChange: (e) => {
                      const updatedLinks = [...data.links];
                      updatedLinks[index] = { ...updatedLinks[index], url: e.target.value };
                      setData("links", updatedLinks);
                    },
                    disabled: processing
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors[`links.${index}.url`], className: "mt-2" })
              ] }, index);
            }) })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "location", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Location" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Update your address and location details." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "address", children: "Address" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "address",
                    value: data.address,
                    onChange: (e) => setData("address", e.target.value),
                    disabled: processing
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.address, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "location", children: "Location" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "location",
                    value: data.location,
                    onChange: (e) => setData("location", e.target.value),
                    disabled: processing
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.location, className: "mt-2" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "business_hours", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Business Hours" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Update the operating hours for your organization." })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-6", children: data.business_hours.map((day, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(
                    Switch,
                    {
                      id: `${day.id}-toggle`,
                      checked: day.isOpen,
                      onCheckedChange: () => toggleDayOpen(day)
                    }
                  ),
                  /* @__PURE__ */ jsx(Label, { htmlFor: `${day.id}-toggle`, className: "text-lg font-medium", children: day.day })
                ] }),
                day.isOpen && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => copyToAllDays(day),
                    className: "flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4 md:hidden" }),
                      /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Apply to all days" })
                    ]
                  }
                ) })
              ] }),
              day.isOpen ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-2 md:flex-row", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "text-muted-foreground mr-2 hidden h-4 w-4 md:block" }),
                    /* @__PURE__ */ jsxs(
                      Select,
                      {
                        value: day.open,
                        onValueChange: (value) => updateTimeSlot(day, "open", value),
                        children: [
                          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[100px] md:w-[150px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Opening time" }) }),
                          /* @__PURE__ */ jsx(SelectContent, { children: timeOptions.map((time) => /* @__PURE__ */ jsx(SelectItem, { value: time, children: time }, `open-${time}`)) })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "to" }),
                  /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(
                    Select,
                    {
                      value: day.close,
                      onValueChange: (value) => updateTimeSlot(day, "close", value),
                      children: [
                        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[100px] md:w-[150px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Closing time" }) }),
                        /* @__PURE__ */ jsx(SelectContent, { children: timeOptions.map((time) => /* @__PURE__ */ jsx(SelectItem, { value: time, children: time }, `close-${time}`)) })
                      ]
                    }
                  ) })
                ] }),
                errors[`business_hours.${index}.open`] && errors[`business_hours.${index}.close`] ? /* @__PURE__ */ jsx(
                  InputError,
                  {
                    message: `Please select both opening and closing time for ${day.day}`,
                    className: "mt-2"
                  }
                ) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  errors[`business_hours.${index}.open`] && /* @__PURE__ */ jsx(InputError, { message: errors[`business_hours.${index}.open`], className: "mt-2" }),
                  errors[`business_hours.${index}.close`] && /* @__PURE__ */ jsx(InputError, { message: errors[`business_hours.${index}.close`], className: "mt-2" })
                ] })
              ] }) : /* @__PURE__ */ jsx("div", { className: "text-muted-foreground italic", children: "Closed" })
            ] }, day.id)) })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "service", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Services" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Update your services." })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              data.services.map((item, index) => /* @__PURE__ */ jsx(Card, { className: "relative", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "absolute top-2 right-2",
                    onClick: () => removeServiceItem(item.id),
                    children: [
                      /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }),
                      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                    item.path ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800", children: [
                      /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: item.path.split("/").pop() }),
                      /* @__PURE__ */ jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "ghost",
                          size: "icon",
                          onClick: () => removeServiceFile(item.id),
                          children: [
                            /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove file" })
                          ]
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: `image-${item.id}`,
                          type: "file",
                          accept: "image/*",
                          className: "hidden",
                          onChange: (e) => {
                            var _a2;
                            const file = ((_a2 = e.target.files) == null ? void 0 : _a2[0]) || null;
                            handleServiceFileChange(item.id, file);
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          onClick: () => {
                            var _a2;
                            return (_a2 = document.getElementById(`image-${item.id}`)) == null ? void 0 : _a2.click();
                          },
                          className: "flex items-center gap-2",
                          children: [
                            /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
                            "Select Image"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(InputError, { message: errors[`services.${index}.file`] || errors[`services.${index}.path`], className: "mt-2" })
                  ] }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: `name-${item.id}`, className: "mb-2 block", children: "Name" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: `name-${item.id}`,
                        placeholder: "Name",
                        value: item.name,
                        onChange: (e) => handleServiceNameChange(item.id, e.target.value)
                      }
                    ),
                    /* @__PURE__ */ jsx(InputError, { message: errors[`services.${index}.name`], className: "mt-2" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: `description-${item.id}`, className: "mb-2 block", children: "Description" }),
                    /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        id: `description-${item.id}`,
                        placeholder: "Enter a description for this service",
                        value: item.description,
                        onChange: (e) => handleServiceDescriptionChange(item.id, e.target.value),
                        className: "min-h-24"
                      }
                    ),
                    /* @__PURE__ */ jsx(InputError, { message: errors[`services.${index}.description`], className: "mt-2" })
                  ] })
                ] })
              ] }) }, item.id)),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row", children: [
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: addMoreServiceItem,
                    className: "flex items-center gap-2",
                    disabled: data.services.length >= serviceLimit,
                    children: [
                      /* @__PURE__ */ jsx(PlusCircle, { className: "h-5 w-5" }),
                      "Add More"
                    ]
                  }
                ),
                data.services.length >= serviceLimit && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-yellow-600", children: [
                  /* @__PURE__ */ jsx(ShieldAlert, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("span", { children: "Service limit reached. Upgrade your plan to add more services." })
                ] })
              ] })
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "gallery", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Galleries" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Update your gallery images and descriptions." })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              data.galleries.map((item, index) => /* @__PURE__ */ jsx(Card, { className: "relative", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "absolute top-2 right-2",
                    onClick: () => removeGalleryItem(item.id),
                    children: [
                      /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }),
                      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs(Label, { htmlFor: `image-${item.id}`, className: "mb-2 block", children: [
                      "Image ",
                      index + 1
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: item.path ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800", children: [
                      /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: item.file instanceof File ? item.file.name : "Existing Image" }),
                      /* @__PURE__ */ jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "ghost",
                          size: "icon",
                          onClick: () => removeGalleryFile(item.id),
                          children: [
                            /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove file" })
                          ]
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          id: `image-${item.id}`,
                          type: "file",
                          accept: "image/*",
                          className: "hidden",
                          onChange: (e) => {
                            var _a2;
                            const file = ((_a2 = e.target.files) == null ? void 0 : _a2[0]) || null;
                            handleGalleryFileChange(item.id, file);
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          onClick: () => {
                            var _a2;
                            return (_a2 = document.getElementById(`image-${item.id}`)) == null ? void 0 : _a2.click();
                          },
                          className: "flex items-center gap-2",
                          children: [
                            /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
                            "Select Image"
                          ]
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsx(InputError, { message: errors[`galleries.${index}.file`] || errors[`galleries.${index}.path`], className: "mt-2" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: `description-${item.id}`, className: "mb-2 block", children: "Description" }),
                    /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        id: `description-${item.id}`,
                        placeholder: "Enter a description for this image",
                        value: item.description,
                        onChange: (e) => handleDescriptionChange(item.id, e.target.value),
                        className: "min-h-24"
                      }
                    ),
                    /* @__PURE__ */ jsx(InputError, { message: errors[`galleries.${index}.description`], className: "mt-2" })
                  ] })
                ] })
              ] }) }, item.id)),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row", children: [
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: addMoreItem,
                    className: "flex items-center gap-2",
                    disabled: data.galleries.length >= galleryLimit,
                    children: [
                      /* @__PURE__ */ jsx(PlusCircle, { className: "h-5 w-5" }),
                      "Add More"
                    ]
                  }
                ),
                data.galleries.length >= galleryLimit && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-yellow-600", children: [
                  /* @__PURE__ */ jsx(ShieldAlert, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("span", { children: "Gallery limit reached. Upgrade your plan to add more images." })
                ] })
              ] })
            ] }) })
          ] }) })
        ] }) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditCard
}, Symbol.toStringTag, { value: "Module" }));
function NFCCardPreview({ logo, brandColor, qrcode }) {
  const [activeTab, setActiveTab] = useState("front");
  return /* @__PURE__ */ jsxs(Tabs, { defaultValue: "front", onValueChange: (Value2) => setActiveTab(Value2), children: [
    /* @__PURE__ */ jsxs(TabsList, { className: "grid grid-cols-2 mb-6", children: [
      /* @__PURE__ */ jsx(TabsTrigger, { value: "front", children: "Front Side" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "back", children: "Back Side" })
    ] }),
    /* @__PURE__ */ jsx(TabsContent$1, { value: "front", className: "flex justify-center items-center p-2", children: /* @__PURE__ */ jsx("div", { className: "w-[400px] h-[200px] md:w-[600px] md:h-[300px] flex items-center justify-center  rounded-lg border-none", style: { backgroundColor: brandColor }, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: logo.path,
        alt: "",
        className: "w-[100px] h-[100px] md:w-[250px] md:h-[250px] rounded-md overflow-hidden flex items-center justify-center border-4 object-contain",
        style: {
          borderColor: brandColor
        }
      }
    ) }) }),
    /* @__PURE__ */ jsx(TabsContent$1, { value: "back", className: "flex justify-center items-center", children: /* @__PURE__ */ jsxs("div", { className: "w-[400px] h-[200px] md:w-[600px] md:h-[300px] grid grid-cols-4 rounded-lg border-none p-1 gap-2", style: { backgroundColor: brandColor }, children: [
      /* @__PURE__ */ jsx("div", { className: "col-span-3 border-none border-red-400 flex justify-center items-center", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: `/storage/${qrcode}`,
          alt: "",
          className: "w-[100px] h-[100px] md:w-[250px] md:h-[250px] border-4 border-yellow-400 rounded-md  flex items-center justify-center object-contain",
          style: {
            borderColor: brandColor
          }
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 border-none flex justify-end", children: /* @__PURE__ */ jsx(Wifi, { size: 80, color: "white" }) })
    ] }) })
  ] });
}
const breadcrumbs$6 = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  { title: "Show Card", href: "" }
];
function ShowCard() {
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("share");
  const { props } = usePage();
  const card = props.card;
  console.log(card);
  const { data, setData, get, errors, reset } = useForm({
    personalizedurl: card.url.split("/").pop(),
    cardname: card.cardname,
    status: card.status
  });
  const DownloadQRCode = () => {
    const link = document.createElement("a");
    link.href = `/storage/${card == null ? void 0 : card.qr_code}`;
    link.download = "qr_code.png";
    link.click();
  };
  const EditCard2 = () => {
    console.log(card);
    router.get(route("card.edit", { id: card == null ? void 0 : card.id }));
  };
  const settings = (event) => {
    event.preventDefault();
    const hasChanges = [
      data.personalizedurl !== card.url,
      data.cardname !== card.cardname,
      data.status !== card.status
    ].some(Boolean);
    if (!hasChanges) {
      toast.info("No changes to save");
      return;
    }
    post(route("card.settings", { id: card.id }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Card updated successfully");
      },
      onError: (errors2) => {
        toast.error("Failed to update card settings");
        console.error("Update errors:", errors2);
      }
    });
  };
  const deleteCard = () => {
    get(route("card.delete", { id: card.id }), {
      onFinish: () => {
        reset();
        toast.success("Card has been deleted");
      },
      onSuccess: () => {
        console.log("Upload successful!");
        toast.success("Card has been deleted successfully");
      },
      onError: (errors2) => {
        console.log("Upload errors:", errors2);
      }
    });
  };
  const handleCopy = async () => {
    try {
      const linkToCopy = card.url;
      await navigator.clipboard.writeText(linkToCopy);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2e3);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$6, children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "grid h-full flex-1 grid-cols-1 gap-2 rounded-xl border-none p-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsx("div", { className: "col-span-1 hidden rounded-sm border-2 p-0 md:block", children: /* @__PURE__ */ jsx(ScrollArea, { className: "h-[800px] pr-2", children: /* @__PURE__ */ jsx(
        MuluCard,
        {
          url: card == null ? void 0 : card.url,
          avatar: card == null ? void 0 : card.avatar,
          logo: card == null ? void 0 : card.logo,
          first_name: card == null ? void 0 : card.first_name,
          last_name: card == null ? void 0 : card.last_name,
          organization: card == null ? void 0 : card.organization,
          job_title: card == null ? void 0 : card.job_title,
          phone: card == null ? void 0 : card.phone,
          email: card == null ? void 0 : card.email,
          banner_color: card == null ? void 0 : card.banner_color,
          links: card.links,
          address: card == null ? void 0 : card.address,
          location: card == null ? void 0 : card.location,
          headline: card == null ? void 0 : card.headline,
          services: card == null ? void 0 : card.services,
          galleries: card == null ? void 0 : card.galleries,
          business_hours: card.business_hours,
          banner: card == null ? void 0 : card.banner
        }
      ) }) }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-2 flex flex-col justify-between rounded-lg border-none p-4", children: [
        /* @__PURE__ */ jsxs(Tabs, { defaultValue: "share", className: "w-full", onValueChange: (value) => setActiveTab(value), children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "flex h-24 w-full flex-row justify-between px-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-x-4", children: [
              /* @__PURE__ */ jsx(TabsTrigger, { value: "share", className: "font-bold", children: "Share" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "settings", className: "font-bold", children: "Settings" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "nfc", className: "font-bold", children: "NFC Card" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-4", children: [
              activeTab === "share" && /* @__PURE__ */ jsx(Button, { variant: "outline", className: "cursor-pointer", onClick: () => DownloadQRCode(), children: /* @__PURE__ */ jsx(Download, { size: 100 }) }),
              /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "cursor-pointer bg-green-600 hover:bg-green-800", onClick: () => EditCard2(), children: [
                /* @__PURE__ */ jsx(Edit, { size: 100, color: "white" }),
                /* @__PURE__ */ jsx("span", { className: "text-white capitalize", children: " Edit" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "share", className: "border-none", children: /* @__PURE__ */ jsxs(Card, { className: "shadow-none", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 rounded-sm border-none p-2 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs(Card, { className: "flex flex-col items-center justify-center shadow-none", children: [
                /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold capitalize", children: "TOTAL VIEWS" }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-extrabold", children: card.total_views })
              ] }),
              /* @__PURE__ */ jsxs(Card, { className: "flex flex-col items-center justify-center shadow-none", children: [
                /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold capitalize", children: "TOTAL SAVES" }),
                /* @__PURE__ */ jsx("p", { className: "text-xl font-extrabold", children: card.total_saves })
              ] })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 rounded-3xl border-none p-4 md:grid-cols-2", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center rounded-lg border-2 p-4", children: /* @__PURE__ */ jsx("div", { className: "h-full w-full rounded-3xl border-4 border-gray-500 p-4", children: /* @__PURE__ */ jsx("img", { src: `/storage/${card == null ? void 0 : card.qr_code}`, alt: "", className: "h-full w-full object-cover" }) }) }),
              /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center rounded-lg border-2 p-4", children: /* @__PURE__ */ jsxs(
                Button,
                {
                  className: "w-full cursor-pointer rounded-xl border-4 p-2 py-8",
                  variant: "outline",
                  onClick: handleCopy,
                  children: [
                    isCopied ? /* @__PURE__ */ jsx(Check, { size: 100, className: "text-green-500" }) : /* @__PURE__ */ jsx(Copy, { size: 100 }),
                    /* @__PURE__ */ jsx("span", { className: "text-lg font-extrabold text-black capitalize", children: isCopied ? "copied!" : "copy link" })
                  ]
                }
              ) })
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "settings", children: /* @__PURE__ */ jsxs(Card, { className: "shadow-none", children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Settings" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Edit the details of this card." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-lg border-2 border-dashed border-gray-400 p-4", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "personalized", children: "Personalized URL" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "personalized",
                    type: "text",
                    name: "personalized_url",
                    value: data.personalizedurl,
                    onChange: (e) => setData("personalizedurl", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-normal text-sm", children: route("card.hello", { url: data.personalizedurl == "" ? card.url : data.personalizedurl }) }),
                /* @__PURE__ */ jsx(InputError, { message: errors.personalizedurl, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-lg border-2 border-dashed border-gray-400 p-4", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "cardname", children: "Card Name" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "cardname",
                    type: "text",
                    name: "cardname",
                    value: data.cardname,
                    onChange: (e) => setData("cardname", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.cardname, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2 rounded-lg border-2 border-gray-400 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(
                  Switch,
                  {
                    id: "airplane-mode",
                    className: `${data.status ? "bg-green-500" : "bg-red-500"} hover:bg-green-400 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500`,
                    checked: data.status,
                    onCheckedChange: (v) => setData("status", v)
                  }
                ),
                /* @__PURE__ */ jsx(Label, { htmlFor: "airplane-mode", className: data.status ? "text-green-700" : "text-red-700", children: data.status ? "Card is active and visible" : "Card is currently disabled" })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-between rounded-lg border-2 border-red-400 bg-red-50 px-4 py-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-extrabold", children: "Delete" }),
                  /* @__PURE__ */ jsx("p", { className: "text-mute font-normal", children: "Delete this card permanently." })
                ] }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "cursor-pointer border-2 border-red-400 font-extrabold text-red-500 hover:text-red-700",
                    onClick: () => deleteCard(),
                    children: "Delete Card"
                  }
                )
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "nfc", children: /* @__PURE__ */ jsxs(Card, { className: "shadow-none", children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "NFC Card" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "NFC card preview" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-8", children: /* @__PURE__ */ jsx(
              NFCCardPreview,
              {
                logo: card == null ? void 0 : card.logo,
                brandColor: card == null ? void 0 : card.banner_color,
                qrcode: card == null ? void 0 : card.qr_code,
                side: "front"
              }
            ) })
          ] }) })
        ] }),
        activeTab === "settings" && /* @__PURE__ */ jsx(
          "form",
          {
            onSubmit: settings,
            className: "-mx-4 mt-2 -mb-4 flex flex-row justify-end rounded-xl border-2 bg-gray-50 p-2 shadow-none",
            children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: "border-green-400 bg-green-400 hover:border-green-600 hover:bg-green-600", children: "Save" })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ShowCard
}, Symbol.toStringTag, { value: "Module" }));
const BankLogo = ({ bankName }) => {
  const getBankColor = (name) => {
    const banks = {
      Chase: "bg-blue-500",
      "Bank of America": "bg-red-600",
      "Wells Fargo": "bg-red-700",
      Citibank: "bg-blue-600",
      "Capital One": "bg-red-500",
      "TD Bank": "bg-green-600",
      "US Bank": "bg-blue-700"
    };
    return banks[name] || "bg-gray-600";
  };
  const getInitials = (name) => {
    return name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2);
  };
  return /* @__PURE__ */ jsx("div", { className: `${getBankColor(bankName)} flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium text-white`, children: getInitials(bankName) });
};
const BankSelector = ({ banks, selectedBank, onSelectBank }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: toggleDropdown,
        className: "border-border/60 hover:border-border focus:ring-primary/20 flex w-full items-center justify-between rounded-xl border bg-white p-4 text-left transition-all focus:ring-2 focus:outline-none",
        children: [
          selectedBank ? /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(BankLogo, { bankName: selectedBank.name }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: selectedBank.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-sm", children: [
                "Account ending in ",
                selectedBank.account_number.slice(-4)
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Select your bank" }),
          isOpen ? /* @__PURE__ */ jsx(ChevronUp, { className: "text-muted-foreground h-5 w-5" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "text-muted-foreground h-5 w-5" })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "soft-shadow border-border/60 animate-fade-in absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border bg-white shadow-lg", children: /* @__PURE__ */ jsx("div", { className: "py-1", children: banks.map((bank) => /* @__PURE__ */ jsxs(
      "button",
      {
        className: cn(
          "hover:bg-muted flex w-full items-center space-x-3 px-4 py-3 text-left transition-colors",
          (selectedBank == null ? void 0 : selectedBank.account_number) === bank.account_number ? "bg-primary/5" : ""
        ),
        onClick: () => {
          onSelectBank(bank);
          setIsOpen(false);
        },
        children: [
          /* @__PURE__ */ jsx(BankLogo, { bankName: bank.name }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: bank.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-sm", children: [
              "Account ending in ",
              bank.account_number.slice(-4)
            ] })
          ] }),
          (selectedBank == null ? void 0 : selectedBank.account_number) === bank.account_number && /* @__PURE__ */ jsx(Check, { className: "text-primary h-5 w-5" })
        ]
      },
      bank.id
    )) }) })
  ] });
};
const PaymentLayout = ({ children, className }) => {
  return /* @__PURE__ */ jsx("div", { className: "from-background to-secondary/50 flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br p-4 md:p-8", children: /* @__PURE__ */ jsx("div", { className: cn("glass-card animate-scale-in w-full max-w-lg rounded-2xl p-6 md:p-8", className), children }) });
};
const TransactionCodeInput = ({ value, onChange, onComplete, className }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = (e) => {
    const newValue = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    onChange(newValue);
    if (newValue.length >= 8 && onComplete) {
      onComplete();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-2", className), children: [
    /* @__PURE__ */ jsx(Label, { htmlFor: "transaction-code", className: "text-foreground/90 text-sm font-medium", children: "Transaction Reference Code" }),
    /* @__PURE__ */ jsx(
      Input,
      {
        id: "transaction-code",
        value,
        onChange: handleChange,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        placeholder: "Enter reference code (e.g., TXN12345678)",
        className: cn("input-highlight py-6 text-base font-medium tracking-wide transition-all", isFocused ? "scale-[1.01]" : "", className),
        maxLength: 16
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs", children: "Enter the transaction reference code from your bank transfer" })
  ] });
};
const Index$1 = () => {
  const { props } = usePage();
  const { auth } = usePage().props;
  const banks = props.banks;
  const plan = props.plan;
  const { data, setData, post: post2, errors } = useForm({
    bank: banks[0],
    transactionCode: "",
    email: auth.user.email
  });
  function onSelectBank(bank) {
    setData("bank", bank);
  }
  const baseAmount = plan.price;
  const paymentAmount = baseAmount;
  const handlePayment = () => {
    post2(route("checkout.order", { plan }), {
      onSuccess: () => {
        toast.success("Payment successful. wait for approval");
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex min-h-screen flex-col bg-white md:flex-row", children: [
    /* @__PURE__ */ jsx(Toaster$1, { richColors: true }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col bg-white p-6 md:w-1/2 md:p-12", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxs(Link, { className: "flex items-center text-sm text-gray-500 hover:text-gray-700", href: "/dashboard", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "MuluCard" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxs("h2", { className: "mb-1 text-lg font-medium", children: [
          "Subscribe to ",
          plan.name,
          " Plan"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-3xl font-bold", children: [
            "Birr ",
            paymentAmount
          ] }),
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-500", children: "per year" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 rounded-md border bg-gray-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium", children: plan.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: plan.description })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
          "Birr ",
          plan.price
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Separator, { className: "my-6" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between font-medium", children: [
        /* @__PURE__ */ jsx("span", { children: "Total due today" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "Birr ",
          paymentAmount
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col bg-gray-50 p-6 md:w-1/2 md:p-12 border-none", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-6 text-xl font-semibold", children: "Pay with Bank Transfer" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email Address" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              value: data.email,
              onChange: (e) => setData("email", e.target.value),
              disabled: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Bank Information" }),
          /* @__PURE__ */ jsx(BankSelector, { banks, selectedBank: data.bank, onSelectBank })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-md border bg-white p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "Account Number" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: data.bank.account_number })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "Account Holder" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: data.bank.account_holder })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "Bank Name" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: data.bank.name })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "transactionCode", children: "Transaction Reference Code" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "transactionCode",
              value: data.transactionCode,
              onChange: (e) => setData("transactionCode", e.target.value),
              placeholder: "Enter your transaction reference code"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Enter the transaction reference code from your bank transfer." }),
          /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.transactionCode })
        ] }),
        /* @__PURE__ */ jsx(Button$1, { onClick: handlePayment, className: "mt-4 w-full rounded-md bg-blue-400 py-4 text-white hover:bg-blue-500", children: "Subscribe" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-center space-x-2 text-xs text-gray-400", children: [
          /* @__PURE__ */ jsx("span", { children: "Powered by Mulucard" }),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsx("button", { className: "hover:text-gray-600", children: "Terms" }),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsx("button", { className: "hover:text-gray-600", children: "Privacy" })
        ] })
      ] })
    ] })
  ] });
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BankSelector,
  PaymentLayout,
  TransactionCodeInput,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$5 = [
  {
    title: "Dashboard",
    href: "/dashboard"
  }
];
function Dashboard() {
  const { auth } = usePage().props;
  const permissions = auth.permissions;
  function showCardDetail(id) {
    console.log("show card detail", id);
    router.get(route("card.show", { id }));
  }
  const { props } = usePage();
  const cards = props.cards;
  const reports = props.reports;
  console.log(reports);
  console.log(permissions);
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$5, children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    reports.total_cards === 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-4 rounded-xl border-none p-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-4 rounded-xl border-none p-2", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold capitalize", children: "No cards found" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "You have no cards. Create one now." })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          className: "flex flex-row items-center justify-center gap-4 rounded-lg p-0 text-black shadow-none hover:bg-gray-100",
          href: "card/create",
          children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "bg-brand-purple hover:bg-brand-purple-dark group transition-colors", children: [
            /* @__PURE__ */ jsx("span", { children: "Create New Card" }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" })
          ] })
        }
      )
    ] }),
    reports.total_cards > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      permissions.card.create && /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-end rounded-xl border-none p-2", children: /* @__PURE__ */ jsx(
        Link,
        {
          className: "flex flex-row items-center justify-center gap-4 rounded-lg bg-gray-50 p-0 text-black shadow-none hover:bg-gray-100",
          href: "card/create",
          children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "bg-brand-purple hover:bg-brand-purple-dark group transition-colors", children: [
            /* @__PURE__ */ jsx("span", { children: "Create New Card" }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" })
          ] })
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 rounded-none border-none p-2 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxs(Card, { className: "flex flex-col items-center justify-center border-none bg-[#9b87f5] text-[#e8f1fa] shadow-none", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold capitalize", children: "Number of cards" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-extrabold", children: reports.total_cards })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "flex flex-col items-center justify-center border-none bg-[#9b87f5] text-[#e8f1fa] shadow-none", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold capitalize", children: "Number of active cards" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl font-extrabold", children: reports.active_cards })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "flex flex-col items-center justify-center border-none bg-[#9b87f5] text-[#e8f1fa] shadow-none", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold capitalize", children: "Number of inactive cards" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-extrabold", children: reports.inactive_cards })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "min-h-screen  grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-4 rounded-xl border-none p-4", children: cards.map((card, index) => /* @__PURE__ */ jsx(ScrollArea, { className: "h-[600px] w-full cursor-pointer rounded-md border-none md:w-[500px]", children: /* @__PURE__ */ jsx("div", { className: "cursor-pointer", onClick: () => showCardDetail(card.id), children: /* @__PURE__ */ jsx(
        MuluCard,
        {
          url: card.url,
          banner: card.banner,
          avatar: card.avatar,
          logo: card.logo,
          first_name: card.first_name,
          last_name: card.last_name,
          organization: card.organization,
          job_title: card.job_title,
          email: card.email,
          phone: card.phone,
          banner_color: card.banner_color,
          links: card.links,
          headline: card.headline,
          services: card.services,
          galleries: card.galleries,
          address: card.address,
          location: card.location,
          business_hours: card.business_hours
        }
      ) }, index) })) })
    ] })
  ] });
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}
function ShareButton({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "Check this out!",
  description = "I thought you might find this interesting.",
  className
}) {
  const [copied, setCopied] = useState(false);
  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "hover:bg-[#1DA1F2] hover:text-white"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:bg-[#4267B2] hover:text-white"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:bg-[#0077B5] hover:text-white"
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + "\n\n" + url)}`,
      color: "hover:bg-gray-500 hover:text-white"
    }
  ];
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: cn("gap-2", className), children: [
      /* @__PURE__ */ jsx(Share2, { className: "h-4 w-4" }),
      "Share"
    ] }) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-56 p-3", align: "end", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx("h4", { className: "font-medium", children: "Share" }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: shareLinks.map((link) => /* @__PURE__ */ jsx(
        "a",
        {
          href: link.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: cn(
            "flex h-9 w-9 items-center justify-center rounded-md border transition-colors",
            link.color
          ),
          "aria-label": `Share on ${link.name}`,
          children: /* @__PURE__ */ jsx(link.icon, { className: "h-4 w-4" })
        },
        link.name
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "relative mt-2", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("span", { className: "w-full border-t" }) }),
        /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsx("span", { className: "bg-background px-2 text-muted-foreground", children: "or copy link" }) })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", className: "gap-2 mt-2", onClick: copyToClipboard, children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" }),
        "Copied!"
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(LinkIcon, { className: "h-4 w-4" }),
        "Copy link"
      ] }) })
    ] }) })
  ] });
}
function Hello() {
  var _a;
  const { props } = usePage();
  const card = props.card;
  console.log(card);
  function generateVCardContent(cardData) {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      // Name (Required)
      `FN:${cardData.first_name} ${cardData.last_name}`,
      // Formatted Name
      `N:${cardData.last_name};${cardData.first_name};;;`
      // Name components: Last;First;Middle;Prefix;Suffix
    ];
    if (cardData.organization) lines.push(`ORG:${cardData.organization}`);
    if (cardData.job_title) lines.push(`TITLE:${cardData.job_title}`);
    if (cardData.phone) lines.push(`TEL;TYPE=CELL:${cardData.phone}`);
    if (cardData.email) lines.push(`EMAIL:${cardData.email}`);
    let fullAddress = "";
    if (cardData.address) fullAddress += cardData.address;
    if (cardData.location) fullAddress += (fullAddress ? ", " : "") + cardData.location;
    if (fullAddress) {
      lines.push(`ADR;TYPE=WORK:;;${fullAddress.replace(/,/g, "\\,").replace(/\n/g, "\\n")};;;;`);
    }
    if (cardData.links && cardData.links.length > 0 && cardData.links[0].url) {
      lines.push(`URL:${cardData.links[0].url}`);
    } else if (cardData.url) {
      lines.push(`URL:${cardData.url}`);
    }
    if (cardData.headline) lines.push(`NOTE:${cardData.headline.replace(/\n/g, "\\n")}`);
    if (cardData.avatar && cardData.avatar.path) {
      lines.push(`PHOTO;VALUE=URI:${cardData.avatar.path}`);
    }
    if (cardData.logo && cardData.logo.path) {
      lines.push(`LOGO;VALUE=URI:${cardData.logo.path}`);
    }
    lines.push("END:VCARD");
    return lines.join("\r\n");
  }
  function downloadVCard() {
    const vCardString = generateVCardContent(card);
    axios.post(route("card.updatetotalsaves", { id: card.id })).catch((error) => {
      console.error("Error updating view count:", error);
    });
    const blob = new Blob([vCardString], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const filename = `${card.first_name}_${card.last_name}.vcf`;
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  const pageTitle = (card == null ? void 0 : card.first_name) && (card == null ? void 0 : card.last_name) ? `${card.first_name} ${card.last_name} | MuluCard` : "MuluCard";
  const description = card ? `${card.job_title} at ${card.organization}` : "MuluCard";
  const ogtitle = card ? `${card.first_name} ${card.last_name}` : "MuluCard";
  const ogdescription = card ? description : "MuluCard";
  const ogimage = card ? card.avatar.path : "MuluCard";
  const ogurl = card ? card.url : "MuluCard";
  const twitterTitle = card ? `${card.first_name} ${card.last_name}` : "MuluCard";
  const twitterDescription = card ? description : "MuluCard";
  const twitterImage = ((_a = card == null ? void 0 : card.avatar) == null ? void 0 : _a.path) ?? "MuluCard";
  const twitterUrl = card ? card.url : "MuluCard";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: pageTitle }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: ogtitle }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: ogdescription }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogimage }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: ogurl }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "MuluCard" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:site", content: "@MuluCard" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: twitterTitle }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: twitterDescription }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: twitterImage }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:url", content: twitterUrl }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: ogurl })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex min-h-svh flex-col justify-between gap-4 bg-white p-1", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mt-0 mb-24 md:mb-10 rounded-lg md:border-4 border-none p-1 md:w-[500px]", children: /* @__PURE__ */ jsx(
        MuluCard,
        {
          url: card == null ? void 0 : card.url,
          avatar: card == null ? void 0 : card.avatar,
          logo: card == null ? void 0 : card.logo,
          first_name: card == null ? void 0 : card.first_name,
          last_name: card == null ? void 0 : card.last_name,
          organization: card == null ? void 0 : card.organization,
          job_title: card == null ? void 0 : card.job_title,
          phone: card == null ? void 0 : card.phone,
          email: card == null ? void 0 : card.email,
          banner_color: card == null ? void 0 : card.banner_color,
          links: card.links,
          address: card == null ? void 0 : card.address,
          location: card == null ? void 0 : card.location,
          headline: card == null ? void 0 : card.headline,
          services: card == null ? void 0 : card.services,
          galleries: card == null ? void 0 : card.galleries,
          business_hours: card == null ? void 0 : card.business_hours,
          banner: card == null ? void 0 : card.banner
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "items-top fixed bottom-0 -mb-8 flex h-16 w-xl justify-center self-center rounded-4xl border-none bg-[#9f77e3] pt-2 text-white", children: "a free digital business card from MuluCard" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 h-24  w-full border-none p-0", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-row justify-between p-2", children: [
      /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
        ShareButton,
        {
          title: "Check out this awesome content!",
          description: "I found this really interesting article that I thought you might enjoy."
        }
      ) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-400 hover:bg-gray-500",
          onClick: () => downloadVCard(),
          children: /* @__PURE__ */ jsx(Contact, { size: 30, color: "white" })
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hello
}, Symbol.toStringTag, { value: "Module" }));
const prefersDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
const applyTheme = (appearance) => {
  const isDark = appearance === "dark" || appearance === "system" && prefersDark();
  document.documentElement.classList.toggle("dark", isDark);
};
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const handleSystemThemeChange = () => {
  const currentAppearance = localStorage.getItem("appearance");
  applyTheme(currentAppearance || "system");
};
function useAppearance() {
  const [appearance, setAppearance] = useState("system");
  const updateAppearance = (mode) => {
    setAppearance(mode);
    localStorage.setItem("appearance", mode);
    applyTheme(mode);
  };
  useEffect(() => {
    const savedAppearance = localStorage.getItem("appearance");
    updateAppearance(savedAppearance || "system");
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);
  return { appearance, updateAppearance };
}
function AppearanceToggleTab({ className = "", ...props }) {
  const { appearance, updateAppearance } = useAppearance();
  const tabs = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" }
  ];
  return /* @__PURE__ */ jsx("div", { className: cn("inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800", className), ...props, children: tabs.map(({ value, icon: Icon2, label }) => /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => updateAppearance(value),
      className: cn(
        "flex items-center rounded-md px-3.5 py-1.5 transition-colors",
        appearance === value ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100" : "text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"
      ),
      children: [
        /* @__PURE__ */ jsx(Icon2, { className: "-ml-1 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "ml-1.5 text-sm", children: label })
      ]
    },
    value
  )) });
}
function HeadingSmall({ title, description }) {
  return /* @__PURE__ */ jsxs("header", { children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-0.5 text-base font-medium", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: description })
  ] });
}
function Heading({ title, description }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "mb-8 space-y-0.5", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold tracking-tight", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: description })
  ] }) });
}
const sidebarNavItems = [
  {
    title: "Profile",
    url: "/settings/profile",
    icon: null
  },
  {
    title: "Plans & Pricing",
    url: "/settings/plansandpricing",
    icon: null
  },
  {
    title: "Manage Subscription",
    url: "/settings/subscription",
    icon: null
  }
  // {
  //     title: 'Appearance',
  //     url: '/settings/appearance',
  //     icon: null,
  // },
];
function SettingsLayout({ children }) {
  const currentPath = window.location.pathname;
  return /* @__PURE__ */ jsxs("div", { className: "px-4 py-6", children: [
    /* @__PURE__ */ jsx(Heading, { title: "Settings", description: "Manage your profile and account settings" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12", children: [
      /* @__PURE__ */ jsx("aside", { className: "w-full max-w-xl lg:w-48", children: /* @__PURE__ */ jsx("nav", { className: "flex flex-col space-y-1 space-x-0", children: sidebarNavItems.map((item) => /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "ghost",
          asChild: true,
          className: cn("w-full justify-start", {
            "bg-muted": currentPath === item.url
          }),
          children: /* @__PURE__ */ jsx(Link, { href: item.url, prefetch: true, children: item.title })
        },
        item.url
      )) }) }),
      /* @__PURE__ */ jsx(Separator, { className: "my-6 md:hidden" }),
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("section", { className: "md:space-y-12 bg-secondary/50 border-none p-4 rounded-lg", children }) })
    ] })
  ] });
}
const breadcrumbs$4 = [
  {
    title: "Appearance settings",
    href: "/settings/appearance"
  }
];
function Appearance() {
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$4, children: [
    /* @__PURE__ */ jsx(Head, { title: "Appearance settings" }),
    /* @__PURE__ */ jsx(SettingsLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(HeadingSmall, { title: "Appearance settings", description: "Update your account's appearance settings" }),
      /* @__PURE__ */ jsx(AppearanceToggleTab, {})
    ] }) })
  ] });
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Appearance
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$3 = [
  {
    title: "Password settings",
    href: "/settings/password"
  }
];
function Password() {
  const passwordInput = useRef(null);
  const currentPasswordInput = useRef(null);
  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        var _a, _b;
        if (errors2.password) {
          reset("password", "password_confirmation");
          (_a = passwordInput.current) == null ? void 0 : _a.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          (_b = currentPasswordInput.current) == null ? void 0 : _b.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$3, children: [
    /* @__PURE__ */ jsx(Head, { title: "Profile settings" }),
    /* @__PURE__ */ jsx(SettingsLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(HeadingSmall, { title: "Update password", description: "Ensure your account is using a long, random password to stay secure" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "current_password", children: "Current password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "current_password",
              ref: currentPasswordInput,
              value: data.current_password,
              onChange: (e) => setData("current_password", e.target.value),
              type: "password",
              className: "mt-1 block w-full",
              autoComplete: "current-password",
              placeholder: "Current password"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.current_password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "New password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              ref: passwordInput,
              value: data.password,
              onChange: (e) => setData("password", e.target.value),
              type: "password",
              className: "mt-1 block w-full",
              autoComplete: "new-password",
              placeholder: "New password"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password_confirmation", children: "Confirm password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password_confirmation",
              value: data.password_confirmation,
              onChange: (e) => setData("password_confirmation", e.target.value),
              type: "password",
              className: "mt-1 block w-full",
              autoComplete: "new-password",
              placeholder: "Confirm password"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Button, { disabled: processing, children: "Save password" }),
          /* @__PURE__ */ jsx(
            Transition,
            {
              show: recentlySuccessful,
              enter: "transition ease-in-out",
              enterFrom: "opacity-0",
              leave: "transition ease-in-out",
              leaveTo: "opacity-0",
              children: /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600", children: "Saved" })
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Password
}, Symbol.toStringTag, { value: "Module" }));
const ANIMATION_DELAY = "0.2s";
const MostPopularBadge = () => /* @__PURE__ */ jsx("div", { className: "absolute -top-3 right-8 transform", children: /* @__PURE__ */ jsx("div", { className: "bg-brand-purple rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm", children: "Most Popular" }) });
const PricingDisplay = ({ plan }) => /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
  /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold", children: plan.price < 0 ? "Custom Pricing" : plan.price === 0 ? "Free" : `Birr ${plan.price}` }),
  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground ml-2", children: plan.price === 0 ? "forever" : plan.price < 0 ? "" : "/ year" })
] });
const FeatureItem = ({ feature }) => /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "text-brand-purple mt-0.5 mr-3 h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
      clipRule: "evenodd"
    }
  ) }),
  /* @__PURE__ */ jsx("span", { children: feature })
] });
function PlanCard({
  plan,
  isButtonDisabled = false,
  billing = false
}) {
  var _a;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `animate-fade-in relative rounded-xl border bg-white p-8 shadow-sm ${plan.most_popular ? "border-brand-purple border-2 shadow-md" : "border-border"}`,
      style: { animationDelay: ANIMATION_DELAY },
      children: [
        plan.most_popular === true && /* @__PURE__ */ jsx(MostPopularBadge, {}),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: plan.name }),
          /* @__PURE__ */ jsx(PricingDisplay, { plan }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-3", children: plan.description })
        ] }),
        /* @__PURE__ */ jsx(Separator, { className: "my-6" }),
        /* @__PURE__ */ jsxs("ul", { className: "mb-8 space-y-4", children: [
          plan.number_of_digital_business_card !== null && /* @__PURE__ */ jsx(
            FeatureItem,
            {
              feature: `${plan.number_of_digital_business_card <= 0 ? plan.number_of_digital_business_card < 0 ? "Unlimited" : "No" : plan.number_of_digital_business_card} digital business card${plan.number_of_digital_business_card === 1 ? "" : "s"}`
            }
          ),
          plan.number_of_service !== null && /* @__PURE__ */ jsx(
            FeatureItem,
            {
              feature: `${plan.number_of_service <= 0 ? plan.number_of_service < 0 ? "Unlimited" : "No" : plan.number_of_service} service${plan.number_of_service === 1 ? "" : "s"}`
            }
          ),
          plan.number_of_nfc_business_card !== null && /* @__PURE__ */ jsx(
            FeatureItem,
            {
              feature: `${plan.number_of_nfc_business_card <= 0 ? plan.number_of_nfc_business_card < 0 ? "Unlimited" : "No" : plan.number_of_nfc_business_card} NFC business card${plan.number_of_nfc_business_card === 1 ? "" : "s"}`
            }
          ),
          plan.number_of_gallery !== null && /* @__PURE__ */ jsx(
            FeatureItem,
            {
              feature: `${plan.number_of_gallery <= 0 ? plan.number_of_gallery < 0 ? "Unlimited" : "No" : plan.number_of_gallery} galler${plan.number_of_gallery === 1 ? "y" : "ies"}`
            }
          ),
          (_a = plan.features) == null ? void 0 : _a.map((feature, index) => /* @__PURE__ */ jsx(FeatureItem, { feature }, index))
        ] }),
        isButtonDisabled ? /* @__PURE__ */ jsx(Button, { className: "w-full", variant: "secondary", disabled: true, children: plan.price < 0 ? "Contact Sales" : "Get Started" }) : /* @__PURE__ */ jsx(
          Button,
          {
            asChild: true,
            className: `w-full ${plan.most_popular ? "bg-brand-purple hover:bg-brand-purple-dark" : ""}`,
            variant: plan.most_popular ? "default" : "outline",
            children: /* @__PURE__ */ jsx(Link, { href: plan.price < 0 ? "/contact-sales" : billing ? route("checkout", { plan: plan.id }) : route("register"), children: plan.price < 0 ? "Contact Sales" : billing ? "Upgrade Now" : "Get Started" })
          }
        )
      ]
    }
  );
}
const breadcrumbs$2 = [
  {
    title: "Password settings",
    href: "/settings/password"
  }
];
function Plan({ plans }) {
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$2, children: [
    /* @__PURE__ */ jsx(Head, { title: "Profile settings" }),
    /* @__PURE__ */ jsx(SettingsLayout, { children: /* @__PURE__ */ jsxs("section", { id: "pricing", className: "", children: [
      /* @__PURE__ */ jsxs("div", { className: "animate-fade-in mx-auto mb-16 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium", children: "plans" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: "Simple, transparent pricing" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-4 text-lg", children: "Choose the perfect plan for your needs with no hidden fees." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-8 border-none border-red-900 lg:grid-cols-1 xl:grid-cols-3", children: [...plans].sort((a, b) => {
        return 0;
      }).map((plan, index) => {
        var _a, _b;
        const isCurrentPlan = plan.id === ((_b = (_a = auth.activePlan) == null ? void 0 : _a.plan) == null ? void 0 : _b.id);
        return /* @__PURE__ */ jsx(
          PlanCard,
          {
            plan,
            isButtonDisabled: isCurrentPlan,
            billing: true
          },
          index
        );
      }) })
    ] }) })
  ] });
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Plan
}, Symbol.toStringTag, { value: "Module" }));
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogClose({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Close, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", children: [
            /* @__PURE__ */ jsx(XIcon, {}),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function DeleteUser() {
  const passwordInput = useRef(null);
  const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: "" });
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => {
        var _a;
        return (_a = passwordInput.current) == null ? void 0 : _a.focus();
      },
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    clearErrors();
    reset();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(HeadingSmall, { title: "Delete account", description: "Delete your account and all of its resources" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative space-y-0.5 text-red-600 dark:text-red-100", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Warning" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Please proceed with caution, this cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "destructive", children: "Delete account" }) }),
        /* @__PURE__ */ jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsx(DialogTitle, { children: "Are you sure you want to delete your account?" }),
          /* @__PURE__ */ jsx(DialogDescription, { children: "Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
          /* @__PURE__ */ jsxs("form", { className: "space-y-6", onSubmit: deleteUser, children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "password", className: "sr-only", children: "Password" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "password",
                  type: "password",
                  name: "password",
                  ref: passwordInput,
                  value: data.password,
                  onChange: (e) => setData("password", e.target.value),
                  placeholder: "Password",
                  autoComplete: "current-password"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.password })
            ] }),
            /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2", children: [
              /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: closeModal, children: "Cancel" }) }),
              /* @__PURE__ */ jsx(Button, { variant: "destructive", disabled: processing, asChild: true, children: /* @__PURE__ */ jsx("button", { type: "submit", children: "Delete account" }) })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const breadcrumbs$1 = [
  {
    title: "Profile settings",
    href: "/settings/profile"
  }
];
function Profile({ mustVerifyEmail, status }) {
  const { auth } = usePage().props;
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: auth.user.name,
    email: auth.user.email
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"), {
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$1, children: [
    /* @__PURE__ */ jsx(Head, { title: "Profile settings" }),
    /* @__PURE__ */ jsxs(SettingsLayout, { children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx(HeadingSmall, { title: "Profile information", description: "Update your name and email address" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                className: "mt-1 block w-full",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                required: true,
                autoComplete: "name",
                placeholder: "Full name"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email address" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                type: "email",
                className: "mt-1 block w-full",
                value: data.email,
                onChange: (e) => setData("email", e.target.value),
                required: true,
                autoComplete: "username",
                placeholder: "Email address"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
          ] }),
          mustVerifyEmail && auth.user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { className: "-mt-4 text-sm text-muted-foreground", children: [
              "Your email address is unverified.",
              " ",
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("verification.send"),
                  method: "post",
                  as: "button",
                  className: "hover:decoration-current! text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out dark:decoration-neutral-500",
                  children: "Click here to resend the verification email."
                }
              )
            ] }),
            status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-green-600", children: "A new verification link has been sent to your email address." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(Button, { disabled: processing, children: "Save" }),
            /* @__PURE__ */ jsx(
              Transition,
              {
                show: recentlySuccessful,
                enter: "transition ease-in-out",
                enterFrom: "opacity-0",
                leave: "transition ease-in-out",
                leaveTo: "opacity-0",
                children: /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600", children: "Saved" })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(DeleteUser, {})
    ] })
  ] });
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Profile
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs = [
  {
    title: "Password settings",
    href: "/settings/password"
  }
];
const SubscriptionCard = ({ subscription }) => {
  console.log("hey", subscription);
  const statusColors = {
    active: "text-green-500",
    canceled: "text-gray-500",
    expired: "text-gray-500",
    failed: "text-red-500"
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("etb", {
      style: "currency",
      currency: "ETB"
    }).format(amount);
  };
  return /* @__PURE__ */ jsx(
    Card,
    {
      className: "animate-fade-up overflow-hidden border-gray-200 bg-white/90 p-6 shadow-none backdrop-blur-sm transition-all duration-300 hover:bg-white/95 ",
      style: {
        animationDelay: "0.1s"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium", children: subscription.plan.name }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Annual Subscription" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold", children: formatCurrency(subscription.plan.price) }),
            /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-sm", children: [
              "Billed on ",
              new Date(subscription.start_date).toLocaleDateString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start justify-between space-y-2 pt-2 sm:flex-row sm:items-center sm:space-y-0", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("span", { className: cn("flex items-center text-sm font-medium", statusColors[subscription.status]), children: [
          subscription.status === "active" ? /* @__PURE__ */ jsx(Check, { className: "mr-1 h-4 w-4" }) : subscription.status === "failed" ? /* @__PURE__ */ jsx(AlertCircle, { className: "mr-1 h-4 w-4" }) : null,
          /* @__PURE__ */ jsx("span", { className: "capitalize", children: subscription.status })
        ] }) }) })
      ] })
    }
  );
};
function Subscription33({ subscriptions }) {
  console.log("subscriptions", subscriptions);
  const [filter, setFilter] = useState("all");
  const filteredSubscriptions = filter === "all" ? subscriptions : subscriptions.filter((sub) => sub.status === filter);
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: "Profile settings" }),
    /* @__PURE__ */ jsx(SettingsLayout, { children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6 flex flex-wrap gap-2", children: ["all", "active", "expired"].map((status, index) => /* @__PURE__ */ jsx(
        Button,
        {
          variant: filter === status ? "default" : "outline",
          size: "sm",
          onClick: () => setFilter(status),
          className: cn("capitalize", filter === status ? "" : "bg-white/50 hover:bg-white/80", "animate-fade-in"),
          style: { animationDelay: `${index * 100}ms` },
          children: status
        },
        status
      )) }),
      /* @__PURE__ */ jsx(Separator, { className: "my-6" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: filteredSubscriptions.length > 0 ? filteredSubscriptions.map((subscription, index) => /* @__PURE__ */ jsx(SubscriptionCard, { subscription }, index)) : /* @__PURE__ */ jsxs("div", { className: "animate-fade-in py-16 text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-medium", children: "No subscriptions found" }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
          "You don't have any ",
          filter !== "all" ? filter : "",
          " subscriptions at the moment."
        ] })
      ] }) })
    ] }) })
  ] });
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Subscription33
}, Symbol.toStringTag, { value: "Module" }));
const Hero = () => {
  return /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-32", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20", children: /* @__PURE__ */ jsxs("div", { className: "animate-fade-in-left max-w-2xl space-y-8 lg:max-w-none", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium", children: "Your digital identity, reimagined" }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl", children: "Digital Business Cards for Modern Professionals" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-6 text-lg", children: "Share your contact information instantly. Create beautiful digital business cards that leave a lasting impression." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "bg-brand-purple hover:bg-brand-purple-dark group transition-colors", children: [
      /* @__PURE__ */ jsx(Link, { href: route("register"), children: "Create Your Card" }),
      /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" })
    ] }) })
  ] }) }) }) });
};
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth } = usePage().props;
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: cn(
        "fixed top-0 right-0 left-0 z-50 px-4 py-4 transition-all duration-300 md:px-8",
        isScrolled ? "glass shadow-sm backdrop-blur-lg" : "bg-transparent"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("a", { href: "/", className: "flex items-center gap-[1px] text-xl font-semibold", children: [
            /* @__PURE__ */ jsx("span", { className: "text-brand-purple", children: "Mulu" }),
            /* @__PURE__ */ jsx("span", { children: "Card" })
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden items-center gap-8 md:flex", children: [
            /* @__PURE__ */ jsx("a", { href: "#features", className: "hover:text-brand-purple text-sm font-medium transition-colors", children: "Features" }),
            /* @__PURE__ */ jsx("a", { href: "#how-it-works", className: "hover:text-brand-purple text-sm font-medium transition-colors", children: "How It Works" }),
            /* @__PURE__ */ jsx("a", { href: "#pricing", className: "hover:text-brand-purple text-sm font-medium transition-colors", children: "Pricing" })
          ] }),
          auth.user ? /* @__PURE__ */ jsx("div", { className: "hidden items-center gap-4 md:flex", children: /* @__PURE__ */ jsx(Button, { className: "bg-brand-purple hover:bg-brand-purple-dark transition-colors", children: /* @__PURE__ */ jsx(Link, { href: route("dashboard"), children: "Dashboard" }) }) }) : /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-4 md:flex", children: [
            /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "font-medium", children: /* @__PURE__ */ jsx(Link, { href: route("login"), children: "Log in" }) }),
            /* @__PURE__ */ jsx(Button, { className: "bg-brand-purple hover:bg-brand-purple-dark transition-colors", children: /* @__PURE__ */ jsx(Link, { href: route("register"), children: "Get Started" }) })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "md:hidden", onClick: () => setIsMenuOpen(!isMenuOpen), children: isMenuOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" }) })
        ] }) }),
        isMenuOpen && /* @__PURE__ */ jsx("div", { className: "h-screen glass animate-fade-in absolute top-full right-0 left-0 p-4 shadow-md md:hidden bg-gray-50", children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-2 py-4", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#features",
              className: "hover:bg-secondary rounded-md px-4 py-2 text-sm font-medium transition-colors",
              onClick: () => setIsMenuOpen(false),
              children: "Features"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#how-it-works",
              className: "hover:bg-secondary rounded-md px-4 py-2 text-sm font-medium transition-colors",
              onClick: () => setIsMenuOpen(false),
              children: "How It Works"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#pricing",
              className: "hover:bg-secondary rounded-md px-4 py-2 text-sm font-medium transition-colors",
              onClick: () => setIsMenuOpen(false),
              children: "Pricing"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "justify-start font-medium", children: "Log in" }),
            /* @__PURE__ */ jsx(Button, { className: "bg-brand-purple hover:bg-brand-purple-dark transition-colors", children: "Get Started" })
          ] })
        ] }) })
      ]
    }
  );
};
const Footer = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs("footer", { className: "relative border-t bg-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4 py-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-1", children: [
          /* @__PURE__ */ jsx("a", { href: "/", className: "mb-4 inline-block", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center text-xl font-semibold", children: [
            /* @__PURE__ */ jsx("span", { className: "text-brand-purple", children: "mulu" }),
            /* @__PURE__ */ jsx("span", { children: "card" })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4 text-sm", children: "Modern digital business cards for professionals." }),
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-1", children: [
            /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full", children: [
              /* @__PURE__ */ jsx(Twitter, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Twitter" })
            ] }),
            /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full", children: [
              /* @__PURE__ */ jsx(Github, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "GitHub" })
            ] }),
            /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full", children: [
              /* @__PURE__ */ jsx(Instagram, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Instagram" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold", children: "Company" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-muted-foreground hover:text-foreground text-sm transition-colors", children: "About" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-muted-foreground hover:text-foreground text-sm transition-colors", children: "Blog" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-muted-foreground hover:text-foreground text-sm transition-colors", children: "Contact Us" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold", children: "Legal" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-muted-foreground hover:text-foreground text-sm transition-colors", children: "Privacy Policy" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-muted-foreground hover:text-foreground text-sm transition-colors", children: "Terms of Service" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Separator, { className: "my-8" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-between md:flex-row", children: /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-sm", children: [
        "© ",
        currentYear,
        " Mulucard. All rights reserved."
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed right-0 bottom-0 left-0 z-50 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "bg-brand-purple mx-auto mb-4 flex h-12 w-auto items-center justify-center rounded-full border-none px-6 text-xs text-white", children: "a free digital business card from mulucard" }) })
  ] });
};
const features = [
  {
    icon: /* @__PURE__ */ jsx(Smartphone, { className: "text-brand-purple h-6 w-6" }),
    title: "Mobile-First Design",
    description: "Optimized for smartphones with a responsive design that works on any device."
  },
  {
    icon: /* @__PURE__ */ jsx(Share2, { className: "text-brand-purple h-6 w-6" }),
    title: "Instant Sharing",
    description: "Share your digital card via QR code, and tap."
  },
  {
    icon: /* @__PURE__ */ jsx(Zap, { className: "text-brand-purple h-6 w-6" }),
    title: "Real-Time Updates",
    description: "Update your information once and it changes everywhere your card is shared."
  },
  {
    icon: /* @__PURE__ */ jsx(Repeat, { className: "text-brand-purple h-6 w-6" }),
    title: "Analytics & Insights",
    description: "Track when and how often your card is viewed with detailed analytics."
  },
  {
    icon: /* @__PURE__ */ jsx(Shield, { className: "text-brand-purple h-6 w-6" }),
    title: "Privacy Controls",
    description: "Choose what information to share with advanced privacy settings."
  },
  {
    icon: /* @__PURE__ */ jsx(Palette, { className: "text-brand-purple h-6 w-6" }),
    title: "Customizable Design",
    description: "Personalize your card with custom colors, layouts, and interactive elements."
  }
];
const Features = () => {
  return /* @__PURE__ */ jsx("section", { id: "features", className: "bg-secondary/50 py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "animate-fade-in mx-auto mb-16 max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium", children: "Why choose mulucard" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: "Features designed for professionals" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-4 text-lg", children: "Our digital business cards come packed with features to help you stand out and connect effectively." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "border-border/50 animate-fade-in rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md",
        style: { animationDelay: `${index * 0.1}s` },
        children: [
          /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg", children: feature.icon }),
          /* @__PURE__ */ jsx("h3", { className: "mb-2 text-xl font-semibold", children: feature.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: feature.description })
        ]
      },
      index
    )) })
  ] }) });
};
function Index({ plans }) {
  const { auth } = usePage().props;
  useEffect(() => {
    document.body.classList.add("animate-fade-in");
    return () => {
      document.body.classList.remove("animate-fade-in");
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(Features, {}),
      /* @__PURE__ */ jsx("section", { id: "how-it-works", className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "animate-fade-in mx-auto mb-16 max-w-3xl text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium", children: "Simple process" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: "How It Works" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-4 text-lg", children: "Create and share your digital business card in minutes." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "animate-fade-in text-center", style: { animationDelay: "0.1s" }, children: [
            /* @__PURE__ */ jsx("div", { className: "bg-brand-purple mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full text-xl text-white", children: "1" }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xl font-semibold", children: "Create your card" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Sign up and use our intuitive editor to create your perfect digital business card." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "animate-fade-in text-center", style: { animationDelay: "0.2s" }, children: [
            /* @__PURE__ */ jsx("div", { className: "bg-brand-purple mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full text-xl text-white", children: "2" }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xl font-semibold", children: "Customize design" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Add your details, social profiles, and customize the design to match your brand." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "animate-fade-in text-center", style: { animationDelay: "0.3s" }, children: [
            /* @__PURE__ */ jsx("div", { className: "bg-brand-purple mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full text-xl text-white", children: "3" }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xl font-semibold", children: "Share instantly" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Share via QR code, NFC, email, or direct link. Connect with anyone, anywhere." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-16 text-center", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "bg-brand-purple hover:bg-brand-purple-dark transition-colors", children: [
          /* @__PURE__ */ jsx("span", { children: "Get Started For Free" }),
          /* @__PURE__ */ jsx(ChevronRight, { className: "ml-1 h-4 w-4" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "pricing", className: "bg-secondary/50 py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "animate-fade-in mx-auto mb-16 max-w-3xl text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium", children: "Pricing plans" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: "Simple, transparent pricing" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-4 text-lg", children: "Choose the perfect plan for your needs with no hidden fees." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3", children: [...plans].sort((a, b) => {
          return 0;
        }).map((plan, index) => {
          return /* @__PURE__ */ jsx(
            PlanCard,
            {
              plan
            },
            index
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-brand-purple animate-fade-in mx-auto max-w-4xl rounded-2xl p-10 text-center text-white md:p-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-6 text-3xl font-bold md:text-4xl", children: "Ready to go digital?" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg opacity-90", children: "Join thousands of professionals who are already using mulucard to make connections that matter." }),
        /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", className: "text-brand-purple bg-white hover:bg-white/90", children: /* @__PURE__ */ jsx(Link, { href: route("register"), children: "Create Your Free Card" }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({
        "./pages/auth/confirm-password.tsx": __vite_glob_0_0,
        "./pages/auth/forgot-password.tsx": __vite_glob_0_1,
        "./pages/auth/login.tsx": __vite_glob_0_2,
        "./pages/auth/magic-login.tsx": __vite_glob_0_3,
        "./pages/auth/register.tsx": __vite_glob_0_4,
        "./pages/auth/reset-password.tsx": __vite_glob_0_5,
        "./pages/auth/verify-email.tsx": __vite_glob_0_6,
        "./pages/card/card.tsx": __vite_glob_0_7,
        "./pages/card/create.tsx": __vite_glob_0_8,
        "./pages/card/edit.tsx": __vite_glob_0_9,
        "./pages/card/show.tsx": __vite_glob_0_10,
        "./pages/checkout.tsx": __vite_glob_0_11,
        "./pages/dashboard.tsx": __vite_glob_0_12,
        "./pages/hello.tsx": __vite_glob_0_13,
        "./pages/settings/appearance.tsx": __vite_glob_0_14,
        "./pages/settings/password.tsx": __vite_glob_0_15,
        "./pages/settings/plan.tsx": __vite_glob_0_16,
        "./pages/settings/profile.tsx": __vite_glob_0_17,
        "./pages/settings/subscription.tsx": __vite_glob_0_18,
        "./pages/welcome.tsx": __vite_glob_0_19
      });
      return pages[`./pages/${name}.tsx`];
    },
    // prettier-ignore
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
