import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700"> {/* Fondo gradiente en todo el layout */}
            {/* Header */}
            <Header />

            {/* Main Content */}
            <div className="flex flex-1 w-full pt-[80px]"> {/* Ajusta pt-[80px] según la altura de tu Header */}
                {/* Sidebar */}
                <Sidebar />

                {/* Page Content */}
                <main className="flex-1 p-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-lg shadow-lg"> {/* Fondo con gradiente en el contenedor principal */}
                    {children}
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Layout;
