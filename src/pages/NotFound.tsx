import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './NotFound.css';

interface NotFoundProps {
    title?: string;
    message?: string;
    backTo?: string;
    backLabel?: string;
}

const NotFound = ({
    title = 'Page not found',
    message = "The page you're looking for doesn't exist or has moved.",
    backTo = '/',
    backLabel = 'Back to home',
}: NotFoundProps) => (
    <main className="not-found-page">
        <p className="not-found-code" aria-hidden="true">404</p>
        <h1 className="not-found-title">{title}</h1>
        <p className="not-found-message">{message}</p>
        <Link to={backTo} className="not-found-link">
            <ArrowLeft size={18} />
            <span>{backLabel}</span>
        </Link>
    </main>
);

export default NotFound;
