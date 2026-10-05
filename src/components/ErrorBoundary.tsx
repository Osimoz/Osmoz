import { Component, ErrorInfo, ReactNode } from 'react';
import { dictionaries } from '../locales';
import { langFromPathname, pathFor } from '../i18n/paths';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error);
    console.error('Error info:', errorInfo);
    
    // Here you would send the error to your error reporting service
    // Example: Sentry.captureException(error);
  }

  public render() {
    if (this.state.hasError) {
      // Hors Router et LocaleProvider (voir main.tsx) : langue lue dans l'URL.
      const lang = langFromPathname(window.location.pathname);
      const s = dictionaries[lang].errorBoundary;
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-2xl font-normal mb-4 text-gray-800">
              {s.title}
            </h1>
            <p className="text-gray-600 mb-6 font-normal">
              {s.text}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = pathFor('home', lang) ?? '/';
              }}
              className="btn-label bg-black text-white px-6 py-3 rounded-lg text-sm hover:bg-white hover:text-black border border-black transition-all duration-300"
            >
              {s.home}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}