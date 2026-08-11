import { useEffect, useState } from "react";
import {
  Search,
  BookOpen,
  Grid3X3,
  List,
  ChevronDown,
} from "lucide-react";
import { User, Settings, LogOut, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useOutletContext } from "react-router-dom";
import { books as fetchBooks } from "@/api/api";
import BookCard from "@/components/BookCard";

type UserData = { _id: string; name: string; email: string };
type OutletContext = { user: UserData };



const GENRES = [
  "All",
  "Fiction",
  "Sci-Fi",
  "Fantasy",
  "Mystery",
  "Non-Fiction",
  "Historical",
  "Memoir",
];
type Book = {
  id: string | number;
  _id?: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  pages: number;
  year: number;
  status: string;
  favorite: boolean;
  description: string;
};



export default function BookDashboard() {
  const { user } = useOutletContext<OutletContext>();
  const [books, setBooks] = useState<Book[]>([]);
  const [activeGenre, setActiveGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetchBooks();
        if (Array.isArray(response.data)) {
          const normalized = response.data.map((item ,index) => ({
            id: item._id ?? item.id ?? index,
            _id: item._id,
            title: item.title ?? "Untitled",
            author: item.author ? String(item.author) : "Unknown",
            cover:
              item.coverImage ||
              item.cover ||
              "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=560&fit=crop&auto=format",
            genre: item.genre ?? "Fiction",
            pages: item.pages ?? 0,
            year:
              item.year ??
              (item.createdAt
                ? new Date(item.createdAt).getFullYear()
                : new Date().getFullYear()),
            status: item.status ?? "Unread",
            favorite: item.favorite ?? false,
            description: item.description ?? "",
          }));
          setBooks(normalized);
        }
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };

    loadBooks();
  }, []);

  const handleLogout = ()=>{
    localStorage.removeItem("accessToken");
    navigate("/auth/login");
    console.log("Logging out!..");
  }

  const filtered = books.filter((b) => {
    const matchGenre = activeGenre === "All" || b.genre === activeGenre;
    const matchStatus = statusFilter === "All" || b.status === statusFilter;
    const matchSearch =
      search === "" ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchStatus && matchSearch;
  });

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: " sans-serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[--border] bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center border border-amber-700/40">
              <BookOpen size={16} className="text-amber-400" />
            </div>
            <div>
              <h1
                className="text-xl font-bold leading-none text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ELib
              </h1>
              <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mt-0.5">
                Digital Library
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
            {/* Search */}
            <div className="flex-1 min-w-0 max-w-full sm:max-w-md relative">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search by title or author…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-secondary border border-[--border] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-700/60 focus:ring-1 focus:ring-amber-700/30 transition-all"
              />
            </div>

            {/* Profile */}
            <div className="flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex items-center gap-2 rounded-xl p-1.5 pr-2.5 hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                  aria-label="Open profile menu"
                >
                  <Avatar className="h-9 w-9 border border-amber-700/40">
                    <AvatarImage src="/avatar.jpg" alt="Your profile" />
                    <AvatarFallback className="bg-amber-500/15 text-amber-400">
                      <User size={17} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-foreground leading-tight">
                      {user?.name || "Loading"}
                    </p>
                    <p className="text-[11px] text-muted-foreground">Member</p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-background border-[--border]"
                >
                  <div className="px-3 py-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {user?.name || "Loading"}
                      </span>
                      <span className="text-xs text-muted-foreground font-normal">
                        {user?.email || "Loading"}
                      </span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-400 focus:text-red-400">
                    
                    <button onClick={handleLogout} className="flex flex-row justify-center items-center"><LogOut className="mr-2 h-4 w-4" /> Sign out</button>
                    
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page title + controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2
              className="text-3xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Books
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} of {books.length} books
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Status filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 text-xs font-mono rounded-lg bg-secondary border border-[--border] text-foreground focus:outline-none focus:border-amber-700/60 cursor-pointer"
              >
                {["All", "My Books"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary border border-[--border]">
              <button
                onClick={() => setView("grid")}
                className={`p-1.5 rounded-md transition-all ${view === "grid" ? "bg-amber-500/20 text-amber-400" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Grid3X3 size={14} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-1.5 rounded-md transition-all ${view === "list" ? "bg-amber-500/20 text-amber-400" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Genre tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {GENRES.map((genre) => {
            const count =
              genre === "All"
                ? books.length
                : books.filter((b) => b.genre === genre).length;
            return (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide border transition-all duration-200 ${
                  activeGenre === genre
                    ? "bg-amber-500/20 border-amber-700/60 text-amber-300"
                    : "bg-transparent border-[--border] text-muted-foreground hover:border-amber-800/40 hover:text-foreground"
                }`}
              >
                {genre}
                <span className="ml-1.5 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Book grid / list */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BookOpen size={40} className="text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground font-mono text-sm">
              No books found
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} view="grid" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} view="list" />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[--border] mt-16 py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs font-mono text-muted-foreground/50">
            Bibliotheca · {books.length} volumes catalogued
          </p>
          <p className="text-xs font-mono text-muted-foreground/50">2026</p>
        </div>
      </footer>
    </div>
  );
}
