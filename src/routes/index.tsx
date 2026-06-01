import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapPin, Star, Wifi, Car, Waves, Dumbbell, Clock, Coffee, Wind,
  Cigarette, Plus, Minus, Calendar as CalendarIcon, Users, X,
  ChevronLeft, ChevronRight, Check, Utensils, ShieldCheck, Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import hotelMain from "@/assets/hotel-main.jpg";
import hotelLobby from "@/assets/hotel-lobby.jpg";
import hotelPool from "@/assets/hotel-pool.jpg";
import hotelRestaurant from "@/assets/hotel-restaurant.jpg";
import hotelRoom1 from "@/assets/hotel-room1.jpg";
import hotelRoom2 from "@/assets/hotel-room2.jpg";
import hotelRoom3 from "@/assets/hotel-room3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "上海半岛酒店 · 豪华住宿预订" },
      { name: "description", content: "上海半岛酒店 - 外滩奢华五星级酒店，臻享典雅住宿与精致服务，立即预订享专属优惠。" },
    ],
  }),
  component: HotelDetailPage,
});

const GALLERY = [
  { src: hotelMain, alt: "酒店外观" },
  { src: hotelLobby, alt: "酒店大堂" },
  { src: hotelPool, alt: "室内泳池" },
  { src: hotelRestaurant, alt: "餐厅" },
  { src: hotelRoom1, alt: "豪华大床房" },
];

const FILTERS = ["免费取消", "含早餐", "大床房", "双床房", "套房", "到店付款", "会员立减"];

const ROOMS = [
  {
    img: hotelRoom1,
    name: "外滩景豪华大床房",
    size: "42 m²",
    bed: "1张特大床",
    features: ["免费Wi-Fi", "禁烟", "外滩景观", "含双早"],
    cancel: "免费取消（入住前48小时）",
    breakfast: "含双早",
    price: 2188,
    original: 2588,
  },
  {
    img: hotelRoom2,
    name: "经典双床房",
    size: "38 m²",
    bed: "2张单人床",
    features: ["免费Wi-Fi", "禁烟", "城景"],
    cancel: "不可取消",
    breakfast: "不含早",
    price: 1688,
    original: 1988,
  },
  {
    img: hotelRoom3,
    name: "行政套房 · 城景",
    size: "78 m²",
    bed: "1张特大床",
    features: ["行政酒廊", "免费Wi-Fi", "禁烟", "含双早", "下午茶"],
    cancel: "免费取消（入住前24小时）",
    breakfast: "含双早 + 行政酒廊",
    price: 4288,
    original: 5188,
  },
];

const AMENITIES = [
  { icon: Wifi, label: "免费Wi-Fi" },
  { icon: Car, label: "停车场" },
  { icon: Waves, label: "室内泳池" },
  { icon: Clock, label: "24小时前台" },
  { icon: Dumbbell, label: "健身中心" },
  { icon: Utensils, label: "多间餐厅" },
  { icon: Coffee, label: "行政酒廊" },
  { icon: Wind, label: "中央空调" },
  { icon: ShieldCheck, label: "安全保险箱" },
  { icon: Sparkles, label: "SPA水疗" },
  { icon: Cigarette, label: "吸烟区" },
  { icon: Users, label: "会议设施" },
];

const REVIEWS = [
  { name: "L***先生", score: 4.9, date: "2026-05-22", text: "服务无可挑剔，房间面向外滩，夜景太美了。早餐种类丰富，下次还会再来。" },
  { name: "Z***女士", score: 5.0, date: "2026-05-18", text: "半岛一如既往的优雅。前台升级到了行政套房，下午茶非常精致。" },
  { name: "W***先生", score: 4.8, date: "2026-05-10", text: "位置极佳，步行可达南京路。床品舒适，淋浴水压充足。" },
];

const TABS = [
  { id: "rooms", label: "房型列表" },
  { id: "amenities", label: "设施服务" },
  { id: "policy", label: "入住政策" },
  { id: "reviews", label: "用户评价" },
];

function HotelDetailPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [checkIn, setCheckIn] = useState<Date>(new Date(2026, 5, 1));
  const [checkOut, setCheckOut] = useState<Date>(new Date(2026, 5, 2));
  const [adults, setAdults] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("rooms");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookedRoom, setBookedRoom] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nights = useMemo(() => {
    const ms = checkOut.getTime() - checkIn.getTime();
    return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);

  const scrollToTab = (id: string) => {
    setActiveTab(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleFilter = (f: string) =>
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const handleBook = (roomName: string) => {
    setBookedRoom(roomName);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky search bar */}
      <div
        className={cn(
          "sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur transition-all",
          scrolled ? "shadow-sm" : "",
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 sm:gap-3">
          <span className="hidden text-sm font-semibold text-primary md:inline">eLong · 艺龙</span>
          <div className="ml-auto flex flex-1 flex-wrap items-center gap-2 md:flex-none">
            <DateField label="入住" date={checkIn} onChange={(d) => d && setCheckIn(d)} />
            <DateField label="离店" date={checkOut} onChange={(d) => d && setCheckOut(d)} />
            <GuestField adults={adults} rooms={rooms} setAdults={setAdults} setRooms={setRooms} />
            <Button
              className="h-11 bg-accent-orange px-6 font-semibold text-accent-orange-foreground hover:bg-accent-orange/90"
              onClick={() => scrollToTab("rooms")}
            >
              查询房价
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <header className="mb-5">
          <div className="flex flex-wrap items-end gap-3">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">上海半岛酒店</h1>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent-orange text-accent-orange" />
              ))}
            </div>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/15">豪华五星</Badge>
            <Badge variant="outline" className="border-accent-orange/40 text-accent-orange">
              超赞 4.9
            </Badge>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>上海市黄浦区中山东一路32号 · 外滩</span>
            <button className="ml-1 inline-flex items-center gap-1 rounded-full border border-primary/30 px-2.5 py-0.5 text-xs font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">
              查看地图
            </button>
          </div>
        </header>

        {/* Gallery */}
        <section className="grid grid-cols-1 gap-2 md:grid-cols-4 md:grid-rows-2">
          <button
            onClick={() => setLightbox(0)}
            className="group relative col-span-1 row-span-2 overflow-hidden rounded-xl md:col-span-2"
          >
            <img
              src={GALLERY[0].src}
              alt={GALLERY[0].alt}
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-105 md:h-full"
            />
          </button>
          {GALLERY.slice(1, 5).map((g, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i + 1)}
              className="group relative overflow-hidden rounded-xl"
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-36 w-full object-cover transition duration-500 group-hover:scale-105 md:h-full"
              />
              {i === 3 && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
                  查看全部 {GALLERY.length} 张
                </span>
              )}
            </button>
          ))}
        </section>

        {/* Tabs */}
        <nav className="sticky top-[68px] z-30 mt-8 flex gap-1 overflow-x-auto border-b border-border bg-background py-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => scrollToTab(t.id)}
              className={cn(
                "relative whitespace-nowrap px-4 py-3 text-sm font-medium transition",
                activeTab === t.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
              {activeTab === t.id && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        {/* Rooms */}
        <section
          ref={(el) => { sectionRefs.current.rooms = el; }}
          className="scroll-mt-32 pt-8"
        >
          <h2 className="mb-4 text-xl font-bold">房型选择 · {nights} 晚</h2>
          <div className="mb-5 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = activeFilters.includes(f);
              return (
                <button
                  key={f}
                  onClick={() => toggleFilter(f)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/50 hover:text-primary",
                  )}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {ROOMS.map((r) => (
              <article
                key={r.name}
                className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-md md:grid-cols-[200px_1fr_220px]"
              >
                <button onClick={() => setLightbox(GALLERY.findIndex((g) => g.src === r.img) || 0)} className="group relative overflow-hidden rounded-lg">
                  <img src={r.img} alt={r.name} loading="lazy" className="h-40 w-full object-cover transition group-hover:scale-105 md:h-full" />
                  <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[11px] text-white">查看详情</span>
                </button>

                <div className="flex flex-col">
                  <h3 className="text-base font-semibold">{r.name}</h3>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {r.size} · {r.bed}
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {r.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-primary" />
                      {r.cancel}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Coffee className="h-3.5 w-3.5 text-accent-orange" />
                      {r.breakfast}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between gap-2 border-t border-border pt-3 md:border-l md:border-t-0 md:pl-4 md:pt-0">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground line-through">¥{r.original}</div>
                    <div className="flex items-baseline gap-0.5 text-price">
                      <span className="text-lg font-semibold">¥</span>
                      <span className="text-3xl font-bold leading-none">{r.price}</span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">起 / 晚 含税</div>
                  </div>
                  <Button
                    onClick={() => handleBook(r.name)}
                    className="w-full bg-accent-orange font-semibold text-accent-orange-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-accent-orange/90 hover:shadow-md"
                  >
                    立即预订
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Amenities */}
        <section
          ref={(el) => { sectionRefs.current.amenities = el; }}
          className="scroll-mt-32 pt-12"
        >
          <Separator className="mb-8" />
          <h2 className="mb-5 text-xl font-bold">设施服务</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {AMENITIES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition hover:border-primary/40 hover:shadow-sm"
              >
                <Icon className="h-6 w-6 text-primary" />
                <span className="text-sm text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Policy */}
        <section
          ref={(el) => { sectionRefs.current.policy = el; }}
          className="scroll-mt-32 pt-12"
        >
          <Separator className="mb-8" />
          <h2 className="mb-5 text-xl font-bold">入住政策</h2>
          <div className="grid gap-6 rounded-xl border border-border bg-card p-6 md:grid-cols-2">
            <PolicyRow label="入住时间" value="14:00 之后" />
            <PolicyRow label="退房时间" value="12:00 之前" />
            <PolicyRow label="儿童政策" value="欢迎12岁以下儿童，使用现有床铺免费入住。" />
            <PolicyRow label="加床政策" value="所有房型均可加床，加床费 ¥350 / 晚（含早）。" />
            <PolicyRow label="宠物" value="不允许携带宠物入住（导盲犬除外）。" />
            <PolicyRow label="付款方式" value="支持信用卡、支付宝、微信、到店付款。" />
          </div>
        </section>

        {/* Reviews */}
        <section
          ref={(el) => { sectionRefs.current.reviews = el; }}
          className="scroll-mt-32 pt-12 pb-16"
        >
          <Separator className="mb-8" />
          <div className="mb-5 flex items-end gap-4">
            <h2 className="text-xl font-bold">用户评价</h2>
            <div className="flex items-baseline gap-1 text-accent-orange">
              <span className="text-3xl font-bold">4.9</span>
              <span className="text-sm text-muted-foreground">/ 5.0 · 2,318 条点评</span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{r.name}</span>
                  <span className="flex items-center gap-1 text-accent-orange">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold">{r.score}</span>
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                <div className="mt-3 text-xs text-muted-foreground">{r.date}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
      )}

      {/* Booking modal */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-7 w-7 text-primary" />
            </div>
            <DialogTitle className="text-center text-xl">预订成功</DialogTitle>
            <DialogDescription className="text-center">
              您的房间已为您锁定，订单详情已发送至您的账号。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 rounded-lg bg-secondary p-4 text-sm">
            <Row k="酒店" v="上海半岛酒店" />
            <Row k="房型" v={bookedRoom} />
            <Row k="入住" v={format(checkIn, "yyyy-MM-dd")} />
            <Row k="离店" v={format(checkOut, "yyyy-MM-dd")} />
            <Row k="夜数" v={`${nights} 晚`} />
            <Row k="住客" v={`${adults} 位成人 · ${rooms} 间`} />
          </div>
          <Button
            className="w-full bg-accent-orange font-semibold text-accent-orange-foreground hover:bg-accent-orange/90"
            onClick={() => setBookingOpen(false)}
          >
            完成
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium text-foreground">{v}</span>
    </div>
  );
}

function PolicyRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm text-foreground">{value}</div>
    </div>
  );
}

function DateField({
  label,
  date,
  onChange,
}: {
  label: string;
  date: Date;
  onChange: (d: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex h-11 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm transition hover:border-primary">
          <CalendarIcon className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium">{format(date, "MM-dd")}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={onChange} initialFocus className={cn("p-3 pointer-events-auto")} />
      </PopoverContent>
    </Popover>
  );
}

function GuestField({
  adults, rooms, setAdults, setRooms,
}: {
  adults: number; rooms: number;
  setAdults: (n: number) => void; setRooms: (n: number) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex h-11 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm transition hover:border-primary">
          <Users className="h-4 w-4 text-primary" />
          <span className="font-medium">{adults} 位成人 · {rooms} 间</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <Stepper label="成人" value={adults} setValue={setAdults} min={1} max={8} />
        <Separator className="my-3" />
        <Stepper label="房间数" value={rooms} setValue={setRooms} min={1} max={5} />
      </PopoverContent>
    </Popover>
  );
}

function Stepper({
  label, value, setValue, min, max,
}: { label: string; value: number; setValue: (n: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setValue(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-input text-foreground transition hover:border-primary hover:text-primary disabled:opacity-40"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-5 text-center font-semibold">{value}</span>
        <button
          onClick={() => setValue(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-input text-foreground transition hover:border-primary hover:text-primary disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function Lightbox({
  index, onClose, onIndex,
}: { index: number; onClose: () => void; onIndex: (n: number) => void }) {
  const prev = () => onIndex((index - 1 + GALLERY.length) % GALLERY.length);
  const next = () => onIndex((index + 1) % GALLERY.length);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
        <X className="h-5 w-5" />
      </button>
      <button onClick={prev} className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <img src={GALLERY[index].src} alt={GALLERY[index].alt} className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain" />
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
        {index + 1} / {GALLERY.length}
      </div>
    </div>
  );
}
