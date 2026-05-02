/* global React, Header, Search, ServiceGrid, WorkerCard, TabBar, Stamp, Chips, StarRating, Icon, SERVICES, WORKERS, SERVICE_TRADE */
const { useState } = React;

// ===== HOME SCREEN =====
function HomeScreen({ onPickService, onPickWorker, onTab, tab }) {
  const [q, setQ] = useState('');
  return (
    <div className="em-app">
      <Header
        greet="Salam,"
        name="Asma"
        right={
          <button className="back" aria-label="Notifications"><Icon name="bell" size={22} /></button>
        }
      />
      <div className="em-body">
        <div className="em-section" style={{ paddingTop: 8 }}>
          <div className="eyebrow">Find a pro</div>
          <div className="h2" style={{ textWrap: 'balance' }}>Who's working at your place today?</div>
        </div>
        <Search value={q} onChange={setQ} />
        <div className="em-section">
          <div className="eyebrow">Services</div>
        </div>
        <ServiceGrid onSelect={onPickService} />
        <div className="em-section">
          <div className="eyebrow">Available near you</div>
        </div>
        {WORKERS.filter(w => w.available).map(w => (
          <WorkerCard key={w.id} w={w} onClick={onPickWorker} />
        ))}
      </div>
      <TabBar active={tab} onChange={onTab} />
    </div>
  );
}

// ===== SERVICE LIST SCREEN =====
function ServiceListScreen({ service, onPickWorker, onBack, onTab, tab }) {
  const svc = SERVICES.find(s => s.id === service) || SERVICES[0];
  const trade = SERVICE_TRADE[svc.id];
  // "More" / unmapped → show everyone; otherwise filter by trade
  const pool = trade ? WORKERS.filter(w => w.trade === trade) : WORKERS;
  const [filter, setFilter] = useState('Nearest');

  const sorted = [...pool].sort((a, b) => {
    if (filter === 'Nearest')    return a.distance - b.distance;
    if (filter === 'Top rated')  return b.rating - a.rating;
    if (filter === 'Cheapest')   return a.price - b.price;
    if (filter === 'Verified')   return (b.verified === true) - (a.verified === true);
    return 0;
  });

  return (
    <div className="em-app">
      <Header
        title={svc.name}
        subtitle={`${pool.length} ${pool.length === 1 ? 'pro' : 'pros'} nearby`}
        onBack={onBack}
        right={<button className="back"><Icon name="map" size={22} /></button>}
      />
      <div style={{ padding: '12px 20px 4px' }}>
        <Chips items={['Nearest', 'Top rated', 'Cheapest', 'Verified']} value={filter} onChange={setFilter} />
      </div>
      <div className="em-body" style={{ paddingTop: 8 }}>
        {sorted.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--ink-60)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--ink)', marginBottom: 4 }}>No {svc.name.toLowerCase()}s nearby</div>
            <div style={{ fontSize: 13 }}>Try a different service or check back later.</div>
          </div>
        ) : sorted.map(w => (
          <WorkerCard key={w.id} w={w} onClick={onPickWorker} />
        ))}
      </div>
      <TabBar active={tab} onChange={onTab} />
    </div>
  );
}

// ===== WORKER DETAIL SCREEN =====
function WorkerDetailScreen({ worker, onBook, onBack }) {
  const w = worker || WORKERS[0];
  const [slot, setSlot] = useState('Today 4 pm');
  const [issue, setIssue] = useState('Sink leak');
  return (
    <div className="em-app">
      <Header
        onBack={onBack}
        title="Pro details"
        right={<button className="back"><Icon name="phone" size={20} /></button>}
      />
      <div className="em-body" style={{ padding: 0 }}>
        <div className="em-hero">
          <div className="row">
            <div className="av">{w.initials}</div>
            <div>
              <div className="name">{w.name}</div>
              <div className="trade">{w.trade} · {w.years} yrs on platform</div>
            </div>
          </div>
          <div className="stats">
            <div className="stat"><div className="v">★ {w.rating}</div><div className="l">142 jobs</div></div>
            <div className="stat"><div className="v">{w.distance} km</div><div className="l">From you</div></div>
            <div className="stat"><div className="v">~25m</div><div className="l">ETA</div></div>
          </div>
        </div>
        <div className="em-section"><div className="eyebrow">What's the job?</div></div>
        <div style={{ padding: '0 20px 8px' }}>
          <Chips items={['Sink leak', 'Pipe burst', 'Tap install', 'Drain clog', 'Other']} value={issue} onChange={setIssue} />
        </div>
        <div className="em-section"><div className="eyebrow">When?</div></div>
        <div style={{ padding: '0 20px 12px' }}>
          <Chips items={['Now', 'Today 4 pm', 'Today 6 pm', 'Tomorrow']} value={slot} onChange={setSlot} />
        </div>
        <div className="em-section"><div className="eyebrow">About</div></div>
        <div style={{ padding: '0 20px 16px', fontSize: 14, color: 'var(--ink-80)', lineHeight: 1.5 }}>
          Worked across Gulshan and DHA for {w.years} years. Speaks Urdu and Punjabi. Brings own tools. Quotes on-site after a quick look.
        </div>
      </div>
      <div className="em-cta-bar">
        <div>
          <div className="from">Estimate</div>
          <div className="price"><span className="rs">Rs</span>{w.price.toLocaleString()}</div>
        </div>
        <button className="em-btn em-btn-primary" style={{ flex: 1 }} onClick={() => onBook?.(w, slot, issue)}>
          Book {w.name.split(' ')[0]}
        </button>
      </div>
    </div>
  );
}

