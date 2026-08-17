import React, { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

// SVG paths below are from Kong/icons (svg/solid), kept inline so this React
// prototype can use the official assets without pulling in the Vue-only package.
const Icon = ({ name, size = 20, className = '' }) => {
  const paths = {
    search: <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" />,
    help: <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm-.95-7.85h1.85c0-1.1.42-1.93 1.25-2.6.83-.72 1.25-1.6 1.25-2.65 0-.93-.34-1.65-1.03-2.15-.68-.5-1.48-.75-2.42-.75-.95 0-1.72.25-2.32.75-.59.5-1 1.1-1.23 1.8l1.65.65c.08-.3.27-.63.56-.98.3-.35.74-.52 1.34-.52.53 0 .93.15 1.2.44.27.29.4.61.4.96 0 .33-.1.65-.3.94-.2.29-.45.56-.75.81-.73.65-1.18 1.14-1.35 1.48-.17.33-.25.94-.25 1.82ZM12 18c.35 0 .65-.12.9-.36.24-.24.36-.54.36-.89s-.12-.65-.36-.89a1.22 1.22 0 0 0-.9-.36c-.35 0-.65.12-.9.36-.24.24-.36.54-.36.89s.12.65.36.89c.25.24.55.36.9.36Z" />,
    bell: <path d="M5 19a1 1 0 0 1-1-1 1 1 0 0 1 1-1h1v-7c0-1.38.42-2.61 1.25-3.69A6.5 6.5 0 0 1 10.5 4.2v-.7c0-.42.15-.77.44-1.06.29-.3.65-.44 1.06-.44s.77.15 1.06.44c.3.29.44.64.44 1.06v.7a6.5 6.5 0 0 1 3.25 2.11A5.9 5.9 0 0 1 18 10v7h1a1 1 0 0 1 1 1 1 1 0 0 1-1 1H5Zm7 3c-.55 0-1.02-.2-1.41-.59A1.93 1.93 0 0 1 10 20h4c0 .55-.2 1.02-.59 1.41-.39.39-.86.59-1.41.59Z" />,
    overview: <path fillRule="evenodd" d="m9.924 2.4-4.164 7.2h12.48L12 20.4 5.76 9.6l-4.248 7.368L3.672 20.4H21.24l1.608-2.808L14.088 2.4H9.912h.012Z" />,
    gateway: <path d="M12 21v-2h7V5h-7V3h7c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-7Zm-2-4-1.375-1.45L11.175 13H3v-2h8.175L8.625 8.45 10 7l5 5-5 5Z" />,
    event: <path fillRule="evenodd" d="M21 12h-9V3h9v9ZM9.534 15.534V9H3v6.534h6.534ZM16.997 15v5.199h-5.199V15h5.199Z" />,
    ai: <path d="M4 15c-1.67 0-3-1.33-3-3s1.33-3 3-3V7c0-1.1.9-2 2-2h3c0-1.67 1.33-3 3-3s3 1.33 3 3h3c1.1 0 2 .9 2 2v2c1.67 0 3 1.33 3 3s-1.33 3-3 3v4c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-4Zm5-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM8 17h8v-2H8v2Z" />,
    mesh: <path d="M6 20a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm12 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm-6-10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />,
    portal: <path fillRule="evenodd" d="M12 2.4h6.732L21.6 5.676v13.056L18.324 21.6H5.268L2.4 18.324V5.268L5.676 2.4H12Zm4.272 9.6a4.27 4.27 0 1 0-8.532 0 4.27 4.27 0 0 0 8.532 0Z" />,
    dollar: <path d="M12.025 21a1 1 0 0 1-1-1v-1.15c-.75-.17-1.408-.46-1.975-.875a4.03 4.03 0 0 1-1.375-1.75.9.9 0 0 1 .575-1.3.96.96 0 0 1 1.3.55c.28.5.64.88 1.075 1.14.43.25.97.38 1.6.38.68 0 1.26-.15 1.74-.46.47-.31.71-.79.71-1.44 0-.58-.18-1.05-.55-1.39-.37-.34-1.22-.73-2.55-1.16-1.43-.45-2.42-.99-2.95-1.61a3.4 3.4 0 0 1-.8-2.29c0-1.08.35-1.92 1.05-2.52.7-.6 1.42-.95 2.15-1.03V4a1 1 0 1 1 2 0v1.1c1.14.18 2.07.76 2.8 1.75.15.22.18.46.09.73a.94.94 0 0 1-.56.57.91.91 0 0 1-.73.01 1.65 1.65 0 0 1-.7-.49 2.6 2.6 0 0 0-1.85-.72c-.73 0-1.29.16-1.67.49-.38.32-.58.73-.58 1.21 0 .55.25.98.75 1.3.5.31 1.37.65 2.6 1 1.15.33 2.02.86 2.61 1.59.59.72.89 1.56.89 2.51 0 1.18-.35 2.08-1.05 2.7-.7.61-1.57 1-2.6 1.15V20a1 1 0 0 1-1 1Z" />,
    chart: <path d="M7 17h2v-5H7v5Zm8 0h2V7h-2v10Zm-4 0h2v-3h-2v3Zm0-5h2v-2h-2v2ZM5 21c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5Zm0-2h14V5H5v14Z" />,
    identity: <path d="M7 18a6 6 0 1 1 5.2-9h8.8l3 3-4.5 4.5-2-1.5-2 1.5-2.125-1.5H12.2A6 6 0 0 1 7 18Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />,
    organization: <path d="M2 21V3h10v4h10v14H2Zm2-2h6v-2H4v2Zm0-4h6v-2H4v2Zm0-4h6V9H4v2Zm0-4h6V5H4v2Zm8 12h8V9h-8v10Zm2-6v-2h4v2h-4Zm0 4v-2h4v2h-4Z" />,
    chevron: <path d="m12 15.4-6-6L7.4 8l4.6 4.6L16.6 8 18 9.4l-6 6Z" />,
    close: <path d="m6.4 19-1.4-1.4 5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19Z" />,
    clear: <path d="m8.4 17 3.6-3.6 3.6 3.6 1.4-1.4-3.6-3.6L17 8.4 15.6 7 12 10.6 8.4 7 7 8.4l3.6 3.6L7 15.6 8.4 17ZM12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" />,
    external: <path d="M5 21c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h7v2H5v14h14v-7h2v7c0 1.1-.9 2-2 2H5Zm4.7-5.3-1.4-1.4L17.6 5H14V3h7v7h-2V6.4l-9.3 9.3Z" />,
    info: <path d="M11 17h2v-6h-2v6Zm1-8c.28 0 .52-.1.71-.29.2-.19.29-.43.29-.71s-.1-.52-.29-.71A.97.97 0 0 0 12 7c-.28 0-.52.1-.71.29A.97.97 0 0 0 11 8c0 .28.1.52.29.71.19.2.43.29.71.29Zm0 13a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" />,
    filter: <path d="M10 18v-2h4v2h-4ZM6 13v-2h12v2H6ZM3 8V6h18v2H3Z" />,
    more: <path d="M12 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />,
    check: <path d="m9.7 18.025-5.7-5.7L5.425 10.9 9.7 15.175 18.875 6 20.3 7.425 9.7 18.025Z" />,
    checkCircle: <path d="m10.6 16.6 7.05-7.05-1.4-1.4-5.65 5.65-2.85-2.85-1.4 1.4 4.25 4.25ZM12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" />,
    warning: <path d="M12.025 22.05c-.267 0-.521-.05-.763-.15a2.4 2.4 0 0 1-.662-.425L2.575 13.45a2.4 2.4 0 0 1-.425-.663A1.9 1.9 0 0 1 2 12.025c0-.267.05-.525.15-.775.1-.25.242-.467.425-.65L10.6 2.575c.2-.2.42-.346.663-.438A1.9 1.9 0 0 1 12.025 2c.267 0 .525.046.775.138.25.092.467.237.65.437l8.025 8.025c.2.183.346.4.438.65.091.25.137.508.137.775 0 .267-.046.52-.138.763a2.4 2.4 0 0 1-.437.662l-8.025 8.025c-.183.183-.4.325-.65.425-.25.1-.508.15-.775.15Zm-1-9.025h2v-6h-2v6Zm1 3c.283 0 .52-.096.712-.288a.97.97 0 0 0 .288-.712.97.97 0 0 0-.288-.712.97.97 0 0 0-.712-.288.97.97 0 0 0-.712.288.97.97 0 0 0-.288.712c0 .283.096.52.288.712.192.192.429.288.712.288Z" />,
  }
  return <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{paths[name]}</svg>
}

function Toggle({ active, disabled = false, onClick }) {
  return <button aria-disabled={disabled} aria-pressed={active} className={`toggle ${active ? 'toggle--active' : ''} ${disabled ? 'toggle--disabled' : ''}`} onClick={onClick}><span /></button>
}

function SideItem({ icon, children, active, badge }) {
  return <div className={`side-item ${active ? 'side-item--active' : ''}`}><Icon name={icon} size={24} /><span>{children}</span>{badge && <b>{badge}</b>}</div>
}

function App() {
  const [konnectMapping, setKonnectMapping] = useState(true)
  const [connectivityOpen, setConnectivityOpen] = useState(true)
  const [providerOpen, setProviderOpen] = useState(false)
  const [provider, setProvider] = useState(null)
  const [idpMappingEnabled, setIdpMappingEnabled] = useState(true)
  const [mappingAlertVisible, setMappingAlertVisible] = useState(false)
  const [teamFilter, setTeamFilter] = useState('')
  const [mapGroupsTeam, setMapGroupsTeam] = useState(null)
  const [selectedGroups, setSelectedGroups] = useState([])
  const [groupQuery, setGroupQuery] = useState('')
  const [availableGroups, setAvailableGroups] = useState([])
  const groupPickerRef = useRef(null)
  const groupInputRef = useRef(null)
  const [groupPickerOpen, setGroupPickerOpen] = useState(false)
  const [mappedGroups, setMappedGroups] = useState({})
  const [teamActionsOpen, setTeamActionsOpen] = useState(null)
  const [clearMappingTeam, setClearMappingTeam] = useState(null)
  const [oidcSlideoutOpen, setOidcSlideoutOpen] = useState(false)
  const [oidcSlideoutClosing, setOidcSlideoutClosing] = useState(false)
  const [providerToConfigure, setProviderToConfigure] = useState('OIDC')
  const [advancedOpen, setAdvancedOpen] = useState(true)
  const [toast, setToast] = useState({ visible: false, message: '' })
  const toastTimerRef = useRef(null)
  const [oidcForm, setOidcForm] = useState({
    issuerUri: '',
    clientId: '',
    clientSecret: '',
    organizationLoginPath: '',
    scopes: '',
    nameClaim: 'name',
    emailClaim: 'email',
    groupsClaim: 'groups',
  })
  const oidcReady = ['issuerUri', 'clientId', 'clientSecret', 'organizationLoginPath'].every((field) => oidcForm[field].trim())
  const teams = [
    { name: 'Engineering', description: 'Our engineering team is a diverse group of skilled professionals dedicated to designing great products.' },
    { name: 'Design', description: '' },
    { name: 'Analytics', description: 'Very long team descriptions are truncated at one line' },
  ]
  const filteredTeams = teams.filter((team) => team.name.toLowerCase().includes(teamFilter.toLowerCase()))
  const hasMappedTeams = Object.values(mappedGroups).some((groups) => groups.length > 0)
  const isLastTeamMapping = Boolean(clearMappingTeam) && Object.values(mappedGroups).filter((groups) => groups.length > 0).length === 1
  const updateOidcField = (field, value) => setOidcForm((form) => ({ ...form, [field]: value }))
  const showToast = (message) => {
    window.clearTimeout(toastTimerRef.current)
    setToast({ visible: true, message })
    toastTimerRef.current = window.setTimeout(() => setToast((currentToast) => ({ ...currentToast, visible: false })), 5000)
  }
  const openOidcSlideout = () => {
    setOidcSlideoutClosing(false)
    setOidcSlideoutOpen(true)
  }
  const closeOidcSlideout = () => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setOidcSlideoutOpen(false)
      setOidcSlideoutClosing(false)
      return
    }
    setOidcSlideoutClosing(true)
  }
  const saveOidc = () => {
    setProvider('OIDC')
    setIdpMappingEnabled(false)
    setMappingAlertVisible(false)
    closeOidcSlideout()
    showToast('OIDC configured')
  }
  const autofillOidc = () => {
    setOidcForm({
      issuerUri: 'https://dev-123456789.okta.com/oauth2/default',
      clientId: '0oa123exampleABC456',
      clientSecret: 'testing-client-secret',
      organizationLoginPath: 'kong-air',
      scopes: 'openid',
      nameClaim: 'name',
      emailClaim: 'email',
      groupsClaim: 'groups',
    })
    setAdvancedOpen(true)
  }
  const openMapGroups = (team) => {
    setMapGroupsTeam(team)
    setSelectedGroups(mappedGroups[team.name] || [])
    setGroupQuery('')
    setGroupPickerOpen(false)
  }
  const saveGroups = () => {
    if (!mapGroupsTeam || selectedGroups.length === 0) return
    setMappedGroups((groups) => ({ ...groups, [mapGroupsTeam.name]: selectedGroups }))
    setMappingAlertVisible(false)
    setMapGroupsTeam(null)
    showToast('Team mapped')
  }
  const addGroup = (group) => {
    const value = group.trim()
    if (!value) return
    setAvailableGroups((groups) => groups.includes(value) ? groups : [...groups, value])
    setSelectedGroups((groups) => groups.includes(value) ? groups : [...groups, value])
    setGroupQuery('')
    setGroupPickerOpen(true)
    window.requestAnimationFrame(() => groupInputRef.current?.focus())
  }
  const clearMapping = (teamName) => {
    const updatedGroups = { ...mappedGroups }
    delete updatedGroups[teamName]
    setMappedGroups(updatedGroups)
    setIdpMappingEnabled(Object.values(updatedGroups).some((groups) => groups.length > 0))
    setTeamActionsOpen(null)
    showToast('Team mapping cleared')
  }
  const openGroupPicker = () => {
    setGroupPickerOpen(true)
    window.requestAnimationFrame(() => groupInputRef.current?.focus())
  }
  const toggleGroupPicker = () => setGroupPickerOpen((open) => !open)
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        closeOidcSlideout()
        setMapGroupsTeam(null)
        setClearMappingTeam(null)
      }
    }
    if (oidcSlideoutOpen || mapGroupsTeam) window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [oidcSlideoutOpen, mapGroupsTeam, clearMappingTeam])
  useEffect(() => {
    if (!groupPickerOpen) return undefined
    const closeOnOutsideClick = (event) => {
      if (!groupPickerRef.current?.contains(event.target)) setGroupPickerOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [groupPickerOpen])
  useEffect(() => () => window.clearTimeout(toastTimerRef.current), [])
  const navItems = ['Overview', 'Published APIs', 'Portal editor', 'Developers', 'Applications', 'Settings']

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><span className="brand-mark">◆</span><span>KONNECT</span></div>
      <div className="search"><Icon name="search" size={25} /><span>Quick search...</span><kbd>⌘K</kbd></div>
      <div className="header-actions"><Icon name="help" size={27} /><div className="notification"><Icon name="bell" size={27} /><i /></div><div className="avatar">ww</div></div>
    </header>
    <aside className="sidebar">
      <div className="sidebar-scroll">
        <SideItem icon="overview">Overview</SideItem>
        <button aria-expanded={connectivityOpen} className="nav-section connectivity-toggle" onClick={() => setConnectivityOpen((open) => !open)} type="button">CONNECTIVITY <Icon className={connectivityOpen ? 'chevron-open' : ''} name="chevron" size={18} /></button>
        {connectivityOpen && <><SideItem icon="gateway">API Gateway</SideItem><SideItem icon="event">Event Gateway</SideItem><SideItem icon="ai">AI Gateway</SideItem><SideItem icon="mesh">Service Mesh</SideItem></>}
        <div className="nav-section applications">APPLICATIONS</div>
        <div className="portal-nav">
          <div className="portal-title"><Icon name="portal" size={25} /><div><strong>Dev Portal</strong><span>Kong Air</span></div></div>
          <div className="portal-links">{navItems.map(item => <div className={item === 'Settings' ? 'portal-link selected' : 'portal-link'} key={item}>{item}{item === 'Developers' && <b>1</b>}{item === 'Applications' && <b>4</b>}</div>)}</div>
        </div>
        <SideItem icon="dollar">Metering &amp; Billing</SideItem>
        <SideItem icon="chart">Observability</SideItem>
        <SideItem icon="identity">Identity</SideItem>
        <div className="sidebar-divider" />
        <SideItem icon="organization">Organization</SideItem>
      </div>
      <div className="sidebar-bottom"><div className="sidebar-footer-item"><span className="org-avatar">A</span> Acme Inc.<Icon name="chevron" size={20} /></div><div className="sidebar-footer-item"><span className="flag">🇺🇸</span> US (North America)<Icon name="chevron" size={20} /></div></div>
    </aside>
    <main className="main-content">
      <div className="page-header"><div className="breadcrumbs"><Icon className="crumb-icon" name="portal" size={18} /><a href="#dev-portal">Dev Portal</a><span>/</span><a href="#portals">Portals</a><span>/</span><a href="#kongair-partner-program">KongAir partner program</a><span>/</span></div><h1>Settings</h1><nav className="tabs">{['General', 'Custom domain', 'Security', 'Integrations', 'Team mapping', 'Audit logs'].map(tab => <button className={tab === 'Team mapping' ? 'active' : ''} key={tab}><span>{tab}</span></button>)}</nav></div>
      <div className="content">
        <section className="tile simple-tile"><div><h2>Konnect mapping</h2><p>Manage Developer Portal team memberships with Konnect.</p></div><Toggle active={konnectMapping} onClick={() => setKonnectMapping(!konnectMapping)} /></section>
        <section className="tile idp-tile">
          <div className="tile-heading idp-heading">
            <div><h2>Identity provider mapping</h2><p>Manage Developer Portal team memberships with your identity provider. Team memberships are assigned on SSO login.</p></div>
            {provider && <Toggle active={idpMappingEnabled} disabled={!hasMappedTeams} onClick={() => {
              if (!hasMappedTeams) {
                setMappingAlertVisible(true)
                return
              }
              const nextEnabled = !idpMappingEnabled
              setIdpMappingEnabled(nextEnabled)
              showToast(`Identity provider mapping ${nextEnabled ? 'enabled' : 'disabled'}`)
            }} />}
          </div>
          <div className="idp-body">
            {provider === 'OIDC' && mappingAlertVisible && !hasMappedTeams && <div className="mapping-required-alert" role="alert"><Icon name="clear" size={20} /><span>At least one team mapping group is required.</span><button aria-label="Dismiss mapping requirement" onClick={() => setMappingAlertVisible(false)} type="button"><Icon name="close" size={20} /></button></div>}
            {provider === 'OIDC' ? <div className="team-mapping-table">
              <div className="team-filter"><Icon name="filter" size={24} /><input aria-label="Filter by Dev Portal team name" onChange={(event) => setTeamFilter(event.target.value)} placeholder="Filter by Dev Portal team name" value={teamFilter} /></div>
              <div className="team-table-header"><span>Team</span><span>Identity provider groups</span></div>
              <div className="team-table-rows">
                {filteredTeams.map((team) => <div className="team-table-row" key={team.name}>
                  <div><strong>{team.name}</strong>{team.description && <p title={team.description}>{team.description}</p>}</div>
                  {mappedGroups[team.name]?.length ? <div className="mapped-group-cell">
                    <div className="mapped-group-list">{mappedGroups[team.name].map((group) => <span key={group}>{group}</span>)}</div>
                    <div className="team-actions-menu">
                      <button aria-expanded={teamActionsOpen === team.name} aria-label={`Actions for ${team.name}`} className="team-more-button" onClick={() => setTeamActionsOpen((open) => open === team.name ? null : team.name)} type="button"><Icon name="more" size={20} /></button>
                      {teamActionsOpen === team.name && <div className="team-actions-dropdown">
                        <button onClick={() => { openMapGroups(team); setTeamActionsOpen(null) }} type="button">Edit mapping</button>
                        <button className="clear-mapping-menu-item" onClick={() => { setClearMappingTeam(team); setTeamActionsOpen(null) }} type="button">Clear mapping</button>
                      </div>}
                    </div>
                  </div> : <button className="tertiary-button" onClick={() => openMapGroups(team)} type="button">Map groups</button>}
                </div>)}
              </div>
            </div> : <div className="setup-card">
              <h3>{provider ? `${provider} identity provider` : 'Set up an identity provider'}</h3>
              <p>{provider ? 'Identity provider configuration is ready for team mapping.' : 'Configure an OIDC or SAML provider to enable team mapping.'}</p>
              <div className="provider-control">
                <button onClick={() => setProviderOpen(!providerOpen)}>{provider ? `Configure ${provider}` : 'Configure an identity provider'} <Icon className={providerOpen ? 'chevron-open' : ''} name="chevron" size={20} /></button>
                {providerOpen && <div className="provider-menu"><button onClick={() => { setProviderToConfigure('OIDC'); setProviderOpen(false); openOidcSlideout() }}>OIDC</button><button onClick={() => { setProviderToConfigure('SAML'); setProviderOpen(false); openOidcSlideout() }}>SAML</button></div>}
              </div>
            </div>}
            {provider === 'OIDC' && <div className="team-pagination"><span><strong>1 to {filteredTeams.length}</strong> of {filteredTeams.length}</span><div className="page-controls"><button disabled>←</button><button className="current-page">1</button><button disabled>→</button></div><button className="page-size">15 items per page <Icon name="chevron" size={20} /></button></div>}
          </div>
        </section>
      </div>
    </main>
    {oidcSlideoutOpen && <div className="slideout-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) closeOidcSlideout() }}>
      {providerToConfigure === 'OIDC' && !oidcSlideoutClosing && <button className="autofill-button" onClick={autofillOidc} type="button">Autofill</button>}
      <aside className={`oidc-slideout ${oidcSlideoutClosing ? 'oidc-slideout--closing' : ''}`} aria-labelledby="oidc-slideout-title" aria-modal="true" onAnimationEnd={(event) => { if (event.target === event.currentTarget && oidcSlideoutClosing) { setOidcSlideoutOpen(false); setOidcSlideoutClosing(false) } }} role="dialog">
        <header className="slideout-header"><h2 id="oidc-slideout-title">{providerToConfigure === 'OIDC' ? 'Configure OAuth2.0 and OpenID Connect' : 'Configure SAML'}</h2><button aria-label="Close slideout" className="slideout-close" onClick={closeOidcSlideout}><Icon name="close" size={24} /></button></header>
        <div className="slideout-body">
          <p className="slideout-intro">Manage the identity provider used for authenticating users with {providerToConfigure}. <a href="#oidc-documentation" onClick={(event) => event.preventDefault()}>Learn more <Icon name="external" size={18} /></a></p>
          {providerToConfigure === 'OIDC' ? <><label className="slideout-field required"><span>Issuer URI</span><input value={oidcForm.issuerUri} onChange={(event) => updateOidcField('issuerUri', event.target.value)} placeholder="https://dev-123456789.okta.com/oauth2/default" /><small>Enter the base URL for your OIDC authorization server.</small></label>
          <label className="slideout-field required"><span>Client ID</span><input value={oidcForm.clientId} onChange={(event) => updateOidcField('clientId', event.target.value)} placeholder="0oa123exampleABC456" /><small>Use the client ID issued for this application by your identity provider.</small></label>
          <label className="slideout-field required"><span>Client secret</span><input type="password" value={oidcForm.clientSecret} onChange={(event) => updateOidcField('clientSecret', event.target.value)} placeholder="Enter client secret" /><small>Use the client secret associated with this OIDC application.</small></label>
          <label className="slideout-field required"><span>Organization login path</span><input value={oidcForm.organizationLoginPath} onChange={(event) => updateOidcField('organizationLoginPath', event.target.value)} placeholder="kong-air" /><small>The path users visit to sign in to this organization.</small></label>
          <section className="advanced-settings">
            <button aria-expanded={advancedOpen} className="advanced-toggle" onClick={() => setAdvancedOpen(!advancedOpen)}><span>Advanced settings</span><Icon className={advancedOpen ? 'chevron-open' : ''} name="chevron" size={20} /></button>
            {advancedOpen && <div className="advanced-content">
              <label className="slideout-field"><span>Scopes <Icon name="info" size={18} /></span><select value={oidcForm.scopes} onChange={(event) => updateOidcField('scopes', event.target.value)}><option value="">Select scopes</option><option value="openid">openid</option><option value="email">email</option><option value="profile">profile</option></select></label>
              <div className="claim-mappings"><span>Claim mappings <Icon name="info" size={18} /></span><div className="claim-fields"><label className="slideout-field"><span>Name</span><input value={oidcForm.nameClaim} onChange={(event) => updateOidcField('nameClaim', event.target.value)} /></label><label className="slideout-field"><span>Email</span><input value={oidcForm.emailClaim} onChange={(event) => updateOidcField('emailClaim', event.target.value)} /></label><label className="slideout-field"><span>Groups</span><input value={oidcForm.groupsClaim} onChange={(event) => updateOidcField('groupsClaim', event.target.value)} /></label></div></div>
            </div>}
          </section></> : <p className="slideout-intro">SAML configuration will be available in this slideout.</p>}
        </div>
        <footer className="slideout-footer">{providerToConfigure === 'OIDC' && <button className="slideout-save" disabled={!oidcReady} onClick={saveOidc}>Save</button>}<button className="slideout-cancel" onClick={closeOidcSlideout}>Cancel</button></footer>
      </aside>
    </div>}
    {mapGroupsTeam && <div className="modal-overlay">
      <section aria-labelledby="map-groups-title" aria-modal="true" className="map-groups-modal" role="dialog">
        <header className="map-groups-header"><h2 id="map-groups-title">Map groups</h2><button aria-label="Close map groups" className="map-groups-close" onClick={() => setMapGroupsTeam(null)}><Icon name="close" size={20} /></button></header>
        <div className="map-groups-body">
          <p>Map your identity provider groups to <strong>{mapGroupsTeam.name}</strong></p>
          <div className="map-groups-field">
            <span id="identity-provider-group-label">Identity provider group name(s)</span>
            <div className="group-picker" ref={groupPickerRef}>
              <div
                aria-expanded={groupPickerOpen}
                aria-labelledby="identity-provider-group-label"
                className="group-multiselect"
                onClick={(event) => {
                  if (!event.target.closest('.selected-group-chip button, .group-picker-toggle')) openGroupPicker()
                }}
                role="combobox"
              >
                {selectedGroups.map((group) => <span className="selected-group-chip" key={group}>{group}<button aria-label={`Remove ${group}`} onClick={(event) => { event.stopPropagation(); setSelectedGroups((groups) => groups.filter((item) => item !== group)) }} type="button"><Icon name="close" size={16} /></button></span>)}
                <input
                  aria-label="Filter or enter an identity provider group"
                  className="group-search"
                  onChange={(event) => setGroupQuery(event.target.value)}
                  onFocus={openGroupPicker}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && groupQuery.trim()) {
                      event.preventDefault()
                      addGroup(groupQuery)
                    }
                    if (event.key === 'Escape') setGroupPickerOpen(false)
                  }}
                  placeholder={selectedGroups.length === 0 ? 'Enter or select a group' : ''}
                  ref={groupInputRef}
                  value={groupQuery}
                />
                <button aria-label="Select an identity provider group" className="group-picker-toggle" onClick={(event) => { event.stopPropagation(); toggleGroupPicker() }} type="button"><Icon className={groupPickerOpen ? 'chevron-open' : ''} name="chevron" size={20} /></button>
              </div>
              {groupPickerOpen && <div className="group-options">
                {availableGroups.filter((group) => group.toLowerCase().includes(groupQuery.toLowerCase())).map((group) => <button key={group} onClick={() => addGroup(group)} type="button">{group}</button>)}
                {groupQuery.trim() && !availableGroups.includes(groupQuery.trim()) ? <button onClick={() => addGroup(groupQuery)} type="button">{groupQuery.trim()} (Add new value)</button> : availableGroups.length === 0 && <p className="group-empty">No values found. Enter a new value.</p>}
              </div>}
            </div>
            <small>Enter one or more group names as defined in your identity provider. These are typically sent in the group claim during SSO.</small>
          </div>
        </div>
        <footer className="map-groups-footer"><button className="map-groups-cancel" onClick={() => setMapGroupsTeam(null)} type="button">Cancel</button><button className="map-groups-save" disabled={selectedGroups.length === 0} onClick={saveGroups} type="button">Save</button></footer>
      </section>
    </div>}
    {clearMappingTeam && <div className="modal-overlay">
      <section aria-labelledby="clear-mapping-title" aria-modal="true" className="map-groups-modal clear-mapping-modal" role="dialog">
        <header className="map-groups-header"><h2 id="clear-mapping-title">Clear mapping?</h2><button aria-label="Close clear mapping" className="map-groups-close" onClick={() => setClearMappingTeam(null)}><Icon name="close" size={20} /></button></header>
        <div className="map-groups-body"><p className="clear-mapping-message">Clearing this team’s mapping will remove all associated identity provider groups, unlinking the team from your identity provider.</p>{isLastTeamMapping && <div className="clear-mapping-alert" role="alert"><Icon name="warning" size={20} /><span>Identity provider mapping will be turned off because at least one team must be mapped to keep it enabled.</span></div>}</div>
        <footer className="map-groups-footer"><button className="map-groups-cancel" onClick={() => setClearMappingTeam(null)} type="button">Cancel</button><button className="clear-mapping-button" onClick={() => { clearMapping(clearMappingTeam.name); setClearMappingTeam(null) }} type="button">Clear mapping</button></footer>
      </section>
    </div>}
    {toast.visible && <div className="success-toast" role="status"><span className="success-toast-icon"><Icon name="checkCircle" size={24} /></span><span>{toast.message}</span><button aria-label="Dismiss notification" onClick={() => setToast((currentToast) => ({ ...currentToast, visible: false }))} type="button"><Icon name="close" size={20} /></button></div>}
    <div className="desktop-layout-overlay" role="alert"><div><h2>Desktop layout required</h2><p>This prototype is designed for desktop screens. Resize your window to at least 700px wide to view the layout; it is not optimized or intended for mobile.</p></div></div>
  </div>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
