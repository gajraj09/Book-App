import {
  BookOpen,
  Heart,
  Bookmark,
} from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

type UserData = { _id: string; name: string; email: string };

type OutletContext = { user: UserData };

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

 const BookCard = ({ book, view }: { book: Book; view: "grid" | "list" })=> {
  const [favorited, setFavorited] = useState(book.favorite);
  const [hovered, setHovered] = useState(false);
  const { user } = useOutletContext<OutletContext>();

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
          <button
            hidden={user?._id !== book.author}
            className="text-[11px] text-green-400 hover:text-amber-300 font-mono tracking-wide transition-colors flex items-center gap-1"
          >
            <Bookmark size={10} /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;