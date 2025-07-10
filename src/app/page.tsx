
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ePub, { Book, Rendition, NavItem, Locations } from "epubjs";
import {
  BookOpen,
  Upload,
  Menu,
  ChevronLeft,
  ChevronRight,
  BookUp,
  Loader2,
  WholeWord,
  Globe,
  Zap,
  ShieldCheck,
  Smartphone,
  Paintbrush,
  BookMarked,
  Sparkles
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function EPubReaderPage() {
  const { toast } = useToast();
  const { t, setLocale } = useI18n();

  // Book state
  const [isBookLoaded, setIsBookLoaded] = useState(false);
  const [isBookProcessing, setIsBookProcessing] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [book, setBook] = useState<Book | null>(null);
  const [rendition, setRendition] = useState<Rendition | null>(null);
  const [bookTitle, setBookTitle] = useState("");
  const [toc, setToc] = useState<NavItem[]>([]);

  // Page navigation state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageInput, setPageInput] = useState("");

  // UI State
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [spread, setSpread] = useState<"auto" | "none">("auto");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationsReady, setIsLocationsReady] = useState(false);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const isMobile = useIsMobile();

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<Locations | null>(null);
  const cfiRef = useRef<string | null>(null);

  // File handling
  const handleFileUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleCloseBook = useCallback(() => {
    if (book) {
      book.destroy();
    }
    setIsBookLoaded(false);
    setIsBookProcessing(false);
    setBook(null);
    setRendition(null);
    setToc([]);
    setBookTitle("");
    locationsRef.current = null;
    cfiRef.current = null;
    setLoadingProgress(0);
    setIsLocationsReady(false);
    setCurrentPage(0);
    setTotalPages(0);
    setPageInput("");
  }, [book]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleCloseBook(); // Clean up previous book before loading a new one

    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target?.result;
      if (arrayBuffer) {
        const loadedBook = ePub(arrayBuffer as ArrayBuffer);
        setBook(loadedBook);
        setIsBookLoaded(true);
      } else {
        toast({
          variant: "destructive",
          title: t("error.reading_file_title"),
          description: t("error.reading_file_description"),
        });
      }
    };
    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: t("error.reading_file_title"),
        description: t("error.reading_file_error_description"),
      });
    };
    reader.readAsArrayBuffer(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCloseBookAndSheet = useCallback(() => {
    setIsMenuOpen(false); // Close the sheet first
    setTimeout(() => {
      handleCloseBook(); // Then close the book after a delay
    }, 300); // 300ms matches sheet animation
  }, [handleCloseBook]);

  // Page navigation
  const handlePageChange = (direction: "prev" | "next") => {
    if (rendition) {
      if (direction === "prev") {
        rendition.prev();
      } else {
        rendition.next();
      }
    }
  };

  const handleTocItemClick = useCallback(
    (href: string) => {
      if (rendition) {
        rendition.display(href);
        setIsMenuOpen(false);
      }
    },
    [rendition]
  );

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const navigateToPage = (input: string) => {
    const pageNum = parseInt(input, 10);
    if (
      !isNaN(pageNum) &&
      pageNum > 0 &&
      pageNum <= totalPages &&
      locationsRef.current
    ) {
      const cfi = locationsRef.current.cfiFromLocation(pageNum - 1);
      if (cfi && rendition) {
        rendition.display(cfi);
      }
    } else {
      setPageInput(String(currentPage));
    }
  };

  const handlePageInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      navigateToPage((e.target as HTMLInputElement).value);
    }
  };

  const handlePageInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    navigateToPage(e.target.value);
  };

  // Rendition setup effect
  useEffect(() => {
    if (book && viewerRef.current) {
      setIsBookProcessing(true);
      setLoadingProgress(0);
      setIsLocationsReady(false);

      const renditionRendered = { current: false };
      const locationsGenerated = { current: false };

      const checkLoadingComplete = () => {
        if (renditionRendered.current && locationsGenerated.current) {
          setIsBookProcessing(false);
        }
      };

      const newRendition = book.renderTo(viewerRef.current, {
        width: "100%",
        height: "100%",
        spread: "auto",
        flow: "paginated",
      });
      setRendition(newRendition);

      const MIN_SWIPE_DISTANCE = 50;
      let touchStartX = 0;
      let touchMoveX = 0;

      newRendition.on("touchstart", (event: TouchEvent) => {
        touchStartX = event.changedTouches[0].clientX;
        touchMoveX = event.changedTouches[0].clientX;
      });

      newRendition.on("touchmove", (event: TouchEvent) => {
        touchMoveX = event.changedTouches[0].clientX;
      });

      newRendition.on("touchend", () => {
        if (!touchStartX || !touchMoveX) return;
        const distance = touchStartX - touchMoveX;

        if (distance > MIN_SWIPE_DISTANCE) {
          newRendition.next();
        } else if (distance < -MIN_SWIPE_DISTANCE) {
          newRendition.prev();
        }
        touchStartX = 0;
        touchMoveX = 0;
      });

      newRendition.themes.register("light", {
        body: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
        },
        "a:hover": {
          color: "#0000EE",
        },
      });

      newRendition.themes.select("light");

      const onFirstRendered = () => {
        renditionRendered.current = true;
        checkLoadingComplete();
        newRendition.off("rendered", onFirstRendered);
      };
      newRendition.on("rendered", onFirstRendered);

      book.ready
        .then(async () => {
          if (book.packaging.metadata.title) {
            setBookTitle(book.packaging.metadata.title);
          }
          if (book.navigation) {
            setToc(book.navigation.toc);
          }

          book.locations.on("progress", (p: number) => {
            setLoadingProgress(Math.round(p * 100));
          });

          await book.locations.generate(1650);

          locationsRef.current = book.locations;
          setTotalPages(book.locations.total);
          setIsLocationsReady(true);
          locationsGenerated.current = true;
          checkLoadingComplete();
        })
        .catch((err) => {
          console.error("Error loading book:", err);
          toast({
            variant: "destructive",
            title: t("error.loading_book_title"),
            description: t("error.loading_book_description"),
          });
          handleCloseBook();
        });

      newRendition.display();

      return () => {
        // Cleanup is handled by handleCloseBook now
      };
    }
  }, [book, handleCloseBook, toast, t]);

  // Event listeners effect
  useEffect(() => {
    if (!rendition) return;

    const handleRelocated = (location: any) => {
      setIsAtStart(location.atStart);
      setIsAtEnd(location.atEnd);
      if (location.start?.cfi) {
        cfiRef.current = location.start.cfi;
      }
      if (locationsRef.current) {
        const currentPageNum = locationsRef.current.locationFromCfi(
          location.start.cfi
        );
        if (currentPageNum !== null) {
          setCurrentPage(currentPageNum + 1);
          setPageInput(String(currentPageNum + 1));
        }
      }
    };

    rendition.on("relocated", handleRelocated);

    return () => {
      rendition.off("relocated", handleRelocated);
    };
  }, [rendition]);

  // Force single page view on mobile
  useEffect(() => {
    if (isMobile) {
      setSpread("none");
    }
  }, [isMobile]);

  // Style application effects
  useEffect(() => {
    if (rendition) {
      rendition.themes.override("font-size", `${fontSize}px`);
    }
  }, [rendition, fontSize]);

  useEffect(() => {
    if (rendition) {
      rendition.themes.override("line-height", `${lineHeight}`);
    }
  }, [rendition, lineHeight]);

  useEffect(() => {
    if (rendition) {
      const cfi = cfiRef.current;
      rendition.spread(spread);
      if (cfi) {
        rendition.display(cfi);
      }
    }
  }, [rendition, spread]);

  // Keyboard shortcuts effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isBookLoaded) return;

      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        e.ctrlKey ||
        e.metaKey
      )
        return;

      switch (e.key) {
        case "ArrowRight":
          handlePageChange("next");
          break;
        case "ArrowLeft":
          handlePageChange("prev");
          break;
        case "t":
        case "T":
          setIsMenuOpen((v) => !v);
          break;
        case "=":
        case "+":
          setFontSize((s) => Math.min(s + 2, 36));
          break;
        case "-":
          setFontSize((s) => Math.max(s - 2, 10));
          break;
        case "]":
          setLineHeight((h) => Math.min(h + 0.1, 2.4));
          break;
        case "[":
          setLineHeight((h) => Math.max(h - 0.1, 1.2));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBookLoaded]);

  if (!isBookLoaded) {
    const featureList = [
      { icon: Sparkles, key: "feature_1" },
      { icon: ShieldCheck, key: "feature_2" },
      { icon: Paintbrush, key: "feature_3" },
      { icon: Smartphone, key: "feature_4" },
      { icon: Zap, key: "feature_5" },
      { icon: BookMarked, key: "feature_6" },
    ];

    const howItWorksSteps = [
        { num: 1, key: "step_1" },
        { num: 2, key: "step_2" },
        { num: 3, key: "step_3" },
    ];
    
    const faqItems = [
        { q: "q1", a: "a1" },
        { q: "q2", a: "a2" },
        { q: "q3", a: "a3" },
        { q: "q4", a: "a4" },
        { q: "q5", a: "a5" },
        { q: "q6", a: "a6" },
        { q: "q7", a: "a7" },
    ];


    return (
        <div className="flex w-full flex-col items-center bg-background text-foreground font-body">
            <main className="w-full">
                <section className="flex min-h-screen w-full flex-col items-center justify-center p-4 text-center">
                    <Card className="relative w-full max-w-lg shadow-2xl z-10 border-2 border-primary/10">
                        <div className="absolute top-4 right-4">
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label={t("Language")}>
                                <Globe className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => setLocale("en")}>English</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLocale("de")}>Deutsch</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLocale("es")}>Español</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLocale("fr")}>Français</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLocale("pl")}>Polski</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLocale("it")}>Italiano</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLocale("pt")}>Português</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLocale("bg")}>български</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLocale("ru")}>Русский</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLocale("ar")}>العربية</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLocale("ja")}>日本語</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLocale("ko")}>한국어</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setLocale("zh-TW")}>繁體中文</DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <CardHeader>
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <BookOpen className="h-10 w-10" />
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold font-headline">
                               {t("ePub Reader")}
                            </h1>
                             <CardDescription className="text-lg text-muted-foreground pt-2">
                                {t('homepage_subtitle')}
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
                            <Button size="lg" onClick={handleFileUploadClick} className="font-semibold">
                            <Upload className="mr-2 h-5 w-5" />
                            {t("Upload a Book")}
                            </Button>
                        </CardContent>
                    </Card>
                </section>
                
                <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-20">
                    <section id="features">
                        <h2 className="text-3xl font-bold text-center mb-10 font-headline">{t('features_title')}</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featureList.map((feature, index) => (
                            <div key={index} className="text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card">
                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 font-headline">{t(`features_list.${feature.key}.title`)}</h3>
                                <p className="text-muted-foreground">{t(`features_list.${feature.key}.description`)}</p>
                            </div>
                        ))}
                        </div>
                    </section>
                    
                    <section id="why-choose-us" className="bg-muted -mx-4 sm:-mx-6 lg:-mx-8 py-16 px-4 sm:px-6 lg:px-8 rounded-lg">
                        <div className="w-full max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-center mb-10 font-headline">{t('why_choose_us_title')}</h2>
                            <div className="text-center text-muted-foreground space-y-4 text-lg">
                                <p>{t('why_choose_us_p1')}</p>
                                <p>{t('why_choose_us_p2_1')} <a href="#features" className="text-primary underline hover:text-primary/80">{t('why_choose_us_p2_link')}</a>{t('why_choose_us_p2_2')}</p>
                                <p>{t('why_choose_us_p3')}</p>
                                <p>{t('why_choose_us_p4')}</p>
                                <p>{t('why_choose_us_p5')}</p>
                            </div>
                        </div>
                    </section>

                    <section id="how-it-works">
                        <h2 className="text-3xl font-bold text-center mb-12 font-headline">{t('how_it_works_title')}</h2>
                        <div className="relative">
                             <div className="absolute left-1/2 top-6 hidden h-[calc(100%-3rem)] w-0.5 bg-border md:block" aria-hidden="true"></div>
                            <div className="grid md:grid-cols-3 gap-y-12 md:gap-x-12">
                                {howItWorksSteps.map((step) => (
                                    <div key={step.num} className="text-center relative px-4">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mx-auto mb-4 z-10 relative ring-8 ring-background">
                                            <span className="text-xl font-bold">{step.num}</span>
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 font-headline">{t(`how_it_works_steps.${step.key}.title`)}</h3>
                                        <p className="text-muted-foreground mt-4 text-lg">{t(`how_it_works_steps.${step.key}.description`)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="faq">
                        <h2 className="text-3xl font-bold text-center mb-10 font-headline">{t('faq_title')}</h2>
                        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                            {faqItems.map((item, index) => (
                                <AccordionItem key={index} value={`item-${index + 1}`} className="bg-card px-4 rounded-lg mb-2 shadow-sm">
                                    <AccordionTrigger className="text-lg font-medium text-left hover:no-underline font-headline">{t(`faq_items.${item.q}`)}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                    {t(`faq_items.${item.a}`)}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>
                </div>
            </main>
            <footer className="w-full border-t bg-muted/50 mt-12">
                <div className="container mx-auto py-6 text-center text-sm text-muted-foreground">
                    <p>
                        © {new Date().getFullYear()} {t("footer.site_name")}. {t("footer.rights_reserved")}
                    </p>
                </div>
            </footer>
        </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col bg-background text-foreground font-body">
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b px-4 sm:px-6">
        <h2 className="truncate text-xl font-bold font-headline">
          {bookTitle || t("Loading...")}
        </h2>
        <div className="flex items-center gap-1">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t("Open Menu (T)")}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col sm:max-w-md font-body">
              <SheetHeader>
                <SheetTitle className="font-headline">{t("Menu")}</SheetTitle>
              </SheetHeader>
              <Tabs defaultValue="contents" className="mt-4 flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="contents">{t("Contents")}</TabsTrigger>
                  <TabsTrigger value="settings">{t("Settings")}</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="contents"
                  className="flex-1 min-h-0"
                >
                  <ScrollArea className="h-full">
                    <ul className="space-y-1 p-4">
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
                </TabsContent>
                <TabsContent
                  value="settings"
                  className="flex-1 overflow-hidden min-h-0"
                >
                  <ScrollArea className="h-full p-4">
                    <div className="grid gap-6">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label>{t("Page View")}</Label>
                        <RadioGroup
                          value={isMobile ? "none" : spread}
                          onValueChange={(value) =>
                            setSpread(value as "auto" | "none")
                          }
                          disabled={isMobile}
                          className="col-span-2 flex items-center justify-end gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="auto" id="view-two-page" />
                            <Label
                              htmlFor="view-two-page"
                              className="cursor-pointer font-normal"
                            >
                              {t("Two Page")}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="none"
                              id="view-single-page"
                            />
                            <Label
                              htmlFor="view-single-page"
                              className="cursor-pointer font-normal"
                            >
                              {t("Single")}
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label
                          htmlFor="fontSize"
                          className="flex items-center gap-2"
                        >
                          <WholeWord className="h-4 w-4" /> {t("Font Size")}
                        </Label>
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
                        <Label htmlFor="lineHeight">{t("Line Height")}</Label>
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
                  </ScrollArea>
                </TabsContent>
              </Tabs>
              <Separator />
              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCloseBookAndSheet}
                >
                  <BookUp className="mr-2 h-4 w-4" />
                  {t("Read a new Book")}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="relative flex-1 overflow-hidden">
        {isBookProcessing && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-semibold font-headline mb-4">
              {t("preparing_book")}
            </p>
            <Progress value={loadingProgress} className="w-64" />
          </div>
        )}
        <div
          className={cn(
            "h-full w-full opacity-100 transition-opacity duration-150 ease-in-out",
            isBookProcessing && "opacity-0"
          )}
        >
          <div ref={viewerRef} className="h-full" id="viewer" />
        </div>
      </main>

      <footer className="flex flex-col items-center justify-center gap-2 border-t p-4">
        <div className="flex w-full max-w-sm items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange("prev")}
            disabled={isAtStart || !isLocationsReady}
            aria-label={t("Previous Page")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 text-sm">
            <Input
              type="number"
              className="h-9 w-16 text-center"
              value={pageInput}
              onChange={handlePageInputChange}
              onKeyDown={handlePageInputKeyDown}
              onBlur={handlePageInputBlur}
              disabled={!isLocationsReady}
              aria-label={t("Current Page")}
            />
            <span className="text-muted-foreground">
              {t("of")} {totalPages > 0 ? totalPages : "..."}
            </span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange("next")}
            disabled={isAtEnd || !isLocationsReady}
            aria-label={t("Next Page")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
