import "./global.css";
import Navbar from "../components/Navbar";
import NinjaProgress from "../components/NinjaProgress";
import EliteMotionSystem from "../components/EliteMotionSystem";
import BackgroundMusic from "../components/BackGroundMusic";
export const metadata = {
    title: "Shivam Singh — Full Stack Developer",
    description: "MERN Full Stack Developer Portfolio",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className="fixed inset-0 -z-10 bg-[#020617]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.25),transparent_40%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.25),transparent_40%)]" />
                </div>
                <Navbar />
                <NinjaProgress />
                <EliteMotionSystem />
                
                {/* <BackgroundMusic/> */}

                {children}
            </body>
        </html>
    );
}
