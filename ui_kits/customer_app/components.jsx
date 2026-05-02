/* global React, lucide */
const { useState, useEffect, useRef } = React;

// ===== Icon helper =====
function Icon({ name, size = 20, stroke = 1.75, color }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const node = document.createElement('i');
      node.setAttribute('data-lucide', name);
      ref.current.appendChild(node);
      window.lucide.createIcons({ attrs: { width: size, height: size, 'stroke-width': stroke } });
    }
  }, [name, size, stroke]);
  return <span ref={ref} style={{ display: 'inline-flex', color: color || 'currentColor' }} />;
}

// ===== Header =====
function Header({ title, subtitle, onBack, right, greet, name }) {
  return (
    <header className="em-header">
      {onBack ? (
        <button className="back" onClick={onBack}><Icon name="chevron-left" size={22} /></button>
      ) : null}
      <div style={{ flex: 1, minWidth: 0 }}>
        {greet ? <div className="greet">{greet}</div> : null}
        {name ? <div className="name">{name}</div> : null}
        {title ? <div className="title">{title}</div> : null}
        {subtitle ? <div className="greet">{subtitle}</div> : null}
      </div>
      {right}
    </header>
  );
}

// ===== Search =====
function Search({ value, onChange, placeholder }) {
  return (
    <div className="em-search">
      <span className="icon"><Icon name="search" size={18} /></span>
      <input value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder || 'Search plumber, electrician…'} />
      <span className="icon"><Icon name="sliders-horizontal" size={18} /></span>
    </div>
  );
}

// ===== Service tile =====
const SERVICES = [
  { id: 'plumber', name: 'Plumber', icon: 'wrench', from: 600 },
  { id: 'electric', name: 'Electrician', icon: 'plug-zap', from: 800, urgent: true },
  { id: 'carpenter', name: 'Carpenter', icon: 'hammer', from: 1000 },
  { id: 'painter', name: 'Painter', icon: 'paint-roller', from: 1500 },
  { id: 'ac', name: 'AC tech', icon: 'air-vent', from: 1200 },
  { id: 'mazdoor', name: 'Mazdoor', icon: 'hard-hat', from: 500 },
  { id: 'cleaner', name: 'Cleaner', icon: 'spray-can', from: 700 },
  { id: 'more', name: 'More', icon: 'grid-2x2', from: 0 },
];

function ServiceGrid({ selected, onSelect }) {
  return (
    <div className="em-services">
      {SERVICES.map((s) => (
        <button
          key={s.id}
          className={'em-tile' + (selected === s.id ? ' selected' : '')}
          onClick={() => onSelect?.(s.id)}
        >
          {s.urgent ? <span className="urgent">Urgent</span> : null}
          <span className="ic"><Icon name={s.icon} size={20} /></span>
          <span className="name">{s.name}</span>
        </button>
      ))}
    </div>
  );
}