// ===== PAYMENT SCREEN =====
function PaymentScreen({ worker, slot, issue, onConfirm, onBack }) {
  const w = worker || WORKERS[0];
  const [pay, setPay] = useState('cod');
  return (
    <div className="em-app">
      <Header onBack={onBack} title="Confirm booking" />
      <div className="em-body">
        <div className="em-section"><div className="eyebrow">Job summary</div></div>
        <div className="em-receipt" style={{ marginBottom: 16 }}>
          <div className="row"><span>Pro</span><span className="v">{w.name}</span></div>
          <div className="row"><span>Service</span><span className="v">{w.trade} · {issue || 'Sink leak'}</span></div>
          <div className="row"><span>When</span><span className="v">{slot || 'Today 4 pm'}</span></div>
          <div className="row"><span>Address</span><span className="v">Block 4, Gulshan</span></div>
          <div className="row total"><span>Estimate</span><span className="v"><span style={{fontSize:11,color:'var(--ink-60)',marginRight:2}}>Rs</span>{w.price.toLocaleString()}</span></div>
        </div>
        <div className="em-section" style={{ paddingTop: 0 }}><div className="eyebrow">Payment</div></div>
        <div className={'em-pay' + (pay === 'cod' ? ' on' : '')} onClick={() => setPay('cod')}>
          <div className="ic"><Icon name="banknote" size={22} /></div>
          <div style={{ flex: 1 }}>
            <div className="ttl">Cash on delivery</div>
            <div className="sub">Pay {w.name.split(' ')[0]} when the job's done</div>
          </div>
          <div className="radio" />
        </div>
        <div className={'em-pay' + (pay === 'card' ? ' on' : '')} onClick={() => setPay('card')}>
          <div className="ic"><Icon name="credit-card" size={22} /></div>
          <div style={{ flex: 1 }}>
            <div className="ttl">Card</div>
            <div className="sub">Visa, Mastercard · charged after the job</div>
          </div>
          <div className="radio" />
        </div>
      </div>
      <div className="em-cta-bar">
        <div>
          <div className="from">Total</div>
          <div className="price"><span className="rs">Rs</span>{w.price.toLocaleString()}</div>
        </div>
        <button className="em-btn em-btn-primary" style={{ flex: 1 }} onClick={onConfirm}>Confirm booking</button>
      </div>
    </div>
  );
}

// ===== CONFIRMATION SCREEN =====
function ConfirmScreen({ worker, onDone, onBack }) {
  const w = worker || WORKERS[0];
  return (
    <div className="em-app">
      <Header onBack={onBack} title="" />
      <div className="em-confirm">
        <div className="stamp-wrap"><Stamp color="green">BOOKED</Stamp></div>
        <h1>{w.name.split(' ')[0]} is on the way.</h1>
        <p>Arrives in about 25 min. We'll send a text with the live ETA.</p>
        <div className="id">Booking #EM-21458</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button className="em-btn em-btn-secondary" style={{ padding: '12px 18px' }}><Icon name="phone" size={18}/>&nbsp;Call</button>
          <button className="em-btn em-btn-secondary" style={{ padding: '12px 18px' }}><Icon name="message-circle" size={18}/>&nbsp;Message</button>
        </div>
      </div>
      <div className="em-cta-bar">
        <button className="em-btn em-btn-primary em-btn-block" onClick={onDone}>Track booking</button>
      </div>
    </div>
  );
}

