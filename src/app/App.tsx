import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Phone, Mail, MapPin, Clock, Star, ChevronDown,
  Instagram, Facebook, Twitter, Search, Users, MessageSquare,
  Calendar, LayoutDashboard, Settings, LogOut, Eye, EyeOff,
  ArrowRight, Edit2, Trash2, CheckCircle, Waves, Wine,
  Award, Shield, Send, BarChart3, TrendingUp, Bell, ChefHat,
  UtensilsCrossed, Fish, Coffee, Filter, Check, Plus,
  Sparkles, Globe
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Page = "home" | "about" | "menu" | "pool" | "reservations" | "contact" | "admin";
type AdminPage = "dashboard" | "menu-mgmt" | "reservations-mgmt" | "messages" | "admins" | "settings";
type MenuCategory = "all" | "entrees" | "plats" | "grillades" | "fruits-de-mer" | "desserts" | "cocktails" | "boissons" | "vins";

// ─── Data ─────────────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { id: 1, name: "Carpaccio de Thon", category: "entrees", price: "3 500 FCFA", desc: "Thon frais mariné aux agrumes, câpres et vinaigrette balsamique", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=280&fit=crop&auto=format", popular: true, active: true },
  { id: 2, name: "Velouté de Crustacés", category: "entrees", price: "2 800 FCFA", desc: "Velouté onctueux aux crevettes, crème fraîche et huile de truffe", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=280&fit=crop&auto=format", popular: false, active: true },
  { id: 3, name: "Foie Gras Poêlé", category: "entrees", price: "4 200 FCFA", desc: "Foie gras mi-cuit, chutney de mangue et brioche grillée", image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=280&fit=crop&auto=format", popular: true, active: true },
  { id: 4, name: "Entrecôte Grillée", category: "plats", price: "9 500 FCFA", desc: "Entrecôte de bœuf 350g, sauce au poivre, frites maison et légumes", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=280&fit=crop&auto=format", popular: true, active: true },
  { id: 5, name: "Filet de Bar Rôti", category: "plats", price: "8 200 FCFA", desc: "Bar de ligne rôti, risotto aux champignons et émulsion de ciboulette", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=280&fit=crop&auto=format", popular: false, active: true },
  { id: 6, name: "Poulet Yassa Premium", category: "plats", price: "6 500 FCFA", desc: "Poulet fermier mariné à l\'oignon caramélisé, citron et moutarde", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?w=400&h=280&fit=crop&auto=format", popular: true, active: true },
  { id: 7, name: "Côte de Bœuf", category: "grillades", price: "14 000 FCFA", desc: "Côte de bœuf maturée 800g, beurre maître d\'hôtel et gratin dauphinois (pour 2)", image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=280&fit=crop&auto=format", popular: true, active: true },
  { id: 8, name: "Brochettes Mixtes", category: "grillades", price: "7 800 FCFA", desc: "Brochettes de bœuf, poulet et crevettes, sauce pimentée et riz basmati", image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=280&fit=crop&auto=format", popular: false, active: true },
  { id: 9, name: "Homard Thermidor", category: "fruits-de-mer", price: "16 500 FCFA", desc: "Homard breton gratifié, sauce crème au cognac et riz pilaf", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=280&fit=crop&auto=format", popular: true, active: true },
  { id: 10, name: "Plateau Royal", category: "fruits-de-mer", price: "22 000 FCFA", desc: "Sélection de langoustines, crevettes royales, huîtres et palourdes (pour 2)", image: "https://images.unsplash.com/photo-1565680018093-ebb6b9ab5460?w=400&h=280&fit=crop&auto=format", popular: true, active: true },
  { id: 11, name: "Fondant au Chocolat", category: "desserts", price: "2 500 FCFA", desc: "Cœur coulant au chocolat Valrhona, glace vanille bourbon et tuile croustillante", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=280&fit=crop&auto=format", popular: true, active: true },
  { id: 12, name: "Crème Brûlée à la Vanille", category: "desserts", price: "2 200 FCFA", desc: "Crème brûlée à la vanille de Madagascar, caramel croustillant", image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=280&fit=crop&auto=format", popular: false, active: true },
  { id: 13, name: "MH Signature Mojito", category: "cocktails", price: "3 500 FCFA", desc: "Rhum blanc, citron vert, menthe fraîche, sirop de canne et eau pétillante", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=280&fit=crop&auto=format", popular: true, active: true },
  { id: 14, name: "Piscine Spritz", category: "cocktails", price: "3 800 FCFA", desc: "Aperol, prosecco, citrus frais, glaçons et zeste d\'orange", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=280&fit=crop&auto=format", popular: true, active: true },
  { id: 15, name: "Jus de Bissap Frais", category: "boissons", price: "1 500 FCFA", desc: "Infusion d\'hibiscus maison, sucre de canne et gingembre", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=280&fit=crop&auto=format", popular: false, active: true },
  { id: 16, name: "Château Margaux 2018", category: "vins", price: "45 000 FCFA", desc: "Grand vin de Bordeaux, Margaux AOC. Notes de cassis, cèdre et épices douces", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=280&fit=crop&auto=format", popular: false, active: true },
];

const TESTIMONIALS = [
  { name: "Aminata Koné", role: "Cheffe d'entreprise", rating: 5, text: "Une expérience gastronomique absolument extraordinaire. L\'ambiance au bord de la piscine le soir est magique, et le service est d\'un professionnalisme rare." },
  { name: "Marc Lefebvre", role: "Consultant International", rating: 5, text: "Le meilleur restaurant que j\'aie visité à Abidjan. Le homard thermidor était parfait, et la carte des vins impressionnante. Je recommande vivement." },
  { name: "Fatou Diallo", role: "Architecte", rating: 5, text: "MH Restaurant a redéfini l\'art de vivre à table. Du cadre exceptionnel à la qualité des mets, chaque détail est soigné avec une attention remarquable." },
];

const GALLERY = [
  { id: 1, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&auto=format", alt: "Salle principale du restaurant" },
  { id: 2, src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop&auto=format", alt: "Piscine du MH Restaurant" },
  { id: 3, src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&auto=format", alt: "Bar à cocktails" },
  { id: 4, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format", alt: "Table dressée en terrasse" },
  { id: 5, src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop&auto=format", alt: "Cuisine ouverte sur la salle" },
  { id: 6, src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop&auto=format", alt: "Plat signature de la maison" },
];

const TEAM = [
  { name: "Moïse Habib", role: "Chef Exécutif", desc: "Formé à Paris et à Lyon, Moïse apporte 15 ans d\'expérience gastronomique au service de saveurs afro-françaises uniques.", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=500&fit=crop&auto=format" },
  { name: "Hortense Mensah", role: "Directrice", desc: "Avec une passion pour l\'hospitalité de luxe, Hortense orchestre chaque aspect de l\'expérience client avec une attention méticuleuse.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&auto=format" },
  { name: "Olivier Traoré", role: "Sommelier", desc: "Expert en vins et spiritueux, Olivier guide nos clients à travers une sélection de 200 références du monde entier.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&auto=format" },
];

const MOCK_RESERVATIONS = [
  { id: 1, name: "Aminata Koné", phone: "+225 07 12 34 56", date: "28 Juin 2026", time: "20:00", guests: 4, type: "Restaurant + Piscine", status: "confirmed" },
  { id: 2, name: "Marc Lefebvre", phone: "+225 05 98 76 54", date: "29 Juin 2026", time: "19:30", guests: 2, type: "Restaurant", status: "pending" },
  { id: 3, name: "Fatou Diallo", phone: "+225 01 23 45 67", date: "30 Juin 2026", time: "12:30", guests: 6, type: "Piscine", status: "confirmed" },
  { id: 4, name: "Jean-Pierre Aka", phone: "+225 07 65 43 21", date: "1 Juil 2026", time: "20:30", guests: 3, type: "Restaurant", status: "cancelled" },
];

const MOCK_MESSAGES = [
  { id: 1, name: "Sophie Martin", email: "sophie@email.com", subject: "Événement privé", message: "Bonjour, je souhaiterais organiser un dîner privé pour 20 personnes. Pouvez-vous me contacter?", date: "27 Juin 2026", read: false },
  { id: 2, name: "Kwame Asante", email: "kwame@business.ci", subject: "Partenariat corporate", message: "Notre entreprise est intéressée par un contrat de restauration pour nos événements d\'entreprise.", date: "26 Juin 2026", read: true },
  { id: 3, name: "Isabelle Dupont", email: "isabelle.d@gmail.com", subject: "Avis positif", message: "Nous avons passé une soirée merveilleuse hier. Votre équipe est exceptionnelle, nous reviendrons!", date: "25 Juin 2026", read: true },
];

// ─── Components ───────────────────────────────────────────────────────────────

// Turquoise accent pill
function AccentPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-[#25C4D8] font-semibold mb-3">
      <span className="w-8 h-px bg-[#25C4D8] inline-block" />
      {children}
    </span>
  );
}

// Glass card
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

// Section wrapper
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-24 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ currentPage, setCurrentPage }: { currentPage: Page; setCurrentPage: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks: { label: string; page: Page }[] = [
    { label: "Accueil", page: "home" },
    { label: "À propos", page: "about" },
    { label: "Menu", page: "menu" },
    { label: "Piscine", page: "pool" },
    { label: "Réservations", page: "reservations" },
    { label: "Contact", page: "contact" },
  ];

  const nav = (p: Page) => {
    setCurrentPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || currentPage !== "home" ? "bg-[#111111]/95 backdrop-blur-md border-b border-white/8 shadow-xl" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => nav("home")} className="flex flex-col leading-none cursor-pointer group">
          <span className="text-2xl font-bold tracking-tight group-hover:text-[#25C4D8] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
            MH
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#25C4D8] font-medium">
            Restaurant & Bar
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => nav(page)}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-[#25C4D8] ${currentPage === page ? "text-[#25C4D8]" : "text-white/80"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => nav("reservations")}
            className="px-5 py-2.5 bg-[#25C4D8] text-[#111111] text-sm font-semibold rounded-full hover:bg-[#1fb0c3] transition-all duration-200 shadow-lg shadow-[#25C4D8]/20"
          >
            Réserver maintenant
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#111111]/98 border-t border-white/8 px-6 py-6 space-y-1">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => nav(page)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentPage === page ? "text-[#25C4D8] bg-[#25C4D8]/10" : "text-white/80 hover:text-white hover:bg-white/5"}`}
            >
              {label}
            </button>
          ))}
          <div className="pt-3">
            <button
              onClick={() => nav("reservations")}
              className="w-full px-5 py-3 bg-[#25C4D8] text-[#111111] text-sm font-semibold rounded-full hover:bg-[#1fb0c3] transition-colors"
            >
              Réserver maintenant
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const nav = (p: Page) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/8 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>MH</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#25C4D8] font-medium">Restaurant & Bar avec Piscine</div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Une expérience gastronomique d&apos;exception dans un cadre unique, alliant gastronomie raffinée et détente au bord de l&apos;eau.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#25C4D8] hover:border-[#25C4D8]/40 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/90 mb-5">Liens rapides</h4>
            <ul className="space-y-2.5">
              {(["home", "about", "menu", "pool", "reservations", "contact"] as Page[]).map((p, i) => (
                <li key={p}>
                  <button onClick={() => nav(p)} className="text-sm text-white/50 hover:text-[#25C4D8] transition-colors">
                    {["Accueil", "À propos", "Le Menu", "Piscine", "Réservations", "Contact"][i]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/90 mb-5">Coordonnées</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex gap-3 items-start">
                <MapPin size={14} className="text-[#25C4D8] mt-0.5 shrink-0" />
                Situé derrière la station X-oil, Pointe-Noire,Congo
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={14} className="text-[#25C4D8] shrink-0" />
                +242 06 888 28 86| 06 837 13 24
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={14} className="text-[#25C4D8] shrink-0" />
                contact@mh-restaurant.ci
              </li>
              <li className="flex gap-3 items-start">
                <Clock size={14} className="text-[#25C4D8] mt-0.5 shrink-0" />
                Lun–Sam : 10h–23h<br />Dim : 12h–22h
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/90 mb-5">Newsletter</h4>
            <p className="text-sm text-white/50 mb-4">Recevez nos actualités et offres exclusives.</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-[#25C4D8] text-sm font-medium">
                <CheckCircle size={16} /> Merci pour votre inscription!
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#25C4D8]/50"
                />
                <button type="submit" className="w-full py-2.5 bg-[#25C4D8] text-[#111111] text-sm font-semibold rounded-xl hover:bg-[#1fb0c3] transition-colors">
                  S&apos;abonner
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <p>© 2026 MH Restaurant & Bar avec Piscine. Tous droits réservés.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/60 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white/60 transition-colors">Politique de confidentialité</a>
            <button onClick={() => nav("admin")} className="hover:text-white/60 transition-colors">Admin</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) {
  const nav = (p: Page) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero */}
      <div className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&auto=format"
            alt="MH Restaurant vue principale"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/60 via-transparent to-[#111111]" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#25C4D8] font-semibold mb-6">
            <span className="w-8 h-px bg-[#25C4D8]" />
            Pointe-Noire, Congo
            <span className="w-8 h-px bg-[#25C4D8]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Une expérience<br />
            <em className="italic text-[#25C4D8]">gastronomique</em><br />
            d&apos;exception
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10">
            Dans un cadre unique alliant gastronomie raffinée et détente au bord de la piscine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => nav("menu")}
              className="px-8 py-4 bg-[#25C4D8] text-[#111111] font-semibold rounded-full hover:bg-[#1fb0c3] transition-all duration-200 shadow-xl shadow-[#25C4D8]/25 flex items-center justify-center gap-2"
            >
              Découvrir le Menu <ArrowRight size={16} />
            </button>
            <button
              onClick={() => nav("reservations")}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-200"
            >
              Réserver une table
            </button>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <ChevronDown size={20} className="animate-bounce" />
        </div>
      </div>

      {/* Specialties */}
      <Section>
        <div className="text-center mb-14">
          <AccentPill>Nos spécialités</AccentPill>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            L&apos;art de la table<br />
            <em className="italic">revisité</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: ChefHat, title: "Gastronomie Française", desc: "Techniques classiques revisitées avec les saveurs et produits d\'Afrique de l\'Ouest.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop&auto=format" },
            { icon: Fish, title: "Fruits de Mer Frais", desc: "Sélection quotidienne de produits de la mer, préparés avec soin par notre chef.", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop&auto=format" },
            { icon: Wine, title: "Cave Exceptionnelle", desc: "Plus de 200 références soigneusement sélectionnées par notre sommelier.", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop&auto=format" },
          ].map(({ icon: Icon, title, desc, img }) => (
            <GlassCard key={title} className="overflow-hidden group cursor-pointer hover:border-white/20 transition-all duration-300">
              <div className="relative h-52 overflow-hidden">
                <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent" />
              </div>
              <div className="p-6">
                <div className="w-10 h-10 rounded-xl bg-[#25C4D8]/10 border border-[#25C4D8]/20 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-[#25C4D8]" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section className="bg-[#0d0d0d]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <AccentPill>Nos services</AccentPill>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Une offre<br />
              <em className="italic text-[#25C4D8]">complète</em>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Que vous veniez pour un déjeuner d&apos;affaires, un dîner romantique ou une journée piscine, nous vous offrons une expérience sur mesure dans un cadre d&apos;exception.
            </p>
            <div className="space-y-4">
              {[
                { title: "Dîner gastronomique", desc: "Service à la carte ou menus dégustation" },
                { title: "Espace piscine & bar", desc: "Détente et restauration légère au bord de l\'eau" },
                { title: "Événements privés", desc: "Séminaires, anniversaires, mariages" },
                { title: "Service traiteur", desc: "Livraison et prestations à domicile" },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#25C4D8] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} className="text-[#111111]" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white">{title}</span>
                    <span className="text-white/50 text-sm"> — {desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&h=550&fit=crop&auto=format"
                alt="Service MH Restaurant"
                className="w-full h-[480px] object-cover"
              />
            </div>
            <GlassCard className="absolute -bottom-6 -left-6 p-5 max-w-[200px]">
              <div className="text-3xl font-bold text-[#25C4D8]" style={{ fontFamily: "'Playfair Display', serif" }}>8+</div>
              <div className="text-xs text-white/60 mt-1 leading-tight">Années d&apos;excellence culinaire</div>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Why us */}
      <Section>
        <div className="text-center mb-14">
          <AccentPill>Pourquoi nous choisir</AccentPill>
          <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            L&apos;excellence à chaque instant
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Award, title: "Qualité Premium", desc: "Ingrédients soigneusement sourcés auprès des meilleurs producteurs locaux et internationaux." },
            { icon: ChefHat, title: "Chef Étoilé", desc: "Notre chef Moïse Habib, formé dans les plus grandes maisons parisiennes, signe chaque plat." },
            { icon: Waves, title: "Cadre Unique", desc: "Une piscine à débordement offrant une vue panoramique sur la lagune d\'Abidjan." },
            { icon: Shield, title: "Service Irréprochable", desc: "Une équipe dédiée à votre satisfaction, formée aux standards de l\'hôtellerie de luxe." },
          ].map(({ icon: Icon, title, desc }) => (
            <GlassCard key={title} className="p-7 text-center group hover:border-[#25C4D8]/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#25C4D8]/10 border border-[#25C4D8]/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#25C4D8]/20 transition-colors">
                <Icon size={22} className="text-[#25C4D8]" />
              </div>
              <h3 className="font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section className="bg-[#0d0d0d]">
        <div className="text-center mb-12">
          <AccentPill>Notre galerie</AccentPill>
          <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Instants mémorables</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((item) => (
            <div key={item.id} className="relative overflow-hidden rounded-2xl group cursor-pointer aspect-video">
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-[#111111]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium px-4 text-center">{item.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <div className="text-center mb-12">
          <AccentPill>Avis clients</AccentPill>
          <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Ce que disent nos hôtes</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <GlassCard key={t.name} className="p-7">
              <div className="flex gap-1 mb-4">
                {Array(t.rating).fill(0).map((_, i) => (
                  <Star key={i} size={14} fill="#25C4D8" className="text-[#25C4D8]" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25C4D8]/20 flex items-center justify-center text-[#25C4D8] font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-[#0d0d0d]">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&h=500&fit=crop&auto=format"
            alt="Piscine MH Restaurant"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent" />
          <div className="relative z-10 p-12 md:p-16 max-w-xl">
            <AccentPill>Réservation</AccentPill>
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Réservez votre<br />
              <em className="italic text-[#25C4D8]">table ce soir</em>
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Offrez-vous une soirée inoubliable. Notre équipe est prête à vous accueillir dans les meilleures conditions.
            </p>
            <button
              onClick={() => nav("reservations")}
              className="px-8 py-4 bg-[#25C4D8] text-[#111111] font-semibold rounded-full hover:bg-[#1fb0c3] transition-all duration-200 shadow-xl shadow-[#25C4D8]/25 flex items-center gap-2"
            >
              Réserver maintenant <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=500&fit=crop&auto=format" alt="À propos de MH Restaurant" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <AccentPill>Notre histoire</AccentPill>
            <h1 className="text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>À propos de MH</h1>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <AccentPill>Notre histoire</AccentPill>
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Né d&apos;une passion<br />
              <em className="italic">pour l&apos;excellence</em>
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Fondé en 2016 par Moïse et Hortense, le MH Restaurant & Bar avec Piscine est né d&apos;une vision simple : créer un lieu où la gastronomie d&apos;excellence rencontre le luxe décontracté, dans le cadre incomparable d&apos;Abidjan.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              Inspirés par les grands restaurants parisiens et les saveurs authentiques d&apos;Afrique de l&apos;Ouest, nos fondateurs ont voulu bâtir un pont entre deux cultures culinaires — une fusion qui est aujourd&apos;hui notre signature.
            </p>
            <p className="text-white/60 leading-relaxed">
              Huit ans après son ouverture, MH est devenu la table de référence à Abidjan, reconnue pour la qualité de ses produits, la créativité de sa cuisine et la chaleur de son accueil.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=700&h=550&fit=crop&auto=format" alt="Histoire de MH Restaurant" className="w-full h-[480px] object-cover" />
          </div>
        </div>

        {/* Vision / Mission / Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            { icon: Sparkles, title: "Notre vision", text: "Faire de MH la référence gastronomique de l\'Afrique de l\'Ouest, en proposant une expérience culinaire digne des plus grandes capitales mondiales." },
            { icon: Globe, title: "Notre mission", text: "Sublimer les produits locaux avec des techniques d\'excellence pour créer une cuisine unique, sincère et mémorable, dans un cadre d\'exception." },
            { icon: Award, title: "Nos valeurs", text: "Excellence, authenticité, créativité et hospitalité. Ces quatre piliers guident chacune de nos décisions, de la sélection des produits à l\'accueil de nos hôtes." },
          ].map(({ icon: Icon, title, text }) => (
            <GlassCard key={title} className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-[#25C4D8]/10 border border-[#25C4D8]/20 flex items-center justify-center mb-5">
                <Icon size={20} className="text-[#25C4D8]" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{text}</p>
            </GlassCard>
          ))}
        </div>

        {/* Team */}
        <div className="text-center mb-12">
          <AccentPill>Notre équipe</AccentPill>
          <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Les artisans de votre plaisir</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {TEAM.map((member) => (
            <GlassCard key={member.name} className="overflow-hidden group">
              <div className="relative h-72 overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{member.name}</h3>
                <div className="text-[#25C4D8] text-sm font-medium mb-3">{member.role}</div>
                <p className="text-white/60 text-sm leading-relaxed">{member.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── Menu Page ────────────────────────────────────────────────────────────────
function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [search, setSearch] = useState("");

  const categories: { id: MenuCategory; label: string; icon: React.ElementType }[] = [
    { id: "all", label: "Tous", icon: UtensilsCrossed },
    { id: "entrees", label: "Entrées", icon: Sparkles },
    { id: "plats", label: "Plats", icon: ChefHat },
    { id: "grillades", label: "Grillades", icon: Award },
    { id: "fruits-de-mer", label: "Fruits de mer", icon: Fish },
    { id: "desserts", label: "Desserts", icon: Coffee },
    { id: "cocktails", label: "Cocktails", icon: Wine },
    { id: "boissons", label: "Boissons", icon: Coffee },
    { id: "vins", label: "Vins", icon: Wine },
  ];

  const filtered = MENU_ITEMS.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-24">
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=400&fit=crop&auto=format" alt="Menu MH Restaurant" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <AccentPill>Carte & Menu</AccentPill>
            <h1 className="text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Le Menu</h1>
          </div>
        </div>
      </div>

      <Section>
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-10">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un plat..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#25C4D8]/50"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap justify-center mb-10">
          {categories.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === id
                  ? "bg-[#25C4D8] text-[#111111]"
                  : "bg-white/5 border border-white/10 text-white/70 hover:border-white/20 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-white/40 py-16">Aucun plat trouvé pour cette recherche.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <GlassCard key={item.id} className="overflow-hidden group hover:border-white/20 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {item.popular && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#25C4D8] text-[#111111] text-[10px] font-bold uppercase tracking-wider rounded-full">
                      Populaire
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold mb-1 text-[15px]" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
                  <p className="text-white/50 text-xs leading-relaxed mb-3">{item.desc}</p>
                  <div className="text-[#25C4D8] font-bold text-sm">{item.price}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

// ─── Pool Page ────────────────────────────────────────────────────────────────
function PoolPage({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) {
  return (
    <div className="pt-24">
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-center">
        <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=800&fit=crop&auto=format" alt="Piscine MH Restaurant" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/40 to-[#111111]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <AccentPill>Espace Aquatique</AccentPill>
          <h1 className="text-5xl md:text-6xl font-bold max-w-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            Votre oasis<br />
            <em className="italic text-[#25C4D8]">au cœur de la ville</em>
          </h1>
        </div>
      </div>

      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <AccentPill>La piscine</AccentPill>
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Détente et gastronomie<br />
              <em className="italic">réunies</em>
            </h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Notre piscine à débordement de 25 mètres offre une vue spectaculaire sur la lagune d&apos;Abidjan. Profitez de transats premium, d&apos;un service aux bains de soleil et de notre bar à cocktails pour une journée de détente totale.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Longueur", value: "25 mètres" },
                { label: "Capacité", value: "40 personnes" },
                { label: "Température", value: "28°C" },
                { label: "Vue", value: "Lagune" },
              ].map(({ label, value }) => (
                <GlassCard key={label} className="p-4">
                  <div className="text-[#25C4D8] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</div>
                  <div className="text-white/50 text-xs">{label}</div>
                </GlassCard>
              ))}
            </div>
            <button
              onClick={() => { setCurrentPage("reservations"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-8 py-4 bg-[#25C4D8] text-[#111111] font-semibold rounded-full hover:bg-[#1fb0c3] transition-colors flex items-center gap-2"
            >
              Réserver l&apos;espace piscine <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop&auto=format" alt="Vue piscine" className="rounded-2xl w-full h-64 object-cover" />
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop&auto=format" alt="Bar piscine" className="rounded-2xl w-full h-64 object-cover mt-8" />
          </div>
        </div>

        {/* Hours & rates */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock size={20} className="text-[#25C4D8]" />
              <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Horaires</h3>
            </div>
            <ul className="space-y-3">
              {[
                { day: "Lundi – Jeudi", hours: "10h00 – 21h00" },
                { day: "Vendredi – Samedi", hours: "09h00 – 23h00" },
                { day: "Dimanche", hours: "09h00 – 20h00" },
              ].map(({ day, hours }) => (
                <li key={day} className="flex justify-between items-center py-2 border-b border-white/8">
                  <span className="text-white/70 text-sm">{day}</span>
                  <span className="text-[#25C4D8] font-semibold text-sm">{hours}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Award size={20} className="text-[#25C4D8]" />
              <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Tarifs</h3>
            </div>
            <ul className="space-y-3">
              {[
                { label: "Entrée journée", price: "5 000 FCFA" },
                { label: "Forfait demi-journée", price: "3 500 FCFA" },
                { label: "Transat premium", price: "2 000 FCFA" },
                { label: "Cabine privée", price: "15 000 FCFA / jour" },
              ].map(({ label, price }) => (
                <li key={label} className="flex justify-between items-center py-2 border-b border-white/8">
                  <span className="text-white/70 text-sm">{label}</span>
                  <span className="text-[#25C4D8] font-semibold text-sm">{price}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        {/* Services */}
        <div className="text-center mb-10">
          <AccentPill>Services inclus</AccentPill>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Tout pour votre confort</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {["Service aux transats", "Bar à cocktails", "Serviettes premium", "Wifi haut débit", "Vestiaires & douches", "Restauration légère", "Animation DJ (week-end)", "Moniteur natation"].map((s) => (
            <div key={s} className="flex items-center gap-3 p-4 rounded-xl bg-white/4 border border-white/8">
              <Check size={14} className="text-[#25C4D8] shrink-0" />
              <span className="text-sm text-white/70">{s}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── Reservations Page ────────────────────────────────────────────────────────
function ReservationsPage() {
  const [form, setForm] = useState({ nom: "", prenom: "", phone: "", email: "", date: "", heure: "", guests: "2", type: "Restaurant", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nom) e.nom = "Requis";
    if (!form.prenom) e.prenom = "Requis";
    if (!form.phone) e.phone = "Requis";
    if (!form.email || !form.email.includes("@")) e.email = "Email invalide";
    if (!form.date) e.date = "Requis";
    if (!form.heure) e.heure = "Requis";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#25C4D8]/60 transition-colors";
  const lbl = "block text-xs uppercase tracking-widest text-white/50 mb-2";

  return (
    <div className="pt-24">
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=400&fit=crop&auto=format" alt="Réservations" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <AccentPill>Réservations</AccentPill>
            <h1 className="text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Réserver une table</h1>
          </div>
        </div>
      </div>

      <Section>
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <GlassCard className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-[#25C4D8]/15 border-2 border-[#25C4D8]/40 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={36} className="text-[#25C4D8]" />
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Réservation confirmée!
              </h2>
              <p className="text-white/60 leading-relaxed mb-2">
                Merci, <strong className="text-white">{form.prenom} {form.nom}</strong>!
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Votre réservation pour le <strong className="text-[#25C4D8]">{form.date}</strong> à <strong className="text-[#25C4D8]">{form.heure}</strong> a bien été enregistrée. Un email de confirmation sera envoyé à <strong className="text-white">{form.email}</strong>.
              </p>
              <button onClick={() => setSubmitted(false)} className="px-6 py-3 bg-[#25C4D8] text-[#111111] font-semibold rounded-full hover:bg-[#1fb0c3] transition-colors">
                Nouvelle réservation
              </button>
            </GlassCard>
          ) : (
            <GlassCard className="p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Vos informations</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={lbl}>Nom *</label>
                    <input className={`${inp} ${errors.nom ? "border-red-500/60" : ""}`} value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Koné" />
                    {errors.nom && <p className="text-red-400 text-xs mt-1">{errors.nom}</p>}
                  </div>
                  <div>
                    <label className={lbl}>Prénom *</label>
                    <input className={`${inp} ${errors.prenom ? "border-red-500/60" : ""}`} value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} placeholder="Aminata" />
                    {errors.prenom && <p className="text-red-400 text-xs mt-1">{errors.prenom}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={lbl}>Téléphone *</label>
                    <input className={`${inp} ${errors.phone ? "border-red-500/60" : ""}`} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+225 07 00 00 00" />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className={lbl}>Email *</label>
                    <input type="email" className={`${inp} ${errors.email ? "border-red-500/60" : ""}`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="aminata@email.com" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label className={lbl}>Date *</label>
                    <input type="date" className={`${inp} ${errors.date ? "border-red-500/60" : ""}`} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label className={lbl}>Heure *</label>
                    <input type="time" className={`${inp} ${errors.heure ? "border-red-500/60" : ""}`} value={form.heure} onChange={(e) => setForm({ ...form, heure: e.target.value })} />
                    {errors.heure && <p className="text-red-400 text-xs mt-1">{errors.heure}</p>}
                  </div>
                  <div>
                    <label className={lbl}>Personnes</label>
                    <select className={inp} value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}>
                      {[1,2,3,4,5,6,7,8,10,12,15,20].map((n) => (
                        <option key={n} value={n} className="bg-[#1a1a1a]">{n} {n === 1 ? "personne" : "personnes"}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={lbl}>Type de réservation</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Restaurant", "Piscine", "Restaurant + Piscine"].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setForm({ ...form, type })}
                        className={`py-3 px-3 rounded-xl text-xs font-medium border transition-all duration-200 text-center ${
                          form.type === type
                            ? "bg-[#25C4D8]/15 border-[#25C4D8]/60 text-[#25C4D8]"
                            : "bg-white/4 border-white/10 text-white/60 hover:border-white/20"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={lbl}>Commentaire</label>
                  <textarea
                    rows={3}
                    className={inp}
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    placeholder="Allergie, occasion spéciale, demande particulière..."
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-[#25C4D8] text-[#111111] font-semibold rounded-xl hover:bg-[#1fb0c3] transition-colors text-sm tracking-wide flex items-center justify-center gap-2">
                  Confirmer la réservation <ArrowRight size={16} />
                </button>
              </form>
            </GlassCard>
          )}
        </div>
      </Section>
    </div>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [sent, setSent] = useState(false);
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#25C4D8]/60 transition-colors";
  const lbl = "block text-xs uppercase tracking-widest text-white/50 mb-2";

  return (
    <div className="pt-24">
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=400&fit=crop&auto=format" alt="Contactez-nous" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <AccentPill>Contact</AccentPill>
            <h1 className="text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Contactez-nous</h1>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <AccentPill>Nos informations</AccentPill>
            <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Nous sommes à votre écoute</h2>
            <div className="space-y-5 mb-10">
              {[
                { icon: MapPin, label: "Adresse", value: "Derriere la station x-oil des  voiliers" },
                { icon: Phone, label: "Téléphone", value: "+242 06 888 2886 \n+242 06 837 1324" },
                { icon: Mail, label: "Email", value: "@mh-restaurant.com\nreservations@mh-restaurant.ci" },
                { icon: Clock, label: "Horaires", value: "Lun–Sam : 12h00 – 23h00\nDimanche : 12h00 – 22h00" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#25C4D8]/10 border border-[#25C4D8]/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[#25C4D8]" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-1">{label}</div>
                    <div className="text-sm text-white/80 whitespace-pre-line">{value}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/10 h-52 flex items-center justify-center">
              <div className="text-center text-white/30">
                <MapPin size={32} className="mx-auto mb-2" />
                <p className="text-sm">Carte Google Maps</p>
                <p className="text-xs mt-1">Avenue de la République, Plateau, Abidjan</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <GlassCard className="p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#25C4D8]/15 border-2 border-[#25C4D8]/40 flex items-center justify-center mb-5">
                  <Send size={24} className="text-[#25C4D8]" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Message envoyé!</h3>
                <p className="text-white/60 text-sm mb-6">Nous vous répondrons dans les plus brefs délais, généralement sous 24 heures.</p>
                <button onClick={() => { setSent(false); setForm({ nom: "", email: "", sujet: "", message: "" }); }} className="px-6 py-2.5 bg-[#25C4D8] text-[#111111] font-semibold rounded-full hover:bg-[#1fb0c3] transition-colors text-sm">
                  Nouveau message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-7" style={{ fontFamily: "'Playfair Display', serif" }}>Envoyez-nous un message</h2>
                <form onSubmit={(e) => { e.preventDefault(); if (form.nom && form.email && form.message) setSent(true); }} className="space-y-5">
                  <div>
                    <label className={lbl}>Nom complet *</label>
                    <input className={inp} value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Votre nom" required />
                  </div>
                  <div>
                    <label className={lbl}>Email *</label>
                    <input type="email" className={inp} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="votre@email.com" required />
                  </div>
                  <div>
                    <label className={lbl}>Sujet</label>
                    <input className={inp} value={form.sujet} onChange={(e) => setForm({ ...form, sujet: e.target.value })} placeholder="Sujet de votre message" />
                  </div>
                  <div>
                    <label className={lbl}>Message *</label>
                    <textarea rows={5} className={inp} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Votre message..." required />
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-[#25C4D8] text-[#111111] font-semibold rounded-xl hover:bg-[#1fb0c3] transition-colors text-sm flex items-center justify-center gap-2">
                    <Send size={15} /> Envoyer le message
                  </button>
                </form>
              </>
            )}
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}

// ─── Admin Login ───────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@mh-restaurant.ci" && password === "admin123") {
      onLogin();
    } else {
      setError("Identifiants incorrects. Essayez admin@mh-restaurant.ci / admin123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#0a0a0a]">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-4xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>MH</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#25C4D8]">Espace Administrateur</div>
        </div>
        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold mb-7" style={{ fontFamily: "'Playfair Display', serif" }}>Connexion</h2>
          {error && (
            <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Adresse e-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#25C4D8]/60" placeholder="admin@mh-restaurant.ci" required />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Mot de passe</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#25C4D8]/60" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-white/50 cursor-pointer">
                <input type="checkbox" className="rounded" /> Se souvenir de moi
              </label>
              <a href="#" className="text-[#25C4D8] hover:text-[#1fb0c3] transition-colors">Mot de passe oublié?</a>
            </div>
            <button type="submit" className="w-full py-3.5 bg-[#25C4D8] text-[#111111] font-semibold rounded-xl hover:bg-[#1fb0c3] transition-colors text-sm">
              Se connecter
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [adminPage, setAdminPage] = useState<AdminPage>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reservations, setReservations] = useState(MOCK_RESERVATIONS);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);

  const navItems: { id: AdminPage; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { id: "menu-mgmt", label: "Menu", icon: UtensilsCrossed },
    { id: "reservations-mgmt", label: "Réservations", icon: Calendar },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "admins", label: "Administrateurs", icon: Users },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} shrink-0 bg-[#0d0d0d] border-r border-white/6 flex flex-col transition-all duration-300 min-h-screen`}>
        <div className="h-16 flex items-center px-4 border-b border-white/6">
          {sidebarOpen && (
            <div>
              <div className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>MH Admin</div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`${sidebarOpen ? "ml-auto" : "mx-auto"} p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50`}>
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setAdminPage(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                adminPage === id ? "bg-[#25C4D8]/15 text-[#25C4D8] border border-[#25C4D8]/20" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              {sidebarOpen && (
                <span className="flex-1 text-left">
                  {label}
                  {id === "messages" && unreadCount > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 bg-[#25C4D8] text-[#111111] text-[10px] font-bold rounded-full">{unreadCount}</span>
                  )}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/6">
          <button onClick={onLogout} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all`}>
            <LogOut size={16} className="shrink-0" />
            {sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="h-16 border-b border-white/6 flex items-center justify-between px-6">
          <h1 className="text-base font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            {navItems.find((n) => n.id === adminPage)?.label}
          </h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-white/8 transition-colors text-white/50">
              <Bell size={16} />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-[#25C4D8] rounded-full" />}
            </button>
            <div className="w-8 h-8 rounded-full bg-[#25C4D8]/20 flex items-center justify-center text-[#25C4D8] text-sm font-bold">A</div>
          </div>
        </div>

        <div className="p-6">
          {/* Dashboard */}
          {adminPage === "dashboard" && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { label: "Plats au menu", value: menuItems.length, icon: UtensilsCrossed, trend: "+2 ce mois" },
                  { label: "Réservations", value: reservations.length, icon: Calendar, trend: "+12 cette semaine" },
                  { label: "Messages", value: messages.length, icon: MessageSquare, trend: `${unreadCount} non lus` },
                  { label: "Administrateurs", value: 3, icon: Users, trend: "Actifs" },
                ].map(({ label, value, icon: Icon, trend }) => (
                  <GlassCard key={label} className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-[#25C4D8]/10 flex items-center justify-center">
                        <Icon size={16} className="text-[#25C4D8]" />
                      </div>
                      <TrendingUp size={14} className="text-[#25C4D8]" />
                    </div>
                    <div className="text-3xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</div>
                    <div className="text-xs text-white/50">{label}</div>
                    <div className="text-xs text-[#25C4D8] mt-1">{trend}</div>
                  </GlassCard>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-5">
                {/* Recent reservations */}
                <GlassCard className="p-5">
                  <h3 className="font-bold mb-4 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Dernières réservations</h3>
                  <div className="space-y-3">
                    {reservations.slice(0, 4).map((r) => (
                      <div key={r.id} className="flex items-center justify-between py-2 border-b border-white/6">
                        <div>
                          <div className="text-sm font-medium">{r.name}</div>
                          <div className="text-xs text-white/40">{r.date} · {r.time} · {r.guests} pers.</div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          r.status === "confirmed" ? "bg-green-500/15 text-green-400" :
                          r.status === "pending" ? "bg-yellow-500/15 text-yellow-400" :
                          "bg-red-500/15 text-red-400"
                        }`}>
                          {r.status === "confirmed" ? "Confirmée" : r.status === "pending" ? "En attente" : "Annulée"}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Recent messages */}
                <GlassCard className="p-5">
                  <h3 className="font-bold mb-4 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Derniers messages</h3>
                  <div className="space-y-3">
                    {messages.map((m) => (
                      <div key={m.id} className={`py-2 border-b border-white/6 ${!m.read ? "opacity-100" : "opacity-60"}`}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-sm font-medium">{m.name}</span>
                          {!m.read && <span className="w-2 h-2 bg-[#25C4D8] rounded-full" />}
                        </div>
                        <div className="text-xs text-[#25C4D8] mb-1">{m.subject}</div>
                        <div className="text-xs text-white/40 truncate">{m.message}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          )}

          {/* Menu Management */}
          {adminPage === "menu-mgmt" && (
            <div>
              <div className="flex justify-between items-center mb-5">
                <p className="text-sm text-white/50">{menuItems.length} plats au total</p>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#25C4D8] text-[#111111] text-sm font-semibold rounded-lg hover:bg-[#1fb0c3] transition-colors">
                  <Plus size={14} /> Ajouter un plat
                </button>
              </div>
              <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/8">
                        <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-medium">Plat</th>
                        <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-medium hidden md:table-cell">Catégorie</th>
                        <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-medium">Prix</th>
                        <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-medium hidden sm:table-cell">Statut</th>
                        <th className="text-right px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.map((item) => (
                        <tr key={item.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-9 h-9 rounded-lg object-cover" />
                              <span className="font-medium text-sm">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span className="text-xs text-white/50 capitalize">{item.category}</span>
                          </td>
                          <td className="px-4 py-3 text-[#25C4D8] text-sm font-medium">{item.price}</td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            <button
                              onClick={() => setMenuItems(menuItems.map((m) => m.id === item.id ? { ...m, active: !m.active } : m))}
                              className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors ${item.active ? "bg-green-500/15 text-green-400" : "bg-white/10 text-white/40"}`}
                            >
                              {item.active ? "Actif" : "Inactif"}
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-[#25C4D8] transition-colors"><Edit2 size={13} /></button>
                              <button onClick={() => setMenuItems(menuItems.filter((m) => m.id !== item.id))} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Reservations Management */}
          {adminPage === "reservations-mgmt" && (
            <div>
              <div className="flex gap-3 mb-5 flex-wrap">
                <div className="relative flex-1 max-w-xs">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input placeholder="Rechercher..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#25C4D8]/50" />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white/60 hover:border-white/20 transition-colors">
                  <Filter size={14} /> Filtrer
                </button>
              </div>
              <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/8">
                        {["Client", "Date & Heure", "Type", "Pers.", "Statut", "Actions"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((r) => (
                        <tr key={r.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                          <td className="px-4 py-3">
                            <div className="font-medium">{r.name}</div>
                            <div className="text-xs text-white/40">{r.phone}</div>
                          </td>
                          <td className="px-4 py-3 text-white/70">{r.date}<br /><span className="text-xs text-white/40">{r.time}</span></td>
                          <td className="px-4 py-3 text-xs text-white/60">{r.type}</td>
                          <td className="px-4 py-3 text-white/70">{r.guests}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              r.status === "confirmed" ? "bg-green-500/15 text-green-400" :
                              r.status === "pending" ? "bg-yellow-500/15 text-yellow-400" :
                              "bg-red-500/15 text-red-400"
                            }`}>
                              {r.status === "confirmed" ? "Confirmée" : r.status === "pending" ? "En attente" : "Annulée"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {r.status === "pending" && (
                                <button onClick={() => setReservations(reservations.map((rv) => rv.id === r.id ? { ...rv, status: "confirmed" } : rv))} className="p-1.5 rounded-lg hover:bg-green-500/10 text-white/40 hover:text-green-400 transition-colors">
                                  <CheckCircle size={13} />
                                </button>
                              )}
                              <button onClick={() => setReservations(reservations.filter((rv) => rv.id !== r.id))} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors">
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Messages */}
          {adminPage === "messages" && (
            <div className="space-y-4">
              {messages.map((m) => (
                <GlassCard key={m.id} className={`p-6 ${!m.read ? "border-[#25C4D8]/20" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm">{m.name}</span>
                        {!m.read && <span className="w-2 h-2 bg-[#25C4D8] rounded-full" />}
                      </div>
                      <div className="text-xs text-white/40">{m.email} · {m.date}</div>
                    </div>
                    <div className="flex gap-2">
                      {!m.read && (
                        <button onClick={() => setMessages(messages.map((msg) => msg.id === m.id ? { ...msg, read: true } : msg))} className="text-xs px-3 py-1.5 bg-[#25C4D8]/15 text-[#25C4D8] rounded-lg hover:bg-[#25C4D8]/25 transition-colors">
                          Marquer lu
                        </button>
                      )}
                      <button onClick={() => setMessages(messages.filter((msg) => msg.id !== m.id))} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-[#25C4D8] text-sm font-medium mb-2">{m.subject}</div>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{m.message}</p>
                  <button className="text-xs px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white hover:border-white/20 transition-colors flex items-center gap-2">
                    <Send size={12} /> Répondre
                  </button>
                </GlassCard>
              ))}
            </div>
          )}

          {/* Admins */}
          {adminPage === "admins" && (
            <div>
              <div className="flex justify-end mb-5">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#25C4D8] text-[#111111] text-sm font-semibold rounded-lg hover:bg-[#1fb0c3] transition-colors">
                  <Plus size={14} /> Nouvel administrateur
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Moïse Habib", email: "moise@mh-restaurant.ci", role: "Super Administrateur", status: "active", since: "Janv. 2020" },
                  { name: "Hortense Mensah", email: "hortense@mh-restaurant.ci", role: "Administrateur", status: "active", since: "Mars 2021" },
                  { name: "Kofi Asante", email: "kofi@mh-restaurant.ci", role: "Administrateur", status: "inactive", since: "Juin 2023" },
                ].map((a) => (
                  <GlassCard key={a.email} className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-[#25C4D8]/15 border border-[#25C4D8]/30 flex items-center justify-center text-[#25C4D8] font-bold">
                          {a.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{a.name}</div>
                          <div className="text-xs text-white/40">{a.email} · depuis {a.since}</div>
                          <div className="text-xs text-[#25C4D8] mt-0.5">{a.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${a.status === "active" ? "bg-green-500/15 text-green-400" : "bg-white/10 text-white/40"}`}>
                          {a.status === "active" ? "Actif" : "Inactif"}
                        </span>
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-[#25C4D8] transition-colors"><Edit2 size={13} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          {adminPage === "settings" && (
            <div className="max-w-2xl space-y-6">
              {[
                { title: "Informations générales", fields: [
                  { label: "Nom du restaurant", value: "MH Restaurant & Bar avec Piscine" },
                  { label: "Slogan", value: "Une expérience gastronomique d\'exception" },
                  { label: "Adresse", value: "Avenue de la République, Plateau, Abidjan" },
                ]},
                { title: "Contacts", fields: [
                  { label: "Téléphone principal", value: "+225 07 00 00 00" },
                  { label: "Email de contact", value: "contact@mh-restaurant.ci" },
                  { label: "Email réservations", value: "reservations@mh-restaurant.ci" },
                ]},
                { title: "Réseaux sociaux", fields: [
                  { label: "Instagram", value: "@mhrestaurant_ci" },
                  { label: "Facebook", value: "MH Restaurant & Bar" },
                  { label: "Twitter / X", value: "@mhrestaurant" },
                ]},
              ].map(({ title, fields }) => (
                <GlassCard key={title} className="p-6">
                  <h3 className="font-bold mb-5 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
                  <div className="space-y-4">
                    {fields.map(({ label, value }) => (
                      <div key={label}>
                        <label className="block text-xs uppercase tracking-widest text-white/40 mb-1.5">{label}</label>
                        <input defaultValue={value} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#25C4D8]/60 transition-colors" />
                      </div>
                    ))}
                  </div>
                </GlassCard>
              ))}
              <button className="px-6 py-3 bg-[#25C4D8] text-[#111111] font-semibold rounded-xl hover:bg-[#1fb0c3] transition-colors text-sm">
                Enregistrer les modifications
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const isAdmin = currentPage === "admin";

  if (isAdmin) {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />;
    }
    return <AdminDashboard onLogout={() => { setIsAdminLoggedIn(false); setCurrentPage("home"); }} />;
  }

  return (
    <div className="bg-[#111111] text-white min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "menu" && <MenuPage />}
        {currentPage === "pool" && <PoolPage setCurrentPage={setCurrentPage} />}
        {currentPage === "reservations" && <ReservationsPage />}
        {currentPage === "contact" && <ContactPage />}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
