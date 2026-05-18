import { useEffect, useRef, useState } from 'react'
import './style.css'

const defaultSettings = {
  sound: true,
  volume: 70,
  vibration: true,
  showSoldierLevel: true,
  showLevelValue: true,
}

function ToggleSwitch({ checked, label, onChange }) {
  return (
    <button
      type="button"
      className={`toggle-switch ${checked ? 'is-on' : 'is-off'}`}
      aria-label={`${label}${checked ? '开启' : '关闭'}`}
      aria-pressed={checked}
      onClick={onChange}
    >
      <span className="toggle-text">{checked ? 'ON' : 'OFF'}</span>
      <span className="toggle-knob" />
    </button>
  )
}

function VolumeSlider({ value, onChange }) {
  return (
    <div className="volume-control">
      <input
        className="volume-slider"
        type="range"
        min="0"
        max="100"
        value={value}
        aria-label="音量"
        style={{ '--volume': `${value}%` }}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span className="volume-value">{value}</span>
    </div>
  )
}

function GameButton({ children, variant = 'green', onClick, className = '' }) {
  return (
    <button
      type="button"
      className={`game-button ${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function SettingRow({ icon, label, children }) {
  return (
    <div className="setting-row">
      <IconBadge type={icon} />
      <span className="setting-label">{label}</span>
      <div className="setting-control">{children}</div>
    </div>
  )
}

function IconBadge({ type }) {
  const common = {
    className: 'icon-svg',
    viewBox: '0 0 96 96',
    role: 'img',
    'aria-hidden': 'true',
  }

  if (type === 'sound') {
    return (
      <span className="icon-badge">
        <svg {...common}>
          <path className="icon-shadow" d="M15 39h17l24-20v58L32 57H15z" />
          <path className="icon-cream" d="M15 37h18l23-20v58L33 55H15z" />
          <path className="icon-line" d="M15 37h18l23-20v58L33 55H15z" />
          <path className="icon-line" d="M68 33c8 8 8 22 0 30" />
          <path className="icon-line" d="M78 22c15 16 15 36 0 52" />
        </svg>
      </span>
    )
  }

  if (type === 'volume') {
    return (
      <span className="icon-badge">
        <svg {...common}>
          <path className="icon-cream" d="M13 42h15l22-17v46L28 54H13z" />
          <path className="icon-line" d="M13 42h15l22-17v46L28 54H13z" />
          <rect className="bar green" x="60" y="21" width="18" height="12" rx="5" />
          <rect className="bar green" x="60" y="39" width="18" height="12" rx="5" />
          <rect className="bar yellow" x="60" y="57" width="18" height="12" rx="5" />
          <rect className="bar gray" x="60" y="75" width="18" height="12" rx="5" />
        </svg>
      </span>
    )
  }

  if (type === 'vibration') {
    return (
      <span className="icon-badge">
        <svg {...common}>
          <path className="icon-line" d="M18 30c-7 8-7 28 0 36M8 22c-10 17-10 35 0 52M78 30c7 8 7 28 0 36M88 22c10 17 10 35 0 52" />
          <rect className="phone-body" x="32" y="17" width="32" height="62" rx="7" />
          <path className="phone-glow" d="M39 25h18v6H39z" />
          <path className="icon-line" d="M42 49h12M48 43v12" />
          <circle className="red-dot" cx="58" cy="64" r="5" />
        </svg>
      </span>
    )
  }

  if (type === 'soldier') {
    return (
      <span className="icon-badge">
        <svg {...common}>
          <path className="shield" d="M17 26l31-13 31 13v25c0 18-13 29-31 36-18-7-31-18-31-36z" />
          <path className="helmet" d="M25 40c4-19 16-27 33-21 9 4 15 11 17 21l-9 6H34z" />
          <path className="helmet-spot" d="M56 24c7 1 12 5 14 11-7-1-12-4-14-11z" />
          <circle className="face" cx="49" cy="50" r="18" />
          <path className="icon-line thin" d="M39 49l7-3M58 46l7 3" />
          <path className="mouth" d="M45 59c3 3 7 3 10 0" />
          <path className="star" d="M22 70l4 8 9 1-7 6 2 8-8-4-8 4 2-8-7-6 9-1z" />
          <path className="star" d="M48 69l4 8 9 1-7 6 2 8-8-4-8 4 2-8-7-6 9-1z" />
          <path className="star" d="M74 70l4 8 9 1-7 6 2 8-8-4-8 4 2-8-7-6 9-1z" />
        </svg>
      </span>
    )
  }

  return (
    <span className="icon-badge">
      <svg {...common}>
        <path className="level-plate" d="M12 31c2-11 10-16 22-16h28c12 0 20 5 22 16v22c0 15-13 26-36 34C25 79 12 68 12 53z" />
        <rect className="level-screen" x="20" y="25" width="56" height="34" rx="9" />
        <text className="level-text" x="28" y="50">Lv.20</text>
        <path className="star" d="M27 62l4 8 9 1-7 6 2 8-8-4-8 4 2-8-7-6 9-1z" />
        <path className="star" d="M49 62l4 8 9 1-7 6 2 8-8-4-8 4 2-8-7-6 9-1z" />
        <path className="star" d="M71 62l4 8 9 1-7 6 2 8-8-4-8 4 2-8-7-6 9-1z" />
      </svg>
    </span>
  )
}

function CloseButton({ onClick }) {
  return (
    <button type="button" className="close-button" aria-label="关闭设置" onClick={onClick}>
      <span />
      <span />
    </button>
  )
}

function ScenicBackground() {
  return (
    <>
      <div className="sun" />
      <div className="cloud cloud-one" />
      <div className="cloud cloud-two" />
      <div className="mountains">
        <span />
        <span />
        <span />
      </div>
      <div className="bushes">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="stones">
        <span />
        <span />
        <span />
      </div>
    </>
  )
}

function SettingsPanel({ settings, onToggle, onVolumeChange, onReset, onSave, onClose, showToast }) {
  return (
    <section className="settings-panel" aria-label="游戏设置">
      <header className="panel-title">
        <h1>设置</h1>
        <CloseButton onClick={onClose} />
      </header>

      <div className="panel-body">
        <SettingRow icon="sound" label="音效">
          <ToggleSwitch
            checked={settings.sound}
            label="音效"
            onChange={() => onToggle('sound')}
          />
        </SettingRow>
        <SettingRow icon="volume" label="音量">
          <VolumeSlider value={settings.volume} onChange={onVolumeChange} />
        </SettingRow>
        <SettingRow icon="vibration" label="震动">
          <ToggleSwitch
            checked={settings.vibration}
            label="震动"
            onChange={() => onToggle('vibration')}
          />
        </SettingRow>
        <SettingRow icon="soldier" label="显示士兵等级">
          <ToggleSwitch
            checked={settings.showSoldierLevel}
            label="显示士兵等级"
            onChange={() => onToggle('showSoldierLevel')}
          />
        </SettingRow>
        <SettingRow icon="level" label="显示等级数值">
          <ToggleSwitch
            checked={settings.showLevelValue}
            label="显示等级数值"
            onChange={() => onToggle('showLevelValue')}
          />
        </SettingRow>

        <div className="panel-actions">
          <GameButton variant="orange" onClick={onReset}>
            恢复默认
          </GameButton>
          <GameButton variant="green" onClick={onSave}>
            确定
          </GameButton>
        </div>
      </div>

      {showToast && <div className="save-toast">设置已保存</div>}
    </section>
  )
}

function App() {
  const [settings, setSettings] = useState(defaultSettings)
  const [panelVisible, setPanelVisible] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const saveTimer = useRef(null)

  useEffect(() => {
    return () => clearTimeout(saveTimer.current)
  }, [])

  const toggleSetting = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }))
  }

  const resetSettings = () => {
    clearTimeout(saveTimer.current)
    setShowToast(false)
    setSettings(defaultSettings)
  }

  const saveSettings = () => {
    clearTimeout(saveTimer.current)
    setShowToast(true)
    saveTimer.current = setTimeout(() => {
      setShowToast(false)
      setPanelVisible(false)
    }, 1000)
  }

  const closePanel = () => {
    clearTimeout(saveTimer.current)
    setShowToast(false)
    setPanelVisible(false)
  }

  return (
    <main className="app-shell">
      <div className="phone-stage">
        <ScenicBackground />
        <div className="stage-overlay" />

        {panelVisible ? (
          <SettingsPanel
            settings={settings}
            onToggle={toggleSetting}
            onVolumeChange={(volume) => setSettings((current) => ({ ...current, volume }))}
            onReset={resetSettings}
            onSave={saveSettings}
            onClose={closePanel}
            showToast={showToast}
          />
        ) : (
          <GameButton
            variant="green"
            className="open-settings"
            onClick={() => setPanelVisible(true)}
          >
            打开设置
          </GameButton>
        )}
      </div>
    </main>
  )
}

export default App
