import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1>Page Not Found</h1>
            <p>The requested page does not exist.</p>
            <Link to="/">Go Home</Link>
        </div>
    );
}

