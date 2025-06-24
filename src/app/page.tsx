"use client";

import { useState, useRef } from "react";
import {
  BookOpen,
  Upload,
  Menu,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookUp,
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
import { Separator } from "@/components/ui/separator";
import { mockBook } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function EPubReaderPage() {
  const [isBookLoaded, setIsBookLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalPages = mockBook.content.length;

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = () => {
    // In a real app, you would process the file here.
    // For this demo, we'll just simulate loading the book.
    setIsBookLoaded(true);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages && newPage !== currentPage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(newPage);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleTocItemClick = (page: number) => {
    handlePageChange(page);
    setIsTocOpen(false);
  };

  const handleCloseBook = () => {
    setIsTocOpen(false);
    setTimeout(() => {
      setIsBookLoaded(false);
    }, 300); // Allow sheet to animate out
  };

  if (!isBookLoaded) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center shadow-2xl">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BookOpen className="h-10 w-10" />
            </div>
            <CardTitle className="font-headline text-3xl">ePub Reader</CardTitle>
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
              accept=".epub,.pdf"
            />
            <Button size="lg" onClick={handleFileUploadClick}>
              <Upload className="mr-2 h-5 w-5" />
              Upload a Book
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col bg-background text-foreground">
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b px-4 sm:px-6">
        <h1 className="truncate text-xl font-bold font-headline">{mockBook.title}</h1>
        <div className="flex items-center gap-1">
          <Sheet open={isTocOpen} onOpenChange={setIsTocOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Table of Contents">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader>
                <SheetTitle className="font-headline">Table of Contents</SheetTitle>
              </SheetHeader>
              <ScrollArea className="my-4 flex-1">
                <ul className="space-y-1 pr-6">
                  {mockBook.toc.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleTocItemClick(item.page)}
                        className={cn(
                          "w-full rounded-md p-2 text-left transition-colors hover:bg-accent hover:text-accent-foreground",
                          currentPage >= item.page &&
                            (!mockBook.toc[index + 1] ||
                              currentPage < mockBook.toc[index + 1].page) &&
                            "bg-accent/80 text-accent-foreground"
                        )}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <div className="mt-auto border-t pt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCloseBook}
                >
                  <BookUp className="mr-2 h-4 w-4" />
                  Read a new Book
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Display Settings">
                <Settings className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none font-headline">Display Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Adjust your reading experience.
                  </p>
                </div>
                <Separator />
                <div className="grid gap-4 py-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Slider
                      id="fontSize"
                      min={12}
                      max={32}
                      step={1}
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

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-12">
        <div
          className={cn(
            "mx-auto max-w-prose font-body transition-opacity duration-150 ease-in-out",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
          style={{ fontSize: `${fontSize}px`, lineHeight }}
        >
          {mockBook.content[currentPage].split("\n").map((paragraph, i) => (
            <p key={i} className="mb-6 last:mb-0">
              {paragraph || <>&nbsp;</>}
            </p>
          ))}
        </div>
      </main>

      <footer className="flex flex-col items-center justify-center gap-2 border-t p-4">
        <div className="flex w-full max-w-md items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <Slider
            value={[currentPage]}
            max={totalPages - 1}
            step={1}
            onValueChange={(value) => handlePageChange(value[0])}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Page {currentPage + 1} of {totalPages}
        </div>
      </footer>
    </div>
  );
}
