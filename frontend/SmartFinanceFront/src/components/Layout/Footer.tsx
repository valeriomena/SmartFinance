import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faGithub, faLinkedin, faXTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Email enviado: ${email}`);
    };

    return (
        <footer className="bg-gray-800 text-gray-200 py-6 px-4 border-t border-gray-700">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Left Section */}
                <div className="flex flex-col gap-2 text-left justify-center items-center md:items-start">
                    <p className="text-center md:text-left">
                        Información de contacto: +573003019962{' '}
                        <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5 text-green-500 inline ml-1" />
                    </p>
                    <p className="text-center md:text-left">Producto desarrollado por Andres Mena</p>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-[1px] bg-gray-600"></div>

                {/* Right Section */}
                <div className="flex flex-col gap-4 items-center md:items-end">
                    {/* Subscription Form */}
                    <div className="w-full md:max-w-sm">
                        <p className="mb-2 text-sm font-semibold text-center md:text-left">Suscríbete:</p>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 rounded border border-gray-500 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                            <button
                                type="submit"
                                className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition duration-300"
                            >
                                Enviar
                            </button>
                        </form>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 justify-center md:justify-start">
                        <a
                            href="https://github.com/valeriomena"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-200 transition duration-300"
                        >
                            <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
                        </a>
                        <a
                            href="http://www.linkedin.com/in/andres-mena"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-200 transition duration-300"
                        >
                            <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-200 transition duration-300"
                        >
                            <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6" />
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-200 transition duration-300"
                        >
                            <FontAwesomeIcon icon={faTiktok} className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
