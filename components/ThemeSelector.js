'use client'

const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
]

export default function ThemeSelector() {
  const selectTheme = (theme) => {
    document.querySelector('html').setAttribute('data-theme', theme)
  }

  return (
    <li tabIndex={3}>
      <a>
        Themes
        <svg
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
        </svg>
      </a>
      <ul className="p-2 bg-base-100">
        {themes.map((theme) => {
          return (
            <li key={theme}>
              <a onClick={() => selectTheme(theme)}>{theme}</a>
            </li>
          )
        })}
      </ul>
    </li>
  )
}
