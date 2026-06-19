# Graph Report - .  (2026-06-19)

## Corpus Check
- 178 files · ~51,821 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 671 nodes · 845 edges · 88 communities (58 shown, 30 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Navigation & Tactile Cards|Navigation & Tactile Cards]]
- [[_COMMUNITY_Bento Cards|Bento Cards]]
- [[_COMMUNITY_Sidebar UI|Sidebar UI]]
- [[_COMMUNITY_Alert Dialog|Alert Dialog]]
- [[_COMMUNITY_IMAT Quiz & Review|IMAT Quiz & Review]]
- [[_COMMUNITY_Command Palette|Command Palette]]
- [[_COMMUNITY_Content Cards|Content Cards]]
- [[_COMMUNITY_Contact & Hero|Contact & Hero]]
- [[_COMMUNITY_Form Components|Form Components]]
- [[_COMMUNITY_Carousel|Carousel]]
- [[_COMMUNITY_Charts|Charts]]
- [[_COMMUNITY_PDF Report & Bookmarks|PDF Report & Bookmarks]]
- [[_COMMUNITY_Interactive Simulations|Interactive Simulations]]
- [[_COMMUNITY_Menu Bar|Menu Bar]]
- [[_COMMUNITY_Toast Notifications|Toast Notifications]]
- [[_COMMUNITY_Animations & Graduation|Animations & Graduation]]
- [[_COMMUNITY_Breadcrumbs|Breadcrumbs]]
- [[_COMMUNITY_Badges|Badges]]
- [[_COMMUNITY_Confidence Calibration|Confidence Calibration]]
- [[_COMMUNITY_Context Menu|Context Menu]]
- [[_COMMUNITY_Dropdown Menu|Dropdown Menu]]
- [[_COMMUNITY_Article Header & Likes|Article Header & Likes]]
- [[_COMMUNITY_Museum Mentions|Museum Mentions]]
- [[_COMMUNITY_Periodic Table Interactive|Periodic Table Interactive]]
- [[_COMMUNITY_Quick Fire & Step Solver|Quick Fire & Step Solver]]
- [[_COMMUNITY_Alert & Accordion UI|Alert & Accordion UI]]
- [[_COMMUNITY_Navigation Menu|Navigation Menu]]
- [[_COMMUNITY_Dialogs & Drawers|Dialogs & Drawers]]
- [[_COMMUNITY_Content & Collapsible|Content & Collapsible]]
- [[_COMMUNITY_Link Chip & Heading|Link Chip & Heading]]
- [[_COMMUNITY_Tabs & Pagination|Tabs & Pagination]]
- [[_COMMUNITY_Checkbox & Radio Group|Checkbox & Radio Group]]
- [[_COMMUNITY_Select & Popover|Select & Popover]]
- [[_COMMUNITY_Switch & Toggle|Switch & Toggle]]
- [[_COMMUNITY_Table & Scroll Area|Table & Scroll Area]]
- [[_COMMUNITY_Skeleton & Progress|Skeleton & Progress]]
- [[_COMMUNITY_Avatar & Badge UI|Avatar & Badge UI]]
- [[_COMMUNITY_Image Occlusion|Image Occlusion]]
- [[_COMMUNITY_Drag Drop Label|Drag Drop Label]]
- [[_COMMUNITY_Enzyme Kinetics|Enzyme Kinetics]]
- [[_COMMUNITY_DNA Strand|DNA Strand]]
- [[_COMMUNITY_Molecular Geometry|Molecular Geometry]]
- [[_COMMUNITY_pH Scale|pH Scale]]
- [[_COMMUNITY_Cell Membrane|Cell Membrane]]
- [[_COMMUNITY_Mitosis Steps|Mitosis Steps]]
- [[_COMMUNITY_Glycolysis Pathway|Glycolysis Pathway]]
- [[_COMMUNITY_Pathway Challenge|Pathway Challenge]]
- [[_COMMUNITY_Enzyme Simulator|Enzyme Simulator]]
- [[_COMMUNITY_Energy Dashboard|Energy Dashboard]]
- [[_COMMUNITY_Resizable & Sheet|Resizable & Sheet]]
- [[_COMMUNITY_Tooltip & Hover Card|Tooltip & Hover Card]]
- [[_COMMUNITY_Slider & Input OTP|Slider & Input OTP]]
- [[_COMMUNITY_Theme Provider & Toggle|Theme Provider & Toggle]]
- [[_COMMUNITY_Table of Contents|Table of Contents]]
- [[_COMMUNITY_Social Share|Social Share]]
- [[_COMMUNITY_Scroll Progress|Scroll Progress]]
- [[_COMMUNITY_Interactive Mascot|Interactive Mascot]]
- [[_COMMUNITY_Project Cards|Project Cards]]
- [[_COMMUNITY_Footer|Footer]]
- [[_COMMUNITY_Experience Timeline|Experience Timeline]]
- [[_COMMUNITY_Hero Animations|Hero Animations]]
- [[_COMMUNITY_Tap Ripple|Tap Ripple]]
- [[_COMMUNITY_Theme & Focus|Theme & Focus]]
- [[_COMMUNITY_Like Button|Like Button]]
- [[_COMMUNITY_Reading Time & Progress|Reading Time & Progress]]
- [[_COMMUNITY_Note Navigation|Note Navigation]]
- [[_COMMUNITY_Shortcuts Cheatsheet|Shortcuts Cheatsheet]]
- [[_COMMUNITY_Mobile Bottom Bar|Mobile Bottom Bar]]
- [[_COMMUNITY_Equation Block|Equation Block]]
- [[_COMMUNITY_External Resources|External Resources]]
- [[_COMMUNITY_Section Bookmark|Section Bookmark]]
- [[_COMMUNITY_Inline Review|Inline Review]]
- [[_COMMUNITY_Interactive Bottom Sheet|Interactive Bottom Sheet]]
- [[_COMMUNITY_Concept Map|Concept Map]]
- [[_COMMUNITY_Reading Progress|Reading Progress]]
- [[_COMMUNITY_Bookmarks Panel|Bookmarks Panel]]
- [[_COMMUNITY_Collapsible Callout|Collapsible Callout]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]