// ===== Worker data =====
const WORKERS = [
  { id: 'imran', name: 'Imran K.', initials: 'IK', trade: 'Plumber', years: 4, rating: 4.8, distance: 2.4, price: 800, status: 'Available now', verified: true, available: true },
  { id: 'rashid', name: 'Rashid A.', initials: 'RA', trade: 'Electrician', years: 7, rating: 4.9, distance: 1.1, price: 1200, status: 'Back at 5 pm', verified: true, available: false },
  { id: 'kashif', name: 'Kashif M.', initials: 'KM', trade: 'Plumber', years: 2, rating: 4.5, distance: 3.8, price: 650, status: 'Available now', verified: false, available: true },
  { id: 'salman', name: 'Salman P.', initials: 'SP', trade: 'Carpenter', years: 9, rating: 4.7, distance: 4.5, price: 1400, status: 'Available now', verified: true, available: true },
  { id: 'nasir', name: 'Nasir L.', initials: 'NL', trade: 'Painter', years: 5, rating: 4.4, distance: 3.1, price: 1500, status: 'Available now', verified: true, available: true },
  { id: 'hamza', name: 'Hamza I.', initials: 'HI', trade: 'AC tech', years: 3, rating: 4.6, distance: 2.0, price: 1200, status: 'Available now', verified: true, available: true },
  { id: 'zubair', name: 'Zubair F.', initials: 'ZF', trade: 'Mazdoor', years: 6, rating: 4.7, distance: 1.8, price: 500, status: 'Available now', verified: true, available: true },
  { id: 'rafiq', name: 'Rafiq S.', initials: 'RS', trade: 'Cleaner', years: 4, rating: 4.5, distance: 2.6, price: 700, status: 'Available now', verified: false, available: true },
  { id: 'bilal', name: 'Bilal K.', initials: 'BK', trade: 'Electrician', years: 5, rating: 4.7, distance: 2.9, price: 1100, status: 'Available now', verified: true, available: true },
  { id: 'faisal', name: 'Faisal R.', initials: 'FR', trade: 'Carpenter', years: 4, rating: 4.5, distance: 3.5, price: 1200, status: 'Available now', verified: true, available: true },
];

// service id -> trade label used on workers
const SERVICE_TRADE = {
  plumber: 'Plumber',
  electric: 'Electrician',
  carpenter: 'Carpenter',
  painter: 'Painter',
  ac: 'AC tech',
  mazdoor: 'Mazdoor',
  cleaner: 'Cleaner',
};

function WorkerCard({ w, onClick }) {
  return (
    <div className="em-worker" onClick={() => onClick?.(w)}>
      <div className={'stripe ' + (w.available ? 'available' : 'busy')} />
      <div className="av" style={!w.available ? { background: 'var(--slate-400)' } : {}}>{w.initials}</div>
      <div className="meta">
        <div className="name">
          {w.name}
          {w.verified ? <span className="verified-tag">Verified</span> : null}
        </div>
        <div className="trade">{w.trade} · {w.years} yrs</div>
        <div className="row">
          <span className="star">★ {w.rating}</span>
          <span>· {w.distance} km</span>
          <span style={!w.available ? { color: 'var(--slate-500)', fontStyle: 'italic' } : {}}>· {w.status}</span>
        </div>
      </div>
      <div className="price"><span className="rs">Rs</span>{w.price.toLocaleString()}</div>
    </div>
  );
}

// ===== Tab bar =====
function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'bookings', icon: 'calendar-clock', label: 'Bookings' },
    { id: 'messages', icon: 'message-circle', label: 'Messages' },
    { id: 'profile', icon: 'user', label: 'Profile' },
  ];
  return (
    <nav className="em-tabbar">
      {tabs.map((t) => (
        <button key={t.id} className={'em-tab' + (active === t.id ? ' active' : '')} onClick={() => onChange?.(t.id)}>
          <span className="ic"><Icon name={t.icon} size={22} /></span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ===== Stamp =====
function Stamp({ children, color = 'ink' }) {
  const cls = 'em-stamp' + (color !== 'ink' ? ' ' + color : '');
  return <div className={cls}>{children}</div>;
}

// ===== Chips =====
function Chips({ items, value, onChange }) {
  return (
    <div className="em-chips">
      {items.map((it) => (
        <button key={it} className={'em-chip' + (value === it ? ' on' : '')} onClick={() => onChange?.(it)}>{it}</button>
      ))}
    </div>
  );
}

// ===== Stars =====
function StarRating({ value, onChange }) {
  return (
    <div className="em-stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} className={n <= value ? 'on' : ''} onClick={() => onChange?.(n)}>
          <svg viewBox="0 0 24 24" fill={n <= value ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
      ))}
    </div>
  );
}

Object.assign(window, { Icon, Header, Search, ServiceGrid, WorkerCard, TabBar, Stamp, Chips, StarRating, SERVICES, WORKERS, SERVICE_TRADE });
