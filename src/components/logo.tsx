import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="inline-block p-2 font-semibold transition-colors duration-100 rounded-lg hover:bg-slate-100"
    >
      FFP 🧑🏻‍💻
    </Link>
  );
}
