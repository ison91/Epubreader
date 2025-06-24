"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ePub, { Book, Rendition, NavItem, Locations } from "epubjs";
import {
  BookOpen,
  Upload,
  Menu,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookUp,
  Sun,
  Moon,
  Keyboard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

const FONT_OPTIONS = [
  { name: 'Literata', family: 'Literata, serif' },
  { name: 'Georgia', family: 'Georgia, serif' },
  { name: 'Garamond', family: "'EB Garamond', serif" },
  { name: 'Merriweather', family: 'Merriweather, serif' },
  { name: 'Palatino', family: "Palatino, 'Palatino Linotype', 'Book Antiqua', serif" },
  { name: 'Baskerville', family: "'Libre Baskerville', serif" },
  { name: 'Tisa', family: 'Tinos, serif' },
];

const KEYBOARD_SHORTCUTS = [
  { key: "→", description: "Next Page" },
  { key: "←", description: "Previous Page" },
  { key: "T", description: "Toggle Table of Contents" },
  { key: "S", description: "Toggle Settings" },
  { key: "D", description: "Toggle Dark/Light Theme" },
  { key: "Space", description: "Upload New Book" },
  { key: "+ / =", description: "Increase Font Size" },
  { key: "-", description: "Decrease Font Size" },
  { key: "]", description: "Increase Line Height" },
  { key: "[", description: "Decrease Line Height" },
  { key: "Esc", description: "Close Menu/Settings" },
];

export default function EPubReaderPage() {
  // Book state
  const [isBookLoaded, setIsBookLoaded] = useState(false);
  const [book, setBook] = useState<Book | null>(null);
  const [rendition, setRendition] = useState<Rendition | null>(null);
  const [bookTitle, setBookTitle] = useState("");
  const [toc, setToc] = useState<NavItem[]>([]);
  const [progress, setProgress] = useState(0);

  // UI State
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0].family);
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLocationsReady, setIsLocationsReady] = useState(false);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const isMobile = useIsMobile();

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<Locations | null>(null);

  // File handling
  const handleFileUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (window.FileReader) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          if (book) {
            book.destroy();
          }
          const loadedBook = ePub(event.target.result as ArrayBuffer);
          setBook(loadedBook);
          setIsBookLoaded(true);
        }
      };
      reader.readAsArrayBuffer(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCloseBook = useCallback(() => {
    setIsBookLoaded(false);
    setBook(null);
    setRendition(null);
    setToc([]);
    setBookTitle("");
    locationsRef.current = null;
    setProgress(0);
    setIsLocationsReady(false);
    book?.destroy();
  }, [book]);

  const handleCloseBookAndSheet = useCallback(() => {
    setIsTocOpen(false); // Close the sheet first
    setTimeout(() => {
      handleCloseBook(); // Then close the book after a delay
    }, 300); // 300ms matches sheet animation
  }, [handleCloseBook]);


  // Page navigation
  const handlePageChange = (direction: "prev" | "next") => {
    if (rendition) {
      setIsTransitioning(true);
      if (direction === "prev") {
        rendition.prev();
      } else {
        rendition.next();
      }
    }
  };

  const handleTocItemClick = useCallback((href: string) => {
    if (rendition) {
      setIsTransitioning(true);
      rendition.display(href);
      setIsTocOpen(false);
    }
  }, [rendition]);

  const handleProgressChange = (value: number[]) => {
    if (locationsRef.current && rendition && locationsRef.current.cfiFromPercentage) {
      const percentage = value[0] / 100;
      const cfi = locationsRef.current.cfiFromPercentage(percentage);
      rendition.display(cfi);
    }
  };

  // Theme effect for the main document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  // Set initial theme from system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Rendition setup effect
  useEffect(() => {
    if (book && viewerRef.current) {
      setIsLocationsReady(false);
      const newRendition = book.renderTo(viewerRef.current, {
        width: "100%",
        height: "100%",
        spread: "auto",
        flow: "paginated",
      });

      book.ready.then(() => {
        if (book.packaging.metadata.title) {
          setBookTitle(book.packaging.metadata.title);
        }
        if (book.navigation) {
          setToc(book.navigation.toc);
        }
        
        locationsRef.current = book.locations;
        book.locations.generate(1650).then(() => {
          locationsRef.current = book.locations; // Re-assign to ensure we have the full object
          setIsLocationsReady(true);
        });
      });

      newRendition.themes.register("light", {
        body: {
          background: "hsl(0 0% 93.3%)",
          color: "hsl(0 0% 3.9%)",
        },
        "a": {
          "color": "#0000EE",
          "text-decoration": "underline !important"
        },
        "a:hover": {
          "color": "#0000EE"
        }
      });
      newRendition.themes.register("dark", {
        body: {
          background: "hsl(240 6% 25%)",
          color: "hsl(0 0% 100%)",
        },
        "a": {
          "color": "#93c5fd",
          "text-decoration": "underline !important"
        },
        "a:hover": {
          "color": "#93c5fd"
        }
      });
      
      setRendition(newRendition);
      
      return () => {
        newRendition?.destroy();
      };
    }
  }, [book]);
  
  // Event listeners effect
  useEffect(() => {
    if (!rendition) return;

    const handleRelocated = (location: any) => {
      setIsAtStart(location.atStart);
      setIsAtEnd(location.atEnd);
      if (locationsRef.current && locationsRef.current.percentageFromCfi) {
          const percentage = locationsRef.current.percentageFromCfi(location.start.cfi);
          setProgress(Math.round(percentage * 100));
      }
      setIsTransitioning(false);
    };
    
    const handleRendered = () => {
      setIsTransitioning(false);
    };

    rendition.on("relocated", handleRelocated);
    rendition.on("rendered", handleRendered);

    return () => {
      rendition.off("relocated", handleRelocated);
      rendition.off("rendered", handleRendered);
    };
  }, [rendition]);

  // Style application effect
  useEffect(() => {
    if (rendition) {
      rendition.themes.select(theme);
      rendition.themes.fontSize(`${fontSize}px`);
      rendition.themes.override("line-height", `${lineHeight}`);
      rendition.themes.font(fontFamily);
      rendition.display();
    }
  }, [rendition, theme, fontSize, lineHeight, fontFamily]);


  // Keyboard shortcuts effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isBookLoaded) {
        if (e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          handleFileUploadClick();
        }
        return;
      }
      
      if (e.key === 'Escape') {
        setIsTocOpen(false);
        setIsSettingsOpen(false);
      }
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA' || e.ctrlKey || e.metaKey) return;

      switch (e.key) {
        case "ArrowRight":
          handlePageChange("next");
          break;
        case "ArrowLeft":
          handlePageChange("prev");
          break;
        case " ":
        case "Spacebar":
            e.preventDefault();
            handleFileUploadClick();
            break;
        case "t":
        case "T":
          setIsTocOpen(v => !v);
          break;
        case "s":
        case "S":
          setIsSettingsOpen(v => !v);
          break;
        case "d":
        case "D":
          setTheme(t => t === 'light' ? 'dark' : 'light');
          break;
        case "=":
        case "+":
          setFontSize(s => Math.min(s + 2, 36));
          break;
        case "-":
          setFontSize(s => Math.max(s - 2, 10));
          break;
        case "]":
          setLineHeight(h => Math.min(h + 0.1, 2.4));
          break;
        case "[":
          setLineHeight(h => Math.max(h - 0.1, 1.2));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBookLoaded, handleFileUploadClick]);

  if (!isBookLoaded) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center shadow-2xl">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BookOpen className="h-10 w-10" />
            </div>
            <CardTitle className="font-headline text-3xl">
              ePub Reader
            </CardTitle>
            <CardDescription className="pt-1 text-muted-foreground">
              A clean, distraction-free reading environment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".epub"
            />
            <Button size="lg" onClick={handleFileUploadClick}>
              <Upload className="mr-2 h-5 w-5" />
              Upload a Book
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Or press <kbd className="rounded-md border bg-muted px-2 py-1 font-sans text-xs">Spacebar</kbd> to upload.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col bg-background text-foreground">
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b px-4 sm:px-6">
        <h1 className="truncate text-xl font-bold font-headline">
          {bookTitle || "Loading..."}
        </h1>
        <div className="flex items-center gap-1">
          <Sheet open={isTocOpen} onOpenChange={setIsTocOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Table of Contents (T)">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader>
                <SheetTitle className="font-headline">
                  Table of Contents
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="my-4 flex-1">
                <ul className="space-y-1 pr-6">
                  {toc.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleTocItemClick(item.href)}
                        className="w-full rounded-md p-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              {!isMobile && (
                <>
                  <Separator />
                  <div className="py-4">
                    <div className="mb-2 flex items-center gap-2 font-headline font-semibold">
                      <Keyboard className="h-4 w-4" />
                      <h3>Keyboard Shortcuts</h3>
                    </div>
                    <ScrollArea className="h-56">
                      <ul className="space-y-1.5 pr-4 text-sm text-muted-foreground">
                        {KEYBOARD_SHORTCUTS.map(shortcut => (
                          <li key={shortcut.key} className="flex items-center justify-between">
                            <span>{shortcut.description}</span>
                            <kbd className="min-w-[40px] text-center rounded-md border bg-muted px-2 py-0.5 font-sans text-xs">
                              {shortcut.key}
                            </kbd>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </div>
                </>
              )}
              <Separator />
              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCloseBookAndSheet}
                >
                  <BookUp className="mr-2 h-4 w-4" />
                  Read a new Book
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Popover open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Display Settings (S)">
                <Settings className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none font-headline">
                    Display Settings
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Adjust your reading experience.
                  </p>
                </div>
                <Separator />
                <div className="grid gap-4 py-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label>Theme</Label>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <Sun className="h-4 w-4" />
                      <Switch
                        checked={theme === 'dark'}
                        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                        aria-label="Toggle theme"
                      />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="fontFamily">Font</Label>
                     <Select value={fontFamily} onValueChange={setFontFamily}>
                        <SelectTrigger id="fontFamily" className="col-span-2">
                          <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                        <SelectContent>
                          {FONT_OPTIONS.map(font => (
                            <SelectItem key={font.name} value={font.family} style={{ fontFamily: font.family }}>
                              {font.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Slider
                      id="fontSize"
                      min={10}
                      max={36}
                      step={2}
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                      className="col-span-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="lineHeight">Line Height</Label>
                    <Slider
                      id="lineHeight"
                      min={1.2}
                      max={2.4}
                      step={0.1}
                      value={[lineHeight]}
                      onValueChange={(value) => setLineHeight(value[0])}
                      className="col-span-2"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <div
          className={cn(
            "h-full w-full font-body transition-opacity duration-150 ease-in-out",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
        >
          <div ref={viewerRef} className="h-full" id="viewer" />
        </div>
      </main>
      
      <footer className="flex flex-col items-center justify-center gap-2 border-t p-4">
        <div className="flex w-full max-w-2xl items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange("prev")}
            disabled={isAtStart || !isLocationsReady}
            aria-label="Previous Page"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <Slider
            value={[progress]}
            onValueChange={handleProgressChange}
            className="flex-1"
            aria-label="Book progress"
            disabled={!isLocationsReady}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange("next")}
            disabled={isAtEnd || !isLocationsReady}
            aria-label="Next Page"
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      </footer>
    </div>
  );
}
