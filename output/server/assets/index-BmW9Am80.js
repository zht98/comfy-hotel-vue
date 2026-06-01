import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, X, Star, MapPin, Check, Coffee, Wifi, Car, Waves, Clock, Dumbbell, Utensils, Wind, ShieldCheck, Sparkles, Cigarette, Users, Calendar as Calendar$1, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { getDefaultClassNames, DayPicker } from "react-day-picker";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsx("div", { "data-slot": "calendar", ref: rootRef, className: cn(className2), ...props2 });
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsx(ChevronLeftIcon, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsx(ChevronRightIcon, { className: cn("size-4", className2), ...props2 });
          }
          return /* @__PURE__ */ jsx(ChevronDownIcon, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsx("td", { ...props2, children: /* @__PURE__ */ jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
  SeparatorPrimitive.Root,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  }
));
Separator.displayName = SeparatorPrimitive.Root.displayName;
const hotelMain = "/assets/hotel-main-SkQ-Mgbh.jpg";
const hotelLobby = "/assets/hotel-lobby-D0GwATGv.jpg";
const hotelPool = "/assets/hotel-pool-De7LSBB9.jpg";
const hotelRestaurant = "/assets/hotel-restaurant-Bz86iRHx.jpg";
const hotelRoom1 = "/assets/hotel-room1-DdkOuWpn.jpg";
const hotelRoom2 = "/assets/hotel-room2-C_U0oIZ_.jpg";
const hotelRoom3 = "/assets/hotel-room3-DRnMDI4M.jpg";
const GALLERY = [{
  src: hotelMain,
  alt: "酒店外观"
}, {
  src: hotelLobby,
  alt: "酒店大堂"
}, {
  src: hotelPool,
  alt: "室内泳池"
}, {
  src: hotelRestaurant,
  alt: "餐厅"
}, {
  src: hotelRoom1,
  alt: "豪华大床房"
}];
const FILTERS = ["免费取消", "含早餐", "大床房", "双床房", "套房", "到店付款", "会员立减"];
const ROOMS = [{
  img: hotelRoom1,
  name: "外滩景豪华大床房",
  size: "42 m²",
  bed: "1张特大床",
  features: ["免费Wi-Fi", "禁烟", "外滩景观", "含双早"],
  cancel: "免费取消（入住前48小时）",
  breakfast: "含双早",
  price: 2188,
  original: 2588
}, {
  img: hotelRoom2,
  name: "经典双床房",
  size: "38 m²",
  bed: "2张单人床",
  features: ["免费Wi-Fi", "禁烟", "城景"],
  cancel: "不可取消",
  breakfast: "不含早",
  price: 1688,
  original: 1988
}, {
  img: hotelRoom3,
  name: "行政套房 · 城景",
  size: "78 m²",
  bed: "1张特大床",
  features: ["行政酒廊", "免费Wi-Fi", "禁烟", "含双早", "下午茶"],
  cancel: "免费取消（入住前24小时）",
  breakfast: "含双早 + 行政酒廊",
  price: 4288,
  original: 5188
}];
const AMENITIES = [{
  icon: Wifi,
  label: "免费Wi-Fi"
}, {
  icon: Car,
  label: "停车场"
}, {
  icon: Waves,
  label: "室内泳池"
}, {
  icon: Clock,
  label: "24小时前台"
}, {
  icon: Dumbbell,
  label: "健身中心"
}, {
  icon: Utensils,
  label: "多间餐厅"
}, {
  icon: Coffee,
  label: "行政酒廊"
}, {
  icon: Wind,
  label: "中央空调"
}, {
  icon: ShieldCheck,
  label: "安全保险箱"
}, {
  icon: Sparkles,
  label: "SPA水疗"
}, {
  icon: Cigarette,
  label: "吸烟区"
}, {
  icon: Users,
  label: "会议设施"
}];
const REVIEWS = [{
  name: "L***先生",
  score: 4.9,
  date: "2026-05-22",
  text: "服务无可挑剔，房间面向外滩，夜景太美了。早餐种类丰富，下次还会再来。"
}, {
  name: "Z***女士",
  score: 5,
  date: "2026-05-18",
  text: "半岛一如既往的优雅。前台升级到了行政套房，下午茶非常精致。"
}, {
  name: "W***先生",
  score: 4.8,
  date: "2026-05-10",
  text: "位置极佳，步行可达南京路。床品舒适，淋浴水压充足。"
}];
const TABS = [{
  id: "rooms",
  label: "房型列表"
}, {
  id: "amenities",
  label: "设施服务"
}, {
  id: "policy",
  label: "入住政策"
}, {
  id: "reviews",
  label: "用户评价"
}];
function HotelDetailPage() {
  const [lightbox, setLightbox] = useState(null);
  const [checkIn, setCheckIn] = useState(new Date(2026, 5, 1));
  const [checkOut, setCheckOut] = useState(new Date(2026, 5, 2));
  const [adults, setAdults] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeTab, setActiveTab] = useState("rooms");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookedRoom, setBookedRoom] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef({});
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const nights = useMemo(() => {
    const ms = checkOut.getTime() - checkIn.getTime();
    return Math.max(1, Math.round(ms / (1e3 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);
  const scrollToTab = (id) => {
    setActiveTab(id);
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
  const toggleFilter = (f) => setActiveFilters((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
  const handleBook = (roomName) => {
    setBookedRoom(roomName);
    setBookingOpen(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx("div", { className: cn("sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur transition-all", scrolled ? "shadow-sm" : ""), children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 sm:gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "hidden text-sm font-semibold text-primary md:inline", children: "eLong · 艺龙" }),
      /* @__PURE__ */ jsxs("div", { className: "ml-auto flex flex-1 flex-wrap items-center gap-2 md:flex-none", children: [
        /* @__PURE__ */ jsx(DateField, { label: "入住", date: checkIn, onChange: (d) => d && setCheckIn(d) }),
        /* @__PURE__ */ jsx(DateField, { label: "离店", date: checkOut, onChange: (d) => d && setCheckOut(d) }),
        /* @__PURE__ */ jsx(GuestField, { adults, rooms, setAdults, setRooms }),
        /* @__PURE__ */ jsx(Button, { className: "h-11 bg-accent-orange px-6 font-semibold text-accent-orange-foreground hover:bg-accent-orange/90", onClick: () => scrollToTab("rooms"), children: "查询房价" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 py-6", children: [
      /* @__PURE__ */ jsxs("header", { className: "mb-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end gap-3", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight sm:text-3xl", children: "上海半岛酒店" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0.5", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-5 w-5 fill-accent-orange text-accent-orange" }, i)) }),
          /* @__PURE__ */ jsx(Badge, { className: "bg-primary/10 text-primary hover:bg-primary/15", children: "豪华五星" }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-accent-orange/40 text-accent-orange", children: "超赞 4.9" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children: "上海市黄浦区中山东一路32号 · 外滩" }),
          /* @__PURE__ */ jsx("button", { className: "ml-1 inline-flex items-center gap-1 rounded-full border border-primary/30 px-2.5 py-0.5 text-xs font-medium text-primary transition hover:bg-primary hover:text-primary-foreground", children: "查看地图" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "grid grid-cols-1 gap-2 md:grid-cols-4 md:grid-rows-2", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setLightbox(0), className: "group relative col-span-1 row-span-2 overflow-hidden rounded-xl md:col-span-2", children: /* @__PURE__ */ jsx("img", { src: GALLERY[0].src, alt: GALLERY[0].alt, className: "h-72 w-full object-cover transition duration-500 group-hover:scale-105 md:h-full" }) }),
        GALLERY.slice(1, 5).map((g, i) => /* @__PURE__ */ jsxs("button", { onClick: () => setLightbox(i + 1), className: "group relative overflow-hidden rounded-xl", children: [
          /* @__PURE__ */ jsx("img", { src: g.src, alt: g.alt, loading: "lazy", className: "h-36 w-full object-cover transition duration-500 group-hover:scale-105 md:h-full" }),
          i === 3 && /* @__PURE__ */ jsxs("span", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100", children: [
            "查看全部 ",
            GALLERY.length,
            " 张"
          ] })
        ] }, i))
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "sticky top-[68px] z-30 mt-8 flex gap-1 overflow-x-auto border-b border-border bg-background py-1", children: TABS.map((t) => /* @__PURE__ */ jsxs("button", { onClick: () => scrollToTab(t.id), className: cn("relative whitespace-nowrap px-4 py-3 text-sm font-medium transition", activeTab === t.id ? "text-primary" : "text-muted-foreground hover:text-foreground"), children: [
        t.label,
        activeTab === t.id && /* @__PURE__ */ jsx("span", { className: "absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary" })
      ] }, t.id)) }),
      /* @__PURE__ */ jsxs("section", { ref: (el) => {
        sectionRefs.current.rooms = el;
      }, className: "scroll-mt-32 pt-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "mb-4 text-xl font-bold", children: [
          "房型选择 · ",
          nights,
          " 晚"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mb-5 flex flex-wrap gap-2", children: FILTERS.map((f) => {
          const active = activeFilters.includes(f);
          return /* @__PURE__ */ jsx("button", { onClick: () => toggleFilter(f), className: cn("rounded-full border px-3.5 py-1.5 text-xs font-medium transition", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/50 hover:text-primary"), children: f }, f);
        }) }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: ROOMS.map((r) => /* @__PURE__ */ jsxs("article", { className: "grid grid-cols-1 gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-md md:grid-cols-[200px_1fr_220px]", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => setLightbox(GALLERY.findIndex((g) => g.src === r.img) || 0), className: "group relative overflow-hidden rounded-lg", children: [
            /* @__PURE__ */ jsx("img", { src: r.img, alt: r.name, loading: "lazy", className: "h-40 w-full object-cover transition group-hover:scale-105 md:h-full" }),
            /* @__PURE__ */ jsx("span", { className: "absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[11px] text-white", children: "查看详情" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: r.name }),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 text-sm text-muted-foreground", children: [
              r.size,
              " · ",
              r.bed
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "mt-3 flex flex-wrap gap-1.5", children: r.features.map((f) => /* @__PURE__ */ jsx("li", { className: "rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground", children: f }, f)) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-3 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 text-primary" }),
                r.cancel
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Coffee, { className: "h-3.5 w-3.5 text-accent-orange" }),
                r.breakfast
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end justify-between gap-2 border-t border-border pt-3 md:border-l md:border-t-0 md:pl-4 md:pt-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground line-through", children: [
                "¥",
                r.original
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-0.5 text-price", children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold", children: "¥" }),
                /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold leading-none", children: r.price })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-[11px] text-muted-foreground", children: "起 / 晚 含税" })
            ] }),
            /* @__PURE__ */ jsx(Button, { onClick: () => handleBook(r.name), className: "w-full bg-accent-orange font-semibold text-accent-orange-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-accent-orange/90 hover:shadow-md", children: "立即预订" })
          ] })
        ] }, r.name)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { ref: (el) => {
        sectionRefs.current.amenities = el;
      }, className: "scroll-mt-32 pt-12", children: [
        /* @__PURE__ */ jsx(Separator, { className: "mb-8" }),
        /* @__PURE__ */ jsx("h2", { className: "mb-5 text-xl font-bold", children: "设施服务" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6", children: AMENITIES.map(({
          icon: Icon,
          label
        }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition hover:border-primary/40 hover:shadow-sm", children: [
          /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: label })
        ] }, label)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { ref: (el) => {
        sectionRefs.current.policy = el;
      }, className: "scroll-mt-32 pt-12", children: [
        /* @__PURE__ */ jsx(Separator, { className: "mb-8" }),
        /* @__PURE__ */ jsx("h2", { className: "mb-5 text-xl font-bold", children: "入住政策" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 rounded-xl border border-border bg-card p-6 md:grid-cols-2", children: [
          /* @__PURE__ */ jsx(PolicyRow, { label: "入住时间", value: "14:00 之后" }),
          /* @__PURE__ */ jsx(PolicyRow, { label: "退房时间", value: "12:00 之前" }),
          /* @__PURE__ */ jsx(PolicyRow, { label: "儿童政策", value: "欢迎12岁以下儿童，使用现有床铺免费入住。" }),
          /* @__PURE__ */ jsx(PolicyRow, { label: "加床政策", value: "所有房型均可加床，加床费 ¥350 / 晚（含早）。" }),
          /* @__PURE__ */ jsx(PolicyRow, { label: "宠物", value: "不允许携带宠物入住（导盲犬除外）。" }),
          /* @__PURE__ */ jsx(PolicyRow, { label: "付款方式", value: "支持信用卡、支付宝、微信、到店付款。" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { ref: (el) => {
        sectionRefs.current.reviews = el;
      }, className: "scroll-mt-32 pt-12 pb-16", children: [
        /* @__PURE__ */ jsx(Separator, { className: "mb-8" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-end gap-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "用户评价" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1 text-accent-orange", children: [
            /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold", children: "4.9" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "/ 5.0 · 2,318 条点评" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-3", children: REVIEWS.map((r) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: r.name }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-accent-orange", children: [
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: r.score })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground", children: r.text }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 text-xs text-muted-foreground", children: r.date })
        ] }, r.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-border bg-muted/30", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 py-10", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 sm:grid-cols-2 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm font-semibold text-foreground", children: "关于艺龙" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "transition hover:text-primary", children: "关于我们" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "transition hover:text-primary", children: "加入我们" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "transition hover:text-primary", children: "联系方式" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "transition hover:text-primary", children: "隐私政策" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm font-semibold text-foreground", children: "帮助中心" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "transition hover:text-primary", children: "预订流程" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "transition hover:text-primary", children: "退改政策" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "transition hover:text-primary", children: "发票说明" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "transition hover:text-primary", children: "常见问题" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm font-semibold text-foreground", children: "合作伙伴" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "transition hover:text-primary", children: "酒店加盟" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "transition hover:text-primary", children: "广告服务" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "transition hover:text-primary", children: "企业差旅" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm font-semibold text-foreground", children: "客户服务" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "7×24 小时客服热线" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-lg font-bold text-primary", children: "400-810-5666" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "© 2026 eLong Inc. 保留所有权利。" })
      ] })
    ] }) }) }),
    lightbox !== null && /* @__PURE__ */ jsx(Lightbox, { index: lightbox, onClose: () => setLightbox(null), onIndex: setLightbox }),
    /* @__PURE__ */ jsx(Dialog, { open: bookingOpen, onOpenChange: setBookingOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(Check, { className: "h-7 w-7 text-primary" }) }),
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-center text-xl", children: "预订成功" }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-center", children: "您的房间已为您锁定，订单详情已发送至您的账号。" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-lg bg-secondary p-4 text-sm", children: [
        /* @__PURE__ */ jsx(Row, { k: "酒店", v: "上海半岛酒店" }),
        /* @__PURE__ */ jsx(Row, { k: "房型", v: bookedRoom }),
        /* @__PURE__ */ jsx(Row, { k: "入住", v: format(checkIn, "yyyy-MM-dd") }),
        /* @__PURE__ */ jsx(Row, { k: "离店", v: format(checkOut, "yyyy-MM-dd") }),
        /* @__PURE__ */ jsx(Row, { k: "夜数", v: `${nights} 晚` }),
        /* @__PURE__ */ jsx(Row, { k: "住客", v: `${adults} 位成人 · ${rooms} 间` })
      ] }),
      /* @__PURE__ */ jsx(Button, { className: "w-full bg-accent-orange font-semibold text-accent-orange-foreground hover:bg-accent-orange/90", onClick: () => setBookingOpen(false), children: "完成" })
    ] }) })
  ] });
}
function Row({
  k,
  v
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-4", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: k }),
    /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: v })
  ] });
}
function PolicyRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-foreground", children: value })
  ] });
}
function DateField({
  label,
  date,
  onChange
}) {
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("button", { className: "flex h-11 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm transition hover:border-primary", children: [
      /* @__PURE__ */ jsx(Calendar$1, { className: "h-4 w-4 text-primary" }),
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: label }),
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: format(date, "MM-dd") })
    ] }) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(Calendar, { mode: "single", selected: date, onSelect: onChange, initialFocus: true, className: cn("p-3 pointer-events-auto") }) })
  ] });
}
function GuestField({
  adults,
  rooms,
  setAdults,
  setRooms
}) {
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("button", { className: "flex h-11 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm transition hover:border-primary", children: [
      /* @__PURE__ */ jsx(Users, { className: "h-4 w-4 text-primary" }),
      /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
        adults,
        " 位成人 · ",
        rooms,
        " 间"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(PopoverContent, { className: "w-64 p-4", children: [
      /* @__PURE__ */ jsx(Stepper, { label: "成人", value: adults, setValue: setAdults, min: 1, max: 8 }),
      /* @__PURE__ */ jsx(Separator, { className: "my-3" }),
      /* @__PURE__ */ jsx(Stepper, { label: "房间数", value: rooms, setValue: setRooms, min: 1, max: 5 })
    ] })
  ] });
}
function Stepper({
  label,
  value,
  setValue,
  min,
  max
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setValue(Math.max(min, value - 1)), disabled: value <= min, className: "flex h-8 w-8 items-center justify-center rounded-full border border-input text-foreground transition hover:border-primary hover:text-primary disabled:opacity-40", children: /* @__PURE__ */ jsx(Minus, { className: "h-3.5 w-3.5" }) }),
      /* @__PURE__ */ jsx("span", { className: "w-5 text-center font-semibold", children: value }),
      /* @__PURE__ */ jsx("button", { onClick: () => setValue(Math.min(max, value + 1)), disabled: value >= max, className: "flex h-8 w-8 items-center justify-center rounded-full border border-input text-foreground transition hover:border-primary hover:text-primary disabled:opacity-40", children: /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }) })
    ] })
  ] });
}
function Lightbox({
  index,
  onClose,
  onIndex
}) {
  const prev = () => onIndex((index - 1 + GALLERY.length) % GALLERY.length);
  const next = () => onIndex((index + 1) % GALLERY.length);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4", children: [
    /* @__PURE__ */ jsx("button", { onClick: onClose, className: "absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsx("button", { onClick: prev, className: "absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsx("img", { src: GALLERY[index].src, alt: GALLERY[index].alt, className: "max-h-[85vh] max-w-[90vw] rounded-lg object-contain" }),
    /* @__PURE__ */ jsx("button", { onClick: next, className: "absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20", children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white", children: [
      index + 1,
      " / ",
      GALLERY.length
    ] })
  ] });
}
export {
  HotelDetailPage as component
};
