
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
  Loader2,
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
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const KEYBOARD_SHORTCUTS = [
  { key: "→", description: "Next Page" },
  { key: "←", description: "Previous Page" },
  { key: "T", description: "Toggle Table of Contents" },
  { key: "S", description: "Toggle Settings" },
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
  const [isBookProcessing, setIsBookProcessing] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [book, setBook] = useState<Book | null>(null);
  const [rendition, setRendition] = useState<Rendition | null>(null);
  const [bookTitle, setBookTitle] = useState("");
  const [toc, setToc] = useState<NavItem[]>([]);
  const [progress, setProgress] = useState(0);

  // UI State
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [spread, setSpread] = useState<'auto' | 'none'>('auto');
  
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
      setIsBookProcessing(true);
      setLoadingProgress(0);
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
    setIsBookProcessing(false);
    setBook(null);
    setRendition(null);
    setToc([]);
    setBookTitle("");
    locationsRef.current = null;
    setProgress(0);
    setLoadingProgress(0);
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

  // Rendition setup effect
  useEffect(() => {
    if (book && viewerRef.current) {
      const renditionRendered = { current: false };
      const locationsGenerated = { current: false };

      const checkLoadingComplete = () => {
        if (renditionRendered.current && locationsGenerated.current) {
          setIsBookProcessing(false);
        }
      };
      
      setIsBookProcessing(true);
      setLoadingProgress(0);
      setIsLocationsReady(false);

      const newRendition = book.renderTo(viewerRef.current, {
        width: "100%",
        height: "100%",
        spread: "auto",
        flow: "paginated",
      });
      setRendition(newRendition);
      
      // Register themes once, when the rendition is created.
      newRendition.themes.register("light", {
        body: {
          background: 'hsl(0 0% 93.3%)',
          color: 'hsl(0 0% 3.9%)',
        },
        a: {
          color: '#0000EE',
          'text-decoration': 'underline !important',
        },
        'a:hover': {
          color: '#0000EE',
        },
      });
      // Select the initial theme
      newRendition.themes.select("light");

      const onFirstRendered = () => {
        renditionRendered.current = true;
        checkLoadingComplete();
        newRendition.off('rendered', onFirstRendered);
      };
      newRendition.on('rendered', onFirstRendered);
      
      book.ready.then(async () => {
        if (book.packaging.metadata.title) {
          setBookTitle(book.packaging.metadata.title);
        }
        if (book.navigation) {
          setToc(book.navigation.toc);
        }
        
        book.locations.on('progress', (p: number) => {
          setLoadingProgress(Math.round(p * 100));
        });

        const generatedLocations = await book.locations.generate(1650);
        
        locationsRef.current = generatedLocations;
        setIsLocationsReady(true);
        locationsGenerated.current = true;
        checkLoadingComplete();
      });

      newRendition.display();

      return () => {
        book?.destroy();
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

  // Style application effects
  useEffect(() => {
    if (rendition) {
        rendition.themes.fontSize(`${fontSize}px`);
    }
  }, [rendition, fontSize]);
  
  useEffect(() => {
    if (rendition) {
        rendition.themes.override('line-height', `${lineHeight}`, true);
    }
  }, [rendition, lineHeight]);

  useEffect(() => {
    if (rendition) rendition.spread(spread);
  }, [rendition, spread]);


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
            <CardTitle className="text-3xl font-headline">
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
            <SheetContent className="flex flex-col sm:max-w-md">
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
                    <Label>Page View</Label>
                    <RadioGroup
                      value={spread}
                      onValueChange={(value) => setSpread(value as 'auto' | 'none')}
                      className="col-span-2 flex items-center justify-end gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="auto" id="view-two-page" />
                        <Label htmlFor="view-two-page" className="cursor-pointer font-normal">Two Page</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="view-single-page" />
                        <Label htmlFor="view-single-page" className="cursor-pointer font-normal">Single Page</Label>
                      </div>
                    </RadioGroup>
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
      
      <main className="relative flex-1 overflow-hidden">
        {isBookProcessing && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
                <p className="text-lg font-semibold font-headline">Preparing your book...</p>
                <p className="mb-4 text-sm text-muted-foreground">
                  {loadingProgress < 100 ? `Analyzing content: ${Math.round(loadingProgress)}%` : "Rendering..."}
                </p>
                <Progress value={loadingProgress} className="w-64" />
            </div>
        )}
        <div
          className={cn(
            "h-full w-full transition-opacity duration-150 ease-in-out",
            isBookProcessing ? "opacity-0" : "opacity-100"
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
