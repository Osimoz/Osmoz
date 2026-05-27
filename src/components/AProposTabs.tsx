import { Link, useLocation } from 'react-router-dom';

export default function AProposTabs() {
  const { pathname } = useLocation();

  const tabs = [
    { label: 'Nos engagements', to: '/rse' },
    { label: 'FAQ', to: '/questions-frequentes' },
  ];

  return (
    <div style={{
      background: '#fafaf8',
      borderBottom: '1px solid rgba(28,28,26,0.08)',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '72px',
    }}>
      {tabs.map(tab => {
        const active = pathname === tab.to;
        return (
          <Link
            key={tab.to}
            to={tab.to}
            style={{
              padding: '16px 36px',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 400,
              textDecoration: 'none',
              color: active ? '#862637' : '#9b9690',
              borderBottom: active ? '2px solid #862637' : '2px solid transparent',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = '#01142a'; }}
            onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = '#9b9690'; }}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
