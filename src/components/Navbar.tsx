
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './ui/button'
import { LogOut, LogOutIcon, Settings } from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Cart from "./cart";


const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]


const Logo = () => <div className='text-lg font-bold border-l text-primary'>SHOPSMART AI</div>


const NavLink = ({ name }: { name: string }) => <a href='#' className='font-medium hover:text-green-500'>{name}</a>


const NavLinks = () => <div className='flex gap-6 items-center'>
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <a href="/docs" passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Home
                    </NavigationMenuLink>
                </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                            <NavigationMenuLink asChild>
                                <a
                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                    href="/"
                                >
                                    <LogOutIcon className="h-6 w-6" />
                                    <div className="mb-2 mt-4 text-lg font-medium">
                                        shadcn/ui
                                    </div>
                                    <p className="text-sm leading-tight text-muted-foreground">
                                        Beautifully designed components built with Radix UI and
                                        Tailwind CSS.
                                    </p>
                                </a>
                            </NavigationMenuLink>
                        </li>
                        <a href="/docs" title="Introduction">
                            Re-usable components built using Radix UI and Tailwind CSS.
                        </a>
                        <a href="/docs/installation" title="Installation">
                            How to install dependencies and structure your app.
                        </a>
                        <a href="/docs/primitives/typography" title="Typography">
                            Styles for headings, paragraphs, lists...etc
                        </a>
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {components.map((component) => (
                            <a
                                key={component.title}
                                title={component.title}
                                href={component.href}
                            >
                                {component.description}
                            </a>
                        ))}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <a href="/docs">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Documentation
                    </NavigationMenuLink>
                </a>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</div>

export default function Navbar() {
    return (
        <div className='flex gap-4 items-center w-full justify-between px-4 py-2 border shadow-md fixed top-0 left-0 right-0 z-10 bg-white'>
            <div className='flex gap-4 items-center'>
                <Logo />
                <div>
                    <NavLinks />
                </div>
            </div>
            <div className="items-center flex gap-2">
            <Cart />
            <Popover>
                <PopoverTrigger asChild>
                    <Avatar className='cursor-pointer'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm'>harpalsingh@gmail.com</p>
                        <div className='mt-2 flex justify-around'>
                            <Button variant={'ghost'} size={"sm"}><Settings className="w-4 h-4 mr-2" /> Settings</Button>
                            <Button variant={'ghost'} size={"sm"} className='text-destructive'><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            </div>

        </div>
    )
}
