import { ThemeProvider } from '@/provider/theme-provider'
import Routes from '@/pages/Routes'

function App() {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Routes/>
        </ThemeProvider>
    )
}

export default App