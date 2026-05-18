import { useEffect, useRef, useState } from 'react'
import './style.css'
import closeIcon from './assets/ui/close.png'
import levelIcon from './assets/ui/level.png'
import soldierIcon from './assets/ui/soldier.png'
import soundIcon from './assets/ui/sound.png'
import toggleOffIcon from './assets/ui/toggle-off.png'
import toggleOnIcon from './assets/ui/toggle-on.png'
import vibrationIcon from './assets/ui/vibration.png'
import volumeIcon from './assets/ui/volume.png'

const iconAssets = {
  sound: soundIcon,
  volume: volumeIcon,
  vibration: vibrationIcon,
  soldier: soldierIcon,
  level: levelIcon,
}

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
      <img
        className="toggle-art"
        src={checked ? toggleOnIcon : toggleOffIcon}
        alt=""
        aria-hidden="true"
      />
      <span className="sr-only">{checked ? 'ON' : 'OFF'}</span>
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
      <span className={`setting-label ${label.length > 4 ? 'is-long' : ''}`}>
        {label}
      </span>
      <div className="setting-control">{children}</div>
    </div>
  )
}

function IconBadge({ type }) {
  return (
    <span className={`icon-badge icon-${type}`}>
      <img src={iconAssets[type]} alt="" aria-hidden="true" />
    </span>
  )
}

function CloseButton({ onClick }) {
  return (
    <button type="button" className="close-button" aria-label="关闭设置" onClick={onClick}>
      <img src={closeIcon} alt="" aria-hidden="true" />
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
    // Let the confirmation bubble read before closing the panel.
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
