import Link from "next/link";

const navItems = [
    {title: 'Home', href: '/'},
    {title: 'Blog', href: '/b'},
]
export default function Header() {
    return (
        <header className="sticky top-0 py-2.5 bg-background border-b border-b-gray-50 dark:border-b-gray-900 z-10">
            <div className={"container mx-auto justify-between items-center flex flex-row"}>
                <Link href="/" className={"font-semibold text-2xl"}>FFP</Link>
                <nav className={"flex flex-row gap-4"}>
                    {navItems.map((item, index) => (<Link key={index} href={item.href} className={'hover:text-green-950 dark:hover:text-green-700 font-medium transition duration-100'}>{item.title}</Link>))}
                </nav>
            </div>
        </header>
    );
}
