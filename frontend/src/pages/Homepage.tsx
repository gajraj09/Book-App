import { useState } from "react";
import {
  Search,
  BookOpen,
  Heart,
  Grid3X3,
  List,
  ChevronDown,
  Bookmark,
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

const BOOKS = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    rating: 4.5,
    pages: 304,
    year: 2020,
    status: "Read",
    favorite: true,
    cover:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=560&fit=crop&auto=format",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever.",
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    rating: 5,
    pages: 688,
    year: 1965,
    status: "Reading",
    favorite: true,
    cover:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=560&fit=crop&auto=format",
    description:
      "A mythic and emotionally charged hero's journey set on the desert planet Arrakis.",
  },
  {
    id: 3,
    title: "Piranesi",
    author: "Susanna Clarke",
    genre: "Fantasy",
    rating: 4.8,
    pages: 272,
    year: 2020,
    status: "Read",
    favorite: false,
    cover:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=560&fit=crop&auto=format",
    description:
      "Piranesi's house is no ordinary building. Its rooms are infinite, its halls stalked by tides.",
  },
  {
    id: 4,
    title: "The Name of the Rose",
    author: "Umberto Eco",
    genre: "Mystery",
    rating: 4.4,
    pages: 502,
    year: 1980,
    status: "Unread",
    favorite: false,
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=560&fit=crop&auto=format",
    description:
      "A medieval murder mystery set in an Italian monastery in the 14th century.",
  },
  {
    id: 5,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    rating: 4.6,
    pages: 443,
    year: 2011,
    status: "Read",
    favorite: true,
    cover:
      "https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?w=400&h=560&fit=crop&auto=format",
    description:
      "A brief history of humankind, tracing the ways in which biology and history have defined us.",
  },
  {
    id: 6,
    title: "Pachinko",
    author: "Min Jin Lee",
    genre: "Historical",
    rating: 4.7,
    pages: 496,
    year: 2017,
    status: "Reading",
    favorite: false,
    cover:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=560&fit=crop&auto=format",
    description:
      "An epic saga of a Korean family across generations in colonial Korea and Japan.",
  },
  {
    id: 7,
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    rating: 4.8,
    pages: 334,
    year: 2018,
    status: "Read",
    favorite: true,
    cover:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=560&fit=crop&auto=format",
    description:
      "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD.",
  },
  {
    id: 8,
    title: "Foundation",
    author: "Isaac Asimov",
    genre: "Sci-Fi",
    rating: 4.5,
    pages: 244,
    year: 1951,
    status: "Unread",
    favorite: false,
    cover:
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=560&fit=crop&auto=format",
    description:
      "The story of a group of scientists who preserve knowledge as civilizations fall.",
  },
  {
    id: 9,
    title: "The Shadow of the Wind",
    author: "Carlos Ruiz Zafón",
    genre: "Mystery",
    rating: 4.7,
    pages: 487,
    year: 2001,
    status: "Read",
    favorite: true,
    cover:
      "https://images.unsplash.com/photo-1510906594845-bc082582c8cc?w=400&h=560&fit=crop&auto=format",
    description:
      "A young boy discovers a mysterious novel in post-war Barcelona, setting off a dark chain of events.",
  },
  {
    id: 10,
    title: "Circe",
    author: "Madeline Miller",
    genre: "Fantasy",
    rating: 4.6,
    pages: 393,
    year: 2018,
    status: "Reading",
    favorite: false,
    cover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=560&fit=crop&auto=format",
    description:
      "The story of the witch Circe, daughter of the sun god Helios, discovering her power.",
  },
  {
    id: 11,
    title: "Normal People",
    author: "Sally Rooney",
    genre: "Fiction",
    rating: 4.2,
    pages: 273,
    year: 2018,
    status: "Read",
    favorite: false,
    cover:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=560&fit=crop&auto=format",
    description:
      "Connell and Marianne grow up in the same small town, but the similarities end there.",
  },
  {
    id: 12,
    title: "The Road",
    author: "Cormac McCarthy",
    genre: "Fiction",
    rating: 4.3,
    pages: 287,
    year: 2006,
    status: "Unread",
    favorite: false,
    cover:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=560&fit=crop&auto=format",
    description:
      "A father and son walk alone through burned America. Nothing moves in the ravaged landscape.",
  },
];

// const STATUS_COLORS: Record<string, string> = {
//   Read: "bg-emerald-900/60 text-emerald-300 border border-emerald-700/40",
//   Reading: "bg-amber-900/60 text-amber-300 border border-amber-700/40",
//   Unread: "bg-zinc-800/60 text-zinc-400 border border-zinc-700/40",
// };

function BookCard({
  book,
  view,
}: {
  book: (typeof BOOKS)[0];
  view: "grid" | "list";
}) {
  const [favorited, setFavorited] = useState(book.favorite);
  const [hovered, setHovered] = useState(false);

  if (view === "list") {
    return (
      <div
        className="flex gap-5 p-4 rounded-xl border border-[--border] bg-card hover:border-amber-800/40 hover:bg-[#1f1c18] transition-all duration-300 group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative flex-shrink-0 w-16 h-24 rounded-lg overflow-hidden bg-zinc-800">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center flex-1 min-w-0 gap-1.5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className="font-semibold text-foreground text-base leading-snug truncate"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {book.author}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setFavorited(!favorited)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart
                  size={14}
                  className={
                    favorited
                      ? "fill-amber-400 text-amber-400"
                      : "text-zinc-600 hover:text-amber-400"
                  }
                />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-muted-foreground border border-[--border] px-2 py-0.5 rounded-full">
              {book.genre}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {book.pages} pages · {book.year}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1 mt-0.5">
            {book.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-[--border] bg-card hover:border-amber-800/50 transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: hovered
          ? "0 8px 40px rgba(201,149,58,0.12)"
          : "0 2px 12px rgba(0,0,0,0.4)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-transparent to-transparent opacity-80" />

        {/* Genre pill on cover */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-amber-300 border border-amber-800/40">
            {book.genre}
          </span>
        </div>

        {/* Favorite button */}
        <button
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/80"
          onClick={() => setFavorited(!favorited)}
        >
          <Heart
            size={13}
            className={
              favorited ? "fill-amber-400 text-amber-400" : "text-white/70"
            }
          />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4">
        <div>
          <h3
            className="font-semibold text-foreground text-sm leading-snug line-clamp-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {book.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {book.author} · {book.year}
          </p>
        </div>

        <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
          {book.description}
        </p>

        <div className="flex items-center justify-between mt-1 pt-3 border-t border-[--border]">
          <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
            <BookOpen size={10} /> {book.pages} pages
          </span>
          <button className="text-[11px] text-amber-400 hover:text-amber-300 font-mono tracking-wide transition-colors flex items-center gap-1">
            <Bookmark size={10} /> View
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookDashboard() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = BOOKS.filter((b) => {
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
      style={{ fontFamily: "'Lato', sans-serif" }}
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
                Bibliotheca
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
                      John Doe
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
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-xs text-muted-foreground font-normal">
                        john@example.com
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
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
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
              My Library
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} of {BOOKS.length} books
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
                {["All", "Read", "Reading", "Unread"].map((s) => (
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
                ? BOOKS.length
                : BOOKS.filter((b) => b.genre === genre).length;
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
            Bibliotheca · {BOOKS.length} volumes catalogued
          </p>
          <p className="text-xs font-mono text-muted-foreground/50">2026</p>
        </div>
      </footer>
    </div>
  );
}
