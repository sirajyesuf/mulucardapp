import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link, useForm, Head, usePage, router, createInertiaApp } from "@inertiajs/react";
import { LoaderCircle, CheckIcon, ChevronDownIcon, ChevronUpIcon, Clock, Phone, Mail, MapPin, Youtube, Linkedin, Instagram, Twitter, Facebook, Globe, XIcon, PanelLeftIcon, Settings, CircleDollarSign, CreditCard, LogOut, ChevronsUpDown, BadgeCheck, LayoutGrid, ChevronRight, Sun, Moon, Bell, X, Upload, Check, PlusCircle, Copy, ShieldAlert, Wifi, Download, Edit, ChevronUp, ChevronDown, ArrowLeft, Eye, MoreHorizontal, Trash2, CheckCircle2, CircleOff, TrendingUp, ArrowRight, CheckCircle, XCircle, Share2, LinkIcon, Contact, AlertCircle, Menu, QrCode, Smartphone, Shield, Users, Zap, Monitor, Sparkles, Repeat, BarChart3, Palette, LayoutTemplate } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";
import { useTheme } from "next-themes";
import { Toaster as Toaster$1, toast } from "sonner";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
import { useId, useState, useEffect, useCallback, Fragment as Fragment$1, useRef } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { TabsContent as TabsContent$1 } from "@radix-ui/react-tabs";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { Button as Button$1, Transition } from "@headlessui/react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import axios from "axios";
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
    /* @__PURE__ */ jsx(Link, { href: route("home"), className: "flex items-center gap-2 self-center font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-[1px] text-xl font-semibold", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Mulu" }),
      /* @__PURE__ */ jsx("span", { children: "Card" })
    ] }) }),
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
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"), {
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
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
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
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
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
  var _a, _b;
  const { props } = usePage();
  const errormessage = ((_a = props.error) == null ? void 0 : _a.message) || null;
  const successmessage = ((_b = props.success) == null ? void 0 : _b.message) || null;
  const { data, setData, post, processing, errors, reset } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onSuccess: () => {
      },
      onError: () => {
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
              autoFocus: true,
              tabIndex: 1,
              autoComplete: "email",
              value: data.email,
              onChange: (e) => setData("email", e.target.value),
              placeholder: "email@example.com"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email || errormessage }),
          successmessage && /* @__PURE__ */ jsx("p", { className: "text-sm text-green-600 dark:text-green-400", children: successmessage })
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
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password")
    });
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
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              required: true,
              tabIndex: 3,
              autoComplete: "new-password",
              value: data.password,
              onChange: (e) => setData("password", e.target.value),
              disabled: processing,
              placeholder: "Password"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", className: "mt-2 w-full", tabIndex: 4, disabled: processing, children: [
          processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Create account"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-center text-sm", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsx(TextLink, { href: route("login"), tabIndex: 5, children: "Log in" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"), {
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
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
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
const CARD_TEMPLATE_OPTIONS = [
  {
    id: "classic",
    label: "Classic",
    description: "Framed card with soft shadow, centered layout, and clear section dividers"
  },
  {
    id: "modern",
    label: "Modern",
    description: "Compact header, left-aligned copy, and minimal chrome for fast scanning"
  },
  {
    id: "bold",
    label: "Bold",
    description: "Cinematic hero with color wash, glass profile panel, editorial type, and outline actions"
  }
];
function CardTemplateSelector({ value, onChange, disabled, className }) {
  const selectId = useId();
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3", className), children: [
    /* @__PURE__ */ jsx(Label, { htmlFor: selectId, className: "text-muted-foreground shrink-0 text-xs font-medium sm:pt-0.5 sm:text-sm", children: "Template" }),
    /* @__PURE__ */ jsxs(Select, { value, onValueChange: (next) => onChange(next), disabled, children: [
      /* @__PURE__ */ jsx(
        SelectTrigger,
        {
          id: selectId,
          className: "h-9 w-full min-w-0 border-border bg-background text-foreground shadow-xs sm:max-w-[240px]",
          "aria-label": "Card template",
          children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choose template" })
        }
      ),
      /* @__PURE__ */ jsx(
        SelectContent,
        {
          align: "start",
          className: "min-w-[var(--radix-select-trigger-width)] border-border shadow-md ring-1 ring-black/5 dark:shadow-[0_12px_40px_rgba(0,0,0,0.55)] dark:ring-white/10",
          children: CARD_TEMPLATE_OPTIONS.map((opt) => /* @__PURE__ */ jsx(
            SelectItem,
            {
              value: opt.id,
              title: opt.description,
              textValue: opt.description ? `${opt.label} — ${opt.description}` : opt.label,
              className: "text-popover-foreground focus:bg-muted focus:text-foreground dark:focus:bg-muted/80",
              children: opt.label
            },
            opt.id
          ))
        }
      )
    ] })
  ] });
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CardTemplateSelector
}, Symbol.toStringTag, { value: "Module" }));
function CardAvatarRow({
  avatar,
  logo,
  overlapClassName = "-mt-14",
  avatarFrameClassName = "h-[100px] w-[100px]",
  logoFrameClassName = "h-[100px] w-[100px]",
  avatarRadiusClassName = "rounded-full",
  /** Logo frame + image; default matches previous rounded-lg frame look. */
  logoRadiusClassName = "rounded-lg"
}) {
  const hasLogo = Boolean(logo == null ? void 0 : logo.path);
  return /* @__PURE__ */ jsxs("div", { className: `relative flex flex-row border-none px-4 ${overlapClassName} ${hasLogo ? "justify-between" : "justify-center"}`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `border-border bg-card flex items-center justify-center border-4 dark:border-slate-700 dark:bg-slate-900 ${avatarRadiusClassName} ${avatarFrameClassName} ${hasLogo ? "" : "mx-auto"}`,
        children: /* @__PURE__ */ jsx("img", { src: avatar.path || "", alt: "", className: `h-full w-full border-none object-contain ${avatarRadiusClassName}` })
      }
    ),
    hasLogo && (logo == null ? void 0 : logo.path) && /* @__PURE__ */ jsx(
      "div",
      {
        className: `border-border bg-card flex items-center justify-center border-4 dark:border-slate-700 dark:bg-slate-900 ${logoRadiusClassName} ${logoFrameClassName}`,
        children: /* @__PURE__ */ jsx("img", { src: logo.path, alt: "", className: `h-full w-full border-none object-contain ${logoRadiusClassName}` })
      }
    )
  ] });
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CardAvatarRow
}, Symbol.toStringTag, { value: "Module" }));
function CardBanner({ banner, className = "h-[200px]" }) {
  return /* @__PURE__ */ jsx("div", { className: `w-full ${className}`, children: banner.path && /* @__PURE__ */ jsx("img", { src: banner.path, alt: "", className: "h-full w-full border-none object-cover" }) });
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CardBanner
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
function CardBusinessHours({ enabled, business_hours }) {
  if (!enabled) {
    return null;
  }
  return /* @__PURE__ */ jsx(BusinessHoursPreview, { business_hours });
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CardBusinessHours
}, Symbol.toStringTag, { value: "Module" }));
const defaultContainerClass = "flex w-full flex-col gap-4 border-none p-2 text-center font-bold uppercase tracking-wide text-white";
function CardContactActions({
  phone,
  email,
  banner_color,
  className,
  buttonClassName = "rounded-4xl border-none p-2",
  variant = "solid"
}) {
  if (variant === "bold") {
    if (!phone && !email) {
      return null;
    }
    const tileClass = "inline-flex min-h-11 shrink-0 flex-row items-center gap-2 rounded-2xl border-2 bg-transparent px-3 py-2 shadow-none transition-opacity hover:opacity-85 active:opacity-75";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "flex w-full flex-row flex-wrap items-center justify-center gap-3 border-none p-0",
          className
        ),
        children: [
          phone ? /* @__PURE__ */ jsxs(
            "a",
            {
              href: `tel:${phone}`,
              className: tileClass,
              style: { borderColor: banner_color, color: banner_color },
              children: [
                /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 shrink-0", strokeWidth: 2, "aria-hidden": true }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wide", children: "call me" })
              ]
            }
          ) : null,
          email ? /* @__PURE__ */ jsxs(
            "a",
            {
              href: `mailto:${email}`,
              className: tileClass,
              style: { borderColor: banner_color, color: banner_color },
              children: [
                /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 shrink-0", strokeWidth: 2, "aria-hidden": true }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wide", children: "email me" })
              ]
            }
          ) : null
        ]
      }
    );
  }
  const isOutline = variant === "outline";
  const shellStyle = isOutline ? { borderColor: banner_color, color: banner_color } : { backgroundColor: banner_color };
  return /* @__PURE__ */ jsxs("div", { className: cn(defaultContainerClass, className), children: [
    phone && /* @__PURE__ */ jsx("div", { className: cn(buttonClassName, isOutline && "border-2 bg-transparent"), style: shellStyle, children: /* @__PURE__ */ jsx("a", { href: `tel:${phone}`, className: isOutline ? "text-inherit" : "text-white", children: "call me" }) }),
    email && /* @__PURE__ */ jsx("div", { className: cn(buttonClassName, isOutline && "border-2 bg-transparent"), style: shellStyle, children: /* @__PURE__ */ jsx("a", { href: `mailto:${email}`, className: isOutline ? "text-inherit" : "text-white", children: "email me" }) })
  ] });
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CardContactActions
}, Symbol.toStringTag, { value: "Module" }));
function CardGalleriesSection({ galleries, className = "border-none shadow-none", title = "Galleries" }) {
  if (galleries.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Card, { className, children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: title }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-6", children: galleries.map((item) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-card aspect-video w-full overflow-hidden rounded-lg border", children: item.path && /* @__PURE__ */ jsx("img", { src: item.path, alt: item.description, className: "h-full w-full object-contain" }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: item.description || "No description provided" }) })
    ] }, item.id)) }) })
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CardGalleriesSection
}, Symbol.toStringTag, { value: "Module" }));
function CardIdentity({
  first_name,
  last_name,
  organization,
  job_title,
  className = "mb-8 flex flex-col items-center border-none",
  nameClassName = "font-norma text-foreground flex flex-row space-x-4 text-2xl capitalize",
  detailLineClassName,
  organizationClassName,
  jobTitleClassName,
  jobTitleStyle
}) {
  const lineClass = cn("text-md text-card-foreground font-bold capitalize", detailLineClassName);
  const orgClass = organizationClassName ?? lineClass;
  const jobClass = jobTitleClassName ?? lineClass;
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsxs("div", { className: nameClassName, children: [
      /* @__PURE__ */ jsx("p", { children: first_name }),
      /* @__PURE__ */ jsx("p", { children: last_name })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: orgClass, children: organization }),
      /* @__PURE__ */ jsx("p", { className: jobClass, style: jobTitleStyle, children: job_title })
    ] })
  ] });
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CardIdentity
}, Symbol.toStringTag, { value: "Module" }));
function CardLocationBlock({ address, location, banner_color, className = "flex flex-col gap-2 rounded-lg border-none p-2 shadow-none" }) {
  return /* @__PURE__ */ jsxs("div", { className, children: [
    address && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 p-2", children: [
      /* @__PURE__ */ jsx(MapPin, { className: "h-8 w-8", color: banner_color }),
      /* @__PURE__ */ jsx("p", { className: "font-mute text-md", children: address })
    ] }),
    location && /* @__PURE__ */ jsx("div", { className: "cursor-pointer rounded-4xl p-2 text-center font-bold text-white", style: { backgroundColor: banner_color }, children: /* @__PURE__ */ jsx("a", { href: location, target: "_blank", rel: "noreferrer", className: "capitalize", children: "view on google map" }) })
  ] });
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CardLocationBlock
}, Symbol.toStringTag, { value: "Module" }));
function CardServicesSection({ services, className = "border-none shadow-none", title = "Our Services" }) {
  if (services.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Card, { className, children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: title }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-6", children: services.map((item) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-card aspect-video w-full overflow-hidden rounded-lg border", children: item.path && /* @__PURE__ */ jsx("img", { src: item.path, alt: item.name, className: "h-full w-full object-contain" }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-foreground font-medium", children: item.name }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: item.description || "No description provided" })
      ] })
    ] }, item.id)) }) })
  ] });
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CardServicesSection
}, Symbol.toStringTag, { value: "Module" }));
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
function CardSocialLinks({
  links,
  banner_color,
  className = "flex flex-row flex-wrap items-start justify-center gap-2 border-none",
  iconWrapperClassName = "flex h-[40px] w-[40px] items-center justify-center rounded-full",
  variant = "solid"
}) {
  const isOutline = variant === "outline";
  return /* @__PURE__ */ jsx("div", { className, children: links == null ? void 0 : links.map((link, index) => {
    const Icon2 = socialIconMap[link.name.toLowerCase()] || Globe;
    return link.url && /* @__PURE__ */ jsx("div", { className: "flex flex-row flex-wrap items-center gap-2 rounded-lg border-none p-0", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(iconWrapperClassName, isOutline && "border-2 bg-transparent shadow-none"),
        style: isOutline ? { borderColor: banner_color } : { backgroundColor: banner_color },
        children: /* @__PURE__ */ jsx("a", { href: link.url, className: "text-xl font-bold", children: /* @__PURE__ */ jsx(
          Icon2,
          {
            className: cn("h-5 w-5", isOutline ? "" : "text-white"),
            style: isOutline ? { color: banner_color } : void 0
          }
        ) })
      }
    ) }, index);
  }) });
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CardSocialLinks
}, Symbol.toStringTag, { value: "Module" }));
function BoldCardTemplate(props) {
  const {
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
    business_hours,
    business_hours_enabled
  } = props;
  return /* @__PURE__ */ jsxs(Card, { className: "bg-background w-full overflow-hidden rounded-2xl border-0 shadow-none ring-1 ring-border/30 dark:bg-slate-950", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "relative isolate w-full border-none p-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative z-0 overflow-hidden rounded-t-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[1] bg-gradient-to-t from-background from-15% via-transparent to-transparent", "aria-hidden": true }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 z-[1] opacity-90 dark:opacity-95",
            style: {
              background: `linear-gradient(120deg, ${banner_color} 0%, transparent 50%, rgba(15, 23, 42, 0.55) 100%)`
            },
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative z-0", children: /* @__PURE__ */ jsx(CardBanner, { banner, className: "h-52 sm:h-56" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsx(
        CardAvatarRow,
        {
          avatar,
          logo,
          overlapClassName: "-mt-16",
          avatarFrameClassName: "h-[112px] w-[112px] shadow-xl",
          logoFrameClassName: "h-[88px] w-[88px] shadow-lg",
          avatarRadiusClassName: "rounded-full",
          logoRadiusClassName: "rounded-xl"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "bg-background flex flex-col gap-0 border-none px-4 pb-8 pt-2 dark:bg-slate-950", children: [
      /* @__PURE__ */ jsx(
        CardIdentity,
        {
          first_name,
          last_name,
          organization,
          job_title,
          className: "mb-3 flex flex-col items-center border-none pt-1",
          nameClassName: "text-foreground flex flex-row flex-wrap justify-center gap-x-2 text-3xl font-bold capitalize tracking-tight sm:gap-x-3 sm:text-[1.75rem]",
          organizationClassName: "text-muted-foreground mt-1 max-w-[20rem] text-center text-sm font-medium leading-snug",
          jobTitleClassName: "mt-1.5 text-center text-xs font-semibold uppercase tracking-[0.18em]",
          jobTitleStyle: { color: banner_color }
        }
      ),
      (headline == null ? void 0 : headline.trim()) ? /* @__PURE__ */ jsx(
        "blockquote",
        {
          className: "mt-5 py-0 pl-3.5",
          style: { borderLeft: `3px solid ${banner_color}` },
          children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-left text-xs leading-relaxed sm:text-[0.8125rem]", children: headline })
        }
      ) : null,
      /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-5", children: [
        /* @__PURE__ */ jsx(
          CardSocialLinks,
          {
            links,
            banner_color,
            variant: "outline",
            className: "flex flex-row flex-wrap items-center justify-center gap-3 border-none",
            iconWrapperClassName: "flex h-11 w-11 items-center justify-center rounded-2xl"
          }
        ),
        /* @__PURE__ */ jsx(
          CardContactActions,
          {
            phone,
            email,
            banner_color,
            variant: "bold"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-5", children: [
        /* @__PURE__ */ jsx(
          CardServicesSection,
          {
            services,
            title: "Services",
            className: "border-border/50 rounded-2xl border-0 bg-muted/25 shadow-none dark:bg-muted/15"
          }
        ),
        /* @__PURE__ */ jsx(
          CardGalleriesSection,
          {
            galleries,
            title: "Gallery",
            className: "border-border/50 rounded-2xl border-0 bg-muted/25 shadow-none dark:bg-muted/15"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border/40 bg-muted/15 p-3 dark:bg-muted/10", children: /* @__PURE__ */ jsx(CardBusinessHours, { enabled: business_hours_enabled, business_hours }) }),
        /* @__PURE__ */ jsx(
          CardLocationBlock,
          {
            address,
            location,
            banner_color,
            className: "flex flex-col gap-3 rounded-2xl border border-dashed border-border/50 bg-muted/10 p-3 shadow-none dark:bg-muted/5"
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BoldCardTemplate
}, Symbol.toStringTag, { value: "Module" }));
function CardHeadline({ headline, className = "text-muted-foreground p-2 text-center" }) {
  return /* @__PURE__ */ jsx("div", { className, children: headline });
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CardHeadline
}, Symbol.toStringTag, { value: "Module" }));
function ClassicCardTemplate(props) {
  const {
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
    business_hours,
    business_hours_enabled
  } = props;
  return /* @__PURE__ */ jsxs(Card, { className: "bg-background w-full overflow-hidden rounded-2xl border border-border/60 p-0 shadow-sm dark:bg-slate-950", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "bg-background w-full rounded-t-2xl border-none p-0 dark:bg-slate-950", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-t-2xl", children: /* @__PURE__ */ jsx(CardBanner, { banner, className: "h-[188px]" }) }),
      /* @__PURE__ */ jsx(CardAvatarRow, { avatar, logo, overlapClassName: "-mt-14" })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "bg-background flex flex-col gap-0 border-none px-4 pb-5 pt-1 dark:bg-slate-950", children: [
      /* @__PURE__ */ jsx(
        CardIdentity,
        {
          first_name,
          last_name,
          organization,
          job_title,
          className: "mb-2 flex flex-col items-center border-none pt-2",
          nameClassName: "text-foreground flex flex-row flex-wrap justify-center gap-x-3 text-2xl font-semibold capitalize tracking-tight",
          detailLineClassName: "text-sm font-medium text-muted-foreground"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "border-border/30 my-3 border-t pt-4", children: /* @__PURE__ */ jsx(CardHeadline, { headline, className: "text-muted-foreground px-1 text-center text-sm leading-relaxed" }) }),
      /* @__PURE__ */ jsxs("div", { className: "border-border/30 space-y-4 border-t pt-4", children: [
        /* @__PURE__ */ jsx(CardSocialLinks, { links, banner_color }),
        /* @__PURE__ */ jsx(CardContactActions, { phone, email, banner_color })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-border/30 mt-4 space-y-4 border-t pt-4", children: [
        /* @__PURE__ */ jsx(CardServicesSection, { services }),
        /* @__PURE__ */ jsx(CardGalleriesSection, { galleries }),
        /* @__PURE__ */ jsx(CardBusinessHours, { enabled: business_hours_enabled, business_hours }),
        /* @__PURE__ */ jsx(CardLocationBlock, { address, location, banner_color })
      ] })
    ] })
  ] });
}
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ClassicCardTemplate
}, Symbol.toStringTag, { value: "Module" }));
function ModernCardTemplate(props) {
  const {
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
    business_hours,
    business_hours_enabled
  } = props;
  return /* @__PURE__ */ jsxs(Card, { className: "bg-background w-full overflow-hidden rounded-xl border border-border/60 p-0 shadow-sm dark:border-slate-800 dark:bg-slate-950", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "bg-background w-full border-b border-border/40 p-0 pb-1 dark:bg-slate-950", children: [
      /* @__PURE__ */ jsx(CardBanner, { banner, className: "h-32" }),
      /* @__PURE__ */ jsx(
        CardAvatarRow,
        {
          avatar,
          logo,
          overlapClassName: "-mt-10",
          avatarFrameClassName: "h-20 w-20",
          logoFrameClassName: "h-16 w-16"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "bg-background flex flex-col gap-3 border-none px-4 pb-4 pt-4 dark:bg-slate-950", children: [
      /* @__PURE__ */ jsx(CardHeadline, { headline, className: "text-foreground px-0 text-left text-base font-medium leading-snug" }),
      /* @__PURE__ */ jsx(
        CardIdentity,
        {
          first_name,
          last_name,
          organization,
          job_title,
          className: "mb-0 flex flex-col items-start gap-1 border-none",
          nameClassName: "text-foreground flex flex-row flex-wrap gap-x-2 text-xl font-semibold capitalize",
          organizationClassName: "text-muted-foreground text-sm font-normal",
          jobTitleClassName: "text-foreground text-sm font-semibold"
        }
      ),
      /* @__PURE__ */ jsx(
        CardSocialLinks,
        {
          links,
          banner_color,
          className: "flex flex-row flex-wrap items-center justify-start gap-2 border-none border-t border-border/40 pt-3",
          iconWrapperClassName: "flex h-9 w-9 items-center justify-center rounded-full"
        }
      ),
      /* @__PURE__ */ jsx(
        CardContactActions,
        {
          phone,
          email,
          banner_color,
          className: "flex w-full flex-row flex-wrap gap-2 border-none p-0 text-center text-sm font-semibold capitalize text-white",
          buttonClassName: "min-w-[120px] flex-1 rounded-xl border-none px-3 py-2.5"
        }
      ),
      /* @__PURE__ */ jsx(CardServicesSection, { services, className: "border-border/60 border shadow-none" }),
      /* @__PURE__ */ jsx(CardGalleriesSection, { galleries, className: "border-border/60 border shadow-none" }),
      /* @__PURE__ */ jsx(CardBusinessHours, { enabled: business_hours_enabled, business_hours }),
      /* @__PURE__ */ jsx(CardLocationBlock, { address, location, banner_color, className: "flex flex-col gap-2 rounded-lg border-none p-0 pt-1 shadow-none" })
    ] })
  ] });
}
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModernCardTemplate
}, Symbol.toStringTag, { value: "Module" }));
const CARD_TEMPLATES = {
  classic: ClassicCardTemplate,
  modern: ModernCardTemplate,
  bold: BoldCardTemplate
};
function getCardTemplate(id) {
  if (id && id in CARD_TEMPLATES) {
    return CARD_TEMPLATES[id];
  }
  return ClassicCardTemplate;
}
function MuluCard({ template = "classic", ...props }) {
  const Template = getCardTemplate(template);
  return /* @__PURE__ */ jsx(Template, { ...props });
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  if (items.length === 0) {
    return null;
  }
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
function pathMatchesNav(url, currentPath) {
  if (currentPath === url) {
    return true;
  }
  if (url !== "/" && (currentPath === `${url}/` || currentPath.startsWith(`${url}/`))) {
    return true;
  }
  return false;
}
function NavMain({ items = [] }) {
  const page = usePage();
  return /* @__PURE__ */ jsx(SidebarGroup, { className: "px-2 py-0", children: /* @__PURE__ */ jsx(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, { asChild: true, isActive: pathMatchesNav(item.url, page.url), children: /* @__PURE__ */ jsxs(Link, { href: item.url, prefetch: true, children: [
    item.icon && /* @__PURE__ */ jsx(item.icon, {}),
    /* @__PURE__ */ jsx("span", { children: item.title })
  ] }) }) }, item.title)) }) });
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
      /* @__PURE__ */ jsx(AvatarFallback, { className: "rounded-full bg-muted text-foreground", children: getInitials(user.name) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid min-w-0 flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]/sidebar-wrapper:hidden", children: [
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
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: state === "collapsed" ? "rounded-full p-0" : "rounded-xl border-2 border-sidebar-border/70 bg-sidebar-accent/30 p-1",
        children: [
          /* @__PURE__ */ jsxs(
            SidebarMenuButton,
            {
              size: "lg",
              className: "group text-sidebar-accent-foreground hover:bg-transparent hover:text-sidebar-accent-foreground active:bg-transparent active:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground data-[state=open]:active:bg-sidebar-accent group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-full",
              children: [
                /* @__PURE__ */ jsx(UserInfo, { user: auth.user }),
                /* @__PURE__ */ jsx(ChevronsUpDown, { className: "ml-auto size-4 opacity-70 group-data-[collapsible=icon]:hidden" })
              ]
            }
          ),
          state !== "collapsed" && /* @__PURE__ */ jsx(Fragment, { children: auth.activePlan && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("hr", { className: "border-sidebar-border/60" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-center gap-3 p-1.5", children: [
              /* @__PURE__ */ jsx(BadgeCheck, { className: "size-5 shrink-0 text-primary", "aria-hidden": true }),
              /* @__PURE__ */ jsxs("p", { className: "text-primary text-sm font-semibold capitalize", children: [
                auth.activePlan.plan.name,
                " plan"
              ] })
            ] })
          ] }) })
        ]
      }
    ) }),
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
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-[1px] text-xl font-semibold", children: [
    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Mulu" }),
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
  return /* @__PURE__ */ jsxs(Sidebar, { collapsible: "icon", variant: "sidebar", children: [
    /* @__PURE__ */ jsx(SidebarHeader, { className: "border-b border-sidebar-border/40 pb-3", children: /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, { size: "lg", asChild: true, tooltip: "MuluCard — Dashboard", children: /* @__PURE__ */ jsxs(
      Link,
      {
        href: "/dashboard",
        prefetch: true,
        "aria-label": "MuluCard — go to dashboard",
        className: "!items-center gap-2 overflow-hidden",
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "bg-sidebar-primary text-sidebar-primary-foreground hidden size-9 shrink-0 items-center justify-center rounded-md text-sm font-bold shadow-sm group-data-[collapsible=icon]:flex",
              "aria-hidden": true,
              children: "M"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 group-data-[collapsible=icon]:hidden", children: /* @__PURE__ */ jsx(AppLogo, {}) })
        ]
      }
    ) }) }) }) }),
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
function AppearanceToggleDropdown({ className = "", ...props }) {
  const { appearance, updateAppearance } = useAppearance();
  const toggleTheme = () => {
    updateAppearance(appearance === "dark" ? "light" : "dark");
  };
  return /* @__PURE__ */ jsx("div", { className, ...props, children: /* @__PURE__ */ jsxs(Button, { variant: "secondary", size: "icon", className: "h-9 w-9 rounded-md", onClick: toggleTheme, children: [
    appearance === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Moon, { className: "h-5 w-5" }),
    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
  ] }) });
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
    /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "secondary", size: "icon", className: "relative", children: [
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
  return /* @__PURE__ */ jsxs("header", { className: "flex h-16 shrink-0 items-center justify-between gap-3 border-b border-sidebar-border/50 bg-background/80 px-4 backdrop-blur-md transition-[width,height] ease-linear supports-[backdrop-filter]:bg-background/60 md:px-6 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-2", children: [
      /* @__PURE__ */ jsx(SidebarTrigger, { className: "-ml-1 shrink-0" }),
      /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: /* @__PURE__ */ jsx(Breadcrumbs, { breadcrumbs: breadcrumbs2 }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-1.5 sm:gap-2", children: [
      /* @__PURE__ */ jsx(AppearanceToggleDropdown, {}),
      /* @__PURE__ */ jsx(NotificationPanel, {})
    ] })
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
  /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx("main", { className: "flex-grow", children }) })
] });
const DEMO_MULU_CARD_PROPS = {
  url: "https://mulucard.example/demo",
  banner: {
    file: null,
    path: "https://picsum.photos/seed/mulucard-banner/1200/400"
  },
  avatar: {
    file: null,
    path: "https://picsum.photos/seed/mulucard-avatar/256/256"
  },
  logo: {
    file: null,
    path: "https://picsum.photos/seed/mulucard-logo/128/128"
  },
  first_name: "Avery",
  last_name: "Chen",
  organization: "Northwind Studio",
  job_title: "Product Designer",
  headline: "Helping teams ship interfaces that feel intentional, fast, and human.",
  phone: "+1 (555) 010-4291",
  email: "avery.chen@example.com",
  banner_color: "#3a59ae",
  links: [
    {
      name: "linkedin",
      url: "https://linkedin.com/in/example",
      placeholder: "https://linkedin.com/in/your-profile"
    },
    {
      name: "twitter",
      url: "https://x.com/example",
      placeholder: "https://x.com/your-profile"
    },
    {
      name: "website",
      url: "https://example.com",
      placeholder: "https://your-site.com"
    }
  ],
  address: "1200 Market Street, Suite 400",
  location: "San Francisco, CA",
  galleries: [
    {
      id: "a1b2c3d4-e5f6-4789-a012-b3c4d5e6f708",
      file: null,
      path: "https://picsum.photos/seed/mulucard-gallery1/640/400",
      description: "Recent client dashboard work"
    }
  ],
  services: [
    {
      id: "b2c3d4e5-f6a7-4890-b123-c4d5e6f70891",
      file: null,
      path: "https://picsum.photos/seed/mulucard-service1/400/300",
      name: "UX & UI audits",
      description: "A focused review of your flows with actionable next steps."
    }
  ],
  business_hours_enabled: true,
  business_hours: [
    { id: "11111111-1111-4111-a111-111111111111", day: "Monday", isOpen: true, open: "09:00", close: "17:00" },
    { id: "22222222-2222-4222-a222-222222222222", day: "Tuesday", isOpen: true, open: "09:00", close: "17:00" },
    { id: "33333333-3333-4333-a333-333333333333", day: "Wednesday", isOpen: true, open: "09:00", close: "17:00" },
    { id: "44444444-4444-4444-a444-444444444444", day: "Thursday", isOpen: true, open: "09:00", close: "17:00" },
    { id: "55555555-5555-4555-a555-555555555555", day: "Friday", isOpen: true, open: "09:00", close: "16:00" },
    { id: "66666666-6666-4666-a666-666666666666", day: "Saturday", isOpen: false, open: "10:00", close: "14:00" },
    { id: "77777777-7777-4777-a777-777777777777", day: "Sunday", isOpen: false, open: "10:00", close: "14:00" }
  ]
};
const demo = DEMO_MULU_CARD_PROPS;
function pickText(user, fallback) {
  return user.trim() !== "" ? user : fallback;
}
function pickImage(user, fallback) {
  if (user.path || user.file) {
    return user;
  }
  return fallback;
}
function pickLogo(user, fallback) {
  if (user.path || user.file) {
    return user;
  }
  return fallback;
}
function pickNullableText(user, fallback) {
  if (user.trim() !== "") {
    return user;
  }
  return fallback;
}
function buildCreatePreviewProps(form, validGalleries, validServices) {
  const url = typeof form.url === "string" && form.url.trim() !== "" ? form.url : demo.url;
  return {
    url,
    banner: pickImage(form.banner, demo.banner),
    avatar: pickImage(form.avatar, demo.avatar),
    logo: pickLogo(form.logo, demo.logo),
    first_name: pickText(form.first_name, demo.first_name),
    last_name: pickText(form.last_name, demo.last_name),
    organization: pickText(form.organization, demo.organization),
    job_title: pickText(form.job_title, demo.job_title),
    headline: pickText(form.headline, demo.headline),
    phone: pickText(form.phone, demo.phone),
    email: pickText(form.email, demo.email),
    banner_color: form.banner_color,
    links: form.links.length > 0 ? form.links : demo.links,
    address: pickNullableText(form.address, demo.address),
    location: pickNullableText(form.location, demo.location),
    galleries: validGalleries.length > 0 ? validGalleries : demo.galleries,
    services: validServices.length > 0 ? validServices : demo.services,
    business_hours_enabled: form.business_hours_enabled,
    business_hours: form.business_hours
  };
}
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
  const createLink = (name) => ({
    name,
    url: "",
    placeholder: `https://${name.toLowerCase()}.com/your-profile`
  });
  const [removedLinks, setRemovedLinks] = useState(() => [...cardSocialLinks]);
  const removeLinkItem = (name) => {
    setData(
      "links",
      data.links.filter((link) => link.name !== name)
    );
    setRemovedLinks((prev) => prev.includes(name) ? prev : [...prev, name]);
  };
  const addBackLink = (name) => {
    if (data.links.some((link) => link.name === name)) {
      setRemovedLinks((prev) => prev.filter((link) => link !== name));
      return;
    }
    const newLink = createLink(name);
    setData("links", [...data.links, newLink]);
    setRemovedLinks((prev) => prev.filter((link) => link !== name));
  };
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
  const { data, setData, post, processing, errors } = useForm({
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
    links: [],
    address: "",
    location: "",
    headline: "",
    galleries: [],
    services: [],
    business_hours_enabled: false,
    template: "classic",
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
    return Object.keys(errors2).some((key) => prefixes.some((prefix) => key.startsWith(prefix)));
  };
  const DisplayError = hasTabError(["avatar.file", "banner.file", "logo.file"], errors);
  const personalInformationError = hasTabError(["first_name", "last_name", "organization", "job_title", "email", "phone", "headline"], errors);
  const linksError = hasTabError(["links.0", "links.1", "links.2", "links.3", "links.4", "links.5"], errors);
  const locationError = hasTabError(["address", "location"], errors);
  const galleryError = hasTabError(["galleries.0", "galleries.1", "galleries.2"], errors);
  const serviceError = hasTabError(["services.0", "services.1", "services.2"], errors);
  const businessHoursError = hasTabError(["business_hours.0", "business_hours.1", "business_hours.2"], errors);
  const templateTabError = hasTabError(["template"], errors);
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
  const previewProps = buildCreatePreviewProps(data, validItems, ValidServiceItems);
  const handleFileChange = (field) => (e) => {
    var _a2;
    const file = ((_a2 = e.target.files) == null ? void 0 : _a2[0]) ?? null;
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
    post(route("card.store"), {
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
        /* @__PURE__ */ jsxs("div", { className: "col-span-2 hidden flex-col gap-3 rounded-lg border-none p-0 shadow-none md:flex md:h-[820px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex w-full shrink-0 flex-col gap-1", children: [
            /* @__PURE__ */ jsx(
              CardTemplateSelector,
              {
                value: data.template,
                onChange: (id) => setData("template", id),
                disabled: processing,
                className: "w-full shrink-0"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.template, className: "px-0.5" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground px-0.5 text-xs leading-snug", children: "Empty fields show sample content in the template view only." })
          ] }),
          /* @__PURE__ */ jsx(ScrollArea, { className: "min-h-0 flex-1 cursor-pointer rounded-md border", children: /* @__PURE__ */ jsx(MuluCard, { template: data.template, ...previewProps }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-span-3 border-none p-2", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "display", children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "mb-2 flex h-auto flex-row flex-wrap justify-start", children: [
            /* @__PURE__ */ jsx(TabsTrigger, { value: "display", children: DisplayError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Display" }) : /* @__PURE__ */ jsx("span", { className: "", children: "Display" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "personal_information", children: personalInformationError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Information" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Information" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "links", children: linksError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Social Links" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Social Links" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "location", children: locationError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Location" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Location" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "business_hours", children: businessHoursError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Business Hours" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Business Hours" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "service", children: serviceError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Services" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Services" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "gallery", children: galleryError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Galleries" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Galleries" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "template", className: "md:hidden", children: templateTabError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Template" }) : /* @__PURE__ */ jsx("span", { children: "Template" }) })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "display", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Display" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Make changes to your account here." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 rounded-xl border-2 px-2 py-4", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "avatar-upload", className: "text-sm font-medium text", children: "Upload Your Banner" }),
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
                /* @__PURE__ */ jsxs(Label, { htmlFor: "avatar-upload", className: "text-sm font-medium", children: [
                  "Upload Your Avatar ",
                  /* @__PURE__ */ jsx("span", { className: "text-lg text-red-500", children: "*" })
                ] }),
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
                /* @__PURE__ */ jsx(Label, { htmlFor: "avatar-upload", className: "text-sm font-medium", children: "Upload Your Logo" }),
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
              /* @__PURE__ */ jsx(CardDescription, { children: "Make changes to your personal information here." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 rounded-lg border-2 border-dashed p-2 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxs(Label, { htmlFor: "fname", className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx("span", { children: "First Name" }),
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-lg text-red-500", children: "*" })
                  ] }),
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
                  /* @__PURE__ */ jsxs(Label, { htmlFor: "lname", className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx("span", { children: "Last Name" }),
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-lg text-red-500", children: "*" })
                  ] }),
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
                  /* @__PURE__ */ jsx(Label, { htmlFor: "organization", className: "flex items-center gap-1", children: /* @__PURE__ */ jsx("span", { children: "Organization" }) }),
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
                  /* @__PURE__ */ jsx(Label, { htmlFor: "jobtitle", className: "flex items-center gap-1", children: /* @__PURE__ */ jsx("span", { children: "Job Title" }) }),
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
                  /* @__PURE__ */ jsx(Label, { htmlFor: "phone", className: "flex items-center gap-1", children: /* @__PURE__ */ jsx("span", { children: "Phone" }) }),
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
                  /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "flex items-center gap-1", children: /* @__PURE__ */ jsx("span", { children: "Email" }) }),
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
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border-2 border-dashed p-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "headline", className: "flex items-center gap-1", children: /* @__PURE__ */ jsx("span", { children: "Headline" }) }),
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
              /* @__PURE__ */ jsx(CardDescription, { children: "add social media links." }),
              removedLinks.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-500", children: "Add More Links" }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: removedLinks.map((name) => /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => addBackLink(name),
                    className: "flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsx(PlusCircle, { className: "h-4 w-4" }),
                      name
                    ]
                  },
                  name
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: data.links.map((link, index) => {
              const Icon2 = socialIconMap[link.name.toLowerCase()] || Globe;
              return /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-lg border-2 border-dashed p-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-md flex h-[50px] flex-row items-center justify-between gap-2 border-none px-4 font-bold", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Icon2, { className: "h-6 w-6" }),
                    link.name
                  ] }),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      onClick: () => removeLinkItem(link.name),
                      className: "text-red-500 hover:bg-red-50 hover:text-red-700",
                      children: [
                        /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }),
                        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove" })
                      ]
                    }
                  )
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
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(CardTitle, { children: "Business Hours" }),
                /* @__PURE__ */ jsx(CardDescription, { children: "Set the operating hours for your organization" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx(
                Switch,
                {
                  id: "business-hours-toggle",
                  checked: data.business_hours_enabled,
                  onCheckedChange: (checked) => setData("business_hours_enabled", checked)
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-6", children: data.business_hours_enabled ? data.business_hours.map((day, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-4", children: [
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
            ] }, day.id)) : /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-center", children: "Business hours are disabled. Enable the toggle above to set your business hours." }) })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "service", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Service" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "add all your services" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { className: "space-y-6", children: data.services.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-8 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "No services added yet" }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: addMoreServiceItem,
                  className: "mx-auto flex items-center gap-2",
                  disabled: data.services.length >= serviceLimit,
                  children: [
                    /* @__PURE__ */ jsx(PlusCircle, { className: "h-5 w-5" }),
                    "Add Service"
                  ]
                }
              ),
              data.services.length >= serviceLimit && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-2 text-yellow-600", children: [
                /* @__PURE__ */ jsx(ShieldAlert, { className: "h-8 w-8" }),
                /* @__PURE__ */ jsx("span", { children: "Service limit reached. Upgrade your plan to add more services." })
              ] })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              data.services.map((item, index) => /* @__PURE__ */ jsx(Card, { className: "relative", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-700",
                    onClick: () => removeServiceItem(item.id),
                    children: [
                      /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }),
                      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs(
                      Label,
                      {
                        htmlFor: `image-${item.id}`,
                        className: "flex items-center gap-1 text-sm font-medium text-black",
                        children: [
                          /* @__PURE__ */ jsx("span", { children: "Upload Your Image" }),
                          /* @__PURE__ */ jsx("span", { className: "text-lg text-red-500", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: item.file ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-gray-50 p-2 dark:bg-gray-800", children: [
                      /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: typeof item.file === "string" ? item.file : item.file.name }),
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
                    ] }) }),
                    /* @__PURE__ */ jsx(
                      InputError,
                      {
                        message: errors[`services.${index}.file`],
                        className: "mt-2"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs(Label, { htmlFor: "name", className: "mb-2 block flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx("span", { children: "Name" }),
                      /* @__PURE__ */ jsx("span", { className: "text-lg text-red-500", children: "*" })
                    ] }),
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
                    /* @__PURE__ */ jsxs(
                      Label,
                      {
                        htmlFor: `description-${item.id}`,
                        className: "mb-2 block flex items-center gap-1",
                        children: [
                          /* @__PURE__ */ jsx("span", { children: "Description" }),
                          /* @__PURE__ */ jsx("span", { className: "text-lg text-red-500", children: "*" })
                        ]
                      }
                    ),
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
              data.services.length >= serviceLimit && /* @__PURE__ */ jsx(InputError, { message: errors.services, className: "mt-2" }),
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
                      "Add Service"
                    ]
                  }
                ),
                data.services.length >= serviceLimit && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-yellow-600", children: [
                  /* @__PURE__ */ jsx(ShieldAlert, { className: "h-8 w-8" }),
                  /* @__PURE__ */ jsx("span", { children: "Service limit reached. Upgrade your plan to add more services." })
                ] })
              ] })
            ] }) }) })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "gallery", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Gallery" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "add all your images" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { className: "space-y-6", children: data.galleries.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-8 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "No images added yet" }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: addMoreItem,
                  className: "mx-auto flex items-center gap-2",
                  disabled: data.galleries.length >= galleryLimit,
                  children: [
                    /* @__PURE__ */ jsx(PlusCircle, { className: "h-5 w-5" }),
                    "Add Image"
                  ]
                }
              ),
              data.galleries.length >= galleryLimit && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-2 text-yellow-600", children: [
                /* @__PURE__ */ jsx(ShieldAlert, { className: "h-6 w-6" }),
                /* @__PURE__ */ jsx("span", { children: "Gallery limit reached. Upgrade your plan to add more images." })
              ] })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              data.galleries.map((item, index) => /* @__PURE__ */ jsx(Card, { className: "relative", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "absolute top-2 right-2 text-red-500 hover:bg-red-50 hover:text-red-700",
                    onClick: () => removeGalleryItem(item.id),
                    children: [
                      /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }),
                      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs(
                      Label,
                      {
                        htmlFor: `image-${item.id}`,
                        className: "flex items-center gap-1 text-sm font-medium text-black",
                        children: [
                          /* @__PURE__ */ jsx("span", { children: "Upload Your Image" }),
                          /* @__PURE__ */ jsx("span", { className: "text-lg text-red-500", children: "*" })
                        ]
                      }
                    ),
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
                    /* @__PURE__ */ jsxs(
                      Label,
                      {
                        htmlFor: `description-${item.id}`,
                        className: "mb-2 block flex items-center gap-1",
                        children: [
                          /* @__PURE__ */ jsx("span", { children: "Description" }),
                          /* @__PURE__ */ jsx("span", { className: "text-lg text-red-500", children: "*" })
                        ]
                      }
                    ),
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
              data.galleries.length >= galleryLimit && /* @__PURE__ */ jsx(InputError, { message: errors.galleries, className: "mt-2" }),
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
                      "Add Image"
                    ]
                  }
                ),
                data.galleries.length >= galleryLimit && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-yellow-600", children: [
                  /* @__PURE__ */ jsx(ShieldAlert, { className: "h-6 w-6" }),
                  /* @__PURE__ */ jsx("span", { children: "Gallery limit reached. Upgrade your plan to add more images." })
                ] })
              ] })
            ] }) }) })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "template", className: "md:hidden", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Template" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "See how your card looks with the selected template. Adjust images and colors on Display." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsx(
                CardTemplateSelector,
                {
                  value: data.template,
                  onChange: (id) => setData("template", id),
                  disabled: processing,
                  className: "w-full shrink-0"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.template, className: "px-0.5" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground px-0.5 text-xs leading-snug", children: "Empty fields show sample content in the template view only." }),
              /* @__PURE__ */ jsx(ScrollArea, { className: "h-[min(70vh,820px)] cursor-pointer rounded-md border", children: /* @__PURE__ */ jsx(MuluCard, { template: data.template, ...previewProps }) })
            ] })
          ] }) })
        ] }) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateCard
}, Symbol.toStringTag, { value: "Module" }));
const breadcrumbs$7 = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Edit Card", href: "" }
];
function EditCard({ card }) {
  var _a, _b, _c, _d, _e;
  const props = usePage().props;
  const auth = props.auth;
  const activePlan = auth.activePlan;
  const serviceLimit = ((_a = activePlan == null ? void 0 : activePlan.plan) == null ? void 0 : _a.number_of_service) ?? 0;
  const galleryLimit = ((_b = activePlan == null ? void 0 : activePlan.plan) == null ? void 0 : _b.number_of_gallery) ?? 0;
  const cardSocialLinks = props.cardSocialLinks;
  const existingLinksMap = new Map(
    (card.links || []).map((link) => [link.name, link.url])
  );
  const existingLinks = cardSocialLinks.filter((linkName) => existingLinksMap.has(linkName));
  const initialRemovedLinks = cardSocialLinks.filter((linkName) => !existingLinksMap.has(linkName));
  const [removedLinks, setRemovedLinks] = useState(initialRemovedLinks);
  const removeLinkItem = (name) => {
    setData(
      "links",
      data.links.filter((link) => link.name !== name)
    );
    setRemovedLinks([...removedLinks, name]);
  };
  const addBackLink = (name) => {
    const newLink = {
      name,
      url: "",
      placeholder: `https://${name.toLowerCase()}.com/your-profile`
    };
    setData("links", [...data.links, newLink]);
    setRemovedLinks(removedLinks.filter((link) => link !== name));
  };
  const links = existingLinks.map((linkName) => ({
    name: linkName,
    url: existingLinksMap.get(linkName) || "",
    placeholder: `https://${linkName.toLowerCase()}.com/your-profile`
  }));
  useState(initialRemovedLinks);
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
  const { data, setData, post, processing, errors } = useForm({
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
    business_hours_enabled: card.business_hours_enabled,
    template: card.template ?? "classic",
    business_hours: card.business_hours || [
      { id: crypto.randomUUID(), day: "Monday", isOpen: true, open: "09:00", close: "17:00" },
      { id: crypto.randomUUID(), day: "Tuesday", isOpen: true, open: "09:00", close: "17:00" },
      { id: crypto.randomUUID(), day: "Wednesday", isOpen: true, open: "09:00", close: "17:00" },
      { id: crypto.randomUUID(), day: "Thursday", isOpen: true, open: "09:00", close: "17:00" },
      { id: crypto.randomUUID(), day: "Friday", isOpen: true, open: "09:00", close: "17:00" },
      { id: crypto.randomUUID(), day: "Saturday", isOpen: false, open: "09:00", close: "17:00" },
      { id: crypto.randomUUID(), day: "Sunday", isOpen: false, open: "09:00", close: "17:00" }
    ]
  });
  const hasTabError = (prefixes, errors2) => {
    return Object.keys(errors2).some(
      (key) => prefixes.some((prefix) => key.startsWith(prefix))
    );
  };
  const DisplayError = hasTabError(["avatar.file", "banner.file", "banner.path", "logo.file"], errors);
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
  const templateTabError = hasTabError(["template"], errors);
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
        return {
          ...item,
          file,
          path: file ? URL.createObjectURL(file) : null
        };
      }
      return item;
    });
    console.log(newService);
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
    setData("services", [...data.services, {
      id: crypto.randomUUID(),
      file: null,
      path: null,
      name: "",
      description: ""
    }]);
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
    post(route("card.update", card.id), {
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
        /* @__PURE__ */ jsx(Link, { className: "cursor-pointer bg-red-500 hover:bg-red-600 rounded-lg px-4 py-1 text-white font-bold", href: route("card.show", card.id), children: "Cancel" }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", type: "submit", className: "cursor-pointer bg-green-600 text-white", disabled: processing, children: [
          processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Update Card"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "m-2 grid h-full flex-1 grid-cols-1 gap-4 rounded-xl border-none p-4 md:grid-cols-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-2 hidden flex-col gap-3 rounded-lg border-none p-0 shadow-none md:flex md:h-[820px]", children: [
          /* @__PURE__ */ jsx(
            CardTemplateSelector,
            {
              value: data.template,
              onChange: (id) => setData("template", id),
              disabled: processing,
              className: "w-full shrink-0"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.template, className: "px-0.5" }),
          /* @__PURE__ */ jsx(ScrollArea, { className: "min-h-0 flex-1 cursor-pointer rounded-md border", children: /* @__PURE__ */ jsx(
            MuluCard,
            {
              template: data.template,
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
              business_hours_enabled: data.business_hours_enabled,
              banner: data.banner,
              url: data.url
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-span-3 border-none p-2", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "display", children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "flex h-auto w-full flex-row flex-wrap justify-start", children: [
            /* @__PURE__ */ jsx(TabsTrigger, { value: "display", children: DisplayError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Display" }) : /* @__PURE__ */ jsx("span", { className: "", children: "Display" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "personal_information", children: personalInformationError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Information" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Information" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "links", children: linksError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Social Links" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Social Links" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "location", children: locationError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Location" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Location" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "business_hours", children: businessHoursError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Business Hours" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Business Hours" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "service", children: serviceError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Services" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Services" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "gallery", children: galleryError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Galleries" }) : /* @__PURE__ */ jsx("span", { className: "", children: " Galleries" }) }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "template", className: "md:hidden", children: templateTabError ? /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Template" }) : /* @__PURE__ */ jsx("span", { children: "Template" }) })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "display", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Display" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Update your display settings here." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 rounded-xl border-2 px-2 py-4", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "banner-upload", className: "text-sm font-medium", children: "Upload Your Banner" }),
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
                /* @__PURE__ */ jsxs(Label, { htmlFor: "avatar-upload", className: "text-sm font-medium", children: [
                  "Upload Your Avatar ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-500 text-lg", children: "*" })
                ] }),
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
                /* @__PURE__ */ jsx(Label, { htmlFor: "logo-upload", className: "text-sm font-medium", children: "Upload Your Logo" }),
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
                  /* @__PURE__ */ jsxs(Label, { htmlFor: "fname", children: [
                    "First Name ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500 text-lg", children: "*" })
                  ] }),
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
                  /* @__PURE__ */ jsxs(Label, { htmlFor: "lname", children: [
                    "Last Name ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500 text-lg", children: "*" })
                  ] }),
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
              /* @__PURE__ */ jsx(CardDescription, { children: "Update your social media links." }),
              removedLinks.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-2 text-sm font-medium", children: "Removed Links" }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: removedLinks.map((linkName) => /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => addBackLink(linkName),
                    className: "flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsx(PlusCircle, { className: "h-4 w-4" }),
                      linkName
                    ]
                  },
                  linkName
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: data.links.map((link, index) => {
              const Icon2 = socialIconMap[link.name.toLowerCase()] || null;
              return /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-lg border-2 border-dashed p-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-md flex h-[50px] flex-row items-center justify-between border-none px-4 font-bold", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    Icon2 && /* @__PURE__ */ jsx(Icon2, { className: "h-6 w-6" }),
                    link.name
                  ] }),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      onClick: () => removeLinkItem(link.name),
                      className: "text-red-500 hover:text-red-700 hover:bg-red-50",
                      children: [
                        /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }),
                        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove" })
                      ]
                    }
                  )
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
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(CardTitle, { children: "Business Hours" }),
                /* @__PURE__ */ jsx(CardDescription, { children: "Update the operating hours for your organization." })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx(
                Switch,
                {
                  id: "business-hours-toggle",
                  checked: data.business_hours_enabled,
                  onCheckedChange: (checked) => setData("business_hours_enabled", checked)
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-6", children: data.business_hours_enabled ? (_e = data.business_hours) == null ? void 0 : _e.map((day, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-4", children: [
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
            ] }, day.id)) : /* @__PURE__ */ jsx("div", { className: "text-center text-muted-foreground", children: "Business hours are disabled. Enable the toggle above to set your business hours." }) })
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
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "template", className: "md:hidden", children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Template" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "See how your card looks with the selected template. Adjust images and colors on Display." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsx(
                CardTemplateSelector,
                {
                  value: data.template,
                  onChange: (id) => setData("template", id),
                  disabled: processing,
                  className: "w-full shrink-0"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.template, className: "px-0.5" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground px-0.5 text-xs leading-snug", children: "Empty fields show sample content in the template view only." }),
              /* @__PURE__ */ jsx(ScrollArea, { className: "h-[min(70vh,820px)] cursor-pointer rounded-md border", children: /* @__PURE__ */ jsx(
                MuluCard,
                {
                  template: data.template,
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
                  business_hours_enabled: data.business_hours_enabled,
                  banner: data.banner,
                  url: data.url
                }
              ) })
            ] })
          ] }) })
        ] }) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  const { data, setData, post, get, errors, reset } = useForm({
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
      /* @__PURE__ */ jsx("div", { className: "col-span-1 hidden rounded-sm border-0 p-0 md:block", children: /* @__PURE__ */ jsx(ScrollArea, { className: "h-[800px] pr-2", children: /* @__PURE__ */ jsx(
        MuluCard,
        {
          template: card.template ?? "classic",
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
          business_hours_enabled: card.business_hours_enabled,
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
                    /* @__PURE__ */ jsx("span", { className: "text-lg font-extrabold text-foreground capitalize", children: isCopied ? "copied!" : "copy link" })
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
                /* @__PURE__ */ jsx("span", { className: "text-normal text-sm text-wrap break-all", children: route("card.hello", { url: data.personalizedurl == "" ? card.url : data.personalizedurl }) }),
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
              /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-between rounded-lg border-2 border-red-400 bg-card px-4 py-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-extrabold text-foreground", children: "Delete" }),
                  /* @__PURE__ */ jsx("p", { className: "text-mute font-normal", children: "Delete this card permanently." })
                ] }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "cursor-pointer border-2 border-red-400 font-extrabold text-foreground hover:text-red-700",
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
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  const { data, setData, post, errors } = useForm({
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
    post(route("checkout.order", { plan }), {
      onSuccess: () => {
        toast.success("Your order has been placed successfully! Your subscription will be activated shortly after approval. Thank you for choosing MuluCard!");
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
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BankSelector,
  PaymentLayout,
  TransactionCodeInput,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
function CardPreview({
  banner,
  avatar,
  logo,
  first_name,
  last_name,
  banner_color,
  onShowCardDetail,
  onDelete,
  onCopyLink,
  onDownloadQR,
  onHelloCard,
  onEdit
}) {
  const hexOk = /^#[0-9A-Fa-f]{6}$/i.test(banner_color);
  const brandBannerStyle = !banner.path && hexOk ? {
    background: `linear-gradient(135deg, ${banner_color}55, ${banner_color}2e, ${banner_color}40)`
  } : void 0;
  const stripStyle = hexOk ? { backgroundColor: banner_color } : void 0;
  return /* @__PURE__ */ jsxs(Card, { className: "group bg-card relative flex w-full flex-col gap-0 overflow-hidden rounded-2xl border-0 py-0 shadow-sm ring-1 ring-border/50 transition-[transform,box-shadow,ring-color] hover:-translate-y-1 hover:shadow-lg hover:ring-border dark:ring-border/40 dark:hover:ring-border", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn("h-1.5 w-full shrink-0", !hexOk && "bg-primary"),
        style: stripStyle,
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "relative", children: banner.path ? /* @__PURE__ */ jsxs("div", { className: "relative h-[7.25rem] w-full", children: [
      /* @__PURE__ */ jsx("img", { src: banner.path, alt: "", className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" })
    ] }) : /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-20 w-full bg-gradient-to-br from-muted/80 via-muted/50 to-muted/80 dark:from-muted/35 dark:via-muted/20 dark:to-muted/35",
        style: brandBannerStyle
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "relative -mt-9 px-4 pb-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "ring-background bg-background h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-2xl shadow-md ring-4", children: avatar.path ? /* @__PURE__ */ jsx("img", { src: avatar.path, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "bg-muted flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "text-muted-foreground h-9 w-9", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }) }) }) }),
        logo.path ? /* @__PURE__ */ jsx("div", { className: "border-border/60 bg-background mb-0.5 h-11 w-11 shrink-0 overflow-hidden rounded-xl border shadow-sm", children: /* @__PURE__ */ jsx("img", { src: logo.path, alt: "", className: "h-full w-full object-contain p-1" }) }) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-0.5", children: [
        /* @__PURE__ */ jsxs(
          "h3",
          {
            className: "text-foreground cursor-pointer text-left text-base font-semibold leading-snug tracking-tight hover:underline",
            title: "View card details",
            role: "button",
            tabIndex: 0,
            onClick: onShowCardDetail,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onShowCardDetail();
              }
            },
            children: [
              first_name,
              " ",
              last_name
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-left text-xs font-medium", children: "Digital business card" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-border/50 bg-muted/25 mt-3 flex flex-wrap items-center justify-center gap-1 border-t px-2 py-2.5 dark:bg-muted/15", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "h-9 w-9 shrink-0 rounded-lg p-0",
          title: "Open public card",
          "aria-label": "Open public card",
          onClick: (e) => {
            e.stopPropagation();
            onHelloCard();
          },
          children: /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4" })
        }
      ),
      onEdit ? /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "h-9 w-9 shrink-0 rounded-lg p-0",
          title: "Edit card",
          "aria-label": "Edit card",
          onClick: (e) => {
            e.stopPropagation();
            onEdit();
          },
          children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" })
        }
      ) : null,
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "h-9 w-9 shrink-0 rounded-lg p-0",
          title: "View card details",
          "aria-label": "View card details",
          onClick: (e) => {
            e.stopPropagation();
            onShowCardDetail();
          },
          children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "h-9 w-9 shrink-0 rounded-lg p-0",
            title: "More actions",
            "aria-label": "More actions",
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" })
          }
        ) }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [
          onDelete ? /* @__PURE__ */ jsxs(
            DropdownMenuItem,
            {
              onClick: (e) => {
                e.stopPropagation();
                onDelete();
              },
              className: "text-destructive focus:text-destructive",
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                "Delete Card"
              ]
            }
          ) : null,
          onCopyLink ? /* @__PURE__ */ jsxs(
            DropdownMenuItem,
            {
              onClick: (e) => {
                e.stopPropagation();
                onCopyLink();
              },
              children: [
                /* @__PURE__ */ jsx(Copy, { className: "mr-2 h-4 w-4" }),
                "Copy Link"
              ]
            }
          ) : null,
          onDownloadQR ? /* @__PURE__ */ jsxs(
            DropdownMenuItem,
            {
              onClick: (e) => {
                e.stopPropagation();
                onDownloadQR();
              },
              children: [
                /* @__PURE__ */ jsx(Download, { className: "mr-2 h-4 w-4" }),
                "Download QR Code"
              ]
            }
          ) : null
        ] })
      ] })
    ] })
  ] });
}
function DoughnutChart({ activeCards, inactiveCards }) {
  const totalCards = activeCards + inactiveCards;
  const data = [
    { name: "Active", value: activeCards, color: "#22c55e" },
    { name: "Inactive", value: inactiveCards, color: "#ef4444" }
  ];
  const segments = [
    {
      name: "Active",
      value: activeCards,
      color: "#22c55e",
      textColor: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500",
      icon: CheckCircle2
    },
    {
      name: "Inactive",
      value: inactiveCards,
      color: "#ef4444",
      textColor: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-500",
      icon: CircleOff
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto h-44 w-full max-w-[180px]", children: [
      /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsx(PieChart, { children: /* @__PURE__ */ jsx(Pie, { data, cx: "50%", cy: "50%", innerRadius: 52, outerRadius: 72, paddingAngle: 4, dataKey: "value", stroke: "none", children: data.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, `cell-${index}`)) }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-slate-900 dark:text-slate-100", children: totalCards }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: "total cards" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: segments.map((segment) => {
      const Icon2 = segment.icon;
      const percentage = totalCards === 0 ? 0 : Math.round(segment.value / totalCards * 100);
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "rounded-xl border border-slate-200/70 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-900/60",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: `flex h-8 w-8 items-center justify-center rounded-full ${segment.bgColor}`, children: /* @__PURE__ */ jsx(Icon2, { className: "h-4 w-4 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: segment.name }),
                  /* @__PURE__ */ jsxs("p", { className: `text-xs ${segment.textColor}`, children: [
                    percentage,
                    "% of cards"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-slate-100", children: segment.value })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "h-full rounded-full",
                style: {
                  width: `${Math.max(percentage, segment.value > 0 ? 8 : 0)}%`,
                  backgroundColor: segment.color
                }
              }
            ) })
          ]
        },
        segment.name
      );
    }) })
  ] }) });
}
const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];
function TopViewedChart({ cards }) {
  const data = cards.map((card, index) => ({
    id: card.id,
    rank: index + 1,
    name: `${card.first_name} ${card.last_name}`,
    views: card.total_views,
    fill: COLORS[index % COLORS.length]
  }));
  const maxViews = Math.max(...data.map((entry) => entry.views), 1);
  if (data.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "flex h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-6 text-center dark:border-slate-800 dark:bg-slate-900/60", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-3 rounded-full bg-white p-3 shadow-sm dark:bg-slate-800", children: /* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5 text-slate-500" }) }),
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-slate-900 dark:text-slate-100", children: "No viewing data yet" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-slate-500 dark:text-slate-400", children: "Card performance will appear here once people start opening your cards." })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/40", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400", children: "Leaderboard" }),
        /* @__PURE__ */ jsx("h4", { className: "mt-1 text-base font-semibold text-slate-900 dark:text-slate-100", children: "Most viewed cards" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-full bg-slate-100 p-2 dark:bg-slate-800", children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 text-slate-600 dark:text-slate-300" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: data.map((entry) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "rounded-xl border border-slate-200/70 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-900/60",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white",
                  style: { backgroundColor: entry.fill },
                  children: entry.rank
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium text-slate-900 dark:text-slate-100", children: entry.name }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "shrink-0 text-right", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-slate-100", children: entry.views }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-500 dark:text-slate-400", children: "views" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full rounded-full",
              style: {
                width: `${Math.max(entry.views / maxViews * 100, 8)}%`,
                backgroundColor: entry.fill
              }
            }
          ) })
        ]
      },
      entry.id
    )) })
  ] });
}
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
    router.get(route("card.show", { id }));
  }
  function showHelloCard(card) {
    router.get(card.url);
  }
  function deleteCard(card) {
    if (confirm("Are you sure you want to delete this card? This action cannot be undone.")) {
      router.get(route("card.delete", { id: card.id }), {
        onSuccess: () => {
          toast.success("Card deleted");
        }
      });
    }
  }
  async function copyCardLink(card_url) {
    try {
      await navigator.clipboard.writeText(card_url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy link");
    }
  }
  function downloadQRCode(card) {
    const link = document.createElement("a");
    link.href = `/storage/${card == null ? void 0 : card.qr_code}`;
    link.download = "qr_code.png";
    link.click();
  }
  function editCard(id) {
    router.get(route("card.edit", { id }));
  }
  const { props } = usePage();
  const cards = props.cards;
  const reports = props.reports;
  const topViewedCards = props.topViewedCards || [];
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs: breadcrumbs$5, children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    reports.total_cards === 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-4 rounded-xl border-none p-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-4 rounded-xl border-none p-2", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-foreground text-xl font-bold capitalize", children: "No cards found" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "You have no cards. Create one now." })
      ] }),
      /* @__PURE__ */ jsx(Link, { href: "card/create", children: /* @__PURE__ */ jsxs(Button, { size: "lg", children: [
        /* @__PURE__ */ jsx("span", { children: "Create New Card" }),
        /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
      ] }) })
    ] }),
    reports.total_cards > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      permissions.card.create && /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-end p-2", children: /* @__PURE__ */ jsx(Link, { href: "card/create", children: /* @__PURE__ */ jsxs(Button, { size: "lg", children: [
        /* @__PURE__ */ jsx("span", { children: "Create New Card" }),
        /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 p-4 md:grid-cols-3 md:px-8", children: [
        /* @__PURE__ */ jsxs(Card, { className: "relative overflow-hidden border-0 bg-blue-50 dark:bg-blue-950", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 rounded-full bg-blue-600 p-3", children: /* @__PURE__ */ jsx(CreditCard, { className: "h-6 w-6 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-blue-700 dark:text-blue-300", children: "Total Cards" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-blue-900 dark:text-blue-100", children: reports.total_cards }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-blue-600 dark:text-blue-400", children: "All your digital cards" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "relative overflow-hidden border-0 bg-green-50 dark:bg-green-950", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 rounded-full bg-green-600 p-3", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-6 w-6 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-green-700 dark:text-green-300", children: "Active Cards" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-green-900 dark:text-green-100", children: reports.active_cards }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-green-600 dark:text-green-400", children: "Currently live cards" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "relative overflow-hidden border-0 bg-red-50 dark:bg-red-950", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 rounded-full bg-red-600 p-3", children: /* @__PURE__ */ jsx(XCircle, { className: "h-6 w-6 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-red-700 dark:text-red-300", children: "Inactive Cards" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-red-900 dark:text-red-100", children: reports.inactive_cards }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600 dark:text-red-400", children: "Hidden or disabled cards" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:px-8", children: [
        /* @__PURE__ */ jsxs(Card, { className: "border-0 bg-gradient-to-br from-slate-50 via-white to-slate-100/70 p-4 shadow-sm dark:from-slate-950 dark:via-slate-900 dark:to-slate-950", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-slate-100", children: "Card Status Distribution" }) }),
          /* @__PURE__ */ jsx(DoughnutChart, { activeCards: reports.active_cards, inactiveCards: reports.inactive_cards })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-0 bg-gradient-to-br from-slate-50 via-white to-slate-100/70 p-4 shadow-sm dark:from-slate-950 dark:via-slate-900 dark:to-slate-950", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-slate-100", children: "Top 5 Most Viewed Cards" }) }),
          /* @__PURE__ */ jsx(TopViewedChart, { cards: topViewedCards })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: cards.map((card) => /* @__PURE__ */ jsx(
        CardPreview,
        {
          banner: card.banner,
          avatar: card.avatar,
          logo: card.logo,
          first_name: card.first_name,
          last_name: card.last_name,
          banner_color: card.banner_color,
          onShowCardDetail: () => showCardDetail(card.id),
          onHelloCard: () => showHelloCard(card),
          onDelete: () => deleteCard(card),
          onCopyLink: () => copyCardLink(card.url),
          onDownloadQR: () => downloadQRCode(card),
          onEdit: () => editCard(card.id)
        },
        card.id
      )) })
    ] })
  ] });
}
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
function ErrorPage({ status }) {
  const title = {
    503: "503: Service Unavailable",
    500: "500: Server Error",
    404: "404: Page Not Found",
    403: "403: Forbidden"
  }[status];
  const description = {
    503: "Sorry, we are doing some maintenance. Please check back soon.",
    500: "Whoops, something went wrong on our servers.",
    404: "Sorry, the page you are looking for could not be found.",
    403: "Sorry, you are forbidden from accessing this page."
  }[status];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: title }),
    /* @__PURE__ */ jsx("div", { children: description })
  ] });
}
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ErrorPage
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
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "default", size: "sm", className: cn("gap-2", className), children: [
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
  function downloadQRCode() {
    if (!(card == null ? void 0 : card.qr_code)) return;
    const link = document.createElement("a");
    link.href = `/storage/${card.qr_code}`;
    link.download = "qr_code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "fixed top-4 right-4 z-50", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 rounded-md border border-border bg-popover/90 p-1 shadow-lg backdrop-blur-sm", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "secondary",
          size: "icon",
          className: "h-9 w-9 shrink-0 rounded-md",
          onClick: () => downloadQRCode(),
          "aria-label": "Download QR code",
          children: /* @__PURE__ */ jsx(Download, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsx(AppearanceToggleDropdown, { className: "shrink-0" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-background flex min-h-svh flex-col justify-between gap-4 p-1", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mt-0 mb-24 w-full rounded-2xl p-1 md:mb-10 md:w-[500px] md:bg-white/80 md:shadow-sm md:ring-1 md:ring-slate-200/70 md:backdrop-blur-sm dark:md:bg-slate-900/70 dark:md:shadow-black/20 dark:md:ring-white/10", children: /* @__PURE__ */ jsx(
        MuluCard,
        {
          template: card.template ?? "classic",
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
          business_hours_enabled: card == null ? void 0 : card.business_hours_enabled,
          business_hours: card == null ? void 0 : card.business_hours,
          banner: card == null ? void 0 : card.banner
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "items-top bg-primary text-primary-foreground fixed bottom-0 -mb-8 flex h-16 w-xl justify-center self-center rounded-4xl border-none pt-2", children: "a digital business card from MuluCard" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 h-24 w-full border-none p-0", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-row justify-between p-2", children: [
      /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
        ShareButton,
        {
          title: "Check out this awesome content!",
          description: "I found this really interesting article that I thought you might enjoy."
        }
      ) }),
      /* @__PURE__ */ jsxs(Button, { variant: "default", size: "sm", onClick: () => downloadVCard(), children: [
        /* @__PURE__ */ jsx(Contact, { className: "h-4 w-4" }),
        "Add To Contact"
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hello
}, Symbol.toStringTag, { value: "Module" }));
const MagicLinkError = () => {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 p-4", children: /* @__PURE__ */ jsx(Card, { className: "max-w-md w-full text-center shadow-none rounded-2xl p-6", children: /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-4", children: [
    /* @__PURE__ */ jsx(AlertCircle, { className: "text-red-500 w-12 h-12" }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Login Failed" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Your magic login link is invalid or has expired. Please request a new link to continue." }),
    /* @__PURE__ */ jsx(Button, { variant: "default", className: "font-medium", children: /* @__PURE__ */ jsx(Link, { href: route("login"), children: "Log in" }) })
  ] }) }) }) });
};
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MagicLinkError
}, Symbol.toStringTag, { value: "Module" }));
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs("footer", { className: "bg-background relative border-t", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4 py-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-1", children: [
          /* @__PURE__ */ jsx("a", { href: "/", className: "mb-4 inline-block", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center text-xl font-semibold", children: [
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "mulu" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "card" })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground mb-4 text-sm", children: "Modern digital business cards for professionals." }),
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-1", children: [
            /* @__PURE__ */ jsxs(Button, { variant: "secondary", size: "icon", className: "h-8 w-8 rounded-full", children: [
              /* @__PURE__ */ jsx(Twitter, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Twitter" })
            ] }),
            /* @__PURE__ */ jsxs(Button, { variant: "secondary", size: "icon", className: "h-8 w-8 rounded-full", children: [
              /* @__PURE__ */ jsx(Instagram, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Instagram" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-foreground mb-4 font-semibold", children: "Company" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-foreground text-sm transition-colors", children: "About" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-foreground text-sm transition-colors", children: "Blog" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "text-muted-foreground hover:text-foreground text-sm transition-colors dark:text-gray-300", children: "Contact Us" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-foreground mb-4 font-semibold", children: "Legal" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: route("privacy-policy"), className: "text-muted-foreground hover:text-foreground text-sm transition-colors", children: "Privacy Policy" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: route("terms"), className: "text-muted-foreground hover:text-foreground text-sm transition-colors", children: "Terms of Service" }) })
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
    /* @__PURE__ */ jsx("div", { className: "border-t border-slate-200/70 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/70", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4 py-4 text-center text-xs text-slate-500 dark:text-slate-400", children: "a digital business card from MuluCard" }) })
  ] });
}
function Navbar() {
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
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Mulu" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "Card" })
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden items-center gap-8 md:flex", children: [
            /* @__PURE__ */ jsx("a", { href: "#features", className: "text-foreground text-sm font-medium transition-colors", children: "Features" }),
            /* @__PURE__ */ jsx("a", { href: "#how-it-works", className: "text-foreground text-sm font-medium transition-colors", children: "How It Works" }),
            /* @__PURE__ */ jsx("a", { href: "#templates", className: "text-foreground text-sm font-medium transition-colors", children: "Templates" }),
            /* @__PURE__ */ jsx("a", { href: "#pricing", className: "text-foreground text-sm font-medium transition-colors", children: "Pricing" })
          ] }),
          auth.user ? /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-4 md:flex", children: [
            /* @__PURE__ */ jsx(AppearanceToggleDropdown, {}),
            /* @__PURE__ */ jsx(Button, { className: "text-white transition-colors", children: /* @__PURE__ */ jsx(Link, { href: route("dashboard"), children: "Dashboard" }) })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-4 md:flex", children: [
            /* @__PURE__ */ jsx(AppearanceToggleDropdown, {}),
            /* @__PURE__ */ jsx(Button, { variant: "secondary", className: "font-medium", children: /* @__PURE__ */ jsx(Link, { href: route("login"), children: "Log in" }) }),
            /* @__PURE__ */ jsx(Button, { className: "text-white transition-colors", children: /* @__PURE__ */ jsx(Link, { href: route("register"), children: "Get Started" }) })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "text-foreground md:hidden", onClick: () => setIsMenuOpen(!isMenuOpen), children: isMenuOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" }) })
        ] }) }),
        isMenuOpen && /* @__PURE__ */ jsx("div", { className: "glass animate-fade-in bg-background/95 absolute top-full right-0 left-0 h-screen p-4 shadow-md md:hidden backdrop-blur-lg", children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-col items-start gap-8 border-none", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#features",
              className: "text-foreground text-sm font-medium transition-colors",
              onClick: () => setIsMenuOpen(false),
              children: "Features"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#how-it-works",
              className: "text-foreground text-sm font-medium transition-colors",
              onClick: () => setIsMenuOpen(false),
              children: "How It Works"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#templates",
              className: "text-foreground text-sm font-medium transition-colors",
              onClick: () => setIsMenuOpen(false),
              children: "Templates"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#pricing",
              className: "text-foreground text-sm font-medium transition-colors",
              onClick: () => setIsMenuOpen(false),
              children: "Pricing"
            }
          ),
          /* @__PURE__ */ jsx(AppearanceToggleDropdown, {}),
          auth.user ? /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(Button, { className: "text-white transition-colors", children: /* @__PURE__ */ jsx(Link, { href: route("dashboard"), children: "Dashboard" }) }) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 border-none", children: [
            /* @__PURE__ */ jsx(Button, { variant: "secondary", className: "font-medium", children: /* @__PURE__ */ jsx(Link, { href: route("login"), children: "Log in" }) }),
            /* @__PURE__ */ jsx(Button, { className: "text-white transition-colors", children: /* @__PURE__ */ jsx(Link, { href: route("register"), children: "Get Started" }) })
          ] })
        ] }) })
      ]
    }
  );
}
const Hero$1 = () => {
  return /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-32", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20", children: [
    /* @__PURE__ */ jsx("div", { className: "animate-fade-in-left max-w-2xl space-y-8 lg:max-w-none", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium", children: "Blockchain-Verified Digital Identity" }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl", children: "MuluCard Pro: Blockchain-Backed Digital Identity" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-6 text-lg", children: "NFC & QR cards linked to Cardano-verified profiles, providing secure, blockchain-backed IDs for professionals, events, and organizations." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "animate-fade-in-right", children: /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-brand-purple/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/20", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white/10 rounded-lg p-4 text-center", children: [
        /* @__PURE__ */ jsx(QrCode, { className: "h-8 w-8 mx-auto mb-2 text-brand-purple" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "QR Cards" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/10 rounded-lg p-4 text-center", children: [
        /* @__PURE__ */ jsx(Smartphone, { className: "h-8 w-8 mx-auto mb-2 text-brand-purple" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "NFC Cards" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/10 rounded-lg p-4 text-center", children: [
        /* @__PURE__ */ jsx(Shield, { className: "h-8 w-8 mx-auto mb-2 text-brand-purple" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Cardano Verified" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/10 rounded-lg p-4 text-center", children: [
        /* @__PURE__ */ jsx(Globe, { className: "h-8 w-8 mx-auto mb-2 text-brand-purple" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Global Access" })
      ] })
    ] }) }) }) })
  ] }) }) });
};
const features$1 = [
  {
    icon: /* @__PURE__ */ jsx(Shield, { className: "text-brand-purple h-6 w-6" }),
    title: "Cardano-Verified Profiles",
    description: "Secure, blockchain-backed identity verification using Cardano technology."
  },
  {
    icon: /* @__PURE__ */ jsx(QrCode, { className: "text-brand-purple h-6 w-6" }),
    title: "NFC & QR Technology",
    description: "Dual technology approach for maximum compatibility and accessibility."
  },
  {
    icon: /* @__PURE__ */ jsx(Users, { className: "text-brand-purple h-6 w-6" }),
    title: "Professional Networking",
    description: "Perfect for professionals, events, and organizational identity management."
  },
  {
    icon: /* @__PURE__ */ jsx(Globe, { className: "text-brand-purple h-6 w-6" }),
    title: "Africa-Focused Scaling",
    description: "Designed to strengthen the Cardano ecosystem across Africa."
  },
  {
    icon: /* @__PURE__ */ jsx(Zap, { className: "text-brand-purple h-6 w-6" }),
    title: "Real-World Adoption",
    description: "Introduces blockchain technology to non-crypto users through tangible products."
  },
  {
    icon: /* @__PURE__ */ jsx(CheckCircle, { className: "text-brand-purple h-6 w-6" }),
    title: "Fraud Reduction",
    description: "Enhanced security and trust through verifiable blockchain credentials."
  }
];
const Features$1 = () => {
  return /* @__PURE__ */ jsx("section", { id: "features", className: "bg-secondary/50 py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "animate-fade-in mx-auto mb-16 max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium", children: "Key Features" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: "Revolutionary Blockchain Identity" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-4 text-lg", children: "MuluCard Pro combines cutting-edge blockchain technology with practical, everyday applications." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3", children: features$1.map((feature, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "border-border/50 animate-fade-in rounded-xl border bg-white dark:bg-gray-800 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md",
        style: { animationDelay: `${index * 0.1}s` },
        children: [
          /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg", children: feature.icon }),
          /* @__PURE__ */ jsx("h3", { className: "mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100", children: feature.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground dark:text-gray-300", children: feature.description })
        ]
      },
      index
    )) })
  ] }) });
};
const ImpactSection = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "animate-fade-in mx-auto mb-16 max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium", children: "Ecosystem Impact" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: "Expanding Cardano Adoption" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-4 text-lg", children: "MuluCard Pro will expand Cardano adoption by introducing blockchain technology to new audiences." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-fade-in space-y-8", style: { animationDelay: "0.1s" }, children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl border border-border/50 p-6 shadow-sm", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100", children: "Targeting New Audiences" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-muted-foreground dark:text-gray-300", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Introduces blockchain to professionals, SMEs, and institutions" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Creates trustworthy, verifiable identities" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Increases confidence in on-chain credentials" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Boosts wallet creation and engagement" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "animate-fade-in space-y-8", style: { animationDelay: "0.2s" }, children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl border border-border/50 p-6 shadow-sm", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100", children: "Real-World Applications" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-muted-foreground dark:text-gray-300", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Practical Cardano use cases beyond finance" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "DIDs and verifiable credentials for everyday activities" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 mr-3 mt-0.5 h-4 h-4 w-4 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Networking, events, and education applications" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 mr-3 mt-0.5 h-4 w-4 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Showcases real-world impact on security and efficiency" })
          ] })
        ] })
      ] }) })
    ] })
  ] }) });
};
const HybridApproach = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-secondary/50 py-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-2 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "animate-fade-in-left", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 text-brand-purple mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium", children: "Hybrid Innovation" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl mb-6 text-gray-900 dark:text-gray-100", children: "Physical Meets Digital" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground dark:text-gray-300 mb-6", children: "MuluCard Pro combines physical NFC cards with Cardano-verified digital profiles, bridging offline and online identity verification." }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/20 rounded-full p-2 mr-4 mt-1", children: /* @__PURE__ */ jsx(Smartphone, { className: "h-5 w-5 text-brand-purple" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-1 text-gray-900 dark:text-gray-100", children: "Introduces Non-Crypto Users" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground dark:text-gray-300 text-sm", children: "Makes blockchain accessible through familiar physical products" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/20 rounded-full p-2 mr-4 mt-1", children: /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5 text-brand-purple" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-1 text-gray-900 dark:text-gray-100", children: "Reduces Fraud" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground dark:text-gray-300 text-sm", children: "Enhanced security through verifiable blockchain credentials" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/20 rounded-full p-2 mr-4 mt-1", children: /* @__PURE__ */ jsx(Globe, { className: "h-5 w-5 text-brand-purple" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-1 text-gray-900 dark:text-gray-100", children: "Scalable Across Africa" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground dark:text-gray-300 text-sm", children: "Making identity verification more secure, convenient, and accessible" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "animate-fade-in-right", children: /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-brand-purple/10 to-blue-500/10 rounded-2xl p-8 border border-border/50", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 rounded-lg p-2 mr-3", children: /* @__PURE__ */ jsx(QrCode, { className: "h-6 w-6 text-brand-purple" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 dark:text-gray-100", children: "Physical NFC Card" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground dark:text-gray-300 text-sm", children: "Tap to instantly share verified identity" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 rounded-lg p-2 mr-3", children: /* @__PURE__ */ jsx(Shield, { className: "h-6 w-6 text-brand-purple" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 dark:text-gray-100", children: "Cardano Verification" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground dark:text-gray-300 text-sm", children: "Blockchain-backed secure credentials" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-brand-purple/10 rounded-lg p-2 mr-3", children: /* @__PURE__ */ jsx(Users, { className: "h-6 w-6 text-brand-purple" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 dark:text-gray-100", children: "Digital Profile" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground dark:text-gray-300 text-sm", children: "Comprehensive professional information" })
      ] })
    ] }) }) }) })
  ] }) }) });
};
const CTA$1 = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-brand-purple to-blue-600 animate-fade-in mx-auto max-w-4xl rounded-2xl p-10 text-center text-white md:p-16", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-6 text-3xl font-bold md:text-4xl", children: "Ready for the Future of Identity?" }),
    /* @__PURE__ */ jsx("p", { className: "mb-8 text-lg opacity-90", children: "Join the blockchain revolution with MuluCard Pro. Secure, verifiable, and designed for the real world." })
  ] }) }) });
};
function MulucardPro() {
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
      /* @__PURE__ */ jsx(Hero$1, {}),
      /* @__PURE__ */ jsx(Features$1, {}),
      /* @__PURE__ */ jsx(ImpactSection, {}),
      /* @__PURE__ */ jsx(HybridApproach, {}),
      /* @__PURE__ */ jsx(CTA$1, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MulucardPro
}, Symbol.toStringTag, { value: "Module" }));
function PolicySection({ id, title, content }) {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (window.location.hash === `#${id}` && sectionRef.current) {
      setTimeout(() => {
        var _a;
        (_a = sectionRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [id]);
  return /* @__PURE__ */ jsxs("div", { id, ref: sectionRef, className: "mb-10 scroll-mt-8 animate-fade-in", children: [
    /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200 pb-2 mb-4", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900", children: title }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "prose prose-blue max-w-none text-gray-700 leading-relaxed",
        dangerouslySetInnerHTML: { __html: content }
      }
    )
  ] });
}
function TableOfContents$1() {
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "information-collection", title: "Information We Collect" },
    { id: "information-usage", title: "How We Use Your Information" },
    { id: "information-sharing", title: "Information Sharing" },
    { id: "data-storage", title: "Data Storage and Security" },
    { id: "user-rights", title: "Your Rights" },
    { id: "childrens-privacy", title: "Children's Privacy" },
    { id: "changes", title: "Changes to This Policy" },
    { id: "contact", title: "Contact Us" }
  ];
  const handleClick = (id) => (e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-5 rounded-lg", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4 text-gray-900", children: "Table of Contents" }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: sections.map((section) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "a",
      {
        href: `#${section.id}`,
        onClick: handleClick(section.id),
        className: "text-blue-600 hover:text-blue-800 hover:underline block py-1 transition-colors",
        children: section.title
      }
    ) }, section.id)) })
  ] });
}
function PolicyHeader({ lastUpdated }) {
  return /* @__PURE__ */ jsx("div", { className: "bg-white border-b border-gray-200", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-24", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4", children: "Privacy Policy" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg max-w-2xl", children: "We care about your privacy and want to be transparent about how we handle your information. This policy explains what data we collect and how we use it." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 text-gray-500 text-sm", children: [
      "Last Updated: ",
      lastUpdated
    ] })
  ] }) }) });
}
function PrivacyPolicy() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(PolicyHeader, { lastUpdated: "May 15, 2025" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-3 lg:block hidden", children: /* @__PURE__ */ jsx("div", { className: "sticky top-8", children: /* @__PURE__ */ jsx(TableOfContents$1, {}) }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-9", children: [
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "introduction",
            title: "Introduction",
            content: `
                <p>Welcome to MuluCard ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our digital business card service.</p>
                <p>Please read this Privacy Policy carefully. By accessing or using our service, you acknowledge that you have read, understood, and agree to be bound by all terms of this Privacy Policy. If you do not agree with our policies, please do not access or use our service.</p>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "information-collection",
            title: "Information We Collect",
            content: `
                <p>We collect information in the following ways:</p>
                <h4 class="font-medium text-gray-900 mt-4 mb-2">Information You Provide to Us:</h4>
                <ul class="list-disc pl-6 mb-4 space-y-1">
                  <li>Personal identification information (name, email address, phone number, professional title)</li>
                  <li>Professional information (company name, job title, industry)</li>
                  <li>Profile images and other media you choose to include in your digital business card</li>
                  <li>Social media handles and professional links</li>
                  <li>Any other information you choose to include in your digital business card</li>
                </ul>
                <h4 class="font-medium text-gray-900 mt-4 mb-2">Information Automatically Collected:</h4>
                <ul class="list-disc pl-6 mb-4 space-y-1">
                  <li>Usage data (how you interact with our service)</li>
                  <li>Device information (browser type, IP address, device type)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Analytics data regarding how your digital business card is viewed and accessed by recipients</li>
                </ul>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "information-usage",
            title: "How We Use Your Information",
            content: `
                <p>We use the information we collect for various purposes, including:</p>
                <ul class="list-disc pl-6 mb-4 space-y-1">
                  <li>Providing, maintaining, and improving our service</li>
                  <li>Creating and updating your digital business card</li>
                  <li>Processing transactions and sending related information</li>
                  <li>Responding to your comments, questions, and requests</li>
                  <li>Sending you technical notices, updates, security alerts, and administrative messages</li>
                  <li>Providing customer support</li>
                  <li>Monitoring usage patterns and analyzing trends</li>
                  <li>Personalizing and improving your experience</li>
                  <li>Complying with legal obligations</li>
                </ul>
                <p>We may also use your information to contact you about our own services that may be of interest to you. You may opt out of such communications at any time.</p>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "information-sharing",
            title: "Information Sharing and Disclosure",
            content: `
                <p>We may share your information in the following circumstances:</p>
                <ul class="list-disc pl-6 mb-4 space-y-1">
                  <li><strong>With Your Consent:</strong> We may share your information when you direct us to do so.</li>
                  <li><strong>Business Card Recipients:</strong> The information you include in your digital business card will be shared with those whom you share your digital business card.</li>
                  <li><strong>Service Providers:</strong> We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
                  <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                </ul>
                <p>We do not sell your personal information to third parties.</p>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "data-storage",
            title: "Data Storage and Security",
            content: `
                <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please understand that no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
                <p>Your data is stored on secure servers and is only accessible by authorized personnel. We retain your information for as long as your account is active or as needed to provide you services, comply with our legal obligations, resolve disputes, and enforce our agreements.</p>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "user-rights",
            title: "Your Rights",
            content: `
                <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul class="list-disc pl-6 mb-4 space-y-1">
                  <li>The right to access personal information we hold about you</li>
                  <li>The right to request correction of inaccurate personal information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to restrict or object to processing of your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time</li>
                </ul>
                <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section below.</p>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "childrens-privacy",
            title: "Children's Privacy",
            content: `
                <p>Our service is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete such information as quickly as possible. If you believe we have inadvertently collected personal information from a child under 13, please contact us immediately.</p>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "changes",
            title: "Changes to This Privacy Policy",
            content: `
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "contact",
            title: "Contact Us",
            content: `
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <div class="mt-3">
                  <p><strong>Digital Business Card</strong></p>
                  <p>Email: privacy@digitalbusinesscard.com</p>
                  <p>Address: 123 Business Street, Suite 500, San Francisco, CA 94103</p>
                </div>
              `
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: scrollToTop,
        className: `fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`,
        "aria-label": "Scroll to top",
        children: /* @__PURE__ */ jsx(ChevronUp, { size: 24 })
      }
    )
  ] });
}
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PrivacyPolicy
}, Symbol.toStringTag, { value: "Module" }));
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
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Password
}, Symbol.toStringTag, { value: "Module" }));
const MostPopularBadge = () => /* @__PURE__ */ jsx("div", { className: "absolute -top-3 right-8 transform", children: /* @__PURE__ */ jsx("div", { className: "bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold shadow-sm", children: "Most Popular" }) });
const PricingDisplay = ({ plan }) => /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
  /* @__PURE__ */ jsx("span", { className: "text-foreground text-4xl font-bold", children: plan.price < 0 ? "Custom Pricing" : plan.price === 0 ? "Free" : `Birr ${plan.price}` }),
  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground ml-2", children: plan.price === 0 ? "forever" : plan.price < 0 ? "" : "/ year" })
] });
const FeatureItem = ({ feature }) => /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "text-primary mt-0.5 mr-3 h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
      clipRule: "evenodd"
    }
  ) }),
  /* @__PURE__ */ jsx("span", { className: "text-foreground", children: feature })
] });
function PlanCard({ plan, isButtonDisabled = false, billing = false }) {
  var _a;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `bg-card relative rounded-xl border p-8 shadow-sm ${plan.most_popular ? "border-primary border-2 shadow-md" : "border-border"}`,
      children: [
        plan.most_popular === true && /* @__PURE__ */ jsx(MostPopularBadge, {}),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-foreground text-xl font-semibold", children: plan.name }),
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
        isButtonDisabled ? /* @__PURE__ */ jsx(Button, { className: "w-full", variant: "secondary", disabled: true, children: plan.price < 0 ? "Contact Sales" : "Get Started" }) : /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full", variant: plan.most_popular ? "default" : "outline", children: /* @__PURE__ */ jsx(Link, { href: plan.price < 0 ? "/contact-sales" : billing ? route("checkout", { plan: plan.id }) : route("register"), children: plan.price < 0 ? "Contact Sales" : billing ? "Upgrade Now" : "Get Started" }) })
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
        /* @__PURE__ */ jsx("div", { className: "text-foreground mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-medium", children: "plans" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl text-foreground font-bold md:text-4xl", children: "Simple, transparent pricing" }),
        /* @__PURE__ */ jsx("p", { className: "text-foreground mt-4 text-lg", children: "Choose the perfect plan for your needs with no hidden fees." })
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
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
      className: "animate-fade-up overflow-hidden   p-6 shadow-none backdrop-blur-sm transition-all duration-300",
      style: {
        animationDelay: "0.1s"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium", children: subscription.plan.name }),
            /* @__PURE__ */ jsx("p", { className: "text-foreground text-sm", children: "Annual Subscription" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold", children: formatCurrency(subscription.plan.price) }),
            /* @__PURE__ */ jsxs("p", { className: "text-foreground text-sm", children: [
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
          variant: filter === status ? "default" : "secondary",
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
        /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-medium text-foreground", children: "No subscriptions found" }),
        /* @__PURE__ */ jsxs("p", { className: "text-foreground", children: [
          "You don't have any ",
          filter !== "all" ? filter : "",
          " subscriptions at the moment."
        ] })
      ] }) })
    ] }) })
  ] });
}
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Subscription33
}, Symbol.toStringTag, { value: "Module" }));
function TableOfContents() {
  const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "changes-to-terms", title: "Changes to Terms" },
    { id: "account-terms", title: "Account Terms" },
    { id: "acceptable-use", title: "Acceptable Use" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "termination", title: "Termination" },
    { id: "disclaimer", title: "Disclaimer" },
    { id: "limitation-liability", title: "Limitation of Liability" },
    { id: "governing-law", title: "Governing Law" },
    { id: "contact-us", title: "Contact Us" }
  ];
  const handleClick = (id) => (e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-5 rounded-lg", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4 text-gray-900", children: "Table of Contents" }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: sections.map((section) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "a",
      {
        href: `#${section.id}`,
        onClick: handleClick(section.id),
        className: "text-blue-600 hover:text-blue-800 hover:underline block py-1 transition-colors",
        children: section.title
      }
    ) }, section.id)) })
  ] });
}
function TermsHeader({ lastUpdated }) {
  return /* @__PURE__ */ jsx("div", { className: "bg-white border-b border-gray-200", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-24", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4", children: "Terms of Service" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg max-w-2xl", children: "Please read these terms carefully before using our service. These terms outline your rights and responsibilities when using Digital Business Card." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 text-gray-500 text-sm", children: [
      "Last Updated: ",
      lastUpdated
    ] })
  ] }) }) });
}
function Terms() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(TermsHeader, { lastUpdated: "May 15, 2025" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-3 lg:block hidden", children: /* @__PURE__ */ jsx("div", { className: "sticky top-8", children: /* @__PURE__ */ jsx(TableOfContents, {}) }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-9", children: [
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "acceptance",
            title: "Acceptance of Terms",
            content: `
                <p>By accessing or using  MuluCard ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.</p>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "changes-to-terms",
            title: "Changes to Terms",
            content: `
                <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "account-terms",
            title: "Account Terms",
            content: `
                <p>You must provide accurate, complete, and up-to-date information for your account. You are responsible for safeguarding the password and for all activities that occur under your account.</p>
                <ul>
                  <li>You must be a human. Accounts registered by "bots" or automated methods are not permitted.</li>
                  <li>You must provide a valid email address.</li>
                  <li>You must be 13 years or older to use this Service.</li>
                  <li>You are responsible for maintaining the security of your account.</li>
                  <li>You may not use the Service for any illegal or unauthorized purpose.</li>
                </ul>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "acceptable-use",
            title: "Acceptable Use",
            content: `
                <p>You agree not to engage in any of the following prohibited activities:</p>
                <ul>
                  <li>Copying, distributing, or disclosing any part of the Service in any medium.</li>
                  <li>Using any automated system to access the Service.</li>
                  <li>Transmitting spam, chain letters, or other unsolicited email.</li>
                  <li>Attempting to interfere with or compromise the system integrity or security.</li>
                  <li>Impersonating another person or misrepresenting your affiliation with a person or entity.</li>
                </ul>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "intellectual-property",
            title: "Intellectual Property",
            content: `
                <p>The Service and its original content, features, and functionality are and will remain the exclusive property of MuluCard and its licensors. The Service is protected by copyright, trademark, and other laws.</p>
                <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of MuluCard.</p>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "termination",
            title: "Termination",
            content: `
                <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "disclaimer",
            title: "Disclaimer",
            content: `
                <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.</p>
                <p>MuluCard does not warrant that:</p>
                <ul>
                  <li>The Service will function uninterrupted, secure, or available at any particular time or location.</li>
                  <li>Any errors or defects will be corrected.</li>
                  <li>The Service is free of viruses or other harmful components.</li>
                  <li>The results of using the Service will meet your requirements.</li>
                </ul>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "limitation-liability",
            title: "Limitation of Liability",
            content: `
                <p>In no event shall MuluCard, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                <ul>
                  <li>Your access to or use of or inability to access or use the Service.</li>
                  <li>Any conduct or content of any third party on the Service.</li>
                  <li>Any content obtained from the Service.</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                </ul>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "governing-law",
            title: "Governing Law",
            content: `
                <p>These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
                <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
              `
          }
        ),
        /* @__PURE__ */ jsx(
          PolicySection,
          {
            id: "contact-us",
            title: "Contact Us",
            content: `
                <p>If you have any questions about these Terms, please contact us at:</p>
                <div class="mt-3">
                  <p><strong>MuluCard</strong></p>
                  <p>Email: info@mulucard.com</p>
                </div>
              `
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: scrollToTop,
        className: `fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`,
        "aria-label": "Scroll to top",
        children: /* @__PURE__ */ jsx(ChevronUp, { size: 24 })
      }
    )
  ] });
}
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Terms
}, Symbol.toStringTag, { value: "Module" }));
const features = [
  {
    icon: Smartphone,
    title: "Built for phones first",
    description: "Your card opens cleanly on mobile, tablet, and desktop without asking people to install anything."
  },
  {
    icon: QrCode,
    title: "Share in one scan",
    description: "Send your profile with QR, link, or NFC so meeting follow-up takes seconds instead of friction."
  },
  {
    icon: Repeat,
    title: "Update once, everywhere",
    description: "Change your role, number, links, or brand assets once and every shared card stays current."
  },
  {
    icon: BarChart3,
    title: "See what gets attention",
    description: "Track card views and understand which profiles are performing best after events and outreach."
  },
  {
    icon: Shield,
    title: "Control what people see",
    description: "Decide which information is public and keep your digital presence polished and intentional."
  },
  {
    icon: Palette,
    title: "Brand it your way",
    description: "Match your card to your colors, assets, and tone so it feels like part of your business."
  }
];
const steps = [
  {
    number: "01",
    title: "Create your profile",
    description: "Add your contact details, links, services, galleries, and the information you want people to remember."
  },
  {
    number: "02",
    title: "Style your card",
    description: "Choose the visuals, brand color, and layout details that make the page feel like you."
  },
  {
    number: "03",
    title: "Share and follow up",
    description: "Send one link, one QR, or one tap and let people save your details without manual entry."
  }
];
const highlights = ["Digital cards for professionals", "Fast setup", "QR and link sharing", "Analytics included"];
function Hero() {
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden pt-28 pb-18 md:pt-36 md:pb-24", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.14),_transparent_24%),linear-gradient(to_bottom,_rgba(248,250,252,0.96),_rgba(255,255,255,1))] dark:bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.14),_transparent_24%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.14),_transparent_22%),linear-gradient(to_bottom,_rgba(2,6,23,0.98),_rgba(2,6,23,1))]" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:border-orange-500/20 dark:bg-slate-900/70 dark:text-slate-200", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 text-orange-500" }),
        "Your digital identity, reimagined"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold tracking-tight text-slate-950 md:text-5xl lg:text-6xl dark:text-white", children: "A polished digital business card that is ready the moment you meet someone." }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300", children: "MuluCard helps you share your details, brand, services, and portfolio in one clean page that is easy to open and easy to remember." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, className: "h-12 rounded-full px-6", children: /* @__PURE__ */ jsxs(Link, { href: route("register"), children: [
          "Create your card",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", asChild: true, className: "h-12 rounded-full px-6", children: /* @__PURE__ */ jsx("a", { href: "#pricing", children: "See pricing" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-wrap gap-2", children: highlights.map((item) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300",
          children: item
        },
        item
      )) })
    ] }) }) })
  ] });
}
function Features() {
  return /* @__PURE__ */ jsx("section", { id: "features", className: "py-20 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-14", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-xs font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-300", children: "Why MuluCard" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl dark:text-white", children: "Everything needed to make your first impression feel current." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3", children: features.map((feature) => {
      const Icon2 = feature.icon;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "group rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-orange-500 dark:bg-slate-900", children: /* @__PURE__ */ jsx(Icon2, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mt-5 text-xl font-semibold text-slate-950 dark:text-white", children: feature.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 leading-7 text-slate-600 dark:text-slate-300", children: feature.description })
          ]
        },
        feature.title
      );
    }) })
  ] }) });
}
function HowItWorks() {
  return /* @__PURE__ */ jsx("section", { id: "how-it-works", className: "bg-slate-50/70 py-20 dark:bg-slate-950/60", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-full bg-sky-100 px-4 py-1.5 text-xs font-medium text-sky-700 dark:bg-sky-500/10 dark:text-sky-300", children: "Simple workflow" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl dark:text-white", children: "From setup to share in three steps" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-slate-600 dark:text-slate-300", children: "The experience is intentionally simple so you can spend time connecting, not configuring." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-14 grid grid-cols-1 gap-5 md:grid-cols-3", children: steps.map((step) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold tracking-[0.24em] text-slate-400", children: step.number }),
            /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 text-emerald-500" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "mt-8 text-xl font-semibold text-slate-950 dark:text-white", children: step.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 leading-7 text-slate-600 dark:text-slate-300", children: step.description })
        ]
      },
      step.number
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, className: "rounded-full px-6", children: /* @__PURE__ */ jsxs(Link, { href: route("register"), children: [
      "Start building",
      /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
    ] }) }) })
  ] }) });
}
function Templates() {
  return /* @__PURE__ */ jsx("section", { id: "templates", className: "py-20 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-300", children: [
        /* @__PURE__ */ jsx(LayoutTemplate, { className: "h-3.5 w-3.5" }),
        "Templates"
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl dark:text-white", children: "Three layouts, one polished profile" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-slate-600 dark:text-slate-300", children: "Each template uses the same details you enter—pick the look that fits how you want to show up when someone opens your card." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6", children: CARD_TEMPLATE_OPTIONS.map((option) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-center text-xl font-semibold text-slate-950 dark:text-white", children: option.label }),
      option.description && /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-sm text-center text-sm leading-relaxed text-slate-600 dark:text-slate-300", children: option.description }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 w-full max-w-[500px] rounded-2xl p-1 md:bg-white/80 md:shadow-sm md:ring-1 md:ring-slate-200/70 md:backdrop-blur-sm dark:md:bg-slate-900/70 dark:md:shadow-black/20 dark:md:ring-white/10", children: /* @__PURE__ */ jsx(MuluCard, { template: option.id, ...DEMO_MULU_CARD_PROPS }) })
    ] }, option.id)) })
  ] }) });
}
function Pricing({ plans }) {
  return /* @__PURE__ */ jsx("section", { id: "pricing", className: "py-20 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-7xl px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300", children: "Pricing" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl dark:text-white", children: "Choose the plan that fits how you network" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-slate-600 dark:text-slate-300", children: "Start simple, then scale up for more cards, more services, and more branded presence." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3", children: plans.map((plan, index) => /* @__PURE__ */ jsx(PlanCard, { plan }, index)) })
  ] }) });
}
function CTA() {
  return /* @__PURE__ */ jsx("section", { className: "pb-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-[32px] border border-slate-200/70 bg-[linear-gradient(135deg,#0f172a,#1e293b,#0f172a)] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.18)] md:p-12", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white/80", children: [
        /* @__PURE__ */ jsx(Zap, { className: "h-3.5 w-3.5 text-orange-400" }),
        "Ready when you are"
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl", children: "Build a sharper first impression before your next meeting." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-slate-300", children: "Create your card, share it in seconds, and keep your details current without printing anything again." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex lg:justify-end", children: /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, className: "h-12 rounded-full px-6", children: /* @__PURE__ */ jsxs(Link, { href: route("register"), children: [
      "Get started",
      /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
    ] }) }) })
  ] }) }) }) });
}
function Index({ plans }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(Features, {}),
      /* @__PURE__ */ jsx(HowItWorks, {}),
      /* @__PURE__ */ jsx(Templates, {}),
      /* @__PURE__ */ jsx(Pricing, { plans }),
      /* @__PURE__ */ jsx(CTA, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
        "./pages/card/card-template-selector.tsx": __vite_glob_0_7,
        "./pages/card/card.tsx": __vite_glob_0_8,
        "./pages/card/create.tsx": __vite_glob_0_9,
        "./pages/card/edit.tsx": __vite_glob_0_10,
        "./pages/card/parts/card-avatar-row.tsx": __vite_glob_0_11,
        "./pages/card/parts/card-banner.tsx": __vite_glob_0_12,
        "./pages/card/parts/card-business-hours.tsx": __vite_glob_0_13,
        "./pages/card/parts/card-contact-actions.tsx": __vite_glob_0_14,
        "./pages/card/parts/card-galleries-section.tsx": __vite_glob_0_15,
        "./pages/card/parts/card-headline.tsx": __vite_glob_0_16,
        "./pages/card/parts/card-identity.tsx": __vite_glob_0_17,
        "./pages/card/parts/card-location-block.tsx": __vite_glob_0_18,
        "./pages/card/parts/card-services-section.tsx": __vite_glob_0_19,
        "./pages/card/parts/card-social-links.tsx": __vite_glob_0_20,
        "./pages/card/show.tsx": __vite_glob_0_21,
        "./pages/card/templates/bold.tsx": __vite_glob_0_22,
        "./pages/card/templates/classic.tsx": __vite_glob_0_23,
        "./pages/card/templates/modern.tsx": __vite_glob_0_24,
        "./pages/checkout.tsx": __vite_glob_0_25,
        "./pages/dashboard.tsx": __vite_glob_0_26,
        "./pages/error-page.tsx": __vite_glob_0_27,
        "./pages/hello.tsx": __vite_glob_0_28,
        "./pages/invalid-login.tsx": __vite_glob_0_29,
        "./pages/mulucardpro.tsx": __vite_glob_0_30,
        "./pages/privacypolicy.tsx": __vite_glob_0_31,
        "./pages/settings/appearance.tsx": __vite_glob_0_32,
        "./pages/settings/password.tsx": __vite_glob_0_33,
        "./pages/settings/plan.tsx": __vite_glob_0_34,
        "./pages/settings/profile.tsx": __vite_glob_0_35,
        "./pages/settings/subscription.tsx": __vite_glob_0_36,
        "./pages/terms.tsx": __vite_glob_0_37,
        "./pages/welcome.tsx": __vite_glob_0_38
      });
      return pages[`./pages/${name}.tsx`];
    },
    // prettier-ignore
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
