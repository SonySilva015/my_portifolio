export default function GlobalStyles() {
    return (
        <style>
            {`
                @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');

                * {
                    font-family: 'Geist', sans-serif;
                }
                h1{
                    font-family: "Urbanist", sans-serif;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes glow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
                
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-glow {
                    animation: glow 3s ease-in-out infinite;
                }
                
                .animate-slideIn {
                    animation: slideIn 0.8s ease-out forwards;
                }
                
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out forwards;
                }
                
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
                
                .glass-effect {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                .gradient-border {
                    position: relative;
                    border-radius: 9999px;
                    background: linear-gradient(60deg, #545BF8, #8B5CF6, #EC4899);
                    padding: 1px;
                }
                
                .gradient-border > * {
                    border-radius: 9999px;
                }
                
                .shimmer {
                    position: relative;
                    overflow: hidden;
                }
                
                .shimmer::after {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -60%;
                    width: 20%;
                    height: 200%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    transform: rotate(25deg);
                    animation: shimmer 6s infinite;
                }
                
                @keyframes shimmer {
                    0% { left: -60%; }
                    20% { left: 120%; }
                    100% { left: 120%; }
                }
                
                .nav-link {
                    position: relative;
                    transition: color 0.3s ease;
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #545BF8, #8B5CF6);
                    transition: width 0.3s ease;
                    border-radius: 2px;
                }
                
                .nav-link:hover::after {
                    width: 70%;
                }
                
                .hover-scale {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                
                .hover-scale:hover {
                    transform: scale(1.05);
                    box-shadow: 0 10px 30px -10px rgba(84, 91, 248, 0.5);
                }
                
                .marquee {
                    mask-image: linear-gradient(90deg, transparent, black 20%, black 80%, transparent);
                }
            `}
        </style>
    )
}