## God Nodes (most connected - your core abstractions)
1. `Button` - 28 edges
2. `Badge()` - 14 edges
3. `Card` - 14 edges
4. `CardContent` - 14 edges
5. `CardHeader` - 11 edges
6. `buttonVariants` - 6 edges
7. `HeadingLink()` - 5 edges
8. `LinkChip()` - 5 edges
9. `useTactileFeedback()` - 5 edges
10. `Input` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Calendar()` --calls--> `buttonVariants`  [EXTRACTED]
  components/ui/calendar.tsx → components/ui/button.tsx
- `PaginationLink()` --calls--> `buttonVariants`  [EXTRACTED]
  components/ui/pagination.tsx → components/ui/button.tsx
- `PeriodicTableProps` --references--> `ElementData`  [EXTRACTED]
  components/imat/interactive/periodic-table.tsx → components/imat/interactive/element-data.ts
- `Navigation()` --calls--> `useTactileFeedback()`  [EXTRACTED]
  components/navigation.tsx → components/tactile-feedback-provider.tsx

## Import Cycles
- None detected.

## Communities (88 total, 30 thin omitted)

### Community 0 - "Navigation & Tactile Cards"
Cohesion: 0.09
Nodes (17): Navigation(), TactileCard, TactileCardContent, TactileCardDescription, TactileCardFooter, TactileCardHeader, TactileCardTitle, HapticType (+9 more)

### Community 1 - "Bento Cards"
Cohesion: 0.10
Nodes (14): BentoExperienceCard(), BentoExperienceCardProps, BentoGitHubCard(), BentoTechStackCard(), skills, CompactExperienceTimeline(), ExperienceTimeline(), ExperienceTimelineProps (+6 more)

### Community 2 - "Sidebar UI"
Cohesion: 0.07
Nodes (25): Sidebar, SidebarContent, SidebarContext, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel (+17 more)

### Community 3 - "Alert Dialog"
Cohesion: 0.09
Nodes (14): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogTitle, ButtonProps, buttonVariants (+6 more)

### Community 4 - "IMAT Quiz & Review"
Cohesion: 0.16
Nodes (10): QuizCard(), QuizCardProps, ReviewButtons(), ReviewButtonsProps, ReviewSession(), ReviewSessionProps, mockRecordReview, questions (+2 more)

### Community 5 - "Command Palette"
Cohesion: 0.12
Nodes (11): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, DialogContent (+3 more)

### Community 6 - "Content Cards"
Cohesion: 0.21
Nodes (10): RelatedProjects(), RelatedProjectsProps, MuseumCardProps, CollapsibleCalloutProps, mockProjects, Card, CardDescription, CardFooter (+2 more)

### Community 7 - "Contact & Hero"
Cohesion: 0.19
Nodes (7): ContactForm(), Hero(), Window, TactileButton, TactileButtonProps, tactileButtonVariants, mockSendContactEmail

### Community 8 - "Form Components"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 9 - "Carousel"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 10 - "Charts"
Cohesion: 0.14
Nodes (10): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartLegendPayloadItem, ChartTooltipContent, ChartTooltipContentProps (+2 more)

### Community 11 - "PDF Report & Bookmarks"
Cohesion: 0.21
Nodes (5): PdfReportSectionProps, BookmarksPanel(), DragDropLabelProps, mockRemoveBookmark, Button

### Community 12 - "Interactive Simulations"
Cohesion: 0.26
Nodes (5): CircuitSimulator(), FunctionGrapher(), FunctionType, ProjectileMotion(), Slider

### Community 13 - "Menu Bar"
Cohesion: 0.17
Nodes (10): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarSubContent (+2 more)

### Community 14 - "Toast Notifications"
Cohesion: 0.24
Nodes (9): Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle, toastVariants (+1 more)

### Community 15 - "Animations & Graduation"
Cohesion: 0.24
Nodes (7): FadeIn(), FadeInProps, ScaleOnHover(), ScaleOnHoverProps, GraduationSection(), GraduationSectionProps, defaultProps

### Community 16 - "Breadcrumbs"
Cohesion: 0.29
Nodes (7): IMATBreadcrumbProps, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 17 - "Badges"
Cohesion: 0.24
Nodes (6): frequencyConfig, IMATPatternBadgeProps, WorkedExampleCardProps, Badge(), BadgeProps, badgeVariants

### Community 18 - "Confidence Calibration"
Cohesion: 0.27
Nodes (6): CalibrationData, ConfidenceCalibration(), ConfidenceCalibrationProps, getDeltaColor(), getDeltaLabel(), ratingButtons

### Community 19 - "Context Menu"
Cohesion: 0.20
Nodes (8): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSubContent, ContextMenuSubTrigger

### Community 20 - "Dropdown Menu"
Cohesion: 0.20
Nodes (8): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger

### Community 21 - "Article Header & Likes"
Cohesion: 0.28
Nodes (5): ArticleHeaderProps, LikeButton(), LikeButtonProps, Particle, particleAngles

### Community 22 - "Museum Mentions"
Cohesion: 0.25
Nodes (5): FILTERS, MentionFilter, MuseumMentions(), MuseumMentionsProps, mentions

### Community 23 - "Periodic Table Interactive"
Cohesion: 0.36
Nodes (5): CATEGORY_COLORS, ElementData, ELEMENTS, PeriodicTable(), PeriodicTableProps

### Community 24 - "Quick Fire & Step Solver"
Cohesion: 0.28
Nodes (4): QuickFireProps, QuickFireQuestion, StepSolverProps, Input

### Community 25 - "Alert & Accordion UI"
Cohesion: 0.22
Nodes (6): SheetContent, SheetContentProps, SheetDescription, SheetOverlay, SheetTitle, sheetVariants

### Community 26 - "Navigation Menu"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 27 - "Dialogs & Drawers"
Cohesion: 0.29
Nodes (5): MuseumCard(), MuseumGrid(), MuseumGridProps, mockSite, sites

### Community 28 - "Content & Collapsible"
Cohesion: 0.32
Nodes (6): extractTweetIdFromUrl(), getIframeSrc(), MuseumModal(), MuseumModalProps, PlayState, mockSite

### Community 30 - "Tabs & Pagination"
Cohesion: 0.29
Nodes (5): ExternalResourceCard(), ExternalResourceCardProps, resourceIcons, resourceLabels, ExternalResourcesListProps

### Community 31 - "Checkbox & Radio Group"
Cohesion: 0.29
Nodes (4): InlineReview(), InlineReviewProps, mockRecordReview, CardContent

### Community 32 - "Select & Popover"
Cohesion: 0.32
Nodes (6): describeArc(), MolecularGeometry(), SHAPE_BUTTONS, ShapeConfig, SHAPES, ShapeType

### Community 33 - "Switch & Toggle"
Cohesion: 0.25
Nodes (4): DrawerContent, DrawerDescription, DrawerOverlay, DrawerTitle

### Community 34 - "Table & Scroll Area"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 35 - "Skeleton & Progress"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 36 - "Avatar & Badge UI"
Cohesion: 0.33
Nodes (3): ProjectCardInteractive(), ProjectCardInteractiveProps, ProjectCardProps

### Community 37 - "Image Occlusion"
Cohesion: 0.33
Nodes (4): Heading, TableOfContents(), TableOfContentsProps, MockIntersectionObserver

### Community 38 - "Drag Drop Label"
Cohesion: 0.43
Nodes (3): buildSubmissionHref(), SubmitSiteButton(), SubmitSiteButtonProps

### Community 39 - "Enzyme Kinetics"
Cohesion: 0.33
Nodes (5): SectionBookmark(), SectionBookmarkProps, mockAddBookmark, mockIsBookmarked, mockRemoveBookmark

### Community 40 - "DNA Strand"
Cohesion: 0.33
Nodes (5): CellMembrane(), Molecule, MOLECULE_COLORS, TRANSPORT_RESULTS, TransportResult

### Community 41 - "Molecular Geometry"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 42 - "pH Scale"
Cohesion: 0.33
Nodes (3): containerVariants, Emotion, emotions

### Community 43 - "Cell Membrane"
Cohesion: 0.40
Nodes (4): BASE_PAIRS, DNAStrand(), DNAStrandProps, SEQUENCE

### Community 45 - "Glycolysis Pathway"
Cohesion: 0.40
Nodes (3): MitosisSteps(), Phase, PHASES

### Community 46 - "Pathway Challenge"
Cohesion: 0.47
Nodes (3): formatScientific(), PHScale(), SUBSTANCES

### Community 48 - "Energy Dashboard"
Cohesion: 0.50
Nodes (3): FABLE5_CREDIT, Footer(), socialLinks

### Community 51 - "Slider & Input OTP"
Cohesion: 0.50
Nodes (3): ConfidenceMeter(), ConfidenceMeterProps, config

### Community 52 - "Theme Provider & Toggle"
Cohesion: 0.40
Nodes (3): DEFAULT_STATE, EnergyDashboardProps, Metabolite

### Community 55 - "Scroll Progress"
Cohesion: 0.40
Nodes (4): explainQuestion, fillQuestion, mcQuestion, tfQuestion

### Community 56 - "Interactive Mascot"
Cohesion: 0.40
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 57 - "Project Cards"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 64 - "Reading Time & Progress"
Cohesion: 0.50
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

### Community 65 - "Note Navigation"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 66 - "Shortcuts Cheatsheet"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

## Knowledge Gaps
- **295 isolated node(s):** `mockSendContactEmail`, `defaultProps`, `mockProjects`, `mockSetTheme`, `AboutNavProps` (+290 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Button` connect `PDF Report & Bookmarks` to `Navigation & Tactile Cards`, `Bento Cards`, `Sidebar UI`, `IMAT Quiz & Review`, `Carousel`, `Interactive Simulations`, `Badges`, `Confidence Calibration`, `Quick Fire & Step Solver`, `Content & Collapsible`, `Tabs & Pagination`, `Checkbox & Radio Group`, `Avatar & Badge UI`, `Image Occlusion`, `Drag Drop Label`, `pH Scale`, `Resizable & Sheet`, `Social Share`, `Footer`, `Experience Timeline`, `Like Button`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `Badge()` connect `Badges` to `Bento Cards`, `Avatar & Badge UI`, `IMAT Quiz & Review`, `Content Cards`, `Animations & Graduation`, `Tooltip & Hover Card`, `Museum Mentions`, `Content & Collapsible`, `Tabs & Pagination`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `useTactileFeedback()` connect `Navigation & Tactile Cards` to `Contact & Hero`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `mockSendContactEmail`, `defaultProps`, `mockProjects` to the rest of the system?**
  _295 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Navigation & Tactile Cards` be split into smaller, more focused modules?**
  _Cohesion score 0.0907258064516129 - nodes in this community are weakly interconnected._
- **Should `Bento Cards` be split into smaller, more focused modules?**
  _Cohesion score 0.10052910052910052 - nodes in this community are weakly interconnected._
- **Should `Sidebar UI` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._