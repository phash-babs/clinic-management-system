import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LandingPage() {

    // BACKGROUND IMAGES
    const backgrounds = [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        "https://images.unsplash.com/photo-1516549655169-df83a0774514",
        "https://images.unsplash.com/photo-1493836512294-502baa1986e2",
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528"
    ];

    const [currentBg, setCurrentBg] = useState(0);

    // AUTO CHANGE BACKGROUND
    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentBg((prev) =>
                prev === backgrounds.length - 1 ? 0 : prev + 1
            );

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="min-h-screen bg-white">

            {/* HEADER */}
            <header className="bg-white/90 backdrop-blur-md shadow-md fixed w-full z-50">

                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

                    <div className="flex items-center gap-3">

                        <img
                            src="/logo.png"
                            alt="Impeccable Grace"
                            className="w-14 h-14 object-contain"
                        />

                        <h1 className="text-2xl font-bold text-gray-800">
                            Impeccable Grace Services
                        </h1>

                    </div>

                    <nav className="flex gap-6 text-gray-700 font-medium items-center">

                        <a href="#services" className="hover:text-blue-600">
                            Services
                        </a>

                        <a href="#contact" className="hover:text-blue-600">
                            Contact
                        </a>

                        <Link
                            to="/book"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >
                            Book Appointment
                        </Link>

                    </nav>

                </div>

            </header>

            {/* HERO SECTION */}
            <div
                className="relative min-h-screen flex items-center bg-cover bg-center transition-all ease-in-out duration-[2000ms]"
                style={{
                    backgroundImage: `url(${backgrounds[currentBg]})`,
backgroundAttachment: "fixed"
                }}
            >

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/5"></div>

                {/* HERO CONTENT */}
                <div className="relative z-10 w-full pt-24 px-6">

                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                        {/* LEFT */}
                        <div className="text-white">

                            <div className="bg-black/20 backdrop-blur-sm p-8 rounded-2xl">

                                <h2 className="text-5xl font-bold leading-tight">
                                    Comprehensive Mental & Behavioral Healthcare Services
                                </h2>

                                <p className="mt-6 text-lg text-gray-200 leading-8">
                                    Impeccable Grace Services provides professional,
                                    compassionate, and culturally sensitive mental
                                    healthcare support for individuals and families.
                                </p>

                                <div className="flex gap-4 mt-8">

                                    <Link
                                        to="/book"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                                    >
                                        Book Appointment
                                    </Link>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="hidden md:flex justify-center">

                            <img
                                src="/logo.png"
                                alt="Clinic"
                                className="w-96 object-contain drop-shadow-2xl"
                            />

                        </div>

                    </div>

                </div>

            </div>

            {/* SERVICES */}
<div id="services" className="py-20 px-6 bg-gray-50">

    <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Our Services
        </h2>

        <p className="text-center text-gray-600 mb-14 text-lg">
            Compassionate behavioral and mental health support tailored to every patient.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

            {/* CARD 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                    Mental Health Care
                </h3>

                <p className="text-gray-600 leading-8">
                    Treating and caring for patients with mental health disabilities
                    through compassionate and individualized support systems.
                </p>

            </div>

            {/* CARD 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                    Psychotherapy & Counseling
                </h3>

                <p className="text-gray-600 leading-8">
                    Providing psychotherapy to individuals and families dealing
                    with depression, anxiety, trauma, and all forms of abuse.
                </p>

            </div>

            {/* CARD 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                    Psychiatric Assessment
                </h3>

                <p className="text-gray-600 leading-8">
                    Providing screening, assessment, diagnosis, medication
                    management, and treatment recommendations for psychiatric
                    and behavioral health disorders.
                </p>

            </div>

            {/* CARD 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                    Inclusive & Cultural Care
                </h3>

                <p className="text-gray-600 leading-8">
                    Addressing cultural differences for patients in underserved
                    communities and LGBTQ populations with dignity, empathy,
                    and respect.
                </p>

            </div>

        </div>

    </div>

</div>
            {/* CONTACT */}
            <div id="contact" className="py-20 px-6 bg-white">

                <div className="max-w-4xl mx-auto text-center">

                    <h2 className="text-4xl font-bold mb-6 text-gray-800">
                        Contact Us
                    </h2>

                    <div className="bg-gray-50 shadow-lg rounded-2xl p-10">

                        <p className="text-xl text-gray-700 leading-10">
                            15833 Brookshore Drive <br />
                            Plainfield Illinois <br />
                            60544
                        </p>

                    </div>

                </div>

            </div>

            {/* CTA SECTION */}
<div className="bg-blue-700 py-16 px-6 text-center text-white">

    <h2 className="text-4xl font-bold mb-4">
        Ready To Schedule Your Appointment?
    </h2>

    <p className="text-lg mb-8 text-blue-100">
        Compassionate and professional care tailored to your needs.
    </p>

    <Link
        to="/book"
        className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100"
    >
        Book Appointment
    </Link>

</div>

            {/* FOOTER */}
            <footer className="bg-gray-900 text-white py-10">

                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

                    <div>

                        <h2 className="text-2xl font-bold mb-4">
                            Impeccable Grace Services
                        </h2>

                        <p className="text-gray-400">
                            Compassionate behavioral and mental healthcare services
                            for individuals and families.
                        </p>

                    </div>

                    <div>

                        <h3 className="text-xl font-semibold mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-2 text-gray-400">

                            <li>
                                <a href="#services">Services</a>
                            </li>

                            <li>
                                <a href="#contact">Contact</a>
                            </li>

                            <li>
                                <Link to="/book">Book Appointment</Link>
                            </li>

                        </ul>

                    </div>

                    <div>

                        <h3 className="text-xl font-semibold mb-4">
                            Contact
                        </h3>

                        <p className="text-gray-400 leading-8">
                            15833 Brookshore Drive <br />
                            Plainfield Illinois <br />
                            60544
                        </p>

                    </div>

                </div>

                <div className="text-center text-gray-500 mt-10">
                    © 2026 Impeccable Grace Services. All rights reserved.
                </div>

            </footer>

        </div>
    );
}