// ===== BOOKINGS LIST =====
function BookingsScreen({ onTab, tab, onBack }) {
  const items = [
    { id: 'EM-21458', date: '12', mo: 'May', name: 'Imran K.', trade: 'Plumber', sub: 'Sink leak · paid in cash', status: 'Done', stClass: 'ok', price: 800 },
    { id: 'EM-21459', date: '13', mo: 'May', name: 'Rashid A.', trade: 'Electrician', sub: 'Fan installation · 4 pm', status: 'On the way', stClass: 'pend', price: 1200 },
    { id: 'EM-21443', date: '02', mo: 'May', name: 'Salman P.', trade: 'Carpenter', sub: 'Door hinge · paid by card', status: 'Done', stClass: 'ok', price: 1400 },
    { id: 'EM-21421', date: '24', mo: 'Apr', name: 'Kashif M.', trade: 'Plumber', sub: 'Tap replacement', status: 'Cancelled', stClass: 'danger', price: 650 },
  ];
  return (
    <div className="em-app">
      <Header title="Your bookings" onBack={onBack} right={<button className="back"><Icon name="filter" size={20}/></button>} />
      <div className="em-body" style={{ padding: '4px 20px' }}>
        {items.map((it, i) => (
          <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: i < items.length - 1 ? '1px solid var(--ink-10)' : 'none' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textAlign: 'center', minWidth: 44 }}>
              <div style={{ fontSize: 22, lineHeight: 1 }}>{it.date}</div>
              <div style={{ fontSize: 10, letterSpacing: '0.08em', color: 'var(--ink-60)', textTransform: 'uppercase', marginTop: 2 }}>{it.mo}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{it.name} · {it.trade}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-60)', marginTop: 2 }}>{it.sub}</div>
            </div>
            <div>
              <span style={{
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11,
                padding: '3px 9px', borderRadius: 999,
                background: it.stClass === 'ok' ? 'var(--success-tint)' : it.stClass === 'pend' ? 'var(--warn-tint)' : 'var(--danger-tint)',
                color: it.stClass === 'ok' ? 'var(--success)' : it.stClass === 'pend' ? '#8E5D00' : 'var(--danger)',
              }}>{it.status}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, fontVariantNumeric: 'tabular-nums' }}>
              <span style={{ fontSize: 10, color: 'var(--ink-60)', marginRight: 2 }}>Rs</span>{it.price.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <TabBar active={tab} onChange={onTab} />
    </div>
  );
}

// ===== RATING SCREEN =====
function RatingScreen({ worker, onSubmit, onBack }) {
  const w = worker || WORKERS[0];
  const [stars, setStars] = useState(5);
  const [tag, setTag] = useState('On time');
  const [note, setNote] = useState('');
  return (
    <div className="em-app">
      <Header onBack={onBack} title="Rate your mistri" />
      <div className="em-body">
        <div style={{ textAlign: 'center', padding: '24px 20px 16px' }}>
          <div style={{ width: 72, height: 72, margin: '0 auto 12px', borderRadius: 999, background: 'var(--ink)', color: 'var(--kraft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28 }}>{w.initials}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24 }}>{w.name}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-60)', marginTop: 2 }}>How was the {w.trade.toLowerCase()} job?</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
            <StarRating value={stars} onChange={setStars} />
          </div>
        </div>
        <div className="em-section"><div className="eyebrow">What stood out?</div></div>
        <div style={{ padding: '0 20px 16px' }}>
          <Chips items={['On time', 'Polite', 'Tidy work', 'Fair price', 'Brought own tools']} value={tag} onChange={setTag} />
        </div>
        <div className="em-section"><div className="eyebrow">Notes (optional)</div></div>
        <div style={{ padding: '0 20px' }}>
          <textarea
            value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="Anything you want admins or other customers to know"
            style={{ width: '100%', minHeight: 80, padding: 12, border: '1px solid var(--slate-300)', borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: 14, resize: 'vertical', outline: 'none' }}
          />
        </div>
      </div>
      <div className="em-cta-bar">
        <button className="em-btn em-btn-primary em-btn-block" onClick={onSubmit}>Submit rating</button>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, ServiceListScreen, WorkerDetailScreen, PaymentScreen, ConfirmScreen, BookingsScreen, RatingScreen });
