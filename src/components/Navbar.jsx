import { Link } from "react-router-dom";

function NavIconButton({ icon, label, badge }) {
  return (
    <button className="relative flex flex-col items-center gap-0.5 px-2 py-1 rounded text-white hover:bg-black/10 transition-colors">
      <span className="text-xl leading-none">{icon}</span>
      <span className="text-[10px] text-white/80">{label}</span>
      {badge && (
        <span className="absolute top-0 right-1 bg-white text-[#ee4d2d] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

function Navbar() {
  return (
    <header className="bg-[#ee4d2d] px-4 md:px-8 h-14 flex items-center justify-between sticky top-0 z-50">
      <Link
        to="/"
        className="text-white font-semibold text-lg flex items-center gap-2"
      >
        🛍️ SkyStore
      </Link>

      <div className="flex items-center gap-1">
        <NavIconButton icon="🔔" label="Notifikasi" badge={3} />
        <NavIconButton icon="🛒" label="Keranjang" badge={2} />
        <NavIconButton icon="👤" label="Akun" />
      </div>
    </header>
  );
}

export default Navbar;
