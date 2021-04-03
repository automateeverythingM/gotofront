import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(
            "🚀 ~ file: index.js ~ line 14 ~ ErrorBoundary ~ componentDidCatch ~ errorInfo",
            errorInfo
        );
        console.log(
            "🚀 ~ file: index.js ~ line 14 ~ ErrorBoundary ~ componentDidCatch ~ error",
            error
        );
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
